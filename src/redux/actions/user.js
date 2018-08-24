import Auth from '../../utils/Auth';
import userType from '../type/user';
import ipfs from '../../utils/ipfs';
import contract from '../../constants/contracts';
import ipfsConst from '../../constants/ipfs';
import get from 'lodash/get';

export function auth(payload) {
  return function(dispatch) {
    dispatch({type: userType.get});
    Promise.all([
      Auth.authenticate(payload),
      contract.accounts.getAccount({from: payload.account})
    ]).then((res)=>{
        const user = {
          account: payload.account,
          name: get(res, '[1][0]', ''),
          email: get(res, '[1][1]', ''),
          image: ipfsConst.url + get(res, '[1][2]', ''),
          description: get(res, '[1][3]', ''),
          type: get(res, '[1][4].c[0]', null),
          price: get(res, '[1][5].c[0]', null)
        };
        dispatch({type: userType.getDone, payload: {user: user, isAuthenticated: get(res, '[0].isAuthenticated', false)}})
      })
      .catch((err) => {
        dispatch({type: userType.getRejected, payload: err})
      });
  }
}

export function logOut() {
  return function(dispatch) {
    dispatch({type: userType.logOut});
    Auth.signOut()
      .then((response) => {
        dispatch({type: userType.logOutDone, payload: response})
      })
      .catch((err) => {
        dispatch({type: userType.logOutRejected, payload: err})
      });
  }
}

export function update(payload) {
  return function(dispatch) {
    dispatch({type: userType.update});
    let ipfsHash;
    ipfs.add(payload.logo)
      .then((res) => {
        ipfsHash = get(res, '[0].hash', '');
        return contract.accounts.register(payload.name, payload.email, ipfsHash, payload.description, payload.type, payload.price, {from: payload.account});
      })
      .then(()=>{
        return contract.accounts.getAccount({from: payload.account});
      })
      .then(()=>{
        payload.image = ipfsConst.url + ipfsHash;
        dispatch({type: userType.updateDone, payload: payload});
      })
      .catch((err)=>{
        console.log(err);
        dispatch({type: userType.updateRejected, payload: err})
      });
  }
}