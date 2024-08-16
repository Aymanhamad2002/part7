import { useState } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { setLoginUser } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const dispatch  = useDispatch()
  const handlePassChange = (event) => {
    setPassword(event.target.value);
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);

  };
  const handleLogin = async(event)=>{
    event.preventDefault()
    const userTemp = { username, password };
    try{
     
      await dispatch(setLoginUser(userTemp))
      navigate('/')
      

    }
    catch (error) {
      dispatch(setNotification("wrong username or password",5))
    }finally{
      setPassword('')
      setUsername('')
      

    }


  }

  return (
    <div className="loginForm">
      <form onSubmit={handleLogin}>
        <div>
          Username:{" "}
          <input
            data-testid="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          Password:{" "}
          <input
            data-testid="password"
            type="password"
            value={password}
            onChange={handlePassChange}
          />
        </div>
        <div>
          <button type="submit ">login</button>
        </div>
      </form>
    </div>
  );
};
export default LoginForm;
