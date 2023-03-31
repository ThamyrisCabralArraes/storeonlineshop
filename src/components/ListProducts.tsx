import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type Product = {
  id: string;
  title: string;
  thumbnail: string;
};

type ListProductsProps = {
  listProduct: Product[];
};

const ListProducts = ({ listProduct }: ListProductsProps) => {
  const [carrinhoDeCompras, setCarrinhoDeCompras] = useState<Product>(
    {} as Product,
  );

  const handleClickAddShop = (id: string) => {
    const product: Product | undefined = listProduct.find(
      (product) => product.id === id,
    );
    if (!product) return;

    setCarrinhoDeCompras(product);
  };

  return (
    <div>
      {listProduct.map((product: Product) => (
        <div
          key={product.id}
          className='listaProdutos'
        >
          <p>{product.title}</p>
          <img
            src={product.thumbnail}
            alt=''
          />

          <Link to={`/${product.id}`}>Detalhes</Link>
          <button onClick={() => handleClickAddShop(product.id)}>
            adicionar a carrinho
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListProducts;
