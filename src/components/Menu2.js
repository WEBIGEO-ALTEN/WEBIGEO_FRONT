import { useEffect, useState } from "react"
import axios from "axios";
import CountryDescription from "./CountryDescription";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import flag from "../images/flags.png";
import '../style/style.css'

function Menu2() {
    var [countries, setCountries] = useState([]);
    var [quiz, setQuiz] = useState([]);
    var [types, setTypes] = useState("");
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

    var backgrounds = {
        "FLAG": { flag },
        "CAPITALE": "",
        "SHAPE": "",
        "ALL": "",
    }

    const quizChoice = (q) => {
        let path = `../quiz/${q.pk}`;
        navigator(path)
        console.log(q)
    }

    var quizNames = quiz ? quiz.map(q => q.name) : [];
    var quizTypes = quizNames ? new Set(quizNames.map(name => name.split('_')[1].toUpperCase())) : [];
    var quesionnaries = quizTypes ? Object.fromEntries([...quizTypes].map(type => [type, quizNames.filter(name => name.split('_')[1].toUpperCase() === type).map(name => name.split('_')[0].toUpperCase())])) : {};


    var menu = <div>
        {quiz.map(q => {
            return <div key={`quiz-${q.pk}`} onClick={() => quizChoice(q)}>{`${q.name} (${q.nbr_question} questions)`}</div>
        })}
    </div>

    const handleType = (ev) => {
        setTypes(ev.target.textContent);
    }
    let rendu = countries.map(pay => {
        return <CountryDescription iso={pay.pk} name={pay.name} flag={pay.flag.slice(0, -2)} shape={pay.shape} cap={pay.capitale} key={pay.pk} cont={pay.continent} />
    });
    return <div className="bg-dark d-flex flex-column align-items-center h-100">
        <Header />
        {Object.keys(quesionnaries).map((type, i) => {


            if (types === "") { return <div className={`${type} w-50 h-25 bg-warning text-dark m-2 d-flex justify-content-center align-items-center`} key={`type-${i}`} onClick={handleType}><h1>{type}</h1></div> }
            else {
                if (type === types) {

                    var names = quesionnaries[types].map((name, j) => {

                        return <div className="w-50 h-25 bg-warning text-dark m-2 d-flex justify-content-center align-items-center" key={`type-${types}-name-${j}`} onClick={() => quizChoice(quiz.filter(q => q.name.toUpperCase() === `${name}_${types}`.toUpperCase())[0])}>{name}</div>
                    })
                    return <>
                        {names}
                        <button type="button" className="btn btn-secondary" onClick={() => setTypes("")}>↩</button>
                    </>
                }
            }
        })}


    </div>;

}

export default Menu2