export const createSearchEvent = message => {
  let emailAddress = '';
  let options = {};
  if (typeof message === 'string') {
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

// possiblePersonIndex: 0
// emailIndex: 0
// phoneIndex: 0
// addressIndex: 2
// urlIndex: 0
// relationshipIndex: 0
