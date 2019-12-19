import React from "react";
import { connect } from "react-redux";
import { fetchGreetingsData } from "../store";

class About extends React.Component {

    constructor(props) {
        super(props);
        this.buttonClick = this.buttonClick.bind(this);
    }

    componentDidMount() {
        this.props.fetchGreetingsData();
    }

    buttonClick() {
        alert('button click')
    }

    render() {
        const { greetings } = this.props;
        return (
            <div>
                <h2>About {greetings}</h2> 
                <button onClick={this.buttonClick}>Click here</button>               
            </div>
       );
    }
}

About.serverFetch = fetchGreetingsData; // static declaration of data requirements

const mapStateToProps = (state) => ({
    greetings : state.greetings,
});

const mapDispatchToProps = {
    fetchGreetingsData,
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
