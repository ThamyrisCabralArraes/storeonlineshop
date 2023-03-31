import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductByItem } from '../services/api';
import Categories from './Categories';
import ListProducts from './ListProducts';

const Home = () => {
  const [valor, setValor] = useState('');
  const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');
  const [searchProduct, setSearchProduct] = useState(false);
  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categorie = await getCategories();
      setCategories(categorie);
    };

    fetchCategories();
  }, []);

  const handleClickSearch = () => {
    fetchCategoriesId();
    setSearchProduct(true);
  };

  const handleRadio = (name: string, id: string) => {
    setProductName(name);
    setProductId(id);
  };

  const fetchCategoriesId = async () => {
    if (!valor) {
      const categorie = await getProductByItem(productName);
      setListProduct(categorie.results);
    } else {
      const categorie = await getProductByItem(valor);
      setListProduct(categorie.results);
    }
  };

  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const value = target.value;
    setValor(value.toLowerCase());
  };

  return (
    <div>
      <input
        type='text'
        placeholder='digite o produto'
        value={valor}
        onChange={(e) => handleChange(e)}
      />
      <button onClick={handleClickSearch}>Buscar</button>

      <Link to='/carrinho'>Carrinho de compras</Link>

      <Categories
        categories={categories}
        handleRadio={handleRadio}
      />

      {searchProduct ? (
        <div>
          <ListProducts listProduct={listProduct} />
        </div>
      ) : (
        'Nenhum produto Listado'
      )}
    </div>
  );
};

export default Home;
