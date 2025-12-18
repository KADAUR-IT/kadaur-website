"use client"

import React, { useState } from "react";
import StepperItem from "./StepperItem";
import "./stepper.css"

interface StepperProps
{
    steps: string[]
    currentStep: number
    setCurrentStep?: (index: number) => void
}


export default function Stepper({steps, currentStep, setCurrentStep = () => {} } : StepperProps)
{

    const renderStep = steps.map( (step, index) => {
        return(
            <StepperItem key={index} label={step} status={index < currentStep ? "passed" : index === currentStep ? "active" : "next" } goTo={setCurrentStep} data-id={index} />
        )
    })

    return(
        <div className="stepper">
            {renderStep}
        </div>
    )
}