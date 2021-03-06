import * as React from 'react';
import styled from 'styled-components'
interface IInputProps {
    width?: string,
    dataId?: number,
    displayLabel?: boolean,
    name: string, 
    placeholder: string,
    value: string,
    type?: string,
    changeHandle: Function
}
const InputWrapper = styled('div')<{width?: string, displayLabel?: boolean}>`
    display: flex;
    flex-direction: column-reverse;
    flex: 1 1 200px;
    margin: 0.5rem 0;
    label {
        display: none;
        align-self: start;
        font-size: 0.9rem;
        font-weight: 500;
    }

    input {
        padding: 0.5rem 1rem;
        width: ${props => props.width || '100%'};
        font-size: 1rem;
        outline: none;
        border: none;
        border-radius: 10px;
        &:focus + label {
        display: ${props => props.displayLabel === false? 'none': 'block'};
        }
    }
`;
export function Input (props: IInputProps) {
    return (
      <InputWrapper width={props.width} displayLabel={props.displayLabel}>
            <input type={props.type || 'text'} name={props.name}
            data-id={props.dataId}
            id={props.name} 
            placeholder={props.placeholder} 
            value={props.value}
            onChange={(e) => props.changeHandle(e.target)}
            />
            <label htmlFor={props.name}>
                {props.placeholder}
            </label>
      </InputWrapper>
    );
}

