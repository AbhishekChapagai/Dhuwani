import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // wrap

import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../Pages/LoginRegister/Login";
import Register from "../Pages/LoginRegister/Register";
import Gadgets from "../Pages/ProductBrowsing/Gadgets";
import Cosmetics from "../Pages/ProductBrowsing/Cosmetics";
import Laptop from "../Pages/ProductBrowsing/LaptopBrowsing";
import Camera from "../Pages/ProductBrowsing/CameraBrowsing";
import Header from '../Header/Header';
import LaptopDetails from '../Pages/Dashboard/Details/Laptopdetails';
import CameraDetails from '../Pages/Dashboard/Details/CameraDetails';
import CosmeticDetails from '../Pages/Dashboard/Details/CosmeticDetails';
import Home from '../Pages';
import ProductRequest from '../Pages/Dashboard/ProductRequesting/RequestProduct';
import Auth from '../Auth/Auth'
import 'react-toastify/dist/ReactToastify.css';
import Profile from '../Pages/Dashboard/UserProfile/userProfile';
import Address from '../Pages/Dashboard/UserProfile/address';
import AddReview from '../Pages/Dashboard/UserProfile/AddReview';
import EditProfile from '../Pages/Dashboard/UserProfile/profileEdit';
import MyOrder from '../Pages/Dashboard/UserProfile/MyOrder';
import Cart from '../Pages/Dashboard/cart/ContextCart';
import Checkout from '../Pages/Dashboard/cart/Checkout';
import VerifyEmail from '../Auth/VerifyEmail';
import EmailVerified from '../Auth/EmailVerified';
import ForgotPassword from '../Pages/LoginRegister/ForgotPassword';
import AdminDashboard from '../Pages/AdminDashboard/index';
import AddUser from '../Pages/AdminDashboard/User/AddUser';
import EditUser from '../Pages/AdminDashboard/User/EditUser';
import Acer from '../Pages/ProductBrowsing/LaptopFilter/Acer';
import Dell from '../Pages/ProductBrowsing/LaptopFilter/Dell';
import Asus from '../Pages/ProductBrowsing/LaptopFilter/Asus';
import Hp from '../Pages/ProductBrowsing/LaptopFilter/Hp';
import Lenovo from '../Pages/ProductBrowsing/LaptopFilter/Lenovo';
import Razer from '../Pages/ProductBrowsing/LaptopFilter/Razer';
import Apple from '../Pages/ProductBrowsing/LaptopFilter/Apple';
import MSI from '../Pages/ProductBrowsing/LaptopFilter/MSI';
import Aorus from '../Pages/ProductBrowsing/LaptopFilter/Aorus';
import Microsoft from '../Pages/ProductBrowsing/LaptopFilter/Microsoft';
import Footer from '../Footer/Footer';
import AddProduct from '../Pages/AdminDashboard/Product/AddProduct/AddProduct';
import NotFoundPage from '../Pages/NotFound/NotFoundPage';
import MenCosmetics from '../Pages/ProductBrowsing/Men';
import Creed from '../Pages/ProductBrowsing/CosmeticFilter/Creed';
import HugoBoss from '../Pages/ProductBrowsing/CosmeticFilter/HugoBoss';
import VictoriaSecret from '../Pages/ProductBrowsing/CosmeticFilter/Victoria Secret';
import Dior from '../Pages/ProductBrowsing/CosmeticFilter/Dior';
import Women from '../Pages/ProductBrowsing/Women';
import Perfume from '../Pages/ProductBrowsing/CosmeticFilter/Perfume';
import Nailpolish from '../Pages/ProductBrowsing/CosmeticFilter/Nail Polish';
import Lotion from '../Pages/ProductBrowsing/CosmeticFilter/Lotion';
import EditPRDetails from '../Pages/AdminDashboard/Product/ProductRequested/EditPRDetails';
import AddAd from '../Pages/AdminDashboard/Ad/AddAd';
import EditOrder from '../Pages/AdminDashboard/Product/Order/EditOrder';
import Men from '../Pages/LandingPage/forMen';
import Nikon from '../Pages/ProductBrowsing/CameraFilter/nikon';
import Canon from '../Pages/ProductBrowsing/CameraFilter/canon';
import Gopro from '../Pages/ProductBrowsing/CameraFilter/gopro';
import Sony from '../Pages/ProductBrowsing/CameraFilter/sony';


require('dotenv').config();

function App() {

  // it allows to have different component in the different pages. Like login page without navbar.
  // login page without navbar and footer component.
  const LoginContainer = () => (
    <>
      <Route exact path="/login" component={Login} />
    </>
  )

  const RegisterContainer = () => (
    <>
      <Route exact path="/register" component={Register} />
    </>
  )

  const AuthContainer = () => (
    <>
      <Route exact path="/auth" component={Auth} />
    </>
  )

  const VerifyEmailContainer = () => (
    <>
      <Header />
      <Route exact path="/register/email/verify" component={VerifyEmail} />
    </>
  )

  const EmailVerifiedContainer = () => (
    <>
      <Route exact path="/register/email/verify/:token" component={EmailVerified} />
    </>
  )

  const ForgotContainer = () => (
    <>
      <Route exact path="/login/forgot/password" component={ForgotPassword} />
    </>
  )


  // Pages with Header/navbar and footer component.
  const DefaultContainer = () => (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/user/product/request" component={ProductRequest} />
        <Route exact path="/product/gadgets" component={Gadgets} />
        <Route exact path="/product/laptop" component={Laptop} />
        <Route exact path="/product/camera" component={Camera} />
        <Route exact path="/laptop/acer" component={Acer} />
        <Route exact path="/laptop/dell" component={Dell} />
        <Route exact path="/laptop/asus" component={Asus} />
        <Route exact path="/laptop/hp" component={Hp} />
        <Route exact path="/laptop/lenovo" component={Lenovo} />
        <Route exact path="/laptop/razer" component={Razer} />
        <Route exact path="/laptop/apple" component={Apple} />
        <Route exact path="/laptop/msi" component={MSI} />
        <Route exact path="/laptop/aorus" component={Aorus} />
        <Route exact path="/laptop/microsoft" component={Microsoft} />
        <Route exact path="/user/profile" component={Profile} />
        <Route exact path="/user/address" component={Address} />
        <Route exact path="/user/edit" component={EditProfile} />
        <Route exact path="/user/myorder" component={MyOrder} />
        <Route exact path="/product/cosmetics" component={Cosmetics} />
        <Route exact path="/product/gadget/laptopdetails/:id" component={LaptopDetails} />
        <Route exact path="/product/gadget/cameradetails/:id" component={CameraDetails} />
        <Route exact path="/product/cosmetic/cosmeticdetails/:id" component={CosmeticDetails} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/admin/dashboard" component={AdminDashboard} />
    
        <Route exact path="/admin/dashboard/user/add" component={AddUser} />
        <Route exact path="/admin/dashboard/user/details/:id" component={EditUser} />
        <Route exact path="/admin/dashboard/product/add" component={AddProduct} />
        <Route exact path="/admin/dashboard/product/request/details/:id" component={EditPRDetails} />
        <Route exact path="/admin/dashboard/ad/add/" component={AddAd} />
        <Route exact path="/admin/dashboard/order/edit/:id" component={EditOrder} />
        <Route exact path="/user/myorder/rating/:id" component={AddReview} />
        <Route exact path="/cosmetic/men" component={MenCosmetics} />
        <Route exact path="/cosmetic/women" component={Women} />

        <Route exact path="/product/women" component={Women} />
        <Route exact path="/product/men" component={MenCosmetics} />
        <Route exact path="/cosmetic/creed" component={Creed} />
        <Route exact path="/cosmetic/hugo" component={HugoBoss} />
        <Route exact path="/cosmetic/victoria" component={VictoriaSecret} />
        <Route exact path="/cosmetic/dior" component={Dior} />
        <Route exact path="/cosmetic/perfume" component={Perfume} />
        <Route exact path="/cosmetic/nailpolish" component={Nailpolish} />
        <Route exact path="/cosmetic/lotion" component={Lotion} />
        <Route exact path="/cosmetic/camera" component={Camera} />
        <Route exact path="/camera/nikon" component={Nikon} />
        <Route exact path="/camera/sony" component={Sony} />
        <Route exact path="/camera/gopro" component={Gopro} />
        <Route exact path="/camera/canon" component={Canon} />

        <Route path="*" component={() => <NotFoundPage />} />
      </Switch>
      <Footer />
    </>

  )

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/login" component={LoginContainer} />
          <Route exact path="/register" component={RegisterContainer} />
          <Route exact path="/register/email/verify" component={VerifyEmailContainer} />
          <Route exact path="/login/forgot/password" component={ForgotContainer} />
          <Route exact path="/auth" component={AuthContainer} />
          <Route exact path="/register/email/verify/:token" component={EmailVerifiedContainer} />
          <Route component={DefaultContainer} />
        </Switch>
      </div>
    </Router >
  );
}

export default App;
