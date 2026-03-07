// CSS Import:

// All other imports

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CategoriesDropdown } from "../categories/categoriesDropdown";
import { getPostById, updatePost } from "../../managers/PostManager";
import { UpdateButton } from "../buttons/SaveButton";

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
          category_id: postObj.category_id || postObj.category_id || 0,
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

  const handleCategoryChange = (newCategoryId) => {
    setPostToEdit({
      ...postToEdit,
      category_id: parseInt(newCategoryId), // Ensure it's an integer htmlFor the DB
    });
  };

 const editExistingPost = async (e) => {
    e.preventDefault();

    // 1. Validation
    if (!postToEdit.title?.trim() || !postToEdit.content?.trim()) {
      alert("Post must have a title and content.");
      return;
    }

    // 2. Create the final object using the ID from useParams
    const finalPostData = {
      ...postToEdit,
      id: parseInt(post_id) // This turns '2' into 2, or 'undefined' into NaN
    };

    // 3. LOG THIS! If this says NaN or undefined, your useParams is empty
    console.log("Data being sent to manager:", finalPostData);

    try {
      // 4. CRITICAL: Pass finalPostData, NOT postToEdit
      await updatePost(finalPostData);

      alert("Post updated successfully!");
      navigate(`/posts/${post_id}`);
    } catch (error) {
      console.error("Failed to update post:", error);
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
            name="title" // Matches the state key
            value={postToEdit.title || ""}
            onChange={handleInputChange}
            required
          />
        </label>
      </fieldset>

      <fieldset>
        <label>
          Image URL:
          <input
            type="text"
            name="image_url"
            value={postToEdit.image_url}
            onChange={handleInputChange}
          />
        </label>
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

      <UpdateButton onClick={editExistingPost} />
      <button type="button" onClick={() => navigate(`/posts/${post_id}`)}>
        Cancel
      </button>
    </form>
  );
};
