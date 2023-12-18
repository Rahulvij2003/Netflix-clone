import React, { useEffect, useState } from "react"
import "./Register.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import logo from '../Assets/nlogo.png'

const Register = ({isLogin}) => {

    const navigate= useNavigate()
    useEffect(()=>{
        if(isLogin) return navigate('/home')
     },[isLogin])
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
               
                navigate("/")
            })
        } else {
            alert("invlid input")
        }
        
    }

    return (
        <div className="register">
            <nav>
                <a href="#"><img src={logo} alt="logo"/></a>
            </nav>


            <div className="form-wrapper">
            <h2>Register Now</h2>
                    <form action="#">
                    <div className="form-control">
                    <input type="text" name="name" value={user.name} onChange={ handleChange }></input>
                    <label htmlFor="">Name</label>
                    </div>
                    <div className="form-control">
                    <input type="text" name="email" value={user.email} onChange={ handleChange }></input>
                    <label htmlFor="">Email</label>
                    </div>

                    <div className="form-control">
                    <input type="password" name="password" value={user.password} onChange={ handleChange }></input>
                    <label htmlFor="">Password</label>
                    </div>

                    <div className="form-control">
                    <input type="password" name="reEnterPassword" value={user.reEnterPassword} onChange={ handleChange }></input>
                    <label htmlFor="">Re-Enter Password</label>
                    </div>

                    <button type="submit" onClick={register}>Register</button>
                    <div className="form-help">
                        <div className="remember-me">
                        <input type="checkbox" id="remember-me"/>
                        <label for="remember-me">Remember me</label>
                        </div>
                        <a href="#">Need help?</a>
                    </div>
                    </form>
                    <p>Already having an Account? <a onClick={() => navigate("/")} href="#">Sign In</a></p>
                    <small>
                    This page is protected by Google reCAPTCHA
                    to ensure you're not a bot.
                    <a href="#">Learn more.</a>
                    </small>
            
            </div>



            {/* <h1>Register</h1>
            <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={ handleChange }></input>
            <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={ handleChange }></input>
            <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={ handleChange }></input>
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={ handleChange }></input>
            <div className="button" onClick={register} >Register</div>
            <div>or</div>
            <div className="button" onClick={() => navigate("/")}>Login</div> */}
        </div>
    )
}

export default Register