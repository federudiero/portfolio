# Portfolio Federico Rudiero

Portfolio profesional orientado a empresas, con foco en sistemas internos reales: CRM, pedidos, stock, logística, reportes e integraciones.

## Inicio local

```bash
npm install
npm start
```

Abrir:

```txt
http://localhost:5173
```

## Build de producción

```bash
npm run build
```

Salida:

```txt
dist/
```

## Deploy

Vercel / Netlify:

```txt
Build command: npm run build
Output directory: dist
```

## Configuración principal

Editar datos, proyectos y skills en:

```txt
src/config/profile.js
```

## Proyectos visibles

Solo se muestran los cuatro proyectos con mayor peso profesional:

- CRM Backend e Integraciones
- CRM Frontend Operativo
- Estilos Pinturas — Pedidos, Stock y Reparto
- Sistema Corralón — Gestión Comercial y Logística

Los enlaces a sistemas públicos están cargados en `src/config/profile.js`.

## GitHub API

El portfolio consulta datos públicos de GitHub únicamente para completar enlaces de repositorio y estadísticas de lenguajes cuando encuentra un repositorio asociado. No muestra el listado completo de repositorios y no expone tokens.
