import React from 'react';
import { render, screen } from "@testing-library/react";
import Register from '../../components/Pages/LoginRegister/Register';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import { shallow } from 'enzyme';

describe('render the views of registration page', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Register />)
    })
    test("render the title of registration page", () => {
        expect(wrapper.find('h2').text()).toContain(' Join dhuwani')
    });

    test('render the FirstName label of registration form', () => {
        expect(wrapper.find("#firstname").text()).toBe("First Name *");
    })

    test('render the LastName label of registration form', () => {
        expect(wrapper.find("#lastname").text()).toBe("Last Name");
    })

    test('render the Email label of registration form', () => {
        expect(wrapper.find("#email").text()).toBe("Email address");
    })

    test('render the Password label of registration form', () => {
        expect(wrapper.find("#password").text()).toBe("Password");
    })

    test('render the Button label of registration form', () => {
        expect(wrapper.find("#login-btn").text()).toBe("Register");
    })

    //
    test('render firstname input', () => {
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );
        const inputFN = screen.getByTestId("firstname-input");
        expect(inputFN).toBeInTheDocument();
        expect(inputFN).toHaveAttribute('type', 'text');
    });

    test('render lastname input', () => {
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );
        const inputLN = screen.getByTestId("lastname-input");
        expect(inputLN).toBeInTheDocument();
        expect(inputLN).toHaveAttribute('type', 'text');
    });

    test('render password input', () => {
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );
        const inputPW = screen.getByTestId("password-input");
        expect(inputPW).toBeInTheDocument();
        expect(inputPW).toHaveAttribute('type', 'password');
    });

    test('render email input', () => {
        render(<BrowserRouter>
            <Register />
        </BrowserRouter>
        )
        const inputEL = screen.getByTestId("email-input");
        expect(inputEL).toBeInTheDocument();
        expect(inputEL).toHaveAttribute('type', 'email');
    });

    test('pass valid email to test email input field', () => {
        render(<BrowserRouter>
            <Register />
        </BrowserRouter>
        );

        const inputEL = screen.getByTestId("email-input");
        userEvent.type(inputEL, "test@gmail.com");

        expect(screen.getByTestId("email-input")).toHaveValue("test@gmail.com");
        expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
    });

    test('pass invalid email to test input value', () => {
        render(<BrowserRouter>
            <Register />
        </BrowserRouter>
        );

        const inputEL = screen.getByTestId("email-input");
        userEvent.type(inputEL, "test");

        expect(screen.getByTestId("email-input")).toHaveValue("test");
        expect(screen.queryByTestId("error-msg")).toBeInTheDocument();
        expect(screen.queryByTestId("error-msg").textContent).toEqual("Please enter a valid email.");
    });
});

// it('should have a firstname, lastname, email, password and signin button', ()=>{
//     render(<Register/>);

//     const firstnameField = screen.getByText(/First Name/i);
//     const lastnameField = screen.getByText(/Last Name/i);
//     const emailField = screen.getByText(/Email address/i);
//     const passwordField = screen.getByText(/Password/i);
//     const submitButton = screen.getByText(/SignUp/i);


//     expect(firstnameField).toBeInTheDocument();
//     expect(lastnameField).toBeInTheDocument();
//     expect(emailField).toBeInTheDocument();
//     expect(passwordField).toBeInTheDocument();
//     expect(submitButton).toBeInTheDocument();
// })