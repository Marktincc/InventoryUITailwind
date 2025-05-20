import { Header } from "./Header";
import { Navbar } from "./Navbar";
export const Aside = ({ open = false, onClose }) => {
    return (
        <aside
            className={`
                w-[var(--sidebar-width)]
                h-screen
                fixed
                inset-y-0
                left-0
                z-20
                flex flex-col
                bg-gray-800 text-white
                transition-transform duration-300
                ${open ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0
            `}
        >
            {/* Botón cerrar solo en móvil */}
            <div className="md:hidden flex justify-end p-2">
                <button
                    onClick={onClose}
                    className="text-gray-300 text-2xl"
                    aria-label="Cerrar menú"
                >
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>
            <Header />
            <Navbar />
        </aside>
    )
}
