import user from '../type/user';

export default function reducer(state={
  details: {
    account: null,
    name: null,
    image: null,
    email: null,
    description: null,
    type: null,
    price: null
  },
  isAuthenticated: false,
  loading: false,
  error: null,
  }, action) {

    switch (action.type) {
      case user.get: {
        return {...state, loading: true}
      }
      case user.getRejected: {
        return {...state, loading: false, error: action.payload}
      }
      case user.getDone: {
        return {
          ...state,
          loading: false,
          details: action.payload.user,
          isAuthenticated: action.payload.isAuthenticated
        }
      }
      case user.logOut: {
        return {...state, loading: true}
      }
      case user.logOutRejected: {
        return {...state, loading: false, error: action.payload}
      }
      case user.logOutDone: {
        return {
          ...state,
          loading: false,
          details: action.payload.user,
          isAuthenticated: action.payload.isAuthenticated
        }
      }
      case user.update: {
        return {...state, loading: true}
      }
      case user.updateRejected: {
        return {...state, loading: false, error: action.payload}
      }
      case user.updateDone: {
        return {
          ...state,
          loading: false,
          details: action.payload
        }
      }
    }

    return state
}
