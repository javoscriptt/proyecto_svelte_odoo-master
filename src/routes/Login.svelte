<script>
  import { user } from '../stores/userStore';
  import { login } from '../api/auth';

  let username = '';
  let password = '';

  const handleLogin = async () => {
    const success = await login(username, password);
    if (success) {
      user.set({ username, role: 'standard' }); // Ajustar según el rol real
    } else {
      alert('Login failed');
    }
  };
</script>

<main>
  <h1>Login</h1>
  <input type="text" bind:value={username} placeholder="Username" />
  <input type="password" bind:value={password} placeholder="Password" />
  <button on:click={handleLogin}>Login</button>
</main>

<style>
  /* ...existing code... */
</style>
