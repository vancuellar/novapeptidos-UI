import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Enlace del logotipo. Siempre lleva al inicio Y al tope de la página: si ya
// estás en el home, un <Link> a "/" no hace nada por sí solo, así que aquí se
// fuerza el scroll. Lo usan el logo de la barra y el del pie.
const HomeLogoLink = ({ className = '', onClick, children, ...rest }) => {
  const { pathname } = useLocation();

  const handleClick = (e) => {
    if (onClick) onClick(e);
    // Ya en el home: no hay navegación, así que subimos nosotros.
    // En otra página, React Router monta el home arriba de todo.
    if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
    else window.scrollTo({ top: 0 });
  };

  return (
    <Link to="/" className={className} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
};

export default HomeLogoLink;
