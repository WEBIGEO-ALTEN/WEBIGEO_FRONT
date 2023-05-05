import React from "react";
import axios from 'axios';
import CountryDescription from './CountryDescription';
import '../style/style.css'


class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            quiz: []
        };
        this.quizChoice = this.quizChoice.bind(this);
    }

    quizChoice(q) {


        //navigator(path);
    }

    componentDidMount() {

        axios
            .get('http://localhost:8000/country/')
            .then(res => {
                this.setState({ countries: res.data })
            })

        axios
            .get('http://localhost:8000/quiz/')
            .then(res => {
                this.setState({ quiz: res.data })
            })

    }

    render() {

        var quiz = this.state.quiz ? this.state.quiz : "";
        var menu = <div>
            {quiz.map(q => {
                return <div key={`quiz-${q.pk}`} onClick={() => this.quizChoice(q)}>{`${q.name} (${q.nbr_question} questions)`}</div>
            })}
        </div>


        let rendu = this.state.countries.map(pay => {
            return <CountryDescription iso={pay.pk} name={pay.name} flag={pay.flag.slice(0, -2)} shape={pay.shape} cap={pay.capitale} key={pay.pk} cont={pay.continent} />
        });
        return <div>
            {menu}
            <div className="country-list">{rendu}</div>
        </div>;
    }

}

export default Menu