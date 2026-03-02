import React from "react";
import "./App.css"
import moneyList from "./components/MoneyItem";
import {useState} from "react"
import Quiz from "./components/quiz";
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect } from "react";





   

function App(){

    const [item, setItem] = useState(moneyList);
    const [gameStatus , setGameStatus] = useState("playing")
    const [questionNubmer, setQuestionNumber]= useState(0);
    const [timer,setTimer] =useState(30)
    const [earned, setEarned] = useState("$0")
    const [stopTime, setStopTime] = useState(false)

  
       const quit=()=>
        {
          setStopTime(true)
          setGameStatus("quit")
        }
        
        useEffect(()=> 
          {
             if(timer===0){
              setStopTime(true);
               setGameStatus("timeout");
              return;
             }

               const interval =setInterval(()=> 
            {
              setTimer(prev => prev-1)
            },1000);
       
            return ()=> clearInterval(interval);

          },[timer]);

          useEffect(()=>
            {
              setTimer(30);
            },[questionNubmer])


         

        useEffect(() => {
                if (questionNubmer > 0) {
         const found = item.find(m => m.id === questionNubmer);
           if (found) {
              setEarned(found.amount);
              }
            }
              }, [item, questionNubmer]);


              useEffect(() => {
                if (questionNubmer === 12) {
                  setStopTime(true);
                  setGameStatus("won")
         const found = item.find(m => m.id === questionNubmer);
           if (found) {
              setEarned(found.amount);
              }
            }
              }, [item, questionNubmer]);


       

       


    return(
        <div  className="app">
                   
              <div className="Main"> 
                {stopTime? 
                
                   ( 
                   <>

                      {gameStatus === "won"  && ( <h1 className="display">💰🎉 Congratulations! You earned {earned}</h1>)}
                      {gameStatus === "timeout" && ( <h1 className="display">⏱ Time is up! You earned {earned}</h1>)}
                      {gameStatus === "quit" && ( <h1 className="display">🛑 You took the profit: {earned}</h1> )}
                    </>
                     ):(
                      <>
                      <div  className="top">
                  <p className="timer">{timer}</p>
                  <button className="takeProfit"  onClick={ quit} > Take Profit</button>
                </div>
              
                <div className="bottom">
                  <Quiz
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