const renderMaskedOrResult = (field, type) => {
  if (field !== 'value available in full api response' && type !== 'phone') {
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
      return field.slice(0, -3) + '***';
    case 'emails':
      return field;
    default:
      break;
  }
};

export default renderMaskedOrResult;
