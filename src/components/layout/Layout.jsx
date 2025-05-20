import { useState } from "react";
import { Aside } from "./Aside";
import { LayoutOutlet } from "./Layout.Outlet";
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex h-full w-full overflow-x-clip">
        <Aside open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col min-h-screen ms-0 sm:lg-[var(--sidebar-width)]">
          <LayoutOutlet sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
            <Outlet />
          </LayoutOutlet>
        </div>
      </div>
    </>
  )
}
