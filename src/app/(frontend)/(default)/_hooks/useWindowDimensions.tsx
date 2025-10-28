import React ,{useEffect, useState} from "react";

export default function useWindowDimensions()
{
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    function getWindowDimensions()
    {
        if(typeof window == "undefined") return

        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }
    
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        

        return () => window.removeEventListener('resize', handleResize);
    }, []);
        
    return windowDimensions;
}