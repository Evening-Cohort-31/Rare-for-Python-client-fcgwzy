// CSS Import:

// All other imports

import { useActionState } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialPostState = {
  id: 0,
  title: "",
  publication_date: "",
  image_url: "",
  content: "",
  approved: 1,
  author: "",
  category: "",
};

export const EditPost = () => {
  const navigate = useNavigate();
  const [postToEdit, setPostToEdit] = useState(initialPostState);
  const [refreshPosts, setRefreshPosts] = useState(0);

  const handleTitleChange = (event) => {
    setPostToEdit({
      ...postToEdit,
      postTitle: event.target.value,
    });
  }; 

   const handleImageChange = (event) => {
    setPostToEdit({
      ...postToEdit,
      postImage: event.target.value,
    });
  };

   const handleContentChange = (event) => {
    setPostToEdit({
      ...postToEdit,
      postContent: event.target.value,
    });
  };

  const handleCategoryChange = (event) => {
    setPostToEdit({
      ...postToEdit,
      postCategory: event.target.value,
    });
  };

};
