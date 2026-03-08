import { useState, useEffect } from "react";

const SUBJECTS = [
    "Commande de boissons",
    "Location de matériel",
    "Services événementiels",
    "Suivi de commande",
    "Problème technique",
    "Partenariat",
    "Autre",
];

const CHANNELS = [
    {
        icon: "📞",
        label: "Téléphone",
        value: "+229 97 00 00 00",
        desc: "Lun – Sam · 7h – 20h",
        href: "tel:+22997000000",
        color: "#FFD700",
        action: "Appeler",
    },
    {
        icon: "💬",
        label: "WhatsApp",
        value: "+229 97 00 00 00",
        desc: "Réponse en moins d'1h",
        href: "https://wa.me/22997000000",
        color: "#008000",
        action: "Écrire",
    },
    {
        icon: "📧",
        label: "Email",
        value: "contact@souaibou-distribution.bj",
        desc: "Réponse sous 24h",
        href: "mailto:contact@souaibou-distribution.bj",
        color: "#0047AB",
        action: "Envoyer",
    },
];

const HOURS = [
    { day: "Lundi – Vendredi", time: "7h00 – 20h00", open: true },
    { day: "Samedi", time: "8h00 – 18h00", open: true },
    { day: "Dimanche", time: "Fermé", open: false },
];

// ⚠️ Ne pas ajouter Navbar/Footer ici — AppLayout s'en charge.
export default function ContactPage() {
    const [mounted, setMounted] = useState(false);
    const [form, setForm] = useState({ nom: "", telephone: "", email: "", subject: "", message: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

    const update = (k, v) => { setForm((f) => ({ ...f, [k]: v })); if (errors[k]) setErrors((e) => ({ ...e, [k]: "" })); };

    const validate = () => {
        const e = {};
        if (!form.nom.trim()) e.nom = "Nom requis";
        if (!form.telephone.trim()) e.telephone = "Téléphone requis";
        if (!form.subject) e.subject = "Sujet requis";
        if (!form.message.trim()) e.message = "Message requis";
        return e;
    };

    const handleSubmit = () => {
        const e = validate();
        if (Object.keys(e).length > 0) { setErrors(e); return; }
        setLoading(true);
        setTimeout(() => { setLoading(false); setSent(true); }, 1400);
    };

    return (
        <div className="min-h-screen bg-neutral-3">

            {/* ── Hero ── */}
            <section
                className="relative pt-28 pb-16 px-4 md:px-8 overflow-hidden"
                style={{ background: "linear-gradient(135deg,#0D0D1A 0%,#1A0D1A 50%,#0D0D1A 100%)" }}
            >
                <div className="absolute top-0 right-0 w-100 h-100 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle,rgba(255,215,0,0.08) 0%,transparent 70%)", filter: "blur(60px)" }} />
                <div className="absolute bottom-0 left-0 w-75 h-75 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle,rgba(0,71,171,0.08) 0%,transparent 70%)", filter: "blur(40px)" }} />
                <div className="absolute inset-0 pointer-events-none"
                    style={{ backgroundImage: "linear-gradient(rgba(255,215,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,215,0,0.03) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

                <div className="max-w-225 mx-auto relative z-10 text-center">
                    <div className="flex items-center justify-center gap-2 text-[13px] text-neutral-6 mb-8">
                        <a href="/" className="no-underline text-neutral-6 hover:text-primary-1 transition-colors">Accueil</a>
                        <span>/</span>
                        <span className="text-primary-1 font-semibold">Contact</span>
                    </div>

                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 text-[12px] font-semibold tracking-widest uppercase"
                        style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.25)", color: "#FFD700" }}>
                        💬 On est à votre écoute
                    </div>

                    <h1
                        className="font-extrabold text-neutral-0 leading-tight mb-5"
                        style={{
                            fontSize: "clamp(30px,4.5vw,56px)",
                            opacity: mounted ? 1 : 0,
                            transform: mounted ? "translateY(0)" : "translateY(20px)",
                            transition: "all 0.6s ease",
                        }}
                    >
                        Parlons de votre{" "}
                        <span className="text-primary-1">événement</span>
                    </h1>
                    <p
                        className="text-body text-neutral-6 leading-relaxed max-w-130 mx-auto"
                        style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(12px)", transition: "all 0.6s ease 0.15s" }}
                    >
                        Une question, un devis, un problème ? Notre équipe répond à chaque message dans les meilleurs délais.
                    </p>
                </div>
            </section>

            {/* ── Canaux rapides ── */}
            <section className="px-4 md:px-8 -mt-6 relative z-10">
                <div className="max-w-275 mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {CHANNELS.map((ch, i) => (
                        <a
                            key={ch.label}
                            href={ch.href}
                            target={ch.href.startsWith("http") ? "_blank" : undefined}
                            rel="noreferrer"
                            className="no-underline bg-neutral-0 rounded-2xl border border-neutral-4 p-5 flex items-center gap-4 hover:-translate-y-1 transition-all duration-200 group"
                            style={{
                                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                                opacity: mounted ? 1 : 0,
                                transform: mounted ? "translateY(0)" : "translateY(20px)",
                                transition: `all 0.5s ease ${i * 100 + 200}ms`,
                            }}
                        >
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-h4 shrink-0 transition-transform duration-200 group-hover:scale-110"
                                style={{ background: `${ch.color}12`, border: `1px solid ${ch.color}25` }}>
                                {ch.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-[14px] text-neutral-9">{ch.label}</p>
                                <p className="text-[12px] font-medium truncate" style={{ color: ch.color }}>{ch.value}</p>
                                <p className="text-[11px] text-neutral-6">{ch.desc}</p>
                            </div>
                            <span className="font-bold text-[12px] px-3 py-1.5 rounded-lg shrink-0 transition-all duration-150 group-hover:-translate-x-0.5"
                                style={{ background: `${ch.color}12`, color: ch.color }}>
                                {ch.action} →
                            </span>
                        </a>
                    ))}
                </div>
            </section>

            {/* ── Formulaire + Infos ── */}
            <section className="px-4 md:px-8 py-12">
                <div className="max-w-275 mx-auto flex flex-col lg:flex-row gap-8 items-start">

                    {/* ── Formulaire ── */}
                    <div className="flex-1 min-w-0">
                        <div className="bg-neutral-0 rounded-3xl border border-neutral-4 p-6 md:p-8" style={{ boxShadow: "0 4px 30px rgba(0,0,0,0.06)" }}>

                            {sent ? (
                                /* Succès */
                                <div className="flex flex-col items-center text-center py-10 gap-5">
                                    <div className="w-20 h-20 rounded-full flex items-center justify-center text-[44px]"
                                        style={{ background: "rgba(0,128,0,0.1)", border: "2px solid rgba(0,128,0,0.3)" }}>
                                        🎉
                                    </div>
                                    <h3 className="font-bold text-[22px] text-neutral-9">Message envoyé !</h3>
                                    <p className="text-[14px] text-neutral-6 leading-relaxed max-w-90">
                                        Merci <strong>{form.nom.split(" ")[0]}</strong> ! Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.
                                    </p>
                                    <button
                                        onClick={() => { setSent(false); setForm({ nom: "", telephone: "", email: "", subject: "", message: "" }); }}
                                        className="font-semibold text-[14px] text-neutral-8 px-6 py-3 rounded-xl border border-neutral-4 bg-transparent cursor-pointer hover:border-neutral-6 transition-all"
                                    >
                                        Envoyer un autre message
                                    </button>
                                </div>
                            ) : (
                                /* Formulaire */
                                <div className="flex flex-col gap-5">
                                    <div>
                                        <h2 className="font-bold text-h5 text-neutral-9">Envoyer un message</h2>
                                        <p className="text-[13px] text-neutral-6 mt-1">Remplissez le formulaire, nous vous répondons sous 24h.</p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <Field label="Nom complet *" placeholder="Amadou Diallo" value={form.nom} onChange={(v) => update("nom", v)} error={errors.nom} icon="👤" />
                                        <Field label="Téléphone *" placeholder="+229 97 00 00 00" value={form.telephone} onChange={(v) => update("telephone", v)} error={errors.telephone} icon="📞" type="tel" />
                                    </div>

                                    <Field label="Email (optionnel)" placeholder="votre@email.com" value={form.email} onChange={(v) => update("email", v)} icon="✉️" type="email" />

                                    <div>
                                        <label className="text-[13px] font-semibold text-neutral-8 block mb-1.5">Sujet *</label>
                                        <select value={form.subject} onChange={(e) => update("subject", e.target.value)}
                                            className="w-full px-4 py-3.5 rounded-xl text-[14px] text-neutral-9 border bg-neutral-0 outline-none cursor-pointer transition-all"
                                            style={{ borderColor: errors.subject ? "#EF4444" : "#f1f5f9" }}>
                                            <option value="">Sélectionner un sujet…</option>
                                            {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                        {errors.subject && <p className="text-[11px] text-danger-1 mt-1">{errors.subject}</p>}
                                    </div>

                                    <div>
                                        <label className="text-[13px] font-semibold text-neutral-8 block mb-1.5">Message *</label>
                                        <textarea value={form.message} onChange={(e) => update("message", e.target.value)}
                                            placeholder="Décrivez votre demande en détail…"
                                            rows={5}
                                            className="w-full px-4 py-3.5 rounded-xl text-[14px] text-neutral-9 border outline-none resize-none transition-all"
                                            style={{ borderColor: errors.message ? "#EF4444" : "#f1f5f9" }}
                                            onFocus={(e) => { if (!errors.message) e.target.style.borderColor = "#FFD700"; }}
                                            onBlur={(e) => { if (!errors.message) e.target.style.borderColor = "#f1f5f9"; }}
                                        />
                                        {errors.message && <p className="text-[11px] text-danger-1 mt-1">{errors.message}</p>}
                                        <p className="text-[11px] text-neutral-5 mt-1 text-right">{form.message.length} / 1000</p>
                                    </div>

                                    <button
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className="w-full font-bold text-[15px] text-neutral-9 py-4 rounded-xl border-0 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        style={{ background: "linear-gradient(135deg,#FFD700,#E6C200)", boxShadow: "0 4px 16px rgba(255,215,0,0.35)" }}
                                    >
                                        {loading
                                            ? <><span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⏳</span> Envoi en cours…</>
                                            : "📨 Envoyer le message"
                                        }
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── Infos pratiques ── */}
                    <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-4">

                        {/* Horaires */}
                        <div className="bg-neutral-0 rounded-2xl border border-neutral-4 p-6">
                            <div className="flex items-center gap-2.5 mb-5">
                                <span className="text-h5">🕐</span>
                                <h3 className="font-bold text-[15px] text-neutral-9">Horaires d'ouverture</h3>
                            </div>
                            <div className="flex flex-col gap-3">
                                {HOURS.map(({ day, time, open }) => (
                                    <div key={day} className="flex items-center justify-between gap-3">
                                        <span className="text-[13px] font-medium text-neutral-8">{day}</span>
                                        <span className="text-[13px] font-bold" style={{ color: open ? "#008000" : "#EF4444" }}>
                                            {time}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 pt-4 border-t border-neutral-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full animate-pulse bg-accent-1 shrink-0" />
                                <p className="text-[12px] text-neutral-6">Nous sommes actuellement <strong className="text-accent-1">disponibles</strong></p>
                            </div>
                        </div>

                        {/* Adresse */}
                        <div className="bg-neutral-0 rounded-2xl border border-neutral-4 p-6">
                            <div className="flex items-center gap-2.5 mb-4">
                                <span className="text-h5">📍</span>
                                <h3 className="font-bold text-[15px] text-neutral-9">Nous trouver</h3>
                            </div>
                            <p className="text-[13px] text-neutral-6 leading-relaxed mb-4">
                                Entrepôt principal :<br />
                                <strong className="text-neutral-9">Akpakpa, Cotonou</strong><br />
                                Face au marché Gbèdjromèdé<br />
                                Bénin 🇧🇯
                            </p>
                            <a
                                href="https://maps.google.com/?q=Akpakpa,Cotonou,Benin"
                                target="_blank" rel="noreferrer"
                                className="font-semibold text-[13px] no-underline px-4 py-2.5 rounded-xl flex items-center gap-2 w-fit transition-all duration-200 hover:-translate-y-0.5"
                                style={{ background: "rgba(0,71,171,0.08)", color: "#0047AB", border: "1px solid rgba(0,71,171,0.2)" }}
                            >
                                🗺️ Voir sur Google Maps
                            </a>
                        </div>

                        {/* FAQ rapide */}
                        <div className="bg-neutral-0 rounded-2xl border border-neutral-4 p-6">
                            <div className="flex items-center gap-2.5 mb-4">
                                <span className="text-h5">❓</span>
                                <h3 className="font-bold text-[15px] text-neutral-9">Questions fréquentes</h3>
                            </div>
                            <div className="flex flex-col gap-3">
                                {[
                                    { q: "Livrez-vous le dimanche ?", a: "Non, nos livraisons se font du lundi au samedi." },
                                    { q: "Quel est le délai de livraison ?", a: "Livraison express sous 2h à Cotonou pour les commandes avant 16h." },
                                    { q: "Puis-je annuler une commande ?", a: "Oui, jusqu'à 1h avant la livraison depuis votre espace compte." },
                                ].map(({ q, a }) => (
                                    <FaqItem key={q} question={q} answer={a} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}

function Field({ label, placeholder, value, onChange, error, icon, type = "text" }) {
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

function FaqItem({ question, answer }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-neutral-3 pb-3 last:border-0 last:pb-0">
            <button onClick={() => setOpen((v) => !v)}
                className="flex items-center justify-between w-full bg-transparent border-0 cursor-pointer text-left gap-2 py-0.5">
                <span className="text-[13px] font-semibold text-neutral-9">{question}</span>
                <span className="text-[14px] text-neutral-6 shrink-0 transition-transform duration-200"
                    style={{ transform: open ? "rotate(180deg)" : "none" }}>▾</span>
            </button>
            {open && <p className="text-[12px] text-neutral-6 leading-relaxed mt-2">{answer}</p>}
        </div>
    );
}