import React,{useState,useEffect} from 'react'
import "./css/summary.css"

function Summary(props) {
    const [main_1,setmain_1]=useState([])
    useEffect(()=>{
      if(props.sc){  var main=[]
        var c=0
        props.sc.map((dat_1)=>{
          
                if(dat_1===props.fc_1){
                        
                    main.push(props.chap[c])
                    
                }
               else if(props.fc_1===-1){
                        
                main.push(props.chap[c])
                
            }
     c+=1;
     return 0    
    }
        
        )
        setmain_1(main)
    }
    
    },[props.chap,props.fc_1,props.sc])
    return (
        <div className="summary">
            {
                main_1.map((s,c)=>(
                <a key={c} href={`#${props.di[main_1.indexOf(s)]}a`} className="summ">{s}
                  </a>
             
    ))

    
            }

            {
                (props.ss)?
                props.ss.map((s,c)=>(
                    <a key={c} href={`#${s["id"]}ab`}  className="summ">{s["chap"]}</a>
                )):<></>
            }
        </div>
    )
}

export default Summary
