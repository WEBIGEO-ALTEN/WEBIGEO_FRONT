import React from "react";


class CountryDescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: true
        };
    }

    render() {


        return <div className="d-flex flex-column align-items-center">
            <h3>{this.props.name}</h3>
            <div>
                <img className="border border-white" src={require("../images/flag/" + this.props.iso.toLowerCase() + ".png")} alt={this.props.iso} />
                <img className="m-2" src={require("../images/shape/" + this.props.shape.split('/')[3] + "/" + this.props.iso.toLowerCase() + "/80.png")} alt={this.props.iso} />
            </div>
            <p>Capitale: {this.props.cap}.</p>
        </div>
    }

}

export default CountryDescription