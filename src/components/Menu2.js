import { useEffect, useState } from "react"
import axios from "axios";
import CountryDescription from "./CountryDescription";
import { useNavigate } from "react-router-dom";

function Menu2() {
    var [countries, setCountries] = useState([]);
    var [quiz, setQuiz] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8000/country/')
            .then(res => {
                setCountries(res.data)
            })
        axios
            .get('http://localhost:8000/quiz/')
            .then(res => {
                setQuiz(res.data)
            })
    }, [])
    let navigator = useNavigate();

    const quizChoice = (q) => {
        let path = `../quiz/${q.pk}`;
        navigator(path)
        console.log(q)
    }


    var menu = <div>
        {quiz.map(q => {
            return <div key={`quiz-${q.pk}`} onClick={() => quizChoice(q)}>{`${q.name} (${q.nbr_question} questions)`}</div>
        })}
    </div>


    let rendu = countries.map(pay => {
        return <CountryDescription iso={pay.pk} name={pay.name} flag={pay.flag.slice(0, -2)} shape={pay.shape} cap={pay.capitale} key={pay.pk} cont={pay.continent} />
    });
    return <div>
        {menu}
        <div className="country-list">{rendu}</div>
    </div>;

}

export default Menu2