import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { BASE_URL } from '../helpers/Globals';
import Axios from 'axios';
import styled from 'styled-components';

const InputAlert = withReactContent(Swal);

const AccountRefs = (props: any) => {
  const alertIt = async () => {
    const { value: owner } = await InputAlert.fire({
      title: 'Account',
      input: 'text',
      inputPlaceholder: 'Enter your account',
      showCancelButton: true,
      inputValidator: (value): any => {
        if (!value) {
          return 'UseAccountrname must not be empty!';
        }
      }
    });

    if (owner) {
      const { value: password } = await InputAlert.fire({
        title: 'Password',
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
            window.open(`${BASE_URL}/accounts/${owner}`, '_blank');
            if (err.response) {
              setLoading(`${err.response.statusText} - Opened in a new tab`);
            } else {
              setLoading(err.message);
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
    max-width: 550px;
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: var(--primary);
    }

    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.3);
      -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      background-color: #f5f5f5;
    }
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      background-color: #f5f5f5;
    }
  }
`;
export default AccountRefs;
