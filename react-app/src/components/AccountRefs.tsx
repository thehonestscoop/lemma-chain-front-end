import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { BASE_URL } from '../helpers/Globals';
import Axios from 'axios';
import './AccountRefs.css';
import styled from 'styled-components';

const InputAlert = withReactContent(Swal);

const AccountRefs = (props: any) => {
  const alertIt = async () => {
    const { value: owner } = await InputAlert.fire({
      title: 'References',
      input: 'text',
      inputPlaceholder: 'Enter your Username',
      showCancelButton: true,
      inputValidator: (value): any => {
        if (!value) {
          return 'Username must not be empty!';
        }
      }
    });

    if (owner) {
      // Swal.fire('Entered owner: ' + owner);
      Axios.get(`${BASE_URL}/accounts/${owner}`)
        .then(res => {
          setResult(res.data);
          console.log(res.data);
        })
        .catch(err => {
          debugger;
        });
    }
  };
  useEffect(() => {
    alertIt();
  }, []);
  const [result, setResult] = useState<any>('');
  return (
    <PreWrapper>
      {!!result ? (
        <pre>
          <code className="language-json">
            {JSON.stringify(result, null, 2)}
          </code>
        </pre>
      ) : (
        <p>Loading</p>
      )}
    </PreWrapper>
  );
};
const PreWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 100%;
  padding: 0 calc(1rem + 1vw);

  pre {
    outline: 1px solid #ccc;
    padding: 5px;
    font-size: 80%;
    overflow: scroll;
    max-width: 610px;
  }
`;
export default AccountRefs;
