import * as React from 'react';
import styled from 'styled-components';

const ChipCon = styled('div')<{}>`
    margin: 0.5rem;
    margin-left: 0;
    padding: 4px 0.5rem;
    border-radius: 25px;
    background-color: #0da9db;
    color: white;
    font-weight: 500;
    display: flex;
    align-items: center;
        button {
        margin-left: 5px;
        height: 23px;
        width: 23px;
        font-size: 16px;
        border: none;
        border-radius: 50%;
        font-weight: bold;
        color: #0da9db;
        display: grid;
        align-items: center;
        justify-content: center;
            &:hover {
            background-color: rgb(255, 61, 61);
            color: white;
            }
        }
`;
const Chip = (props: {data: string, deleteChip: Function}) => {
    return (
        <ChipCon>
            <span>{props.data}</span>
            <button onClick={() => props.deleteChip(props.data)}>x</button>
        </ChipCon>
    )
}

export default Chip
