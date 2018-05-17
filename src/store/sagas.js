import { fork } from 'redux-saga/effects';
import LoginSaga from '../components/pages/LoginPage/saga';
import HomePageSaga from '../components/pages/HomePage/saga';
import NewPostSaga from '../components/pages/NewPostPage/saga';

const req = require.context('.', true, /\.\/.+\/sagas\.js$/);

const sagas = [...HomePageSaga, ...LoginSaga, ...NewPostSaga];

req.keys().forEach((key) => {
  sagas.push(req(key).default);
});

export default function* () {
  yield sagas.map(fork);
}
