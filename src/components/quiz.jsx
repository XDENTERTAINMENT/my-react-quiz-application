import React, { useState} from 'react'
import question from './Question'

 


function Quiz({ setquestionNubmer,questionNubmer, submit ,earned,data, quit}) {

  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [clickedanswer, setClickedAnswer] = useState("answer");

  const [selectedAnswer, setSelectedAnswer]  = useState(null);

  const currentQuestion = question[currentIndex];


  const resetQuiz =()=>{
    setCurrentIndex(0);
    setClickedAnswer("answer");
    setquestionNubmer(0);
  }

  

  const handleSubmit = (answer) => {

    setSelectedAnswer(answer)
  

    setTimeout(()=>{
         if (answer.correct === true) {

      setquestionNubmer(prev => prev + 1);
     
    }
    else if(answer.correct===false){

      if(questionNubmer ===0)
        {
                  submit(true)       
        }

      else
        {
           setquestionNubmer(prev => Math.max(-1,prev - 1));
        }
    }

    },3050)
    
      setClickedAnswer( answer.correct ? "answer correct" : "answer wrong")
    


      setTimeout(() => 
        {
          
    if (currentIndex < question.length - 1) {
      setCurrentIndex(prev => prev + 1);
     };
        }, 4000)


       

}
 


  return (
    <div className='quiz'>

       <div  className='quit'>
        <button onClick={quit} > Take Profit</button>
      </div>

      <div className='questions'>
        {currentQuestion.question}
      </div>

      <div className="input1">
        {currentQuestion.answer.map((ans, index) => (
          <div
            key={index}
            className={ selectedAnswer===ans? clickedanswer : "answer"}
            onClick={() => handleSubmit(ans)}
          >
            {ans.text}
          </div>
        ))}
       
      </div>
     
         
    </div>
  )
}

export default Quiz;