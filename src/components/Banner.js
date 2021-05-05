import React, { useState,useEffect } from 'react'
import "./css/banner.css"
import {
    Redirect,
    Link
} from "react-router-dom";

import { connect } from 'react-redux';
import { logout } from '../actions/auth';




function Banner({ logout, isAuthenticated ,profo,sub,succ,fun}) {
   
   
    const [redirect, setRedirect] = useState(false);
  
     
     
    const logout_user = () => {
        logout();
        setRedirect(true);
    };

    const authLinks = () => (

        <button className = "add_new"
        onClick = { logout_user } > Logout </button>

    );
const [num ,setnum]=useState(-1)
    useEffect(()=>{
        if(fun){
    fun(num)
        }
},[num,fun])
    return (

      
        <div className = {`banner ${ succ && 'size'} `} >
           
         
            <div className = "prof_details">
                <p className = "a prof_name" > {profo[0].name} </p> 
                <p className = "a prof_title" > {profo[0].position} </p> 
                <p className = "a college" > {profo[0].college} </p> 
            </div>
           
      
       { (!succ)?<div className = "subjects_det">
       <p  onClick={()=>{
                   setnum(-1)
                }} className = "subject"> ALL </p> 
           {sub.map((dd,c)=>(
                <p key={c} onClick={()=>{
                   setnum(dd.id)
                }} className = "subject"> {dd["subject"]} </p>   


           ))}
                

        </div>:
        <></>
    }
         { (!succ)?
        <div className = "link" >
            <Link to = "/upload/addnew" >
                <button className = "add_new" > Add new subject </button> 
            </Link > 
            <Link to = {`/upload/editbanner/${num}`} >
            <button className = "add_new" > Customize </button> </Link >
        <Link to = "/upload/newtopic" >
                <button className = "add_new" > Add new topic </button>
             </Link > 
        
             {
            isAuthenticated ? authLinks() : < > </>
            } 
            </div>:
            <></>
        } 
            {
            redirect ? <Redirect to = '/' /> : < > </>
            }
         
            </div>  
           
              )
       
    }

    const mapStateToProps = (state)=>({
        isAuthenticated:state.auth.isAuthenticated
    })
    export default connect(mapStateToProps, { logout })(Banner)
