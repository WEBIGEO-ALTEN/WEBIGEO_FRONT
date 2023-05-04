import React from 'react';
import axios from 'axios';
import Question from './Question';
import Final from './Final';
import CountryDescription from './CountryDescription';
import Timer from './Timer';

class Quiz extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            quiz: [],
            countries: [],
            answers: [],
            choices: [],
            currQuestion: 1,
            goodanswer: 0,
            good: false,
        }

        this.handleAnwser = this.handleAnwser.bind(this);
        this.handleGoodAnswer = this.handleGoodAnswer.bind(this);
        this.handleWrongAnswer = this.handleWrongAnswer.bind(this);
    }

    sortCountry(arr, answer) {
        return arr.filter(pay => pay !== answer)
    }

    componentDidMount() {



        axios
            // Get our quiz options
            .get('http://localhost:8000/quiz/')
            .then(res => {

                this.setState({ quiz: res.data[2] }, () => {
                    // We collect our countries for the specifics continents
                    axios.get('http://localhost:8000/country/?continent=' + this.state.quiz.continents)
                        .then(res => {

                            this.setState({ countries: res.data }, function () {

                                // The number of questions can't be higher than the number of country in the area
                                const nbrQuestions = Math.min(this.state.quiz.nbr_question, this.state.countries.length);
                                // We chose an answer for each question

                                var answerCountries = [...this.state.countries].sort(() => 0.5 - Math.random()).slice(0, nbrQuestions);
                                var choicesArr = [];
                                for (var i = 0; i < nbrQuestions; i++) {
                                    // We chose 3 other countries to populate the answers, the 3 can't be the answer
                                    var choices = this.sortCountry(this.state.countries, answerCountries[i]).sort(() => 0.5 - Math.random()).slice(0, 3);
                                    choicesArr.push(choices);
                                }



                                this.setState({
                                    answers: answerCountries,
                                    choices: choicesArr
                                })
                            });
                        })

                })

            })


    }

    handleAnwser() {

        this.setState({ currQuestion: this.state.currQuestion + 1 })
        console.log('click')

    }

    handleGoodAnswer() {
        this.setState({
            goodanswer: this.state.goodanswer + 1,
            good: true
        })
    }
    handleWrongAnswer() {
        this.setState({ good: false })
    }

    render() {

        //const continents = this.state.quiz.continents;
        //const difficulty = this.state.quiz.difficulty;
        //const answer_difficulty = this.state.quiz.answer_difficulty;

        const type_question = String(this.state.quiz.type_questions).split('_');

        const name = this.state.quiz.name;
        var pay = this.state.choices && this.state.currQuestion ? this.state.answers[this.state.currQuestion - 2] : "Wait";

        return <div>
            <h1>{name}</h1>
            <h2>{this.state.currQuestion <= this.state.choices.length ? this.state.currQuestion + "/" + this.state.choices.length : ""}</h2>
            <>

                {this.state.currQuestion <= this.state.choices.length ? <Question type_question={type_question} handleWrongAnswer={this.handleWrongAnswer} handleGoodAnswer={this.handleGoodAnswer} handleAnwser={this.state.currQuestion <= this.state.choices.length ? this.handleAnwser : ""} choice={this.state.choices[this.state.currQuestion - 1]} answer={this.state.answers[this.state.currQuestion - 1]} /> : <Final goodanswer={this.state.goodanswer} nbrQuestions={this.state.choices.length} />}
                <div className={this.state.good ? "green" : "red"}>{pay && 2 <= this.state.currQuestion && this.state.currQuestion <= this.state.choices.length ? <CountryDescription iso={pay.pk} name={pay.name} flag={pay.flag.slice(0, -2)} shape={pay.shape} cap={pay.capitale} key={pay.pk} cont={pay.continent} /> : ""}</div>
            </>
            <Timer active={this.state.currQuestion <= this.state.choices.length} />
        </div>
    }
}


export default Quiz