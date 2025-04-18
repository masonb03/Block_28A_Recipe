import { useEffect, useState } from "react";

function Auth({ token }) {
  const [auth, setAuth] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("https://fsa-recipe.up.railway.app/api/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setAuth(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    }

    if (token) {
      fetchUser();
    }
  }, [token]);

  return (
    <div className="auth-container">
      <h2>Authorize Token</h2>
      {error && <p className="error">{error}</p>}
      {auth ? (
        <div className="auth-details">
          <p><strong>Username: {auth.username}</strong></p>
          <p><strong>Token: {token.slice(0, 10)}...{token.slice(-5)}</strong></p>
        </div>
      ) : (
        <p>Loading or Please Sign In</p>
      )}
    </div>
  );
}

export default Auth;
