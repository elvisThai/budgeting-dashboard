const TOKEN_KEY = 'budgetingDashboardToken';

const parseError = async (response) => {
  //read backend error response safely
  const data = await response.json().catch(() => ({}));

  if (data.error) {
    return data.error;
  }

  if (data.errors) {
    const firstError = Object.values(data.errors)[0];
    return Array.isArray(firstError) ? firstError[0] : firstError;
  }

  return 'Request failed.';
};

const authRequest = async (path, options = {}) => {
  //send auth request to backend
  const response = await fetch(path, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
};

export const storeToken = (token) => {
  //save jwt after login or register
  localStorage.setItem(TOKEN_KEY, token);
};

export const getStoredToken = () => localStorage.getItem(TOKEN_KEY);

export const clearStoredToken = () => {
  //remove jwt on logout or invalid session
  localStorage.removeItem(TOKEN_KEY);
};

export const loginUser = async ({ email, password }) => {
  //submit login form to backend
  const data = await authRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

  storeToken(data.token);
  return data;
};

export const registerUser = async ({ email, password }) => {
  //submit register form to backend
  const data = await authRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

  storeToken(data.token);
  return data;
};

export const getCurrentUser = async (token = getStoredToken()) => {
  //load current user from saved jwt
  return authRequest('/auth/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
