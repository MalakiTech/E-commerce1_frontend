import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp(){
    const navigate=useNavigate();
    const [form, setForm]=useState({name:"",email:"",password:"",confirm:""});
    const [error,setError]=useState("");
    const [loading, setLoading]=useState(false);

    const change=(e)=>setForm({ ...form, [e.target.name]: e.target.value});

    const handleSignup=async (e)=>{
        e.preventDefault();
        setError("");

        if (form.password.length < 8) return setError("Password must be atleast 8 charachers.");
        if (form.password !== form.confirm) return setError("Passwords do not match.");

        setLoading(true);
        try{
            await axios.post("https://e-commerce1-backend-211x.onrender.com/signup/",
                {name: form.name, email: form.email, password: form.password},
                {withCredentials:true}
            );
            alert("Account created please signin");
            navigate("/",{replace:true});

        }catch (err){
            const data = err.response?.data;
            setError(
                data?.error || data?.detail ||
                (typeof data === "object"? JSON.stringify(data):"Sign up fail.Please try again.")
            );
        }finally {
            setLoading(false);
        }
    };

    return (
        <>
        <form onSubmit={handleSignup} >
            <h2>Create account</h2>
            <input name="name" placeholder="full name" value={form.name} onChange={change} required />
            <input name="email" type="email" placeholder="email" value={form.email} onChange={change} required />
            <input name="password" type="password" placeholder="Password (8+ characters)" value={form.password} onChange={change} required />
            <input name="confirm" type="password" placeholder="Confirm password" value={form.confirm} onChange={change} required />
            {error && <p>{error}</p>}
            <button type="submit" disabled={loading}>
                {loading ? "Creating account... " : "Sign up"}
            </button>
            <p>Already have an account? <Link to="/cart">sign in</Link></p>

        </form>
        </>
    )
};