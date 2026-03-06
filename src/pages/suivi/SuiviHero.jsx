import { useState } from "react";

export default function SuiviHero({ onSearch, loading, error }) {
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) onSearch(input.trim());
    };

    return (
        <section
            className="relative pt-24 pb-16 px-4 md:px-8 overflow-hidden"
            style={{ background: "linear-gradient(135deg,#0D0D1A 0%,#1A1A0D 50%,#0D0D1A 100%)" }}
        >
            {/* Orbs */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle,rgba(255,215,0,0.08) 0%,transparent 70%)", filter: "blur(60px)" }} />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle,rgba(0,128,0,0.08) 0%,transparent 70%)", filter: "blur(40px)" }} />
            <div className="absolute inset-0 pointer-events-none opacity-20"
                style={{ backgroundImage: "linear-gradient(rgba(255,215,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,215,0,0.04) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

            <div className="max-w-[700px] mx-auto relative z-10 text-center">
                {/* Breadcrumb */}
                <div className="flex items-center justify-center gap-2 text-[13px] text-neutral-6 mb-8">
                    <a href="/" className="no-underline text-neutral-6 hover:text-primary-1 transition-colors">Accueil</a>
                    <span>/</span>
                    <span className="text-primary-1 font-semibold">Suivi de commande</span>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 text-[12px] font-semibold tracking-widest uppercase"
                    style={{ background: "rgba(255,215,0,0.12)", border: "1px solid rgba(255,215,0,0.3)", color: "#FFD700" }}>
                    📍 Suivi en temps réel
                </div>

                <h1 className="font-extrabold text-neutral-0 leading-tight mb-4" style={{ fontSize: "clamp(28px,4vw,48px)" }}>
                    Où est ma <span className="text-primary-1">commande ?</span>
                </h1>
                <p className="text-[15px] text-neutral-6 leading-relaxed mb-10 max-w-[480px] mx-auto">
                    Entrez votre numéro de commande pour suivre la livraison en temps réel.
                </p>

                {/* Barre de recherche */}
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-[520px] mx-auto">
                    <div className="relative flex-1">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[16px] pointer-events-none">🔍</span>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value.toUpperCase())}
                            placeholder="Ex : SD-A1B2C3"
                            className="w-full pl-11 pr-4 py-4 rounded-2xl text-[15px] font-bold tracking-wider text-neutral-9 border-2 bg-neutral-0 outline-none transition-all duration-200"
                            style={{ borderColor: error ? "#EF4444" : input ? "#FFD700" : "#f1f5f9", letterSpacing: "0.08em" }}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={!input.trim() || loading}
                        className="font-bold text-[15px] text-neutral-9 px-8 py-4 rounded-2xl border-0 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed shrink-0 flex items-center gap-2 justify-center"
                        style={{ background: "linear-gradient(135deg,#FFD700,#E6C200)", boxShadow: "0 4px 16px rgba(255,215,0,0.3)" }}
                    >
                        {loading ? <span className="text-[18px]" style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⏳</span> : "Rechercher"}
                    </button>
                </form>

                {/* Erreur */}
                {error && (
                    <div className="mt-4 flex items-center justify-center gap-2 text-[13px] font-semibold"
                        style={{ color: "#EF4444" }}>
                        <span>❌</span> {error}
                    </div>
                )}

                {/* Démo hint */}
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                    <p className="text-[12px] text-neutral-6 w-full mb-1">Numéros de démo :</p>
                    {["SD-A1B2C3", "SD-D4E5F6", "SD-G7H8I9"].map((id) => (
                        <button key={id} onClick={() => { setInput(id); onSearch(id); }}
                            className="text-[12px] font-bold px-3 py-1.5 rounded-lg border cursor-pointer transition-all duration-150 hover:bg-primary-5"
                            style={{ borderColor: "rgba(255,215,0,0.3)", color: "#FFD700", background: "rgba(255,215,0,0.08)" }}>
                            {id}
                        </button>
                    ))}
                </div>

                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        </section>
    );
}