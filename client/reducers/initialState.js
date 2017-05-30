export default {
  documents: [],
  roles: [],
  document: {},
  access: { loggedIn: false, user: {} },
  users: {
    users: [],
    userProfile: { username: '', about: '', fullName: '', email: '' }
  },
  pagination: { currentPage: 1, offset: 0, query: '' },
  ajaxCallsInProgress: 0
};
