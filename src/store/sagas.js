import { fork } from 'redux-saga/effects';
import LoginSaga from '../components/pages/LoginPage/saga';

const req = require.context('.', true, /\.\/.+\/sagas\.js$/);

const sagas = [LoginSaga];

req.keys().forEach((key) => {
  sagas.push(req(key).default);
});

export default function* () {
  yield sagas.map(fork);
}
