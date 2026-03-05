import { useState } from "react";
import { OCCASIONS, BUDGETS, SERVICES } from "./data.js";

const EMPTY_FORM = {
    nom: "", telephone: "", email: "",
    occasion: "", date: "", nbPersonnes: "",
    budget: "",
    services: [],
    message: "",
};

export default function DevisModal({ open, onClose, preselectedService }) {
    const [form, setForm] = useState({ ...EMPTY_FORM, services: preselectedService ? [preselectedService.id] : [] });
    const [step, setStep] = useState(1); // 1 = infos, 2 = événement, 3 = services, 4 = succès
    const [loading, setLoading] = useState(false);

    // Resync preselectedService quand il change
    useState(() => {
        if (preselectedService) setForm((f) => ({ ...f, services: [preselectedService.id] }));
    });

    const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));

    const toggleService = (id) => {
        setForm((f) => ({
            ...f,
            services: f.services.includes(id) ? f.services.filter((s) => s !== id) : [...f.services, id],
        }));
    };

    const canNext1 = form.nom && form.telephone;
    const canNext2 = form.occasion && form.date && form.nbPersonnes;
    const canSubmit = form.services.length > 0;

    const handleSubmit = () => {
        setLoading(true);
        setTimeout(() => { setLoading(false); setStep(4); }, 1500);
    };

    const handleClose = () => {
        onClose();
        setTimeout(() => { setStep(1); setForm(EMPTY_FORM); }, 300);
    };

    if (!open) return null;

    return (
        <>
            {/* Overlay */}
            <div onClick={handleClose} className="fixed inset-0 z-50 transition-all duration-300"
                style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }} />

            {/* Modal */}
            <div
                className="fixed z-50 bg-neutral-0 flex flex-col overflow-hidden"
                style={{
                    top: "50%", left: "50%", transform: "translate(-50%,-50%)",
                    width: "min(560px, 95vw)", maxHeight: "90vh",
                    borderRadius: 24, boxShadow: "0 32px 80px rgba(0,0,0,0.3)",
                }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-4 shrink-0">
                    <div>
                        <h2 className="font-bold text-h6 text-neutral-9">Demande de devis</h2>
                        {step < 4 && <p className="text-[12px] text-neutral-6 mt-0.5">Étape {step} / 3</p>}
                    </div>
                    <button onClick={handleClose} className="w-9 h-9 rounded-full bg-neutral-3 border-0 cursor-pointer flex items-center justify-center text-neutral-7 hover:bg-neutral-4 text-h5 leading-none">×</button>
                </div>

                {/* Progress bar */}
                {step < 4 && (
                    <div className="h-1 bg-neutral-3 shrink-0">
                        <div className="h-full bg-accent-1 transition-all duration-400 rounded-full"
                            style={{ width: `${(step / 3) * 100}%` }} />
                    </div>
                )}

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 py-6">

                    {/* ── Étape 1 : Infos contact ── */}
                    {step === 1 && (
                        <div className="flex flex-col gap-4">
                            <div>
                                <p className="text-[11px] font-bold text-neutral-6 uppercase tracking-widest mb-4">Vos coordonnées</p>
                                <div className="flex flex-col gap-3">
                                    <Field label="Nom complet *" placeholder="Ex : Amadou Diallo" value={form.nom} onChange={(v) => update("nom", v)} />
                                    <Field label="Téléphone *" placeholder="+229 97 00 00 00" value={form.telephone} onChange={(v) => update("telephone", v)} type="tel" />
                                    <Field label="Email (optionnel)" placeholder="votre@email.com" value={form.email} onChange={(v) => update("email", v)} type="email" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── Étape 2 : Infos événement ── */}
                    {step === 2 && (
                        <div className="flex flex-col gap-4">
                            <p className="text-[11px] font-bold text-neutral-6 uppercase tracking-widest">Votre événement</p>

                            {/* Occasion */}
                            <div>
                                <label className="text-[13px] font-semibold text-neutral-8 block mb-2">Type d'occasion *</label>
                                <div className="flex flex-wrap gap-2">
                                    {OCCASIONS.map((occ) => (
                                        <button key={occ} onClick={() => update("occasion", occ)}
                                            className="px-4 py-2 rounded-full text-[13px] font-medium border cursor-pointer transition-all duration-150"
                                            style={{
                                                background: form.occasion === occ ? "#008000" : "transparent",
                                                color: form.occasion === occ ? "#fff" : "#1A1A2E",
                                                borderColor: form.occasion === occ ? "#008000" : "#f1f5f9",
                                            }}>
                                            {occ}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <Field label="Date de l'événement *" value={form.date} onChange={(v) => update("date", v)} type="date"
                                    min={new Date().toISOString().split("T")[0]} />
                                <Field label="Nombre de personnes *" placeholder="Ex : 150" value={form.nbPersonnes} onChange={(v) => update("nbPersonnes", v)} type="number" />
                            </div>

                            {/* Budget */}
                            <div>
                                <label className="text-[13px] font-semibold text-neutral-8 block mb-2">Budget estimé</label>
                                <select value={form.budget} onChange={(e) => update("budget", e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl text-sm text-neutral-9 border border-neutral-4 bg-neutral-0 outline-none focus:border-accent-1 transition-all cursor-pointer">
                                    <option value="">Sélectionner un budget</option>
                                    {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                                </select>
                            </div>
                        </div>
                    )}

                    {/* ── Étape 3 : Services ── */}
                    {step === 3 && (
                        <div className="flex flex-col gap-4">
                            <p className="text-[11px] font-bold text-neutral-6 uppercase tracking-widest">Services souhaités *</p>
                            <p className="text-[13px] text-neutral-6">Sélectionnez un ou plusieurs services</p>

                            <div className="flex flex-col gap-3">
                                {SERVICES.map((s) => (
                                    <button key={s.id} onClick={() => toggleService(s.id)}
                                        className="flex items-center gap-4 p-4 rounded-2xl border cursor-pointer text-left transition-all duration-150 w-full"
                                        style={{
                                            background: form.services.includes(s.id) ? s.colorBg : "transparent",
                                            borderColor: form.services.includes(s.id) ? s.color : "#f1f5f9",
                                        }}>
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[22px] shrink-0"
                                            style={{ background: `${s.color}15` }}>
                                            {s.emoji}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-bold text-sm text-neutral-9">{s.title}</div>
                                            <div className="text-[12px] text-neutral-6 truncate">{s.tagline}</div>
                                        </div>
                                        <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
                                            style={{ borderColor: form.services.includes(s.id) ? s.color : "#A9A9A9", background: form.services.includes(s.id) ? s.color : "transparent" }}>
                                            {form.services.includes(s.id) && (
                                                <span className="text-[10px] font-black" style={{ color: s.color === "#FFD700" ? "#0D0D1A" : "#fff" }}>✓</span>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div>
                                <label className="text-[13px] font-semibold text-neutral-8 block mb-2">Message complémentaire</label>
                                <textarea
                                    value={form.message}
                                    onChange={(e) => update("message", e.target.value)}
                                    placeholder="Précisez vos souhaits, contraintes, questions…"
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl text-sm text-neutral-9 border border-neutral-4 bg-neutral-0 outline-none resize-none focus:border-accent-1 transition-all"
                                />
                            </div>
                        </div>
                    )}

                    {/* ── Étape 4 : Succès ── */}
                    {step === 4 && (
                        <div className="flex flex-col items-center text-center py-8 gap-4">
                            <div className="w-20 h-20 rounded-full bg-accent-2 flex items-center justify-center text-h1">🎉</div>
                            <h3 className="font-bold text-h5 text-neutral-9">Demande envoyée !</h3>
                            <p className="text-sm text-neutral-6 leading-relaxed max-w-90">
                                Nous avons bien reçu votre demande de devis. Notre équipe vous contactera dans les <strong>24 heures</strong> au numéro <strong>{form.telephone}</strong>.
                            </p>
                            <div className="flex flex-col gap-2 w-full mt-2">
                                {form.services.map((sid) => {
                                    const s = SERVICES.find((x) => x.id === sid);
                                    return s ? (
                                        <div key={sid} className="flex items-center gap-3 p-3 rounded-xl"
                                            style={{ background: s.colorBg, border: `1px solid ${s.colorBorder}` }}>
                                            <span className="text-h6">{s.emoji}</span>
                                            <span className="font-semibold text-sm text-neutral-9">{s.title}</span>
                                        </div>
                                    ) : null;
                                })}
                            </div>
                            <button onClick={handleClose}
                                className="font-bold text-sm text-neutral-0 px-8 py-3.5 rounded-xl border-0 cursor-pointer mt-2 transition-all duration-200 hover:-translate-y-0.5"
                                style={{ background: "linear-gradient(135deg,#008000,#006600)", boxShadow: "0 4px 16px rgba(0,128,0,0.3)" }}>
                                Fermer
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer actions */}
                {step < 4 && (
                    <div className="px-6 py-4 border-t border-neutral-4 flex justify-between items-center shrink-0 bg-neutral-0">
                        {step > 1
                            ? <button onClick={() => setStep((s) => s - 1)} className="font-semibold text-sm text-neutral-6 bg-transparent border-0 cursor-pointer hover:text-neutral-9 transition-colors">← Retour</button>
                            : <div />
                        }
                        {step < 3
                            ? <button
                                onClick={() => setStep((s) => s + 1)}
                                disabled={step === 1 ? !canNext1 : !canNext2}
                                className="font-bold text-sm px-8 py-3 rounded-xl border-0 cursor-pointer transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                                style={{ background: "linear-gradient(135deg,#008000,#006600)", color: "#fff" }}>
                                Continuer →
                            </button>
                            : <button
                                onClick={handleSubmit}
                                disabled={!canSubmit || loading}
                                className="font-bold text-sm px-8 py-3 rounded-xl border-0 cursor-pointer transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                                style={{ background: "linear-gradient(135deg,#008000,#006600)", color: "#fff" }}>
                                {loading ? "Envoi en cours…" : "📋 Envoyer ma demande"}
                            </button>
                        }
                    </div>
                )}
            </div>
        </>
    );
}

function Field({ label, placeholder, value, onChange, type = "text", min }) {
    return (
        <div>
            <label className="text-[13px] font-semibold text-neutral-8 block mb-1.5">{label}</label>
            <input
                type={type} value={value} placeholder={placeholder} min={min}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm text-neutral-9 border border-neutral-4 bg-neutral-0 outline-none focus:border-accent-1 transition-all"
            />
        </div>
    );
}