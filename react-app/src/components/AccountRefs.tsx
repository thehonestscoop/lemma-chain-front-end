import React, { useEffect, useState } from 'react';
// import ReactMarkdown from 'react-markdown';
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
      const { value: password } = await InputAlert.fire({
        title: 'References',
        input: 'password',
        inputPlaceholder: 'Enter Password - optional'
      });

      if (password) {
        Axios.get(`${BASE_URL}/accounts/${owner}`, {
          headers: {
            'X-AUTH-ACCOUNT': '@' + owner,
            'X-AUTH-PASSWORD': password
          }
        })
          .then(res => {
            setResult(res.data);
          })
          .catch(err => {
            debugger;
            window.open(`${BASE_URL}/accounts/${owner}`, '_blank');
            if (err.response) {
              setLoading(`${err.response.statusText} - Opened in a new tab`);
            }
          });
      } else {
        setLoading(`Opened in a new tab`);
        window.open(`${BASE_URL}/accounts/${owner}`, '_blank');
      }
    }
  };
  useEffect(() => {
    alertIt();
  }, []);
  const [result, setResult] = useState<any>('');
  const [loading, setLoading] = useState('Loading!!!');
  return (
    <PreWrapper>
      {!!result ? (
        <pre>
          <code className="language-json">
            {JSON.stringify(result, null, 2)}
          </code>
        </pre>
      ) : (
        <h2>{loading}</h2>
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
