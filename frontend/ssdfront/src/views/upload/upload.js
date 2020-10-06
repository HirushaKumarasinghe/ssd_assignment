import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Axios from 'axios';

import Config from "../../config";

import "./upload.css";

class Upload extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  async UNSAFE_componentWillMount(){
      await this.getOAuthCode();
  }

  async getOAuthCode() {
    await this.setState({
    });
      console.log(new URLSearchParams(this.props.location.search).get('code'));
    var ReqData = {
      AuthCode: new URLSearchParams(this.props.location.search).get('code')
    };

    await Axios.post(
      `${Config.host}${Config.port}${Config.api.getAuthorisation}`,
      ReqData
    )
      .then(async (Response) => {
        // this.setState({
        //   questions: Response.data.questions.questions,
        // });
        console.log(Response);
      })
      .catch((Error) => {
        console.error(Error);
        // if (Error.response.status >= 400 && Error.response.status <= 499) {
        //   alert("Sorry, Your session is expired or not authorized");
        // }
      })
      .finally(() => {
        // this.setState({ showQuestions: true, loading: false });
      });
  }


    render() {
        return (
            <div className="App">
                <div className="container">
      <div className="page-header text-center">
        <h1><span className="fa fa-anchor"></span> Profile Page</h1>
        <a href="/logout" className="btn btn-default btn-sm">Logout</a>
      </div>

      <div className="row">
        {/* <!-- GOOGLE INFORMATION --> */}
        <div className="col-sm-6">
          <div className="well">
            <h3 className="text-danger">
              <span className="fa fa-google-plus"></span> Google
            </h3>

            <p>
              {/* <strong>name</strong>: <%= name %> */}
              <br />
              <strong>pic:</strong>:
              {/* <img src="<%=pic%>" width="200" height="200" alt="" /> */}
            </p>
          </div>
        </div>

        <div className="col-sm-6">
          <div className="well">
            <h3 className="text-danger">
              <span className="fa fa-google-plus"></span> Upload File to Google
              Drive
            </h3>

            {/* <% if (success) { %>
            <div className="alert alert-success alert-dismissible">
              <a href="#" className="close" data-dismiss="alert" aria-label="close"
                >×</a
              >
              <strong>Success!</strong> Your Image File is Uploaded.
            </div>
            <%}%> */}
            <form action="/upload" method="POST" enctype="multipart/form-data">
              <div className="form-group">
                <input
                  type="file"
                  className="form-control"
                  name="file"
                  required
                  id=""
                />
              </div>
              <div className="form-group">
                <button className="btn btn-block btn-danger">
                  Upload File
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
                <div className="waveWrapper waveAnimation">
                    <div className="waveWrapperInner bgTop">
                        <div className="wave waveTop" style={{ backgroundImage: "url('http://front-end-noobs.com/jecko/img/wave-top.png')" }}></div>
                    </div>
                    <div className="waveWrapperInner bgMiddle">
                        <div className="wave waveMiddle" style={{ backgroundImage: "url('http://front-end-noobs.com/jecko/img/wave-mid.png')" }}></div>
                    </div>
                    <div className="waveWrapperInner bgBottom">
                        <div className="wave waveBottom" style={{ backgroundImage: "url('http://front-end-noobs.com/jecko/img/wave-bot.png')" }}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Upload;