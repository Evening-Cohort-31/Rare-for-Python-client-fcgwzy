import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CategoriesDropdown } from "../categories/categoriesDropdown";
import { getPostById, updatePost } from "../../managers/PostManager";
import { SaveButton } from "../buttons/saveButton.jsx"

export const EditPost = () => {
  const { post_id } = useParams();
  const [postToEdit, setPostToEdit] = useState({
    title: "",
    image_url: "",
    content: "",
    category_id: 0,
    tags: [],
  });

  const navigate = useNavigate();
  const [refreshPosts, setRefreshPosts] = useState(0);

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
    setPostToEdit({
      ...postToEdit,
      [name]: value,
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()// FileReader is a built in browser tool that can read files
    reader.onloadend = () => {
        setPostToEdit((prevState) => ({
            ...prevState,
            image_url: reader.result
        }))
    }
    reader.readAsDataURL(file)
  }

  const handleCategoryChange = (newCategoryId) => {
    setPostToEdit({
      ...postToEdit,
      category_id: parseInt(newCategoryId),
    });
  };


const editExistingPost = async () => {
  const { title, content } = postToEdit;
  if (!title.trim() || !content.trim()) {
    alert("Post must have a title and content.");
    return;
  }

  <button type="button" onClick={editExistingPost}>Save</button>

  const finalPostData = { ...postToEdit, id: parseInt(post_id) };

    console.log("Data being sent to manager:", finalPostData);

    const response = await updatePost(post_id, finalPostData)

    if (response.ok) {
      alert("Post updated successfully!")
      navigate(`/posts/${post_id}`)
    } else {
      console.error("Failed to update post")
    }
  };

  return (
    <form className="post-edit-form" onSubmit={editExistingPost}>
      <h2>Edit Post</h2>

      <fieldset>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={postToEdit.title}
            onChange={handleInputChange}
            required
          />
        </label>
      </fieldset>

      <fieldset>
        <label>Header Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {postToEdit.image_url && (
          <img src={postToEdit.image_url} alt="preview" style={{ width: "200px" }} />
        )}
      </fieldset>

      <fieldset>
        <label>
          Content:
          <textarea
            name="content"
            value={postToEdit.content}
            onChange={handleInputChange}
            required
          />
        </label>
      </fieldset>

      <fieldset>
        <label>
          Category:
          <CategoriesDropdown
            name="categories-dropdown"
            value={postToEdit.category_id}
            onChange={handleCategoryChange}
          />
        </label>
      </fieldset>

      <div className="tag-section">
        <span>Tags: </span>
        {postToEdit.tags?.length > 0 ? (
          postToEdit.tags.map((tag) => (
            <span key={tag.id} className="tag-badge">
              {tag.label}
            </span>
          ))
        ) : (
          <span>No tags assigned</span>
        )}
        <button
          type="button"
          onClick={() => navigate(`/posts/${postToEdit.id}/manage-tags`)}
        >
          Manage Tags
        </button>
      </div>

      <SaveButton onClick={editExistingPost} />
      <button type="button" onClick={() => navigate(`/posts/${post_id}`)}>
        Cancel
      </button>
    </form>
  );
};