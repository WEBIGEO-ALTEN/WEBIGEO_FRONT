import React from "react"
import "../style/style.css"



class Question extends React.Component {

    constructor(props) {
        super(props)

        this.goodAnswer = this.goodAnswer.bind(this)
        this.wrongAnswer = this.wrongAnswer.bind(this)
        this.gogoShuff = this.gogoShuff.bind(this)
    }

    goodAnswer() {
        this.props.handleGoodAnswer()


    }
    wrongAnswer() {
        this.props.handleWrongAnswer();

    }

    handleTitle(q, a) {
        var trad = {
            "flag": "drapeau",
            "name": "pays",
            "capitale": "capitale",
            "shape": "forme"
        };

        return `Quel(le) ${trad[a]} a pour ${trad[q]}:`
    }

    gogoShuff(xx) {
        return xx.map(x => [x, Math.random()]).sort((a, b) => a[1] - b[1]).map(x => x[0])
    };

    render() {

        var type_question = this.props.type_question;
        var questionTypes = String(type_question[0]).split('-');
        var answerTypes = String(type_question[1]).split('-');

        var questionType = this.gogoShuff([...questionTypes]).slice(0, 1)[0];
        var answerType = this.gogoShuff(answerTypes.filter(typ => typ !== questionType)).slice(0.1)[0];

        var choices = this.props.choice ? this.gogoShuff(this.props.choice.concat(this.props.answer)) : [];
        // this.props.answer[questionType].slice(0, -2) 
        // div[answerType].slice(0, -2)

        var customWeight = questionType === "flag" ? "" : "w-75";
        var customBgColor = answerType === "name" || answerType === "capitale" ? "bg-warning m-2 w-40" : "";
        return <div className="h-75 w-100">

            <div className={`h-50 ${questionType}p-3 d-flex flex-column align-items-center`}>
                <div className="h-25">
                    <p>{this.handleTitle(questionType, answerType)}</p>
                </div>
                <div className={`h-75 d-flex justify-content-center align-items-center ${customWeight} border border-warning text-uppercase`}>
                    {this.props.answer ?
                        (questionType === "flag" ? <img src={require("../images/w640/" + this.props.answer[questionType].slice(-2) + ".png")} alt="drapeau" className="img-fluid img-responsive border border-white" /> :
                            (questionType === "shape" ? <img src={require("../images/shape/" + this.props.answer["continent"] + "/" + this.props.answer["pk"].toLowerCase() + "/256.png")} alt="shape" className="img-fluid img-responsive p-2" /> :
                                <h1>{this.props.answer[questionType]}</h1>)) :
                        "Wait"}
                </div>
            </div>
            <div className={`${answerType} h-50 d-flex-column justify-content-center p-2 text-dark text-uppercase text-adjust`} onClick={this.props.handleAnwser}>
                {choices ?
                    <>
                        <div className="row h-50 p-2 w-100 d-flex justify-content-center">
                            <div key="choice-0" className={`col-6 h-100 d-flex justify-content-center align-items-center ${customBgColor} `} onClick={this.props.answer ? (choices[0] === this.props.answer ? this.goodAnswer : this.wrongAnswer) : ""}>
                                {answerType === "flag" ? <img src={require("../images/w640/" + choices[0][answerType].slice(-2) + ".png")} alt="drapeau" className="img-fluid img-responsive border border-white" /> :
                                    (answerType === "shape" ? <img src={require("../images/shape/" + choices[0]["continent"] + "/" + choices[0]["pk"].toLowerCase() + "/256.png")} alt="shape" className="img-fluid img-responsive border border-black p-2" /> :
                                        <h2>{choices[0][answerType]}</h2>)}</div>
                            <div key="choice-1" className={`col-6 h-100 d-flex justify-content-center align-items-center ${customBgColor} `} onClick={this.props.answer ? (choices[1] === this.props.answer ? this.goodAnswer : this.wrongAnswer) : ""}>
                                {answerType === "flag" ? <img src={require("../images/w640/" + choices[1][answerType].slice(-2) + ".png")} alt="drapeau" className="img-fluid img-responsive border border-white" /> :
                                    (answerType === "shape" ? <img src={require("../images/shape/" + choices[1]["continent"] + "/" + choices[1]["pk"].toLowerCase() + "/256.png")} alt="shape" className="img-fluid img-responsive border border-black p-2" /> :
                                        <h2>{choices[1][answerType]}</h2>)}</div>
                        </div>
                        <div className="row h-50 w-100 mt-2 p-2 d-flex justify-content-center">
                            <div key="choice-2" className={`col-6 h-100 d-flex justify-content-center align-items-center ${customBgColor} `} onClick={this.props.answer ? (choices[2] === this.props.answer ? this.goodAnswer : this.wrongAnswer) : ""}>
                                {answerType === "flag" ? <img src={require("../images/w640/" + choices[2][answerType].slice(-2) + ".png")} alt="drapeau" className="img-fluid img-responsive border border-white" /> :
                                    (answerType === "shape" ? <img src={require("../images/shape/" + choices[2]["continent"] + "/" + choices[2]["pk"].toLowerCase() + "/256.png")} alt="shape" className="img-fluid img-responsive border border-black p-2" /> :
                                        <h2>{choices[2][answerType]}</h2>)}</div>
                            <div key="choice-3" className={`col-6 h-100 d-flex justify-content-center align-items-center ${customBgColor} `} onClick={this.props.answer ? (choices[3] === this.props.answer ? this.goodAnswer : this.wrongAnswer) : ""}>
                                {answerType === "flag" ? <img src={require("../images/w640/" + choices[3][answerType].slice(-2) + ".png")} alt="drapeau" className="img-fluid img-responsive border border-white" /> :
                                    (answerType === "shape" ? <img src={require("../images/shape/" + choices[3]["continent"] + "/" + choices[3]["pk"].toLowerCase() + "/256.png")} alt="shape" className="img-fluid img-responsive border border-black p-2" /> :
                                        <h2>{choices[3][answerType]}</h2>)}</div>
                        </div>
                    </>
                    : 'Wait'}
            </div>

        </div>

        //return <div>oui</div>

    }
}

export default Question