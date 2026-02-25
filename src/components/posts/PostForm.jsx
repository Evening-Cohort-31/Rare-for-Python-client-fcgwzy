import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../managers/PostManager";
import { getAllCategories } from "../../managers/CategoryManager";

const initialPostState = {
  title: "",
  content: "",
  category_id: 0,
  image_url: "",
};

export const PostForm = ({ token }) => {
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState(initialPostState);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setNewPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!newPost.title) {
      alert("Please enter a title.");
      return;
    }
    if (!newPost.content) {
      alert("Please enter content.");
      return;
    }
    if (!newPost.category_id || newPost.category_id === 0) {
      alert("Please select a category.");
      return;
    }

const postToSend = {
  ...newPost,
  user_id: token,
  category_id: parseInt(newPost.category_id),
};

    createPost(postToSend).then((createdPost) => {
      navigate(`/posts/${createdPost.id}`);
    });
  };

  return (
    <form className="post-add-form" onSubmit={handleSubmit}>
      <h2>Create New Post</h2>

      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        name="title"
        value={newPost.title}
        placeholder="Post title"
        onChange={handleInputChange}
      />

      <label htmlFor="category_id">Category</label>
      <select
        id="category_id"
        name="category_id"
        value={newPost.category_id}
        onChange={handleInputChange}
      >
        <option value={0}>Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.label}
          </option>
        ))}
      </select>

      <label htmlFor="image_url">Header Image URL (optional)</label>
      <input
        type="text"
        id="image_url"
        name="image_url"
        value={newPost.image_url}
        placeholder="https://..."
        onChange={handleInputChange}
      />

      <label htmlFor="content">Content</label>
      <textarea
        id="content"
        name="content"
        value={newPost.content}
        placeholder="Write your post..."
        onChange={handleInputChange}
      />

      <button type="submit">Save</button>
    </form>
  );
};