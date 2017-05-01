import roles from './roles';
import users from './users';

export default (app) => {
  roles(app);
  users(app);
};
