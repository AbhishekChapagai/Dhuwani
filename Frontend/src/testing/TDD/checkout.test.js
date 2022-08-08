import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from "@testing-library/react";
import Checkout from '../../components/Pages/Dashboard/cart/Checkout';
import userEvent from '@testing-library/user-event';

import { shallow } from 'enzyme';

describe("render the input field of Checkout page", () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Checkout />)
    })

    it("renders firstname inputField", () => {
        render(
            <BrowserRouter>
                <Checkout />
            </BrowserRouter>
        )
        const inputFN = screen.getByTestId("billingfirstname-input");
        expect(inputFN).toBeInTheDocument();
        expect(inputFN).toHaveAttribute('type', 'text');
    })

    it("renders lastname inputField", () => {
        render(
            <BrowserRouter>
                <Checkout />
            </BrowserRouter>
        )
        const inputLN = screen.getByTestId("billinglastname-input");
        expect(inputLN).toBeInTheDocument();
        expect(inputLN).toHaveAttribute('type', 'text');
    })

    it("renders phone number inputField", () => {
        render(
            <BrowserRouter>
                <Checkout />
            </BrowserRouter>
        )
        const inputPHN = screen.getByTestId("billingphone-input");
        expect(inputPHN).toBeInTheDocument();
        expect(inputPHN).toHaveAttribute('type', 'text');
    })

    it("renders email inputField", () => {
        render(
            <BrowserRouter>
                <Checkout />
            </BrowserRouter>
        )
        const inputEL = screen.getByTestId("billingemail-input");
        expect(inputEL).toBeInTheDocument();
        expect(inputEL).toHaveAttribute('type', 'email');
    })

    it('pass valid email to test email input field', () => {
        render(<Checkout />);

        const inputEL = screen.getByTestId("billingemail-input");
        userEvent.type(inputEL, "test@gmail.com");

        expect(screen.getByTestId("billingemail-input")).toHaveValue("test@gmail.com");
    });

    it('pass invalid email to test input value', () => {
        render(<Checkout />);

        const inputEL = screen.getByTestId("billingemail-input");
        userEvent.type(inputEL, "test");

        expect(screen.getByTestId("billingemail-input")).toHaveValue("test");
        expect(screen.queryByTestId("error-msg")).toBeInTheDocument();
        expect(screen.queryByTestId("error-msg").textContent).toEqual("Please enter a valid email.");
    });

    it("renders address inputField", () => {
        render(
            <BrowserRouter>
                <Checkout />
            </BrowserRouter>
        )
        const inputADD = screen.getByTestId("billingaddress-input");
        expect(inputADD).toBeInTheDocument();
        expect(inputADD).toHaveAttribute('type', 'text');
    })

    it("renders zipCode inputField", () => {
        render(
            <BrowserRouter>
                <Checkout />
            </BrowserRouter>
        )
        const inputZIP = screen.getByTestId("billingzip-input");
        expect(inputZIP).toBeInTheDocument();
        expect(inputZIP).toHaveAttribute('type', 'text');
    })

    it("renders province inputField", () => {
        render(
            <BrowserRouter>
                <Checkout />
            </BrowserRouter>
        )
        const inputPV = screen.getByTestId("billingprovince-input");
        expect(inputPV).toBeInTheDocument();
        expect(inputPV).toHaveAttribute('type', 'text');
    })

    it("renders district inputField", () => {
        render(
            <BrowserRouter>
                <Checkout />
            </BrowserRouter>
        )
        const inputDT = screen.getByTestId("billingdistrict-input");
        expect(inputDT).toBeInTheDocument();
        expect(inputDT).toHaveAttribute('type', 'text');
    })

    it("renders radiobutton(Khalti) inputField", () => {
        render(
            <BrowserRouter>
                <Checkout />
            </BrowserRouter>
        )
        const radioKhalti = screen.getByTestId("radio-khaltibtn");
        expect(radioKhalti).toBeInTheDocument();
        expect(radioKhalti).toHaveAttribute('type', 'radio');
    })

    it("renders radiobutton(Cash) inputField", () => {
        render(
            <BrowserRouter>
                <Checkout />
            </BrowserRouter>
        )
        const radioCash = screen.getByTestId("radio-cashbtn");
        expect(radioCash).toBeInTheDocument();
        expect(radioCash).toHaveAttribute('type', 'radio');
    })

    it("renders khalti button", () => {
        expect(wrapper.find("#btnKhalti").text()).toContain("Pay via khalti")
    })

    it("renders Checkout button", () => {
        expect(wrapper.find("#btnCash").text()).toContain("Continue to checkout")
    })
});