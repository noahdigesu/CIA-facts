import {useState} from 'react';
import {useHotkeys} from 'react-hotkeys-hook';
// @ts-ignore
import {useLocalStorage} from "@uidotdev/usehooks";
import {animate, motion} from "framer-motion";

import './App.scss'
import DEFAULT from './assets/default.json';
import OS from './assets/oses.json';

import Title from './components/Title.tsx';
import Action from './components/buttons/Action.tsx';
import Arrow from "./components/buttons/Arrow.tsx";
import Timeline from "./components/timeline/Timeline.tsx";

import {DIRECTION, QUESTION_TYPE, TAG} from "./constants/constants.tsx";
import {Question} from "./types/types.tsx";
import Keymap from "./components/pannels/keymap/Keymap.tsx";
import Key from "./components/pannels/keymap/Key.tsx";

const DECKS = { default: DEFAULT, os: OS }

function App() {
    const [type, setType] = useState<QUESTION_TYPE>(QUESTION_TYPE.question);
    const [questions, setQuestions] = useState<Question[]>(DECKS.default);
    const [isKeymapToggled, setIsKeymapToggled] = useState<boolean>(false);
    const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>("none");
    const [currentQuestion, setCurrentQuestion] = useLocalStorage<number>("currentQuestion", 0);
    const [starredQuestions, setStarredQuestions] = useLocalStorage<Question[]>("starredQuestions", []);
    const [passedQuestions, setPassedQuestions] = useLocalStorage<Question[]>("passedQuestions", []);
    const [failedQuestions, setFailedQuestions] = useLocalStorage<Question[]>("failedQuestions", []);

    // Next question
    useHotkeys('d', () => {
        switchQuestion(DIRECTION.next);
        animateContent(DIRECTION.previous);
    });
    // Previous question
    useHotkeys('a', () => {
        switchQuestion(DIRECTION.previous);
        animateContent(DIRECTION.next);
    });
    // Mark as starred
    useHotkeys('s', () => toggleStarred());
    // Mark as passed
    useHotkeys('c', () => togglePassed());
    // Mark as failed
    useHotkeys('f', () => toggleFailed());
    // Clear all tags
    useHotkeys('shift+r', () => reset(), {preventDefault: true});
    // Go to first question
    useHotkeys('home', () => goToQuestion(0));
    // Go to last question
    useHotkeys('end', () => goToQuestion(questions.length - 1));
    // Filter by starred
    useHotkeys('shift+s', () => toggleStarredFilter(), {preventDefault: true});
    // Filter by failed
    useHotkeys('shift+f', () => toggleFailedFilter(), {preventDefault: true});
    // Show Keymap panel
    useHotkeys('h', () => toggleKeymapPanel());
    // Show Menu panel
    useHotkeys('m', () => setIsMenuToggled(!isMenuToggled));
    // Close panel
    useHotkeys('esc', () => closePanel());
    // ! Temp
    useHotkeys('x', () => changeDeck());

    function changeDeck() {
        setQuestions(DECKS.os);
    }

    function closePanel() {
        if (isKeymapToggled) setIsKeymapToggled(false);
        if (isMenuToggled) setIsMenuToggled(false);
    }

    function toggleFilter(tag: string, questions: Question[]) {
        if (filter !== tag && questions.length > 0) {
            setQuestions(questions);
            setCurrentQuestion(0);
            setFilter(tag);
        } else if (filter === tag) {
            setQuestions(DECKS.default);
            setFilter("none");
        }
    }

    function toggleStarredFilter() {
        toggleFilter(TAG.starred, starredQuestions);
    }

    function toggleFailedFilter() {
        toggleFilter(TAG.failed, failedQuestions);
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

    function reset() {
        setFailedQuestions([]);
        setPassedQuestions([]);
        setStarredQuestions([]);
        setQuestions(DECKS.default);
        setCurrentQuestion(0);
    }

    function toggleKeymapPanel() {
        setIsKeymapToggled(!isKeymapToggled);
        if (!isKeymapToggled) {
            animate(
                "#keymap-wrapper",
                {
                    display: "inherit",
                    opacity: [0, 1]
                },
                {
                    type: "spring",
                    mass: .5,
                    duration: 1
                }
            );
            animate(
                "#keymap",
                {
                    transform: ["translate3d(-50%, -45%, 0)", "translate3d(-50%, -50%, 0)"]
                },
                {
                    type: "spring",
                    mass: .5,
                    duration: 1
                }
            );
        } else {
            animate(
                "#keymap-wrapper",
                {
                    opacity: [1, 0],
                    display: "none"
                },
                {
                    type: "spring",
                    mass: .5,
                    duration: 1
                }
            );
        }
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
            <span onMouseDown={() => toggleStarred()}>
                <Action isToggled={isStarred()} icon={"star"} hotkey={"s"}/>
            </span>
            <span onMouseDown={() => setIsMenuToggled(!isMenuToggled)}>
                <Action isToggled={isMenuToggled} icon={"menu"} hotkey={"m"}/>
            </span>
            <div className={"content-wrapper"}>
                <div className={"content"}>
                    <Title question={questions[currentQuestion]} type={type}/>
                    {type === "answer" ? (
                        <div className={"feedback"}>
                            <span onMouseDown={() => toggleFailed()}>
                                <Action isToggled={isFailed()} icon={"cross"} hotkey={"f"}/>
                            </span>
                            <span onMouseDown={() => togglePassed()}>
                                <Action isToggled={isPassed()} icon={"check"} hotkey={"c"}/>
                            </span>
                        </div>
                    ) : (<></>)}
                </div>
            </div>
            {!(currentQuestion === 0 && type === QUESTION_TYPE.question) ? (
                <span onMouseDown={() => switchQuestion(DIRECTION.previous)}>
                    <Arrow direction={DIRECTION.previous}/>
                </span>
            ) : (<></>)}
            {!(currentQuestion === questions.length - 1 && type === QUESTION_TYPE.answer) ? (
                <span onMouseDown={() => switchQuestion(DIRECTION.next)}>
                    <Arrow direction={DIRECTION.next}/>
                </span>
            ) : (<></>)}
            <Timeline questions={questions}
                      currentQuestion={currentQuestion}
                      failedQuestions={failedQuestions}
                      passedQuestions={passedQuestions}
                      starredQuestions={starredQuestions}
            />
            <div id={"help"} onClick={() => toggleKeymapPanel()} style={{cursor: "pointer"}}>
                {/*Todo : tooltip on hover */}
                <Key letter={"h"}/>
            </div>
            <motion.div id={"keymap-wrapper"} initial={{display: "none"}} exit={{display: "none"}}>
                <Keymap/>
            </motion.div>
        </>
    )
}

export default App
