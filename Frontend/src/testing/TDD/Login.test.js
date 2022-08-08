import { render, screen } from "@testing-library/react";
import Login from '../../components/Pages/LoginRegister/Login';
import Register from '../../components/Pages/LoginRegister/Register';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import { shallow } from 'enzyme';

describe('render the views of login page', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Login />)
    })
    test("render redirect to registration page", () => {
        expect(wrapper.find('h2').text()).toContain(' Login to dhuwani')

        const { getByText } = render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );
        const linkElement = getByText('Join dhuwani');
        expect(linkElement).toBeInTheDocument();
    });

    test('render the Email label of login form', () => {
        expect(wrapper.find("#email").text()).toBe("Email address");
    })

    test('render the Password label of login form', () => {
        expect(wrapper.find("#password").text()).toBe("Password");
    })

    test('render the Button label of login form', () => {
        expect(wrapper.find("#register-btn").text()).toBe("Login");
    })

    test('render email input', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        )
        const inputEL = screen.getByTestId("email-input");
        expect(inputEL).toBeInTheDocument();
        expect(inputEL).toHaveAttribute('type', 'email');
    });

    test('pass valid email to test email input field', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        const inputEL = screen.getByTestId("email-input");
        userEvent.type(inputEL, "test@gmail.com");

        expect(screen.getByTestId("email-input")).toHaveValue("test@gmail.com");
        expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
    });

    test('pass invalid email to test input value', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        const inputEL = screen.getByTestId("email-input");
        userEvent.type(inputEL, "test");

        expect(screen.getByTestId("email-input")).toHaveValue("test");
        expect(screen.queryByTestId("error-msg")).toBeInTheDocument();
        expect(screen.queryByTestId("error-msg").textContent).toEqual("Please enter a valid email.");
    });

    test('render password input', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );
        const inputPW = screen.getByTestId("password-input");
        expect(inputPW).toBeInTheDocument();
        expect(inputPW).toHaveAttribute('type', 'password');
    });

});

// it('should have a email, password and signup button', ()=>{
//     render(<Login/>);


//     const emailField = screen.getByText(/Email address/i);
//     const passwordField = screen.getByText(/Password/i);
//     const submitButton = screen.getByText(/SignIn/i);


//     expect(emailField).toBeInTheDocument();
//     expect(passwordField).toBeInTheDocument();
//     expect(submitButton).toBeInTheDocument();
// })

