import { Avatar } from "@material-ui/core";
import axios from "axios";
import { Component } from "react";


class NavProfile extends Component {
    state = {
        firstName: "",
        img: "",
        config: {
            headers: { 'authorization': `Bearer ${localStorage.getItem('token')}` }
        }
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/token/decode`, this.state.config)
            .then((response) => {
                const data = response.data
                this.setState({
                    firstName: data.firstName,
                    img: data.img
                })
            }).catch((err) => {
                console.log(err);
            })
    }

    render() {
        return (
            <div className="NavProfile">
                <Avatar src={`${process.env.REACT_APP_BACKEND_URL}/userImg/` + this.state.img} />
                <span className="nav_name"> {this.state.firstName} </span>
            </div>
        )
    }

}

export default NavProfile;