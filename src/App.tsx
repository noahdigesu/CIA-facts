import {useState} from 'react'
import {useHotkeys} from 'react-hotkeys-hook'

import './App.scss'

import Title from './components/Title.tsx'
import Starred from './components/buttons/Starred.tsx'

import questions from '../public/q-a.json';
import Feedback from "./components/buttons/Feedback.tsx";

function App() {
    const enum QUESTION_TYPE {
        question = "question",
        answer = "answer"
    }

    const [questionNumber, setQuestionNumber] = useState(0);
    const [type, setType] = useState(QUESTION_TYPE.question);
    const [starredQuestions, setStarredQuestions] = useState([]);
    const [passedQuestions, setPassedQuestions] = useState([]);
    const [failedQuestions, setFailedQuestions] = useState([]);

    // Next question
    useHotkeys('d', () => {
        switchQuestion("next");
    });

    // Previous question
    useHotkeys('a', () => {
        switchQuestion("previous");
    });

    function switchQuestion(switchType) {
        // Check if we're switching from a question to an answer
        const switchToAnswer = type === QUESTION_TYPE.question
            && !(switchType === "previous" && questionNumber - 1 === -1);
        // Check if we're switching from an answer to a question
        const switchToQuestion = type === QUESTION_TYPE.answer
            && !(switchType === "next" && questionNumber + 1 === questions.length);

        // Update the type based on the switchType
        if (switchToAnswer) setType(QUESTION_TYPE.answer);
        else if (switchToQuestion) setType(QUESTION_TYPE.question);

        // Update the questionNumber based on the switchType
        if (switchType === "previous" && type === QUESTION_TYPE.question && questionNumber > 0) {
            setQuestionNumber(questionNumber - 1);
        }
        if (switchType === "next" && type === QUESTION_TYPE.answer && questionNumber < questions.length - 1) {
            setQuestionNumber(questionNumber + 1);
        }
    }

    // Starring
    useHotkeys('s', () => {
        if (!starredQuestions.includes(questionNumber)) {
            // Add to starred
            setStarredQuestions([...starredQuestions, questionNumber]);
        } else {
            // Remove from starred
            setStarredQuestions(starredQuestions.filter(item => item !== questionNumber));
        }
    });

    useHotkeys('e', () => {
        // reset
        setFailedQuestions(failedQuestions.filter(item => item !== questionNumber));
        if (!passedQuestions.includes(questionNumber)) {
            // Add to starred
            setPassedQuestions([...passedQuestions, questionNumber]);
        } else {
            // Remove from starred
            setPassedQuestions(passedQuestions.filter(item => item !== questionNumber));
        }
        console.log("Passed?", passedQuestions.includes(questionNumber));
    });

    useHotkeys('q', () => {
        // reset
        setPassedQuestions(passedQuestions.filter(item => item !== questionNumber));
        if (!failedQuestions.includes(questionNumber)) {
            // Add to starred
            setFailedQuestions([...failedQuestions, questionNumber]);
        } else {
            // Remove from starred
            setFailedQuestions(failedQuestions.filter(item => item !== questionNumber));
        }
        console.log("Failed?", failedQuestions.includes(questionNumber));
    });

    return (
        <>
            <Starred toggled={starredQuestions.includes(questionNumber)}/>
            <div className={"content"}>
                <Title value={questions[questionNumber][type]} type={type}/>
                {type === "answer" ? (
                    <div className={"feedback"}>
                        <Feedback type={"cross"} enabled={failedQuestions.includes(questionNumber)}/>
                        <Feedback type={"check"} enabled={passedQuestions.includes(questionNumber)}/>
                    </div>
                ) : (<></>)}
            </div>
            {/*<Arrow/>*/}
            {/*<Timeline/>*/}
        </>
    )
}

export default App
