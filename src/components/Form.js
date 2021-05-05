import React,{useState,useEffect} from 'react'
import "./css/form.css"
import {
   
    Link
  } from "react-router-dom";

  

function Form() {

    const [batchData,setBatchData]=useState([])
    const [change,setchange]=useState(1)
  


    useEffect(() => {
      let work =true

      if( work){
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }; 
        
      
         
           fetch("https://studycontent.herokuapp.com/api/",config).then((response)=> response.json() )
           .then(data => setBatchData(data));


    }
return ()=>{
work=false
}

    },[]);

    function unique(bat){
        var b=bat
        var d=true
        var e=[]
        bat.map((a)=>{
            var c=0
             for(let i=0; i<bat.length;i++) {
               
                   if(a===b[i]){
                     
                       if(c===1){
                        d=false
                       }
                       c=1
                   }
                 
               }
               
               (d)?e.push(a):console.log()
               d=true
               return 0
        })
    return e    
    }

    const [batches,setbatch]=useState([])
    const [course,setcourse]=useState([])
    const [semester,setsemester]=useState([])
    const [subject,setsubject]=useState([])
    useEffect(()=>{
        let work_1 =true

        if( work_1){
        var batches=[]
        var course=[]
        var semester=[]
        var subject=[]
        batchData.map((dataBreak)=>{
        batches.push(dataBreak["batch"])
        course.push(dataBreak["course"])
        semester.push(dataBreak["semester"])
        subject.push(dataBreak["subject"])

        return 0
    })
 
    setbatch(unique(batches))
    setcourse(unique(course))

    setsemester(unique(semester))

    setsubject(unique(subject))
    setchange((change)=>change+1)}

return () => {
    work_1=false
}
},[batchData])
    

   
    const [dataPost,setdataPost]=useState({})
    
  useEffect(()=>{
    let work_3 =true

    if( work_3){
    
    var data_Post
   

    try{
        data_Post={
            "batchP":document.querySelector("#batch").value,
            "semesterP":document.querySelector("#sem").value,
        
        "courseP":document.querySelector("#course").value,
       
        "subjectP":document.querySelector("#subject").value
        }
       setdataPost(data_Post)
       
    }catch(error){
       console.log(error)
   }
}
   return () => {
    work_3=false
}

  },[change])
        
   




    return (
        <div className="form">

        <h2>CHECK YOUR STUDY MATERIAL</h2>
            <form className="form_data">
                <div className="field">
                    <label htmlFor="batch">Batch</label>
                    <select className="dropdown" 
                        id="batch" name="batch_"
                        onChange={()=>{
                            setchange(change+1)
                        }}
                       >
                   
                    { batches.map((data_1,count)=>(
                            <option key={count} defaultValue={data_1}>{data_1}</option>
                        ))
                    }
                            
                    </select>
                </div>
                <div className="field">
                    <label htmlFor="course">Course</label>
                    <select className="dropdown" id="course" name="course_"
                    onChange={()=>{
                        setchange(change+1)
                    }}
                    >
                    {
                    course.map((data_1,count)=>(
                            <option  key={count} defaultValue={data_1}>{data_1}</option>
                        ))
                    }
                    </select>
                </div>
               
                <div className="field">
                    <label htmlFor="sem">Semester</label>
                    <select  className="dropdown" id="sem" name="sem_"
                    onChange={()=>{
                        setchange(change+1)
                    }}
                     >
                    { semester.map((data_1,count)=>(
                            <option key={count} defaultValue={data_1}>{data_1}</option>
                        ))
                    }
                    </select>
                </div>

                <div className="field">
                    <label htmlFor="subject">Subject</label>
                    <select className="dropdown" id="subject" name="subject_"
                    onChange={()=>{
                        setchange(change+1)
                    }}
                    >
                    { subject.map((data_1,count)=>(
                            <option key={count} defaultValue={data_1}>{data_1}</option>
                        ))
                    }
                    </select>
                </div>
               
                
               <div className="lp">
                <Link to={`/subject/${dataPost.batchP}/${dataPost.semesterP}/${dataPost.courseP}/${dataPost.subjectP}/`}>
                
                     <input className="button" type="button"  value="SUBMIT" />
                </Link>
                <input className="msg_3" defaultValue=" Check your study material . . ." />
               </div>
        
            </form>
         
 
            
        </div>
    )
}

export default Form
