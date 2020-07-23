const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarfull = document.getElementById('progressBarFull');

const loader = document.getElementById('loader');
const game = document.getElementById('game');

let currentQuestion = {};
let acceptingAnswers= false;
let score = 0;
let questionCounter = 0 ;
let availableQuestions = [];

let questions = [];

fetch("questions.json")
.then((res) => {
   return res.json();
})
.then((loadedQuestions) => {
   questions = loadedQuestions;
   startGame();
})
.catch((err) => {
   console.error(err);
});

// CONSTANTS
const CORRECT_BONUS = 10;
const NEG_SCORE = 5;
const MAX_QUESTIONS = 5;

startGame = ()=>{
    questionCounter=0;
    score=0;
    availableQuestions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = ()=>{
   if(availableQuestions.length===0 || questionCounter >= MAX_QUESTIONS)
   {
      localStorage.setItem('mostRecentScore', score);
      return window.location.assign("end.html");
   }
    questionCounter++;
    progressText.innerText ="Question " + questionCounter + '/' + MAX_QUESTIONS;
    // update the progress bar;
    progressBarfull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`;
    
    const questionIndex =  Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
       const number = choice.dataset["number"];
       choice.innerText = currentQuestion["choice" + number];
        
    });
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers= true;
};
choices.forEach( (choice) =>{
   choice.addEventListener('click', (e)=>{
      
      if(!acceptingAnswers){
         return ;
      }
      acceptingAnswers = false;
      const selectedChoice = e.target;
      console.log(selectedChoice);
      
      const selectedAnswer = selectedChoice.dataset["number"];
      
      const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
      if(classToApply === "correct"){
         incrementScore(CORRECT_BONUS);
      }
      else{
         decrementScore(NEG_SCORE);
      }

      
      selectedChoice.parentElement.classList.add(classToApply);
      setTimeout(()=>{
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();  
      }, 1000)
   });
});
incrementScore = (num)=>{
   score +=num;
   scoreText.innerText =  score;
}
decrementScore= (num1)=>{
   score-= num1;
   scoreText.innerText = score;
}

