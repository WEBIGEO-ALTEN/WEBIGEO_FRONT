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
            records: [],
            currQuestion: 1,
            goodanswer: 0,
            good: false,
        }

        this.handleAnwser = this.handleAnwser.bind(this);
        this.handleGoodAnswer = this.handleGoodAnswer.bind(this);
        this.handleWrongAnswer = this.handleWrongAnswer.bind(this);
        this.saveTime = this.saveTime.bind(this);
        this.updateRecord = this.updateRecord.bind(this)
    }

    sortCountry(arr, answer) {
        return arr.filter(pay => pay !== answer)
    }

    componentDidMount() {


        console.log(this.props)
        axios
            // Get our quiz options
            .get('http://localhost:8000/quiz/')
            .then(res => {

                this.setState({ quiz: res.data[0] }, () => {
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

                    axios.get('http://localhost:8000/record/?quiz=1')
                        .then(res => {
                            this.setState({ records: res.data })
                        })

                })

            })


    }

    handleAnwser() {

        this.setState({ currQuestion: this.state.currQuestion + 1 })


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

    convertTime(time) {

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

    saveTime(time) {
        this.setState({ time: time })

    }

    updateRecord(record) {
        this.setState({ records: this.state.records.concat(record) })
    }

    render() {


        //const continents = this.state.quiz.continents;
        //const difficulty = this.state.quiz.difficulty;
        //const answer_difficulty = this.state.quiz.answer_difficulty;

        const type_question = String(this.state.quiz.type_questions).split('_');

        const name = this.state.quiz.name;
        var pay = this.state.choices && this.state.currQuestion ? this.state.answers[this.state.currQuestion - 2] : "Wait";
        var records = this.state.records ? this.state.records : "No record yet";

        records.sort((a, b) => {
            return a.points === b.points ? Number(a.time) - Number(b.time) : b.points - a.points;
        })

        let recordTable = <table>
            <tbody>
                <tr>
                    <td>User</td>
                    <td>Points</td>
                    <td>Temps</td>
                </tr>
                {records.map((record, i) => {
                    return (
                        <tr key={`record-${i}`}>
                            <td>{record.user}</td>
                            <td>{record.points}</td>
                            <td>{this.convertTime(Number(record.time))}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>

        return <div>

            <h1>{name}</h1>
            {this.state.currQuestion <= this.state.choices.length ? <Timer active={this.state.currQuestion <= this.state.choices.length} saveTime={this.saveTime} /> : ""}

            <h2>{this.state.currQuestion <= this.state.choices.length ? this.state.currQuestion + "/" + this.state.choices.length : ""}</h2>
            <>

                {this.state.currQuestion <= this.state.choices.length ?
                    <Question type_question={type_question} handleWrongAnswer={this.handleWrongAnswer} handleGoodAnswer={this.handleGoodAnswer} handleAnwser={this.state.currQuestion <= this.state.choices.length ? this.handleAnwser : ""} choice={this.state.choices[this.state.currQuestion - 1]} answer={this.state.answers[this.state.currQuestion - 1]} /> :
                    <>{this.state.time ? <Final updateRecord={this.updateRecord} goodanswer={this.state.goodanswer} nbrQuestions={this.state.choices.length} time={this.state.time} /> : "Wait"}
                        {this.state.time ? <div>{this.convertTime(this.state.time)}</div> : "Wait"}
                        {recordTable}</>}
                <div className={this.state.good ? "green" : "red"}>{pay && 2 <= this.state.currQuestion && this.state.currQuestion <= this.state.choices.length ? <CountryDescription iso={pay.pk} name={pay.name} flag={pay.flag.slice(0, -2)} shape={pay.shape} cap={pay.capitale} key={pay.pk} cont={pay.continent} /> : ""}</div>
            </>

        </div>
    }
}


export default Quiz