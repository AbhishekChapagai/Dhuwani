import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from "@testing-library/react";
import Profile from '../../components/Pages/Dashboard/UserProfile/userProfile';
import EditProfile from "../../components/Pages/Dashboard/UserProfile/profileEdit";
import userEvent from '@testing-library/user-event';

import { shallow } from 'enzyme';

describe('render the views of Profile page', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Profile />)
    })

    it("Render firstname textview of profile page", () => {
        expect(wrapper.find("#firstname").text()).toBe("Firstname");
    })

    it("Render lastname textview of profile page", () => {
        expect(wrapper.find("#lastname").text()).toBe("Lastname");
    })

    it("Render email textview of profile page", () => {
        expect(wrapper.find("#email").text()).toBe("Email");
    })

    it("Render phone textview of profile page", () => {
        expect(wrapper.find("#phone").text()).toBe("Phone");
    })

    it("Render Edit button of profile page", () => {
        expect(wrapper.find("#edit-profilebtn").text()).toBe(" EDIT PROFILE");
    })

});

describe("render the input field of Edit Profile page", () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<EditProfile />)
    })

    it("renders firstname inputField", () => {
        render(
            <BrowserRouter>
                <EditProfile />
            </BrowserRouter>
        )
        const inputFN = screen.getByTestId("firstname-input");
        expect(inputFN).toBeInTheDocument();
        expect(inputFN).toHaveAttribute('type', 'text');
    })

    it("renders lastname inputField", () => {
        render(
            <BrowserRouter>
                <EditProfile />
            </BrowserRouter>
        )
        const inputLN = screen.getByTestId("lastname-input");
        expect(inputLN).toBeInTheDocument();
        expect(inputLN).toHaveAttribute('type', 'text');
    })

    it("renders email inputField", () => {
        render(
            <BrowserRouter>
                <EditProfile />
            </BrowserRouter>
        )
        const inputEL = screen.getByTestId("email-input");
        expect(inputEL).toBeInTheDocument();
        expect(inputEL).toHaveAttribute('type', 'email')
    })

    it("renders phone number inputField", () => {
        render(
            <BrowserRouter>
                <EditProfile />
            </BrowserRouter>
        )
        const inputPHN = screen.getByTestId("phone-input");
        expect(inputPHN).toBeInTheDocument();
        expect(inputPHN).toHaveAttribute('type', 'text')
    })

    it("renders image inputField", () => {
        render(
            <BrowserRouter>
                <EditProfile />
            </BrowserRouter>
        )
        const inputIMG = screen.getByTestId("image-input");
        expect(inputIMG).toBeInTheDocument();
        expect(inputIMG).toHaveAttribute('type', 'file')
    })

    it("renders currentPassword inputField", () => {
        render(
            <BrowserRouter>
                <EditProfile />
            </BrowserRouter>
        )
        const inputPW = screen.getByTestId("password-input");
        expect(inputPW).toBeInTheDocument();
        expect(inputPW).toHaveAttribute('type', 'password')
    })

    it("renders newPassword inputField", () => {
        render(
            <BrowserRouter>
                <EditProfile />
            </BrowserRouter>
        )
        const inputNPW = screen.getByTestId("new-password-input");
        expect(inputNPW).toBeInTheDocument();
        expect(inputNPW).toHaveAttribute('type', 'password')
    })

    it("renders province inputField", () => {
        render(
            <BrowserRouter>
                <EditProfile />
            </BrowserRouter>
        )
        const inputPV = screen.getByTestId("province-input");
        expect(inputPV).toBeInTheDocument();
        expect(inputPV).toHaveAttribute('type', 'text')
    })

    it("renders district inputField", () => {
        render(
            <BrowserRouter>
                <EditProfile />
            </BrowserRouter>
        )
        const inputDT = screen.getByTestId("district-input");
        expect(inputDT).toBeInTheDocument();
        expect(inputDT).toHaveAttribute('type', 'text')
    })
    it("renders address inputField", () => {
        render(
            <BrowserRouter>
                <EditProfile />
            </BrowserRouter>
        )
        const inputADD = screen.getByTestId("address-input");
        expect(inputADD).toBeInTheDocument();
        expect(inputADD).toHaveAttribute('type', 'text')
    })

    it("renders tole inputField", () => {
        render(
            <BrowserRouter>
                <EditProfile />
            </BrowserRouter>
        )
        const inputTOLE = screen.getByTestId("tole-input");
        expect(inputTOLE).toBeInTheDocument();
        expect(inputTOLE).toHaveAttribute('type', 'text')
    })

    it("renders zipCode inputField", () => {
        render(
            <BrowserRouter>
                <EditProfile />
            </BrowserRouter>
        )
        const inputZIP = screen.getByTestId("zip-input");
        expect(inputZIP).toBeInTheDocument();
        expect(inputZIP).toHaveAttribute('type', 'text')
    })

    it("renders save button", () => {
        expect(wrapper.find("#save-changebtn").text()).toBe("SAVE CHANGES");
    })
})