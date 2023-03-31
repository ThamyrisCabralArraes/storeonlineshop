import React from 'react';

const Home = () => {
  const [valor, setValor] = React.useState('');

  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setValor(target.value);
  };

  return (
    <div>
      <input
        type='text'
        placeholder='digite o produto'
        value={valor}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default Home;
