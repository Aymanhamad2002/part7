


import { Link } from "react-router-dom";
const Blogs = ({blogs }) => {

  return (
    <div>
      <ul>
      {blogs.map((blog) => (
        <li key ={blog.id}>
          <Link to = {`/blogs/${blog.id}`} >{`${blog.title} is created by ${blog.author}`}</Link>
        </li>
        
      ))}
      </ul>
    </div>
  );
};
export default Blogs;
