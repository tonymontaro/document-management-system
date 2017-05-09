import roles from './roles';
import users from './users';
import documents from './documents';

export default (app) => {
  roles(app);
  users(app);
  documents(app);
};
