import axios from 'axios';
import { useState } from 'react';

function Final({ updateRecord, goodanswer, nbrQuestions, time, id }) {

    const [user, setUser] = useState("");
    const [send, setSend] = useState(false);
    const [sent, setSent] = useState(false);
    const setUp = () => {
        setSend(true);

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

    return <>

        <div>Resultat:</div>
        <div>{goodanswer + "/" + nbrQuestions}</div>
        {!send ? <div onClick={setUp}>Enregistrer le résultat</div> : !sent ? <div>
            <input name='username' onChange={handleChange}></input> <div onClick={() => handleRecord(user)}>OK</div>
        </div> : ""}
    </>
}

export default Final