import {useState} from 'react'
import {useHotkeys} from 'react-hotkeys-hook'
import {useLocalStorage} from "@uidotdev/usehooks";

import './App.scss'

import Title from './components/Title.tsx'
import Starred from './components/buttons/Starred.tsx'
import Feedback from "./components/buttons/Feedback.tsx";
import Arrow from "./components/buttons/Arrow.tsx";

import questions from '../public/q-a.json';
import Timeline from "./components/Timeline.tsx";

function App() {
    const enum QUESTION_TYPE {
        question = "question",
        answer = "answer"
    }

    const [questionNumber, setQuestionNumber] = useState(0);
    const [type, setType] = useState(QUESTION_TYPE.question);
    const [starredQuestions, setStarredQuestions] = useLocalStorage("starredQuestions", []);
    const [passedQuestions, setPassedQuestions] = useLocalStorage("passedQuestions", []);
    const [failedQuestions, setFailedQuestions] = useLocalStorage("failedQuestions", []);

    // Next question
    useHotkeys('d', () => switchQuestion("next"));
    // Previous question
    useHotkeys('a', () => switchQuestion("previous"));
    // Starring
    useHotkeys('s', () => toggleStarred());
    // Mark as passed
    useHotkeys('e', () => togglePassed());
    // Mark as failed
    useHotkeys('q', () => toggleFailed());

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
        if (switchType === "previous" && type === QUESTION_TYPE.question && questionNumber > 0)
            setQuestionNumber(questionNumber - 1);
        if (switchType === "next" && type === QUESTION_TYPE.answer && questionNumber < questions.length - 1)
            setQuestionNumber(questionNumber + 1);
    }

    function toggleStarred() {
        if (!starredQuestions.includes(questionNumber)) {
            // Add to starred
            setStarredQuestions([...starredQuestions, questionNumber]);
        } else {
            // Remove from starred
            setStarredQuestions(starredQuestions.filter(item => item !== questionNumber));
        }
    }

    function toggleFailed() {
        if (type === QUESTION_TYPE.answer) {
            // reset
            setPassedQuestions(passedQuestions.filter(item => item !== questionNumber));
            if (!failedQuestions.includes(questionNumber)) {
                // Add to starred
                setFailedQuestions([...failedQuestions, questionNumber]);
            } else {
                // Remove from starred
                setFailedQuestions(failedQuestions.filter(item => item !== questionNumber));
            }
        }
    }

    function togglePassed() {
        if (type === QUESTION_TYPE.answer) {
            // reset
            setFailedQuestions(failedQuestions.filter(item => item !== questionNumber));
            if (!passedQuestions.includes(questionNumber)) {
                // Add to starred
                setPassedQuestions([...passedQuestions, questionNumber]);
            } else {
                // Remove from starred
                setPassedQuestions(passedQuestions.filter(item => item !== questionNumber));
            }
        }
    }

    return (
        <>
            <span onMouseDown={() => toggleStarred()}>
                <Starred toggled={starredQuestions.includes(questionNumber)}/>
            </span>
            <div className={"content"}>
                <Title value={questions[questionNumber][type]} type={type}/>
                {type === "answer" ? (
                    <div className={"feedback"}>
                        <span onMouseDown={() => toggleFailed()}>
                            <Feedback type={"cross"}
                                      enabled={failedQuestions.includes(questionNumber)}/>
                        </span>
                        <span onMouseDown={() => togglePassed()}>
                            <Feedback type={"check"}
                                      enabled={passedQuestions.includes(questionNumber)}/>
                        </span>
                    </div>
                ) : (<></>)}
            </div>
            {!(questionNumber === 0 && type === QUESTION_TYPE.question) ? (
                <span onMouseDown={() => switchQuestion("previous")}>
                    <Arrow direction={"left"}/>
                </span>
            ) : (<></>)}
            {!(questionNumber === questions.length - 1  && type === QUESTION_TYPE.answer) ? (
                <span onMouseDown={() => switchQuestion("next")}>
                    <Arrow direction={"right"}/>
                </span>
            ) : (<></>)}
            <Timeline/>
        </>
    )
}

export default App
