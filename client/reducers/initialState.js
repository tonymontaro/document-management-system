export default {
  documents: [],
  roles: [],
  document: {},
  access: { loggedIn: false, user: {} },
  users: {
    users: [],
    userProfile: { username: '', about: '', fullName: '', email: '' }
  },
  pagination: { page: 1, pageCount: 1, pageSize: 0, totalCount: 0, offset: 0, query: '', },
  ajaxCallsInProgress: 0
};
