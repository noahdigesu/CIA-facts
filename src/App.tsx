import {useState} from 'react';
import {useHotkeys} from 'react-hotkeys-hook';
// @ts-ignore
import {useLocalStorage} from "@uidotdev/usehooks";
import {animate} from "framer-motion";

import './App.scss'
import DEFAULT from './assets/default.json';
import OS from './assets/oses.json';
import WEB from './assets/web.json';

import Title from './components/Title.tsx';
import Action from './components/buttons/Action.tsx';
import Arrow from "./components/buttons/Arrow.tsx";
import Timeline from "./components/timeline/Timeline.tsx";

import {DIRECTION, QUESTION_TYPE, TAG} from "./constants/constants.tsx";
import {Question} from "./types/types.tsx";
import Key from "./components/pannels/keymap/Key.tsx";
import Panel from "./components/pannels/Panel.tsx";

const DECKS = {default: DEFAULT, os: OS, web: WEB}

function App() {
    const [type, setType] = useState<QUESTION_TYPE>(QUESTION_TYPE.question);
    const [questions, setQuestions] = useState<Question[]>(DECKS.default);
    const [currentQuestion, setCurrentQuestion] = useLocalStorage<number>("currentQuestion", 0);
    const [starredQuestions, setStarredQuestions] = useLocalStorage<Question[]>("starredQuestions", []);
    const [passedQuestions, setPassedQuestions] = useLocalStorage<Question[]>("passedQuestions", []);
    const [failedQuestions, setFailedQuestions] = useLocalStorage<Question[]>("failedQuestions", []);
    const [isDeckToggled, setIsDeckToggled] = useState<boolean>(false);
    const [isKeymapToggled, setIsKeymapToggled] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>(TAG.none);

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
    useHotkeys('shift+s', () => toggleFilter(TAG.starred, starredQuestions), {preventDefault: true});
    // Filter by failed
    useHotkeys('shift+f', () => toggleFilter(TAG.failed, failedQuestions), {preventDefault: true});
    // Change to default deck
    useHotkeys('1', () => changeDeck("default"));
    // Change to OS deck
    useHotkeys('2', () => changeDeck("os"));
    // Change to web deck
    useHotkeys('3', () => changeDeck("web"));

    function changeDeck(deck: string) {
        setCurrentQuestion(0);
        setType(QUESTION_TYPE.question);

        switch (deck) {
            case "default":
                setQuestions(DECKS.default);
                break;
            case "os":
                setQuestions(DECKS.os);
                break;
            case "web":
                setQuestions(DECKS.web);
                break;
        }
    }

    function toggleFilter(tag: TAG, questions: Question[]) {
        if (filter !== tag && questions.length > 0) {
            setQuestions(questions);
            setCurrentQuestion(0);
            setFilter(tag);
        } else if (filter === tag) {
            setQuestions(DECKS.default);
            setFilter(TAG.none);
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

    function reset() {
        setFailedQuestions([]);
        setPassedQuestions([]);
        setStarredQuestions([]);
        setQuestions(DECKS.default);
        setCurrentQuestion(0);
        setType(QUESTION_TYPE.question);
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
            <Action toggled={isStarred()}
                    onMouseDown={() => toggleStarred()}
                    icon={"star"} hotkey={"s"}/>

            {/*Todo Show current chapter*/}
            <Action toggled={isDeckToggled}
                    onMouseDown={() => setIsDeckToggled(!isDeckToggled)}
                    icon={"bookmark"} hotkey={"m"}/>

            <div className={"content-wrapper"}>
                <div className={"content"}>
                    <Title question={questions[currentQuestion]} type={type}/>
                    {type === QUESTION_TYPE.answer ? (
                        <div className={"feedback"}>
                            <Action toggled={isFailed()}
                                    onMouseDown={() => toggleFailed()}
                                    icon={"cross"} hotkey={"f"}/>
                            <Action toggled={isPassed()}
                                    onMouseDown={() => togglePassed()}
                                    icon={"check"} hotkey={"c"}/>
                        </div>
                    ) : (<></>)}
                </div>
            </div>

            {!(currentQuestion === 0 && type === QUESTION_TYPE.question) ? (
                <Arrow direction={DIRECTION.previous}
                       onMouseDown={() => switchQuestion(DIRECTION.previous)}/>
            ) : (<></>)}
            {!(currentQuestion === questions.length - 1 && type === QUESTION_TYPE.answer) ? (
                <Arrow direction={DIRECTION.next}
                       onMouseDown={() => switchQuestion(DIRECTION.next)}/>
            ) : (<></>)}

            <Timeline questions={questions}
                      currentQuestion={currentQuestion}
                      failedQuestions={failedQuestions}
                      passedQuestions={passedQuestions}
                      starredQuestions={starredQuestions}
            />

            {/*Todo : tooltip on hover */}
            <div id={"help"} style={{cursor: "pointer"}}>
                <Key letter={"h"}
                     onMouseDown={() => setIsDeckToggled(!isDeckToggled)}/>
            </div>

            <Panel toggled={isDeckToggled}
                   setToggled={setIsDeckToggled} type={"deck"}/>
            <Panel toggled={isKeymapToggled}
                   setToggled={setIsKeymapToggled} type={"keymap"}/>
        </>
    )
}

export default App;