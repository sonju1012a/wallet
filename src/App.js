import Web3 from 'web3';
import Caver from 'caver-js'
import Select from 'react-select'
import { connectService } from './connector'
import { useEffect, useState } from 'react';
const wallets = [
	'metamask', 'kaikas'
];

const rpcNetworks = {
  1: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  8217: 'https://public-node-api.klaytnapi.com/v1/cypress'
}


function App() {
  const [connector, setConnector] = useState();
  const [chainId, setChainId] = useState();
  const [isConnected, setIsConnected] = useState();
  const [account, setAccount] = useState();
  const [balance, setBalance] = useState();
  const connect = async (walletType) => {
    console.log(walletType);
    const connector = connectService(walletType);
    const isConnect = await connector.connect();
    setConnector(connector);
    if(isConnect) {
      console.log(`${walletType} 연결성공`)
      setIsConnected(true);
      setAccount(isConnect[0]);
      setChainId(connector.getNetworkVersion());
    } else {
      console.log(`${walletType} 연결실패`)
    }
  }

  const getBalance = async () => {
    const balance = await connector.getBalance(account);
    setBalance(balance);
    console.log(balance);
  }

  const connectorHelperInit = (connector) => {
    connector.onConnect((e) => {
      setIsConnected(e)
    });

    connector.onAccountsChanged((account) => {
      console.log(account);
      setAccount(account[0]);
    });

    connector.onChainChanged((chainId) => {
      setChainId(chainId);
    });
  }

  useEffect(() => {
    if(connector) {
      connectorHelperInit(connector);
    }
  }, [connector])
  return (
    
    <div className="App">
      <div>
        <div>연결상태 {isConnected ? '연결됨': '실패'} </div>
        <div>네트워크ID {chainId}</div>
        <div>지갑주소 {account}</div>
        <div>잔액 {balance}</div>
      </div>
      {wallets.map(wallet => <button onClick={() => connect(wallet)}>{wallet}</button>)}
      <button onClick={()=>getBalance()}>getBalance</button>
    </div>
  );
}

export default App;
