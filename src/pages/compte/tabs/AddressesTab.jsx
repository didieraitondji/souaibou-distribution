import { useState } from "react";

const DEFAULT_ADDRESSES = [
    { id: 1, label: "Domicile", zone: "Cotonou – Akpakpa", adresse: "Rue des Cocotiers, face à la pharmacie Sainte-Marie", default: true },
    { id: 2, label: "Bureau", zone: "Cotonou – Centre", adresse: "Avenue Jean-Paul II, Immeuble Sognon 3ème étage", default: false },
];

export default function AddressesTab() {
    const [addresses, setAddresses] = useState(DEFAULT_ADDRESSES);
    const [showForm, setShowForm] = useState(false);
    const [newAddr, setNewAddr] = useState({ label: "", zone: "", adresse: "" });

    const ZONES = ["Cotonou – Centre", "Cotonou – Akpakpa", "Cotonou – Cadjèhoun", "Cotonou – Fidjrossè", "Abomey-Calavi", "Sèmè-Kpodji", "Porto-Novo", "Parakou", "Autre"];

    const setDefault = (id) => setAddresses((prev) => prev.map((a) => ({ ...a, default: a.id === id })));
    const remove = (id) => setAddresses((prev) => prev.filter((a) => a.id !== id));

    const addAddress = () => {
        if (!newAddr.label || !newAddr.zone || !newAddr.adresse) return;
        setAddresses((prev) => [...prev, { ...newAddr, id: Date.now(), default: false }]);
        setNewAddr({ label: "", zone: "", adresse: "" });
        setShowForm(false);
    };

    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <span className="text-h6">📍</span>
                    <h3 className="font-bold text-body text-neutral-9">Mes adresses</h3>
                </div>
                <button
                    onClick={() => setShowForm((v) => !v)}
                    className="font-semibold text-[13px] px-4 py-2 rounded-xl border-0 cursor-pointer transition-all duration-150 flex items-center gap-1.5"
                    style={{ background: "rgba(255,215,0,0.1)", color: "#B89800", border: "1px solid rgba(255,215,0,0.25)" }}
                >
                    + Ajouter une adresse
                </button>
            </div>

            {/* Formulaire ajout */}
            {showForm && (
                <div className="bg-neutral-0 rounded-2xl border-2 border-dashed border-primary-3 p-5 flex flex-col gap-4">
                    <p className="font-bold text-[14px] text-neutral-9">Nouvelle adresse</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="text-[12px] font-semibold text-neutral-7 block mb-1">Libellé</label>
                            <input value={newAddr.label} onChange={(e) => setNewAddr((f) => ({ ...f, label: e.target.value }))}
                                placeholder="Ex : Domicile, Bureau…"
                                className="w-full px-4 py-3 rounded-xl text-[14px] text-neutral-9 border border-neutral-4 outline-none focus:border-primary-1 transition-all" />
                        </div>
                        <div>
                            <label className="text-[12px] font-semibold text-neutral-7 block mb-1">Zone</label>
                            <select value={newAddr.zone} onChange={(e) => setNewAddr((f) => ({ ...f, zone: e.target.value }))}
                                className="w-full px-4 py-3 rounded-xl text-[14px] text-neutral-9 border border-neutral-4 outline-none cursor-pointer">
                                <option value="">Sélectionner…</option>
                                {ZONES.map((z) => <option key={z} value={z}>{z}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="text-[12px] font-semibold text-neutral-7 block mb-1">Adresse précise</label>
                        <input value={newAddr.adresse} onChange={(e) => setNewAddr((f) => ({ ...f, adresse: e.target.value }))}
                            placeholder="Rue, quartier, repère…"
                            className="w-full px-4 py-3 rounded-xl text-[14px] text-neutral-9 border border-neutral-4 outline-none focus:border-primary-1 transition-all" />
                    </div>
                    <div className="flex gap-3">
                        <button onClick={addAddress}
                            className="font-bold text-[14px] text-neutral-9 px-6 py-2.5 rounded-xl border-0 cursor-pointer transition-all hover:-translate-y-0.5"
                            style={{ background: "linear-gradient(135deg,#FFD700,#E6C200)" }}>
                            Enregistrer
                        </button>
                        <button onClick={() => setShowForm(false)}
                            className="font-semibold text-[14px] text-neutral-6 px-6 py-2.5 rounded-xl border border-neutral-4 bg-transparent cursor-pointer hover:text-neutral-9 transition-all">
                            Annuler
                        </button>
                    </div>
                </div>
            )}

            {/* Liste adresses */}
            <div className="flex flex-col gap-3">
                {addresses.map((addr) => (
                    <div key={addr.id}
                        className="bg-neutral-0 rounded-2xl border p-5 transition-all duration-200"
                        style={{ borderColor: addr.default ? "rgba(255,215,0,0.4)" : "#f1f5f9", background: addr.default ? "rgba(255,215,0,0.03)" : "#fff" }}>
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-h6 shrink-0"
                                    style={{ background: addr.default ? "rgba(255,215,0,0.15)" : "#F8FAFC" }}>
                                    🏠
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-bold text-[15px] text-neutral-9">{addr.label}</span>
                                        {addr.default && (
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                                                style={{ background: "rgba(255,215,0,0.15)", color: "#B89800", border: "1px solid rgba(255,215,0,0.3)" }}>
                                                Par défaut
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[13px] font-medium text-neutral-7 mt-0.5">{addr.zone}</p>
                                    <p className="text-[12px] text-neutral-6 mt-0.5 leading-relaxed">{addr.adresse}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                                {!addr.default && (
                                    <button onClick={() => setDefault(addr.id)}
                                        className="text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border cursor-pointer transition-all hover:bg-primary-5"
                                        style={{ borderColor: "rgba(255,215,0,0.3)", color: "#B89800", background: "rgba(255,215,0,0.06)" }}>
                                        Définir par défaut
                                    </button>
                                )}
                                <button onClick={() => remove(addr.id)}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-5 hover:text-danger-1 hover:bg-danger-2 bg-transparent border-0 cursor-pointer transition-all text-body">
                                    🗑
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}