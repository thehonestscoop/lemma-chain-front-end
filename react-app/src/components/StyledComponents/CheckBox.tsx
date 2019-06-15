import * as React from  'react';
import styled from 'styled-components';

const CheckBoxCon =  styled('div')<{checked: boolean}>`
  height: 35px;
  width: 35px;
  background-color: #0da9db;
  position: relative;
  cursor: pointer;
  border-radius: 20%;

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
    border-radius: 10px 10px 0 10px;
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
    border-radius: 10px 10px 0 10px;
    }
`;

const CheckBox = (props: {checked: boolean}) => {
    return <CheckBoxCon checked={props.checked} >
        <div className="before"></div>
        <div className="after"></div>
    </CheckBoxCon>;
}

export default CheckBox;