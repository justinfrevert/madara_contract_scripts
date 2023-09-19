import {Account, RpcProvider} from 'starknet';

const provider = new RpcProvider({
    nodeUrl: "http://localhost:9944",
});

const account = new Account(provider, "0x00c1cf1490de1352865301bb8705143f3ef938f97fdf892f1090dcb5ac7bcd1d", "0x0000000000000000000000000000000000000000000000000000000000000002", "1");

const erc20ClassHash = "0x4596fa4856bbf13f3448a376d607f8852148b0e6be4b958cde2ca8471a72ede";

const deployResponse = await account.deployContract(
    {
        classHash: erc20ClassHash,
        constructorCalldata: [
          1, // Token Name
          1, // Token Symbol
          1, // Token Decimals
          "0xffffffffffffffffffffffffffffffff", // Initial Supply
          "0xffffffffffffffffffffffffffffffff", // Initial Supply Cont { since u256 }
          account.address, // Recipient
        ],
    }
);



await provider.waitForTransaction( deployResponse.transaction_hash);

console.log("deployResponse", deployResponse);
