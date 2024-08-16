
import BlogBody from "./BlogBody";
const Blog = ({ blog, handleLikesUpdate, handleDelete, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  
  const blogBody = () => {
    return (
      <BlogBody
        blog={blog}
        handleLikesUpdate={handleLikesUpdate}
        handleDelete={handleDelete}
        user={user}
      />
    );
  };
  if(!blog){
    return null
  }

  return (
    <div className="blogClass" style={blogStyle}>
      <div className="titleAndAuthor">
        {blog.title} by {blog.author}
      </div>
     <div className="bodyShow">{blogBody()}</div>
    </div>
  );
};

export default Blog;
