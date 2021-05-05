import React,{useState} from 'react'
import './css/lecture.css'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {
 
  
    Link, Redirect
  } from "react-router-dom";
import axios from '../axios'
import fileDownload from 'js-file-download'
import path from "path"

function Lecture({chapter,file,file_id,description,id,date}) {

   const [con,setcon]=useState(false)
const [fff,setfile]=useState()
const [idd,]=useState(id)
const submmit =()=>{
    const dataform =new FormData();
    setcon(false)
   
    if(fff){
        dataform.append("files",fff,fff.name)
        dataform.append("subject_content",idd)
    fetch("https://studycontent.herokuapp.com/api/file/",{method:'POST',body:dataform})
    .then((res)=>{
   
    })
    .catch((err)=>console.log(err))

}
}


const onDelete = (id) => {
    if(window.confirm("Are you sure to delete")){
        axios.delete(`/subjectdet/${id}/`)
        
        .catch((err)=>console.log(err))
        window.location.href = "/upload"
    };
    return 0
}



    return (
       
        <div className="lecture" id={`${id}a`}>
            <p className="heading">{chapter}</p>
            <p className="descp">{description}
                </p>
                {
                    file.map((a,c)=>(
                <div key={c} className="file_data_2">
                    
                        <div className="p0" >
                            <p>{ path.basename(a)}</p>
                             <div className="bbb_1">
                                    <button onClick={()=>{
                             if(window.confirm("Are you sure to delete")){
                             axios.delete(`/file/${file_id[file.indexOf(a)]}/`)
                             .then((res)=>{
                             
                             })
                             .catch((err)=>console.log(err))
                             window.location.href = "/upload"
                            }
                           

                        }} >Delete</button>
                         <button onClick={()=>{
                            
                            axios.get(`http://127.0.0.1:8000${a}`, {
                                responseType: 'blob',
                              })
                            .then((res)=>{
                                fileDownload(res.data,a)
                            })
                            .catch((err)=>console.log(err)) }}>Download</button>
                            </div>
                            </div>
                 
                   
                </div>
                   ))
                    
                }
   
                {(con)?
                 <p className="oneline">
                 <input type="file" id="filee" name="file_1" className="file_1" onChange={(e)=>setfile(e.target.files[0])}/>
                <a href="/upload"> <button  className="file_9" onClick={submmit}>SUBMIT</button></a>
           </p>:<></>

                }
                             
                
                <div className="extra">
                    <p>uploaded on {date}</p>
                    <div className="icons">
                        <Link to={`/upload/edit/${id}/`}>
                             <EditIcon />
                        </Link>
                        <DeleteIcon style={{cursor:"pointer"}} onClick={()=>onDelete(id)}/>
                        <button className="file_8" onClick={()=>{
                            setcon(!con)
                        }}>new file</button>
                        </div>
                </div>
        </div>
    
    )
}

export default Lecture
