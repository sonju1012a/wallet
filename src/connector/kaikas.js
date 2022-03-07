import Caver, {Unit} from "caver-js"

const caver = new Caver(window.klaytn);

export const kaikas = {    
    connect: async () => {
        if(window.klaytn) {
            return await window.klaytn.enable();
        } else {
            console.log('plz install')
        }
    },
    getNetworkVersion: () => window.klaytn.networkVersion,
    getSelectedAddress: () => window.klaytn.selectedAddress,
    getBalance: async (account) => await caver.klay.getBalance(account).then((e) => e / (10 ** 18)),
    onConnect: (handleConnect) => window.klaytn.on('chainChanged', handleConnect),
    onAccountsChanged: (handleAccountsChanged) => window.klaytn.on('accountsChanged', handleAccountsChanged),
    onChainChanged: (handleChainChanged) => window.klaytn.on('networkChanged', handleChainChanged),
}