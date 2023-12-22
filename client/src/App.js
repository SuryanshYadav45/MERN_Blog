import React from 'react'
import Navbar from './component/Navbar/Navbar'
import EditBlog from './component/EditBlog/EditBlog'
import Post from './component/Post/Post'
import Register from './component/Register/Register'
import Login from './component/Login/Login'
import { BrowserRouter as Router,Route,Routes} from "react-router-dom";
import CreateBlog from './component/CreateBlog/CreateBlog'
import Home from './pages/home/Home'

const App = () => {
  return (
    <>
    <Router>
      <Navbar/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/editblog/:id' element={<EditBlog/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/createblog' element={<CreateBlog/>}/>
      </Routes>
    </Router>
    
    {/* <Post/> */}
    </>
  )
}

export default App