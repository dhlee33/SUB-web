import React from 'react';
import renderer from 'react-test-renderer';
import HomePage from './index';

describe('HomePage', () => {
  let component = null;

  it('renders correctly', () => {
    component = renderer.create(<HomePage />);
  });

});
