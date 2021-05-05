import React from 'react'
import "./css/navbar.css"

import { connect } from 'react-redux';

function Navbar({isAuthenticated}) {
    return (
        <div className="navbar" id="toppp">
            
            <p className="title">Content management system</p>
            
           
              {isAuthenticated?
                     <a href="/upload" className=" des">Home</a>:<a href="/" className=" des">Home</a>
                     }

            
              
         


            
        </div>
    )
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });
  
  
export default  connect(mapStateToProps)(Navbar)
