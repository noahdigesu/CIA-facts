import {useState} from 'react'
import {useHotkeys} from 'react-hotkeys-hook'

import './App.css'

import Title from './components/Title.tsx'
import Starred from './components/buttons/Starred.tsx'

import questions from '../public/q-a.json';

function App() {
    const enum QUESTION_TYPE {
        question= "question",
        answer = "answer",
        feedback = "feedback"
    }
    const [questionNumber, setQuestionNumber] = useState(0);
    const [type, setType] = useState(QUESTION_TYPE.question);
    const [starredQuestions, setStarredQuestions] = useState([]);
    const [failedQuestions, setFailedQuestions] = useState([]);

    // Next question
    useHotkeys('d', () => {
        if (type === QUESTION_TYPE.question) {
            if (questionNumber < questions.length) {
                setType(QUESTION_TYPE.answer);
            }
        } else if (type === QUESTION_TYPE.answer) {
            if (questionNumber < questions.length - 1) {
                setQuestionNumber(questionNumber + 1);
                setType(QUESTION_TYPE.question);
            }
        }
    });
    // Previous question
    useHotkeys('a', () => {
        if (type === QUESTION_TYPE.question) {
            if (questionNumber > 0) {
                setQuestionNumber(questionNumber - 1);
                setType(QUESTION_TYPE.answer);
            }
        } else if (type === QUESTION_TYPE.answer) {
            if (questionNumber >= 0) {
                setType(QUESTION_TYPE.question);
            }
        }
    });

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

    return (
        <>
            <Starred toggled={starredQuestions.includes(questionNumber)}/>
            <Title value={questions[questionNumber][type]} type={type}/>
            {/*<Arrow/>*/}
            {/*<Timeline/>*/}
        </>
    )
}

export default App
