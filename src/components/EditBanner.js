import React ,{useEffect,useState} from 'react'
import "./css/editbanner.css"
import {
    useParams
   } from "react-router-dom";
import axios from "../axios"
function EditBanner(props) {
    let numm= useParams();

    const [st,setpro]=useState({"subeject":"","semester":"","course":"","batch":""})
    useEffect(()=>{
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }
    
        axios.get(`/contentrestriction/${numm.numm}`,config).then((res_1)=>{
                    setpro(res_1.data)
        })
    },[numm.numm])

console.log(numm.numm)
    return (
      
        <div className="editbanner">
              <div className="banner_1">
                    <div className="prof_details_1">
                        <input defaultValue={props.profo_1[0].name} id="nnn" className="a_1 prof_name_1" />
                        <input defaultValue={props.profo_1[0].position} id="ppp" className="a_1 prof_title_1"/>
                        <input defaultValue={props.profo_1[0].college}  id="cco" className="a_1 college_1" />
                    </div>
                    {(numm.numm!==-1)? 
            <div  className="subjects_det_1">
                  <div className="po">
                        <input type="text" defaultValue={st.subject} id="suv" className="subject_1"/>  

                        <div className="batchdata">
                            <input defaultValue={st.batch} id="btch" type="text" className="s_1" />   
                            <input defaultValue={st.semester} id="ss" type="text" className="s_1" /> 
                            <input defaultValue={st.course} id="cc" type="text" className="s_1" /> 
                        </div>
                     
                             <button className="add_new_2" onClick={()=>{
                                 if(window.confirm("Are you sure you want to delete")){
                                  axios.delete(`/contentrestriction/${numm.numm}`)
                                  .then(()=>{
                                      window.location.href="/upload"
                                  })
                              
                                  .catch((err)=>window.alert("Some error occured",err))
                                }
                             }}>DELETE THE SUBJECT</button>
               
                     </div>
                    
            </div>: <></>
                    
               
                }

            <div className="link_1">
               <a href="/upload">
                    <button onClick={()=>{
                             const config = {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                                    'Accept': 'application/json'
                                }
                            }; 
               var body={
                   "batch":document.querySelector("#btch").value,
                   
                   "course":document.querySelector("#cc").value,
                   "semester":document.querySelector("#ss").value,
                   "subject":document.querySelector("#suv").value,
                   "user":props.proid
                }
                var body_1={
                    "name":document.querySelector("#nnn").value,
                    "position":document.querySelector("#ppp").value,
                    "college":document.querySelector("#cco").value,
                 }
                   console.log(body)
                   axios.put(`/profile/${props.proid}`,JSON.stringify(body_1),config).then((res)=> console.log(""))

                  
               axios.put(`/contentrestriction/${numm.numm}`,JSON.stringify(body),config).then((res)=> console.log(""))
              
                  
   
               }

                        } className="add_new_1">SAVE DATA</button>
                        </a>
             
                
                </div>
            </div>
        </div>
   
    )
}

export default EditBanner
