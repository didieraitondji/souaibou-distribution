const STEPS = [
    { num: 1, icon: "🛒", title: "Choisissez vos produits", desc: "Parcourez le catalogue boissons, location ou services. Ajoutez ce dont vous avez besoin en quelques clics.", color: "#FFD700" },
    { num: 2, icon: "📅", title: "Précisez votre date", desc: "Indiquez la date, l'heure et le lieu de livraison. Nous nous adaptons à votre planning.", color: "#0047AB" },
    { num: 3, icon: "💳", title: "Payez en sécurité", desc: "Mobile Money (MTN, Moov), virement ou cash à la livraison. Simple et sécurisé.", color: "#008000" },
    { num: 4, icon: "🚚", title: "Recevez & profitez", desc: "Notre équipe livre et installe tout sur site. Vous n'avez plus qu'à profiter.", color: "#FFD700" },
];

export default function HowItWorks() {
    return (
        <section className="py-24 px-4 md:px-8 relative overflow-hidden" style={{ background: "#1A1A2E" }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(255,215,0,0.04) 0%,transparent 70%)" }} />

            <div className="max-w-275 mx-auto relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-block rounded-full px-5 py-1.5 mb-4 text-[12px] font-semibold tracking-widest uppercase" style={{ background: "rgba(0,71,171,0.2)", border: "1px solid rgba(0,71,171,0.4)", color: "#6699CC" }}>
                        Comment ça marche
                    </div>
                    <h2 className="font-extrabold text-neutral-0 leading-tight mb-4" style={{ fontSize: "clamp(26px,4vw,40px)" }}>
                        Commander en <span className="text-primary-1">4 étapes simples</span>
                    </h2>
                    <p className="text-body text-neutral-6 max-w-130 mx-auto leading-relaxed">
                        De votre commande à la livraison, tout est pensé pour vous faciliter la vie.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {STEPS.map((step, i) => (
                        <div key={i} className="flex flex-col items-center text-center">
                            <div
                                className="w-22 h-22 rounded-full flex items-center justify-center text-h3 mb-5 relative"
                                style={{ background: `linear-gradient(135deg,${step.color}22,${step.color}11)`, border: `2px solid ${step.color}44`, boxShadow: `0 0 24px ${step.color}22` }}
                            >
                                {step.icon}
                                <div
                                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black"
                                    style={{ background: step.color, color: step.color === "#FFD700" ? "#0D0D1A" : "#fff" }}
                                >
                                    {step.num}
                                </div>
                            </div>
                            <h3 className="font-bold text-[17px] text-neutral-0 mb-2.5">{step.title}</h3>
                            <p className="text-[13px] text-neutral-6 leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-14">
                    <a
                        href="/boissons"
                        className="font-bold text-[15px] text-neutral-9 no-underline px-10 py-3.5 rounded-xl inline-block transition-all duration-200 hover:-translate-y-0.5"
                        style={{ background: "linear-gradient(135deg,#FFD700,#E6C200)", boxShadow: "0 4px 20px rgba(255,215,0,0.35)" }}
                    >
                        Commencer ma commande →
                    </a>
                </div>
            </div>
        </section>
    );
}