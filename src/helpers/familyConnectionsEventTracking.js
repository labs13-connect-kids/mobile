export const createConnectionsEvent = email => {
  return {
    email,
    event: 'request-familyconnections'
  };
};
