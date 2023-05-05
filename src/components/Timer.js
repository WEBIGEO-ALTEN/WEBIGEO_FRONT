import { useEffect, useRef, useState } from "react"

function Timer({ active, saveTime }) {
    const [timer, setTime] = useState(0);
    const startRef = useRef();

    useEffect(() => {
        if (active) {
            startRef.current = performance.now().toFixed(3);

            const intervalId = setInterval(() => {
                const elapsed = performance.now().toFixed(3) - startRef.current;
                setTime(Math.round(elapsed));
            }, 10);

            return () => {
                clearInterval(intervalId);
                const elapsed = performance.now().toFixed(3) - startRef.current;
                saveTime(Math.round(elapsed / 10));
            };
        }
    }, [active]);

    return (
        <div className="timer">
            <span className="digits">
                {("0" + Math.floor((timer / 60000) % 60)).slice(-2)}:
            </span>
            <span className="digits">
                {("0" + Math.floor((timer / 1000) % 60)).slice(-2)}.
            </span>
            <span className="digits mili-sec">
                {("0" + ((timer / 10) % 100)).slice(-2)}
            </span>
        </div>
    )
}

export default Timer