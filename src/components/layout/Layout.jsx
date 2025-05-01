import { Aside } from "./Aside";
import { LayoutOutlet } from "./Layout.Outlet";
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <div className="flex h-full w-full overflow-x-clip">
        <Aside />
        <LayoutOutlet > 

        <Outlet />
        </LayoutOutlet>
      </div>
    </>
  )
}
