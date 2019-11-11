import React from "react";
import { connect } from "react-redux";
import { fetchGreetingsData } from "../store";

class About extends React.Component {

    componentDidMount() {
        this.props.fetchGreetingsData();
    }

    render() {
        const { greetings } = this.props;
        return (
            <div>
                <h2>About {greetings}</h2>                
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
