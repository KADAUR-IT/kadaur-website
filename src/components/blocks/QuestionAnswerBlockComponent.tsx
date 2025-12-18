'use client'

import React, { useEffect, useRef, useState } from "react";
import { QuestionAnswerBlock } from "@/payload-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RichText from "../ui/RichText";
import { IconName, library } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown, fas } from "@fortawesome/free-solid-svg-icons";
import QuestionCollapsable from "./QuestionAnswer/QuestionCollapsable";

library.add(fas)

interface QuestionAnswerBlockProps
{
    block: QuestionAnswerBlock
}

export default function QuestionAnswerBlockComponent({block}: QuestionAnswerBlockProps)
{
    const questionArray = block.questionList?.map( (qa) => {
        return(
            <QuestionCollapsable key={qa.id} qa={qa} />
        )
    } )


    return(
        <div className="flex flex-col gap-8 w-full items-center">
            {questionArray}
        </div>
    )
}