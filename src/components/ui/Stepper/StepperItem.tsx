import React from "react";

interface StepperItemProps
{
    label: string,
    status: "passed" | "active" | "next"
    goTo?: (x : any) => void
}

export default function StepperItem({label, status = "next", goTo = () => {}, ...rest}: StepperItemProps)
{
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        //goTo(e.currentTarget.dataset.id)
        //console.log("clic")
    }

    return(
        <div className={`stepper-item ${status}`}>
            <p>{label}</p>
            <div onClick={handleClick} {...rest}></div>
        </div>
    )
}