import { Component } from "react";
import './LoginRegister.css';
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import registerImg from "../../../assets/loginRegister/signup.png"
toast.configure();

const initialState = {
    emailError: "",
    passwordError: "",
    firstError: "",
    lastError: "",
}

class Register extends Component {
    state = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        passwordHidden: true
    }

    toggleShow = this.toggleShow.bind(this);

    toggleShow() {
        this.setState({ passwordHidden: !this.state.passwordHidden });
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });

    }

    submitData = (e) => {
        e.preventDefault();

        const isValid = this.validate();

        if (isValid) {
            console.log(this.state);
            // clear form
            this.setState(initialState);

            axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/signup`, this.state)
                .then((response) => {
                    console.log(response.data.success);
                    this.setState({
                        success: response.data.success
                    })

                    toast.success('Register Success.', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
                .catch((err) => {
                    console.log(err.response);

                    this.setState({
                        success: err.response.data.success
                    })

                    toast.error('Register Failed!!!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
        }


    }

    validate = () => {
        let emailError = "";
        let passwordError = "";
        let firstError = "";
        let lastError = "";

        if (!this.state.email.includes("@")) {
            emailError = "Invalid email!!!"
        }

        if (!this.state.password) {
            passwordError = "Required!!!"
        }
        else if (this.state.password.length < 8) {
            passwordError = "Password must be minimum of 8 letters"
        }

        if (!this.state.firstname) {
            firstError = "Required!!!"
        }

        if (!this.state.lastname) {
            lastError = "Required!!!"
        }


        if (emailError || passwordError || firstError || lastError) {
            this.setState({ emailError, passwordError, firstError, lastError });
            return false;
        }
        return true;
    }


    render() {
        if (localStorage.getItem('token')) {
            if (localStorage.getItem('userType') === "User") {
                return <Redirect to='/' />
            }
            else {
                return <Redirect to='/admin/dashboard' />
            }
        }

        if (this.state.success === true) {
            return <Redirect to="/login" />
        }

        return (
            <div className="Register">
                {/* left side  */}
                {/* r stands for register */}
                <div className="r_left_side">

                    {/* top container */}
                    <div className="r_left_top">

                        {/* logo */}
                        <div className="r_left_logo">
                            {/* <img src={Logo} alt="logo" /> */}
                            <span>
                                <Link className="logoLink" to="/">
                                    <i className="fas fa-paper-plane"></i> dhuwani
                                </Link>
                            </span>
                        </div>

                        {/* form */}
                        <div className="r_left_form">
                            <div className="r_heading">
                                <h2> Join dhuwani </h2>
                                {/* <p> Moto </p> */}
                            </div>


                            <div className="r_form" >
                                <form id="RegForm">

                                    <div className="row g-2">
                                        <div className="col-md">
                                            <div className="form-floating mb-2">
                                                <input type="text" className="form-control" id="floatingInputFirst" placeholder="Jhon" name="firstname" value={this.state.firstname}
                                                    data-testid="firstname-input" onChange={this.changeHandler} />
                                                <label id="firstname" htmlFor="floatingInputFirst">First Name *</label>
                                                <span className="error_msg">
                                                    {this.state.firstError}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="col-md">
                                            <div className="form-floating mb-2">
                                                <input type="text" className="form-control" id="floatingInputLast" placeholder="Smith" name="lastname" value={this.state.lastname}
                                                    data-testid="lastname-input" onChange={this.changeHandler} />
                                                <label id="lastname" htmlFor="floatingInputLast">Last Name</label>
                                                <span className="error_msg">
                                                    {this.state.lastError}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-floating mb-2">
                                        <input type="email" className="form-control" id="floatingInput" placeholder="name@gmail.com" name="email" value={this.state.email}
                                            data-testid="email-input" onChange={this.changeHandler} />
                                        <label id="email" htmlFor="floatingInput">Email address</label>
                                        {this.state.email && !(/\S+@\S+\.\S+/).test(this.state.email) && <span className="error" data-testid="error-msg">Please enter a valid email.</span>}
                                        <span className="error_msg">
                                            {this.state.emailError}
                                        </span>
                                    </div>


                                    <div className="form-floating input_right_icon">
                                        <input type={this.state.passwordHidden ? 'password' : 'text'} className="form-control form_control_input" id="floatingPassword" placeholder="password1!" name="password" value={this.state.password}
                                            data-testid="password-input" onChange={this.changeHandler} />
                                        <i id="input_form_right_icon_login" className="form_right_icon"
                                            onClick={this.toggleShow}>
                                            {this.state.passwordHidden ? < i className="fas fa-eye-slash icon_change"></i> : < i className="fas fa-eye icon_change"></i>}
                                        </i>

                                        <label id="password" htmlFor="floatingPassword">Password</label>
                                    </div>
                                    <span className="error_msg">
                                        {this.state.passwordError}
                                    </span>

                                    <li>8 characters minimum </li>
                                    <li> One number, One Symbol </li>

                                    <button type="submit" id="login-btn" className="btn btn_primary_color btn-md btn-block" onClick={this.submitData}>Register</button>


                                </form>

                                <p className="r_form_agree">
                                    By clicking Register, you agree to our <b>Terms of Service </b> and <b>Privacy Policy</b>.
                                </p>

                                <p className="r_form_login">
                                    Already have an account? <a className="l_link" href="/login"> Log in </a>
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* bottom container */}
                    <div className="r_left_bottom">
                        <span> &copy; 2021 dhuwani | Kathmandu, Nepal</span>
                    </div>
                </div>

                {/* right side */}
                <div className="r_right_side col-4">
                    {/* <img src={test} /> */}
                    < p className="lr_img_container" > <img className="lr_img" src={registerImg} alt="login" /></p >

                </div>

            </div >
        );
    }
}

export default Register;