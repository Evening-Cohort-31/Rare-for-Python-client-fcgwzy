// CSS Imports:

// All other Imports:
import { useEffect, useState } from "react";
import { getAllCategories } from "../../managers/CategoryManager";

export const CategoriesDropdown = ({value, onChange}) => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const allCategoriesArray = await getAllCategories();
        setCategory(allCategoriesArray);
      } catch (error) {
        console.error("Failed to fetch categories.", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    const categoryId = parseInt(event.target.value);

    if (onChange) {
      onChange(categoryId);
    }
  };

  return (
    <div>
      <select
        className="wide-dropdown"
        onChange={handleCategoryChange}
        name="categoryId"
        value={value}
      >
        <option value={0} disabled>
          Select a category
        </option>
        {category.map((categoryObject) => {
          return (
            <option key={categoryObject.id} value={categoryObject.id}>
              {categoryObject.category}
            </option>
          );
        })}
      </select>
    </div>
  );
};
