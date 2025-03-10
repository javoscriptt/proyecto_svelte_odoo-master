export async function login(username, password) {
  // Simulación de autenticación
  if (username === 'admin' && password === 'admin') {
    return true;
  }
  return false;
}

export async function checkAuth() {
  // Simulación de verificación de autenticación
  return true;
}
