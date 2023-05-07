import axios from 'axios';
import { useState } from 'react';

function Final({ updateRecord, goodanswer, nbrQuestions, time, id, handleAnwser }) {

    const [user, setUser] = useState("");
    const [send, setSend] = useState(false);
    const [sent, setSent] = useState(false);
    const setUp = () => {
        setSend(true);
        handleAnwser();

    }

    const handleChange = (e) => {
        setUser(e.target.value);
    }

    const handleRecord = (user) => {
        console.log('envoi')
        const data = {
            "time": time,
            "user": user,
            "device": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/112.0",
            "quiz": `http://localhost:8000/quiz/${id}/`,
            "points": goodanswer

        };
        axios.post('http://localhost:8000/record/', data)
        setSent(true);
        updateRecord(data)
    }

    const convertTime = (time) => {
        console.log(time)
        var mili = time % 100;
        var nbrSeconds = Math.floor(time / 100);


        var minutes = Math.floor(nbrSeconds / 60);
        var seconds = nbrSeconds % 60;
        if (String(minutes).length === 1) {
            if (String(seconds).length === 1) {
                return <>{String(mili).length === 1 ? `0${minutes}:0${seconds}:0${mili}` : `0${minutes}:0${seconds}:${mili}`}</>
            }
            return <>{String(mili).length === 1 ? `0${minutes}:${seconds}:0${mili}` : `0${minutes}:${seconds}:${mili}`}</>
        }
        if (String(seconds).length === 1) {
            return <>{String(mili).length === 1 ? `${minutes}:0${seconds}:0${mili}` : `${minutes}:0${seconds}:${mili}`}</>
        }
        return <>{String(mili).length === 1 ? `${minutes}:${seconds}:0${mili}` : `${minutes}:${seconds}:${mili}`}</>
    }

    return <div>

        <div>Resultat:</div>
        <div>{goodanswer + "/" + nbrQuestions}</div>
        {time ? <div>{convertTime(time)}</div> : "Wait"}
        {!send ? <button type='button' className='btn btn-secondary' onClick={setUp}>Enregistrer le résultat</button> : !sent ? <div>
            <input name='username' onChange={handleChange}></input> <button type='button' className='btn btn-secondary' onClick={() => handleRecord(user)}>OK</button>
        </div> : ""}
    </div>
}

export default Final