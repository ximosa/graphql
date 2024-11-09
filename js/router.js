import { Home } from './views/home.js';
import { About } from './views/about.js';
import { Blog } from './views/blog.js';
import { Post } from './views/post.js';
import { Contacto } from './views/contacto.js';
// Mapa de rutas principales
const routes = {
  '/': Home,
  '/about': About,
  '/blog': Blog,
  '/contacto': Contacto,
};

// Función para navegar a una URL específica sin recargar la página
export function navigateTo(url) {
  history.pushState(null, null, url);
  router();
}

// Función de enrutamiento principal
export function router() {
  const path = window.location.pathname;

  // Detecta la URL de un post específico y carga la vista de Post
  if (path.startsWith('/post/')) {
    Post(); // Llama a la vista de un solo post
    return;
  }

  // Carga la vista correspondiente en base al mapa de rutas
  const view = routes[path] || Home; // Si la ruta no existe, redirige a Home
  document.getElementById('app').innerHTML = '';
  view();
}

// Escucha cambios en el historial para manejar la navegación
window.addEventListener('popstate', router);

