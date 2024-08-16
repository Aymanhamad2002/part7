import { useState } from "react"
import { useDispatch } from "react-redux"
import { makeComment } from "../reducers/blogReducer"

const CommentForm = ({blog}) => {
    const dispatch = useDispatch()
    const [comment,setComment] = useState('')
    const handleCommentChange = (event) => {
        setComment(event.target.value)
    }
    const createComment =  async () => {
        await dispatch(makeComment(blog.id,comment))
    }
    return (<form onSubmit = {createComment}>
        <input onChange={(handleCommentChange)} value ={comment}/>
        <button type = 'submit'>add comment</button>
    </form>)
}
export default CommentForm