const AUTH_KEY = "nutriTrackAuth";
const ACCOUNT_KEY = "nutriTrackAccount";

function getStorage(rememberMe = false) {
  return rememberMe ? localStorage : sessionStorage;
}

export function registerAccount(email, pin) {
  const normalizedEmail = email?.trim().toLowerCase();

  if (!normalizedEmail) {
    throw new Error("Email address is required.");
  }

  if (!/^\d{4}$/.test(pin)) {
    throw new Error(
      "PIN must contain exactly 4 digits."
    );
  }

  const existingAccount =
    localStorage.getItem(ACCOUNT_KEY);

  if (existingAccount) {
    try {
      const account = JSON.parse(existingAccount);

      if (account.email === normalizedEmail) {
        return {
          success: false,
          message:
            "An account with this email already exists.",
        };
      }
    } catch {
      localStorage.removeItem(ACCOUNT_KEY);
    }
  }

  const account = {
    email: normalizedEmail,
    pin,
    createdAt: Date.now(),
  };

  localStorage.setItem(
    ACCOUNT_KEY,
    JSON.stringify(account)
  );

  return {
    success: true,
    email: normalizedEmail,
  };
}

export function loginAccount(
  email,
  pin,
  rememberMe = false
) {
  const normalizedEmail = email?.trim().toLowerCase();

  if (!normalizedEmail) {
    return {
      success: false,
      message:
        "Please enter your email address.",
    };
  }

  if (!/^\d{4}$/.test(pin)) {
    return {
      success: false,
      message:
        "PIN must contain exactly 4 digits.",
    };
  }

  const savedAccount =
    localStorage.getItem(ACCOUNT_KEY);

  if (!savedAccount) {
    return {
      success: false,
      message:
        "No account found. Please create an account first.",
    };
  }

  let account;

  try {
    account = JSON.parse(savedAccount);
  } catch {
    localStorage.removeItem(ACCOUNT_KEY);

    return {
      success: false,
      message:
        "Account data is corrupted. Please register again.",
    };
  }

  if (account.email !== normalizedEmail) {
    return {
      success: false,
      message:
        "Email or PIN is incorrect.",
    };
  }

  if (account.pin !== pin) {
    return {
      success: false,
      message:
        "Email or PIN is incorrect.",
    };
  }

  const session = {
    email: normalizedEmail,
    authenticated: true,
    rememberMe,
    loginTime: Date.now(),
  };

  const storage = getStorage(rememberMe);

  storage.setItem(
    AUTH_KEY,
    JSON.stringify(session)
  );

  return {
    success: true,
    session,
  };
}

export function getAuthSession() {
  const localSession =
    localStorage.getItem(AUTH_KEY);

  if (localSession) {
    try {
      return JSON.parse(localSession);
    } catch {
      localStorage.removeItem(AUTH_KEY);
    }
  }

  const sessionStorageData =
    sessionStorage.getItem(AUTH_KEY);

  if (sessionStorageData) {
    try {
      return JSON.parse(sessionStorageData);
    } catch {
      sessionStorage.removeItem(AUTH_KEY);
    }
  }

  return null;
}

export function isAuthenticated() {
  const session = getAuthSession();

  return Boolean(
    session?.authenticated
  );
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
  sessionStorage.removeItem(AUTH_KEY);
}

export function deleteAccount() {
  localStorage.removeItem(ACCOUNT_KEY);
  localStorage.removeItem(AUTH_KEY);
  sessionStorage.removeItem(AUTH_KEY);
}

export function getAccount() {
  const savedAccount =
    localStorage.getItem(ACCOUNT_KEY);

  if (!savedAccount) {
    return null;
  }

  try {
    return JSON.parse(savedAccount);
  } catch {
    return null;
  }
}