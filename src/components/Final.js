import axios from 'axios';

function Final({ goodanswer, nbrQuestions, time }) {

    const handleRecord = (user) => {
        axios.post('http://localhost:8000/record/', {
            "time": time,
            "user": user,
            "device": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/112.0",
            "quiz": "http://localhost:8000/quiz/1/",
            "points": goodanswer

        })
    }

    return <>
        <div>Resultat:</div>
        <div>{goodanswer + "/" + nbrQuestions}</div>
    </>
}

export default Final