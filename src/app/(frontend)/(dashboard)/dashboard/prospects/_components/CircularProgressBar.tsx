import React from "react";
import "./progressbar.css";

interface CircularProgressBarProps {
    value: number;
}

export default function CircularProgressBar({value = 75}: CircularProgressBarProps) {
    const type = value < 50 ? "alert" : value < 75 ? "mid" : "success";
    const color = type === "alert" ? "red" : type === "mid" ? "orange" : "green";
    const bgColor = type === "alert" ? "#ff8d8dff" : type === "mid" ? "#ffd2a8ff" : "#ccffcc";

    return(
        <div className="progress-bar" style={
            {
                background: `radial-gradient(closest-side, white 69%, transparent 70% 100%),
                            conic-gradient(${color} calc(${value} * 1%), ${bgColor} 0)`
            }
        }>
            <progress value={value} style={{visibility:"hidden", height:0, width:0}}>{value}</progress>
        </div>
    )
}