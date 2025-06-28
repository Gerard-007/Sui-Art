/*
/// Module: nft_app
module nft_app::nft_app;
*/

// For Move coding conventions, see
// https://docs.sui.io/concepts/sui-move-concepts/conventions

// module nft_app::nft_app {
//     use std::string;
//     use sui::url;
//     use sui::event;

//     // Events for tracking NFT lifecycle
//     public struct NFTMinted has copy, drop {
//         id: UID,
//         name: string::String,
//         owner: address,
//     }

//     public struct NFTTransferred has copy, drop {
//         id: UID,
//         from: address,
//         to: address,
//     }

//     public struct ArtNFT has key, store {
//         id: UID,
//         name: string::String,
//         artist_did: address,
//         materials: string::String,
//         creation_date: u64,
//         media_hash: Url,
//         cultural_narrative: string::String,
//     }

//     public entry fun mint(
//         name: vector<u8>,
//         artist_did: address,
//         materials: vector<u8>,
//         creation_date: u64,
//         media_hash: vector<u8>,
//         cultural_narrative: vector<u8>,
//         ctx: &mut TxContext,
//     ) {
//         let sender = tx_context::sender(ctx);
//         let nft = ArtNFT {
//             id: object::new(ctx),
//             name: string::utf8(name),
//             artist_did,
//             materials: string::utf8(materials),
//             creation_date,
//             media_hash: url::new_unsafe_from_bytes(media_hash),
//             cultural_narrative: string::utf8(cultural_narrative),
//         };
//         event::emit(NFTMinted {
//             id: nft.id,
//             name: nft.name,
//             owner: sender,
//         });
//         transfer::public_transfer(nft, sender);
//     }

//     public entry fun transfer(nft: ArtNFT, recipient: address, ctx: &mut TxContext) {
//         let sender = tx_context::sender(ctx);
//         event::emit(NFTTransferred {
//             id: nft.id,
//             from: sender,
//             to: recipient,
//         });
//         transfer::public_transfer(nft, recipient);
//     }

//     public fun get_name(nft: &ArtNFT): &string::String {
//         &nft.name
//     }

//     public fun get_media_hash(nft: &ArtNFT): &url::Url {
//         &nft.media_hash
//     }

//     public fun get_owner(nft: &ArtNFT): address {
//         nft.artist_did
//     }
// }

module nft_app::nft_app {
    use std::string;
    use sui::url;
    
    

    public struct ArtNFT has key, store {
        id: object::UID,
        name: string::String,
        artist_did: address,
        materials: string::String,
        creation_date: u64,
        media_hash: url::Url,
        cultural_narrative: string::String
    }

    #[allow(lint(self_transfer))]
    public fun mint(
        name: vector<u8>,
        artist_did: address,
        materials: vector<u8>,
        creation_date: u64,
        media_hash: vector<u8>,
        cultural_narrative: vector <u8>,
        ctx: &mut tx_context::TxContext,
    ) {
        let sender = tx_context::sender(ctx);
        let nft = ArtNFT {
            id: object::new(ctx),
            artist_did,
            name: string::utf8(name),
            materials: string::utf8(materials),
            creation_date,
            media_hash: url::new_unsafe_from_bytes(media_hash),
            cultural_narrative: string::utf8(cultural_narrative),

        };
        transfer::public_transfer(nft, sender);
    }

    #[allow(lint(self_transfer))]
    public fun transfer(nft: ArtNFT, recipient: address, _: &mut tx_context::TxContext) {
        transfer::public_transfer(nft, recipient)
    }

}
