# Sistema de Gestión de Inventario

## Descripción
Este es un sistema de gestión de inventario desarrollado con React y Vite, diseñado para administrar productos, proveedores, categorías y usuarios. La aplicación proporciona una interfaz de usuario moderna y responsiva utilizando Tailwind CSS.

## Características Principales
- Gestión de Productos
  - Crear, editar y eliminar productos
  - Asignar productos a categorías y proveedores
  - Control de inventario (cantidad y valor)

- Gestión de Usuarios
  - Sistema de roles (administrador y usuario)
  - Control de acceso basado en roles
  - Gestión de estados de usuario (activo/inactivo)

- Gestión de Proveedores
  - Registro completo de información de proveedores
  - Asociación de productos con proveedores
  - Seguimiento de datos de contacto

- Gestión de Categorías
  - Organización de productos por categorías
  - Administración flexible de categorías

## Tecnologías Utilizadas
- React 19.0.0
- Vite 6.3.1
- Tailwind CSS 4.1.4
- React Router DOM 7.5.1
- Axios para peticiones HTTP
- Sonner para notificaciones
- Bootstrap Icons para iconografía

## Requisitos del Sistema
- Node.js (versión recomendada: última estable)
- NPM o Yarn como gestor de paquetes

## Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

## Scripts Disponibles
- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Vista previa de la versión de producción
- `npm run lint`: Ejecuta el linter para verificar el código

## Estructura del Proyecto
- `/src`: Código fuente de la aplicación
  - `/components`: Componentes React organizados por funcionalidad
  - `/context`: Contextos de React, incluyendo autenticación
  - `/layout`: Componentes de diseño y estructura

## Características de Seguridad
- Rutas protegidas con autenticación
- Control de acceso basado en roles
- Validación de formularios
- Manejo seguro de sesiones

## Contribución
Para contribuir al proyecto:
1. Crear un fork del repositorio
2. Crear una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Hacer commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia
Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Contacto
Para preguntas o sugerencias, por favor abrir un issue en el repositorio.

        