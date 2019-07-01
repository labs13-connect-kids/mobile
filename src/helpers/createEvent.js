import constants from './constants';
import axios from 'axios';

// export const createSearchEvent = message => {
//   let emailAddress = '';
//   let options = {};
//   if (typeof message === 'string') {
//     options = {
//       possibleMatches: this.props.possiblePersons.length,
//       personMatch: false
//     };
//   } else {
//     options = {
//       possibleMatches: 0,
//       personMatch: true
//     };
//   }
//   if (!this.props.user) {
//     emailAddress = 'anonymous@unknown.org';
//   } else {
//     emailAddress = this.props.user.email;
//   }
//   const event = {
//     emailAddress,
//     event:
//       typeof success === 'string'
//         ? `person-search-${success}`
//         : `person-search-${success[0]}`,
//     options
//   };
//   return event;
// };

// possiblePersonIndex: 0
// emailIndex: 0
// phoneIndex: 0
// addressIndex: 2
// urlIndex: 0
// relationshipIndex: 0

export const sendUserInfo = emailAddress => {
  console.log(emailAddress);
  axios.post(constants.devEventTrackingURL, { emailAddress });
};

export const sendEvent = (
  emailAddress,
  verb,
  noun,
  outcome = null,
  options = null
) => {
  if (emailAddress === null) {
    emailAddress = 'anonymous@unknown.org';
  }
  const bodyObject = {};

  bodyObject['event'] = `${verb}-${noun}`;

  if (outcome !== null) {
    bodyObject['event'] += `-${outcome}`;
  }

  bodyObject['emailAddress'] = emailAddress;

  if (options !== null) {
    bodyObject['options'] = options;
  }
  console.log(bodyObject);
  axios
    .post(constants.devEventTrackingURL, JSON.stringify(bodyObject))
    .then(res => {
      console.log('EVENT TRACKING RES: ', res);
    })
    .catch(err => console.error('Event Tracking Error: ', err));
};
console.log(
  sendEvent(null, 'click', 'search_person', 'success', {
    possibleMatches: 10,
    personMatch: false
  })
);
