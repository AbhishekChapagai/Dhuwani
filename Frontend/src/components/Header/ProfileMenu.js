import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import React, { useState } from "react";
import '@szhsin/react-menu/dist/index.css';
import './Header.css';
import NavProfile from "./NavProfile";
import { Link } from "react-router-dom";


function ProfileMenu() {
    const [display] = useState('arrow');
    const [align] = useState('end');
    const [position] = useState('anchor');
    const [viewScroll] = useState('auto');

    const logout = () => {
        localStorage.clear();
        window.location.href = '/'
    }

    const menus = [
        <span> <NavProfile /> </span>].map(direction => (
            < Menu menuButton={< MenuButton > {direction}</MenuButton >}
                key={direction} direction={direction}
                align={align} position={position} viewScroll={viewScroll}
                arrow={display === 'arrow'}
                offsetX={display === 'offset' &&
                    (direction === 'left' || direction === 'right')
                    ? 12 : 0}
                offsetY={display === 'offset' &&
                    (direction === 'top' || direction === 'bottom')
                    ? 12 : 0}>

                {
                    [<Link exact to="/user/profile" className="profile_link"> <i className="fas fa-user" > Profile</i> </Link>,
                    <Link exact to="/cart" className="profile_link" ><i className="fas fa-shopping-cart "> Cart</i> </Link>,
                    <i className="fas fa-sign-out-alt" onClick={logout}> Logout</i>]
                        .map(profileM => <MenuItem key={profileM}>{profileM}</MenuItem>)
                }
            </Menu >
        ));


    return (
        <div className="profile-menu">
            {menus}
        </div>
    )

}

export default ProfileMenu;