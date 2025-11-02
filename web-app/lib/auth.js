// lib/auth.js

export function saveToken(token) {
  if (typeof window !== "undefined") {
    localStorage.setItem("authToken", token);
  }
}

export function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  }
}
