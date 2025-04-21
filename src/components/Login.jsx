import { useState } from "react"
import { useNavigate } from "react-router-dom"


function Login({setToken}){
    const [ username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleLogin = async (e) =>{
        e.preventDefault()

        try {
          const res = await fetch("https://fsa-recipe.up.railway.app/api/auth/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ username, password }),
            });
      
            if (!res.ok) {
              throw new Error("Login failed");
            }
      
            const data = await res.json();
            setToken(data.token)
            localStorage.setItem("token", data.token);
            navigate("/");
          } catch (err) {
            setError("Invalid username or password");
            console.error(err);
          }
        };
      
    return(
        <div className="auth-container">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin}>
                <label>Username:</label>
                <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <label>Password:</label>
                <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login