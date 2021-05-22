import React from 'react'
import './css/newlect.css'
import axios from "../axios"

function Newlect(props) {
   
    return (
        <div className="newlect" id="newlect">

<div className="form-style-9">
                        <ul>
                      
                        <li>
                                <input  id="ch"
                                type="text"
                                name="field3" className="field-style field-full align-none"
                                placeholder="CHAPTER/TOPIC" />
                        </li>
                        <li>
                        <textarea  name="field5" id="des" className="field-style" defaultValue="" placeholder="DESCRIPTION . . ."/>
                        </li>
                        
                       
                        <li>
                           
                        <input type="submit" onClick={()=>{
               var body={
                   "chapter":document.querySelector("#ch").value,
                   "description":document.querySelector("#des").value,
                   "content_details":props.fc
                }
            
                
               axios.post("/subjectdet/",JSON.stringify(body)).then(()=> window.location.href="/upload")
               .catch((err)=>{
                   window.alert("Some error occur",err)
               })
              
                  
   
               }

                        } defaultValue="SAVE "/>
                     
                        </li>
                        </ul>
              </div>
            
        </div>
    )
}

export default Newlect
