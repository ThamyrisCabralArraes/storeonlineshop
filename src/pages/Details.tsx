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
  pictures: [
    {
      url: string;
    },
  ];
};

const Details = () => {
  let { id } = useParams();
  const [product, setProduct] = useState<Product>({
    shipping: {
      free_shipping: false,
    },
    pictures: [
      {
        url: '',
      },
    ],
  } as Product);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await getProductById(id);
      setProduct(response);
      console.log(response);
    };
    fetchProduct();
  }, []);

  return (
    <>
      <div className='flex flex-row justify-end'>
        <Link
          className='btn'
          to='/'
        >
          Voltar
        </Link>
        <Link
          className='btn btn-active btn-ghost ml-6'
          to='/carrinho'
        >
          Carrinho de compras
        </Link>
      </div>

      <div className='flex flex-col  justify-center items-center'>
        <h1 className='card-title'>{product.title}</h1>

        <div className='card w-96 bg-base-100 shadow-xl m-6 flex text-center'>
          <div className='carousel carousel-center p-4 space-x-4 bg-neutral rounded-box'>
            {product.pictures.map((picture) => (
              <div className='carousel-item w-64'>
                <img
                  key={picture.url}
                  className='rounded-box'
                  src={picture.url}
                  alt={product.title}
                />
              </div>
            ))}
          </div>

          <p>{product.warranty}</p>
          <p>Quantidade disponivel: {product.available_quantity}</p>
          <p>
            {product.shipping.free_shipping
              ? 'Frete grátis'
              : 'Calcule seu frete'}
          </p>
          <p className='card-title p-5 mx-auto'>Preço: R$ {product.price}</p>
        </div>
      </div>
    </>
  );
};

export default Details;
