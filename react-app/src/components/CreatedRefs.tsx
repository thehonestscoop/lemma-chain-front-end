import React from 'react';
import styled from 'styled-components';
import { BASE_URL } from '../helpers/Globals';
import { Link } from 'react-router-dom';
import { MdContentCopy } from 'react-icons/md';
import { UncontrolledTooltip } from 'reactstrap';
import CopyToClipboard from 'react-copy-to-clipboard';

const CreatedRefs = (props: { refs: string[] }) => {
  if (!!props.refs.length) {
    return (
      <>
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
          {props.refs.map(ref => (
            <li key={ref}>
              {ref.split('(')[0].replace(/[^a-z0-9]/gi, '')}
              <CopyToClipboard text={ref}>
                <div>
                  <MdContentCopy
                    id={ref.split('(')[0].replace(/[^a-z0-9]/gi, '')}
                    className="ml-2"
                    onClick={() => alert('Copied')}
                  />

                  <UncontrolledTooltip
                    placement="bottom"
                    target={ref.split('(')[0].replace(/[^a-z0-9]/gi, '')}
                  >
                    Click to Copy Ref
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
      <h4>You haven't created any reference</h4>
      <Link to="/create-ref">Create Some</Link>
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
