export const enum QUESTION_TYPE {
    question = "question",
    answer = "answer"
}

export const enum DIRECTION {
    next = "next",
    previous = "previous"
}

export const enum STATE {
    normal = "normal", previous = "previous", current = "current", past = "past"
}

export const enum TAG {
    incomplete = "incomplete",
    passed = "passed",
    failed = "failed",
    starred = "starred",
    none = "none"
}

export const enum DECK {
    default = "DEFAULT",
    os = "OS",
    web = "WEB"
}