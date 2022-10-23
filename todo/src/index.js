import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

//!слежение глаз

document.onmousemove = function (event){
  let x = event.x ;
  let y = event.y  ;
  console.log(x + ' ' + y);
  document.querySelector('.y-1').style.transform = 'rotate(' + 57.2958 * arcctg(x, y) + 'deg'
  document.querySelector('.y-3').style.transform = 'rotate(' + 57.2958 * arcctg(x - 116, y) + 'deg' 

  function arcctg(x, y){
    if(x > 0 && y > 0){ return Math.PI / 2 - Math.atan(x / y)}
    if(x < 0 && y > 0){ return Math.PI / 2 - Math.atan(x / y)}
    if(x < 0 && y < 0){ return Math.PI + Math.atan(y / x)}
    if(x > 0 && y < 0){ return 3 * Math.PI / 2 + Math.atan(x / y)}
  }
}

root.render(

    <App />

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
