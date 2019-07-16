import React from 'react';
import styled from 'styled-components';
// import { BASE_URL } from '../helpers/Globals';
import { Link } from 'react-router-dom';
import { MdContentCopy } from 'react-icons/md';
import { UncontrolledTooltip } from 'reactstrap';
import CopyToClipboard from 'react-copy-to-clipboard';
import { alertSuccess } from '../helpers/Globals';
import LogoDark from '../logo-dark';
const CreatedRefs = (props: { refs: { ref: string; title: string }[] }) => {
  const refs = props.refs;
  if (!!props.refs.length) {
    return (
      <>
        <LogoDark />
        <h3
          style={{
            textAlign: 'center',
            marginBottom: '1.5rem',
            color: '#333333'
          }}
        >
          Your References
        </h3>
        <List>
          {refs.reverse().map(ref => (
            <li key={ref.ref}>
              {ref.title} {ref.ref}
              <CopyToClipboard text={ref.ref}>
                <div>
                  <MdContentCopy
                    id={ref.ref.replace(/@|[/]/g, '')}
                    className="ml-2"
                    onClick={() => alertSuccess('copied')}
                  />
                  <UncontrolledTooltip
                    placement="bottom"
                    target={ref.ref.replace(/@|[/]/g, '')}
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
      <LogoDark />
      <h4>You haven't created any reference</h4>
      <Link to="/">Create Some</Link>
    </div>
  );
};
const List = styled.ul`
  width: 100%;
  text-align: center;
  list-style: none;

  li {
    border-bottom: 1px #969da521 solid;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
  }
`;
export default CreatedRefs;
