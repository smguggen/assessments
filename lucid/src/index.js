import React from 'react';
import ReactDOM from 'react-dom';
import Question from './client/components/Question';
import { App } from './client/App';
import './style/style.css';

ReactDOM.render(<App><Question/></App>, document.getElementById('root'));
