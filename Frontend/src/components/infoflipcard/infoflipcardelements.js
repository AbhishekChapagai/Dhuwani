import React, { Component } from 'react';
import Flippy, { FrontSide, BackSide } from '../infoflipcard';
// import Rick from '../../media/image/rick.png';
import '../App/App.css';

export const FlippyStyle = {
    width: '300px',
    height: '390px',
    textAlign: 'left',
    color: '#FFF',
    fontFamily: 'sans-serif',
    fontSize: '30px',
    justifyContent: 'left'
}

export const DefaultCardContents = ({ children }) => (
    <React.Fragment>
        <FrontSide
            style={{
                backgroundColor: '#fff',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
            }}
        >
            {/* <img
        src={Rick
        style={{ maxWidth: '100%', maxHeight: '100%' }}
      /> */}

            <span
                style={{
                    fontSize: '14px',
                    position: 'initial',
                    bottom: '10px',
                    width: '100%',
                    height:'100%'
                }}>
                {children}<br />

            </span>
        </FrontSide>
        <BackSide
            style={{
                backgroundColor: '#175852',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }}>
            <span
                style={{
                    fontSize: '12px',
                    position: 'absolute',
                    bottom: '10px',
                    width: '100%'
                }}>
                {children}<br />
                (Details)
            </span>
        </BackSide>
    </React.Fragment>);

// export const FlippyOnHover = ({ flipDirection = 'vertical' }) => (
//   <Flippy
//     flipOnHover={true}
//     flipDirection={flipDirection}
//     style={FlippyStyle}
//   >
//     <DefaultCardContents>
//     I flip {flipDirection}ly on hover
//     </DefaultCardContents>
//   </Flippy>
// );

// export const FlippyOnClick = ({ flipDirection = 'vertical' }) => (
//   <Flippy
//     flipOnClick={true}
//     flipDirection={flipDirection}
//     style={FlippyStyle}
//   >
//     <DefaultCardContents>
//       I flip {flipDirection}ly on click
//     </DefaultCardContents>
//   </Flippy>
// );

// export const ControlledFlippy = ({ isFlipped })  => (
//   <Flippy
//     flipDirection="vertical"
//     isFlipped={isFlipped}
//     style={FlippyStyle}
//   >
//     <DefaultCardContents>
//       I flip vertically for every 3sec. I am controlling by a upper scope.
//     </DefaultCardContents>
//   </Flippy>
// );

class Flipinfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFlipped: false
        };

        setInterval(() => {
            this.setState({
                isFlipped: !this.state.isFlipped
            });
        }, 3000);
    }

    render() {
        return (
            <div className="App">
                <div style={{ display: 'flex', flex: '1 0 200px', justifyContent: 'space-between', 'flex-wrap': 'wrap' }}>
                    <Flippy
                        ref={(r) => this.flippyHorizontal = r}
                        flipOnClick={false}
                        style={FlippyStyle}
                    >
                        <DefaultCardContents>
                            I flip horizontally with an event<br />
                            <button type="button" onClick={() => this.flippyHorizontal.toggle()}>Details!</button>
                        </DefaultCardContents>
                    </Flippy>
                    {/* <FlippyOnHover flipDirection="horizontal"/>
          <FlippyOnClick flipDirection="horizontal"/> */}
                    {/* <Flippy
            ref={(r) => this.flippyVertical = r}
            flipOnClick={false}
            flipDirection="vertical"
            style={FlippyStyle}
          >
            <DefaultCardContents>
              I flip vertically with an event<br />
              <button type="button" onClick={() => this.flippyVertical.toggle()}>Toggle Me!</button>
            </DefaultCardContents>
          </Flippy> */}
                    {/* <FlippyOnHover />
          <FlippyOnClick />
          <ControlledFlippy
            isFlipped={this.state.isFlipped}
          />  */}
                </div>
            </div>
        );
    }
}

export default Flipinfo;
