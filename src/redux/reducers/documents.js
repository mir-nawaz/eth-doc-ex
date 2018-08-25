import documents from '../type/documents';

export default function reducer(state={
  verifiers: [],
  loading: false,
  error: null,
}, action) {

  switch (action.type) {
    case documents.verifiers: {
      return {...state, loading: true}
    }
    case documents.verifiersRejected: {
      return {...state, loading: false, error: action.payload}
    }
    case documents.verifiersDone: {
      return {
        ...state,
        loading: false,
        verifiers: action.payload
      }
    }
    case documents.create: {
      return {...state, loading: true}
    }
    case documents.createRejected: {
      return {...state, loading: false, error: action.payload}
    }
    case documents.createDone: {
      return {
        ...state,
        loading: false
      }
    }
  }
  return state;
}
