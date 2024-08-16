const User = ({user}) => {
    if(user === null){
        return null
    }
    
    return(<div>
        <h2>{user.username}</h2>
        <ul>
            {user.blogs.map(blog => 
                (<li key ={blog.id}>{blog.title}</li>)
            )}
        </ul>
    </div>)


}
export default User