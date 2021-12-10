import React, {useState} from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import "./Form.css";
const Logout = ({userinfo, updateUserinfo, user, updateUser}) => {

    return ( 
        <button className="loginSignupButton" onClick={() => {updateUser({});}} >Logout</button> 
    )
}

export default Logout