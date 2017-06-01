import expect from 'expect';
import ajaxCallsInProgress from '../../reducers/ajaxStatusReducer';
import * as types from '../../actions/types';

describe('Ajax Status Reducer', () => {
  it('should increment state when passed BEGIN_AJAX_CALL', () => {
    // arange
    const initialState = 0;
    const action = { type: types.BEGIN_AJAX_CALL };

    // act
    const newState = ajaxCallsInProgress(initialState, action);

    expect(newState).toEqual(1);
  });

  it('should decrement state when an ajax call is successfull', () => {
    // arange
    const initialState = 1;
    const action = { type: types.LOAD_DOCUMENTS_SUCCESS };

    // act
    const newState = ajaxCallsInProgress(initialState, action);

    expect(newState).toEqual(0);
  });

  it('should decrement state when passed END_AJAX_CALL', () => {
    // arange
    const initialState = 1;
    const action = { type: types.END_AJAX_CALL };

    // act
    const newState = ajaxCallsInProgress(initialState, action);

    expect(newState).toEqual(0);
  });

  it('should return the state when not affected', () => {
    // arrange
    const currentState = {
      iAmInitialState: true,
    };
    const action = { type: 'AFFECT_NO_ONE' };

    // act
    const newState = ajaxCallsInProgress(currentState, action);

    expect(newState).toEqual(currentState);
  });
});
