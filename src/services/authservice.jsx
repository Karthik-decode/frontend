
const AUTH_KEY = "nutriTrackAuth";
const ACCOUNT_KEY = "nutriTrackAccount";
const TOKEN_KEY = "nutriTrackToken";

// Uses the Vercel environment variable when configured.
// Falls back to the deployed Render backend.
const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "https://backend-1-9w9u.onrender.com/api"
).replace(/\/+$/, "");

function getStorage(rememberMe = false) {
  return rememberMe ? localStorage : sessionStorage;
}

async function postRequest(endpoint, payload) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(
      "Cannot connect to the Nutri-Track server. Please try again shortly."
    );
  }

  let data = {};

  try {
    data = await response.json();
  } catch {
    // The server may return an empty response body.
  }

  if (!response.ok) {
    throw new Error(
      data.message ||
        data.detail ||
        (response.status === 409
          ? "An account with this email already exists."
          : response.status === 401
            ? "Email or PIN is incorrect."
            : `Request failed (${response.status}).`)
    );
  }

  return data;
}

function saveSession(data, rememberMe = false) {
  const session = {
    id: data.id,
    name: data.name || "",
    email: data.email || "",
    authenticated: true,
    rememberMe,
    loginTime: Date.now(),
  };

  const storage = getStorage(rememberMe);

  // Avoid leaving an old session in the other storage.
  localStorage.removeItem(AUTH_KEY);
  sessionStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);

  storage.setItem(AUTH_KEY, JSON.stringify(session));

  if (data.token) {
    storage.setItem(TOKEN_KEY, data.token);
  }

  // Store only non-sensitive account details.
  localStorage.setItem(
    ACCOUNT_KEY,
    JSON.stringify({
      id: data.id,
      name: data.name || "",
      email: data.email || "",
    })
  );

  return session;
}

export async function registerAccount(name, email, pin) {
  const normalizedName = name?.trim();
  const normalizedEmail = email?.trim().toLowerCase();

  if (!normalizedName) {
    throw new Error("Name is required.");
  }

  if (!normalizedEmail) {
    throw new Error("Email address is required.");
  }

  if (!/^\d{4}$/.test(pin)) {
    throw new Error("PIN must contain exactly 4 digits.");
  }

  const data = await postRequest("/auth/register", {
    name: normalizedName,
    email: normalizedEmail,
    pin,
  });

  return {
    success: true,
    message: data.message || "Registration successful",
    name: data.name || normalizedName,
    email: data.email || normalizedEmail,
    id: data.id,
    token: data.token,
  };
}

export async function loginAccount(
  email,
  pin,
  rememberMe = false
) {
  const normalizedEmail = email?.trim().toLowerCase();

  if (!normalizedEmail) {
    return {
      success: false,
      message: "Please enter your email address.",
    };
  }

  if (!/^\d{4}$/.test(pin)) {
    return {
      success: false,
      message: "PIN must contain exactly 4 digits.",
    };
  }

  try {
    const data = await postRequest("/auth/login", {
      email: normalizedEmail,
      pin,
    });

    const session = saveSession(data, rememberMe);

    return {
      success: true,
      session,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Login failed.",
    };
  }
}

export function getAuthSession() {
  for (const storage of [localStorage, sessionStorage]) {
    const savedSession = storage.getItem(AUTH_KEY);

    if (!savedSession) {
      continue;
    }

    try {
      const session = JSON.parse(savedSession);

      if (session?.authenticated) {
        return session;
      }
    } catch {
      storage.removeItem(AUTH_KEY);
      storage.removeItem(TOKEN_KEY);
    }
  }

  return null;
}

export function getAuthToken() {
  return (
    localStorage.getItem(TOKEN_KEY) ||
    sessionStorage.getItem(TOKEN_KEY) ||
    null
  );
}

export function isAuthenticated() {
  const session = getAuthSession();
  return Boolean(session?.authenticated);
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
  sessionStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
}

export function deleteAccount() {
  // Clears the local session only.
  // It does not delete the account from the backend database.
  logout();
  localStorage.removeItem(ACCOUNT_KEY);
}

export function getAccount() {
  const savedAccount = localStorage.getItem(ACCOUNT_KEY);

  if (savedAccount) {
    try {
      return JSON.parse(savedAccount);
    } catch {
      localStorage.removeItem(ACCOUNT_KEY);
    }
  }

  const session = getAuthSession();

  if (session) {
    return {
      id: session.id,
      name: session.name,
      email: session.email,
    };
  }

  return null;
}
