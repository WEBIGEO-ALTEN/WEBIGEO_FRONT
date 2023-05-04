import React from "react";
import axios from 'axios';
import CountryDescription from './CountryDescription';
import '../style/style.css'

class Menu extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            countries: []
        }
    }

    componentDidMount() {

        axios
            .get('http://localhost:8000/country/')
            .then(res => {
                this.setState({ countries: res.data })
            })

    }

    render() {

        let rendu = this.state.countries.map(pay => {
            return <CountryDescription iso={pay.pk} name={pay.name} flag={pay.flag.slice(0, -2)} shape={pay.shape} cap={pay.capitale} key={pay.pk} cont={pay.continent} />
        });
        return <div className="country-list">{rendu}</div>;
    }

}

export default Menu