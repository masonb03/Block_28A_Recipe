import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (username.length < 8) {
      setError("Username must be 8 or more characters.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be 6 or more characters.");
      return;
    }
    try {
      const res = await fetch("https://fsa-recipe.up.railway.app/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const data = await res.json();
      console.log(data);
      setToken(data.token);
      navigate("/");  // Redirect to Home after successful signup
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            name="username"
            onChange={(event) => setUsername(event.target.value)}
            value={username}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </label>
        <button>Sign Up</button>
      </form>
    </>
  );
}

export default Signup;
