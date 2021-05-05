import React,{useEffect,useState} from 'react'
import "./css/addnew.css"
import { connect } from 'react-redux';

import axios from '../axios'

function Addnew(props) {
    const [id_2,setuser]=useState()
    useEffect(()=>{
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };
        axios.get(`https://studycontent.herokuapp.com/auth/users/me/`, config)
        .then((res)=>{
            setuser(res.data["id"])
        })
           
    },[])


    return ( <div className = "addnew" id="addnew_1" >
                    <div className = "form-style-9" >
                  
                         <p>
                         <input type = "text" id ="bt"
                            name = "field1"
                            className = "field-style field-split align-left"
                            placeholder = "ENTER THE BATCH(2019-2023)" />
                         <input type = "text" id ="sem"
                            name = "field2"
                            className = "field-style field-split align-right"
                            placeholder = "ENTER THE SEMESTER (1,2,3 . . )" />

                         </p> 
                         <p>
                             <input type = "text" id ="cour"
                                     name = "field3"
                                        className = "field-style field-split align-left"
                                        placeholder = "ENTER THE COURSE(CSE,ELECTRONICS . . )" />
                                <input id ="subjj" type = "text"
                                            name = "field4"
                                            className = "field-style field-split align-right"
                                            placeholder = "ENTER THE SUBJECT(EV,ES  . . )" />
                         </p> 
                    
                       
                                <p>
                                <a href="/upload">
                                <input type = "submit"
                                className="submitt"
                                defaultValue = "SUBMIT DATA"
                                onClick={()=>{
               
                                    var body={
                                        "batch":document.querySelector("#bt").value,
                                        "semester":document.querySelector("#sem").value,
                                        "course":document.querySelector("#cour").value,
                                        "subject":document.querySelector("#subjj").value,
                                        "user":id_2,
                                    }
                            var body_1 = JSON.stringify(body);
                        
                                    axios.post("/contentrestriction/",body_1)
                                    .then((res)=> console.log(res))
                                       
                        
                                    } }/>
                                    </a>
                        </p> 
            </div> 
        </div>
    
    )
}

export default connect(null, )(Addnew)