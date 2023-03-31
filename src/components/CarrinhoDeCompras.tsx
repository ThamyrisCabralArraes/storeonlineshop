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

  return (
    <div>
      CarrinhoDeCompras
      {carrinho.map((product: Product) => (
        <div
          className='listaProdutos'
          key={product.id}
        >
          <p>{product.title}</p>
          <img
            src={product.thumbnail}
            alt=''
          />
          <p>Quantidade disponivel: {product.available_quantity || ''}</p>
          <p>
            {product.shipping.free_shipping
              ? 'Frete grátis'
              : 'Calcule seu frete'}
          </p>
          <p>Preço: R$ {product.price}</p>

          <button
            onClick={() => {
              handleRemove(product.id);
            }}
          >
            Remover
          </button>
        </div>
      ))}
      <h4>Preço Total: {totalPrice}</h4>
      <button onClick={btnEnd}>Finalizar Compra</button>
      <Link to='/'>Voltar</Link>
    </div>
  );
};

export default CarrinhoDeCompras;
