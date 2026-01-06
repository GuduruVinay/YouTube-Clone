import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [createAccount, setCreateAccount] = useState(false);
    const [header, setHeader] = useState("Sign in");

    const navigate = useNavigate();

    // Handle Login (Existing User)
    async function handleLogin(e) {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                username: username,
                password
            });

            // Save user & token to LocalStorage
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.details));

            // Redirect to Home
            navigate('/');
            // Quick refresh to update Navbar state
            window.location.reload();
        } catch(err) {
            console.error(err);
            alert("Login Failed! Check credentials.");
        }
    };

    async function handleRegister(e) {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/auth/register", {
                username: username,
                email,
                password
            });
            alert("Account created! Please Sign In now.");
        } catch(err) {
            console.error(err);
            alert("Registration failed!");
        }
    }

    // Handle Create Account and Change Header
    function handleCreateAccount() {
        if(createAccount){
            setCreateAccount(false);
            setHeader("Create a YouTube Clone Account");
        } else {
            setCreateAccount(true);
            setHeader("Sign in");
        }
    }

    return (
        <div className="flex flex-col p-8 gap-4">
            <div className="flex flex-col gap-4">
                <Link to='/' className='w-full'>
                    <img src="/youtube_favicon.png" alt="YouTube Logo" width={48} />
                </Link>
                <h1 className="text-3xl font-medium">{header}</h1>
                <h2 className="font-light mb-5">to continue to YouTube Clone</h2>
            </div>
            {createAccount ? (
                <div>
                    <input 
                        className="border border-gray-400 rounded bg-transparent p-2 mb-4 w-full focus:outline-none"
                        placeholder="Username"
                        onChange={e => setUsername(e.target.value)}
                    />
                    <input
                        className="border border-gray-400 rounded bg-transparent p-2 mb-4 w-full focus:outline-none"
                        type="email"
                        placeholder="Email"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        className="border border-gray-400 rounded bg-transparent p-2 mb-4 w-full focus:outline-none"
                        type="password"
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div className="flex justify-between items-center">
                        <button onClick={handleCreateAccount} className="cursor-pointer text-[#065fd4]">
                            Already have an account
                        </button>
                        <button
                            className="px-5 py-2.5 bg-[#3ea6ff] rounded-4xl cursor-pointer mt-2 hover:bg-[#3185cc]"
                            onClick={handleLogin}
                        >
                            Sign up
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <input 
                        className="border border-gray-400 rounded bg-transparent p-2 mb-4 w-full focus:outline-none"
                        placeholder="Username"
                        onChange={e => setUsername(e.target.value)}
                    />
                    <input
                        className="border border-gray-400 rounded bg-transparent p-2 mb-4 w-full focus:outline-none"
                        type="password"
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div className="flex justify-between items-center">
                        <button onClick={handleCreateAccount} className="cursor-pointer text-[#065fd4]">
                            Create account
                        </button>
                        <button
                            className="px-5 py-2.5 bg-[#3ea6ff] rounded-4xl cursor-pointer mt-2 hover:bg-[#3185cc]"
                            onClick={handleLogin}
                        >
                            Sign in
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SignIn;