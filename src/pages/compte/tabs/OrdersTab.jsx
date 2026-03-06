import { DEMO_ORDERS, ORDER_STATUSES, getOrderTotal } from "../../suivi/data.js";

export default function OrdersTab() {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <span className="text-[18px]">📦</span>
                    <h3 className="font-bold text-[16px] text-neutral-9">Mes commandes</h3>
                </div>
                <span className="text-[13px] text-neutral-6">{DEMO_ORDERS.length} commandes</span>
            </div>

            {DEMO_ORDERS.length === 0 ? (
                <div className="bg-neutral-0 rounded-2xl border border-neutral-4 p-12 text-center">
                    <span className="text-[48px] block mb-4">📭</span>
                    <p className="font-bold text-[16px] text-neutral-9 mb-2">Aucune commande pour l'instant</p>
                    <p className="text-[14px] text-neutral-6 mb-6">Parcourez notre catalogue et passez votre première commande.</p>
                    <a href="/boissons"
                        className="font-bold text-[14px] text-neutral-9 no-underline px-6 py-3 rounded-xl inline-block transition-all hover:-translate-y-0.5"
                        style={{ background: "linear-gradient(135deg,#FFD700,#E6C200)" }}>
                        Découvrir le catalogue
                    </a>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {DEMO_ORDERS.map((order) => {
                        const status = ORDER_STATUSES[order.status];
                        const total = getOrderTotal(order);
                        const livraison = total >= 10000 ? 0 : 1500;

                        return (
                            <div key={order.id}
                                className="bg-neutral-0 rounded-2xl border border-neutral-4 p-5 hover:border-neutral-5 transition-all duration-200">

                                {/* Header commande */}
                                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="font-extrabold text-[15px] text-neutral-9">{order.id}</span>
                                            <span
                                                className="text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
                                                style={{ background: `${status.color}12`, color: status.color, border: `1px solid ${status.color}25` }}>
                                                {status.icon} {status.label}
                                            </span>
                                        </div>
                                        <p className="text-[12px] text-neutral-6 mt-1">
                                            Livraison prévue le {order.date} à {order.heure}
                                        </p>
                                    </div>
                                    <span className="font-extrabold text-[18px] text-primary-1">
                                        {(total + livraison).toLocaleString()} <span className="text-[12px] font-medium text-neutral-6">FCFA</span>
                                    </span>
                                </div>

                                {/* Articles (preview) */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {order.items.slice(0, 3).map((item, i) => (
                                        <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-3 text-[12px] font-medium text-neutral-8">
                                            <span>{item.emoji}</span>
                                            <span className="truncate max-w-[120px]">{item.name}</span>
                                            <span className="text-neutral-6">×{item.qty}</span>
                                        </div>
                                    ))}
                                    {order.items.length > 3 && (
                                        <div className="flex items-center px-3 py-1.5 rounded-lg bg-neutral-3 text-[12px] font-medium text-neutral-6">
                                            +{order.items.length - 3} articles
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex flex-wrap gap-2 pt-3 border-t border-neutral-4">
                                    <a href={`/suivi?order=${order.id}`}
                                        className="font-semibold text-[13px] no-underline px-4 py-2 rounded-lg transition-all duration-150 flex items-center gap-1.5"
                                        style={{ background: "rgba(255,215,0,0.1)", color: "#B89800", border: "1px solid rgba(255,215,0,0.25)" }}>
                                        📍 Suivre la commande
                                    </a>
                                    {order.status === "delivered" && (
                                        <button className="font-semibold text-[13px] px-4 py-2 rounded-lg bg-transparent border border-neutral-4 cursor-pointer hover:border-neutral-6 transition-all text-neutral-7">
                                            🔄 Commander à nouveau
                                        </button>
                                    )}
                                    {(order.status === "confirmed" || order.status === "preparing") && (
                                        <button className="font-semibold text-[13px] px-4 py-2 rounded-lg bg-transparent border cursor-pointer transition-all text-danger-1"
                                            style={{ borderColor: "rgba(239,68,68,0.3)" }}>
                                            ✕ Annuler
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}