import React from "react";


class CountryDescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: true
        };
    }

    render() {

        console.log(this.props.shape.split('/').slice(3, 4)[0])
        return <div className="country">
            <h1>{this.props.name}</h1>
            <img src={require("../images/flag/" + this.props.iso.toLowerCase() + ".png")} alt={this.props.iso} />
            <img src={require("../images/shape/" + this.props.shape.split('/').slice(3, 4)[0] + "/" + this.props.iso.toLowerCase() + "/80.png")} alt={this.props.iso} />
            <p>La capitale de {this.props.name} est {this.props.cap}.</p>
        </div>
    }

}

export default CountryDescription