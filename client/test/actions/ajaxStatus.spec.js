import expect from 'expect';
import * as ajaxStatus from '../../actions/ajaxStatusActions';


describe('AjaxStatus Actions', () => {
  describe('BeginAjaxCall', () => {
    it('indicates the start of an ajax call dispatching BEGIN_AJAX_CALL', () => {
      const expectedAction = {
        type: 'BEGIN_AJAX_CALL'
      };

      const action = ajaxStatus.beginAjaxCall();
      expect(action).toEqual(expectedAction);
    });
  });

  describe('EndAjaxCall', () => {
    it('indicates the end of an ajax call dispatching END_AJAX_CALL', () => {
      const expectedAction = {
        type: 'END_AJAX_CALL'
      };

      const action = ajaxStatus.endAjaxCall();
      expect(action).toEqual(expectedAction);
    });
  });
});
