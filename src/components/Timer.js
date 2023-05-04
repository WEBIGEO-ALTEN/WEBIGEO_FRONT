import { useEffect, useState } from "react"

function Timer({ active, saveTime }) {
    var [timer, setTime] = useState(0);
    var [interval, setThisInterval] = useState(null);

    useEffect(() => {
        console.log("active", active)

        if (active) {
            console.log('ici')
            setThisInterval(setInterval(() => {
                setTime((time) => time + 100)
            }, 100))

        } else {

            clearInterval(interval)
            saveTime(Math.round(timer / 10))

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