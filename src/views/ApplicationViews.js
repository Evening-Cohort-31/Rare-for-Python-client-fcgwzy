import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { MyPosts } from "../components/posts/MyPosts"
import { CategoryList } from "../components/catergories/categoriesList"
import { CategoryForm } from "../components/catergories/newCategoryForm"


import { PostDetails } from "../components/posts/Posts"
 
export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />
      <Route element={<Authorized token={token} />}>
        <Route path="/myposts" element={<MyPosts token={token} />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/newcategory" element={<CategoryForm />} />
         
        <Route path="/posts/:post_id" element={<PostDetails token={token} />} />
        
      </Route>
    </Routes>
  </>
}
