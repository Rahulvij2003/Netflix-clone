import React, {useEffect, useState} from "react"
import "./Login.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"



import logo from '../Assets/nlogo.png'

const Login = ({isLogin,setIsLogin}) => {

    const navigate= useNavigate()
    const [loginUser,setLoginUser]=useState({})
    useEffect(()=>{
        if(isLogin) return navigate('/home')
     },[isLogin])
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
            setIsLogin(true)
            alert(res.data.message)
            setLoginUser(res.data.user)
            navigate("/home")
        })
    }

    return (
        <div className="login">
            <nav>
                <a href="#"><img src={logo} alt="logo"/></a>
            </nav>



            <div class="form-wrapper">
                    <h2>Sign In</h2>
                    <form action="#">
                    <div className="form-control">
                    <input type="text" name="email" value={user.email} onChange={handleChange} ></input>
                    <label htmlFor="">Email</label>
                    </div>
                    <div className="form-control">
                    <input type="password" name="password" value={user.password} onChange={handleChange} />
                    <label htmlFor="">Password</label>
                    </div>
                    <button type="submit" onClick={login}>Sign In</button>
                    <div className="form-help">
                        <div className="remember-me">
                        <input type="checkbox" id="remember-me"/>
                        <label for="remember-me">Remember me</label>
                        </div>
                        <a href="#">Need help?</a>
                    </div>
                    </form>
                    <p>New to Netflix? <a onClick={() => navigate("/register")} href="#">Register now</a></p>
                    <small>
                    This page is protected by Google reCAPTCHA
                    to ensure you're not a bot.
                    <a href="#">Learn more.</a>
                    </small>
            </div>








            {/* <h1>Login</h1>
             <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div className="button" onClick={() => navigate("/register")}>Register</div>  */}
        </div>
    )
}

export default Login