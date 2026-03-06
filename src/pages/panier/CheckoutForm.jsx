import { useState } from "react";
import { useCart } from "../../context/CartContext.jsx";

const PAYMENT_METHODS = [
    { id: "mtn", label: "MTN Mobile Money", icon: "📱", color: "#FFD700", desc: "Paiement instantané via MTN MoMo" },
    { id: "moov", label: "Moov Money", icon: "📲", color: "#0047AB", desc: "Paiement instantané via Moov Money" },
    { id: "cash", label: "Cash à la livraison", icon: "💵", color: "#008000", desc: "Payez en espèces à la réception" },
];

const ZONES = [
    "Cotonou – Centre", "Cotonou – Akpakpa", "Cotonou – Cadjèhoun",
    "Cotonou – Fidjrossè", "Abomey-Calavi", "Sèmè-Kpodji", "Porto-Novo",
    "Parakou", "Autre ville (précisez dans les notes)",
];

export default function CheckoutForm({ onConfirm, onBack }) {
    const { cart, cartTotal } = useCart();

    const livraison = cartTotal >= 10000 ? 0 : 1500;
    const totalFinal = cartTotal + livraison;

    const [form, setForm] = useState({
        nom: "", telephone: "", email: "",
        zone: "", adresse: "", notes: "",
        date: "", heure: "10:00",
        paymentMethod: "",
        mobileNumber: "",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const update = (key, val) => {
        setForm((f) => ({ ...f, [key]: val }));
        if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
    };

    const validate = () => {
        const e = {};
        if (!form.nom.trim()) e.nom = "Nom requis";
        if (!form.telephone.trim()) e.telephone = "Téléphone requis";
        if (!form.zone) e.zone = "Zone de livraison requise";
        if (!form.adresse.trim()) e.adresse = "Adresse requise";
        if (!form.date) e.date = "Date de livraison requise";
        if (!form.paymentMethod) e.paymentMethod = "Choisissez un mode de paiement";
        if (form.paymentMethod !== "cash" && !form.mobileNumber.trim())
            e.mobileNumber = "Numéro Mobile Money requis";
        return e;
    };

    const handleSubmit = () => {
        const e = validate();
        if (Object.keys(e).length > 0) { setErrors(e); return; }
        setLoading(true);
        setTimeout(() => { setLoading(false); onConfirm(form); }, 1800);
    };

    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* ── Formulaire ── */}
            <div className="flex-1 min-w-0 flex flex-col gap-6">

                {/* Infos contact */}
                <FormSection title="1. Vos coordonnées" icon="👤">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Nom complet *" value={form.nom} onChange={(v) => update("nom", v)} error={errors.nom} placeholder="Ex : Amadou Diallo" />
                        <Field label="Téléphone *" value={form.telephone} onChange={(v) => update("telephone", v)} error={errors.telephone} placeholder="+229 97 00 00 00" type="tel" />
                    </div>
                    <Field label="Email (optionnel)" value={form.email} onChange={(v) => update("email", v)} placeholder="votre@email.com" type="email" />
                </FormSection>

                {/* Livraison */}
                <FormSection title="2. Livraison" icon="🚚">
                    <div>
                        <label className="text-[13px] font-semibold text-neutral-8 block mb-2">Zone de livraison *</label>
                        <select value={form.zone} onChange={(e) => update("zone", e.target.value)}
                            className="w-full px-4 py-3 rounded-xl text-sm text-neutral-9 border outline-none transition-all cursor-pointer"
                            style={{ borderColor: errors.zone ? "#EF4444" : "#f1f5f9" }}>
                            <option value="">Sélectionner votre zone…</option>
                            {ZONES.map((z) => <option key={z} value={z}>{z}</option>)}
                        </select>
                        {errors.zone && <p className="text-[11px] text-danger-1 mt-1">{errors.zone}</p>}
                    </div>

                    <Field label="Adresse précise *" value={form.adresse} onChange={(v) => update("adresse", v)} error={errors.adresse}
                        placeholder="Quartier, rue, repère…" />

                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Date de livraison *" value={form.date} onChange={(v) => update("date", v)} error={errors.date} type="date" min={today} />
                        <div>
                            <label className="text-[13px] font-semibold text-neutral-8 block mb-2">Heure souhaitée</label>
                            <select value={form.heure} onChange={(e) => update("heure", e.target.value)}
                                className="w-full px-4 py-3 rounded-xl text-sm text-neutral-9 border border-neutral-4 outline-none transition-all cursor-pointer">
                                {["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"].map((h) => (
                                    <option key={h} value={h}>{h}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-[13px] font-semibold text-neutral-8 block mb-2">Notes pour le livreur</label>
                        <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)}
                            placeholder="Précisions sur l'accès, instructions particulières…"
                            rows={3} className="w-full px-4 py-3 rounded-xl text-sm text-neutral-9 border border-neutral-4 outline-none resize-none focus:border-primary-1 transition-all" />
                    </div>
                </FormSection>

                {/* Paiement */}
                <FormSection title="3. Mode de paiement" icon="💳">
                    <div className="flex flex-col gap-3">
                        {PAYMENT_METHODS.map((method) => (
                            <button key={method.id} onClick={() => update("paymentMethod", method.id)}
                                className="flex items-center gap-4 p-4 rounded-2xl border cursor-pointer text-left transition-all duration-150 w-full"
                                style={{
                                    background: form.paymentMethod === method.id ? `${method.color}10` : "transparent",
                                    borderColor: form.paymentMethod === method.id ? method.color : errors.paymentMethod ? "#EF4444" : "#f1f5f9",
                                }}>
                                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-[22px] shrink-0"
                                    style={{ background: `${method.color}15` }}>
                                    {method.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-bold text-sm text-neutral-9">{method.label}</div>
                                    <div className="text-[12px] text-neutral-6">{method.desc}</div>
                                </div>
                                <div className="w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all"
                                    style={{ borderColor: form.paymentMethod === method.id ? method.color : "#A9A9A9", background: form.paymentMethod === method.id ? method.color : "transparent" }}>
                                    {form.paymentMethod === method.id && (
                                        <span className="text-[9px] font-black" style={{ color: method.id === "mtn" ? "#0D0D1A" : "#fff" }}>✓</span>
                                    )}
                                </div>
                            </button>
                        ))}
                        {errors.paymentMethod && <p className="text-[11px] text-danger-1">{errors.paymentMethod}</p>}
                    </div>

                    {/* Numéro mobile money */}
                    {(form.paymentMethod === "mtn" || form.paymentMethod === "moov") && (
                        <div className="mt-3">
                            <Field
                                label={`Numéro ${form.paymentMethod === "mtn" ? "MTN" : "Moov"} *`}
                                value={form.mobileNumber}
                                onChange={(v) => update("mobileNumber", v)}
                                error={errors.mobileNumber}
                                placeholder="+229 97 00 00 00"
                                type="tel"
                            />
                            <p className="text-[11px] text-neutral-6 mt-2">
                                💡 Vous recevrez une demande de paiement sur ce numéro après confirmation de la commande.
                            </p>
                        </div>
                    )}
                </FormSection>
            </div>

            {/* ── Résumé commande ── */}
            <div className="w-full lg:w-[320px] shrink-0">
                <div className="bg-neutral-0 rounded-2xl border border-neutral-4 p-6 sticky top-24">
                    <h3 className="font-bold text-body text-neutral-9 mb-4">Votre commande</h3>

                    {/* Articles */}
                    <div className="flex flex-col gap-2.5 pb-4 border-b border-neutral-4 max-h-48 overflow-y-auto">
                        {cart.map((item) => {
                            const unitPrice = item.promo ? Math.round(item.price * (1 - item.promo / 100)) : item.price;
                            return (
                                <div key={item.id} className="flex items-center gap-2.5">
                                    <span className="text-h5 shrink-0">{item.emoji ?? "📦"}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[12px] font-semibold text-neutral-9 truncate">{item.name}</p>
                                        <p className="text-[11px] text-neutral-6">×{item.qty}</p>
                                    </div>
                                    <span className="text-[13px] font-bold text-neutral-9 shrink-0">{(unitPrice * item.qty).toLocaleString()} F</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Totaux */}
                    <div className="flex flex-col gap-2 py-4 border-b border-neutral-4">
                        <div className="flex justify-between text-[13px]">
                            <span className="text-neutral-6">Sous-total</span>
                            <span className="font-semibold text-neutral-9">{cartTotal.toLocaleString()} FCFA</span>
                        </div>
                        <div className="flex justify-between text-[13px]">
                            <span className="text-neutral-6">Livraison</span>
                            <span className={`font-semibold ${livraison === 0 ? "text-accent-1" : "text-neutral-9"}`}>
                                {livraison === 0 ? "Gratuite" : `${livraison.toLocaleString()} FCFA`}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center py-4">
                        <span className="font-bold text-body text-neutral-9">Total</span>
                        <span className="font-extrabold text-h5 text-primary-1">{totalFinal.toLocaleString()} <span className="text-[12px] font-medium text-neutral-6">FCFA</span></span>
                    </div>

                    <button onClick={handleSubmit} disabled={loading}
                        className="w-full font-bold text-[15px] text-neutral-9 py-4 rounded-xl border-0 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        style={{ background: "linear-gradient(135deg,#FFD700,#E6C200)", boxShadow: "0 4px 16px rgba(255,215,0,0.35)" }}>
                        {loading ? (
                            <><span className="animate-spin text-body">⏳</span> Confirmation…</>
                        ) : (
                            "✅ Confirmer la commande"
                        )}
                    </button>

                    <button onClick={onBack} className="w-full font-semibold text-[13px] text-neutral-6 bg-transparent border-0 cursor-pointer py-3 hover:text-neutral-9 transition-colors mt-2">
                        ← Modifier le panier
                    </button>
                </div>
            </div>
        </div>
    );
}

function FormSection({ title, icon, children }) {
    return (
        <div className="bg-neutral-0 rounded-2xl border border-neutral-4 p-5 md:p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-4">
                <span className="text-h5">{icon}</span>
                <h3 className="font-bold text-sm text-neutral-9">{title}</h3>
            </div>
            {children}
        </div>
    );
}

function Field({ label, value, onChange, error, placeholder, type = "text", min }) {
    return (
        <div>
            <label className="text-[13px] font-semibold text-neutral-8 block mb-1.5">{label}</label>
            <input type={type} value={value} placeholder={placeholder} min={min}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm text-neutral-9 border outline-none transition-all"
                style={{ borderColor: error ? "#EF4444" : "#f1f5f9", outline: "none" }}
                onFocus={(e) => { if (!error) e.target.style.borderColor = "#FFD700"; }}
                onBlur={(e) => { if (!error) e.target.style.borderColor = "#f1f5f9"; }}
            />
            {error && <p className="text-[11px] text-danger-1 mt-1">{error}</p>}
        </div>
    );
}