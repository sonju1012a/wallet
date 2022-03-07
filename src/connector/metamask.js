import utils from 'web3-utils';
export const metamask = {
    connect: async () => {
        if(window.ethereum) {
            return await window.ethereum.request({ method: 'eth_requestAccounts' });
        } else {
            console.log('plz install')
        }
    },
    getNetworkVersion: () => window.ethereum.networkVersion,
    getSelectedAddress: () => window.ethereum.selectedAddress,
    getBalance: async (account) => await window.ethereum.request({ method: 'eth_getBalance', params: [
        account,
        'latest'
    ]}).then(e => utils.hexToNumberString(e) / (10 ** 18)),
    onConnect: (handleConnect) => window.ethereum.on('chainChanged', handleConnect),
    onAccountsChanged: (handleAccountsChanged) => window.ethereum.on('accountsChanged', handleAccountsChanged),
    onChainChanged: (handleChainChanged) => window.ethereum.on('chainChanged', handleChainChanged),
}