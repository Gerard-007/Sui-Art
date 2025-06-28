
#[test_only]
module nft_app::nft_app_tests {
    use sui::test_scenario;
    use sui::tx_context;
    use std::string;
    use std::vector;
    use nft_app::nft_app;

    #[test]
    fun test_mint() {
        let addr1 = @0xA;
        let mut scenario = test_scenario::begin(addr1);

        {
            nft_app::mint(
                b"Art Name",
                addr1,
                b"Oil on Canvas",
                20240625,
                b"https://ipfs.io/ipfs/Qm...",
                b"Represents cultural heritage",
                test_scenario::ctx(&mut scenario)
            );
        };


        test_scenario::end(scenario);
    }

    #[test]
    fun transfer_test() {
        let addr1 = @0xA;
        let addr2 = @0xB;
        let mut scenario = test_scenario::begin(addr1);

        
        {
            nft_app::mint(
                b"Art Name",
                addr1,
                b"Oil on Canvas",
                20240625,
                b"https://ipfs.io/ipfs/Qm...",
                b"Represents cultural heritage",
                test_scenario::ctx(&mut scenario)
            );
        };

        test_scenario::next_tx(&mut scenario, addr1);
        {
            let nft = test_scenario::take_from_sender<nft_app::ArtNFT>(&scenario);
            nft_app::transfer(nft, addr2, test_scenario::ctx(&mut scenario));
        };

        test_scenario::end(scenario);
    }

}