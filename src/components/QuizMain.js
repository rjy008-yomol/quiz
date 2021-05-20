import React,{Component} from "react";
import Answer from "./answer/Answer";
import Question from './question/Question';
import './QuizMain.css';

export default class Quiz extends Component{
    state = {
        questions: {
            1: 'Which of the following is true about React?',
            2: 'Which command is used Install create-react-app?',
            3: 'Does React creates a VIRTUAL DOM in memory?'
        },
        answers: {
            1: {
                1: ' React is a JavaScript library for building user interfaces.',
                2: ' React is used to build single page applications.',
                3: 'React allows us to create reusable UI components.',
                4: 'All of the above.'
            },
            2: {
                1: ' npm install -g create-react-app',
                2: 'npm install create-react-app',
                3: 'npm install -f create-react-app',
                4:  'install -g create-react-app'
            },
            3: {
                1: 'True',
                2: 'False',
                3: 'Can not say',
                4: 'Can be true or false'
            }
        },
        correctAnswers: {
            1: '4',
            2: '2',
            3: '1'
        },
        correctAnswer: 0,
        clickedAnswer: 0,
        step: 1,
        score: 0
    }
    checkAnswer=answer=>{
        const{correctAnswers,step,score}=this.state;
        if(answer === correctAnswers[step]){
            this.setState({
                score:score+1,
                correctAnswer:correctAnswers[step],
                clickedAnswer:answer
            });
        }else{
            this.setState({
                correctAnswer:0,
                clickedAnswer:answer
            });
        }
    }
    nextStep = (step) => {
        this.setState({
            step: step + 1,
            correctAnswer: 0,
            clickedAnswer: 0
        });
    }
    previousStep = (step) => {
        this.setState({
            step: step - 1,
            correctAnswer: 0,
            clickedAnswer:0          

            
        });
        
    }

    retakeQuiz = () => {
        this.setState({
            correctAnswer: 0,
        clickedAnswer: 0,
        step: 1,
        score: 0     

            
        });
        
    }
    render(){
        let {questions,answers,correctAnswer,clickedAnswer,score,step}=this.state;
        return(
            <div className="Content">
             {step <= Object.keys(questions).length ? 
                    (<>
            <Question 
               question={questions[step]}
            />
            <Answer
            answer = {answers[step]}
            step = {step}
            checkAnswer={this.checkAnswer}
            correctAnswer={correctAnswer}
            clickedAnswer={clickedAnswer}
            />
            <button
                        className="NextStep"
                        disabled={
                             step !==1 && Object.keys(questions).length >= step
                            ? false : true
                        }
                        onClick={() => this.previousStep(step)}>Previous</button>
            <button
                        className="NextStep"
                        disabled={
                            Object.keys(questions).length >= step
                            ? false : true
                        }
                        onClick={() => this.nextStep(step)}>Next</button>
                         
                         
                         
                        </>) : (
                        <div className="finalPage">
                            <h1>You have completed the quiz!</h1>
                            <p>Your score is: {score} of {Object.keys(questions).length}</p>
                            <p>Thank you!</p>
                            <button onClick = {()=>this.retakeQuiz()}>Retake Quiz</button>
                        </div>
                         )
                        }
            </div>
           
        );
    }
}