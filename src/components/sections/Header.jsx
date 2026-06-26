import { PROFILE } from '../../config/profile';

const navItems = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Perfil', href: '#perfil' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Stack', href: '#skills' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Ir al inicio">
        FR<span>.</span>
      </a>

      <nav className="site-nav" aria-label="Navegación principal">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <a className="header-action" href="#contacto">
        Contratarme
      </a>
    </header>
  );
}
