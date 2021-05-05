import React,{useState} from 'react'
import "./css/login.css"
import {
    Redirect,
  } from "react-router-dom";
import { connect } from 'react-redux';
import { login } from '../actions/auth';
function Login({ login, isAuthenticated }) {
    const [formData, setFormData] = useState({
        email: '',
        username: '' 
    });

    const {username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        login(username, password);
    };

    if (isAuthenticated) {
        return <Redirect to='/upload' />
    }

    return (
      
        <div className="login">

            <div className="form-style-8">
            <h2>Login to your account</h2>
            <form className="form_2" onSubmit={e => onSubmit(e)}>
                <input type="text" name="username" placeholder="Username" defaultValue={username}
                        onChange={e => onChange(e)} required />
                <input type="password" name="password" placeholder="Password"  defaultValue={password}
                        onChange={e => onChange(e)} required/>
               <div className="poo">
                <input type="submit" className="button_1" value="LOGIN" />
              
                <p  className="msg_4">Only ,if you have to upload . . .</p>
                </div>
            </form>
            </div>
                        
        </div>
  
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
