import React from 'react';
import styled from 'styled-components';
import { BASE_URL } from '../helpers/Globals';
import { Link } from 'react-router-dom';

const CreatedRefs = (props: { refs: string[] }) => {
  if (!!props.refs.length) {
    return (
      <>
        <h3 style={{ textAlign: 'center' }}>Your References</h3>
        <List>
          {props.refs.map(ref => (
            <li key={ref}>
              <a
                href={`${BASE_URL}/${ref}?types=required,recommended`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {ref}
              </a>
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

    a {
      color: #2a2a2a;
    }
  }
`;
export default CreatedRefs;
