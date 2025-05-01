import { Header } from "./Header";
import { Navbar } from "./Navbar";
export const Aside = () => {
    return (
        <aside className="w-[var(--sidebar-width)] h-screen fixed inset-y-0 left-0 z-20 flex flex-col bg-gray-800 text-white">
            <Header />
            <Navbar />
        </aside>
    )
}
