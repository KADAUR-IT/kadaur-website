'use client'

import React, { useEffect, useRef, useState } from "react";
import { QuestionAnswerBlock } from "@/payload-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RichText from "../ui/RichText";
import { IconName, library } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown, fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas)

interface QuestionAnswerBlockProps
{
    block: QuestionAnswerBlock
}

export default function QuestionAnswerBlockComponent({block}: QuestionAnswerBlockProps)
{
    const answerRef = useRef(null)
    const [answerOpen, setAnswerOpen] = useState(false)
    const [answerHeight, setAnswerHeight] = useState("32px")

    const handleClick = (e) => {
        e.preventDefault()

        
        setAnswerOpen(!answerOpen);
    }

    useEffect(() => {
        console.log(answerRef.current.children[0].scrollHeight)
        setAnswerHeight(answerRef.current.children[0].scrollHeight)
    }, [])


    return(
        <div className="question-answer-block">
            <FontAwesomeIcon className="question-icon" icon={["fas", block.icon as IconName]} />
            <div className={"question-answer-collapsable" + (answerOpen ? "" : " hide")} onClick={handleClick}>
                <div className="question-div">
                    <p className="question-text">{block.question}</p>
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>
                <div style={{
                    height:answerHeight
                }} className="answer-div" ref={answerRef}>
                    <RichText data={block.answer} />
                </div>
            </div>
        </div>
    )
}