import React, {useState} from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import "./Form.css";
const Login = ({updateUser}) => {


    const history = useHistory()

    const [ user, setUser] = useState({
        email:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        axios.post("http://localhost:9002/login", user)
        .then(res => {
            alert(res.data.message)
            updateUser(res.data.user)
            history.push("/")
        })
    }

    return (
        <div className="formLogin">
            <label htmlFor="chk" aria-hidden="true">Login</label>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
            <button className="loginSignupButton" onClick={login}>Login</button>
        </div>
    )
}

export default Login