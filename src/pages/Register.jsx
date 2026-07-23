import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            await api.post("/api/auth/register", {
                name,
                email,
                password
            });

            alert("Registration Successful! Please login.");

            navigate("/login");

        } catch (error) {

            console.error(error);

            alert("Registration Failed");

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-100">

            <div className="bg-white p-8 rounded-xl shadow-lg w-96">

                <h1 className="text-3xl font-bold text-center mb-8">
                    Register
                </h1>

                <form onSubmit={handleRegister}>

                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border p-3 rounded mb-4"
                        required
                    />

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
                        className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
                    >
                        Register
                    </button>

                </form>

                <p className="text-center mt-5">

                    Already have an account?

                    <Link
                        to="/login"
                        className="text-blue-600 ml-2"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Register;