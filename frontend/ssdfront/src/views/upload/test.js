import React, { Component } from "react";
import Question from "../Appraisal/Question";
import Axios from "axios";

import Config from "../../Config";
import Loading from "../Loading/Loading";
// import "./Survey.css";

class Survey extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      questions: [],
    };
  }

  async UNSAFE_componentWillMount(){
      await this.getQuestions();
  }

  async getQuestions() {
    await this.setState({
      loading: true,
    });

    var ReqData = {
      token: this.props.match.params.id,
    };

    await Axios.post(
      `${Config.host}${Config.port}${Config.api.getEmaildSurvayQuestions}`,
      ReqData
    )
      .then(async (Response) => {
        this.setState({
          questions: Response.data.questions.questions,
        });
      })
      .catch((Error) => {
        console.error(Error);
        // if (Error.response.status >= 400 && Error.response.status <= 499) {
        //   alert("Sorry, Your session is expired or not authorized");
        // }
      })
      .finally(() => {
        this.setState({ showQuestions: true, loading: false });
      });
  }

  render() {
    var questionsList = this.state.questions.map((data, i) => {
      return <Question data={data} key={i} />;
    });
    return (
      <div className="container-fluid AP_main">
        <Loading show={this.state.loading} />
        {this.state.showQuestions ? (
          <div className="container">
            <h1>Survay Question</h1>
            <hr />
            {questionsList}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Survey;