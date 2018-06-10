import React from 'react';
import renderer from 'react-test-renderer';
import DetailPage from './index';

describe('DetailPage', () => {
  let component = null;

  it('renders correctly', () => {
    component = renderer.create(<DetailPage />);
  });

});
