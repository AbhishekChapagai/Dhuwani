import axios from "axios";
import React, { Component } from 'react';
import './Question.css';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

class Questions extends Component {
    state = {
        productId: this.props.dataFromParent,
        firstName: '',
        lastName: '',
        askQuestion: '',
        answer: '',
        questions: [],
        config: {
            headers: { 'authorization': `Bearer ${localStorage.getItem('token')}` }
        }

    }
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });

    }
    submitData = (e) => {

        e.preventDefault();
        const question_data = { productId: this.state.productId, firstName: this.state.firstName, lastName: this.state.lastName, askQuestion: this.state.askQuestion, answer: this.state.answer }
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/question/ask`, question_data, this.state.config)
            .then((response) => {
                window.location.href = ""
                this.setState({
                    success: response.data.success

                })
            })
            .catch((err) => {
                console.log(err.response);

                this.setState({
                    success: err.response.data.success
                })
            })
    }
    updateData = (e) => {

        e.preventDefault();
        const question_data = { productId: this.state.productId, firstName: this.state.firstName, lastName: this.state.lastName, askQuestion: this.state.askQuestion, answer: this.state.answer }
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/question/answer/update/`, question_data, this.state.config)
            .then((response) => {
                window.location.href = ""
                this.setState({
                    success: response.data.success

                })
            })
            .catch((err) => {
                console.log(err.response);

                this.setState({
                    success: err.response.data.success
                })
            })
    }

    componentDidMount() {

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/productone/question/${this.state.productId}`)
            .then((response) => {
                console.log(response)
                this.setState({
                    questions: response.data.data
                })
            })
            .catch((err) => {
                console.log(err.response)
            })
    }


    render() {
        if (localStorage.getItem('token')) {
            if (localStorage.getItem('userType') === "User") {
                var Questions = <>

                    <div className="container mt-5 mb-5">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card_questions">
                                    <div className="card-div d-flex flex-column">
                                        <h3 className="font-weight-bold">Questions About this product</h3>
                                    </div>
                                    <div className="card-div-2">
                                        <div className="px-1">
                                            <div className="Question_text"><input type="text" className="form-control" name="askQuestion" placeholder="Have a question?" value={this.state.askQuestion} {...this.state.firstName} onChange={this.changeHandler} />
                                                <button onClick={this.submitData}>Ask Questions</button></div>
                                        </div>
                                    </div>
                                    <div className="card question-card p-3">
                                        <div className="Ques-title"> <p>Other User Questions</p> </div>
                                        <div className="question_border"></div>

                                        {this.state.questions.map((q) => {
                                            return (
                                                <>
                                                    {q.answer ?

                                                        <>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="user d-flex flex-row align-items-center ques-icon"> <i className="fas fa-question-circle"></i>
                                                                    <span> <small className=" ques">{q.askQuestion} </small></span> </div>
                                                            </div>

                                                            <div >
                                                                <small className=" username_ques">asked by {q.firstName} {q.lastName}
                                                                </small>
                                                            </div>

                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="user d-flex flex-row align-items-center"> <i className="fab fa-autoprefixer"></i>
                                                                    <span> <small className="font-weight-bold ques">{q.answer}</small></span> </div>
                                                            </div>

                                                            <div className="question_border">
                                                                <small className="username_ques ">Replied by Dhuwani Staff</small>
                                                            </div>
                                                        </>
                                                        :
                                                        <>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="user d-flex flex-row align-items-center"> <i className="fas fa-question-circle"></i>
                                                                    <span> <small className=" ques">{q.askQuestion}</small></span> </div>
                                                            </div>
                                                            <div >
                                                                <small className=" username_ques"> asked by {q.firstName} {q.lastName}</small>
                                                            </div>
                                                            <div className="question_border">

                                                            </div>
                                                        </>
                                                    }
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </>
            }
            else if (localStorage.getItem('userType') === "Admin") {
                var Questions = <>

                    <div className="container mt-5 mb-5">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card_questions">
                                    <div className="card-div d-flex flex-column">
                                        <h3 className="font-weight-bold">Questions About this product</h3>
                                    </div>
                                    <div className="card-div-2">
                                        <div className="px-1">
                                            <div className="Question_text"><input type="text" className="form-control" name="askQuestion" placeholder="Have a question?" value={this.state.askQuestion} {...this.state.firstName} onChange={this.changeHandler} />
                                                <button onClick={this.submitData}>Ask Questions</button></div>
                                        </div>
                                    </div>
                                    <div className="card question-card p-3">
                                        <div className="Ques-title"> <p>Other User Questions</p> </div>
                                        <div className="question_border"></div>

                                        {this.state.questions.map((q) => {
                                            return (
                                                <>
                                                    {q.answer ?
                                                        <>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="user d-flex flex-row align-items-center ques-icon"> <i className="fas fa-question-circle"></i>
                                                                    <span> <small className=" ques">{q.askQuestion} </small></span> </div>
                                                            </div>
                                                            <div >
                                                                <small className=" username_ques">asked by {q.firstName} {q.lastName}
                                                                </small>
                                                            </div>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="user d-flex flex-row align-items-center"> <i className="fab fa-autoprefixer"></i>
                                                                    <span> <small className="font-weight-bold ques">{q.answer}</small></span> </div>
                                                            </div>

                                                            <div className="question_border">
                                                                <small className="username_ques ">Replied by Dhuwani Staff</small>
                                                            </div>
                                                        </>
                                                        :
                                                        <>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="user d-flex flex-row align-items-center"> <i className="fas fa-question-circle"></i>
                                                                    <span> <small className=" ques">{q.askQuestion}</small></span> </div>
                                                            </div>
                                                            <div >
                                                                <small className=" username_ques"> asked by {q.firstName} {q.lastName}
                                                                    <Popup trigger={<text className="trigger-rep">Reply</text>} position="left center">
                                                                        <div><input className="input-reply" type="text" name= "answer" value={this.state.answer} onChange={this.changeHandler}></input><button onClick={this.updateData}>submit</button></div>
                                                                    </Popup>
                                                                </small>
                                                            </div>
                                                            <div className="question_border">

                                                            </div>
                                                        </>
                                                    }
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </>
            }
            else {
                var Questions = <>

                    <div className="container mt-5 mb-5">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card_questions">
                                    <div className="card-div d-flex flex-column">
                                        <h3 className="font-weight-bold">Questions About this product</h3>
                                    </div>
                                    <div className="card-div-2">
                                        <div className="px-1">
                                            <div className="Question_text"><input type="text" className="form-control" name="askQuestion" placeholder="Have a question?" value={this.state.askQuestion} {...this.state.firstName} onChange={this.changeHandler} />
                                                <button onClick={this.submitData}>Ask Questions</button></div>
                                        </div>
                                    </div>
                                    <div className="card question-card p-3">
                                        <p>Other User Questions</p>

                                        {this.state.questions.map((q) => {
                                            return (
                                                <>
                                                    {q.answer ?

                                                        <>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="user d-flex flex-row align-items-center"> {<i className="fas fa-question-circle"></i>}
                                                                    <span> <small className=" ques">{q.askQuestion}</small></span> </div>
                                                            </div>
                                                            <div >
                                                                <small className=" username_ques"> {q.firstName} {q.lastName}</small>
                                                                ffffffffffffffff
                                                            </div>

                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="user d-flex flex-row align-items-center"> <i className="fab fa-autoprefixer"></i>
                                                                    <span> <small className="font-weight-bold ques">{q.answer}</small></span> </div>
                                                            </div>
                                                            <div className="question_border">
                                                                <small className="username_ques ">Replied by Dhuwani Staff</small>
                                                            </div>
                                                        </>
                                                        :
                                                        <>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="user d-flex flex-row align-items-center"> <i className="fas fa-question-circle"></i>
                                                                    <span> <small className=" ques">{q.askQuestion}</small></span> </div>
                                                            </div>
                                                            <div >
                                                                <small className=" username_ques"> {q.firstName} {q.lastName}</small>
                                                            </div>
                                                            <div className="question_border">

                                                            </div>
                                                        </>
                                                    }
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </>
            }
        }


        return (
            Questions
        )
    }
}
export default Questions;