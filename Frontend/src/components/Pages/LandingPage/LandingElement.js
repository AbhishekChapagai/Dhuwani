import styled from 'styled-components'
import servicesimage from '../../../assets/images/laptop.png'
import serimage from '../../../assets/images/capture.png'


// Service elements

export const ServicesContainer = styled.div`
    height: 450px;
    background-image: url(${servicesimage});
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;

    @media screen and (max-width: 990px){
        height: 250px;
    }
    @media screen and (max-width: 815px){
        height: 250px;
    }
    @media screen and (max-width: 600px){
        height: 700px;
    }
`
export const ServicesContain = styled.div`
    height: 450px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url(${serimage});
    background-size: 100% 100%;
    background-attachment: fixed;

    @media screen and (max-width: 815px){
        height: 500px;
    }
    
    @media screen and (max-width: 480px){
        height: 1300px;
    }
`