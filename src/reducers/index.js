import { combineReducers } from 'redux';
import BooksReducer from './reducer_book';

const rootReducer = combineReducers({
  books: BooksReducer
});

export default rootReducer;
