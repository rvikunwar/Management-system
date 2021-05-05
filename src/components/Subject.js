import React,{useEffect,useState} from 'react'
import './css/subject.css'
import Content from "./Content.js"
import Navbar from './Navbar.js'
import Banner from './Banner.js'
import Summary from './Summary.js'
import {
   useParams,
  } from "react-router-dom";
import axios from '../axios'

function Subject() {
    let { batch,semester,course,subject } = useParams();
    var body={
        "batch":batch,
        "semester":semester,
        "course":course,
        "subject":subject
    }
  
    var body_1 = JSON.stringify(body);
    
    const [subdata,setSubdata]=useState([])
    const [prof ,setprof]=useState([{"name":" ","position":" ","chapter":" "}])

    useEffect(()=>{
         axios.post("/getdata/",body_1)
         .then((res)=>{
            setprof(res.data[1])
             setSubdata(res.data[0])
         })
         .catch((err)=>console.log(err))
    },[body_1]);

const [mm,setm]=useState()
    useEffect(() => {
        var m=[]
      subdata.map((a)=>{
     
          m.push({"chap":a["chapter"],"id":a["id"]})
          return 0
        })
      setm(m)
    }, [subdata])

    return (
        <div className="subjects">
            <Navbar/>
            <Banner succ profo={prof}/>
                <div className="sub_cont">
                <Summary ss={mm}/>
                <Content subdata={subdata}/>
                </div>
            
        </div>
    )
}

export default Subject
