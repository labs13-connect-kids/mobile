export const createEvent = success => {
  let emailAddress = '';
  let options = {};
  if (typeof success === 'string') {
    options = {
      possibleMatches: this.props.possiblePersons.length,
      personMatch: false
    };
  } else {
    options = {
      possibleMatches: 0,
      personMatch: true
    };
  }
  if (!this.props.user) {
    emailAddress = 'anonymous@unknown.org';
  } else {
    emailAddress = this.props.user.email;
  }
  const event = {
    emailAddress,
    event:
      typeof success === 'string'
        ? `person-search-${success}`
        : `person-search-${success[0]}`,
    options
  };
  return event;
};
