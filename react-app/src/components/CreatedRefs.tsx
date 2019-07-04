import React from 'react';
import styled from 'styled-components';
// import { BASE_URL } from '../helpers/Globals';
import { Link } from 'react-router-dom';
import { MdContentCopy } from 'react-icons/md';
import { UncontrolledTooltip } from 'reactstrap';
import CopyToClipboard from 'react-copy-to-clipboard';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const mySwal = withReactContent(Swal);
const alertCopy = () =>
  Swal.fire({
    position: 'top-end',
    type: 'success',
    title: 'Copied',
    showConfirmButton: false,
    timer: 1500
  });
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
          {props.refs.reverse().map(ref => (
            <li key={ref}>
              {ref}
              <CopyToClipboard text={ref}>
                <div>
                  <MdContentCopy
                    id={ref}
                    className="ml-2"
                    onClick={alertCopy}
                  />
                  <UncontrolledTooltip placement="bottom" target={ref}>
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
