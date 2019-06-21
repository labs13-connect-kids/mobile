function isStateWithTwoWords(state) {
  const statesWithTwoWords = new Set([
    'hampshire',
    'jersey',
    'york',
    'mexico',
    'carolina',
    'dakota',
    'island',
    'virginia'
  ]);
  return statesWithTwoWords.has(state.toLowerCase());
}

function isVirginia(state, prevWord) {
  return (
    state.toLowerCase() === 'virginia' && prevWord.toLowerCase() !== 'west'
  );
}

function isZipCode(zip) {
  return zip.replace(/[^0-9]+/g, '').length === 5;
}

export const parseAddress = address => {
  addressObj = {};
  const splitAddress = address
    .trim()
    .replace(/,/g, '')
    .split(' ');

  //  isZipcode
  if (isZipCode(splitAddress[splitAddress.length - 1])) {
    zip_code = splitAddress.pop();
    addressObj.zip_code = zip_code;
  }

  // isState
  if (!splitAddress[splitAddress.length - 1].replace(/[^0-9]+/g, '').length) {
    let state = splitAddress.pop();
    if (isStateWithTwoWords(state)) {
      if (isVirginia(state, splitAddress[splitAddress.length - 1])) {
      } else {
        state = splitAddress.pop() + ' ' + state;
      }
    }
    addressObj.state = state;
    let city = splitAddress.pop();
    addressObj.city = city;
  }
  // isAptNumber
  let parsedHouseNumber = splitAddress[0].split('-');
  if (parsedHouseNumber.length === 2) {
    let apartment = parsedHouseNumber[1];
    addressObj.apartment = apartment;
  }
  let house = parsedHouseNumber[0];
  addressObj.house = house;
  splitAddress.shift();

  let street = splitAddress.join(' ');
  addressObj.street = street;

  return addressObj;
};

export const parseCityState = cityState => {
  let splitAddress = cityState.trim().split(' ');
  if (splitAddress.length > 1) {
    let state = splitAddress.pop();
    if (isStateWithTwoWords(state)) {
      if (isVirginia(state, splitAddress[splitAddress.length - 1])) {
      } else {
        state = splitAddress.pop() + ' ' + state;
      }
    }
    let city = splitAddress.join(' ').replace(/,/g, '');
    return {
      state: state,
      city: city
    };
  }
};

export const parseName = name => {
  let splitName = name
    .trim()
    .replace(/,/g, '')
    .split(' ');
  if (splitName.length === 2) {
    return { first: splitName[0], last: splitName[1] };
  } else if (splitName.length === 3) {
    return {
      first: splitName[0],
      middle: splitName[2],
      last: splitName[1]
    };
  }
};
