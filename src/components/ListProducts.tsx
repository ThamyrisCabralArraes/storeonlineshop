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
    if (localStorage.getItem('carrinho')) {
      const carrinho = JSON.parse(localStorage.getItem('carrinho') || '');
      carrinho.push(product);
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
    } else {
      localStorage.setItem('carrinho', JSON.stringify([product]));
    }
  };
  return (
    <section className='flex flex-wrap w-3/4 gap-2 justify-between'>
      {listProduct.map((product: Product) => (
        <div
          className='card w-72 bg-base-100 shadow-xl'
          key={product.id}
        >
          <figure className='px-10 pt-10'>
            <img
              className='rounded-xl'
              src={product.thumbnail}
              alt=''
            />
          </figure>

          <div className='card-body items-center justify-between text-center'>
            <h1 className='card-title'>{product.title}</h1>

            <Link
              className='btn btn-active btn-ghost'
              to={`/${product.id}`}
            >
              Detalhes
            </Link>
            <button
              className='btn'
              onClick={() => handleClickAddShop(product.id)}
            >
              adicionar a carrinho
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ListProducts;
