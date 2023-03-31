import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../services/api';

type Product = {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  warranty: string;
  shipping: {
    free_shipping: boolean;
  };
  available_quantity: number;
};

const Details = () => {
  let { id } = useParams();
  const [product, setProduct] = useState<Product>({} as Product);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await getProductById(id);
      setProduct(response);
    };
    fetchProduct();
  }, []);
  return (
    <div>
      <h3>Detalhes do produto</h3>

      <div key={product.id}>
        <img
          src={product.thumbnail}
          alt={product.title}
        />
        <p>{product.title || ''}</p>
        <p>{product.warranty || ''}</p>
        <p>Quantidade disponivel: {product.available_quantity || ''}</p>
        <p>
          {product.shipping.free_shipping
            ? 'Frete grátis'
            : 'Calcule seu frete'}
        </p>
        <p>Preço: R$ {product.price}</p>
      </div>
      <Link to='/'>Voltar</Link>
    </div>
  );
};

export default Details;
