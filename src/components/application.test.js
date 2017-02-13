import React from 'react';
import ReactDOM from 'react-dom';
import Application from './application';

it('renders wwwithout crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Application />, div);
});