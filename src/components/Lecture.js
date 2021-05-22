import React,{useState} from 'react'
import './css/lecture.css'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {
 
  
    Link
  } from "react-router-dom";
import axios from '../axios'
import axios1 from 'axios'

import fileDownload from 'js-file-download'
import path from "path"
import LinearProgress from '@material-ui/core/LinearProgress';
function Lecture({chapter,file,file_id,description,id,date}) {

    const [loadingPercent, setLoadingPercent] = useState(0)
const [con,setcon]=useState(false)
const [fff,setfile]=useState()
const [idd,]=useState(id)

const submmit =()=>{
    const dataform =new FormData();

    if(fff){
        dataform.append("files",fff,fff.name)
        dataform.append("subject_content",idd)

        const options={
            onUploadProgress:(progressEvent)=>{
                const {loaded,total}=progressEvent;
                let percent = Math.floor(loaded*100 /total)
                setLoadingPercent(percent);
               
               
               
            }
          
        };
     axios1.post("https://studycontent.herokuapp.com/api/file/",dataform,options)
    .then(()=>{

        setTimeout(()=>{
           setLoadingPercent(0)
           setcon(false)
          if( window.confirm("make a refresh for checking file")){
              window.location.href="/upload"
          }
        },1300)
        document.querySelector(".success").style.display="block";
      
       
    })
    .catch((err)=>{
        window.alert("Some error occured", err.message)
    })

}
}


const onDelete = (id) => {
    if(window.confirm("Are you sure to delete")){
        axios.delete(`/subjectdet/${id}/`).then(()=>{
            window.location.href = "/upload"
        })
        
        .catch(()=>{
            window.confirm("Some error occured")
        })
        
    };
    return 0
}


    return (
       
        <div className="lecture" id={`${id}a`}>
            <p className="heading">{chapter}</p>
            <p className="descp">{description}</p>
                {
                    file.map((a,c)=>(
                <div key={c} className="file_data_2">
                    
                        <div className="p0" >
                            <p>{ path.basename(a).substring(0,40)}</p>
                             <div className="bbb_1">
                                    <button onClick={()=>{
                             if(window.confirm("Are you sure to delete")){
                             axios.delete(`/file/${file_id[file.indexOf(a)]}/`)
                             .then(()=>{
                                 setTimeout(()=>{
                                    window.location.href = "/upload"
                                 },500)
                                
                            })
                             .catch((err)=>{
                                window.alert("Some error occured ",err.message)
                             })
                            
                            }
                           

                        }} >Delete</button>
                         <button onClick={()=>{
                            
                            axios.get(`https://studycontent.herokuapp.com${a}`, {
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
                 <div className="oneline">
                 <input type="file" id="filee" name="file_1" className="file_1" onChange={(e)=>setfile(e.target.files[0])}/>
                <button  className="file_9" onClick={submmit}>SUBMIT</button>

              
             {(loadingPercent>0)?<LinearProgress variant="determinate" value={loadingPercent} />:<></>}
             <p className="success" style={{"color":"green","display":"none","marginLeft":"10px"}}>File Uploaded successfully</p>
           

           </div>:<></>

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
