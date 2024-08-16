import {useEffect } from "react";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import Blogs from "./components/Blogs";
import AddForm from "./components/AddForm";
import Notification from "./components/Notification";
import { useState } from "react";
import Users from "./components/Users";
import { useDispatch, useSelector } from "react-redux";
import { removeUser,setUser } from "./reducers/userReducer";
import { likeBlog, removeBlog } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { Link, Route,Routes,Navigate, useMatch,useNavigate } from "react-router-dom";
import User from "./components/User";
import Blog from "./components/Blog";

const App = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true);
  const userMatch = useMatch('/users/:id')
  const blogMatch = useMatch ('/blogs/:id')
  const message   = useSelector(state => state.notification)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const allBlogs = useSelector(state =>   state.blogs )
  const blogs = [...allBlogs].sort((a,b) => b-a)
  const userToShow = userMatch ? users.find(user => user.id === userMatch.params.id)
    :null
  const blogToShow = blogMatch ? blogs.find(blog => blog.id === blogMatch.params.id): null
  const handleLogout = () => {
    window.localStorage.clear();
    dispatch(removeUser());
  };

  const handleLikesUpdate =  (id) => {
    const blogToUpdate = blogs.find((blog) => blog.id === id);
    const newObject = {...blogToUpdate, likes: blogToUpdate.likes + 1 };
    try {
       dispatch(likeBlog(newObject))

    } catch (exception) {
  };}

  const handleDelete =  async( id) => {
    const blogToDelete = blogs.find((blog) => blog.id === id);
    try {
      if (
        window.confirm(`remove ${blogToDelete.title} by ${blogToDelete.author}`)
      ) {
        await dispatch(removeBlog(blogToDelete.id))
        navigate('/')

      }
    } catch (exception) {}
  };


  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const userTemp = JSON.parse(loggedUser);
      dispatch(setUser(userTemp))
      blogService.setToken(userTemp.token);
     
    }
    const initializeData = async () => {
      await dispatch(initializeUsers())
      await dispatch(initializeBlogs())
      setLoading(false)
    }
    initializeData()

  }, []);

  const padding = {
    padding : 5
  }
  if (loading) {
    return (<div>Loading...</div>); // or a spinner, etc.
  }
  return (
    <div>
      <h1>BlogApp</h1>
      <Notification message={message} />
      <div>
        <Link style = {padding} to = '/'>blogs </Link>
        <Link style = {padding} to = '/users'>Users</Link>
        <Link style = {padding} to = '/create'>CreateBlog</Link>
        {user ? (
          <><em>{user.name} logged in</em><button onClick={handleLogout}>logout</button></>)
        :<Link style={padding} to ='/login'>Login</Link>
        }
      </div>
      <Routes>
      <Route path = '/' element = {user? <Blogs
        user={user}
        blogs = {blogs}
      /> :<Navigate replace to ='/login'/>} />
        <Route path = '/login' element = {<LoginForm/>}/>
        <Route path = '/blogs/:id' element = {<Blog
          handleLikesUpdate={handleLikesUpdate}
          blog={blogToShow}
          handleDelete={handleDelete}
          user={user}
        />}/>
        <Route path = '/users' element = {user? <Users users ={users}/>:<Navigate replace to ='/login'/>} />
        <Route path ='/users/:id' element = {<User user = {userToShow} />} />
        <Route path = '/create' element = {user? <AddForm /> :<Navigate replace to ='/login'/>} />
      </Routes>

    </div>
  );
};

export default App;
