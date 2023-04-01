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
    <main>
      <section className='flex justify-center m-4'>
        <input
          className='input input-bordered input-warning w-full max-w-xs mb-2'
          type='text'
          placeholder='digite o produto'
          value={valor}
          onChange={(e) => handleChange(e)}
        />
        <button
          className='btn ml-3'
          onClick={handleClickSearch}
        >
          Buscar
        </button>
      </section>
      <div className='flex justify-between '>
        <h1 className='text-2xl font-bold ml-2'>Selecione uma categoria</h1>
        <Link
          className='btn btn-active btn-ghost'
          to='/carrinho'
        >
          Carrinho de compras
        </Link>
      </div>
      <div className='flex '>
        <Categories
          categories={categories}
          handleRadio={handleRadio}
        />
        {searchProduct ? (
          <ListProducts listProduct={listProduct} />
        ) : (
          <h1 className='text-2xl font-bold ml-10'>Nenhum produto Listado</h1>
        )}
      </div>
    </main>
  );
};

export default Home;
