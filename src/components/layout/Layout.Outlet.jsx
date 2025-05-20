import { HeaderOutlet } from "./Header.Outlet";
import { SubLayoutOutlet } from "./SubLayout.Outlet";
import { Outlet } from 'react-router-dom';

export const LayoutOutlet = ({ setSidebarOpen }) => {
  return (
    <div className="w-screen flex-1 flex-col gap-y-2 rtl:lg:pl-0 flex lg:pl-[var(--sidebar-width)] rtl:lg:pr-[var(--sidebar-width)]">
      <HeaderOutlet onMenuClick={() => setSidebarOpen(true)} />
      <SubLayoutOutlet>
        <Outlet />
      </SubLayoutOutlet>
    </div>
  )
}

