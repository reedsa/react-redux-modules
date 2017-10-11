class Login {
  static async authenticate(apiUrl, credentials) {
    const loginUrl = `${apiUrl}/login`;

    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.user;
    } else {
      throw new Error('Username or password is invalid. Please try again.');
    }
  }
}

export default Login;
