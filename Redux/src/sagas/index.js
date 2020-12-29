import { all } from 'redux-saga/effects';
import carsSagas from './cars';

export default function* rootSaga() {
  yield all([...carsSagas]);
}
