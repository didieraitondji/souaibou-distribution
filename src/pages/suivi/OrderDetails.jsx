import { getOrderTotal } from "./data.js";

const PAYMENT_LABELS = {
    mtn: "MTN Mobile Money",
    moov: "Moov Money",
    cash: "Cash à la livraison",
};

export default function OrderDetails({ order }) {
    const total = getOrderTotal(order);
    const livraison = total >= 10000 ? 0 : 1500;
    const totalFinal = total + livraison;

    return (
        <div className="flex flex-col gap-4">

            {/* Infos commande */}
            <div className="bg-neutral-0 rounded-2xl border border-neutral-4 p-6">
                <h3 className="font-bold text-[15px] text-neutral-9 mb-5 pb-3 border-b border-neutral-4">
                    Détails de la commande
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { icon: "🧾", label: "Numéro", value: order.id, bold: true },
                        { icon: "👤", label: "Client", value: order.client.nom },
                        { icon: "📞", label: "Téléphone", value: order.client.telephone },
                        { icon: "📍", label: "Zone", value: order.client.zone },
                        { icon: "📅", label: "Livraison", value: `${order.date} à ${order.heure}` },
                        { icon: "💳", label: "Paiement", value: PAYMENT_LABELS[order.paymentMethod] ?? order.paymentMethod },
                    ].map(({ icon, label, value, bold }) => (
                        <div key={label} className="flex items-start gap-3">
                            <span className="text-body mt-0.5 shrink-0">{icon}</span>
                            <div>
                                <p className="text-sm font-semibold text-neutral-6 uppercase tracking-wide">{label}</p>
                                <p className={`text-sm mt-0.5 ${bold ? "font-extrabold text-primary-1" : "font-semibold text-neutral-9"}`}>
                                    {value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Articles */}
            <div className="bg-neutral-0 rounded-2xl border border-neutral-4 p-6">
                <h3 className="font-bold text-[15px] text-neutral-9 mb-4 pb-3 border-b border-neutral-4">
                    Articles commandés
                </h3>

                <div className="flex flex-col gap-3">
                    {order.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 py-2 border-b border-neutral-3 last:border-0">
                            <div className="w-10 h-10 bg-neutral-3 rounded-xl flex items-center justify-center text-h5 shrink-0">
                                {item.emoji}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm text-neutral-9 truncate">{item.name}</p>
                                <p className="text-[11px] text-neutral-6">× {item.qty}</p>
                            </div>
                            <span className="font-bold text-sm text-neutral-9 shrink-0">
                                {(item.price * item.qty).toLocaleString()} FCFA
                            </span>
                        </div>
                    ))}
                </div>

                {/* Total */}
                <div className="mt-4 pt-4 border-t border-neutral-4 flex flex-col gap-2">
                    <div className="flex justify-between text-[13px]">
                        <span className="text-neutral-6">Sous-total</span>
                        <span className="font-semibold text-neutral-9">{total.toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between text-[13px]">
                        <span className="text-neutral-6">Livraison</span>
                        <span className={`font-semibold ${livraison === 0 ? "text-accent-1" : "text-neutral-9"}`}>
                            {livraison === 0 ? "Gratuite" : `${livraison.toLocaleString()} FCFA`}
                        </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-neutral-4 mt-1">
                        <span className="font-bold text-[15px] text-neutral-9">Total</span>
                        <span className="font-extrabold text-h5 text-primary-1">
                            {totalFinal.toLocaleString()}
                            <span className="text-[12px] font-medium text-neutral-6 ml-1">FCFA</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* Aide */}
            <div className="rounded-2xl p-5"
                style={{ background: "rgba(0,71,171,0.06)", border: "1px solid rgba(0,71,171,0.15)" }}>
                <p className="font-bold text-[13px] text-secondary-1 mb-2">❓ Un problème avec votre commande ?</p>
                <p className="text-[13px] text-neutral-6 mb-3 leading-relaxed">
                    Notre équipe est disponible 7j/7 pour vous aider.
                </p>
                <div className="flex flex-wrap gap-3">
                    <a href="tel:+22997000000"
                        className="font-semibold text-[13px] no-underline px-4 py-2 rounded-lg transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-1.5"
                        style={{ background: "rgba(0,71,171,0.1)", color: "#0047AB", border: "1px solid rgba(0,71,171,0.2)" }}>
                        📞 Appeler
                    </a>
                    <a href="https://wa.me/22997000000" target="_blank" rel="noreferrer"
                        className="font-semibold text-[13px] no-underline px-4 py-2 rounded-lg transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-1.5"
                        style={{ background: "rgba(0,128,0,0.1)", color: "#008000", border: "1px solid rgba(0,128,0,0.2)" }}>
                        💬 WhatsApp
                    </a>
                </div>
            </div>

        </div>
    );
}