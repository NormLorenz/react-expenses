// http://wesbos.com/javascript-modules/
// https://leanpub.com/understandinges6/read#leanpub-auto-encapsulating-code-with-modules

 export function convertCentsToDollars(amount) {
    let dollars = Math.floor(amount / 100);
    let cents = amount % 100;
    if (cents.toString().length === 1) { cents = '0' + cents; }
    return `${dollars}.${cents}`;
  }