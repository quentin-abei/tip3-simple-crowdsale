import { Address, getRandomNonce, toNano, WalletTypes, zeroAddress } from "locklift";

const TOKEN_ROOT_ADDRESS = zeroAddress;

async function main() {
  const signer = (await locklift.keystore.getSigner("0"))!;
  const account = await locklift.factory.accounts.addExistingAccount({
    type: WalletTypes.WalletV3,
    publicKey: signer.publicKey,
  });
  const { contract: tokensale, tx } = await locklift.factory.deployContract({
    contract: "Tokensale",
    publicKey: signer.publicKey,
    initParams: {
      _nonce: getRandomNonce(),
      _owner: account.address,
    },
    constructorParams: {
        distributedTokenRoot: TOKEN_ROOT_ADDRESS,
        supply: 100000000000,
        rate: 10,
        sendRemainingGasTo: account.address
    },
    value: toNano(2),
  });

  console.log(`Tokensale deployed at: ${tokensale.address.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });