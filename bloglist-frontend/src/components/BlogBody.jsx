import CommentForm from "./CommentForm";

const BlogBody = ({ blog, handleLikesUpdate, handleDelete, user }) => {
  const removeB = () => (
    <button
      onClick={() => {
        handleDelete(blog.id);
      }}
    >
      remove{" "}
    </button>
  );


  return (
    <div>
      <div>{blog.url}</div>
      <div>
        <div className="likes">likes {blog.likes}</div>
        <button
          onClick={async () => {
            await handleLikesUpdate(blog.id);
          }}
        >
          like
        </button>
        {user.username === blog.user.username && removeB()}
      </div>
      <div>{blog.user.username}</div>
      <h2>
        Commments
      </h2>
      <CommentForm blog = {blog} />
    
      <ul>
        {blog.comments.map(c => {
            return (<li key = {c}>
            {c}
          </li>)
        })}
      </ul>
    </div>
  );
};
export default BlogBody;
