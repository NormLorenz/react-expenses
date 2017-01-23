
// https://facebook.github.io/react/blog/2016/07/13/mixins-considered-harmful.html


import React, { Component } from 'react';



function convertCentsToDollars(amount) {
    let dollars = Math.floor(amount / 100);
    let cents = amount % 100;
    if (cents.toString().length === 1) { cents = '0' + cents; }
    return `${dollars}.${cents}`;
  }

