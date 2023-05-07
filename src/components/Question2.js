import "../style/style.css"

function Question2({ type_question, handleWrongAnswer, handleGoodAnswer, handleAnwser, choice, answer, countries }) {

    const goodAnswer = () => {
        handleGoodAnswer();
    }

    const wrongAnswer = () => {
        handleWrongAnswer();
    }

    const handleTitle = (q, a) => {
        var trad = {
            "flag": "drapeau",
            "name": "pays",
            "capitale": "capitale",
            "shape": "forme"
        };

        return `Quel(le) ${trad[a]} a pour ${trad[q]}:`
    }

    const gogoShuff = (xx) => {
        return xx.map(x => [x, Math.random()]).sort((a, b) => a[1] - b[1]).map(x => x[0])
    };

    const sortCountry = (arr, answer) => {
        var arrAux = arr.filter(pay => pay !== answer)
        arrAux.sort((a, b) => {
            const lat1 = answer.lat, lat2 = b.lat, lon1 = answer.lon, lon2 = b.lon, lat3 = a.lat, lon3 = a.lon;
            const φ1 = lat1 * Math.PI / 180, φ2 = lat2 * Math.PI / 180, Δλ1 = (lon2 - lon1) * Math.PI / 180, R = 6371e3;
            const φ3 = lat3 * Math.PI / 180, Δλ2 = (lon3 - lon1) * Math.PI / 180;
            const d1 = Math.acos(Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ1)) * R;
            const d2 = Math.acos(Math.sin(φ1) * Math.sin(φ3) + Math.cos(φ1) * Math.cos(φ3) * Math.cos(Δλ2)) * R;

            return d2 - d1
        })

        return arrAux;

    }


    // We chose 3 other countries to populate the answers, the 3 can't be the answer
    var choices = answer ? gogoShuff(sortCountry(countries, answer).slice(0, 10)).slice(0, 3) : "";





    var questionTypes = String(type_question[0]).split('-');
    var answerTypes = String(type_question[1]).split('-');

    var questionType = gogoShuff([...questionTypes]).slice(0, 1)[0];
    var answerType = gogoShuff(answerTypes.filter(typ => typ !== questionType)).slice(0.1)[0];

    choices = choices ? gogoShuff(choices.concat(answer)) : "";
    // answer[questionType].slice(0, -2) 
    // div[answerType].slice(0, -2)

    var customWeight = questionType === "flag" ? "" : "w-75";
    var customBgColor = answerType === "name" || answerType === "capitale" ? "bg-warning m-2 w-40" : "";
    return <div className="h-75 w-100">

        <div className={`h-50 ${questionType}p-3 d-flex flex-column align-items-center`}>
            <div className="h-25">
                <p>{handleTitle(questionType, answerType)}</p>
            </div>
            <div className={`h-75 d-flex justify-content-center align-items-center ${customWeight} border border-warning text-uppercase`}>
                {answer ?
                    (questionType === "flag" ? <img src={require("../images/w640/" + answer[questionType].slice(-2) + ".png")} alt="drapeau" className="img-fluid img-responsive border border-white" /> :
                        (questionType === "shape" ? <img src={require("../images/shape/" + answer["continent"] + "/" + answer["pk"].toLowerCase() + "/256.png")} alt="shape" className="img-fluid img-responsive p-2" /> :
                            <h1>{answer[questionType]}</h1>)) :
                    "Wait"}
            </div>
        </div>
        <div className={`${answerType} h-50 d-flex-column justify-content-center p-2 text-dark text-uppercase text-adjust`} onClick={handleAnwser}>
            {choices ?
                <>
                    <div className="row h-50 p-2 w-100 d-flex justify-content-center">
                        <div key="choice-0" className={`col-6 h-100 d-flex justify-content-center align-items-center ${customBgColor} `} onClick={answer ? (choices[0] === answer ? goodAnswer : wrongAnswer) : () => ""}>
                            {answerType === "flag" ? <img src={require("../images/w640/" + choices[0][answerType].slice(-2) + ".png")} alt="drapeau" className="img-fluid img-responsive border border-white" /> :
                                (answerType === "shape" ? <img src={require("../images/shape/" + choices[0]["continent"] + "/" + choices[0]["pk"].toLowerCase() + "/256.png")} alt="shape" className="img-fluid img-responsive border border-black p-2" /> :
                                    <h2>{choices[0][answerType]}</h2>)}</div>
                        <div key="choice-1" className={`col-6 h-100 d-flex justify-content-center align-items-center ${customBgColor} `} onClick={answer ? (choices[1] === answer ? goodAnswer : wrongAnswer) : () => ""}>
                            {answerType === "flag" ? <img src={require("../images/w640/" + choices[1][answerType].slice(-2) + ".png")} alt="drapeau" className="img-fluid img-responsive border border-white" /> :
                                (answerType === "shape" ? <img src={require("../images/shape/" + choices[1]["continent"] + "/" + choices[1]["pk"].toLowerCase() + "/256.png")} alt="shape" className="img-fluid img-responsive border border-black p-2" /> :
                                    <h2>{choices[1][answerType]}</h2>)}</div>
                    </div>
                    <div className="row h-50 w-100 mt-2 p-2 d-flex justify-content-center">
                        <div key="choice-2" className={`col-6 h-100 d-flex justify-content-center align-items-center ${customBgColor} `} onClick={answer ? (choices[2] === answer ? goodAnswer : wrongAnswer) : () => ""}>
                            {answerType === "flag" ? <img src={require("../images/w640/" + choices[2][answerType].slice(-2) + ".png")} alt="drapeau" className="img-fluid img-responsive border border-white" /> :
                                (answerType === "shape" ? <img src={require("../images/shape/" + choices[2]["continent"] + "/" + choices[2]["pk"].toLowerCase() + "/256.png")} alt="shape" className="img-fluid img-responsive border border-black p-2" /> :
                                    <h2>{choices[2][answerType]}</h2>)}</div>
                        <div key="choice-3" className={`col-6 h-100 d-flex justify-content-center align-items-center ${customBgColor} `} onClick={answer ? (choices[3] === answer ? goodAnswer : wrongAnswer) : () => ""}>
                            {answerType === "flag" ? <img src={require("../images/w640/" + choices[3][answerType].slice(-2) + ".png")} alt="drapeau" className="img-fluid img-responsive border border-white" /> :
                                (answerType === "shape" ? <img src={require("../images/shape/" + choices[3]["continent"] + "/" + choices[3]["pk"].toLowerCase() + "/256.png")} alt="shape" className="img-fluid img-responsive border border-black p-2" /> :
                                    <h2>{choices[3][answerType]}</h2>)}</div>
                    </div>
                </>
                : 'Wait'}
        </div>

    </div>
}

export default Question2