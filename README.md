# Práctica Spotify Testing

Este proyecto es una implementación completa de una biblioteca musical estilo Spotify desarrollada con Next.js, TypeScript y Redux, incluyendo una suite completa de pruebas unitarias e integración.

## 🚀 Características

- **Frontend moderno**: Next.js 14 con TypeScript
- **Estado global**: Redux para manejo del estado de la biblioteca musical
- **UI Components**: Tailwind CSS + shadcn/ui para una interfaz moderna
- **Testing completo**: 37 pruebas unitarias e integración con Jest y React Testing Library
- **Cobertura de código**: Reportes de cobertura incluidos

## 🧪 Testing

El proyecto incluye una suite completa de pruebas:

- **5 archivos de pruebas** en la carpeta `tests/`
- **37 pruebas totales** cubriendo componentes principales
- **Configuración Jest** optimizada para Next.js
- **React Testing Library** para pruebas de componentes
- **Cobertura de código** con reportes detallados

### Ejecutar pruebas

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas en modo watch
npm run test:watch

# Generar reporte de cobertura
npm run test:coverage
```

## 📁 Estructura del proyecto

```
├── app/                    # Next.js App Router
├── src/
│   ├── components/         # Componentes React
│   └── redux/             # Store y reducers de Redux
├── tests/                 # Archivos de pruebas
│   ├── App.test.js
│   ├── Header.test.js
│   ├── Library.test.js
│   ├── SearchBar.test.js
│   └── SearchResults.test.js
├── components/ui/         # Componentes UI de shadcn
├── jest.config.js         # Configuración de Jest
├── jest.setup.js          # Setup de Jest
└── package.json           # Dependencias y scripts
```

## 🛠️ Tecnologías utilizadas

- **Next.js 14** - Framework React
- **TypeScript** - Tipado estático
- **Redux** - Manejo de estado global
- **Tailwind CSS** - Estilos utilitarios
- **shadcn/ui** - Componentes UI
- **Jest** - Framework de testing
- **React Testing Library** - Testing de componentes React
- **Lucide React** - Iconos

## 🚀 Instalación y uso

1. Clonar el repositorio:
```bash
git clone https://github.com/eosunar/practica-spotify-testing.git
cd practica-spotify-testing
```

2. Instalar dependencias:
```bash
npm install
```

3. Ejecutar en modo desarrollo:
```bash
npm run dev
```

4. Ejecutar pruebas:
```bash
npm test
```

## 📊 Cobertura de pruebas

Las pruebas cubren:
- ✅ Componente principal de la aplicación
- ✅ Header y navegación
- ✅ Biblioteca musical (Library)
- ✅ Barra de búsqueda (SearchBar)
- ✅ Resultados de búsqueda (SearchResults)
- ✅ Integración con Redux
- ✅ Interacciones de usuario
- ✅ Renderizado condicional

## 🎯 Funcionalidades implementadas

- **Búsqueda de canciones**: Interfaz para buscar música
- **Biblioteca personal**: Gestión de canciones favoritas
- **Reproductor**: Controles básicos de reproducción
- **Estado persistente**: Redux para mantener el estado
- **Interfaz responsive**: Diseño adaptable a diferentes pantallas
- **Testing completo**: Cobertura exhaustiva de funcionalidades

---

Desarrollado como práctica de testing en aplicaciones React con Next.js y TypeScript.
