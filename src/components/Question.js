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


        return <div>
            <p>{this.handleTitle(questionType, answerType)}</p>
            <div className={questionType}>
                {this.props.answer ?
                    (questionType === "flag" ? <img src={require("../images/flag/" + this.props.answer[questionType].slice(-2) + ".png")} alt="drapeau" /> :
                        (questionType === "shape" ? <img src={require("../images/shape/" + this.props.answer["continent"] + "/" + this.props.answer["pk"].toLowerCase() + "/80.png")} alt="shape" /> : this.props.answer[questionType])) :
                    "Wait"}
            </div>
            <div className={[answerType, "TEST"].join(' ')} onClick={this.props.handleAnwser}>
                {choices ? choices.map((div, i) => {
                    return <div key={i} onClick={this.props.answer ? (div === this.props.answer ? this.goodAnswer : this.wrongAnswer) : ""}>
                        {answerType === "flag" ? <img src={require("../images/flag/" + div[answerType].slice(-2) + ".png")} alt="drapeau" /> :
                            (answerType === "shape" ? <img src={require("../images/shape/" + div["continent"] + "/" + div["pk"].toLowerCase() + "/80.png")} alt="shape" /> : div[answerType])}</div>
                }) : 'Wait'}
            </div>

        </div>

        //return <div>oui</div>

    }
}

export default Question