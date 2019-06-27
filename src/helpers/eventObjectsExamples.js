// =====================================================================================
// =================================== EVENT TYPES =====================================
// =====================================================================================

// ========== NOT LOGGED IN ===========
// - 'click-do-not-watch-video'
// - 'click-i-am-not-a-social-worker'
// - 'click-logo'
// - 'click-post-watch-video-sign-up'
// - 'click-possible_person'
// - 'click-sign-up'
// - 'click-watch-video'
// - 'click-yes-i-am-a-social-worker'
// - 'close-introduction-video'
// - 'open-introduction-video'
// - 'search-person-success' (SINGLE AND MULTIPLE)

// ========== LOGGED IN ===========
// - (RE-ENTERING APP FROM AUTH0 HAS NO EVENT KEY BUT DOES SEND THE EMAILADDRESS IN AN OBJECT)
// - 'click-relationship'
// - 'click-logo'
// - 'click-logout'
// - 'click-person_address_search'
// - 'click-person_address_view'
// - 'click-person_email_search'
// - 'click-person_email_send'
// - 'click-person_phone_call'
// - 'click-person_phone_search'
// - 'click-person_url_search'
// - 'click-person_url_view'
// - 'click-possible_person'
// - 'close-introduction-video'
// - 'open-introduction-video'
// - 'search-person-success'  (SINGLE AND MULTIPLE)
// - 'served-child-success'

// =====================================================================================
// ================================ HEADERS OBJECTS ====================================
// =====================================================================================

// FULL HEADER
requestHeaders = {
  authority: 'dev.search.connectourkids.org',
  method: 'POST',
  path: '/api/sendEvent',
  scheme: 'https',
  accept: 'application/json, text/plain, */*',
  ['accept-encoding']: 'gzip, deflate, br',
  ['accept-language']: 'en-US,en;q=0.9',
  ['content-length']: 64,
  ['content-type']: 'text/plain',
  cookie: '_ga=GA1.2.1825132245.1561493986; _gid=GA1.2.1748212057.1561493986',
  origin: 'https://dev.search.connectourkids.org',
  referer:
    'https://dev.search.connectourkids.org/search;m=steve%20smith;t=name',
  ['user-agent']:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'
};

//SHORT HEADER
requestHeaders = {
  Accept: 'application/json, text/plain, */*',
  ['Content-Type']: 'text/plain',
  Origin: 'https://dev.search.connectourkids.org',
  Referer:
    'https://dev.search.connectourkids.org/search;m=steve%20smith;t=name',
  ['User-Agent']:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'
};

// =====================================================================================
// ========================== UNAUTHENTICATED EVENT TRACKING ===========================
// =====================================================================================

// CLICK SIGN UP EVENT
// FULL HEADER
requestPayload = {
  event: 'click-sign-up',
  emailAddress: 'anonymous@unknown.org'
};

// CLICKING I AM NOT A SOCIAL WORKER EVENT
//SHORT HEADER
requestPayload = {
  event: 'click-i-am-not-a-social-worker',
  emailAddress: 'anonymous@unknown.org'
};

// CLICKING YES I WORK WITH FOSTER KIDS
//SHORT HEADER
requestPayload = {
  event: 'click-yes-i-am-a-social-worker',
  emailAddress: 'anonymous@unknown.org'
};

// CLICKING DO NOT WATCH VIDEO
//SHORT HEADER
requestPayload = {
  event: 'click-do-not-watch-video',
  emailAddress: 'anonymous@unknown.org'
};

// CLICKING SHOW ME THE VIDEO
//SHORT HEADER
requestPayload = {
  event: 'click-watch-video',
  emailAddress: 'anonymous@unknown.org'
};

// CLICKING TAKE ME TO SIGN UP
// FULL HEADER
requestPayload = {
  event: 'click-post-watch-video-sign-up',
  emailAddress: 'anonymous@unknown.org'
};

// CLOSING VIDEO MODAL EARLY EVENT

// FULL HEADER
requestPayload = {
  event: 'close-introduction-video',
  emailAddress: 'anonymous@unknown.org'
};

// CLICKING WATCH A 2 MINUTE QUICK INTRODUCTION VIDEO

// FULL HEADER
requestPayload = {
  event: 'open-introduction-video',
  emailAddress: 'anonymous@unknown.org'
};

// CLICKING LOGO EVENT
// FULL HEADER
requestPayload = {
  event: 'click-logo',
  emailAddress: 'anonymous@unknown.org'
};

// NAME SEARCH EVENT FROM FORM (PRODUCING LIST OF MULTIPLE RESULTS)
// FULL HEADER
requestPayload = {
  emailAddress: 'anonymous@unknown.org',
  event: 'search-person-success',
  options: {
    possibleMatches: 16,
    personMatch: false
  }
};

// CLICKING ON A SEARCH RESULT
// FULL HEADER
requestPayload = {
  emailAddress: 'anonymous@unknown.org',
  event: 'click-possible_person',
  options: {
    possiblePersonIndex: 0
  }
};

// NAME SEARCH EVENT FROM FORM (PRODUCING SINGLE RESULT)
// FULL HEADER
requestPayload = {
  emailAddress: 'anonymous@unknown.org',
  event: 'search-person-success',
  options: {
    possibleMatches: 0,
    personMatch: true
  }
};

// SEARCH PERSON FAILED EVENT
// FULL HEADER
requestPayload = {
  emailAddress: 'anonymous@unknown.org',
  event: 'search-person-success',
  options: {
    possibleMatches: 0,
    personMatch: true
  }
};

// =====================================================================================
// ============================ AUTHENTICATED EVENT TRACKING ===========================
// =====================================================================================

//REENTERING APP FROM LOGIN
// FULL HEADER
requestPayload = {
  emailAddress: 'rytwalker@gmail.com'
};

// CLICK LOGOUT EVENT
// SHORT HEADER
requestPayload = {
  event: 'click-logout',
  emailAddress: 'rytwalker@gmail.com'
};

// CLICKING SERVING A NEW CHILD MODALS BACK TO SEARCH BUTTON
// FULL HEADER
requestPayload = {
  emailAddress: 'rytwalker@gmail.com',
  event: 'served-child-success'
};

// CLICKING LOGO EVENT
// FULL HEADER
requestPayload = {
  event: 'click-logo',
  emailAddress: 'rytwalker@gmail.com'
};

// CLICKING WATCH A 2 MINUTE QUICK INTRODUCTION VIDEO
// FULL HEADER
requestPayload = {
  event: 'open-introduction-video',
  emailAddress: 'rytwalker@gmail.com'
};

// CLOSING THE INTRODUCTORY VIDEO
// FULL HEADER
requestPayload = {
  emailAddress: 'rytwalker@gmail.com',
  event: 'close-introduction-video'
};

// SEARCHING BY NAME SUCCESS EVENT (MULTIPLE MATCHES)
// FULL HEADER
requestPayload = {
  emailAddress: 'rytwalker@gmail.com',
  event: 'search-person-success',
  options: {
    possibleMatches: 17,
    personMatch: false
  }
};

// POSSIBLE PERSON SEARCH SUCCESS EVENT (SINGLE PERSON)
// FULL HEADER
requestPayload = {
  emailAddress: 'rytwalker@gmail.com',
  event: 'search-person-success',
  options: { possibleMatches: 0, personMatch: true }
};

// CLICKING POSSIBLE PERSON EVENT FROM LIST
// FULL HEADER
requestPayload = {
  emailAddress: 'rytwalker@gmail.com',
  event: 'click-possible_person',
  options: { possiblePersonIndex: 0 }
};

// CLICKING PERSON EMAIL SEARCH
// FULL HEADER
requestPayload = {
  emailAddress: 'rytwalker@gmail.com',
  event: 'click-person_email_search',
  options: { emailIndex: 0 }
};

// CLICKING PERSON EMAIL SEND
// FULL HEADER
requestPayload = {
  emailAddress: 'rytwalker@gmail.com',
  event: 'click-person_email_send',
  options: { emailIndex: 0 }
};

// CLICKING PERSON PHONE SEARCH
// FULL HEADER
requestPayload = {
  emailAddress: 'rytwalker@gmail.com',
  event: 'click-person_phone_search',
  options: { phoneIndex: 0 }
};

// CLICKING CALL THIS NUMBER FROM MODAL AFTER PRESSING A PHONE NUMBER LINK
// FULL HEADER
requestPayload = {
  emailAddress: 'rytwalker@gmail.com',
  event: 'click-person_phone_call',
  options: { phoneIndex: 0 }
};

// CLICKING PERFORM SEARCH ON ADDRESS FROM MODAL AFTER CLICKING ADDRESS LINK
// FULL HEADER
requestPayload = {
  emailAddress: 'rytwalker@gmail.com',
  event: 'click-person_address_search',
  options: { addressIndex: 0 }
};

// CLICKING VIEW ON MAP FROM MODAL AFTER CLICKING ADDRESS LINK
// FULL HEADER
requestPayload = {
  emailAddress: 'rytwalker@gmail.com',
  event: 'click-person_address_view',
  options: { addressIndex: 2 }
};

// CLICKING PERFORM A SEARCH FROM MODAL WHEN CLICKING A URL LINK
// FULL HEADER
requestPayload = {
  emailAddress: 'rytwalker@gmail.com',
  event: 'click-person_url_search',
  options: { urlIndex: 0 }
};

// CLICKING VIEW THE URL FROM MODAL WHEN CLICKING A URL LINK
// FULL HEADER
requestPayload = {
  emailAddress: 'rytwalker@gmail.com',
  event: 'click-person_url_view',
  options: { urlIndex: 0 }
};

// CLICKING A RELATIONSHIP LINK FROM SINGLE PERSON RESULTS
// FULL HEADER
requestPayload = {
  emailAddress: 'rytwalker@gmail.com',
  event: 'click-relationship',
  options: { relationshipIndex: 0 }
};
