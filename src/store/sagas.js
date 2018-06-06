import { fork } from 'redux-saga/effects';
import LoginSaga from '../components/pages/LoginPage/saga';
import HomePageSaga from '../components/pages/HomePage/saga';
import NewPostSaga from '../components/pages/NewPostPage/saga';
import SaleDetailSaga from '../components/pages/DetailPage/saga';
import SignUpSaga from '../components/pages/SignUpPage/saga';

const req = require.context('.', true, /\.\/.+\/sagas\.js$/);

const sagas = [
  ...HomePageSaga,
  ...LoginSaga,
  ...NewPostSaga,
  ...SaleDetailSaga,
  ...SignUpSaga,
];

req.keys().forEach((key) => {
  sagas.push(req(key).default);
});

export default function* () {
  yield sagas.map(fork);
}
