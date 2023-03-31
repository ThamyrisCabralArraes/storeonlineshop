import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getCategories,
  getProductById,
  getProductByItem,
  getProductsFromCategoryAndQuery,
} from '../services/api';

const Home = () => {
  const [valor, setValor] = React.useState('');
  const [categories, setCategories] = React.useState([]);
  const [productName, setProductName] = React.useState('');
  const [productId, setProductId] = React.useState('');
  const [searchProduct, setSearchProduct] = React.useState(false);
  const [listProduct, setListProduct] = React.useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      const categorie = await getCategories();
      setCategories(categorie);
    };

    fetchCategories();
  });

  const handleSearch = () => {
    setSearchProduct(true);
  };

  const handleRadio = (name: string, id: string) => {
    setProductName(name);
    setProductId(id);
  };

  useEffect(() => {
    const fetchCategoriesId = async () => {
      const categorie = await getProductsFromCategoryAndQuery(
        productId,
        productName,
      );
      setListProduct(categorie.results);
    };
    fetchCategoriesId();
  }, [productName]);

  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setValor(target.value);
  };

  useEffect(() => {
    console.log(listProduct);
  }, [productName]);

  return (
    <div>
      {categories.map((categorie: { id: string; name: string }) => (
        <div key={categorie.id}>
          <p>
            {' '}
            <input
              type='radio'
              name='categorieProduct'
              value={categorie.name}
              onChange={() => handleRadio(categorie.name, categorie.id)}
            />
            {categorie.name}
          </p>
        </div>
      ))}

      {searchProduct ? (
        <div>
          <p>
            Produto:{' '}
            {listProduct.map(
              (product: { id: string; title: string; thumbnail: string }) => (
                <p key={product.id}>
                  {product.title}
                  <img
                    src={product.thumbnail}
                    alt=''
                  />
                </p>
              ),
            )}
          </p>
        </div>
      ) : (
        'Nenhum produto Listado'
      )}

      <input
        type='text'
        placeholder='digite o produto'
        value={valor}
        onChange={(e) => handleChange(e)}
      />
      <button onClick={handleSearch}>Buscar</button>

      <Link to='/carrinho'>Carrinho de compras</Link>
    </div>
  );
};

export default Home;
