
const publicMenu = {
  list: {
    home: {
      url: '/home',
      label: 'Home'
    },
    about: {
      url: '/about',
      label: 'About'
    },
    verify: {
      url: '/verify',
      label: 'Verify'
    },
    login: {
      url: '/login',
      label: 'Login'
    }
  },
  dropDown:{}
};

const privateMenu = {
  list: {
    home: {
      url: '/home',
      label: 'Home'
    },
    documents: {
      url: '/documents',
      label: 'Documents'
    }
  },
  dropDown: {
    profile: {
      url: '/profile',
      label: 'Profile'
    },
    transactions: {
      url: '/transactions',
      label: 'Transactions'
    },
    logout: {
      url: '/logout',
      label: 'Log Out'
    }
  }
};
const routes = Object.assign({}, privateMenu.list, publicMenu.list, privateMenu.dropDown, publicMenu.dropDown);

export default {
  private: privateMenu,
  public: publicMenu,
  routes: routes,
  home: publicMenu.list.home
}