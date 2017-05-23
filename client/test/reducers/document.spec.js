import expect from 'expect';
import { documents, document as documentReducer } from '../../reducers/documentReducer';
import * as types from '../../actions/types';

describe('Documents Reducer', () => {
  it('should set documents when passed LOAD_DOCUMENTS_SUCCESS', () => {
    // arrange
    const initialState = [];
    const loadedDocuments = [
      { id: '1', title: 'A' },
      { id: '2', title: 'B' },
      { id: '3', title: 'C' }
    ];
    const action = { type: types.LOAD_DOCUMENTS_SUCCESS, documents: loadedDocuments };

    // act
    const newState = documents(initialState, action);

    expect(newState).toEqual(loadedDocuments);
  });

  it('should add document when passed CREATE_DOCUMENT_SUCCESS', () => {
    // arrange
    const initialState = [
      { title: 'A' },
      { title: 'B' }
    ];
    const newDocument = { title: 'Inception' };
    const action = { type: types.CREATE_DOCUMENT_SUCCESS, document: newDocument };

    // act
    const newState = documents(initialState, action);

    // assert
    expect(newState.length).toEqual(3);
    expect(newState[0].title).toEqual('Inception');
    expect(newState[1].title).toEqual('A');
    expect(newState[2].title).toEqual('B');
  });

  it('should update document when passed UPDATE_DOCUMENT_SUCCESS', () => {
    // arrange
    const initialState = [
      { id: '1', title: 'A' },
      { id: '2', title: 'B' },
      { id: '3', title: 'C' }
    ];
    const document = { id: '2', title: 'New Title' };
    const action = { type: types.UPDATE_DOCUMENT_SUCCESS, document };

    // act
    const newState = documents(initialState, action);
    const updatedDocument = newState.find(doc => doc.id === document.id);
    const untouchedDocument = newState.find(doc => doc.id === '1');

    // assert
    expect(updatedDocument.title).toEqual('New Title');
    expect(untouchedDocument.title).toEqual('A');
    expect(newState.length).toEqual(initialState.length);
  });

  it('should set search result when passed SEARCH_SUCCESS', () => {
    // arrange
    const initialState = [];
    const searchResult = [
      { id: '1', title: 'A' },
      { id: '2', title: 'B' },
      { id: '3', title: 'C' }
    ];
    const action = { type: types.SEARCH_SUCCESS, searchResult };

    // act
    const newState = documents(initialState, action);

    expect(newState).toEqual(searchResult);
  });

  it('should set user documents when passed GET_USER_DOCUMENTS_SUCCESS', () => {
    // arrange
    const initialState = [];
    const userDocuments = [
      { id: '1', title: 'A' },
      { id: '2', title: 'B' },
      { id: '3', title: 'C' }
    ];
    const action = { type: types.GET_USER_DOCUMENTS_SUCCESS, documents: userDocuments };

    // act
    const newState = documents(initialState, action);

    expect(newState).toEqual(userDocuments);
  });
});

describe('Document Reducer', () => {
  it('should set document when passed GET_DOCUMENT_SUCCESS', () => {
    // arrange
    const initialState = {};
    const loadedDocument = { title: 'Inception' };
    const action = { type: types.GET_DOCUMENT_SUCCESS, document: loadedDocument };

    // act
    const newState = documentReducer(initialState, action);

    // assert
    expect(newState).toEqual(loadedDocument);
  });
});
