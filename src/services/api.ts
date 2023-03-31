//  Para listar as categorias disponíveis no site
export async function getCategories() {
  const endpoint = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}

// Para listar os produtos de uma categoria específica pelo ID e pelo nome do produto
export async function getProductsFromCategoryAndQuery(
  categoryId: any,
  query: string,
) {
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const response = await fetch(endpoint);
  const data = await response.json();

  return data;
}

//  Para listar os produtos de uma categoria específica pelo ID
export async function getProductById(productId: any) {
  const endpoint = `https://api.mercadolibre.com/items/${productId}`;
  const response = await fetch(endpoint);
  const data = await response.json();

  return data;
}

//  Para listar os produtos de uma categoria específica pelo nome do produto
export async function getProductByItem(query: string) {
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const response = await fetch(endpoint);
  const data = await response.json();

  return data;
}
