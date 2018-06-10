import React from 'react';
import renderer from 'react-test-renderer';
import EditPage from './index';

describe('EditPage', () => {
  let component = null;

  it('renders correctly', () => {
    component = renderer.create(<EditPage />);
  });

});
