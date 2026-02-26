import React from "react";
import "./App.css"
import moneyList from "./components/MoneyItem";
import {useState} from "react"
import Quiz from "./components/quiz";
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect } from "react";





   

function App(){

    const [item, setItem] = useState(moneyList);

    const [questionNubmer, setQuestionNumber]= useState(0);
    const [timer,setTimer] =useState(30)
    const [earned, setEarned] = useState("$0")
    const [stopTime, setStopTime] = useState(false)

  
       const quit=()=>
        {
          setStopTime(true)
        }
   

        useEffect(() => {
                if (questionNubmer > 0) {
         const found = item.find(m => m.id === questionNubmer);
           if (found) {
              setEarned(found.amount);
              }
            }
              }, [item, questionNubmer]);



    return(
        <div  className="app">
                  
              <div className="Main"> 
                {stopTime?  <h1 className="display"> you earned : {earned} </h1> :
                ( <> 
                <div  className="top">
                  <p className="timer">30</p>
                  
                </div>
                <div className="bottom"><Quiz
                  setquestionNubmer={setQuestionNumber}
                  questionNubmer={questionNubmer}
                  submit={ setStopTime}
                  earned={setEarned}
                  data={item}
                  quit={quit}
                  />
                  </div>
                   </>
                  ) } 
              </div> 
               
               <div  className="pyramid">
                <ul className="moneylist"   >
                 {item.map(m=>  
                   <li className={questionNubmer === m.id ? "moneyListItems active" : "moneyListItems"}> 
                     <span className="moneyListItemNumber">{m.id}</span>
                     <span className="moneyListItemAmount">{m.amount}</span>
                   </li>)}
                </ul>
                
                 </div>
               
        </div>
        
    )

}







export default App;