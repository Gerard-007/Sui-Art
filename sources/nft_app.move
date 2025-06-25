/*
/// Module: nft_app
module nft_app::nft_app;
*/

// For Move coding conventions, see
// https://docs.sui.io/concepts/sui-move-concepts/conventions

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
