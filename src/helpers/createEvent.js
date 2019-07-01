import constants from './constants';
import axios from 'axios';

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
  return axios
    .post(constants.devEventTrackingURL, JSON.stringify(bodyObject))
    .then(res => {
      console.log('EVENT TRACKING RES: ', res);
      return res;
    })
    .catch(err => {
      console.error('Event Tracking Error: ', err);
      return err;
    });
};
