import React, { Component } from 'react'
import './landing.css';
import dell from '../../../assets/images/dell.png';
import acer from '../../../assets/images/acer.png';
import asus from '../../../assets/images/asus.png';
import hp from '../../../assets/images/hp.png';
import lenovo from '../../../assets/images/lenovo.png';
import msi from '../../../assets/images/msi.png';
import arous from '../../../assets/images/arous.png';
import razer from '../../../assets/images/razer.png';
import apple from '../../../assets/images/apple.png';
import microsoft from '../../../assets/images/microsoft.png';

class Brands extends Component {

    render() {

        return (
            <>

                {/* GADGET BRANDS */}
                <div className="container brandContainer">
                    <div className="container showBrands"></div>
                    <div className="row rowBrands">
                        <div className="col-2 col-sm-1 colBrands">
                            <img src={dell} className="dell"/>
                        </div>
                        <div className="col-3 col-sm-1 colBrands">
                        <img src={msi} className="msi"/>
                        </div>
                        <div className="col-2 col-sm-1 colBrands">
                        <img src={arous} className="arous"/>
                        </div>
                        <div className="col-3 col-sm-1 colBrands">
                        <img src={acer} className="acer"/>
                        </div>
                        <div className="col-2 col-sm-1 colBrands">
                        <img src={asus} className="asus"/>
                        </div>
                        <div className="col-2 col-sm-1 colBrands">
                        <img src={hp} className="hp"/>
                        </div>
                        <div className="col-3 col-sm-2 colBrands">
                        <img src={lenovo} className="lenovo"/>
                        </div>  
                        <div className="col-2 col-sm-1 colBrands">
                        <img src={razer} className="razer"/>
                        </div>
                        <div className="col-2 col-sm-1 colBrands">
                        <img src={apple} className="apple"/>
                        </div>
                        <div className="col-3 col-sm-2 colBrands">
                        <img src={microsoft} className="microsoft"/>
                        </div>
                    </div>
                </div>

            </>
        )
    }

}

export default Brands