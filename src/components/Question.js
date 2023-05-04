import React from "react"
import "../style/style.css"



class Question extends React.Component {

    constructor(props) {
        super(props)

        this.goodAnswer = this.goodAnswer.bind(this)
        this.wrongAnswer = this.wrongAnswer.bind(this)
    }

    goodAnswer() {
        this.props.handleGoodAnswer()
        console.log('oui')
    }
    wrongAnswer() {
        this.props.handleWrongAnswer();
        console.log('non')
    }

    handleTitle(q, a) {
        var trad = {
            "flag": "drapeau",
            "name": "pays",
            "capitale": "capitale"
        };

        return `Quel(le) ${trad[a]} a pour ${trad[q]}:`
    }

    render() {

        var type_question = this.props.type_question;
        var questionTypes = String(type_question[0]).split('-');
        var answerTypes = String(type_question[1]).split('-');

        var questionType = [...questionTypes].sort(() => 0.5 - Math.random()).slice(0, 1)[0];
        var answerType = answerTypes.filter(typ => typ !== questionType).sort(() => 0.5 - Math.random()).slice(0.1)[0];

        var choices = this.props.choice ? this.props.choice.concat(this.props.answer).sort(() => 0.5 - Math.random()) : [];
        // this.props.answer[questionType].slice(0, -2) 
        // div[answerType].slice(0, -2)

        return <div >
            <p>{this.handleTitle(questionType, answerType)}</p>
            <div className={questionType}>{this.props.answer ? (questionType !== "flag" ? this.props.answer[questionType] : <img src={require("../images/flag/" + this.props.answer[questionType].slice(-2) + ".png")} alt="drapeau" />) : "Wait"}</div>
            <div className={[answerType, "TEST"].join(' ')} onClick={this.props.handleAnwser}>
                {choices ? choices.map((div, i) => {
                    return <div key={i} onClick={this.props.answer ? (div === this.props.answer ? this.goodAnswer : this.wrongAnswer) : ""}>{answerType !== "flag" ? div[answerType] : <img src={require("../images/flag/" + div[answerType].slice(-2) + ".png")} alt="drapeau" />}</div>
                }) : 'Wait'}
            </div>

        </div>

        //return <div>oui</div>

    }
}

export default Question