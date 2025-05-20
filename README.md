# Sistema de Gestión de Inventario

Una aplicación moderna y responsiva para la gestión eficiente de inventarios, desarrollada con React, Vite y Tailwind CSS.

---

## Tabla de Contenido

- [Descripción](#descripción)
- [Características Principales](#características-principales)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Requisitos del Sistema](#requisitos-del-sistema)
- [Instalación y Puesta en Marcha](#instalación-y-puesta-en-marcha)
- [Ejemplo de Uso](#ejemplo-de-uso)
- [Scripts Disponibles](#scripts-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Seguridad](#seguridad)
- [Contribución](#contribución)
- [Licencia](#licencia)
- [Soporte](#soporte)
- [Agradecimientos](#agradecimientos)

---

## Descripción

Este sistema permite administrar productos, proveedores, categorías y usuarios de manera sencilla y segura. Incluye control de inventario, gestión de roles y una interfaz intuitiva.

## Características Principales

- **Gestión de Productos**
  - Crear, editar y eliminar productos
  - Asignar productos a categorías y proveedores
  - Control de inventario (cantidad y valor)
- **Gestión de Usuarios**
  - Sistema de roles (administrador y usuario)
  - Control de acceso basado en roles
  - Gestión de estados de usuario (activo/inactivo)
- **Gestión de Proveedores**
  - Registro y edición de proveedores
  - Asociación de productos con proveedores
  - Seguimiento de datos de contacto
- **Gestión de Categorías**
  - Organización flexible de productos por categorías

## Tecnologías Utilizadas

- React `19.0.0`
- Vite `6.3.1`
- Tailwind CSS `4.1.4`
- React Router DOM `7.5.1`
- Axios (peticiones HTTP)
- Sonner (notificaciones)
- Bootstrap Icons (iconografía)

## Requisitos del Sistema

- Node.js (última versión recomendada)
- NPM o Yarn

## Instalación y Puesta en Marcha

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd InventoryUITailwind
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   - Visita [http://localhost:5173](http://localhost:5173) (o el puerto que indique la terminal).

## Ejemplo de Uso

- Accede con un usuario administrador para gestionar productos, usuarios y proveedores.
- Crea una nueva categoría y asigna productos.
- Edita la cantidad de inventario y observa las notificaciones en tiempo real.

## Scripts Disponibles

- `npm run dev` — Inicia el servidor de desarrollo
- `npm run build` — Construye la aplicación para producción
- `npm run preview` — Vista previa de la versión de producción
- `npm run lint` — Ejecuta el linter para verificar el código

## Estructura del Proyecto

- `/src` — Código fuente principal
  - `/components` — Componentes React organizados por funcionalidad
  - `/context` — Contextos de React (autenticación, etc.)
  - `/layout` — Componentes de diseño y estructura

## Seguridad

- Rutas protegidas mediante autenticación
- Control de acceso por roles
- Validación de formularios
- Manejo seguro de sesiones

## Contribución

¿Quieres contribuir? ¡Bienvenido!
1. Haz un fork del repositorio
2. Crea una rama (`git checkout -b feature/NuevaCaracteristica`)
3. Realiza tus cambios y haz commit (`git commit -m 'Agrega nueva característica'`)
4. Haz push a tu rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## Soporte

¿Tienes dudas o sugerencias? Abre un issue en el repositorio o contacta al equipo de desarrollo.

## Agradecimientos

Gracias a todos los colaboradores y a la comunidad de React y Tailwind CSS por sus recursos y soporte.

