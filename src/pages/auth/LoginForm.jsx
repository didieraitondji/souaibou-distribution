import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

export default function LoginForm({ onSuccess, onSwitchToRegister }) {
    const { login } = useAuth();
    const [form, setForm] = useState({ telephone: "", password: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPwd, setShowPwd] = useState(false);

    const update = (k, v) => {
        setForm((f) => ({ ...f, [k]: v }));
        if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
    };

    const validate = () => {
        const e = {};
        if (!form.telephone.trim()) e.telephone = "Téléphone requis";
        if (!form.password) e.password = "Mot de passe requis";
        return e;
    };

    const handleSubmit = () => {
        const e = validate();
        if (Object.keys(e).length > 0) { setErrors(e); return; }
        setLoading(true);

        // Simulation API — en production, remplacer par un vrai appel
        setTimeout(() => {
            login({
                id: "USR-001",
                nom: "Utilisateur Demo",
                telephone: form.telephone,
                email: "",
            });
            setLoading(false);
            onSuccess?.();
        }, 1200);
    };

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="font-extrabold text-[26px] text-neutral-9 leading-tight">Bon retour ! 👋</h2>
                <p className="text-[14px] text-neutral-6 mt-1.5">Connectez-vous pour accéder à votre compte.</p>
            </div>

            <div className="flex flex-col gap-4">
                <Field
                    label="Numéro de téléphone"
                    placeholder="+229 97 00 00 00"
                    value={form.telephone}
                    onChange={(v) => update("telephone", v)}
                    error={errors.telephone}
                    type="tel"
                    icon="📞"
                />
                <div>
                    <label className="text-[13px] font-semibold text-neutral-8 block mb-1.5">Mot de passe</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-body pointer-events-none">🔒</span>
                        <input
                            type={showPwd ? "text" : "password"}
                            value={form.password}
                            onChange={(e) => update("password", e.target.value)}
                            placeholder="Votre mot de passe"
                            className="w-full pl-11 pr-11 py-3.5 rounded-xl text-[14px] text-neutral-9 border outline-none transition-all"
                            style={{ borderColor: errors.password ? "#EF4444" : "#f1f5f9" }}
                            onFocus={(e) => { if (!errors.password) e.target.style.borderColor = "#FFD700"; }}
                            onBlur={(e) => { if (!errors.password) e.target.style.borderColor = "#f1f5f9"; }}
                        />
                        <button
                            onClick={() => setShowPwd((v) => !v)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent border-0 cursor-pointer text-body text-neutral-6 hover:text-neutral-9 transition-colors"
                            type="button"
                        >
                            {showPwd ? "🙈" : "👁️"}
                        </button>
                    </div>
                    {errors.password && <p className="text-[11px] text-danger-1 mt-1">{errors.password}</p>}
                </div>
            </div>

            {/* Mot de passe oublié */}
            <div className="flex justify-end -mt-2">
                <button className="text-[13px] font-semibold text-primary-7 bg-transparent border-0 cursor-pointer hover:text-primary-1 transition-colors">
                    Mot de passe oublié ?
                </button>
            </div>

            {/* Bouton connexion */}
            <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full font-bold text-[15px] text-neutral-9 py-4 rounded-xl border-0 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg,#FFD700,#E6C200)", boxShadow: "0 4px 16px rgba(255,215,0,0.35)" }}
            >
                {loading
                    ? <><span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⏳</span> Connexion…</>
                    : "Se connecter →"
                }
            </button>

            {/* Séparateur */}
            <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-neutral-4" />
                <span className="text-[12px] text-neutral-6 font-medium">ou</span>
                <div className="flex-1 h-px bg-neutral-4" />
            </div>

            {/* Switch inscription */}
            <p className="text-center text-[14px] text-neutral-6">
                Pas encore de compte ?{" "}
                <button
                    onClick={onSwitchToRegister}
                    className="font-bold text-primary-7 bg-transparent border-0 cursor-pointer hover:text-primary-1 transition-colors"
                >
                    Créer un compte
                </button>
            </p>

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
                <input
                    type={type}
                    value={value}
                    placeholder={placeholder}
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