import { useEffect, useState } from "react"

function Timer({ active }) {
    var [timer, setTime] = useState(0);


    useEffect(() => {
        let interval = null;
        if (active) {
            interval = setInterval(() => {
                setTime((time) => time + 10)
            }, 10)
        } else {
            clearInterval(interval)
        }
        return () => { clearInterval(interval) }
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