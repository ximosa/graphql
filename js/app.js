import { Home } from './views/home.js';
import { About } from './views/about.js';
import { Blog } from './views/blog.js';
import { Post } from './views/post.js';
import { Contacto } from './views/contacto.js';

const routes = {
  '/': Home,
  '/about': About,
  '/blog': Blog,
  '/contacto': Contacto,
};

function router() {
  const appContainer = document.getElementById('app');
  const path = window.location.pathname;

  // Buscar coincidencia exacta en el mapa de rutas
  if (routes[path]) {
    routes[path]();
  } else if (path.startsWith('/post/') && path.split('/').length === 3) {
    // Extraer el slug del post de la URL
    const slug = path.split('/')[2];
    Post(slug); 
  } else {
    // Ruta no encontrada
    appContainer.innerHTML = '<h1>Página no encontrada</h1>';
  }
}

// Manejar clics en enlaces
document.addEventListener('click', (event) => {
  if (event.target.matches('[data-link]')) {
    event.preventDefault();
    const url = event.target.getAttribute('href');

    // Actualizar la URL sin recargar la página
    window.history.pushState({}, '', url);

    // Llamar al router para manejar la nueva URL
    router();
  }
});

// Ejecutar el router al cargar la página y al navegar por el historial
window.addEventListener('DOMContentLoaded', router);
window.addEventListener('popstate', router);

