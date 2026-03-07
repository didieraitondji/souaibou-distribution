import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

const EMPTY = { nom: "", telephone: "", email: "", password: "", confirm: "", ville: "" };

const VILLES = [
    "Cotonou", "Abomey-Calavi", "Sèmè-Kpodji", "Porto-Novo",
    "Parakou", "Bohicon", "Natitingou", "Autre",
];

export default function RegisterForm({ onSuccess, onSwitchToLogin }) {
    const { login } = useAuth();
    const [step, setStep] = useState(1); // 1 = identité, 2 = sécurité, 3 = succès
    const [form, setForm] = useState(EMPTY);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPwd, setShowPwd] = useState(false);

    const update = (k, v) => {
        setForm((f) => ({ ...f, [k]: v }));
        if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
    };

    const validateStep1 = () => {
        const e = {};
        if (!form.nom.trim()) e.nom = "Nom requis";
        if (!form.telephone.trim()) e.telephone = "Téléphone requis";
        if (!/^\+?[0-9\s]{8,15}$/.test(form.telephone.replace(/\s/g, "")))
            e.telephone = "Numéro invalide";
        return e;
    };

    const validateStep2 = () => {
        const e = {};
        if (!form.password) e.password = "Mot de passe requis";
        if (form.password.length < 6) e.password = "6 caractères minimum";
        if (form.password !== form.confirm) e.confirm = "Les mots de passe ne correspondent pas";
        return e;
    };

    const handleNext = () => {
        const e = validateStep1();
        if (Object.keys(e).length > 0) { setErrors(e); return; }
        setErrors({});
        setStep(2);
    };

    const handleSubmit = () => {
        const e = validateStep2();
        if (Object.keys(e).length > 0) { setErrors(e); return; }
        setLoading(true);

        setTimeout(() => {
            login({
                id: "USR-" + Date.now().toString(36).toUpperCase().slice(-4),
                nom: form.nom,
                telephone: form.telephone,
                email: form.email,
                ville: form.ville,
            });
            setLoading(false);
            setStep(3);
        }, 1400);
    };

    // ── Étape 3 : succès ──
    if (step === 3) {
        return (
            <div className="flex flex-col items-center text-center gap-5 py-6">
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-[44px]"
                    style={{ background: "rgba(0,128,0,0.1)", border: "2px solid rgba(0,128,0,0.3)" }}>
                    🎉
                </div>
                <div>
                    <h2 className="font-extrabold text-h4 text-neutral-9">Bienvenue {form.nom.split(" ")[0]} !</h2>
                    <p className="text-[14px] text-neutral-6 mt-2 leading-relaxed max-w-[320px] mx-auto">
                        Votre compte a été créé avec succès. Vous êtes maintenant connecté.
                    </p>
                </div>
                <div className="flex flex-col gap-3 w-full mt-2">
                    <a href="/compte"
                        className="font-bold text-[15px] text-neutral-9 no-underline py-4 rounded-xl text-center transition-all duration-200 hover:-translate-y-0.5"
                        style={{ background: "linear-gradient(135deg,#FFD700,#E6C200)", boxShadow: "0 4px 16px rgba(255,215,0,0.3)" }}>
                        Accéder à mon compte →
                    </a>
                    <a href="/"
                        className="font-semibold text-[14px] text-neutral-7 no-underline py-3 rounded-xl text-center border border-neutral-4 hover:border-neutral-6 transition-all">
                        Retour à l'accueil
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="font-extrabold text-[26px] text-neutral-9 leading-tight">Créer un compte ✨</h2>
                <p className="text-[14px] text-neutral-6 mt-1.5">Rejoignez Souaïbou Distribution en 2 minutes.</p>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-2">
                {[1, 2].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-black transition-all duration-300"
                            style={{
                                background: step >= s ? "#FFD700" : "#F1F5F9",
                                color: step >= s ? "#0D0D1A" : "#A9A9A9",
                            }}>
                            {step > s ? "✓" : s}
                        </div>
                        <span className="text-[12px] font-medium hidden sm:block"
                            style={{ color: step >= s ? "#1A1A2E" : "#A9A9A9" }}>
                            {s === 1 ? "Identité" : "Sécurité"}
                        </span>
                        {s < 2 && <div className="w-8 h-px mx-1" style={{ background: step > s ? "#FFD700" : "#E2E8F0" }} />}
                    </div>
                ))}
            </div>

            {/* ── Étape 1 : identité ── */}
            {step === 1 && (
                <div className="flex flex-col gap-4">
                    <Field label="Nom complet *" placeholder="Ex : Amadou Diallo" value={form.nom}
                        onChange={(v) => update("nom", v)} error={errors.nom} icon="👤" />
                    <Field label="Téléphone *" placeholder="+229 97 00 00 00" value={form.telephone}
                        onChange={(v) => update("telephone", v)} error={errors.telephone} type="tel" icon="📞" />
                    <Field label="Email (optionnel)" placeholder="votre@email.com" value={form.email}
                        onChange={(v) => update("email", v)} error={errors.email} type="email" icon="✉️" />

                    <div>
                        <label className="text-[13px] font-semibold text-neutral-8 block mb-1.5">Ville</label>
                        <select value={form.ville} onChange={(e) => update("ville", e.target.value)}
                            className="w-full px-4 py-3.5 rounded-xl text-[14px] text-neutral-9 border border-neutral-4 bg-neutral-0 outline-none cursor-pointer transition-all"
                            style={{ accentColor: "#FFD700" }}>
                            <option value="">Sélectionner votre ville</option>
                            {VILLES.map((v) => <option key={v} value={v}>{v}</option>)}
                        </select>
                    </div>

                    <button onClick={handleNext}
                        className="w-full font-bold text-[15px] text-neutral-9 py-4 rounded-xl border-0 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 mt-1"
                        style={{ background: "linear-gradient(135deg,#FFD700,#E6C200)", boxShadow: "0 4px 16px rgba(255,215,0,0.35)" }}>
                        Continuer →
                    </button>
                </div>
            )}

            {/* ── Étape 2 : sécurité ── */}
            {step === 2 && (
                <div className="flex flex-col gap-4">
                    <PasswordField label="Mot de passe *" placeholder="Minimum 6 caractères" value={form.password}
                        onChange={(v) => update("password", v)} error={errors.password}
                        show={showPwd} onToggle={() => setShowPwd((s) => !s)} />

                    <PasswordField label="Confirmer le mot de passe *" placeholder="Répétez le mot de passe" value={form.confirm}
                        onChange={(v) => update("confirm", v)} error={errors.confirm}
                        show={showPwd} onToggle={() => setShowPwd((s) => !s)} />

                    {/* Force du mot de passe */}
                    {form.password.length > 0 && (
                        <PasswordStrength password={form.password} />
                    )}

                    {/* CGU */}
                    <p className="text-[12px] text-neutral-6 leading-relaxed">
                        En créant un compte, vous acceptez nos{" "}
                        <a href="/cgu" className="font-semibold text-primary-7 hover:underline">Conditions d'utilisation</a>{" "}
                        et notre{" "}
                        <a href="/confidentialite" className="font-semibold text-primary-7 hover:underline">Politique de confidentialité</a>.
                    </p>

                    <div className="flex gap-3">
                        <button onClick={() => setStep(1)}
                            className="flex-1 font-semibold text-[14px] text-neutral-7 py-3.5 rounded-xl border border-neutral-4 bg-transparent cursor-pointer hover:border-neutral-6 hover:text-neutral-9 transition-all">
                            ← Retour
                        </button>
                        <button onClick={handleSubmit} disabled={loading}
                            className="flex-1 font-bold text-[15px] text-neutral-9 py-3.5 rounded-xl border-0 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            style={{ background: "linear-gradient(135deg,#FFD700,#E6C200)", boxShadow: "0 4px 16px rgba(255,215,0,0.35)" }}>
                            {loading
                                ? <><span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⏳</span> Création…</>
                                : "Créer mon compte"
                            }
                        </button>
                    </div>
                </div>
            )}

            {/* Switch connexion */}
            {step < 3 && (
                <p className="text-center text-[14px] text-neutral-6">
                    Déjà un compte ?{" "}
                    <button onClick={onSwitchToLogin}
                        className="font-bold text-primary-7 bg-transparent border-0 cursor-pointer hover:text-primary-1 transition-colors">
                        Se connecter
                    </button>
                </p>
            )}

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}

function Field({ label, placeholder, value, onChange, error, type = "text", icon }) {
    return (
        <div>
            <label className="text-[13px] font-semibold text-neutral-8 block mb-1.5">{label}</label>
            <div className="relative">
                {icon && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-body pointer-events-none">{icon}</span>}
                <input type={type} value={value} placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full py-3.5 rounded-xl text-[14px] text-neutral-9 border outline-none transition-all"
                    style={{ paddingLeft: icon ? "2.75rem" : "1rem", paddingRight: "1rem", borderColor: error ? "#EF4444" : "#f1f5f9" }}
                    onFocus={(e) => { if (!error) e.target.style.borderColor = "#FFD700"; }}
                    onBlur={(e) => { if (!error) e.target.style.borderColor = "#f1f5f9"; }}
                />
            </div>
            {error && <p className="text-[11px] text-danger-1 mt-1">{error}</p>}
        </div>
    );
}

function PasswordField({ label, placeholder, value, onChange, error, show, onToggle }) {
    return (
        <div>
            <label className="text-[13px] font-semibold text-neutral-8 block mb-1.5">{label}</label>
            <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-body pointer-events-none">🔒</span>
                <input type={show ? "text" : "password"} value={value} placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full pl-11 pr-11 py-3.5 rounded-xl text-[14px] text-neutral-9 border outline-none transition-all"
                    style={{ borderColor: error ? "#EF4444" : "#f1f5f9" }}
                    onFocus={(e) => { if (!error) e.target.style.borderColor = "#FFD700"; }}
                    onBlur={(e) => { if (!error) e.target.style.borderColor = "#f1f5f9"; }}
                />
                <button type="button" onClick={onToggle}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent border-0 cursor-pointer text-body text-neutral-6 hover:text-neutral-9 transition-colors">
                    {show ? "🙈" : "👁️"}
                </button>
            </div>
            {error && <p className="text-[11px] text-danger-1 mt-1">{error}</p>}
        </div>
    );
}

function PasswordStrength({ password }) {
    const checks = [
        { label: "6 caractères minimum", ok: password.length >= 6 },
        { label: "Lettre majuscule", ok: /[A-Z]/.test(password) },
        { label: "Chiffre", ok: /[0-9]/.test(password) },
    ];
    const score = checks.filter((c) => c.ok).length;
    const colors = ["#EF4444", "#F59E0B", "#008000"];
    const labels = ["Faible", "Moyen", "Fort"];

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                    <div key={i} className="flex-1 h-1.5 rounded-full transition-all duration-300"
                        style={{ background: i < score ? colors[score - 1] : "#E2E8F0" }} />
                ))}
            </div>
            <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-3">
                    {checks.map((c) => (
                        <span key={c.label} className="text-[11px] flex items-center gap-1"
                            style={{ color: c.ok ? "#008000" : "#A9A9A9" }}>
                            {c.ok ? "✓" : "○"} {c.label}
                        </span>
                    ))}
                </div>
                {score > 0 && (
                    <span className="text-[11px] font-bold shrink-0" style={{ color: colors[score - 1] }}>
                        {labels[score - 1]}
                    </span>
                )}
            </div>
        </div>
    );
}