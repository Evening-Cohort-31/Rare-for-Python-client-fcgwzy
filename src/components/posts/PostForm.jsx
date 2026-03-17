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

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader() // FileReader is a built in browser tool that can read files
    reader.onloadend = () => {
        setNewPost((prevState) => ({
            ...prevState,
            image_url: reader.result // replace image_url with the base64 string
        }))
    }
    reader.readAsDataURL(file)
  }

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
    if (!newPost.category_id) {
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
    <section className="section">
        <div className="container">
            <div className="columns is-centered">
                <div className="column is-two-thirds">
                    <form className="box" onSubmit={handleSubmit}>
                        <h2 className="title is-3">Create New Post</h2>

                        <div className="field">
                            <label className="label" htmlFor="title">Title</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={newPost.title}
                                    placeholder="Post title"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label" htmlFor="category_id">Category</label>
                            <div className="control">
                                <div className="select is-fullwidth">
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
                                </div>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label" htmlFor="image_upload">Header Image</label>
                            <div className="control">
                                <div className="file has-name is-fullwidth">
                                    <label className="file-label">
                                        <input
                                            className="file-input"
                                            type="file"
                                            id="image_upload"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                        />
                                        <span className="file-cta">
                                            <span className="file-label">Choose a file…</span>
                                        </span>
                                    </label>
                                </div>
                            </div>
                            {newPost.image_url && (
                                <figure className="image mt-3" style={{ width: "200px" }}>
                                    <img src={newPost.image_url} alt="preview" />
                                </figure>
                            )}
                        </div>

                        <div className="field">
                            <label className="label" htmlFor="content">Content</label>
                            <div className="control">
                                <textarea
                                    className="textarea"
                                    id="content"
                                    name="content"
                                    value={newPost.content}
                                    placeholder="Write your post..."
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        
                        <div className="field mt-5">
                            <div className="control">
                                <button className="button is-success is-fullwidth" type="submit">
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
);
}