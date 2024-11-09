import { fetchData } from '../api.js';

export async function Blog(page = 1) {
  const app = document.getElementById('app');
  app.innerHTML = '<h1>Blog</h1><p>Cargando artículos...</p>';

  const postsPerPage = 10;

  // Inicializar after para la primera página
  let after = null;

  // Si no es la primera página, obtener el endCursor de la página anterior
  if (page > 1) {
    after = localStorage.getItem('endCursor');
  }

  const query = `
    query getPosts($first: Int, $after: String) {
      posts(first: $first, after: $after) {
        nodes {
          id
          title
          slug
          excerpt
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;

  const variables = {
    first: postsPerPage,
    after: after,
  };

  const data = await fetchData(query, variables);

  if (data && data.posts.nodes.length > 0) {
    // Guardar el endCursor para la siguiente página
    localStorage.setItem('endCursor', data.posts.pageInfo.endCursor);

    app.innerHTML = data.posts.nodes.map(post => `
      <div class="responsive class="responsive large-padding">
        <h2><a href="/post/${post.slug}" data-link>${post.title}</a></h2>
        <p>${post.excerpt}</p>
      </div>
 <div class="large-space"></div>
    `).join('');

    // Agregar botones de paginación
    const paginationContainer = document.createElement('div');
    if (page > 1) {
      const prevButton = document.createElement('button');
      prevButton.textContent = 'Anterior';
      prevButton.dataset.page = page - 1;
      prevButton.addEventListener('click', () => {
        Blog(parseInt(prevButton.dataset.page, 10));
      });
      paginationContainer.appendChild(prevButton);
    }
    if (data.posts.pageInfo.hasNextPage) {
      const nextButton = document.createElement('button');
      nextButton.textContent = 'Siguiente';
      nextButton.dataset.page = page + 1;
      nextButton.addEventListener('click', () => {
        Blog(parseInt(nextButton.dataset.page, 10));
      });
      paginationContainer.appendChild(nextButton);
    }
    app.appendChild(paginationContainer);

  } else {
    app.innerHTML = '<p>No hay artículos para mostrar</p>';
  }
}
