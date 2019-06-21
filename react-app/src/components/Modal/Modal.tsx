import * as React from 'react'
import styled from 'styled-components';

interface IModalProps {
    bgColor?: string
    active: boolean,
    toggleModal: Function
}

const ModalToggle = styled('span')`
    cursor: pointer;
    font-size: 1.5rem;
    position: absolute;
    top: 5%;
    width: 2.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.3rem;
    right: 5%;
    border-radius: 50%;
    background-color: white;
    font-weight: 300;
    &:hover {
        background-color: crimson;
        color: white;
    }
`;
const ModalWrapper = styled('div')<{bgColor?: string, active: boolean}>`
    height: 100vh;
    width: 100%;
    top: 0;
    left: 0;
    position: absolute;
    z-index: 1000;
    display: ${props => props.active? 'flex': 'none'};
    justify-content: center;
    align-items: center;
    background-color: ${props => props.bgColor || '#00000066'};
`;

const Modal = <P extends object>(Component: React.ComponentType<P>): React.FC<P & IModalProps> => (props: IModalProps) =>
   <ModalWrapper bgColor={props.bgColor} active={props.active}>
       <ModalToggle onClick={() => props.toggleModal()}>X</ModalToggle>
        <Component {...props as P} />
   </ModalWrapper>;

export default Modal;
