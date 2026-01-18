import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { Eye, EyeClosed } from "lucide-react";
import toast from "react-hot-toast";
import { signInSchema, signUpSchema } from "../utils/validation";
import z from "zod";

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [createAccount, setCreateAccount] = useState(false);
    const [header, setHeader] = useState("Sign in");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // Check if "from" state exists, otherwise default to Home ("/")
    const from = location.state?.from?.pathname || "/";

    // Handle Sign In (Existing User)
    const handleSignin = async (e) => {
        e.preventDefault();
        // Validate Sign In Data
        const result = signInSchema.safeParse({ username, password });
        if(!result.success) {
            // console.log(z.prettifyError(result.error));
            toast.error(result.error.issues[0].message);
            return;
        }
        dispatch(loginStart());
        try {
            const res = await axios.post("http://localhost:5000/api/auth/signin", { username, password });
            // Save token to LocalStorage
            localStorage.setItem("token", res.data.token);
            // Save user to LocalStorage
            const userObj = res.data.details ? res.data.details : res.data;
            localStorage.setItem("user", JSON.stringify(userObj));
            // Dispatch userObj
            dispatch(loginSuccess(userObj));
            // Redirect to Home
            // replace: true prevents the Back button from returning to the SignIn page
            navigate(from, { replace: true });
            toast.success("Welcome Back!");
        } catch(err) {
            console.error(err);
            dispatch(loginFailure());
            toast.error("Login failed! Check credentials.");
        }
    };

    // Handle Sign Up (New User)
    const handleSignup = async (e) => {
        e.preventDefault();
        // Validate Sign Up Data
        const result = signUpSchema.safeParse({ username, email, password, avatar });
        if(!result.success) {
            // console.log(z.prettifyError(result.error));
            toast.error(result.error.issues[0].message);
            return;
        }
        try {
            await axios.post("http://localhost:5000/api/auth/signup", { username, email, password, avatar });
            toast.success("Account created! Please Sign in.");
            setCreateAccount(false);
            toggleMode();
        } catch(err) {
            console.error(err);
            toast.error("Registration failed! Email or Username might be taken.");
        }
    }

    // Handle Toggle Mode
    function toggleMode() {
        if(createAccount){
            setCreateAccount(false);
            setHeader("Sign in");
        } else {
            setCreateAccount(true);
            setHeader("Create a YouTube Clone Account");
        }
    }

    return (
        <div className="h-dvh md:flex md:justify-center md:items-center bg-white dark:bg-[#0f0f0f] md:bg-[#1e1f20] md:dark:bg-[#1e1f20]">
            <div className="md:w-[60%] flex flex-col lg:items-center lg:w-[55%] lg:h-[60%] lg:flex-row lg:justify-between p-8 lg:p-12 gap-4 md:rounded-4xl bg-white dark:bg-[#0f0f0f] dark:text-white">
                <div className="flex flex-col gap-4 lg:self-start lg:w-1/2">
                    <Link to='/' className='w-full'>
                        <img src="/youtube_favicon.png" alt="YouTube Logo" width={48} />
                    </Link>
                    <h1 className="text-3xl md:text-2xl lg:text-3xl font-medium">{header}</h1>
                    <h2 className="font-light mb-5 md:mb-2.5 lg:text-lg">to continue to YouTube Clone</h2>
                </div>
                <div className="w-full lg:w-1/2">
                    <input 
                        className="border border-gray-400 rounded bg-transparent p-2 mb-4 w-full focus:outline-none"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    {createAccount && (    
                        <input
                            className="border border-gray-400 rounded bg-transparent p-2 mb-4 w-full focus:outline-none"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />                        
                    )}
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
                    {createAccount && (    
                        <input
                            className="border border-gray-400 rounded bg-transparent p-2 mb-4 w-full focus:outline-none"
                            placeholder="Avatar Url (Optional)"
                            value={avatar}
                            onChange={e => setAvatar(e.target.value)}
                        />                        
                    )}
                    <div className="flex justify-between items-center">
                        <button onClick={toggleMode} className="cursor-pointer text-[#065fd4] dark:text-[#3ea6ff]">
                            {createAccount ? "Already have an account" : "Create account"}
                        </button>
                        <button
                            className="px-5 py-2.5 bg-[#3ea6ff] rounded-4xl cursor-pointer mt-2 hover:bg-[#3185cc] text-white"
                            onClick={createAccount ? handleSignup : handleSignin}
                        >
                            {createAccount ? "Sign up" : "Sign in"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn;