import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import * as Icons from "../Components/Icons";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";

/* ────────────────────── Animated Section ────────────────────── */
const AnimatedSection = ({ children, className = "" }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
        hidden: { opacity: 0, y: 50 }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Landing() {
  const [theme, setTheme] = useState("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* ────────────────────── Data ────────────────────── */
  const packages = [
    { name: "5 Mbps", price: "Ksh 1,000", description: "Perfect for browsing, email & light streaming", speed: "5 Mbps" },
    { name: "10 Mbps", price: "Ksh 1,500", description: "Great for HD streaming & video calls", speed: "10 Mbps", popular: true },
    { name: "20 Mbps", price: "Ksh 2,000", description: "Ideal for multiple devices & 4K streaming", speed: "20 Mbps" },
    { name: "40 Mbps", price: "Ksh 3,800", description: "Ultra‑fast for heavy use & small offices", speed: "40 Mbps" },
  ];
  const testimonials = [
    { name: "Amina, Kileleshwa", quote: "Reliable speeds and quick support. Never had downtime!" },
    { name: "James, South B", quote: "M‑Pesa payments are effortless. Best ISP in Nairobi!" },
    { name: "Sarah, Westlands", quote: "Setup was done in 2 hours. Super professional team." },
  ];
  const coverage = ["Santon", "Kamute‑ini", "Hunters", "Kwa Mafuta"];
  const services = [
    { title: "Fiber Internet", icon: <Icons.FiberIcon />, description: "Blazing fast fiber for homes & businesses" },
    { title: "Onsite Support", icon: <Icons.SupportIcon />, description: "Same day technician visits" },
    { title: "Device Sales", icon: <Icons.RouterIcon />, description: "Premium routers & mesh systems" },
  ];

  /* ────────────────────── Theme Handling ────────────────────── */
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
  };

  /* ────────────────────── Render ────────────────────── */
  return (
    <>
      <div
        className={clsx(
          "min-h-screen transition-colors duration-300",
          theme === "dark"
            ? "dark bg-slate-950 text-slate-100"
            : "bg-white text-slate-800"               // Pure white background
        )}
      >
        {/* ───── Header ───── */}
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white dark:bg-slate-900/90 border-b border-gray-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
                V
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-400">
                Villah Rich
              </span>
            </motion.div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-4">
              <Link
                href="/login"
                className="text-white px-5 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white transform hover:scale-105 transition font-medium"
              >
                Get Started
              </Link>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="text-white ml-4 p-2.5 rounded-lg  hover:bg-gray-200 dark:hover:bg-slate-700 transition"
                aria-label="Toggle theme"
              >
                {theme === "light" ? <Icons.MoonIcon /> : <Icons.SunIcon />}
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white rounded-lg transition"
            >
              {mobileMenuOpen ? <Icons.CloseIcon /> : <Icons.MenuIcon />}
            </button>
          </div>
        </header>

        {/* ───── Mobile Menu ───── */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-0 z-40 bg-white dark:bg-slate-900 pt-20 px-6 md:hidden"
            >
              <nav className="flex flex-col gap-6 text-lg">
                <Link href="/login" className="py-3 text-white border-b border-gray-200 dark:border-slate-800">
                  Login
                </Link>
                <Link href="/register" className="py-3 text-white font-semibold">
                  Get Started
                </Link>
                <button
                  onClick={toggleTheme}
                  className="text-white flex items-center gap-3 py-3 border-b border-gray-200 dark:border-slate-800"
                >
                  {theme === "light" ? <Icons.MoonIcon /> : <Icons.SunIcon />}
                  <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ───── Hero ───── */}
        <section className="pt-28 pb-16 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold leading-tight"
            >
              Fast Internet.<br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Simple Pricing.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto"
            >
              Reliable fiber internet for Nairobi homes & SMEs. Pay with M‑Pesa. Local support. No hidden fees.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="#packages"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition"
              >
                View Packages
              </a>
              <a
                href="#coverage"
                className="px-8 py-4 bg-white dark:bg-slate-800 text-blue-600 dark:text-cyan-400 border-2 border-blue-600 dark:border-cyan-600 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-slate-700 transition"
              >
                Check Coverage
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-slate-400"
            >
              <div className="flex items-center gap-2">
                <span className="text-green-500">Checkmark</span> 99.9% Uptime
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">Checkmark</span> M‑Pesa Payments
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">Checkmark</span> 24/7 Local Support
              </div>
            </motion.div>
          </div>
        </section>

        {/* ───── Packages ───── */}
        <section id="packages" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Choose Your Speed</h2>
              <p className="mt-3 text-gray-600 dark:text-slate-400">No contracts. Upgrade anytime.</p>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {packages.map((pkg) => (
                <AnimatedSection key={pkg.name}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className={clsx(
                      "rounded-2xl p-6 shadow-lg border-2 relative overflow-hidden transition-colors",
                      pkg.popular ? "border-cyan-500" : "border-gray-200 dark:border-slate-700"
                    )}
                  >
                    {pkg.popular && (
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1 text-xs font-bold rounded-bl-lg">
                        MOST POPULAR
                      </div>
                    )}
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600 dark:text-cyan-400">{pkg.speed}</div>
                      <div className="text-sm text-gray-500 dark:text-slate-400 mt-1">Download Speed</div>
                      <div className="mt-4 text-2xl font-bold">{pkg.price}<span className="text-sm text-gray-500 dark:text-slate-400">/month</span></div>
                      <p className="mt-3 text-sm text-gray-600 dark:text-slate-300 min-h-12">{pkg.description}</p>
                      <button className="mt-6 w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-md transition">
                        Get Started
                      </button>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ───── Testimonials ───── */}
        <section className="py-20 bg-white dark:bg-transparent">
          <div className="max-w-7xl mx-auto px-6">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Loved by Nairobi</h2>
              <p className="mt-3 text-gray-700 dark:text-slate-400">Hear from our happy customers</p>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <AnimatedSection key={t.name}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="rounded-2xl p-6 shadow-md border border-gray-200 dark:border-slate-700"
                  >
                    <p className="text-gray-900 dark:text-slate-300 italic">“{t.quote}”</p>
                    <div className="mt-4 text-sm font-medium text-gray-900 dark:text-slate-400">— {t.name}</div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ───── Coverage ───── */}
        <section id="coverage" className="py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold">We’re Growing Fast</h2>
              <p className="mt-3 text-gray-600 dark:text-slate-400">Available in these Nairobi neighborhoods</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {coverage.map((area) => (
                  <motion.span
                    key={area}
                    whileHover={{ scale: 1.1 }}
                    className="px-5 py-2 border border-gray-300 dark:border-slate-700 rounded-full text-sm font-medium hover:border-cyan-500 dark:hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition"
                  >
                    {area}
                  </motion.span>
                ))}
              </div>
              <p className="mt-8 text-gray-600 dark:text-slate-400">
                Not in your area?{" "}
                <a href="#contact" className="text-blue-600 dark:text-cyan-400 font-semibold hover:underline">
                  Join waitlist
                </a>
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* ───── Services ───── */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Beyond Internet</h2>
              <p className="mt-3 text-gray-600 dark:text-slate-400">Everything you need in one place</p>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-8">
              {services.map((s) => (
                <AnimatedSection key={s.title}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="text-center  rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-slate-700"
                  >
                    <div className="text-blue-600 dark:text-cyan-400 mb-4">{s.icon}</div>
                    <h3 className="text-xl font-bold">{s.title}</h3>
                    <p className="mt-3 text-gray-600 dark:text-slate-400">{s.description}</p>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ───── CTA ───── */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-700 dark:to-cyan-700 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-3xl md:text-5xl font-bold"
            >
              Ready for Fast Internet?
            </motion.h2>
            <p className="mt-4 text-xl opacity-90">
              Join hundreds of happy homes in Nairobi.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="px-10 py-4 bg-white text-blue-600 rounded-xl font-bold hover:shadow-xl transform hover:scale-105 transition"
              >
                Sign Up Now
              </Link>
              <a
                href="tel:+254728722448"
                className="px-10 py-4 bg-transparent border-2 border-white rounded-xl font-semibold hover:bg-white/10 transition"
              >
                Call: 0728 722 448
              </a>
            </div>
          </div>
        </section>

        {/* ───── Footer ───── */}
        <footer className="bg-gray-100 dark:bg-black text-gray-600 dark:text-slate-400 py-12">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm">
              © {new Date().getFullYear()} Villah Rich Networks — Nairobi, Kenya
            </p>
            <p className="mt-2 text-xs">
              Licensed by CAK • Fiber‑Powered • Local & Proud
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}