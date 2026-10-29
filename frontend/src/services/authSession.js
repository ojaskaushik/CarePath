let accessToken = null;
let currentUser = null;

const listeners = new Set();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export function subscribeToAuth(listener) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function setAuthSession(token, user) {
  accessToken = token;
  currentUser = user;
  notifyListeners();
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
  notifyListeners();
}
