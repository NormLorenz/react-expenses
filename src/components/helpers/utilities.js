
export function convertCentsToDollars(amount) {
  let dollars = Math.floor(amount / 100);
  let cents = amount % 100;
  if (cents.toString().length === 1) { cents = '0' + cents; }
  return `${dollars}.${cents}`;
}

export function convertDollarsToCents(amount) {
  let calculatedAmount = (amount).toString().replace(/[^0-9.]/g, '');
  return Math.round(calculatedAmount * 100);
}

export function convertTextWithEllipsis(text, length) {
  let result = '';
  if (text != null && length != null) {
    result = text.substring(0, length) + '...';
  }
  return result;
}

// not enterprise ready - need to consider child nodes
export const objectToArray = snapshot => {
  let returnArr = [];
  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });
  return returnArr;
};

// not enterprise ready
export const arrayToObject = (array) =>
  array.reduce((obj, item) => {
    obj[item.key] = item
    return obj
  }, {});

// export function stringifyObject (object) {
//   return <pre>{JSON.stringify(object, null, ' ')}</pre>
// }
