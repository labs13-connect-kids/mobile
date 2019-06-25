/*
Once we add authentication maybe pass a param that finds out if the user is authenticated or not
*/
const renderMaskedOrResult = (field, type) => {
  if (field !== 'value available in full api response' && type !== 'phones') {
    return field;
  }

  switch (type) {
    case 'house':
      return '****';
    case 'street':
      return '********* **';
    case 'zip_code':
      return '*****';
    case 'phones':
      if (field.slice(-3) === '000') {
        return field.slice(0, -3) + '***';
      } else {
        return field;
      }
    case 'relationships':
      return '**** ********* **';
    case 'emails':
      return field;
    default:
      break;
  }
};

export default renderMaskedOrResult;
