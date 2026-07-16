import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        console.log("Login button clicked");

        try {

            console.log("Sending request...");

            const response = await api.post("/api/auth/login", {
                email,
                password
            });

            console.log("Response:", response);

            localStorage.setItem("token", response.data);

            alert("Login Successful!");

            navigate("/dashboard");

        } catch (error) {

            console.log("ERROR:", error);

            console.log("Response:", error.response);

            if (error.response) {

                alert(
                    `Status: ${error.response.status}\n\n${JSON.stringify(error.response.data)}`
                );

            } else {

                alert(error.message);

            }

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-100">

            <div className="bg-white p-8 rounded-xl shadow-lg w-96">

                <h1 className="text-3xl font-bold text-center mb-8">
                    URL Shortener
                </h1>

                <form onSubmit={handleLogin}>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border p-3 rounded mb-4"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border p-3 rounded mb-6"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
                    >
                        Login
                    </button>

                </form>

                <p className="text-center mt-5">
                    Don't have an account?
                    <Link
                        to="/register"
                        className="text-blue-600 ml-2"
                    >
                        Register
                    </Link>
                </p>

            </div>

        </div>

    );

}

export default Login;