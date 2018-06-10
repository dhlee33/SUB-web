import React from 'react';
import renderer from 'react-test-renderer';
import SignUpPage from './index';

describe('SignUpPage', () => {
  let component = null;

  it('renders correctly', () => {
    component = renderer.create(<SignUpPage />);
  });

});
