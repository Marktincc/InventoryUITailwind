import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Layout } from './components/layout/Layout';
import { AuthProvider } from './context/AuthContext';
import { Login } from './pages/Login';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { UsersPage } from './pages/UsersPage';
import { UserCreate } from './components/users/UserCreate';
import { Useredit } from './components/users/UserEdit';
import { CategoriesPage } from './pages/CategoriesPage';
import { CategoriesCreate } from './components/categories/CategoriesCreate';
import { CategoriesEdit } from './components/categories/CategoriesEdit';
import { ProductsPage } from './pages/ProductsPage';
import { ProductsCreate } from './components/products/ProductsCreate';
import { ProductsEdit } from './components/products/ProductsEdit';
import { SettingsPage } from './pages/SettingsPage';
import { SuppliersPage } from './pages/SuppliersPage';
import { SupplierCreate } from './components/suppliers/SupplierCreate';
import { SupplierEdit } from './components/suppliers/SupplierEdit';
import { InventoryPage } from './pages/InventoryPage';
import { AlertsDashboard } from './components/inventory/AlertsDashboard';
import { SalesPage } from './pages/SalesPage';
import { SaleCreate } from './components/sales/SaleCreate';
import { SaleEdit } from './components/sales/SaleEdit';
import { SalesDashboardPage } from './pages/SalesDashboardPage';

function App() {
  return (
    <>
      <AuthProvider>
        <Toaster position="top-center" richColors closeButton />
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Login />} />
          <Route path="/unauthorized" element={<h1>No tienes permisos para acceder a esta página</h1>} />

          {/* Rutas protegidas para usuarios y administradores */}
          <Route path="/dashboard/*" element={
            <ProtectedRoute
              element={<Layout />}
              allowedRoles={['admin', 'user']}
            />
          }>
            <Route index element={<h1>Dashboard</h1>} />
            <Route path="inventory" element={<InventoryPage />}>
              <Route index element={<h1>Inventario</h1>} />
              <Route path="alerts" element={<AlertsDashboard />} />
              <Route path="reports" element={<h1>Reportes</h1>} />
            </Route>
            <Route path="sales" element={<SalesDashboardPage />} >
              <Route index element={<h1>Ventas</h1>} />
              <Route path="alerts" element={<SaleCreate />} />
              <Route path="reports" element={<SaleEdit />} />

            </Route>
          </Route>

          {/* Rutas solo para administradores */}
          <Route path="/admin/*" element={
            <ProtectedRoute
              element={<Layout />}
              allowedRoles={['admin']}
            />
          }>
            <Route index element={<h1>Panel de Administración</h1>} />
            <Route path="categories" element={<CategoriesPage />}>
              <Route index element={<h1>Categorías</h1>} />
              <Route path="create" element={<CategoriesCreate />} />
              <Route path=":id/edit" element={<CategoriesEdit />} />
            </Route>
            <Route path="users" element={<UsersPage />}>
              <Route index element={<h1>Usuarios</h1>} />
              <Route path="create" element={<UserCreate />} />
              <Route path=":id/edit" element={<Useredit />} />
            </Route>
            <Route path='products' element={<ProductsPage />}>
              <Route index element={<h1>Productos</h1>} />
              <Route path="create" element={<ProductsCreate />} />
              <Route path=":id/edit" element={<ProductsEdit />} />
            </Route>
            <Route path='suppliers' element={<SuppliersPage />}>
              <Route index element={<h1>Productos</h1>} />
              <Route path="create" element={<SupplierCreate />} />
              <Route path=":id/edit" element={<SupplierEdit />} />
            </Route>
            <Route path="sales" element={<SalesPage />} >
              <Route index element={<h1>Ventas</h1>} />
              <Route path="create" element={<SaleCreate />} />
              <Route path=":id/edit" element={<SaleEdit />} />
            </Route>
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          {/* Ruta para capturar todas las demás */}
          <Route path="*" element={<h1>Página no encontrada</h1>} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App


