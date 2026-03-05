import { useState } from "react";

const TESTIMONIALS = [
    { name: "Adjovi Mireille", role: "Organisatrice de mariage", location: "Cotonou", text: "Souaïbou Distribution a géré tout notre mariage : boissons, vaisselle, décoration et traiteur. Un service irréprochable, livré à temps et en parfait état. Je recommande vivement !", stars: 5, tag: "Mariage" },
    { name: "Kokou Mensah", role: "Chef d'entreprise", location: "Parakou", text: "Pour notre soirée d'entreprise, nous avons commandé 50 caisses de boissons et loué tables et chaises. Livraison ponctuelle, personnel professionnel. Excellent rapport qualité-prix.", stars: 5, tag: "Événement entreprise" },
    { name: "Fatoumata Diallo", role: "Maman d'un baptême", location: "Abomey-Calavi", text: "J'ai commandé jus, sodas et toute la vaisselle pour le baptême de mon fils. Tout était parfait. Le suivi en ligne m'a vraiment rassurée. Merci à toute l'équipe !", stars: 5, tag: "Baptême" },
    { name: "Romuald Gbessi", role: "DJ & Animateur", location: "Cotonou", text: "Je travaille régulièrement avec Souaïbou Distribution. Leur service sonorisation + boissons est une combinaison gagnante. Fiables et efficaces.", stars: 5, tag: "Animation" },
];

export default function TestimonialsSection() {
    const [active, setActive] = useState(0);

    return (
        <section className="bg-neutral-0 py-24 px-4 md:px-8">
            <div className="max-w-275 mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-block rounded-full px-5 py-1.5 mb-4 text-[12px] font-semibold tracking-widest uppercase" style={{ background: "rgba(0,128,0,0.08)", border: "1px solid rgba(0,128,0,0.25)", color: "#008000" }}>
                        Témoignages clients
                    </div>
                    <h2 className="font-extrabold text-neutral-9 leading-tight" style={{ fontSize: "clamp(26px,4vw,40px)" }}>
                        Ils nous ont fait <span className="text-primary-1">confiance</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {TESTIMONIALS.map((t, i) => (
                        <div
                            key={i}
                            onClick={() => setActive(i)}
                            className="rounded-2xl p-7 cursor-pointer transition-all duration-300"
                            style={{
                                background: active === i ? "#1A1A2E" : "#F8FAFC",
                                border: `1.5px solid ${active === i ? "rgba(255,215,0,0.25)" : "#f1f5f9"}`,
                                boxShadow: active === i ? "0 20px 48px rgba(0,0,0,0.15)" : "0 2px 8px rgba(0,0,0,0.04)",
                                transform: active === i ? "translateY(-4px)" : "translateY(0)",
                            }}
                        >
                            <div className="flex gap-1 mb-3">
                                {Array.from({ length: t.stars }).map((_, s) => (
                                    <span key={s} className="text-primary-1 text-body">★</span>
                                ))}
                            </div>

                            <span
                                className="text-[10px] font-semibold px-3 py-1 rounded-full tracking-wide uppercase"
                                style={{
                                    background: active === i ? "rgba(255,215,0,0.15)" : "rgba(0,71,171,0.08)",
                                    color: active === i ? "#FFD700" : "#0047AB",
                                    border: `1px solid ${active === i ? "rgba(255,215,0,0.25)" : "rgba(0,71,171,0.15)"}`,
                                }}
                            >
                                {t.tag}
                            </span>

                            <p className="text-sm leading-relaxed my-4" style={{ color: active === i ? "#CBD5E1" : "#64748B" }}>
                                "{t.text}"
                            </p>

                            <div className="flex items-center gap-3 mt-4">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-body text-neutral-0 shrink-0"
                                    style={{ background: "linear-gradient(135deg,#FFD700,#0047AB)" }}
                                >
                                    {t.name[0]}
                                </div>
                                <div>
                                    <div className="font-bold text-sm" style={{ color: active === i ? "#fff" : "#1A1A2E" }}>{t.name}</div>
                                    <div className="text-[12px] text-neutral-6">{t.role} · {t.location}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}