import { useEffect, useState } from "react";
import { Search, Heart, ShoppingBag, User, MapPin, Phone, Mail, House } from "lucide-react";
import axios from "axios";

axios.defaults.withCredentials=true;



const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "men", label: "Men" },
  { id: "women", label: "Women" },
  { id: "shop", label: "Shop" },
  { id: "contact", label: "Contact us" },
];

{/*const PRODUCTS = [
  { id: 1, name: "Camel wool coat", price: 220, oldPrice: 280, category: "men" },
  { id: 2, name: "Plaid flannel shirt", price: 68, category: "men" },
  { id: 3, name: "Classic white tee", price: 32, category: "men" },
  { id: 4, name: "Utility jacket", price: 145, oldPrice: 180, category: "men" },
  { id: 5, name: "White sneakers", price: 95, category: "men" },
  { id: 6, name: "Denim jacket", price: 110, category: "men" },
  { id: 7, name: "Wool blend coat", price: 35, oldPrice: 60, category: "women" },
  { id: 8, name: "Elegant red dress", price: 145, category: "women" },
  { id: 9, name: "Leather jacket", price: 190, category: "women" },
  { id: 10, name: "Cream knit top", price: 52, category: "women" },
  { id: 11, name: "Structured handbag", price: 128, category: "women" },
];



function PRODUCTS(){

  const [product,setProducts]=useState([ { id: 1, name: "Camel wool coat", price: 220, oldPrice: 280, category: "men" },
  { id: 2, name: "Plaid flannel shirt", price: 68, category: "men" },
  { id: 3, name: "Classic white tee", price: 32, category: "men" },
  { id: 4, name: "Utility jacket", price: 145, oldPrice: 180, category: "men" },
  { id: 5, name: "White sneakers", price: 95, category: "men" },
  { id: 6, name: "Denim jacket", price: 110, category: "men" },]);

  useEffect(()=>{
    axios
    .get("http://127.0.0.1:8000/products/")
    .then((response)=>{
      console.log("Api data:", response.data);
      setProducts(response.data);
    })
    .catch((error)=>{
      console.log("error:",error);

    });

  },[]);

  useEffect(()=>{
    console.log("Product State:",product);

  },[product]);

  return(
    <div>

     {product.map((produc)=>
    (<div key={produc.id}>
      < ProductCard>
      product={product}
      
    </ProductCard>
  <HomePage>
    product={product}
  </HomePage>
  </div>))}

    </div>
  )
}*/}





function Logo() {
  return <span className="text-lg tracking-wide text-white">MALAKI</span>;
}

function IconButton({ children, onClick, badge }) {
  return (
    <button onClick={onClick} className="relative text-white/90 hover:text-white transition-colors">
      {children}
      {badge > 0 && (
        <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 text-[10px] text-white">
          {badge}
        </span>
      )}
    </button>
  );
}

function Navbar({ page, setPage, cartCount, addToCart }) {
  return (
    <header className="bg-neutral-950">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs text-white/60">
        <span></span>
        <button className="rounded bg-amber-600 px-3 py-1 text-white">Shop now</button>
      </div>
      <nav className="flex items-center justify-between px-6 py-4">
        <button onClick={() => setPage("home")}>
          <Logo />
        </button>
        <div className="hidden gap-8 md:flex">
          {NAV_LINKS.slice(1).map((link) => (
            <button
              key={link.id}
              onClick={() => setPage(link.id)}
              className={`text-sm ${
                page === link.id ? "text-amber-500" : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <IconButton>
            <Search size={18} />
          </IconButton>
          <IconButton onClick={() => setPage("home")}>
            <House size={18} />
          </IconButton>
          <IconButton onClick={()=> setPage("shop")} badge={cartCount}>
            <ShoppingBag size={18} />
          </IconButton>
          <IconButton onClick={() => setPage("login")}>
            <User size={18} />
          </IconButton>
        </div>
      </nav>
    </header>
  );
}

function ProductCard({product, onAdd }) {
 
 {/*const [product,setProducts]=useState([]);

  useEffect(()=>{
    axios
    .get("http://127.0.0.1:8000/products/")
    .then((response)=>{
      console.log("Api data:", response.data);
      setProducts(response.data);
    })
    .catch((error)=>{
      console.log("error:",error);

    });

  },[]);

  useEffect(()=>{
    console.log("Product State:",product);

  },[product]); */}






  return (
   <div className="group flex flex-col">
     <div className="relative flex h-48 items-center justify-center bg-neutral-100">
        {/*<span className="text-sm text-neutral-400">{product.name}</span>*/}
        <img 
        src={product.image}
        alt={product.name}
        className="h-full w-full object-cover" />
        {product.oldPrice && (
          <span className="absolute left-2 top-2 rounded bg-amber-600 px-2 py-0.5 text-[11px] text-white">
            Sale
          </span>
        )}
      </div>
      <div className="pt-3">
        <p className="text-sm text-neutral-800">{product.name}</p>
        <div className="flex items-center gap-2 pt-1">
          <span className="text-sm text-neutral-900">${product.price}.00</span>
          {product.oldPrice && (
            <span className="text-xs text-neutral-400 line-through">${product.oldPrice}.00</span>
          )}
        </div>

        <button
          onClick={() => onAdd(product)}
          className="mt-2 w-full rounded border border-neutral-900 py-1.5 text-xs text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

function HomePage({ setPage, onAdd,product }) {
 //const featured = PRODUCTS.slice(0,4);
 const featured = product.slice(0,4);
  return (
    <div>
      <section className="grid gap-8 bg-neutral-900 px-6 py-16 text-white md:grid-cols-2 md:px-16">
        <div className="flex flex-col justify-center gap-4">
          <span className="text-xs text-amber-500">New season</span>
          <h1 className="text-4xl leading-tight">Style that fits you</h1>
          <p className="max-w-sm text-sm text-white/70">
            Discover the wardrobe staples our stylists reach for every day, made from
            quality materials that move with you.
          </p>
          <button
            onClick={() => setPage("shop")}
            className="w-fit rounded bg-amber-600 px-5 py-2 text-sm text-white"
          >
            Shop now
          </button>
        </div>
        <div className="flex items-center justify-center bg-neutral-800/40 text-sm text-white/40">
          Hero portrait
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4 px-6 py-10 md:grid-cols-4 md:px-16">
        {[
          { label: "Men", target: "men"},
          { label: "Women", target: "women" },
          { label: "Shop", target: "shop" },
          { label: "Contact us", target: "contact" },
        ].map((item) => (
          <button
            key={item.target}
            onClick={() => setPage(item.target)}
            className="flex h-24 items-center justify-center bg-neutral-100 text-sm text-neutral-800 hover:bg-neutral-200 transition-colors"
          >
            {item.label}
          </button>
        ))}
      </section>

      <section className="px-6 py-10 md:px-16">
        <h2 className="mb-6 text-lg text-neutral-900">Featured collection</h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={onAdd} />
          ))}
        </div>
      </section>
    </div>
  );
}

function CategoryPage({ title, tagline, category, onAdd, product }) {
  const categoryId = category === "men"?1:2;
  const items = product.filter((p) => p.category === categoryId);
  return (
    <div>
      <section className="flex h-56 flex-col justify-center bg-neutral-900 px-6 text-white md:px-16">
        <span className="text-xs text-amber-500">{category=== "men" ? "Men's edition" : "Women's collection"}</span>
        <h1 className="text-3xl">{title}</h1>
        <p className="text-sm text-white/60">{tagline}</p>
      </section>
      <section className="px-6 py-10 md:px-16">
        <h2 className="mb-6 text-lg text-neutral-900">Featured {category === "men" ? "men's" : "women's"} collection</h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={onAdd} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ShopPage({ onAdd ,product}) {
  const [category, setCategory] = useState("all");
  const filtered = category === "all" ? product: product.filter((p) => {if (category === "men"){
    return p.category === 1;
  }
if (category ==="women"){
  return p.category === 2;
}
return true;});

  return (
    <div className="grid gap-8 px-6 py-10 md:grid-cols-[200px_1fr] md:px-16">
      <aside>
        <h3 className="mb-3 text-sm text-neutral-900">Categories</h3>
        <div className="flex flex-col gap-2 text-sm text-neutral-600">
          {[ "all","men","women"].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`text-left ${category === c ? "text-amber-600" : "hover:text-neutral-900"}`}
            >
              {c === "all" ? "All products" : c === "men" ? "Men" : "Women"}
            </button>
          ))}
        </div>
      </aside>
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl text-neutral-900">All products</h1>
          <span className="text-sm text-neutral-500">{filtered.length} results</span>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={onAdd} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div>
      <section className="flex h-48 flex-col justify-center bg-neutral-900 px-6 text-white md:px-16">
        <span className="text-xs text-amber-500">We'd love to hear from you</span>
        <h1 className="text-3xl">Contact us</h1>
      </section>
      <section className="grid gap-10 px-6 py-10 md:grid-cols-2 md:px-16">
        <div className="flex flex-col gap-6 text-sm text-neutral-700">
          <div className="flex items-start gap-3">
            <MapPin size={18} className="mt-0.5 text-amber-600" />
            <span>123 Fashion Ave, Suite 400, New York, NY</span>
          </div>
          <div className="flex items-start gap-3">
            <Phone size={18} className="mt-0.5 text-amber-600" />
            <span>+1 (555) 012-3456</span>
          </div>
          <div className="flex items-start gap-3">
            <Mail size={18} className="mt-0.5 text-amber-600" />
            <span>hello@malaki.com</span>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="flex flex-col gap-3"
        >
          <input placeholder="Your name" required className="border border-neutral-300 px-3 py-2 text-sm" />
          <input placeholder="Your email" type="email" required className="border border-neutral-300 px-3 py-2 text-sm" />
          <textarea placeholder="Your message" required rows={4} className="border border-neutral-300 px-3 py-2 text-sm" />
          <button className="w-fit rounded bg-amber-600 px-5 py-2 text-sm text-white">Send message</button>
          {sent && <p className="text-xs text-amber-700">Message sent — we'll get back to you soon.</p>}
        </form>
      </section>
    </div>
  );
}

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername]=useState("");


  {/*const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Enter your email and password to continue.");
      return;
    }
    setError("");
    onLogin(username,password);
  };

{/*async function onLogin(usename,password) {
     try{const response=await axios.post("http://127.0.0.1:8000/login/",
    {usename,
      password,
    }
     );
    localStorage.setItem("token",response.data.token);
    alert("Login Successful");
    }catch(error){
      alert("Invalid credential");
    }
    
  }
*/}

async function handleLogin(email,password) {
     try{const response=await axios.post("http://127.0.0.1:8000/login/",
    {email,
      password,
    }
     );
    localStorage.setItem("token",response.data.token);
    setUser(email);
    setPage("home");
    alert("Login Successful");
    }catch(error){
      const data = error.response?.data;
      const message = data?.error || data?.detail || (typeof data === "object"? JSON.stringify(data) : null) ||
      "Login failed. Please try again.";
      console.error("Login failed:",error.response?.status, data);
      alert(message);
    }
    
  }

  return (
    <div className="grid min-h-[500px] md:grid-cols-2">
      <div className="hidden items-end bg-neutral-900 p-10 text-white md:flex">
        <div>
          <p className="text-xs text-amber-500">Malaki</p>
          <p className="text-2xl">Your new favorite</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-10">
        <form onSubmit={(e)=>{e.preventDefault();handleLogin(email,password);}} className="w-full max-w-sm flex flex-col gap-3">
          <h1 className="text-2xl text-neutral-900">Welcome back</h1>
          <p className="mb-2 text-sm text-neutral-500">Log in to your account</p>
          <label className="text-xs text-neutral-600">Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-neutral-300 px-3 py-2 text-sm"
            placeholder="you@example.com"
          />
          <label className="text-xs text-neutral-600">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-neutral-300 px-3 py-2 text-sm"
            placeholder="Enter your password"
          />
          {error && <p className="text-xs text-red-600">{error}</p>}
          <button className="mt-2 rounded bg-neutral-900 py-2 text-sm text-white">Login</button>
          <p className="text-center text-xs text-neutral-500">
            Don't have an account? <span className="text-amber-600">Sign up</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default function Home() {
  const [page, setPage] = useState("home");
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [product,setProducts]=useState([]);

  useEffect(()=>{
    axios
    .get("http://127.0.0.1:8000/products/")
    .then((response)=>{
      console.log("Api data:", response.data);
      setProducts(response.data);
    })
    .catch((error)=>{
      console.log("error:",error);

    });

  },[]);


  //const addToCart = () => setCartCount((c) => c + 1);

  const addToCart= async(product)=>{

    const productId=product.id;
    console.log("Sending id:",productId);


    try{
      const response=await axios.post("http://localhost:8000/cart/",
        {product_id:productId},
       // {product:1},
        {withCredentials:true,
        
          headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${localStorage.getItem('token')}`,
        },
      }
      );
      console.log("Cart:",response.data.cart);
      alert("Added to cart");
    }catch (error) {
      console.log(error.response.data);
    }
  };

  {/*const handleLogin = (email) => {
    setUser(email);
    setPage("home");
  };*/}
  
  {/*async function handleLogin(usename,password) {
     try{const response=await axios.post("http://127.0.0.1:8000/login/",
    {username,
      password,
    }
     );
    localStorage.setItem("token",response.data.token);
    setUser(usename);
    setPage("home");
    alert("Login Successful");
    }catch(error){
      const data = error.response?.data;
      const message = data?.error || data?.detail || (typeof data === "object"? JSON.stringify(data) : null) ||
      "Login failed. Please try again.";
      console.error("Login failed:",error.response?.status, data);
      alert(message);
    }
    
  }*/}


  return (
    <div className="min-h-screen bg-white font-sans">
     
      <Navbar page={page} setPage={setPage} cartCount={cartCount} addToCart={addToCart} />

      {page === "home" && <HomePage setPage={setPage} onAdd={addToCart} product={product} />}
      {page === "men" && (
        <CategoryPage
          title="Men's fashion"
          tagline="Classic, modern, always you."
          category="men"
          onAdd={addToCart}
          product={product}
        />
      )}
      {page === "women" && (
        <CategoryPage
          title="Women's fashion"
          tagline="Elegance in every detail."
           category="women"
          onAdd={addToCart}
          product={product}
        />
      )}
      {page === "shop" && <ShopPage onAdd={addToCart} product={product} />}
     
      {page === "contact" && <ContactPage />}
      {page === "login" && <LoginPage />}

      <footer className="border-t border-neutral-200 px-6 py-6 text-center text-xs text-neutral-500 md:px-16">
        {user ? `Signed in as ${user}` : "MALAKI — free shipping on all orders selected for you"}
      </footer>


    </div>
    
  );
}
