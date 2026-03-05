import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext.jsx";

const NAV_LINKS = [
    { label: "Boissons", href: "/boissons", icon: "🍺" },
    { label: "Location", href: "/location", icon: "🪑" },
    { label: "Événementiel", href: "/services", icon: "🎉" },
    { label: "Suivi", href: "/suivi", icon: "📍" },
];

export default function Navbar({ activePage = "", dark = false }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { cartCount, setCartOpen } = useCart();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    const isSolid = dark || scrolled;

    return (
        <>
            <nav
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
                style={{
                    height: 72,
                    background: isSolid ? "rgba(13,13,26,0.97)" : "transparent",
                    backdropFilter: isSolid ? "blur(16px)" : "none",
                    borderBottom: isSolid ? "1px solid rgba(255,215,0,0.15)" : "1px solid transparent",
                }}
            >
                <div className="max-w-275 mx-auto px-4 md:px-8 h-full flex items-center justify-between">

                    {/* Logo */}
                    <a href="/" className="flex items-center gap-3 no-underline shrink-0">
                        {/* <div
                            className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-neutral-0 shrink-0"
                            style={{ background: "linear-gradient(135deg,#FFD700,#0047AB)", boxShadow: "0 0 16px rgba(255,215,0,0.4)" }}
                        >
                            SD
                        </div> */}
                        <img
                            src="/logo.png"
                            alt="Souaïbou Distribution"
                            className="w-10 h-10 rounded-full object-cover shrink-0"
                            style={{ boxShadow: "0 0 16px rgba(255,215,0,0.4)" }}
                        />
                        <div className="hidden sm:block">
                            <div className="font-extrabold text-[15px] text-primary-1 leading-tight">Souaïbou</div>
                            <div className="font-light text-[10px] text-neutral-6 tracking-widest uppercase">Distribution</div>
                        </div>
                    </a>

                    {/* Liens desktop */}
                    <div className="hidden md:flex items-center gap-1">
                        {NAV_LINKS.map((link) => {
                            const isActive = activePage === link.href;
                            return (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium text-sm no-underline transition-all duration-200"
                                    style={{
                                        background: isActive ? "rgba(255,215,0,0.12)" : "transparent",
                                        color: isActive ? "#FFD700" : "#fff",
                                        borderBottom: isActive ? "2px solid #FFD700" : "2px solid transparent",
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.background = "rgba(255,215,0,0.08)";
                                            e.currentTarget.style.color = "#FFD700";
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.background = "transparent";
                                            e.currentTarget.style.color = "#fff";
                                        }
                                    }}
                                >
                                    <span>{link.icon}</span> {link.label}
                                </a>
                            );
                        })}
                    </div>

                    {/* Actions droite */}
                    <div className="flex items-center gap-2 md:gap-3">

                        {/* Bouton panier → ouvre le CartDrawer */}
                        <button
                            onClick={() => setCartOpen(true)}
                            className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg border border-primary-3 bg-primary-5 text-primary-1 font-semibold text-[13px] cursor-pointer transition-all duration-200 hover:bg-primary-4"
                        >
                            🛒
                            {cartCount > 0 && (
                                <span className="flex items-center justify-center w-4.5 h-4.5 rounded-full bg-primary-1 text-neutral-9 text-[10px] font-black leading-none">
                                    {cartCount > 99 ? "99+" : cartCount}
                                </span>
                            )}
                        </button>

                        {/* Mon compte — desktop */}
                        <a
                            href="/connexion"
                            className="hidden md:block font-semibold text-[13px] text-neutral-9 no-underline px-5 py-2 rounded-lg transition-all duration-200 hover:-translate-y-px"
                            style={{ background: "linear-gradient(135deg,#FFD700,#E6C200)", boxShadow: "0 4px 14px rgba(255,215,0,0.3)" }}
                        >
                            Mon compte
                        </a>

                        {/* Burger mobile */}
                        <button
                            onClick={() => setMenuOpen((o) => !o)}
                            className="flex md:hidden flex-col justify-center gap-1.25 w-9 h-9 p-1.5 bg-transparent border-0 cursor-pointer"
                            aria-label="Menu"
                        >
                            <span className="block h-0.5 bg-primary-1 rounded transition-all duration-300 origin-center" style={{ width: "100%", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
                            <span className="block h-0.5 bg-primary-1 rounded transition-all duration-300" style={{ width: "100%", opacity: menuOpen ? 0 : 1 }} />
                            <span className="block h-0.5 bg-primary-1 rounded transition-all duration-300 origin-center" style={{ width: "100%", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Menu mobile overlay */}
            <div
                className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-2 transition-all duration-300 md:hidden"
                style={{
                    background: "rgba(13,13,26,0.98)",
                    top: 72,
                    opacity: menuOpen ? 1 : 0,
                    pointerEvents: menuOpen ? "auto" : "none",
                }}
            >
                {NAV_LINKS.map((link) => {
                    const isActive = activePage === link.href;
                    return (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center gap-4 px-8 py-4 font-semibold text-2xl no-underline"
                            style={{ color: isActive ? "#FFD700" : "#fff" }}
                        >
                            {link.icon} {link.label}
                        </a>
                    );
                })}
                <a
                    href="/connexion"
                    className="mt-6 font-bold text-[15px] text-neutral-9 no-underline px-8 py-3 rounded-xl"
                    style={{ background: "linear-gradient(135deg,#FFD700,#E6C200)" }}
                >
                    Mon compte
                </a>
            </div>
        </>
    );
}