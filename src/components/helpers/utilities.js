/* global google */
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

//region mileage routines

export function calculateMileage(directions) {
  const MetersToMilesConst = 1609.334;
  let mileage = 0;

  if (directions) {
    let meters = directions.routes[0].legs
      .map(function (a) { return a.distance.value; })
      .reduce(function (a, b) { return a + b; });
    mileage = Math.round(meters / MetersToMilesConst);
  }

  return mileage;
};

export function getDirections(wayPoints, places) {
  return new Promise((resolve, reject) => {

    let legs = wayPoints
      .filter(function (a) { return a.place != null; })
      .map(function (a) {
        let place = places.find(function (b) { return a.place === b.key; });
        return { lat: place.data.latitude, lng: place.data.longitude };
      });

    if (legs.length < 2) {
      reject('must have at least two places to compute mileage')
    }

    else {
      let request = {
        origin: legs[0],
        waypoints: legs
          .slice(1, legs.length - 1)
          .map(function (leg) { return { location: leg }; }),
        destination: legs[legs.length - 1],
        travelMode: google.maps.TravelMode.DRIVING
      };

      // pass the request to the directions service
      const directionsService = new google.maps.DirectionsService();
      
      directionsService.route(request, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          resolve(response);
        }
        else {
          reject(status);
        }
      });
    }
  });
};

//endregion

