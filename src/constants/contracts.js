import SimpleStorage from '../contracts/SimpleStorage';
import Accounts from '../contracts/Accounts';
import get from 'lodash/get';

export default {
  simpleStorage: null,
  accounts: null,
  init: function () {
    console.log(' init ');
    return Promise.all([
        SimpleStorage(),
        Accounts()
      ])
      .then((contracts)=>{
        this.simpleStorage = get(contracts, '[0]');
        this.accounts = get(contracts, '[1]');
      });
  }
}