export const PROFILE = {
  name: 'Federico Rudiero',
  shortName: 'Federico',
  role: 'Full Stack Developer para empresas',
  githubUsername: import.meta.env.VITE_GITHUB_USERNAME || 'federudiero',
  email: 'federudiero@gmail.com',
  whatsappPhone: '5493518120950',
  whatsappDefaultMessage:
    'Hola Federico, vi tu portfolio y quiero contactarte por una oportunidad como Full Stack Developer.',
  linkedinUrl: 'https://www.linkedin.com/in/federico-rudiero',
  githubUrl: 'https://github.com/federudiero',
  location: 'Córdoba, Argentina',
  cvPath: '/cv-federico-rudiero.pdf',
  summary:
    'Soy desarrollador full stack y construyo sistemas web para empresas: frontend, backend, base de datos, integraciones, mantenimiento y evolución de productos en uso real.',
  highlights: [
    'Disponible para empresas',
    'Full stack productivo',
    'React, Node.js y Firebase',
  ],
};

export const HERO_METRICS = [
  {
    value: 'Disponible',
    label: 'para contratación',
    detail: 'Abierto a oportunidades full stack, freelance o incorporación a equipo.',
  },
  {
    value: 'Full stack',
    label: 'perfil técnico',
    detail: 'Frontend, backend, base de datos, APIs, debugging y despliegue.',
  },
  {
    value: 'Producción',
    label: 'experiencia real',
    detail: 'Proyectos usados por usuarios, con soporte, mejoras y correcciones.',
  },
];

export const VALUE_AREAS = [
  {
    title: 'Puedo integrarme a equipos o trabajar proyectos completos',
    description:
      'Puedo sumarme como desarrollador full stack para construir nuevas funcionalidades, mantener sistemas existentes, resolver bugs, integrar APIs o convertir procesos internos en software usable.',
  },
  {
    title: 'Tengo criterio de producto y negocio',
    description:
      'No trabajo solo la pantalla. Entiendo usuarios, roles, datos, validaciones, permisos, performance y el impacto que cada cambio tiene sobre la operación diaria de una empresa.',
  },
  {
    title: 'Priorizo estabilidad, soporte y cambios seguros',
    description:
      'Estoy acostumbrado a depurar causa raíz, mejorar rendimiento, cuidar datos existentes y evolucionar sistemas en producción sin romper la lógica que ya funciona.',
  },
];

export const SPECIALTY_AREAS = [
  {
    title: 'Desarrollo full stack',
    description:
      'Frontend, backend, autenticación, bases de datos, reglas de negocio, APIs, despliegue y mantenimiento.',
  },
  {
    title: 'Sistemas internos de empresa',
    description:
      'CRM, pedidos, administración, stock, reportes, roles, paneles internos y automatización operativa.',
  },
  {
    title: 'Mantenimiento y mejora de software',
    description:
      'Debugging, refactor seguro, rendimiento, responsive, compatibilidad y evolución de productos existentes.',
  },
  {
    title: 'Integraciones y datos',
    description:
      'APIs, webhooks, Firebase, Firestore, Cloud Functions, autenticación, reglas de negocio y trazabilidad.',
  },
];

export const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Entiendo el requerimiento',
    description:
      'Reviso objetivo, usuarios, flujo actual, datos críticos y restricciones técnicas antes de tocar código.',
  },
  {
    step: '02',
    title: 'Desarrollo con criterio',
    description:
      'Trabajo UI, lógica, datos, permisos, validaciones e integraciones con cambios medibles y mantenibles.',
  },
  {
    step: '03',
    title: 'Pruebo casos reales',
    description:
      'Valido responsive, estados, errores, permisos, performance y casos límite antes de considerar cerrado el cambio.',
  },
  {
    step: '04',
    title: 'Mantengo y evoluciono',
    description:
      'Corrijo bugs, agrego mejoras y refactorizo con cuidado para no interrumpir procesos existentes.',
  },
];

export const FEATURED_PROJECTS = [
  {
    id: 'crm-backend',
    eyebrow: 'Caso principal',
    title: 'CRM Backend e Integraciones Empresariales',
    category: 'Backend, APIs y automatización comercial',
    status: 'Producción / evolución activa',
    demoUrl: 'https://crmhogarcril.com/',
    description:
      'Base técnica para que un CRM comercial pueda operar con WhatsApp Business de forma ordenada, trazable y conectada con la administración.',
    problem:
      'El negocio necesitaba transformar conversaciones dispersas en un flujo centralizado: mensajes entrantes, respuestas, medios, vendedores, estados de conexión y datos persistentes para seguimiento comercial.',
    myWork:
      'Trabajé sobre endpoints, webhooks, normalización de mensajes, persistencia en Firestore, estados de conexión, callbacks, validaciones, permisos y manejo de casos límite para mantener la integración estable.',
    impact:
      'La operación puede registrar conversaciones por vendedor, conservar trazabilidad, conectar mensajes con clientes/pedidos y reducir dependencia de controles manuales externos al sistema.',
    role:
      'Backend, integración API, estructura de datos, validaciones y debugging de conexión.',
    indicators: ['Webhooks', 'Mensajes y medios', 'Estados de conexión', 'Persistencia en Firestore'],
    stack: ['Node.js', 'Firebase', 'Cloud Functions', 'Firestore', 'Webhooks', 'REST APIs'],
    languageStats: [
      { name: 'JavaScript', value: 72 },
      { name: 'TypeScript', value: 10 },
      { name: 'JSON', value: 10 },
      { name: 'Firebase Rules', value: 8 },
    ],
    repositoryHints: ['crm', 'backend', 'whatsapp', 'meta', 'functions'],
  },
  {
    id: 'crm-frontend',
    eyebrow: 'Caso principal',
    title: 'CRM Frontend para Equipos Comerciales',
    category: 'Frontend React para operación diaria',
    status: 'Producción / evolución activa',
    demoUrl: 'https://crmhogarcril.com/',
    description:
      'Interfaz operativa para atender conversaciones, consultar clientes, cargar pedidos y trabajar con información comercial desde una misma base.',
    problem:
      'Los equipos comerciales necesitan velocidad y claridad: ver conversaciones, buscar clientes, usar filtros, crear pedidos y seguir estados sin perder información ni depender de múltiples herramientas.',
    myWork:
      'Desarrollé vistas responsive para inbox, chat, filtros, notas internas, adjuntos, creación de pedidos, métricas, estados de conversación y sincronización en tiempo real con Firebase.',
    impact:
      'Reduce carga manual, mejora el seguimiento de la atención y permite que vendedores y administración trabajen con una experiencia consistente desde escritorio o celular.',
    role:
      'Frontend, experiencia mobile, integración con Firebase, performance y flujos de usuario.',
    indicators: ['Inbox comercial', 'Chat y adjuntos', 'Pedidos desde conversación', 'Mobile-first'],
    stack: ['React', 'Vite', 'Firebase Auth', 'Firestore', 'Tailwind', 'DaisyUI'],
    languageStats: [
      { name: 'JavaScript', value: 58 },
      { name: 'JSX / React', value: 24 },
      { name: 'CSS', value: 14 },
      { name: 'HTML', value: 4 },
    ],
    repositoryHints: ['crm', 'frontend', 'whatsapp', 'pedidos'],
  },
  {
    id: 'sistema-pinturas',
    eyebrow: 'Sistema publicado',
    title: 'Sistema Empresarial — Pedidos, Stock y Reparto',
    category: 'Sistema interno de gestión empresarial',
    status: 'Publicado',
    demoUrl: 'https://estilospinturaspedidos.com/',
    description:
      'Sistema operativo para una pinturería, orientado a carga de pedidos, administración, reparto, stock, cierres de caja, reportes y control de productos.',
    problem:
      'La operación necesitaba ordenar pedidos, vendedores, administradores, repartidores, productos, cierres y stock en una herramienta única, reduciendo errores de carga y mejorando el seguimiento diario.',
    myWork:
      'Desarrollé módulos de pedidos, estados, stock, remitos, caja, reportes, roles, rutas, experiencia mobile, control de productos y mejoras de geocodificación para uso operativo.',
    impact:
      'El sistema permite administrar ventas, reparto y control interno desde una plataforma centralizada, con roles diferenciados y acceso práctico para usuarios de oficina y calle.',
    role:
      'Producto full stack, reglas de negocio, UI responsive, datos, reportes y soporte evolutivo.',
    indicators: ['Pedidos', 'Stock', 'Caja y reportes', 'Vendedores/repartidores'],
    stack: ['React', 'Firebase', 'Firestore', 'Roles', 'Reportes', 'Responsive UI'],
    languageStats: [
      { name: 'JavaScript', value: 54 },
      { name: 'JSX / React', value: 26 },
      { name: 'CSS', value: 16 },
      { name: 'HTML', value: 4 },
    ],
    repositoryHints: ['sistemapedidos', 'pinturas', 'pedidos', 'estilos'],
  },
  {
    id: 'sistema-corralon',
    eyebrow: 'Sistema destacado',
    title: 'Sistema Corralón — Producto SaaS / Gestión Comercial',
    category: 'Producto web para operación y logística',
    status: 'En desarrollo / evolución activa',
    demoUrl: 'https://sistemacorralon.com/',
    description:
      'Sistema orientado a corralones y negocios de materiales, pensado para gestionar pedidos, productos, vendedores, repartos, stock, reportes y reglas comerciales del rubro.',
    problem:
      'El rubro trabaja con pedidos por mensajes, planillas, controles manuales y múltiples responsables. El objetivo fue convertir esa operación en un sistema ordenado, escalable y fácil de mantener.',
    myWork:
      'Modelé productos, pedidos, vendedores, entregas, estados, stock, comisiones, reportes y perfiles de usuario, dejando una base preparada para crecer hacia múltiples negocios.',
    impact:
      'Digitaliza procesos comerciales y logísticos, mejora la trazabilidad de ventas/reparto y permite administrar materiales, envíos, cierres y reportes con mayor control.',
    role:
      'Arquitectura funcional, frontend, datos, reglas comerciales, control de stock y evolución multirol.',
    indicators: ['Materiales', 'Reparto', 'Comisiones', 'Reportes operativos'],
    stack: ['React', 'Firebase', 'Firestore', 'JavaScript', 'Control de stock', 'Reportes'],
    languageStats: [
      { name: 'JavaScript', value: 56 },
      { name: 'JSX / React', value: 24 },
      { name: 'CSS', value: 15 },
      { name: 'HTML', value: 5 },
    ],
    repositoryHints: ['sistemacorralon', 'corralon', 'materiales'],
  },
];

export const SKILL_GROUPS = [
  {
    title: 'Frontend',
    description:
      'Interfaces React claras, responsive y preparadas para usuarios reales, paneles internos, formularios complejos y flujos de trabajo.',
    skills: ['React', 'Vite', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tailwind', 'DaisyUI', 'Responsive UI'],
  },
  {
    title: 'Backend y datos',
    description:
      'APIs, reglas de negocio, autenticación, persistencia, validaciones, Cloud Functions y estructura de datos mantenible.',
    skills: ['Node.js', 'APIs REST', 'Firebase', 'Firestore', 'Cloud Functions', 'Auth', 'Modelado de datos'],
  },
  {
    title: 'Integraciones',
    description:
      'Conexión de sistemas externos, WhatsApp Business API, webhooks, eventos, normalización de datos y manejo de estados.',
    skills: ['WhatsApp Business API', 'Webhooks', 'GitHub API', 'Geocodificación', 'Automatización operativa'],
  },
  {
    title: 'Calidad y operación',
    description:
      'Corrección de causa raíz, performance, refactor seguro, deploy, documentación y soporte sobre sistemas en uso.',
    skills: ['Debugging', 'Performance', 'Refactor seguro', 'Git', 'Deploy', 'Documentación', 'Soporte a usuarios'],
  },
];

export const CORE_STACK = SKILL_GROUPS.flatMap((group) => group.skills);
