import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import Loginreducer from '../components/pages/LoginPage/reducer';

const reducers = {
  routing,
  form,
  Loginreducer,
};

const req = require.context('.', true, /\.\/.+\/reducer\.js$/);

req.keys().forEach((key) => {
  const storeName = key.replace(/\.\/(.+)\/.+$/, '$1');
  reducers[storeName] = req(key).default;
});

export default combineReducers(reducers);
