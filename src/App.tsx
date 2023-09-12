import {useState} from 'react';
import {useHotkeys} from 'react-hotkeys-hook';
// @ts-ignore
import {useLocalStorage} from "@uidotdev/usehooks";
import {animate} from "framer-motion";

import './App.scss'
import questions from './assets/q-a.json';

import Title from './components/Title.tsx';
import Starred from './components/buttons/Starred.tsx';
import Feedback from "./components/buttons/Feedback.tsx";
import Arrow from "./components/buttons/Arrow.tsx";
import Timeline from "./components/timeline/Timeline.tsx";
import Counter from "./components/Counter.tsx";

import {DIRECTION, QUESTION_TYPE} from "./constants/constants.tsx";

function App() {
    const [questionNumber, setQuestionNumber] = useState<number>(0);
    const [type, setType] = useState<QUESTION_TYPE>(QUESTION_TYPE.question);
    const [starredQuestions, setStarredQuestions] = useLocalStorage<number[]>("starredQuestions", []);
    const [passedQuestions, setPassedQuestions] = useLocalStorage<number[]>("passedQuestions", []);
    const [failedQuestions, setFailedQuestions] = useLocalStorage<number[]>("failedQuestions", []);

    // Next question
    useHotkeys('d', () => {
        switchQuestion(DIRECTION.next);
        animateContent(DIRECTION.next);
    });
    // Previous question
    useHotkeys('a', () => {
        switchQuestion(DIRECTION.previous);
        animateContent(DIRECTION.previous);
    });
    // Starring
    useHotkeys('s', () => toggleStarred());
    // Mark as passed
    useHotkeys('e', () => togglePassed());
    // Mark as failed
    useHotkeys('q', () => toggleFailed());
    // Clear all tags
    useHotkeys('c', () => clear());
    // Go to first question
    useHotkeys('home', () => goToQuestion(0));
    // Go to last question
    useHotkeys('end', () => goToQuestion(questions.length - 1));

    function switchQuestion(switchType: DIRECTION) {
        // Check if we're switching from a question to an answer
        const switchToAnswer = type === QUESTION_TYPE.question
            && !(switchType === DIRECTION.previous && questionNumber - 1 === -1);
        // Check if we're switching from an answer to a question
        const switchToQuestion = type === QUESTION_TYPE.answer
            && !(switchType === DIRECTION.next && questionNumber + 1 === questions.length);

        // Update the type based on the switchType
        if (switchToAnswer) setType(QUESTION_TYPE.answer);
        else if (switchToQuestion) setType(QUESTION_TYPE.question);

        // Update the questionNumber based on the switchType
        if (switchType === DIRECTION.previous && type === QUESTION_TYPE.question && questionNumber > 0)
            setQuestionNumber(questionNumber - 1);
        if (switchType === DIRECTION.next && type === QUESTION_TYPE.answer && questionNumber < questions.length - 1)
            setQuestionNumber(questionNumber + 1);
    }

    function goToQuestion(n: number) {
        setQuestionNumber(n);
        setType(QUESTION_TYPE.question);
    }

    function toggleStarred() {
        if (!starredQuestions.includes(questionNumber)) {
            // Add to starred
            setStarredQuestions([...starredQuestions, questionNumber]);
        } else {
            // Remove from starred
            setStarredQuestions(starredQuestions.filter((item: number) => item !== questionNumber));
        }
    }

    function toggleFailed() {
        if (type === QUESTION_TYPE.answer) {
            // reset
            setPassedQuestions(passedQuestions.filter((item: number) => item !== questionNumber));
            if (!failedQuestions.includes(questionNumber)) {
                // Add to starred
                setFailedQuestions([...failedQuestions, questionNumber]);
            } else {
                // Remove from starred
                setFailedQuestions(failedQuestions.filter((item: number) => item !== questionNumber));
            }
        }
    }

    function togglePassed() {
        if (type === QUESTION_TYPE.answer) {
            // reset
            setFailedQuestions(failedQuestions.filter((item: number) => item !== questionNumber));
            if (!passedQuestions.includes(questionNumber)) {
                // Add to starred
                setPassedQuestions([...passedQuestions, questionNumber]);
            } else {
                // Remove from starred
                setPassedQuestions(passedQuestions.filter((item: number) => item !== questionNumber));
            }
        }
    }

    function clear() {
        setFailedQuestions([]);
        setPassedQuestions([]);
        setStarredQuestions([]);
    }

    function animateContent(direction: DIRECTION) {
        animate(
            `.content`,
            {x: direction === DIRECTION.next ? [-10, 0] : [10, 0]},
            {type: "spring", mass: .5, duration: 1}
        );
    }

    return (
        <>
            <span onMouseDown={() => toggleStarred()}
                  onMouseEnter={() => {
                      animate("#star-wrapper .key", {y: [-5, 0], opacity: .6}, {})
                  }}
                  onMouseLeave={() => {
                      animate("#star-wrapper .key", {y: [0, -5], opacity: 0}, {})
                  }}>
                <Starred toggled={starredQuestions.includes(questionNumber)}/>
            </span>
            <div className={"content-wrapper"}>
                <div className={"content"}>
                    <Title value={questions[questionNumber][type].toString()} type={type}/>
                    {type === "answer" ? (
                        <div className={"feedback"}>
                            <span onMouseDown={() => toggleFailed()}
                                  onMouseEnter={() => {
                                      animate(".checkmark-wrapper.cross .key", {y: [-5, 0], opacity: .6}, {})
                                  }}
                                  onMouseLeave={() => {
                                      animate(".checkmark-wrapper.cross .key", {y: [0, -5], opacity: 0}, {})
                                  }}>
                                <Feedback type={"cross"}
                                          enabled={failedQuestions.includes(questionNumber)}/>
                            </span>
                            <span onMouseDown={() => togglePassed()}
                                  onMouseEnter={() => {
                                      animate(".checkmark-wrapper.check .key", {y: [-5, 0], opacity: .6}, {})
                                  }}
                                  onMouseLeave={() => {
                                      animate(".checkmark-wrapper.check .key", {y: [0, -5], opacity: 0}, {})
                                  }}>
                                <Feedback type={"check"}
                                          enabled={passedQuestions.includes(questionNumber)}/>
                            </span>
                        </div>
                    ) : (<></>)}
                </div>
            </div>
            {!(questionNumber === 0 && type === QUESTION_TYPE.question) ? (
                <span onMouseDown={() => switchQuestion(DIRECTION.previous)}
                      onMouseEnter={() => {
                          animate(".arrow-wrapper.previous .key", {y: [-5, 0], opacity: .6}, {})
                      }}
                      onMouseLeave={() => {
                          animate(".arrow-wrapper.previous .key", {y: [0, -5], opacity: 0}, {})
                      }}>
                    <Arrow direction={DIRECTION.previous}/>
                </span>
            ) : (<></>)}
            {!(questionNumber === questions.length - 1 && type === QUESTION_TYPE.answer) ? (
                <span onMouseDown={() => switchQuestion(DIRECTION.next)}
                      onMouseEnter={() => {
                          animate(".arrow-wrapper.next .key", {y: [-5, 0], opacity: .6}, {})
                      }}
                      onMouseLeave={() => {
                          animate(".arrow-wrapper.next .key", {y: [0, -5], opacity: 0}, {})
                      }}>
                    <Arrow direction={DIRECTION.next}/>
                </span>
            ) : (<></>)}
            <Timeline questions={questions}
                      currentQuestion={questionNumber}
                      failedQuestions={failedQuestions}
                      passedQuestions={passedQuestions}
                      starredQuestions={starredQuestions}
            />
            <Counter questionNumber={questionNumber + 1} questionAmount={questions.length}/>
        </>
    )
}

export default App
