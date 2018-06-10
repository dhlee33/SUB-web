import React from 'react';
import renderer from 'react-test-renderer';
import ProfilePage from './index';

describe('ProfilePage', () => {
  let component = null;

  it('renders correctly', () => {
    component = renderer.create(<ProfilePage />);
  });

});
