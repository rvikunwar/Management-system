import React, { useState, useEffect } from 'react'
import './css/content.css'
import Data from './Data.js'
import axios from '../axios'

function Content(props) {
    const [data_content, set_content] = useState([])


    const [file_1,setfile_1]=useState([{"file":"null"}])
    useEffect(()=>{
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }
        axios.get("/file/",config).then((res_1)=>{
            if (res_1.data){
                    setfile_1(res_1.data)
            }
             
        })
          
        return () => {
        }
    
    },[])

  useEffect(()=>{
      if(props.subdata===undefined){
        set_content([]) 
      } else{
      
        var main_1=[]
        props.subdata.map((dat)=>{
                if((file_1)!=="null"){
                        dat["file"]=[]
                        dat["file_id"]=[]
                    file_1.map((fi)=>{
                        if(dat["id"]===fi.subject_content){
                            dat["file"].push(fi.files)
                            dat["file_id"].push(fi.id)
                        }
                        
                        return 0
                    })
                }
                main_1.push(dat)
                return 0
            })

            set_content(main_1)
      }
        
  },[props,file_1])

   
    return ( 
    <div className = "content">

        {    props.subdata!==undefined?
           data_content.map((data_1, c) => ( <
                Data key = { c }
                title = { data_1.chapter }
                description = { data_1.description }
                file={data_1.file} file_id={data_1.file_id}
                date={data_1.date}
                id={data_1.id}
                />
            )):
            <>NO DATA</>
        
    }


        </div>
    )
}


export default Content