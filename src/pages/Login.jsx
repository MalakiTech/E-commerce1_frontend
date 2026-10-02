import { useState } from "react";
import { Search, Heart, ShoppingBag, User, Mail, House } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const NAV_LINKS = ["Men", "Women", "Shop", "Contact us"];

function Navbar() {
  return (
    <header className="border-b border-neutral-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-neutral-900 text-sm font-bold text-white">
            S
          </div>
          <span className="text-lg font-semibold tracking-tight text-neutral-900">
            StyleHaven
          </span>
        </div>

        <nav className="hidden gap-8 text-sm font-medium text-neutral-700 md:flex">
      
        </nav>

        <div className="flex items-center gap-4 text-neutral-700">
          <Search size={19} className="cursor-pointer" />
         <Link to="/cont" ><Mail size={19} className="cursor-pointer" /></Link> 
         <Link to="/"><House size={19} className="cursor-pointer" /></Link>
         <Link to="/prod"><ShoppingBag size={19} className="cursor-pointer" /></Link> 
        </div>
      </div>
    </header>
  );
}

function LoginPortrait() {
  return (
    <div className="relative flex min-h-[480px] items-end bg-neutral-800 p-10">
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/10 to-transparent" />
      <div className="relative z-10 text-white">
        <p className="text-2xl tracking-wide">MALAKI</p>
        <p className="text-sm text-white/70">Your new favorite</p>
      </div>
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [username,setUsername]= useState("")

  const submit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Enter your email and password to continue.");
      setSuccess(false);
      return;
    }
    setError("");
    setSuccess(true);
  };


  async function logingIn(usename,password) {
     try{const response=await axios.post("http://127.0.0.1:8000/login/",
    {username,
      password,
    }
     );
    localStorage.setItem("token",response.data.token);
    alert("Login Successful");
    }catch(error){
     // alert("Invalid credential");
    }
    
  }

  return (
    <div className="flex min-h-[480px] items-center justify-center p-10">
      <form onSubmit={(e)=>{e.preventDefault();logingIn(username,password);}}
       className="w-full max-w-sm flex flex-col gap-4">
        <h1 className="text-2xl text-neutral-900">Welcome back</h1>
        <p className="text-sm text-neutral-500">Log in to your account</p>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-neutral-600">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="you@example.com"
            className="border border-neutral-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-neutral-600">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="border border-neutral-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="flex items-center justify-between text-xs text-neutral-500">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Remember me
          </label>
          <span className="text-amber-600">Forgot password?</span>
        </div>

        {error && <p className="text-xs text-red-600">{error}</p>}
        {success && <p className="text-xs text-amber-700">Logged in successfully.</p>}

        <button className="mt-1 rounded bg-neutral-900 py-2 text-sm text-white">Login</button>

        <p className="text-center text-xs text-neutral-500">
          Don't have an account? <span className="text-amber-600">Sign up</span>
        </p>
      </form>
    </div>
  );
}

export default function Login() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <div className="grid md:grid-cols-2">
        <LoginPortrait />
        <LoginForm />
      </div>
    </div>
  );
}
