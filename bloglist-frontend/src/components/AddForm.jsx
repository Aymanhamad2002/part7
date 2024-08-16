import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBlogs } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const AddForm = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch()

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };
  const addBlog = (event) => {
    event.preventDefault();
    const newBlog = { title, url, author };
    try {
      dispatch(addBlogs(newBlog))
      blogFormRef.current.handleVisibility();
      dispatch(setNotification(` a new blog ${newBlog.title} by ${newBlog.author} added `,5))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      setNotification(error.response.data.error,5) 
    }
  };

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          title:{" "}
          <input
            data-testid="title"
            placeholder="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:{" "}
          <input
            data-testid="author"
            placeholder="author"
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:{" "}
          <input
            data-testid="url"
            placeholder="url"
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <div>
          <input type="submit" value="create" />
        </div>
      </form>
    </div>
  );
};
export default AddForm;
