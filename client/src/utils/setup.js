import Loyalty from '../../build/contracts/Loyalty.json';
import contract from 'truffle-contract';
import getWeb3 from 'utils/getWeb3'

export const setupAWS = () => {
    window.AWS.config.region = 'us-west-2'; // Region
    window.AWS.config.credentials = new window.AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-west-2:d77dc1ab-f972-4676-a0fa-f9fd5252fa1a',
    });
};

export const initContract = () => getWeb3.then(results => {
    const web3 = results.web3;
    const loyalty = contract(Loyalty);
    loyalty.setProvider(web3.currentProvider);

    return web3.eth.getAccounts((error, accounts) => loyalty.deployed().then(instance => [web3, instance, accounts[0]]))
});