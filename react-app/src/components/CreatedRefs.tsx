import React from 'react';
import styled from 'styled-components';
import { BASE_URL } from '../helpers/Globals';

const CreatedRefs = (props: { refs: string[] }) => {
  return (
    <List>
      {props.refs.map(ref => (
        <li key={ref}>
          <a
            href={`${BASE_URL}/${ref}?types=required,recommended`}
            target="_blank"
          >
            {ref}
          </a>
        </li>
      ))}
    </List>
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
