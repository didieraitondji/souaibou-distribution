const LINKS = {
    "Catalogue": [
        { label: "Boissons", href: "/boissons" },
        { label: "Location matériel", href: "/location" },
        { label: "Services événementiels", href: "/services" },
    ],
    "Compte": [
        { label: "Se connecter", href: "/connexion" },
        { label: "Créer un compte", href: "/inscription" },
        { label: "Mes commandes", href: "/compte" },
        { label: "Suivi de commande", href: "/suivi" },
    ],
    "Informations": [
        { label: "À propos", href: "/about" },
        { label: "Conditions d'utilisation", href: "/cgu" },
        { label: "Confidentialité", href: "/confidentialite" },
        { label: "Contact", href: "/contact" },
    ],
};

export default function Footer({ activePage = "" }) {
    return (
        <footer className="py-16 px-4 md:px-8 border-t" style={{ background: "#0D0D1A", borderColor: "rgba(255,215,0,0.12)" }}>
            <div className="max-w-275 mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
                    <div className="sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-3 mb-5">
                            {/*<div className="w-11 h-11 rounded-full flex items-center justify-center font-black text-body text-neutral-0 shrink-0" style={{ background: "linear-gradient(135deg,#FFD700,#0047AB)", boxShadow: "0 0 16px rgba(255,215,0,0.3)" }}>SD</div>*/}
                            <img
                                src="/logo.png"
                                alt="Souaïbou Distribution"
                                className="w-10 h-10 rounded-full object-cover shrink-0"
                                style={{ boxShadow: "0 0 16px rgba(255,215,0,0.4)" }}
                            />
                            <div>
                                <div className="font-extrabold text-[15px] text-primary-1">Souaïbou Distribution</div>
                                <div className="font-light text-[10px] text-neutral-6 tracking-widest uppercase">Livraison express · Qualité abordable</div>
                            </div>
                        </div>
                        <p className="text-sm text-neutral-6 leading-relaxed mb-6 max-w-70">
                            La plateforme tout-en-un pour vos boissons, location de matériel et services événementiels au Bénin.
                        </p>
                        <div className="flex flex-col gap-2.5">
                            {[["📞", "+229 97 00 00 00"], ["📧", "contact@souaibou-distribution.bj"], ["📍", "Cotonou, Bénin"]].map(([icon, text]) => (
                                <div key={text} className="flex items-center gap-2.5 text-[13px] text-neutral-6"><span>{icon}</span>{text}</div>
                            ))}
                        </div>
                    </div>

                    {Object.entries(LINKS).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="font-bold text-sm text-neutral-0 mb-5 pb-2.5 border-b border-neutral-4">{title}</h4>
                            <div className="flex flex-col gap-2.5">
                                {links.map((link) => {
                                    const isActive = activePage === link.href;
                                    return (
                                        <a
                                            key={link.href} href={link.href}
                                            className={`text-[13px] text-neutral-6 no-underline transition-colors duration-200 hover:text-primary-1 ${isActive && "text-primary-1"}`}
                                        >{link.label}</a>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="h-px bg-neutral-4 mb-7" />

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-[13px] text-neutral-6 text-center sm:text-left">© 2025 Souaïbou Distribution. Tous droits réservés.</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {["MTN MoMo", "Moov Money", "Cash"].map((m) => (
                            <span key={m} className="text-[11px] font-semibold text-neutral-6 px-2.5 py-1 rounded-md border border-neutral-5" style={{ background: "rgba(255,255,255,0.05)" }}>{m}</span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}