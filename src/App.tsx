import {useState} from 'react';
import {useHotkeys} from 'react-hotkeys-hook';
// @ts-ignore
import {useLocalStorage} from "@uidotdev/usehooks";
import {animate} from "framer-motion";

import './App.scss'
import QUESTIONS from './assets/q-a.json';

import Title from './components/Title.tsx';
import Starred from './components/buttons/Starred.tsx';
import Feedback from "./components/buttons/Feedback.tsx";
import Arrow from "./components/buttons/Arrow.tsx";
import Timeline from "./components/timeline/Timeline.tsx";

import {DIRECTION, QUESTION_TYPE} from "./constants/constants.tsx";
import {Question} from "./types/types.tsx";

function App() {
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [type, setType] = useState<QUESTION_TYPE>(QUESTION_TYPE.question);
    const [questions, setQuestions] = useState<Question[]>(QUESTIONS);
    const [starredQuestions, setStarredQuestions] = useLocalStorage<Question[]>("starredQuestions", []);
    const [passedQuestions, setPassedQuestions] = useLocalStorage<Question[]>("passedQuestions", []);
    const [failedQuestions, setFailedQuestions] = useLocalStorage<Question[]>("failedQuestions", []);
    const [filter, setFilter] = useState<string>("none");

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
    // Filter by starred
    useHotkeys('ctrl+s', () => toggleStarredFilter(), {preventDefault: true});
    // Filter by failed
    useHotkeys('ctrl+f', () => toggleFailedFilter(), {preventDefault: true});

    // todo improve
    function toggleStarredFilter() {
        if (filter !== "starred" && starredQuestions.length > 0) {
            setQuestions(starredQuestions);
            setCurrentQuestion(0);
            setFilter("starred");
        } else if (filter === "starred") {
            setQuestions(QUESTIONS);
            setFilter("none");
        }
    }

    function toggleFailedFilter() {
        if (filter !== "failed" && failedQuestions.length > 0) {
            setQuestions(failedQuestions);
            setCurrentQuestion(0);
            setFilter("failed");
        } else if (filter === "failed") {
            setQuestions(QUESTIONS);
            setFilter("none");
        }
    }

    function switchQuestion(switchType: DIRECTION) {
        // Check if we're switching from a question to an answer
        const switchToAnswer = type === QUESTION_TYPE.question
            && !(switchType === DIRECTION.previous && currentQuestion - 1 === -1);
        // Check if we're switching from an answer to a question
        const switchToQuestion = type === QUESTION_TYPE.answer
            && !(switchType === DIRECTION.next && currentQuestion + 1 === questions.length);

        // Update the type based on the switchType
        if (switchToAnswer) setType(QUESTION_TYPE.answer);
        else if (switchToQuestion) setType(QUESTION_TYPE.question);

        // Update the currentQuestion based on the switchType
        if (switchType === DIRECTION.previous && type === QUESTION_TYPE.question && currentQuestion > 0)
            setCurrentQuestion(currentQuestion - 1);
        if (switchType === DIRECTION.next && type === QUESTION_TYPE.answer && currentQuestion < questions.length - 1)
            setCurrentQuestion(currentQuestion + 1);
    }

    function goToQuestion(n: number) {
        setCurrentQuestion(n);
        setType(QUESTION_TYPE.question);
    }

    function isStarred() {
        return starredQuestions.some((question: Question) => {
            return question.question === questions[currentQuestion].question
                && question.answer === questions[currentQuestion].answer
        });
    }

    function isFailed() {
        return failedQuestions.some((question: Question) => {
            return question.question === questions[currentQuestion].question
                && question.answer === questions[currentQuestion].answer
        });
    }

    function isPassed() {
        return passedQuestions.some((question: Question) => {
            return question.question === questions[currentQuestion].question
                && question.answer === questions[currentQuestion].answer
        });
    }

    function toggleStarred() {
        if (!isStarred()) {
            // Add to starred
            setStarredQuestions([...starredQuestions, questions[currentQuestion]]);
        } else {
            // Remove from starred
            setStarredQuestions(starredQuestions.filter((question: Question) => {
                return question.question !== questions[currentQuestion].question
                    && question.answer !== questions[currentQuestion].answer
            }));
        }
    }

    function toggleFailed() {
        if (type === QUESTION_TYPE.answer) {
            // Remove from passed (reset)
            setPassedQuestions(passedQuestions.filter((question: Question) => {
                return question.question !== questions[currentQuestion].question
                    && question.answer !== questions[currentQuestion].answer
            }));

            if (!isFailed()) {
                // Add to failed
                setFailedQuestions([...failedQuestions, questions[currentQuestion]]);
            } else {
                // Remove from failed
                setFailedQuestions(failedQuestions.filter((question: Question) => {
                    return question.question !== questions[currentQuestion].question
                        && question.answer !== questions[currentQuestion].answer
                }));
            }
        }
    }

    function togglePassed() {
        if (type === QUESTION_TYPE.answer) {
            // Remove from failed (reset)
            setFailedQuestions(failedQuestions.filter((question: Question) => {
                return question.question !== questions[currentQuestion].question
                    && question.answer !== questions[currentQuestion].answer
            }));

            if (!isPassed()) {
                // Add to passed
                setPassedQuestions([...passedQuestions, questions[currentQuestion]]);
            } else {
                // Remove from passed
                setPassedQuestions(passedQuestions.filter((question: Question) => {
                    return question.question !== questions[currentQuestion].question
                        && question.answer !== questions[currentQuestion].answer
                }));
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
                <Starred toggled={isStarred()}/>
            </span>
            <div className={"content-wrapper"}>
                <div className={"content"}>
                    <Title value={questions[currentQuestion][type]} type={type}/>
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
                                          enabled={isFailed()}/>
                            </span>
                            <span onMouseDown={() => togglePassed()}
                                  onMouseEnter={() => {
                                      animate(".checkmark-wrapper.check .key", {y: [-5, 0], opacity: .6}, {})
                                  }}
                                  onMouseLeave={() => {
                                      animate(".checkmark-wrapper.check .key", {y: [0, -5], opacity: 0}, {})
                                  }}>
                                <Feedback type={"check"}
                                          enabled={isPassed()}/>
                            </span>
                        </div>
                    ) : (<></>)}
                </div>
            </div>
            {!(currentQuestion === 0 && type === QUESTION_TYPE.question) ? (
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
            {!(currentQuestion === questions.length - 1 && type === QUESTION_TYPE.answer) ? (
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
                      currentQuestion={currentQuestion}
                      failedQuestions={failedQuestions}
                      passedQuestions={passedQuestions}
                      starredQuestions={starredQuestions}
            />
            {/*<Counter questionNumber={currentQuestion + 1} questionAmount={questions.length}/>*/}
        </>
    )
}

export default App
