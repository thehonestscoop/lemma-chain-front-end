import * as React from  'react';
import styled from 'styled-components';

const CheckBoxCon =  styled('div')<{checked: boolean}>`
  height: 60px;
  width: 60px;
  background-color: cyan;
  position: relative;
  border-radius: 5%;

    & .after{
    display: ${props => !!props.checked? 'block': 'none'};
    transform: rotate(45deg);
    transform-origin: bottom;
    left: 32%;
    bottom: 25%;
    height: 60%;
    width: 10%;
    background-color: white;
    position: absolute;
    }
    & .before {
    display: ${props => !!props.checked? 'block': 'none'};
    transform: rotate(-45deg);
    transform-origin: bottom;
    left: 34%;
    bottom: 20%;
    height: 40%;
    width: 10%;
    background-color: white;
    position: absolute;
    }
`;

const CheckBox = (props: {checked: boolean}) => {
    return <CheckBoxCon checked={props.checked} >
        <div className="before"></div>
        <div className="after"></div>
    </CheckBoxCon>;
}

export default CheckBox;