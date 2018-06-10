import React from 'react';
import renderer from 'react-test-renderer';
import InterestPage from './index';

describe('InterestPage', () => {
  let component = null;

  it('renders correctly', () => {
    component = renderer.create(<InterestPage />);
  });

});
