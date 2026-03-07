import { useAuth } from "../../context/AuthContext.jsx";

export default function AccountHeader() {
    const { user } = useAuth();

    const initials = user?.nom
        ? user.nom.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
        : "??";

    const memberSince = user?.loginAt
        ? new Date(user.loginAt).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })
        : "Aujourd'hui";

    return (
        <div
            className="relative rounded-3xl overflow-hidden px-6 py-8 md:px-10 md:py-10"
            style={{ background: "linear-gradient(135deg,#0D0D1A 0%,#1A2E0D 60%,#0D0D1A 100%)" }}
        >
            {/* Orbs déco */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle,rgba(255,215,0,0.1) 0%,transparent 70%)", filter: "blur(40px)" }} />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle,rgba(0,128,0,0.1) 0%,transparent 70%)", filter: "blur(30px)" }} />
            <div className="absolute inset-0 pointer-events-none opacity-20"
                style={{ backgroundImage: "linear-gradient(rgba(255,215,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,215,0,0.04) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                {/* Avatar */}
                <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center font-extrabold text-[22px] md:text-[26px] shrink-0"
                    style={{ background: "linear-gradient(135deg,#FFD700,#E6C200)", color: "#0D0D1A", boxShadow: "0 0 24px rgba(255,215,0,0.4)" }}
                >
                    {initials}
                </div>

                {/* Infos */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h1 className="font-extrabold text-[22px] md:text-[26px] text-neutral-0 leading-none">
                            {user?.nom ?? "Utilisateur"}
                        </h1>
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                            style={{ background: "rgba(0,128,0,0.2)", color: "#4CAF50", border: "1px solid rgba(0,128,0,0.35)" }}>
                            ✓ Vérifié
                        </span>
                    </div>
                    <p className="text-sm text-neutral-6">{user?.telephone ?? ""}</p>
                    {user?.ville && <p className="text-[13px] text-neutral-6 mt-0.5">📍 {user.ville}</p>}
                </div>

                {/* Stats */}
                <div className="flex gap-4 sm:gap-6">
                    {[
                        { value: "3", label: "Commandes" },
                        { value: memberSince, label: "Membre depuis" },
                    ].map(({ value, label }) => (
                        <div key={label} className="text-center">
                            <div className="font-extrabold text-h6 text-primary-1 leading-none">{value}</div>
                            <div className="text-[11px] text-neutral-6 mt-1 whitespace-nowrap">{label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}