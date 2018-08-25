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
  // details: {
  //   account: "0x2163F102d1bcf634b6C17dab3f9a0eABADDf10f0",
  //   name: "Test",
  //   email: "test-8@us.com",
  //   image: "https://gateway.ipfs.io/ipfs/QmbHjT6J8ycyphtf5vszK7Hhn6tQEaR5ozNmkbQeYzEJJQ",
  //   description: "test account",
  //   type: 1,
  //   price: 0
  // },
  // isAuthenticated: true,
  count:{
    total: 0,
    rejected: 0,
    verified: 0
  },
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
      case user.count: {
        return {...state, loading: true}
      }
      case user.countRejected: {
        return {...state, loading: false, error: action.payload}
      }
      case user.countDone: {
        return {
          ...state,
          loading: false,
          count: action.payload
        }
      }
    }
  return state;
}
