import React from 'react'
import CosmeticCategory from './LandingPage/cosmetic'
import LaptopCategory from './LandingPage/laptop'
import CameraCategory from './LandingPage/camera'
import Featured from './LandingPage/featuredGadgets'
import Brands from './LandingPage/browsebyBrands'
import LandingAD from './LandingPage/landingAD'
import Men from './LandingPage/forMen'
import Services from './LandingPage/services'
import Ser from './LandingPage/ser'

const Home = () => {

    return (
        <>
            {/* <LandingComponent /> */}
            <div className="LandingBody">
                <LandingAD />
                <CosmeticCategory />
                <Men />
                <Services />
                <Brands />
                {/* <Gadget/> */}
                <LaptopCategory />
                <Featured />
                <Ser />
                <CameraCategory />
            </div>
        </>
    )
}

export default Home;