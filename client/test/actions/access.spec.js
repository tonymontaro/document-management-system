import expect from 'expect';
import * as accessActions from '../../actions/accessActions';
import * as types from '../../actions/types';


describe('Access Actions', () => {
  describe('clientLogin', () => {
    it('logins in a user and returns CLIENT_LOGIN', () => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGVJZCI6MSwiaWF0IjoxNDk1NTQwNTkxLCJleHAiOjE0OTU2MjY5OTF9.9fuZtQ_c0XRsJyl3prjI-Oew9WCxftiN-hr8To5Tq6k';
      const expectedAction = {
        type: types.CLIENT_LOGIN
      };
      const action = accessActions.clientLogin(token);
      expect(action.type).toEqual(expectedAction.type);
    });
  });
});
