const API_BASE_URL = "http://localhost:8000";

let accessToken = null;
let currentUser = null;
let sessionLoading = true;

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

export function getAccessToken() {
  return accessToken;
}

export function getCurrentUser() {
  return currentUser;
}

export function isAuthLoading() {
  return sessionLoading;
}

export function setAuthSession(token, user) {
  accessToken = token;
  currentUser = user;
  sessionLoading = false;
  notifyListeners();
}

export function clearAuthSession() {
  accessToken = null;
  currentUser = null;
  sessionLoading = false;
  notifyListeners();
}

export async function restoreAuthSession() {
  sessionLoading = true;
  notifyListeners();

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/auth/me`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      clearAuthSession();
      return;
    }

    const user = await response.json();

    currentUser = user;
    sessionLoading = false;
    notifyListeners();
  } catch {
    clearAuthSession();
  }
}

export async function signOut() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/auth/logout`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Unable to sign out");
    }

    clearAuthSession();
    return true;
  } catch {
    return false;
  }
}
