import { useState } from "react";
import { useAuth } from "../../../context/AuthContext.jsx";

const VILLES = [
    "Cotonou", "Abomey-Calavi", "Sèmè-Kpodji", "Porto-Novo",
    "Parakou", "Bohicon", "Natitingou", "Autre",
];

export default function ProfileTab() {
    const { user, updateUser } = useAuth();
    const [form, setForm] = useState({ nom: user?.nom ?? "", telephone: user?.telephone ?? "", email: user?.email ?? "", ville: user?.ville ?? "" });
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);

    const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            updateUser(form);
            setLoading(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
        }, 800);
    };

    return (
        <div className="flex flex-col gap-6">
            <SectionTitle icon="👤" title="Informations personnelles" />

            <div className="bg-neutral-0 rounded-2xl border border-neutral-4 p-6 flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Nom complet" value={form.nom} onChange={(v) => update("nom", v)} icon="👤" placeholder="Votre nom" />
                    <Field label="Téléphone" value={form.telephone} onChange={(v) => update("telephone", v)} icon="📞" placeholder="+229 97 00 00 00" type="tel" />
                </div>
                <Field label="Email" value={form.email} onChange={(v) => update("email", v)} icon="✉️" placeholder="votre@email.com" type="email" />

                <div>
                    <label className="text-[13px] font-semibold text-neutral-8 block mb-1.5">Ville</label>
                    <select value={form.ville} onChange={(e) => update("ville", e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl text-[14px] text-neutral-9 border border-neutral-4 bg-neutral-0 outline-none cursor-pointer transition-all focus:border-primary-1">
                        <option value="">Sélectionner votre ville</option>
                        {VILLES.map((v) => <option key={v} value={v}>{v}</option>)}
                    </select>
                </div>

                <div className="flex items-center gap-4 pt-2 border-t border-neutral-4">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="font-bold text-[14px] text-neutral-9 px-8 py-3 rounded-xl border-0 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 flex items-center gap-2"
                        style={{ background: saved ? "linear-gradient(135deg,#008000,#006600)" : "linear-gradient(135deg,#FFD700,#E6C200)", color: saved ? "#fff" : "#0D0D1A", boxShadow: "0 4px 14px rgba(255,215,0,0.3)" }}
                    >
                        {loading ? "⏳ Enregistrement…" : saved ? "✓ Sauvegardé !" : "Enregistrer les modifications"}
                    </button>
                </div>
            </div>

            {/* Notifications */}
            <SectionTitle icon="🔔" title="Préférences de notification" />
            <div className="bg-neutral-0 rounded-2xl border border-neutral-4 p-6 flex flex-col gap-3">
                {[
                    { label: "SMS de confirmation de commande", defaultOn: true },
                    { label: "SMS de mise à jour de livraison", defaultOn: true },
                    { label: "Offres et promotions exclusives", defaultOn: false },
                ].map((item) => (
                    <NotifToggle key={item.label} label={item.label} defaultOn={item.defaultOn} />
                ))}
            </div>
        </div>
    );
}

function NotifToggle({ label, defaultOn }) {
    const [on, setOn] = useState(defaultOn);
    return (
        <div className="flex items-center justify-between py-2">
            <span className="text-[14px] text-neutral-8 font-medium">{label}</span>
            <button
                onClick={() => setOn((v) => !v)}
                className="relative w-11 h-6 rounded-full border-0 cursor-pointer transition-all duration-200 shrink-0"
                style={{ background: on ? "#FFD700" : "#E2E8F0" }}
            >
                <span
                    className="absolute top-0.5 w-5 h-5 rounded-full bg-neutral-0 transition-all duration-200 shadow-sm"
                    style={{ left: on ? "calc(100% - 22px)" : "2px" }}
                />
            </button>
        </div>
    );
}

function Field({ label, value, onChange, icon, placeholder, type = "text" }) {
    return (
        <div>
            <label className="text-[13px] font-semibold text-neutral-8 block mb-1.5">{label}</label>
            <div className="relative">
                {icon && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-body pointer-events-none">{icon}</span>}
                <input type={type} value={value} placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full py-3.5 rounded-xl text-[14px] text-neutral-9 border border-neutral-4 outline-none transition-all focus:border-primary-1"
                    style={{ paddingLeft: icon ? "2.75rem" : "1rem", paddingRight: "1rem" }}
                />
            </div>
        </div>
    );
}

function SectionTitle({ icon, title }) {
    return (
        <div className="flex items-center gap-2.5">
            <span className="text-h6">{icon}</span>
            <h3 className="font-bold text-body text-neutral-9">{title}</h3>
        </div>
    );
}