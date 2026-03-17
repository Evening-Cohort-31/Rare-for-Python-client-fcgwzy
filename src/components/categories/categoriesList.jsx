// Import the CSS

// All other imports:
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getAllCategories,
  deleteCategory,
} from "../../managers/CategoryManager";
import { EditButton } from "../buttons/editButton.jsx";
import { DeleteButton } from "../buttons/deleteButton.jsx";

const initialCategoryState = {
  id: 0,
  label: "",
};

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [refreshLabels, setRefreshLabels] = useState(0);
  const navigate = useNavigate();

  const isAdmin = localStorage.getItem("is_admin") === "1";

  useEffect(() => {
    getAllCategories().then((categoryData) => {
      setCategories(categoryData);
    });
  }, [refreshLabels]);

  const categoryForm = () => {
    navigate("/newcategory");
  };

  const handleDelete = async (categoryId, categoryLabel) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the "${categoryLabel}" category?`,
    );

    if (!confirmed) return;

    try {
      await deleteCategory(categoryId);

      setRefreshLabels((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to delete category", error);
    }
  };
  return (
    <section className="section">
      <div className="container">
        <div className="level">
          <div className="level-left">
            <h2 className="title">Categories</h2>
          </div>
          <div className="level-right">
            <button onClick={categoryForm} className="button is-info">
              Create Category
            </button>
          </div>
        </div>

        <div className="box">
          <table className="table is-fullwidth is-striped is-hoverable">
            <thead>
              <tr>
                <th>Label</th>
                {isAdmin && <th className="has-text-right">Actions</th>}
              </tr>
            </thead>
            <tbody>
                {categories.map((category) => {
                  return (
                    <tr key={`category${category.id}`}>
                      <td className="is-vcentered">
                        <span className="is-size-5">{category.label}</span>
                      </td>
                      <td className="has-text-right">
                        <div className="buttons is-right">
                          <EditButton
                            onClick={() =>
                              navigate(`/categories/${category.id}/edit`)
                            }
                          />
                          <DeleteButton
                            onClick={() =>
                              handleDelete(category.id, category.label)
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}

            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
