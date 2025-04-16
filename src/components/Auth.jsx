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
    <>
      <h2>Authorize Token</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {auth ? (
        <div>
          <h2>Your username is {auth.username}</h2>
          <h2>Your token is {token}</h2>
        </div>
      ) : (
        <h2>Loading or Please Sign In</h2>
      )}
    </>
  );
}

export default Auth;
