import { useEffect, useRef } from "react";
import { useCart } from "../../context/CartContext.jsx";

function generateOrderId() {
    return "SD-" + Date.now().toString(36).toUpperCase().slice(-6);
}

export default function OrderConfirmation({ orderData }) {
    const { cart, cartTotal, clearCart } = useCart();
    const orderId = useRef(generateOrderId()).current;
    const livraison = cartTotal >= 10000 ? 0 : 1500;
    const totalFinal = cartTotal + livraison;

    // Vider le panier une fois la confirmation affichée
    useEffect(() => {
        const timer = setTimeout(() => clearCart(), 500);
        return () => clearTimeout(timer);
    }, []);

    const paymentLabel = {
        mtn: "MTN Mobile Money",
        moov: "Moov Money",
        cash: "Cash à la livraison",
    }[orderData.paymentMethod] ?? orderData.paymentMethod;

    return (
        <div className="max-w-140 mx-auto py-8">

            {/* Succès header */}
            <div className="text-center mb-10">
                <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full mb-5"
                    style={{ background: "rgba(0,128,0,0.12)", border: "2px solid rgba(0,128,0,0.3)" }}>
                    <span className="text-h1">🎉</span>
                    <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-accent-1 flex items-center justify-center">
                        <span className="text-sm text-neutral-0 font-black">✓</span>
                    </div>
                </div>
                <h1 className="font-extrabold text-[26px] text-neutral-9 mb-2">Commande confirmée !</h1>
                <p className="text-[15px] text-neutral-6 leading-relaxed">
                    Merci <strong className="text-neutral-9">{orderData.nom}</strong> ! Votre commande a bien été enregistrée.
                </p>

                {/* Numéro de commande */}
                <div className="inline-flex items-center gap-3 mt-5 px-5 py-3 rounded-2xl"
                    style={{ background: "rgba(255,215,0,0.1)", border: "1.5px solid rgba(255,215,0,0.3)" }}>
                    <span className="text-h6">🧾</span>
                    <div className="text-left">
                        <p className="text-[10px] font-semibold text-neutral-6 uppercase tracking-wider">Numéro de commande</p>
                        <p className="font-extrabold text-h6 text-primary-1">{orderId}</p>
                    </div>
                </div>
            </div>

            {/* Détails commande */}
            <div className="flex flex-col gap-4">

                {/* Articles */}
                <div className="bg-neutral-0 rounded-2xl border border-neutral-4 p-5">
                    <h3 className="font-bold text-sm text-neutral-9 mb-4 pb-3 border-b border-neutral-4">Articles commandés</h3>
                    <div className="flex flex-col gap-3">
                        {cart.map((item) => {
                            const unitPrice = item.promo ? Math.round(item.price * (1 - item.promo / 100)) : item.price;
                            return (
                                <div key={item.id} className="flex items-center gap-3">
                                    <span className="text-[22px] shrink-0">{item.emoji ?? "📦"}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-[13px] text-neutral-9 truncate">{item.name}</p>
                                        <p className="text-[11px] text-neutral-6">{item.unit} × {item.qty}</p>
                                    </div>
                                    <span className="font-bold text-sm text-neutral-9 shrink-0">{(unitPrice * item.qty).toLocaleString()} FCFA</span>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-neutral-4">
                        <span className="font-bold text-sm text-neutral-9">Total payé</span>
                        <span className="font-extrabold text-h5 text-primary-1">{totalFinal.toLocaleString()} <span className="text-[12px] font-medium text-neutral-6">FCFA</span></span>
                    </div>
                </div>

                {/* Infos livraison */}
                <div className="bg-neutral-0 rounded-2xl border border-neutral-4 p-5">
                    <h3 className="font-bold text-sm text-neutral-9 mb-4 pb-3 border-b border-neutral-4">Infos de livraison</h3>
                    <div className="flex flex-col gap-2.5">
                        {[
                            { icon: "👤", label: "Nom", value: orderData.nom },
                            { icon: "📞", label: "Téléphone", value: orderData.telephone },
                            { icon: "📍", label: "Zone", value: orderData.zone },
                            { icon: "🏠", label: "Adresse", value: orderData.adresse },
                            { icon: "📅", label: "Date", value: `${orderData.date} à ${orderData.heure}` },
                            { icon: "💳", label: "Paiement", value: paymentLabel },
                        ].map(({ icon, label, value }) => (
                            <div key={label} className="flex gap-3 text-[13px]">
                                <span className="text-sm shrink-0 mt-0.5">{icon}</span>
                                <span className="text-neutral-6 w-20 shrink-0">{label}</span>
                                <span className="font-semibold text-neutral-9">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Prochaines étapes */}
                <div className="rounded-2xl p-5" style={{ background: "rgba(0,128,0,0.06)", border: "1px solid rgba(0,128,0,0.2)" }}>
                    <h3 className="font-bold text-sm text-accent-1 mb-3">📲 Prochaines étapes</h3>
                    <div className="flex flex-col gap-2">
                        {[
                            `Vous recevrez une confirmation par SMS au ${orderData.telephone}`,
                            orderData.paymentMethod !== "cash"
                                ? `Une demande de paiement ${paymentLabel} sera envoyée sur votre numéro`
                                : "Préparez le montant en espèces pour le livreur",
                            `Votre commande sera livrée le ${orderData.date} à ${orderData.heure}`,
                            "Suivez votre commande en temps réel dans la section Suivi",
                        ].map((step, i) => (
                            <div key={i} className="flex gap-2.5 text-[13px] text-neutral-7">
                                <span className="w-5 h-5 rounded-full bg-accent-1 text-neutral-0 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">{i + 1}</span>
                                {step}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <a href="/suivi"
                    className="flex-1 font-bold text-sm text-neutral-9 no-underline py-3.5 rounded-xl text-center transition-all duration-200 hover:-translate-y-0.5"
                    style={{ background: "linear-gradient(135deg,#FFD700,#E6C200)", boxShadow: "0 4px 16px rgba(255,215,0,0.3)" }}>
                    📍 Suivre ma commande
                </a>
                <a href="/"
                    className="flex-1 font-semibold text-sm text-neutral-8 no-underline py-3.5 rounded-xl text-center border border-neutral-4 hover:border-neutral-6 hover:text-neutral-9 transition-all duration-200">
                    Retour à l'accueil
                </a>
            </div>
        </div>
    );
}