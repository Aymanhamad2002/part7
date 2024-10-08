import { Link } from "react-router-dom"

const Users = ({users}) => {

    return(<div>
        <h2>Users</h2>
        <table>
            <tbody>
            <tr>
                <td>name</td>
                <td>blogs created</td>
            </tr>
        {users.map(user => {

            return (<tr key = {user.id}>
            <td ><Link to ={`/users/${user.id}`}>
            {user.name}
            </Link>
            </td>
            <td>{user.blogs.length}</td>
            </tr>)
        })}
        </tbody>
        </table>
    </div>)
}
export default Users