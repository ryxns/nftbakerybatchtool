import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { OpKind } from "@taquito/taquito";
import config from "../config";

const preferredNetwork = "mainnet";
const options = {
  name: "NFT",
  iconUrl: "https://tezostaquito.io/img/favicon.png",
  preferredNetwork: preferredNetwork,
};
const rpcURL = "https://mainnet-tezos.giganode.io";
const wallet = new BeaconWallet(options);

const getActiveAccount = async () => {
  return await wallet.client.getActiveAccount();
};

const connectWallet = async () => {
  let account = await wallet.client.getActiveAccount();

  if (!account) {
    await wallet.requestPermissions({
      network: { type: preferredNetwork },
    });
    account = await wallet.client.getActiveAccount();
  }
  return { success: true, wallet: account.address };
};

const disconnectWallet = async () => {
  await wallet.disconnect();
  return { success: true, wallet: null };
};

const checkIfWalletConnected = async (wallet) => {
  try {
    const activeAccount = await wallet.client.getActiveAccount();
    if (!activeAccount) {
      await wallet.client.requestPermissions({
        type: { network: preferredNetwork },
      });
    }
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const changeQuantity = async (quantity) => {
   const amount = 1;
  // const wallet = new BeaconWallet(options);
  const response = await checkIfWalletConnected(wallet);

  if (response.success) {
    const tezos = new TezosToolkit(rpcURL);
    tezos.setWalletProvider(wallet);
    
    const contract = await tezos.wallet.at(config.contractAddress);
    
    let microTransactions = [];
    for (let i = 0; i < quantity; i++) {
      microTransactions.push({
        kind: OpKind.TRANSACTION,
        ...contract.methods.fulfill_ask(1336179).toTransferParams(),
        amount: amount,
        mutez: false,
      });
    }
    
    const batch = await tezos.wallet.batch(microTransactions);
    const operation = await batch.send();
    console.log('Operation hash:', operation.hash);
    const result = await operation.confirmation();
    console.log(result);
  }
};

export {
  connectWallet,
  disconnectWallet,
  getActiveAccount,
  checkIfWalletConnected,
};
