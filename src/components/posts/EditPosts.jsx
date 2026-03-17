import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CategoriesDropdown } from "../categories/categoriesDropdown";
import { getPostById, updatePost } from "../../managers/PostManager";

export const EditPost = () => {
  const { post_id } = useParams();
  const navigate = useNavigate();

  const [postToEdit, setPostToEdit] = useState({
    title: "",
    image_url: "",
    content: "",
    category_id: 0,
    tags: [],
  });

  useEffect(() => {
    if (!post_id || post_id === "undefined") return;

    getPostById(post_id).then((postObj) => {
      if (postObj) {
        setPostToEdit({
          id: postObj.id,
          title: postObj.title || "",
          image_url: postObj.image_url || "",
          content: postObj.content || "",
          category_id: postObj.category_id || 0,
          tags: postObj.tags || [],
        });
      }
    });
  }, [post_id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPostToEdit({ ...postToEdit, [name]: value });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPostToEdit((prev) => ({ ...prev, image_url: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleCategoryChange = (newCategoryId) => {
    setPostToEdit({ ...postToEdit, category_id: parseInt(newCategoryId) });
  };

  const editExistingPost = async () => {
    const { title, content } = postToEdit;
    if (!title.trim() || !content.trim()) {
      alert("Post must have a title and content.");
      return;
    }

    const finalPostData = { ...postToEdit, id: parseInt(post_id) };
    const response = await updatePost(post_id, finalPostData);

    if (response.ok) {
      alert("Post updated successfully!");
      navigate(`/posts/${post_id}`);
    } else {
      console.error("Failed to update post");
    }
  };

  return (
    <section className="section">
      <div className="container">
        <h2 className="title">Edit Post</h2>

        <div className="box">
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="title"
                value={postToEdit.title}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Header Image</label>
            <div className="control">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
            {postToEdit.image_url && (
              <img
                src={postToEdit.image_url}
                alt="preview"
                className="mt-2"
                style={{ maxHeight: "200px", width: "auto" }}
              />
            )}
          </div>

          <div className="field">
            <label className="label">Content</label>
            <div className="control">
              <textarea
                className="textarea"
                name="content"
                value={postToEdit.content}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Category</label>
            <div className="control">
              <CategoriesDropdown
                name="categories-dropdown"
                value={postToEdit.category_id}
                onChange={handleCategoryChange}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Tags</label>
            {postToEdit.tags?.length > 0 ? (
              <div className="tags">
                {postToEdit.tags.map((tag) => (
                  <span key={tag.id} className="tag is-info is-light">
                    {tag.label}
                  </span>
                ))}
              </div>
            ) : (
              <span className="is-italic has-text-grey">No tags assigned</span>
            )}
            <button
              className="button is-light mt-2"
              type="button"
              onClick={() => navigate(`/posts/${postToEdit.id}/manage-tags`)}
            >
              Manage Tags
            </button>
          </div>

          <div className="buttons mt-5">
            <button className="button is-link" type="button" onClick={editExistingPost}>
              Save
            </button>
            <button className="button is-light" type="button" onClick={() => navigate(`/posts/${post_id}`)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};