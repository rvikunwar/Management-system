import React from 'react'
import './css/data.css'
import axios from 'axios'
import fileDownload from 'js-file-download'
import path from "path"
function Data(props) {


    return ( 
        <div className = "data" id={`${props.id}ab`}>
       
        <p className = "heading" > { props.title } </p> 
        <p className = "descp" > { props.description } </p> 
        {
                    props.file.map((a,c)=>(
                <div key={c} className="file_data_22">
                    
                        <div className="p00" >
                            <p>{ path.basename(a)}</p>
                             <div className="bbb_11">
                             
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

        <div className = "extra" >
        <p>UPLOADED ON {props.date} </p>

        </div> </div>
    )
}

export default Data