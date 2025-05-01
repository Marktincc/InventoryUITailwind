import { Outlet } from 'react-router-dom';

export const SubLayoutOutlet = () => {
  return (
    <div className="mx-auto w-full flex-1 px-4 md:px-6 lg:px-8 max-w-7xl">
      <div className="space-y-6">
      <Outlet />
      </div>
    </div>
  )
}
