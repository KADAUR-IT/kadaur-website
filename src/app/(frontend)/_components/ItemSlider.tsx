'use client'

import React, { ReactNode, useState } from "react";

interface ItemSliderProps{
    children: ReactNode
}

export default function ItemSlider({children} : ItemSliderProps)
{
    const [position, setPosition] = useState({x: 0, y: 0});

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();

        setPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const changeBg = (e) => {
        bg = bgHover
        console.log("ff")
    }

    var bgHover = `radial-gradient(circle 80px at ${position.x}px ${position.y}px, red, transparent 80%)`;
    var bgDefault = 'initial'
    var bg = bgDefault



    return (
        <>
            <p
                className="item-slider"
                onMouseMove={handleMouseMove}
                onMouseEnter={changeBg}
                style={
                    {
                        background: bg,
                    }
                }>{children}</p>
        </>
    )
}