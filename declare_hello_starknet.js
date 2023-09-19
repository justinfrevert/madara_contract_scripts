import {Account, RpcProvider} from 'starknet';

import { readFile } from 'fs/promises';

const casm = JSON.parse(
  await readFile(
    new URL('./contracts/HelloStarknet/HelloStarknet.casm.json', import.meta.url)
  )
);

const sierra = JSON.parse(
    await readFile(
      new URL('./contracts/HelloStarknet/HelloStarknet.sierra.json', import.meta.url)
    )
);

const provider = new RpcProvider({
    nodeUrl: "http://localhost:9944",
});

const account = new Account(provider, "0x00c1cf1490de1352865301bb8705143f3ef938f97fdf892f1090dcb5ac7bcd1d", "0x0000000000000000000000000000000000000000000000000000000000000002", "1");

const declareResult = await account.declare(
    {
        contract: sierra,
        casm: casm,
    },
    {
        nonce: 1,
        version: 2,
        maxFee: 100000,
    }
);
console.log("declareResult", declareResult);

