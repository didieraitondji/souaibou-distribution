import { CartProvider } from "../../context/CartContext.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import CartDrawer from "./CartDrawer.jsx";
import Toast from "./Toast.jsx";

/**
 * AppLayout — wrapper universel à utiliser sur TOUTES les pages.
 *
 * Il monte une seule fois :
 *   - CartProvider  (état global du panier)
 *   - Navbar        (avec lien actif et bouton panier)
 *   - CartDrawer    (panneau panier slide-in)
 *   - Toast         (notification d'ajout au panier)
 *   - Footer        (optionnel)
 *
 * ─────────────────────────────────────────
 * UTILISATION dans App.jsx / Router :
 *
 *   <AppLayout activePage="/boissons" darkNav>
 *     <BoissonsPage />
 *   </AppLayout>
 *
 * ─────────────────────────────────────────
 * Props :
 *   activePage  {string}   href de la page en cours — ex: "/boissons"
 *   darkNav     {boolean}  force la navbar sombre dès le top
 *                          → à mettre sur les pages à fond clair (ex: /panier)
 *                          → ne pas mettre sur les pages qui ont un hero sombre (ex: / et /boissons)
 *   showFooter  {boolean}  afficher le footer (défaut: true)
 *   children    {node}     contenu de la page
 */
export default function AppLayout({
    activePage = "",
    darkNav = false,
    showFooter = true,
    children,
}) {
    return (
        <CartProvider>
            <div className="w-full overflow-x-hidden min-h-screen bg-neutral-2">
                <Navbar activePage={activePage} dark={darkNav} />
                <main>{children}</main>
                {showFooter && <Footer />}
                <CartDrawer />
                <Toast />
            </div>
        </CartProvider>
    );
}