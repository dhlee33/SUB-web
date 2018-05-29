import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import LoginReducer from '../components/pages/LoginPage/reducer';
import HomePageReducer from '../components/pages/HomePage/reducer';
import NewPostReducer from '../components/pages/NewPostPage/reducer';
import ContentDetailReducer from '../components/pages/ContentDetailPage/reducer';
import SignUpReducer from '../components/pages/SignUpPage/reducer';

const reducers = {
  routing,
  form,
  LoginReducer,
  HomePageReducer,
  NewPostReducer,
  ContentDetailReducer,
  SignUpReducer,
};

const req = require.context('.', true, /\.\/.+\/reducer\.js$/);

req.keys().forEach((key) => {
  const storeName = key.replace(/\.\/(.+)\/.+$/, '$1');
  reducers[storeName] = req(key).default;
});

export default combineReducers(reducers);
