type Category = {
  id: string;
  name: string;
};

type CategoriesProps = {
  categories: Category[];
  handleRadio: (name: string, id: string) => void;
};

const Categories = ({ categories, handleRadio }: CategoriesProps) => {
  return (
    <div>
      {categories.map((categorie: { id: string; name: string }) => (
        <div key={categorie.id}>
          <p>
            {' '}
            <input
              type='radio'
              name='categorieProduct'
              value={categorie.name}
              onChange={() => handleRadio(categorie.name, categorie.id)}
            />
            {categorie.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Categories;
