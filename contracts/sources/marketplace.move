module nft_app::marketplace {
    use nft_app::nft_app::ArtNFT;
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::balance::{Self, Balance};
    use std::string::{Self, String};

   
    const EInsufficientPayment: u64 = 1;
    const ENotBuyer: u64 = 2;
    const ENotSeller: u64 = 3;
    const EAlreadyConfirmed: u64 = 4;
    const EInvalidQRCode: u64 = 5;
    
    
    const PLATFORM_FEE_BASIS_POINTS: u64 = 250;
    const BASIS_POINTS_DENOMINATOR: u64 = 10000;

    public struct DesignListing has key, store {
        id: UID,
        nft: ArtNFT,
        seller: address,
        price: u64,
        qr_code_hash: String, 
        is_sold: bool,
    }

    // This is the escrow object to hold payment until the buyer confirms
    public struct EscrowPayment has key, store {
        id: UID,
        listing_id: ID,
        buyer: address,
        seller: address,
        payment: Balance<SUI>,
        price: u64,
        qr_code_hash: String,
        authenticity_confirmed: bool,
        nft_transferred: bool,
    }

    public struct PlatformTreasury has key {
        id: UID,
        balance: Balance<SUI>,
        platform_address: address,
    }

    fun init(ctx: &mut TxContext) {
        let treasury = PlatformTreasury {
            id: object::new(ctx),
            balance: balance::zero<SUI>(),
            platform_address: tx_context::sender(ctx),
        };
        transfer::share_object(treasury);
    }

    public entry fun create_listing(
        nft: ArtNFT, 
        price: u64, 
        qr_code_hash: vector<u8>,
        ctx: &mut TxContext
    ) {
        let listing_id = object::new(ctx);
        let listing_id_copy = object::uid_to_inner(&listing_id);
        
        let listing = DesignListing {
            id: listing_id,
            nft,
            seller: tx_context::sender(ctx),
            price,
            qr_code_hash: string::utf8(qr_code_hash),
            is_sold: false,
        };

        transfer::share_object(listing);
    }
    
    public entry fun purchase_nft(
        listing: &mut DesignListing, 
        payment: Coin<SUI>, 
        ctx: &mut TxContext
    ) {
        let buyer = tx_context::sender(ctx);
        assert!(!listing.is_sold, EInsufficientPayment);
        assert!(coin::value(&payment) >= listing.price, EInsufficientPayment);
        
        listing.is_sold = true;
        
        let escrow = EscrowPayment {
            id: object::new(ctx),
            listing_id: object::uid_to_inner(&listing.id),
            buyer,
            seller: listing.seller,
            payment: coin::into_balance(payment),
            price: listing.price,
            qr_code_hash: listing.qr_code_hash,
            authenticity_confirmed: false,
            nft_transferred: false,
        };


        transfer::share_object(escrow);
    }

    public entry fun confirm_authenticity(
        escrow: &mut EscrowPayment,
        qr_code: vector<u8>,
        ctx: &mut TxContext
    ) {
        let buyer = tx_context::sender(ctx);
        assert!(escrow.buyer == buyer, ENotBuyer);
        assert!(!escrow.authenticity_confirmed, EAlreadyConfirmed);
        
        let provided_qr_string = string::utf8(qr_code);
        assert!(provided_qr_string == escrow.qr_code_hash, EInvalidQRCode);
        
        escrow.authenticity_confirmed = true;
    }

    public entry fun transfer_nft_to_buyer(
        listing: &mut DesignListing,
        escrow: &mut EscrowPayment,
        ctx: &mut TxContext
    ) {
        assert!(escrow.authenticity_confirmed, ENotBuyer);
        assert!(!escrow.nft_transferred, EAlreadyConfirmed);
        assert!(object::uid_to_inner(&listing.id) == escrow.listing_id, EInvalidQRCode);
        
        escrow.nft_transferred = true;
        
    }

    
    public entry fun release_payment(
        escrow: &mut EscrowPayment,
        treasury: &mut PlatformTreasury,
        ctx: &mut TxContext
    ) {
        assert!(escrow.authenticity_confirmed, ENotBuyer);
        assert!(escrow.nft_transferred, EAlreadyConfirmed);
        
        let platform_fee = (escrow.price * PLATFORM_FEE_BASIS_POINTS) / BASIS_POINTS_DENOMINATOR;
        let seller_amount = escrow.price - platform_fee;
        
        let total_balance = balance::value(&escrow.payment);
        let platform_fee_balance = balance::split(&mut escrow.payment, platform_fee);
        let seller_balance = balance::split(&mut escrow.payment, seller_amount);
        
        balance::join(&mut treasury.balance, platform_fee_balance);
        
        let seller_coin = coin::from_balance(seller_balance, ctx);
        transfer::public_transfer(seller_coin, escrow.seller);
        
        if (balance::value(&escrow.payment) > 0) {
            let excess_coin = coin::from_balance(
                balance::withdraw_all(&mut escrow.payment), 
                ctx
            );
            transfer::public_transfer(excess_coin, escrow.buyer);
        };

    }

    public entry fun withdraw_platform_fees(
        treasury: &mut PlatformTreasury,
        amount: u64,
        ctx: &mut TxContext
    ) {
        assert!(tx_context::sender(ctx) == treasury.platform_address, ENotSeller);
        
        let withdrawn_balance = balance::split(&mut treasury.balance, amount);
        let coin = coin::from_balance(withdrawn_balance, ctx);
        transfer::public_transfer(coin, treasury.platform_address);
    }

    public entry fun cancel_purchase(
        listing: &mut DesignListing,
        escrow: &mut EscrowPayment,
        ctx: &mut TxContext
    ) {
        let buyer = tx_context::sender(ctx);
        assert!(escrow.buyer == buyer, ENotBuyer);
        assert!(!escrow.authenticity_confirmed, EAlreadyConfirmed);
        
        listing.is_sold = false;
        
        let refund_coin = coin::from_balance(
            balance::withdraw_all(&mut escrow.payment), 
            ctx
        );
        transfer::public_transfer(refund_coin, buyer);
    }

    public fun get_listing_price(listing: &DesignListing): u64 {
        listing.price
    }

    public fun get_listing_seller(listing: &DesignListing): address {
        listing.seller
    }

    public fun is_listing_sold(listing: &DesignListing): bool {
        listing.is_sold
    }

    public fun get_escrow_buyer(escrow: &EscrowPayment): address {
        escrow.buyer
    }

    public fun is_authenticity_confirmed(escrow: &EscrowPayment): bool {
        escrow.authenticity_confirmed
    }

    public fun get_platform_treasury_balance(treasury: &PlatformTreasury): u64 {
        balance::value(&treasury.balance)
    }
}
