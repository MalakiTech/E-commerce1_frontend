import { useState } from "react";
import { MapPin, Phone, Mail, Search, Heart, ShoppingBag, User, House } from "lucide-react";
import { Link } from "react-router-dom";


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
         <Link to="/login" ><User size={19} className="cursor-pointer" /></Link> 
         <Link to="/"><House size={19} className="cursor-pointer" /></Link>
         <Link to="/prod"><ShoppingBag size={19} className="cursor-pointer" /></Link> 
        </div>
      </div>
    </header>
  );
};


function ContactHero() {
  return (
    <section className="relative flex h-64 items-center bg-neutral-800 px-6 md:px-16">
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/40 to-transparent" />
      <div className="relative z-10">
        <span className="text-xs text-amber-500">We'd love to hear from you</span>
        <h1 className="text-4xl text-white">Contact us</h1>
      </div>
    </section>
  );
}

function ContactInfo() {
  const rows = [
    { icon: MapPin, title: "Our address", lines: ["123 Fashion Ave, Suite 400", "New York, NY 10001"] },
    { icon: Phone, title: "Phone", lines: ["+1 (555) 012-3456"] },
    { icon: Mail, title: "Email", lines: ["hello@malaki.com"] },
  ];

  return (
    <div className="flex flex-col gap-6 bg-neutral-900 p-8 text-white">
      {rows.map(({ icon: Icon, title, lines }) => (
        <div key={title} className="flex items-start gap-4">
          <Icon size={18} className="mt-1 text-amber-500" />
          <div>
            <p className="text-sm text-white">{title}</p>
            {lines.map((line) => (
              <p key={line} className="text-xs text-white/60">
                {line}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Fill in your name, email, and message before sending.");
      return;
    }
    setError("");
    setSent(true);
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-4 bg-white p-8 shadow-sm">
      <h2 className="text-lg text-neutral-900">Send us a message</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <input
          placeholder="Your name"
          value={form.name}
          onChange={update("name")}
          className="border border-neutral-300 px-3 py-2 text-sm"
        />
        <input
          placeholder="Your email"
          type="email"
          value={form.email}
          onChange={update("email")}
          className="border border-neutral-300 px-3 py-2 text-sm"
        />
      </div>
      <input
        placeholder="Subject"
        value={form.subject}
        onChange={update("subject")}
        className="border border-neutral-300 px-3 py-2 text-sm"
      />
      <textarea
        placeholder="Your message"
        rows={5}
        value={form.message}
        onChange={update("message")}
        className="border border-neutral-300 px-3 py-2 text-sm"
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
      {sent && <p className="text-xs text-amber-700">Message sent — we'll get back to you soon.</p>}
      <button className="w-fit rounded bg-amber-600 px-6 py-2 text-sm text-white">Send message</button>
    </form>
  );
}

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="bg-neutral-950 px-6 py-10 text-white md:px-16">
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <p className="text-lg">MALAKI</p>
          <p className="mt-2 text-xs text-white/50">
            Everyday essentials, made from quality materials that move with you.
          </p>
        </div>
        <div className="text-sm text-white/70">
          <p className="mb-2 text-white">Links</p>
          <ul className="flex flex-col gap-1 text-xs">
            <li>Men</li>
            <li>Women</li>
            <li>Shop</li>
            <li>Contact us</li>
          </ul>
        </div>
        <div>
          <p className="mb-2 text-sm text-white">Newsletter</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSubscribed(true);
            }}
            className="flex gap-2"
          >
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full border border-white/20 bg-transparent px-3 py-2 text-xs text-white placeholder-white/40"
            />
            <button className="rounded bg-amber-600 px-4 py-2 text-xs text-white">Join</button>
          </form>
          {subscribed && <p className="mt-2 text-xs text-amber-500">Subscribed — thanks!</p>}
        </div>
      </div>
    </footer>
  );
}

export default function Contact() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar/>
      <ContactHero />
      <section className="grid gap-px bg-neutral-200 px-6 py-10 md:grid-cols-[320px_1fr] md:px-16">
        <ContactInfo />
        <ContactForm />
      </section>
      <Footer />
    </div>
  );
}
