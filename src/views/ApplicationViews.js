import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { MyPosts } from "../components/posts/MyPosts"
import { CategoryList } from "../components/categories/categoriesList"
import { CategoryForm } from "../components/categories/newCategoryForm"
import { TagList } from "../components/tag/TagList"
import { TagForm } from "../components/tag/newTagForm"
import { PostDetails } from "../components/posts/Posts"
import { ManageTags } from "../components/tag/ManageTags"
import { PostList } from "../components/posts/PostList"
import { PostForm } from "../components/posts/PostForm"
import { EditTagForm } from "../components/tag/EditTagForm"
import { EditPost } from "../components/posts/EditPosts"
import { EditCategoryForm } from "../components/categories/editCategoryForm"
import { UserList } from "../components/User/userList"
import { UserDetail } from "../components/User/userDetail"
import { UserEditForm } from "../components/User/UserEditForm"
import { MyProfile } from "../components/User/MyProfile"
import { SubscribedPosts } from "../components/posts/SubscribedPosts"  // ⬅️ add this

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />
      <Route element={<Authorized token={token} />}>
        <Route path="/posts" element={<PostList />} />
        <Route path="/" element={<PostList />} />
        <Route path="/myposts" element={<MyPosts token={token} />} />
        <Route path="/subscribed" element={<SubscribedPosts token={token} />} />  {/* ⬅️ add this */}
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/newcategory" element={<CategoryForm />} />
        <Route path="/tags" element={<TagList />} />
        <Route path="/edit-tag/:tagId" element={<EditTagForm />} />
        <Route path="/newtag" element={<TagForm />} />
        <Route path="/posts/:post_id" element={<PostDetails token={token} />} />
        <Route path="/posts/:post_id/edit" element={<EditPost />} />
        <Route path="/posts/:post_id/manage-tags" element={<ManageTags />} />
        <Route path="/posts/new" element={<PostForm token={token} />} />
        <Route path="/categories/:categoryId/edit" element={<EditCategoryForm />} />
        <Route path="/users" element={<UserList token={token} />} />
        <Route path="/users/:userId" element={<UserDetail token={token} />} />
        <Route path="/users/:userId/edit" element={<UserEditForm />} />
        <Route path="/profile" element={<MyProfile token={token} />} />
      </Route>
    </Routes>
  </>
}