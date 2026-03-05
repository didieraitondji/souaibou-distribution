import { useState, useMemo } from "react";
import { useCart } from "../../context/CartContext.jsx";
import BoissonsHero from "./BoissonsHero.jsx";
import BoissonsGrid from "./BoissonsGrid.jsx";
import { PRODUCTS } from "./data.js";

const DEFAULT_FILTERS = {
    category: "Tout",
    brands: [],
    priceMax: 10000,
    promo: false,
    inStock: false,
};

// ⚠️ Ne pas ajouter Navbar/Footer ici — AppLayout s'en charge.
export default function BoissonsPage() {
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const { addToCart } = useCart();

    const filteredProducts = useMemo(() => {
        return PRODUCTS.filter((p) => {
            const q = search.toLowerCase();
            if (q &&
                !p.name.toLowerCase().includes(q) &&
                !p.brand.toLowerCase().includes(q) &&
                !p.category.toLowerCase().includes(q)
            ) return false;
            if (filters.category !== "Tout" && p.category !== filters.category) return false;
            if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) return false;
            const price = p.promo ? Math.round(p.price * (1 - p.promo / 100)) : p.price;
            if (price > filters.priceMax) return false;
            if (filters.promo && !p.promo) return false;
            if (filters.inStock && p.stock === 0) return false;
            return true;
        });
    }, [search, filters]);

    return (
        <>
            <BoissonsHero
                search={search}
                onSearch={setSearch}
                totalResults={filteredProducts.length}
            />
            <BoissonsGrid
                products={filteredProducts}
                filters={filters}
                onFilterChange={(key, value) => setFilters((f) => ({ ...f, [key]: value }))}
                onFilterReset={() => setFilters(DEFAULT_FILTERS)}
                onAddToCart={addToCart}
            />
        </>
    );
}