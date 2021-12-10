import React, { useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import "./Form.css";

const Register = () => {

    const history = useHistory()

    const [ user, setUser] = useState({
        name: "",
        email:"",
        password:"",
        reEnterPassword: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        const { name, email, password, reEnterPassword } = user
        if( name && email && password && (password === reEnterPassword)){
            axios.post("http://localhost:9002/register", user)
            .then( res => {
                alert(res.data.message)

            })
            
        } else {
            alert("invalid input")
        }
        
    }

    return (
        <div className="formSignup">

            {console.log("User", user)}
            <label htmlFor="chk" aria-hidden="true">Sign up</label>
            <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={ handleChange }></input>
            <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={ handleChange }></input>
            <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={ handleChange }></input>
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={ handleChange }></input>
            <button className="loginSignupButton" onClick={register} >Register</button>

        </div> 

    )
}

export default Register