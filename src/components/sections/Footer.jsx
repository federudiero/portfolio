import { PROFILE } from '../../config/profile';

export default function Footer() {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} {PROFILE.name}. Full Stack Developer.</p>
      <a href="#inicio">Volver arriba</a>
    </footer>
  );
}
