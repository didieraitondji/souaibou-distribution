import { useState } from "react";
import { useAuth } from "../../../context/AuthContext.jsx";

export default function SecurityTab() {
    const { logout } = useAuth();
    const [form, setForm] = useState({ current: "", next: "", confirm: "" });
    const [errors, setErrors] = useState({});
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPwd, setShowPwd] = useState(false);
    const [showDanger, setShowDanger] = useState(false);

    const update = (k, v) => { setForm((f) => ({ ...f, [k]: v })); if (errors[k]) setErrors((e) => ({ ...e, [k]: "" })); };

    const validate = () => {
        const e = {};
        if (!form.current) e.current = "Mot de passe actuel requis";
        if (!form.next) e.next = "Nouveau mot de passe requis";
        if (form.next.length < 6) e.next = "6 caractères minimum";
        if (form.next !== form.confirm) e.confirm = "Les mots de passe ne correspondent pas";
        return e;
    };

    const handleSave = () => {
        const e = validate();
        if (Object.keys(e).length > 0) { setErrors(e); return; }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSaved(true);
            setForm({ current: "", next: "", confirm: "" });
            setTimeout(() => setSaved(false), 3000);
        }, 1000);
    };

    const checks = [
        { label: "6 caractères minimum", ok: form.next.length >= 6 },
        { label: "Lettre majuscule", ok: /[A-Z]/.test(form.next) },
        { label: "Chiffre", ok: /[0-9]/.test(form.next) },
    ];
    const score = checks.filter((c) => c.ok).length;
    const strengthColors = ["#EF4444", "#F59E0B", "#008000"];

    return (
        <div className="flex flex-col gap-6">

            {/* Changer le mot de passe */}
            <div className="flex items-center gap-2.5">
                <span className="text-[18px]">🔒</span>
                <h3 className="font-bold text-[16px] text-neutral-9">Changer le mot de passe</h3>
            </div>

            <div className="bg-neutral-0 rounded-2xl border border-neutral-4 p-6 flex flex-col gap-4">
                <PwdField label="Mot de passe actuel" value={form.current} onChange={(v) => update("current", v)} error={errors.current} show={showPwd} onToggle={() => setShowPwd((s) => !s)} />
                <PwdField label="Nouveau mot de passe" value={form.next} onChange={(v) => update("next", v)} error={errors.next} show={showPwd} onToggle={() => setShowPwd((s) => !s)} />
                <PwdField label="Confirmer" value={form.confirm} onChange={(v) => update("confirm", v)} error={errors.confirm} show={showPwd} onToggle={() => setShowPwd((s) => !s)} />

                {/* Force */}
                {form.next.length > 0 && (
                    <div className="flex flex-col gap-1.5">
                        <div className="flex gap-1.5">
                            {[0, 1, 2].map((i) => (
                                <div key={i} className="flex-1 h-1.5 rounded-full transition-all duration-300"
                                    style={{ background: i < score ? strengthColors[score - 1] : "#E2E8F0" }} />
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {checks.map((c) => (
                                <span key={c.label} className="text-[11px] flex items-center gap-1"
                                    style={{ color: c.ok ? "#008000" : "#A9A9A9" }}>
                                    {c.ok ? "✓" : "○"} {c.label}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div className="pt-2 border-t border-neutral-4">
                    <button onClick={handleSave} disabled={loading}
                        className="font-bold text-[14px] px-8 py-3 rounded-xl border-0 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 flex items-center gap-2"
                        style={{
                            background: saved ? "linear-gradient(135deg,#008000,#006600)" : "linear-gradient(135deg,#FFD700,#E6C200)",
                            color: saved ? "#fff" : "#0D0D1A",
                        }}>
                        {loading ? "⏳ Enregistrement…" : saved ? "✓ Mot de passe modifié !" : "Enregistrer"}
                    </button>
                </div>
            </div>

            {/* Sessions actives */}
            <div className="flex items-center gap-2.5">
                <span className="text-[18px]">📱</span>
                <h3 className="font-bold text-[16px] text-neutral-9">Session active</h3>
            </div>
            <div className="bg-neutral-0 rounded-2xl border border-neutral-4 p-5">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-neutral-3 flex items-center justify-center text-[20px]">💻</div>
                        <div>
                            <p className="font-semibold text-[14px] text-neutral-9">Navigateur web</p>
                            <p className="text-[12px] text-neutral-6">Cotonou, Bénin · Session actuelle</p>
                        </div>
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                        style={{ background: "rgba(0,128,0,0.1)", color: "#008000", border: "1px solid rgba(0,128,0,0.2)" }}>
                        ● En ligne
                    </span>
                </div>
            </div>

            {/* Zone danger */}
            <div className="flex items-center gap-2.5">
                <span className="text-[18px]">⚠️</span>
                <h3 className="font-bold text-[16px] text-neutral-9">Zone dangereuse</h3>
            </div>
            <div className="rounded-2xl border p-5 flex flex-col gap-3"
                style={{ borderColor: "rgba(239,68,68,0.25)", background: "rgba(239,68,68,0.03)" }}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <p className="font-bold text-[14px] text-neutral-9">Se déconnecter de tous les appareils</p>
                        <p className="text-[12px] text-neutral-6 mt-0.5">Invalide toutes les sessions actives</p>
                    </div>
                    <button onClick={() => { logout(); window.location.href = "/"; }}
                        className="font-semibold text-[13px] px-5 py-2.5 rounded-xl border cursor-pointer transition-all shrink-0"
                        style={{ borderColor: "rgba(239,68,68,0.3)", color: "#EF4444", background: "transparent" }}>
                        Se déconnecter
                    </button>
                </div>
                <div className="h-px bg-danger-2" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <p className="font-bold text-[14px] text-neutral-9">Supprimer mon compte</p>
                        <p className="text-[12px] text-neutral-6 mt-0.5">Action irréversible — toutes vos données seront effacées</p>
                    </div>
                    <button onClick={() => setShowDanger((v) => !v)}
                        className="font-semibold text-[13px] px-5 py-2.5 rounded-xl border-0 cursor-pointer transition-all shrink-0"
                        style={{ background: "rgba(239,68,68,0.1)", color: "#EF4444" }}>
                        Supprimer le compte
                    </button>
                </div>
                {showDanger && (
                    <div className="mt-1 p-4 rounded-xl border border-danger-1 bg-danger-2 text-center">
                        <p className="text-[13px] font-semibold text-danger-1 mb-3">Êtes-vous sûr ? Cette action est irréversible.</p>
                        <div className="flex justify-center gap-3">
                            <button className="font-bold text-[13px] text-neutral-0 px-5 py-2 rounded-lg border-0 cursor-pointer bg-danger-1">Oui, supprimer</button>
                            <button onClick={() => setShowDanger(false)} className="font-semibold text-[13px] text-neutral-7 px-5 py-2 rounded-lg border border-neutral-4 bg-neutral-0 cursor-pointer">Annuler</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function PwdField({ label, value, onChange, error, show, onToggle }) {
    return (
        <div>
            <label className="text-[13px] font-semibold text-neutral-8 block mb-1.5">{label}</label>
            <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[16px] pointer-events-none">🔒</span>
                <input type={show ? "text" : "password"} value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full pl-11 pr-11 py-3.5 rounded-xl text-[14px] text-neutral-9 border outline-none transition-all"
                    style={{ borderColor: error ? "#EF4444" : "#f1f5f9" }}
                    onFocus={(e) => { if (!error) e.target.style.borderColor = "#FFD700"; }}
                    onBlur={(e) => { if (!error) e.target.style.borderColor = "#f1f5f9"; }}
                />
                <button type="button" onClick={onToggle}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent border-0 cursor-pointer text-[16px] text-neutral-6 hover:text-neutral-9 transition-colors">
                    {show ? "🙈" : "👁️"}
                </button>
            </div>
            {error && <p className="text-[11px] text-danger-1 mt-1">{error}</p>}
        </div>
    );
}