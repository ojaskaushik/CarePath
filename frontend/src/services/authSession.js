let accessToken = null;
let currentUser = null;

export function setAuthSession(token, user) {
  accessToken = token;
  currentUser = user;
}

export function getAccessToken() {
  return accessToken;
}

export function getCurrentUser() {
  return currentUser;
}

export function clearAuthSession() {
  accessToken = null;
  currentUser = null;
}
