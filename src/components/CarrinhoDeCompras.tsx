import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type Product = {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  available_quantity: number;
  shipping: {
    free_shipping: boolean;
  };
};

type ListProductsProps = {
  listProduct: Product[];
};

const CarrinhoDeCompras = () => {
  const [carrinho, setCarrinho] = useState([] as Product[]);
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('carrinho')) return;
    const carrinho = JSON.parse(localStorage.getItem('carrinho') || '');
    if (!carrinho) return;
    setCarrinho(carrinho);

    const total = carrinho.reduce((acc: number, product: Product) => {
      return acc + product.price;
    }, 0);
    setTotalPrice(total);
  }, []);

  const handleRemove = (id: string) => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho') || '');
    const newCarrinho = carrinho.filter(
      (product: Product) => product.id !== id,
    );
    localStorage.setItem('carrinho', JSON.stringify(newCarrinho));
    setCarrinho(newCarrinho);

    const total = newCarrinho.reduce((acc: number, product: Product) => {
      return acc + product.price;
    }, 0);
    setTotalPrice(total);
  };

  const btnEnd = () => {
    localStorage.removeItem('carrinho');
    setCarrinho([]);
    setTotalPrice(0);
    navigate('/');
  };

  return (
    <div>
      <h1 className='text-center text-xl font-medium'>
        Carrinho ({carrinho.length})
      </h1>
      {!carrinho ? (
        <h1>Carrinho vazio</h1>
      ) : (
        <div className='flex  justify-evenly items-center'>
          {carrinho.map((product: Product) => (
            <div
              className='card w-72 bg-base-100 shadow-xl flex '
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
                <p className='card-title'>{product.title}</p>

                <p className='card-normal'>
                  Quantidade disponivel: {product.available_quantity || ''}
                </p>

                <p>
                  {product.shipping.free_shipping
                    ? 'Frete grátis'
                    : 'Calcule seu frete'}
                </p>
                <p className='card-title'>Preço: R$ {product.price}</p>

                <button
                  onClick={() => {
                    handleRemove(product.id);
                  }}
                  className='btn btn-square'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className='flex m-7 justify-end  mt-8 items-center'>
        <h4 className='mr-6 text-xl font-medium'>
          Preço Total: {totalPrice.toFixed(2)}
        </h4>

        <button
          className='btn mr-6'
          onClick={btnEnd}
        >
          Finalizar Compra
        </button>

        <Link
          className='btn btn-active btn-ghost'
          to='/'
        >
          Voltar
        </Link>
      </div>
    </div>
  );
};

export default CarrinhoDeCompras;
