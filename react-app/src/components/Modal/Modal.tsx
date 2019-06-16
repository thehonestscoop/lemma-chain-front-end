import * as React from 'react'
import styled from 'styled-components';

interface IModalProps {
    bgColor?: string
}

const ModalWrapper = styled('div')<IModalProps>`
    height: 100vh;
    width: 100%;
    top: 0;
    left: 0;
    position: absolute;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.bgColor || '#00000066'};
`;

const Modal = <P extends object>(Component: React.ComponentType<P>): React.FC<P & IModalProps> => (props: IModalProps) =>
   <ModalWrapper bgColor={props.bgColor}>
        <Component {...props as P} />
   </ModalWrapper>;

export default Modal;
