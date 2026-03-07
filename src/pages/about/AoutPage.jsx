import { useEffect, useRef, useState } from "react";

// Hook simple pour détecter quand un élément entre dans le viewport
function useInView(threshold = 0.15) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, inView];
}

// Ne pas ajouter Navbar/Footer ici — AppLayout s'en charge.
export default function AboutPage() {
    return (
        <div className="overflow-x-hidden">
            <AboutHero />
            <StorySection />
            <StatsStrip />
            <ValuesSection />
            <TeamSection />
            <CtaSection />
        </div>
    );
}

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
function AboutHero() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

    return (
        <section
            className="relative pt-28 pb-20 px-4 md:px-8 overflow-hidden"
            style={{ background: "linear-gradient(150deg,#0D0D1A 0%,#1A1A0A 55%,#0D0D1A 100%)" }}
        >
            {/* Orbs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-100 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(ellipse,rgba(255,215,0,0.07) 0%,transparent 70%)", filter: "blur(60px)" }} />
            <div className="absolute bottom-0 right-0 w-75 h-75 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle,rgba(0,128,0,0.08) 0%,transparent 70%)", filter: "blur(40px)" }} />
            {/* Grid */}
            <div className="absolute inset-0 pointer-events-none"
                style={{ backgroundImage: "linear-gradient(rgba(255,215,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,215,0,0.03) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

            <div className="max-w-225 mx-auto relative z-10 text-center">
                {/* Breadcrumb */}
                <div className="flex items-center justify-center gap-2 text-[13px] text-neutral-6 mb-8">
                    <a href="/" className="no-underline text-neutral-6 hover:text-primary-1 transition-colors">Accueil</a>
                    <span>/</span>
                    <span className="text-primary-1 font-semibold">À propos</span>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-[12px] font-semibold tracking-widest uppercase"
                    style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.25)", color: "#FFD700" }}>
                    🇧🇯 Fièrement béninois
                </div>

                <h1
                    className="font-extrabold text-neutral-0 leading-tight mb-6"
                    style={{
                        fontSize: "clamp(32px,5vw,64px)",
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "translateY(0)" : "translateY(20px)",
                        transition: "all 0.6s ease",
                    }}
                >
                    Nous rendons vos{" "}
                    <span className="text-primary-1">événements</span>{" "}
                    inoubliables
                </h1>

                <p
                    className="text-body md:text-h6 text-neutral-6 leading-relaxed max-w-150 mx-auto mb-10"
                    style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "translateY(0)" : "translateY(16px)",
                        transition: "all 0.6s ease 0.15s",
                    }}
                >
                    Souaïbou Distribution est née d'une conviction simple : chaque famille, chaque entrepreneur au Bénin mérite un service de qualité, rapide et abordable pour ses célébrations.
                </p>

                <div
                    className="flex flex-wrap justify-center gap-4"
                    style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.6s ease 0.3s" }}
                >
                    <a href="/boissons"
                        className="font-bold text-[14px] text-neutral-9 no-underline px-8 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                        style={{ background: "linear-gradient(135deg,#FFD700,#E6C200)", boxShadow: "0 4px 20px rgba(255,215,0,0.35)" }}>
                        Découvrir nos services
                    </a>
                    <a href="/contact"
                        className="font-semibold text-[14px] text-neutral-0 no-underline px-8 py-3.5 rounded-xl border border-neutral-5 hover:border-primary-3 hover:text-primary-1 transition-all duration-200">
                        Nous contacter
                    </a>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────
   HISTOIRE
───────────────────────────────────────── */
function StorySection() {
    const [ref, inView] = useInView();

    const MILESTONES = [
        { year: "2019", icon: "🌱", title: "Les débuts", desc: "Souaïbou Adéyèmi commence la vente de boissons en gros depuis son domicile à Cotonou, avec un simple véhicule et une grande ambition." },
        { year: "2021", icon: "📦", title: "Premier entrepôt", desc: "L'activité grandit. Un premier entrepôt de stockage est loué à Akpakpa. L'équipe passe à 5 personnes. La livraison express est lancée." },
        { year: "2022", icon: "🪑", title: "Location matériel", desc: "Face aux demandes répétées de clients organisateurs d'événements, la branche location est créée : chaises, tables, vaisselle, structures." },
        { year: "2023", icon: "🎉", title: "Services événementiels", desc: "Traiteur, décoration, DJ, sonorisation — Souaïbou Distribution devient la solution complète pour les événements au Bénin." },
        { year: "2024", icon: "💻", title: "La plateforme digitale", desc: "Lancement du site et de l'application. Commande en ligne, suivi en temps réel, paiement Mobile Money. Une nouvelle ère commence." },
    ];

    return (
        <section className="px-4 md:px-8 py-20 bg-neutral-3">
            <div className="max-w-275 mx-auto">
                <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Texte gauche */}
                    <div
                        style={{
                            opacity: inView ? 1 : 0,
                            transform: inView ? "translateX(0)" : "translateX(-30px)",
                            transition: "all 0.7s ease",
                        }}
                    >
                        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 text-[12px] font-semibold tracking-widest uppercase"
                            style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.25)", color: "#B89800" }}>
                            📖 Notre histoire
                        </div>
                        <h2 className="font-extrabold text-neutral-9 leading-tight mb-5" style={{ fontSize: "clamp(26px,3.5vw,40px)" }}>
                            De la passion à la{" "}
                            <span className="text-primary-1">référence nationale</span>
                        </h2>
                        <p className="text-[15px] text-neutral-6 leading-relaxed mb-5">
                            Tout a commencé avec une intuition : les Béninois organisent beaucoup d'événements — mariages, baptêmes, anniversaires, cérémonies — et ils méritent un partenaire fiable, tout en un.
                        </p>
                        <p className="text-[15px] text-neutral-6 leading-relaxed">
                            Aujourd'hui, avec plus de <strong className="text-neutral-9">300 événements réalisés</strong> et une équipe de <strong className="text-neutral-9">15 professionnels passionnés</strong>, nous sommes fiers d'être la plateforme événementielle de référence au Bénin.
                        </p>
                    </div>

                    {/* Timeline droite */}
                    <div
                        className="relative"
                        style={{
                            opacity: inView ? 1 : 0,
                            transform: inView ? "translateX(0)" : "translateX(30px)",
                            transition: "all 0.7s ease 0.15s",
                        }}
                    >
                        {/* Ligne verticale */}
                        <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-neutral-4" />

                        <div className="flex flex-col gap-0">
                            {MILESTONES.map((m, i) => (
                                <div key={m.year} className="relative flex gap-5 pb-7 last:pb-0">
                                    {/* Dot */}
                                    <div
                                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-[22px] shrink-0 border-2 bg-neutral-0 z-10"
                                        style={{ borderColor: "rgba(255,215,0,0.4)", boxShadow: "0 2px 12px rgba(255,215,0,0.15)" }}
                                    >
                                        {m.icon}
                                    </div>
                                    <div className="pt-2 flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-extrabold text-[13px] text-primary-1">{m.year}</span>
                                            <span className="font-bold text-[15px] text-neutral-9">{m.title}</span>
                                        </div>
                                        <p className="text-[13px] text-neutral-6 leading-relaxed">{m.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────
   STATS STRIP
───────────────────────────────────────── */
function StatsStrip() {
    const [ref, inView] = useInView();
    const STATS = [
        { value: "300+", label: "Événements réalisés", icon: "🎉" },
        { value: "15", label: "Professionnels", icon: "👥" },
        { value: "98%", label: "Clients satisfaits", icon: "⭐" },
        { value: "5 ans", label: "D'expérience", icon: "🏆" },
        { value: "3", label: "Services disponibles", icon: "🛎️" },
        { value: "24h", label: "Délai de réponse", icon: "⚡" },
    ];

    return (
        <section
            className="px-4 md:px-8 py-16"
            style={{ background: "linear-gradient(135deg,#0D0D1A,#1A2E0D)" }}
        >
            <div ref={ref} className="max-w-275 mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {STATS.map((s, i) => (
                    <div
                        key={s.label}
                        className="text-center"
                        style={{
                            opacity: inView ? 1 : 0,
                            transform: inView ? "translateY(0)" : "translateY(20px)",
                            transition: `all 0.5s ease ${i * 80}ms`,
                        }}
                    >
                        <div className="text-[28px] mb-2">{s.icon}</div>
                        <div className="font-extrabold text-[26px] text-primary-1 leading-none mb-1">{s.value}</div>
                        <div className="text-[12px] text-neutral-6 font-medium leading-snug">{s.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────
   VALEURS
───────────────────────────────────────── */
function ValuesSection() {
    const [ref, inView] = useInView();
    const VALUES = [
        { icon: "🤝", title: "Confiance", color: "#FFD700", desc: "Nous honorons chaque engagement. Votre satisfaction est notre priorité absolue, du premier contact jusqu'à la livraison." },
        { icon: "⚡", title: "Réactivité", color: "#0047AB", desc: "Une commande passée le soir est livrée le lendemain. Nous répondons à chaque demande de devis en moins de 24 heures." },
        { icon: "💎", title: "Qualité", color: "#008000", desc: "Produits soigneusement sélectionnés, matériel entretenu, équipes formées. Nous ne faisons aucun compromis sur la qualité." },
        { icon: "🌍", title: "Ancrage local", color: "#FFD700", desc: "Nous sommes béninois, nous connaissons nos clients, nos fournisseurs, notre territoire. Acheter chez nous, c'est soutenir le local." },
    ];

    return (
        <section className="px-4 md:px-8 py-20 bg-neutral-0">
            <div className="max-w-275 mx-auto">
                <div className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 text-[12px] font-semibold tracking-widest uppercase"
                        style={{ background: "rgba(0,71,171,0.08)", border: "1px solid rgba(0,71,171,0.2)", color: "#0047AB" }}>
                        💡 Nos valeurs
                    </div>
                    <h2 className="font-extrabold text-neutral-9 leading-tight" style={{ fontSize: "clamp(24px,3.5vw,40px)" }}>
                        Ce qui nous guide <span className="text-secondary-1">chaque jour</span>
                    </h2>
                </div>

                <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {VALUES.map((v, i) => (
                        <div
                            key={v.title}
                            className="p-6 rounded-3xl flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1"
                            style={{
                                background: `${v.color}08`,
                                border: `1px solid ${v.color}20`,
                                opacity: inView ? 1 : 0,
                                transform: inView ? "translateY(0)" : "translateY(24px)",
                                transition: `all 0.5s ease ${i * 100}ms`,
                            }}
                        >
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-h4"
                                style={{ background: `${v.color}15`, border: `1px solid ${v.color}25` }}>
                                {v.icon}
                            </div>
                            <h3 className="font-bold text-[17px] text-neutral-9">{v.title}</h3>
                            <p className="text-[13px] text-neutral-6 leading-relaxed grow">{v.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────
   ÉQUIPE
───────────────────────────────────────── */
function TeamSection() {
    const [ref, inView] = useInView();
    const TEAM = [
        { name: "Souaïbou Adéyèmi", role: "Fondateur & CEO", emoji: "👨🏾‍💼", desc: "Visionnaire et entrepreneur, il a fondé SD avec l'ambition de moderniser l'événementiel béninois." },
        { name: "Aïcha Moussa", role: "Directrice des opérations", emoji: "👩🏾‍💼", desc: "Elle coordonne les équipes terrain et garantit la ponctualité de chaque livraison." },
        { name: "Kofi Mensah", role: "Responsable logistique", emoji: "👨🏾‍🔧", desc: "Expert en supply chain, il optimise nos entrepôts et nos routes de livraison." },
        { name: "Fatou Diallo", role: "Chef décoratrice", emoji: "👩🏾‍🎨", desc: "Créative et passionnée, elle transforme chaque salle en décor de rêve." },
    ];

    return (
        <section className="px-4 md:px-8 py-20 bg-neutral-3">
            <div className="max-w-275 mx-auto">
                <div className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 text-[12px] font-semibold tracking-widest uppercase"
                        style={{ background: "rgba(0,128,0,0.08)", border: "1px solid rgba(0,128,0,0.2)", color: "#008000" }}>
                        👥 L'équipe
                    </div>
                    <h2 className="font-extrabold text-neutral-9 leading-tight" style={{ fontSize: "clamp(24px,3.5vw,40px)" }}>
                        Des visages derrière <span className="text-accent-1">chaque sourire</span>
                    </h2>
                    <p className="text-[15px] text-neutral-6 mt-4 max-w-120 mx-auto leading-relaxed">
                        15 professionnels engagés pour que votre événement soit une réussite totale.
                    </p>
                </div>

                <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {TEAM.map((member, i) => (
                        <div
                            key={member.name}
                            className="bg-neutral-0 rounded-3xl overflow-hidden border border-neutral-4 hover:-translate-y-1 transition-all duration-300 group"
                            style={{
                                opacity: inView ? 1 : 0,
                                transform: inView ? "translateY(0)" : "translateY(24px)",
                                transition: `all 0.5s ease ${i * 100}ms`,
                            }}
                        >
                            {/* Avatar zone */}
                            <div className="h-36 flex items-center justify-center relative overflow-hidden"
                                style={{ background: "linear-gradient(135deg,#0D0D1A,#1A2E0D)" }}>
                                <div className="absolute inset-0 opacity-30"
                                    style={{ backgroundImage: "linear-gradient(rgba(255,215,0,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,215,0,0.05) 1px,transparent 1px)", backgroundSize: "30px 30px" }} />
                                <span className="text-[64px] transition-transform duration-300 group-hover:scale-110 relative z-10">
                                    {member.emoji}
                                </span>
                            </div>
                            <div className="p-5">
                                <h3 className="font-bold text-[15px] text-neutral-9">{member.name}</h3>
                                <p className="text-[12px] font-semibold text-primary-1 mt-0.5 mb-3">{member.role}</p>
                                <p className="text-[12px] text-neutral-6 leading-relaxed">{member.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────
   CTA FINAL
───────────────────────────────────────── */
function CtaSection() {
    const [ref, inView] = useInView();
    return (
        <section className="px-4 md:px-8 py-20 bg-neutral-0">
            <div
                ref={ref}
                className="max-w-200 mx-auto text-center rounded-3xl px-8 py-16 relative overflow-hidden"
                style={{
                    background: "linear-gradient(135deg,#0D0D1A,#1A2E0D)",
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(24px)",
                    transition: "all 0.7s ease",
                }}
            >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-56 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(ellipse,rgba(255,215,0,0.08) 0%,transparent 70%)", filter: "blur(30px)" }} />

                <div className="relative z-10">
                    <span className="text-h1 block mb-5">🤝</span>
                    <h2 className="font-extrabold text-neutral-0 leading-tight mb-5" style={{ fontSize: "clamp(24px,3.5vw,40px)" }}>
                        Prêt à organiser votre{" "}
                        <span className="text-primary-1">prochain événement ?</span>
                    </h2>
                    <p className="text-[15px] text-neutral-6 leading-relaxed mb-8 max-w-125 mx-auto">
                        Boissons, matériel, décoration, animation — tout ce dont vous avez besoin, au même endroit, livré chez vous.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="/services"
                            className="font-bold text-[15px] text-neutral-9 no-underline px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                            style={{ background: "linear-gradient(135deg,#FFD700,#E6C200)", boxShadow: "0 4px 20px rgba(255,215,0,0.35)" }}>
                            Demander un devis →
                        </a>
                        <a href="/contact"
                            className="font-semibold text-[15px] text-neutral-0 no-underline px-8 py-4 rounded-xl border border-neutral-5 hover:border-primary-3 hover:text-primary-1 transition-all duration-200">
                            📞 Nous appeler
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}