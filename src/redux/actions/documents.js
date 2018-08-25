import documentsType from "../type/documents";
import contract from "../../constants/contracts";
import get from "lodash/get";
import ipfsConst from '../../constants/ipfs';
import ipfs from "../../utils/ipfs";

export function verifiers(payload) {
  return function(dispatch) {
    dispatch({type: documentsType.verifiers});
    let count = 0;
    contract.accounts.verifiersCount({from: payload.account})
      .then((res)=>{
        count = get(res, 'c[0]', 0);
        const promises = [];
        for(let index = 0; index < count; index++){
          promises.push(contract.accounts.getVerifier(index, {from: payload.account}))
        }
        return Promise.all(promises);
      })
      .then((res)=>{
        const verifiers = [];
        for(const verifier of res){
          verifiers.push({
            address: verifier[0],
            name: verifier[1],
            email: verifier[2],
            image: ipfsConst.url + verifier[3],
            description: verifier[4],
            type: verifier[5].c[0],
            price: verifier[6].c[0]
          });
        }
        dispatch({type: documentsType.verifiersDone, payload: verifiers});
      })
      .catch((err)=>{
        dispatch({type: documentsType.verifiersRejected, payload: err})
      });
  }
}

export function create(payload) {
  return function(dispatch) {
    dispatch({type: documentsType.create});
    let ipfsHash;
    ipfs.add(payload.document)
      .then((res) => {
        ipfsHash = get(res, '[0].hash', '');
        if(!ipfsHash){
          throw new Error('IPFS file upload error occurred');
        }
        return contract.documents.addDocument.estimateGas(payload.verifier, payload.name, payload.description, ipfsHash, {from: payload.account, value: payload.rate});
      })
      .then((gas)=>{
        return contract.documents.addDocument(payload.verifier, payload.name, payload.description, ipfsHash, {from: payload.account, gasLimit: gas, value: payload.rate});
      })
      .then(()=>{
        const documentAddedEvent = contract.documents.DocumentAdded();
        documentAddedEvent.watch((error) => {
          if (error){
            throw new Error('Account Register event has error occurred');
          }
          dispatch({type: documentsType.createDone});
        });
      })
      .catch((err)=>{
        dispatch({type: documentsType.createRejected, payload: err})
      });
  }
}