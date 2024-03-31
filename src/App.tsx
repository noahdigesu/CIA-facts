import {useState} from 'react';
import {useHotkeys} from 'react-hotkeys-hook';

import {useLocalStorage} from "@uidotdev/usehooks";
import {animate} from "framer-motion";

import './App.scss'
import DEFAULT from './assets/default.json';
import OS from './assets/oses.json';
import WEB from './assets/web.json';

import Title from './components/Title.tsx';
import Arrow from "./components/buttons/Arrow.tsx";

import {DECK, DIRECTION, QUESTION_TYPE, TAG} from "./constants/constants.tsx";
import {Question} from "./types/types.tsx";
import Key from "./components/pannels/keymap/Key.tsx";
import Panel from "./components/pannels/Panel.tsx";
import {ArrowLeft, ArrowRight} from "react-feather";
import Action from "./components/buttons/Action.tsx";
import Timeline from "./components/timeline/Timeline.tsx";

const D = {default: DEFAULT, os: OS, web: WEB}
const DEFAULT_QUESTIONS = processQuestions(D.default, DECK.default);

function processQuestions(questions: Question[], deck: DECK): Question[] {
    return questions.map((question: Question, i: number) => ({
        id: `${deck}-${i}`,
        ...question
    }));
}

function App() {
    const [type, setType] = useState<QUESTION_TYPE>(QUESTION_TYPE.question);
    const [questions, setQuestions] = useState<Question[]>(DEFAULT_QUESTIONS);
    const [currentQuestion, setCurrentQuestion] = useLocalStorage<number>("currentQuestion", 0);
    const [starredQuestions, setStarredQuestions] = useLocalStorage<string[]>("starredQuestions", []);
    const [passedQuestions, setPassedQuestions] = useLocalStorage<string[]>("passedQuestions", []);
    const [failedQuestions, setFailedQuestions] = useLocalStorage<string[]>("failedQuestions", []);
    const [filter, setFilter] = useState<TAG>(TAG.none);
    const [deck, setDeck] = useLocalStorage<DECK>("deck", DECK.default);
    const [isDeckToggled, setIsDeckToggled] = useState<boolean>(false);
    const [isKeymapToggled, setIsKeymapToggled] = useState<boolean>(false);

    // Next question
    useHotkeys('ArrowRight', () => {
        switchQuestion(DIRECTION.next);
        animateContent(DIRECTION.previous);
    });
    // Previous question
    useHotkeys('ArrowLeft', () => {
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
    useHotkeys('shift+s', () => toggleFilter(TAG.starred), {preventDefault: true});
    // Filter by failed
    useHotkeys('shift+f', () => toggleFilter(TAG.failed), {preventDefault: true});
    // Filter by passed
    useHotkeys('shift+c', () => toggleFilter(TAG.passed), {preventDefault: true});
    // Change to default deck
    useHotkeys('1', () => changeDeck(DECK.default));
    // Change to OS deck
    useHotkeys('2', () => changeDeck(DECK.os));
    // Change to web deck
    useHotkeys('3', () => changeDeck(DECK.web));

    function changeDeck(deck: DECK) {
        setCurrentQuestion(0);
        setType(QUESTION_TYPE.question);
        setDeck(deck);

        switch (deck) {
            case DECK.default:
                setQuestions(DEFAULT_QUESTIONS);
                break;
            case DECK.os:
                setQuestions(processQuestions(D.os, deck));
                break;
            case DECK.web:
                setQuestions(processQuestions(D.web, deck));
                break;
        }
    }

    function toggleFilter(newFilter: TAG) {
        const questionsToFilter =
            newFilter === TAG.failed ? failedQuestions :
                newFilter === TAG.passed ? passedQuestions :
                    starredQuestions;

        if (questionsToFilter && questionsToFilter.length > 0) {
            filterQuestions(newFilter, questionsToFilter);
        }
    }

    function resetFilter() {
        setFilter(TAG.none);
        setQuestions(DEFAULT_QUESTIONS);
        setCurrentQuestion(0);
        setType(QUESTION_TYPE.question);
    }

    function filterQuestions(newFilter: TAG, questionsToFilter: string[]) {
        if (newFilter !== filter) {
            if (questionsToFilter.length > 0) {
                const filteredQuestions: Question[] = DEFAULT_QUESTIONS.filter((question: Question) =>
                    question.id != null && questionsToFilter.includes(question.id)
                );
                setFilter(newFilter);
                setQuestions(filteredQuestions);
                setCurrentQuestion(0);
                setType(QUESTION_TYPE.question);
            }
        } else {
            resetFilter();
        }
    }

    function switchQuestion(direction: DIRECTION) {
        // Check if we're switching from a question to an answer
        const isSwitchToAnswer = type === QUESTION_TYPE.question
            && !(direction === DIRECTION.previous && currentQuestion - 1 === -1);

        // Check if we're switching from an answer to a question
        const isSwitchToQuestion = type === QUESTION_TYPE.answer
            && !(direction === DIRECTION.next && currentQuestion + 1 === questions.length);

        // Update the type based on the direction
        if (isSwitchToAnswer) setType(QUESTION_TYPE.answer);
        else if (isSwitchToQuestion) setType(QUESTION_TYPE.question);

        // Update the currentQuestion based on the direction
        if (direction === DIRECTION.previous && type === QUESTION_TYPE.question && currentQuestion > 0)
            setCurrentQuestion(currentQuestion - 1);

        if (direction === DIRECTION.next && type === QUESTION_TYPE.answer && currentQuestion < questions.length - 1)
            setCurrentQuestion(currentQuestion + 1);
    }

    function goToQuestion(n: number) {
        setCurrentQuestion(n);
        setType(QUESTION_TYPE.question);
    }

    function isFailed() {
        return failedQuestions.some((id: string) =>
            id === questions[currentQuestion].id
        );
    }

    function isPassed() {
        return passedQuestions.some((id: string) =>
            id === questions[currentQuestion].id
        );
    }

    function isStarred() {
        return starredQuestions.some((id: string) =>
            id === questions[currentQuestion].id
        );
    }

    function addToPassed() {
        if (questions[currentQuestion].id != null) {
            setPassedQuestions([
                ...passedQuestions,
                questions[currentQuestion].id
            ] as string[]);
        }
    }

    function removeFromPassed() {
        setPassedQuestions(passedQuestions.filter((id: string) => {
            return id !== questions[currentQuestion].id
        }));
    }

    function addToFailed() {
        if (questions[currentQuestion].id != null) {
            setFailedQuestions([
                ...failedQuestions,
                questions[currentQuestion].id
            ] as string[]);
        }
    }

    function removeFromFailed() {
        setFailedQuestions(failedQuestions.filter((id: string) => {
            return id !== questions[currentQuestion].id
        }));
    }

    function addToStarred() {
        if (questions[currentQuestion].id != null) {
            setStarredQuestions([
                ...starredQuestions,
                questions[currentQuestion].id
            ] as string[]);
        }
    }

    function removeFromStarred() {
        setStarredQuestions(starredQuestions.filter((id: string) => {
            return id !== questions[currentQuestion].id
        }));
    }

    function togglePassed() {
        if (type === QUESTION_TYPE.answer) {
            removeFromFailed();
            !isPassed() ? addToPassed() : removeFromPassed();
        }
    }

    function toggleFailed() {
        if (type === QUESTION_TYPE.answer) {
            removeFromPassed();
            !isFailed() ? addToFailed() : removeFromFailed();
        }
    }

    function toggleStarred() {
        removeFromStarred();
        !isStarred() ? addToStarred() : removeFromStarred();
    }

    function reset() {
        setFailedQuestions([]);
        setPassedQuestions([]);
        setStarredQuestions([]);
        setQuestions(DEFAULT_QUESTIONS);
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

    function isFirstQuestion() {
        return currentQuestion === 0 && type === QUESTION_TYPE.question;
    }

    function isLastAnswer() {
        return currentQuestion === questions.length - 1 && type === QUESTION_TYPE.answer;
    }

    return (
        <>
            <div className="top-bar">
                <Action toggled={isDeckToggled}
                        onMouseDown={() => setIsDeckToggled(!isDeckToggled)}
                        icon={"bookmark"} hotkey={"m"}/>
                <span className="info">Progress : {currentQuestion + 1} / {questions.length}
                    <br/> Filter : <span>{filter}</span> <br/> Chapter : {deck.toLowerCase()}</span>
                <Action toggled={isStarred()}
                        onMouseDown={() => toggleStarred()}
                        icon={"star"} hotkey={"s"}/>
            </div>

            <div className={"content-wrapper"}>
                <div className={"content"}>
                    <Title question={questions[currentQuestion]} type={type}/>
                    {type === QUESTION_TYPE.answer && (
                        <div className={"feedback"}>
                            <Action toggled={isFailed()}
                                    onMouseDown={() => toggleFailed()}
                                    icon={"cross"} hotkey={"f"}/>
                            <Action toggled={isPassed()}
                                    onMouseDown={() => togglePassed()}
                                    icon={"check"} hotkey={"c"}/>
                        </div>
                    )}
                </div>
            </div>

            {!isFirstQuestion() && (
                <Arrow direction={DIRECTION.previous}
                       onMouseDown={() => {
                           switchQuestion(DIRECTION.previous);
                           animateContent(DIRECTION.next);
                       }}>
                    <ArrowLeft id={"arrow_previous"}/>
                </Arrow>
            )}
            {!isLastAnswer() && (
                <Arrow direction={DIRECTION.next}
                       onMouseDown={() => {
                           switchQuestion(DIRECTION.next);
                           animateContent(DIRECTION.previous);
                       }}>
                    <ArrowRight id={"arrow_next"}/>
                </Arrow>
            )}

            <Timeline questions={questions}
                      currentQuestion={currentQuestion}
                      failedQuestions={failedQuestions}
                      passedQuestions={passedQuestions}
                      starredQuestions={starredQuestions}
            />

            {/*Todo : tooltip on hover */}
            <div id={"help"} style={{cursor: "pointer"}}>
                <Key letter={"h"}
                     onMouseDown={() => setIsKeymapToggled(!isKeymapToggled)}/>
            </div>

            <Panel type={"deck"} toggled={isDeckToggled} setToggled={setIsDeckToggled}/>
            <Panel type={"keymap"} toggled={isKeymapToggled} setToggled={setIsKeymapToggled}/>
        </>
    )
}

export default App;