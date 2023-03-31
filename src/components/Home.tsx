import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

const Home = () => {
  const [valor, setValor] = React.useState('');
  const [categories, setCategories] = React.useState([]);

  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setValor(target.value);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const categorie = await getCategories();
      setCategories(categorie);
      console.log(categories);
    };
    fetchCategories();
  });

  return (
    <div>
      {categories.map((categorie: { id: string; name: string }) => (
        <div key={categorie.id}>
          <p>{categorie.name}</p>
        </div>
      ))}
      <input
        type='text'
        placeholder='digite o produto'
        value={valor}
        onChange={(e) => handleChange(e)}
      />

      <Link to='/carrinho'>Carrinho de compras</Link>
    </div>
  );
};

export default Home;
