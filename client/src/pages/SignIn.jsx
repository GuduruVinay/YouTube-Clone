import axios from "axios";
import { Link } from "react-router-dom";
import { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";

function SignIn() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
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
            setCreateAccount(false);
            handleCreateAccount();
        } catch(err) {
            console.error(err);
            alert("Registration failed!");
        }
    }

    // Handle Create Account and Change Header
    function handleCreateAccount() {
        if(createAccount){
            setCreateAccount(false);
            setHeader("Sign in");
        } else {
            setCreateAccount(true);
            setHeader("Create a YouTube Clone Account");
        }
    }

    return (
        <div className="flex md:justify-center md:items-center md:h-dvh bg-[#1e1f20]">
            <div className="md:w-[60%] flex flex-col lg:items-center lg:w-[50%] lg:h-[50%] lg:flex-row lg:justify-between p-8 lg:p-12 gap-4 md:rounded-4xl bg-white dark:bg-[#0f0f0f] dark:text-white">
                <div className="flex flex-col gap-4 lg:self-start lg:w-1/2">
                    <Link to='/' className='w-full'>
                        <img src="/youtube_favicon.png" alt="YouTube Logo" width={48} />
                    </Link>
                    <h1 className="text-3xl md:text-2xl lg:text-3xl font-medium">{header}</h1>
                    <h2 className="font-light mb-5 md:mb-2.5 lg:text-lg">to continue to YouTube Clone</h2>
                </div>
                {createAccount ? (
                    <div className="w-full lg:w-1/2">
                        <input 
                            className="border border-gray-400 rounded bg-transparent p-2 mb-4 w-full focus:outline-none"
                            placeholder="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <input
                            className="border border-gray-400 rounded bg-transparent p-2 mb-4 w-full focus:outline-none"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />                        
                        <div className="relative w-full mb-4">
                            <input
                                className="border border-gray-400 rounded bg-transparent p-2 w-full focus:outline-none"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? (<Eye />) : (<EyeClosed />)}
                            </button>
                        </div>
                        <div className="flex justify-between items-center">
                            <button onClick={handleCreateAccount} className="cursor-pointer text-[#065fd4] dark:text-[#3ea6ff]">
                                Already have an account
                            </button>
                            <button
                                className="px-5 py-2.5 bg-[#3ea6ff] rounded-4xl cursor-pointer mt-2 hover:bg-[#3185cc] text-white"
                                onClick={handleRegister}
                            >
                                Sign up
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="w-full lg:w-1/2">
                        <input 
                            className="border border-gray-400 rounded bg-transparent p-2 mb-4 w-full focus:outline-none"
                            placeholder="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <div className="relative w-full mb-4">
                            <input
                                className="border border-gray-400 rounded bg-transparent p-2 w-full focus:outline-none"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? (<Eye />) : (<EyeClosed />)}
                            </button>
                        </div>
                        <div className="flex justify-between items-center">
                            <button onClick={handleCreateAccount} className="cursor-pointer text-[#065fd4] dark:text-[#3ea6ff]">
                                Create account
                            </button>
                            <button
                                className="px-5 py-2.5 bg-[#3ea6ff] rounded-4xl cursor-pointer mt-2 hover:bg-[#3185cc] text-white"
                                onClick={handleLogin}
                            >
                                Sign in
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SignIn;