import { useState, useMemo } from "react";
import { useCart } from "../../context/CartContext.jsx";
import LocationHero from "./LocationHero.jsx";
import LocationGrid from "./LocationGrid.jsx";
import { PRODUCTS } from "./data.js";

const DEFAULT_FILTERS = {
    category: "Tout",
    priceMax: 30000,
    inStock: false,
    livraison: false,
};

const today = new Date().toISOString().split("T")[0];
const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

// ⚠️ Ne pas ajouter Navbar/Footer ici — AppLayout s'en charge.
export default function LocationPage() {
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const [dates, setDates] = useState({ from: today, to: tomorrow });
    const { addToCart } = useCart();

    const nbDays = dates.from && dates.to
        ? Math.max(1, Math.round((new Date(dates.to) - new Date(dates.from)) / 86400000) + 1)
        : 1;

    const filteredProducts = useMemo(() => {
        return PRODUCTS.filter((p) => {
            const q = search.toLowerCase();
            if (q && !p.name.toLowerCase().includes(q) && !p.category.toLowerCase().includes(q) && !p.desc.toLowerCase().includes(q)) return false;
            if (filters.category !== "Tout" && p.category !== filters.category) return false;
            if (p.pricePerDay > filters.priceMax) return false;
            if (filters.inStock && p.stock === 0) return false;
            return true;
        });
    }, [search, filters]);

    return (
        <>
            <LocationHero
                search={search}
                onSearch={setSearch}
                totalResults={filteredProducts.length}
                dates={dates}
                onDatesChange={setDates}
            />
            <LocationGrid
                products={filteredProducts}
                filters={filters}
                onFilterChange={(key, value) => setFilters((f) => ({ ...f, [key]: value }))}
                onFilterReset={() => setFilters(DEFAULT_FILTERS)}
                onAddToCart={addToCart}
                nbDays={nbDays}
            />
        </>
    );
}