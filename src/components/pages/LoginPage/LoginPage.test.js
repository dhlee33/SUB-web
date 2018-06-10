import React from 'react';
import renderer from 'react-test-renderer';
import LoginPage from './index';

describe('LoginPage', () => {
  let component = null;

  it('renders correctly', () => {
    component = renderer.create(<LoginPage />);
  });

});
