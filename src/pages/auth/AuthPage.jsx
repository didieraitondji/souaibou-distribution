import { useState, useEffect } from "react";
import { AuthProvider } from "../../context/AuthContext.jsx";
import LoginForm from "./LoginForm.jsx";
import RegisterForm from "./RegisterForm.jsx";

const PERKS = [
    { icon: "🛒", title: "Panier sauvegardé", desc: "Retrouvez votre panier sur tous vos appareils" },
    { icon: "📍", title: "Suivi simplifié", desc: "Accédez à toutes vos commandes en un clic" },
    { icon: "🎁", title: "Offres exclusives", desc: "Profitez de promotions réservées aux membres" },
    { icon: "🚀", title: "Commande express", desc: "Vos adresses sauvegardées, commandez plus vite" },
];

// ⚠️ Ne pas ajouter Navbar/Footer ici — AppLayout s'en charge.
export default function AuthPage() {
    // Détecter si on arrive sur /inscription
    const isRegisterRoute = window.location.pathname === "/inscription";
    const [mode, setMode] = useState(isRegisterRoute ? "register" : "login");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSuccess = () => {
        // Rediriger vers /compte ou la page précédente
        const redirect = new URLSearchParams(window.location.search).get("redirect") || "/compte";
        window.location.href = redirect;
    };

    return (
        <AuthProvider>
            <div className="min-h-screen flex">

                {/* ── Panneau gauche — visuel décoratif (desktop) ── */}
                <div
                    className="hidden lg:flex flex-col justify-between w-120 shrink-0 p-10 relative overflow-hidden"
                    style={{ background: "linear-gradient(160deg,#0D0D1A 0%,#1A2E0D 50%,#0D0D1A 100%)" }}
                >
                    {/* Orbs déco */}
                    <div className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
                        style={{ background: "radial-gradient(circle,rgba(255,215,0,0.12) 0%,transparent 70%)", filter: "blur(40px)" }} />
                    <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full pointer-events-none"
                        style={{ background: "radial-gradient(circle,rgba(0,128,0,0.12) 0%,transparent 70%)", filter: "blur(30px)" }} />
                    <div className="absolute inset-0 pointer-events-none"
                        style={{ backgroundImage: "linear-gradient(rgba(255,215,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,215,0,0.03) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

                    {/* Logo */}
                    <a href="/" className="no-underline flex items-center gap-3 relative z-10">
                        <div className="w-11 h-11 rounded-full flex items-center justify-center font-black text-[15px] text-neutral-0"
                            style={{ background: "linear-gradient(135deg,#FFD700,#0047AB)", boxShadow: "0 0 20px rgba(255,215,0,0.4)" }}>
                            SD
                        </div>
                        <div>
                            <div className="font-extrabold text-[15px] text-primary-1">Souaïbou</div>
                            <div className="font-light text-[10px] text-neutral-6 tracking-widest uppercase">Distribution</div>
                        </div>
                    </a>

                    {/* Contenu central */}
                    <div className="relative z-10">
                        <h2 className="font-extrabold text-neutral-0 leading-tight mb-4" style={{ fontSize: "clamp(28px,2.5vw,36px)" }}>
                            Votre expérience,{" "}
                            <span className="text-primary-1">simplifiée</span>
                        </h2>
                        <p className="text-[14px] text-neutral-6 leading-relaxed mb-10 max-w-[320px]">
                            Créez un compte et profitez d'une expérience de commande fluide, rapide et personnalisée.
                        </p>

                        <div className="flex flex-col gap-5">
                            {PERKS.map((perk, i) => (
                                <div
                                    key={perk.title}
                                    className="flex items-start gap-4"
                                    style={{
                                        opacity: mounted ? 1 : 0,
                                        transform: mounted ? "translateX(0)" : "translateX(-20px)",
                                        transition: `all 0.4s ease ${i * 100 + 200}ms`,
                                    }}
                                >
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-h5 shrink-0"
                                        style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.2)" }}>
                                        {perk.icon}
                                    </div>
                                    <div>
                                        <p className="font-bold text-[14px] text-neutral-0">{perk.title}</p>
                                        <p className="text-[12px] text-neutral-6 mt-0.5 leading-relaxed">{perk.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Témoignage bas */}
                    <div className="relative z-10 bg-neutral-0/10 rounded-2xl p-5 border border-neutral-5">
                        <div className="flex gap-1 mb-2">
                            {"★★★★★".split("").map((s, i) => <span key={i} className="text-primary-1 text-[14px]">{s}</span>)}
                        </div>
                        <p className="text-[13px] text-neutral-4 italic leading-relaxed mb-3">
                            "Commande passée le soir, livrée le lendemain matin. Service impeccable !"
                        </p>
                        <p className="text-[12px] font-semibold text-neutral-6">— Fatoumata D., Cotonou</p>
                    </div>
                </div>

                {/* ── Panneau droit — formulaire ── */}
                <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 bg-neutral-3 min-h-screen">
                    {/* Header mobile */}
                    <div className="lg:hidden flex items-center gap-3 mb-8 self-start w-full max-w-120">
                        <a href="/" className="no-underline flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-[13px] text-neutral-0"
                                style={{ background: "linear-gradient(135deg,#FFD700,#0047AB)" }}>
                                SD
                            </div>
                            <span className="font-extrabold text-[15px] text-primary-1">Souaïbou Distribution</span>
                        </a>
                    </div>

                    {/* Toggle connexion / inscription */}
                    <div className="w-full max-w-120 mb-6">
                        <div className="flex bg-neutral-0 rounded-2xl p-1.5 border border-neutral-4">
                            {[
                                { id: "login", label: "Connexion" },
                                { id: "register", label: "Inscription" },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setMode(tab.id)}
                                    className="flex-1 font-bold text-[14px] py-3 rounded-xl border-0 cursor-pointer transition-all duration-200"
                                    style={{
                                        background: mode === tab.id ? "linear-gradient(135deg,#FFD700,#E6C200)" : "transparent",
                                        color: mode === tab.id ? "#0D0D1A" : "#A9A9A9",
                                        boxShadow: mode === tab.id ? "0 2px 8px rgba(255,215,0,0.25)" : "none",
                                    }}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Card formulaire */}
                    <div
                        className="w-full max-w-120 bg-neutral-0 rounded-2xl border border-neutral-4 p-6 md:p-8"
                        style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}
                    >
                        {mode === "login"
                            ? <LoginForm onSuccess={handleSuccess} onSwitchToRegister={() => setMode("register")} />
                            : <RegisterForm onSuccess={handleSuccess} onSwitchToLogin={() => setMode("login")} />
                        }
                    </div>

                    {/* Lien retour */}
                    <a href="/" className="mt-6 text-[13px] font-medium text-neutral-6 no-underline hover:text-neutral-9 transition-colors flex items-center gap-1.5">
                        ← Retour à l'accueil
                    </a>
                </div>
            </div>
        </AuthProvider>
    );
}