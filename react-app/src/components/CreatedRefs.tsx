import React from 'react';
import styled from 'styled-components';
import { MdContentCopy } from 'react-icons/md';
import { UncontrolledTooltip } from 'reactstrap';
import CopyToClipboard from 'react-copy-to-clipboard';
import { alertSuccess } from '../helpers/Globals';
import LogoDark from '../logo-dark';
import { Logo } from './LemmaForm/LemmaForm';
const CreatedRefs = (props: { refs: { ref: string; title: string }[] }) => {
  const refs = props.refs;
  if (!!props.refs.length) {
    return (
      <>
        <Logo>
          <LogoDark rect_bg="white" bubble_color="#33cc33" />
        </Logo>
        <h3
          style={{
            textAlign: 'center',
            marginBottom: '1.5rem',
            color: '#333333'
          }}
        >
          Links Created
        </h3>
        <List>
          {refs.reverse().map(ref => (
            <li key={ref.ref}>
              {ref.title} <b>{ref.ref}</b>
              <CopyToClipboard text={ref.ref}>
                <div>
                  <MdContentCopy
                    id={'ref' + ref.ref.toString().replace(/\W/g, '')}
                    className="ml-2"
                    onClick={() => alertSuccess('copied')}
                  />
                  <UncontrolledTooltip
                    placement="bottom"
                    target={'ref' + ref.ref.toString().replace(/\W/g, '')}
                  >
                    copy to clipboard
                  </UncontrolledTooltip>
                </div>
              </CopyToClipboard>
            </li>
          ))}
        </List>
      </>
    );
  }
  return (
    <div style={{ textAlign: 'center' }}>
      <Logo>
        <LogoDark rect_bg="white" bubble_color="#33cc33" />
      </Logo>
      <h4>Created References</h4>
    </div>
  );
};
const List = styled.ul`
  width: 100%;
  text-align: center;
  list-style: none;
  padding: 0 1rem;
  user-select: auto;

  li {
    border-bottom: 1px #969da521 solid;
    padding: 0.5rem;
    display: flex;
    justify-content: center;

    b {
      margin-left: 10px;
    }
  }
`;
export default CreatedRefs;
