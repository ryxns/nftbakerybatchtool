import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
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

export const changeName = async (name) => {
   const amount = 1;
  // const wallet = new BeaconWallet(options);
  const response = await checkIfWalletConnected(wallet);

  if (response.success) {
    const tezos = new TezosToolkit(rpcURL);
    tezos.setWalletProvider(wallet);
    
    const batch = tezos.wallet.batch();
      batch.withTransfer({ amount: 1, storageLimit: 4000, to: "KT1WvzYHCNBvDSdwafTHv7nJ1dWmZ8GCYuuC", parameter: { "entrypoint": "fulfill_ask", "value": { "int": "1336179" } } });
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
