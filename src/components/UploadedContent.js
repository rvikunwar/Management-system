import React,{useState,useEffect} from 'react'
import "./css/uploaded_content.css"
import Lecture from './Lecture.js'


function UploadedContent(props) {

    const [main_1,setmain]=useState([])

    
    useEffect(()=>{
        var main=[]
        props.subject.map((dat)=>{
          
                if(dat["content_details"]===props.fc){
                    if((props.files)!=="null"){
                        dat["file"]=[]
                        dat["file_id"]=[]
                    props.files.map((fi)=>{
                        if(dat["id"]===fi.subject_content){
                            dat["file"].push(fi.files)
                            dat["file_id"].push(fi.id)
                        }
                        
                    
                    return 0
                    })
                }
                main.push(dat)
                 }
                 else if(props.fc===-1){
                    dat["file"]=[]
                    dat["file_id"]=[]
                props.files.map((fi)=>{
                    if(dat["id"]===fi.subject_content){
                        dat["file"].push(fi.files)
                        dat["file_id"].push(fi.id)
                    }
                    
                    return 0
                })
                main.push(dat)    
            }
             
              
return 0
        }
        
        )
        setmain(main.reverse())
    },[props.subject,props.fc,props.files])
    return (
        <div className="uploaded_content_2">
           { main_1.map((datt,c)=>(
                    <Lecture key={c} id={datt.id} date={datt.date} chapter={datt.chapter} file={datt.file} file_id={datt.file_id} description={datt.description} />
           ))
        }
          
        </div>
    )
}

export default UploadedContent
