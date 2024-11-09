import { fetchData } from '../api.js';

export async function Post() {
  const app = document.getElementById('app');
  app.innerHTML = '<p>Cargando artículo...</p>';

  // Extraer el slug de la URL
  const slug = window.location.pathname.split('/').pop();

  // Consulta GraphQL para buscar el post por su slug
  const query = `
    {
      postBy(slug: "${slug}") {
        title
        content
      }
    }
  `;

  try {
    const data = await fetchData(query);

    if (data && data.postBy) {
      app.innerHTML = `<h1>${data.postBy.title}</h1><div>${data.postBy.content}</div>`;
    } else {
      app.innerHTML = '<p>Error: No se encontró el post solicitado</p>';
    }
  } catch (error) {
    console.error('Error en Post:', error);
    app.innerHTML = '<p>Error al cargar el artículo</p>';
  }
}
