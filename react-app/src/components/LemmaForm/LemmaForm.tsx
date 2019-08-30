<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
import React, { useState, useEffect, KeyboardEvent } from 'react';
>>>>>>> visible
import styled from 'styled-components';
import ReCAPTCHA from 'react-google-recaptcha';
import {
  CustomInput,
  FormGroup,
  FormFeedback,
  Row,
  Col,
  Input,
  Button
} from 'reactstrap';
import './LemmaForm.css';
import { isNotOwner, isUrl, isEmail } from '../../helpers/input-validation';
import {
  RECAPTCHA_CLIENT_KEY,
  BASE_URL,
  alertError,
  alertWarning,
  alertSuccess
} from '../../helpers/Globals';
import Axios from 'axios';
import Textarea from 'react-textarea-autosize';
import queryString from 'query-string-for-all';
import CreatableSelect from 'react-select/creatable';
import LogoDark from '../../logo-dark';
interface ISelect {
  inputValue: string;
  value: any[];
}

interface ISelectValues {
  value: string;
  label: string;
}

const filterAdjacent = (arr: {}[], adjArr: {}[]) =>
  arr.filter((a: any) => !adjArr.some((ad: any) => ad.value === a.value));

const filterSelf = (arr: ISelectValues[]) =>
  arr.reduce(
    (acc: ISelectValues[], b: ISelectValues) =>
      !acc.some((ai: any) => ai.value === b.value) ? [...acc, b] : acc,
    []
  );

const SearchInput = styled('div')<{ searchable: boolean }>`
  display: ${props => (props.searchable ? 'block' : 'none')};
`;

const LemmaForm = (props: any) => {
  const query = queryString.parse(props.location.search);
  // Activation notification
  function activationAlert() {
    setTimeout(() => {
      if (query.activated === '1') {
        alertSuccess('Account has been created');
      } else if (query.activated === '0') {
        alertError('Activation code has expired');
      }
    }, 3000);
  }
  useEffect(() => {
    activationAlert();
  }, [activationAlert, query.activated]);

  // States
  const [owner, setOwner] = useState({
    name: '',
    password: '',
    invalid: false
  });
  const [url, setUrl] = useState({ link: '', invalid: false });
  const [title, setTitle] = useState('');
  const [search, setSearch] = useState({
    searchable: false,
    synopsis: ''
  });
  const [authors, setAuthors] = useState<ISelect>({
    inputValue: '',
    value: []
  });
  const [recommended, setRecommended] = useState<ISelect>({
    inputValue: '',
    value: []
  });
  const [required, setRequired] = useState<ISelect>({
    inputValue: '',
    value: []
  });
  const [recaptcha, setRecaptcha] = useState<string | null>('');
  const [refState, setRefState] = useState({
    required: false,
    recomend: false
  });

  // Reset form
  const resetForm = () => {
    setOwner({
      name: '',
      password: '',
      invalid: false
    });
    setUrl({ link: '', invalid: false });
    setTitle('');
    setSearch({
      searchable: false,
      synopsis: ''
    });
    setAuthors({
      inputValue: '',
      value: []
    });
  };

  // Submit form
  const createRef = () => {
    const nOwner = !!owner.password && !!owner.name ? '@' + owner.name : '';
    const ownerLink = !!owner.name ? '@' + owner.name + '/' : '';
    const processedAuthors: string[] = authors.value.map(au => au.value);
    const processedRecom = recommended.value.map(
      rec => `recommended:${ownerLink}${rec.value}`
    );
    const processedReq = required.value.map(
      req => `required:${ownerLink}${req.value}`
    );
    const Idata = !!url.link
      ? {
          title,
          authors: JSON.stringify(processedAuthors),
          url: url.link
        }
      : {
          title,
          authors: JSON.stringify(processedAuthors)
        };
    const data = JSON.stringify(Idata);
    const search_title = `${title} ${processedAuthors.join(' ')}`;
    const search_synopsis = !!search.searchable ? search.synopsis : '';
    const recaptcha_code = recaptcha;

    if (!recaptcha_code) {
      alertWarning('Recaptcha not verified, please refresh page');
    } else if (search.searchable && !search_synopsis) {
      alertWarning('Search synopsis must not be empty for searchable refs');
    } else if (owner.name && !owner.password) {
      alertWarning('Password must be filled when account is set');
    } else if (title === '') {
      alertWarning('Title must not be empty');
    } else if (!!url.link && !isUrl.test(url.link)) {
      alertWarning('Url is invalid');
    } else if (processedAuthors.length === 0) {
      alertWarning('Must have at least one Author');
    } else {
      const req = {
        parents: [...processedRecom, ...processedReq],
        data,
        searchable: search.searchable,
        recaptcha_code
      };
      const withOwner = !!nOwner ? { ...req, owner: owner.name } : req;
      const withSearch = search.searchable
        ? { ...withOwner, search_title, search_synopsis }
        : withOwner;
      const headers =
        !!owner.name && !!owner.password
          ? {
              'X-AUTH-ACCOUNT': '@' + owner.name,
              'X-AUTH-PASSWORD': owner.password
            }
          : {};
      // console.log(withSearch, headers);
      Axios.post(`${BASE_URL}/ref`, withSearch, { headers })
        .then(res => {
          props.addRef(res.data.link, title);
          alertSuccess('Ref Successflly Created');
          resetForm();
        })
        .catch(err => {
          if (err.response) {
            alertError(err.response.data.error);
          } else {
            alertError(err.message);
          }
        });
    }
  };

  // Input Change Handlers
  const handleUrl = (val: string) => {
    isUrl.test(val) || !val
      ? setUrl({ link: val, invalid: false })
      : setUrl({ link: val, invalid: true });
  };
  const handleOwner = (input: EventTarget & HTMLInputElement) => {
    if (
      ((isNotOwner.test(input.value) && !isEmail.test(input.value)) ||
        (!isNotOwner.test(input.value) && isEmail.test(input.value))) &&
      input.id === 'name'
    ) {
      setOwner({ ...owner, [input.id]: input.value, invalid: true });
    } else {
      setOwner({ ...owner, [input.id]: input.value, invalid: false });
    }
  };
  const handleRecaptcha = (val: string | null) => setRecaptcha(val);

  const changeTitle = (t: EventTarget & HTMLInputElement) => setTitle(t.value);

  const changeSearchSynopsis = (sS: EventTarget & HTMLTextAreaElement) =>
    setSearch({ ...search, synopsis: sS.value });

  const checkSearchable = () => {
    setSearch({ ...search, searchable: !search.searchable });
  };
  // Createselect
  const handleSelectDelete = (value: any[], det: string) => {
    switch (det) {
      case 'authors':
        !!value
          ? setAuthors({ ...authors, value })
          : setAuthors({ ...authors, value: [] });
        break;
      case 'recom':
        !!value
          ? setRecommended({ ...recommended, value })
          : setRecommended({ ...recommended, value: [] });
        break;
      case 'req':
        !!value
          ? setRequired({ ...required, value })
          : setRequired({ ...required, value: [] });
        break;
    }
  };
  const handleSelectInputChange = (inputValue: string, det: string) => {
    switch (det) {
      case 'authors':
        setAuthors({ ...authors, inputValue });
        break;
      case 'recom':
        if (
          required.value.some(req => req.value === inputValue) ||
          recommended.value.some(req => req.value === inputValue)
        ) {
          setRefState({ ...refState, recomend: true });
        } else {
          setRefState({ ...refState, recomend: false });
        }
        setRecommended({ ...recommended, inputValue });
        // if inputValue is contained in required, trigger error else do the inverse
        break;
      case 'req':
        if (
          recommended.value.some(rec => rec.value === inputValue) ||
          required.value.some(req => req.value === inputValue)
        ) {
          setRefState({ ...refState, required: true });
        } else {
          setRefState({ ...refState, required: false });
        }
        setRequired({ ...required, inputValue });
    }
  };
  const createOption = (label: string) => {
    return { label, value: label };
  };

  const changeLabel = async (inputValue: string, det: string) => {
    try {
      const ref = await Axios.get(`${BASE_URL}/${inputValue}?depth=1`);
      const title = ref.data.data.title;
      switch (det) {
        case 'req':
          setRequired(pre => {
            pre.value.map(v => {
              return v.value === inputValue
                ? (v.label =
                    `${title} (${inputValue})`.length > 20
                      ? `${title} (${inputValue})`.slice(0, 17).concat('...')
                      : `${title} (${inputValue})`)
                : v;
            });
            return pre;
          });
          break;
        case 'recom':
          setRecommended(pre => {
            pre.value.map(v => {
              return v.value === inputValue
                ? (v.label =
                    `${title} (${inputValue})`.length > 20
                      ? `${title} (${inputValue})`.slice(0, 17).concat('...')
                      : `${title} (${inputValue})`)
                : v;
            });
            return pre;
          });
      }
    } catch (error) {}
  };

  const handleSelectKeyDown = (event: KeyboardEvent, det: string) => {
    if (!authors.inputValue && !recommended.inputValue && !required.inputValue)
      return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        switch (det) {
          case 'authors':
            setAuthors({
              inputValue: '',
              value: filterSelf([
                ...authors.value,
                createOption(authors.inputValue)
              ])
            });
            break;
          case 'recom':
            const inputM = recommended.inputValue;
            setRecommended({
              inputValue: '',
              value: filterAdjacent(
                filterSelf([...recommended.value, createOption(inputM)]),
                required.value
              )
            });
            changeLabel(inputM, 'recom');
            break;
          case 'req':
            const inputR = required.inputValue;
            setRequired({
              inputValue: '',
              value: filterAdjacent(
                filterSelf([...required.value, createOption(inputR)]),
                recommended.value
              )
            });
            changeLabel(inputR, 'req');
        }
        event.preventDefault();
    }
  };
  // end createselect

  return (
    <div className="form-container" style={{ width: '100%' }}>
      <div style={{ width: '100%', padding: '0 5vw' }}>
        <Logo>
          <LogoDark rect_bg="white" bubble_color="#33cc33" />
        </Logo>
        <h3
          style={{ textAlign: 'center' }}
          onClick={() => props.addRef('refere')}
        >
          Create References
        </h3>
        <p
          style={{
            textAlign: 'center',
            marginBottom: '1.3rem',
            color: '#666666'
          }}
        >
          To create an owned reference, make sure to fill in your account and
          password
        </p>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Input
                type="text"
                invalid={owner.invalid}
                id="name"
                placeholder="Account"
                value={owner.name}
                onChange={e => handleOwner(e.target)}
              />
              <FormFeedback invalid="">
                Account must be a valid email or account
              </FormFeedback>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup style={{ display: !!owner.name ? 'block' : 'none' }}>
              <Input
                type="password"
                id="password"
                onChange={e => handleOwner(e.target)}
                autoComplete="new-password"
                value={owner.password}
                placeholder="Password"
              />
            </FormGroup>
          </Col>
        </Row>
        <div className="formgroup">
          <Input
            name="title"
            onChange={e => changeTitle(e.target)}
            placeholder="Title"
            value={title}
          />
        </div>
        <CreatableSelect
          components={{ DropdownIndicator: null }}
          inputValue={authors.inputValue}
          isClearable
          isMulti
          className="mt-3"
          menuIsOpen={false}
          onChange={v => handleSelectDelete(v, 'authors')}
          onInputChange={v => handleSelectInputChange(v, 'authors')}
          onKeyDown={e => handleSelectKeyDown(e, 'authors')}
          placeholder="Type Author's name and press enter..."
          value={authors.value}
        />
        <FormGroup>
          <CreatableSelect
            components={{ DropdownIndicator: null }}
            inputValue={recommended.inputValue}
            isClearable
            className="mt-3"
            isMulti
            menuIsOpen={false}
            onChange={v => handleSelectDelete(v, 'recom')}
            onInputChange={v => handleSelectInputChange(v, 'recom')}
            onKeyDown={e => handleSelectKeyDown(e, 'recom')}
            placeholder="Type Recommended ref and press enter..."
            value={recommended.value}
          />
          <Input
            type="text"
            style={{ display: 'none' }}
            // onChange={e => handleOwner(e.target)}
            // value={owner.password}
            placeholder="hidden"
            invalid={refState.recomend}
          />
          <FormFeedback invalid="">Refs must not be a duplicate</FormFeedback>
        </FormGroup>
        <FormGroup invalid="">
          <CreatableSelect
            components={{ DropdownIndicator: null }}
            inputValue={required.inputValue}
            isClearable
            className="mt-3"
            isMulti
            menuIsOpen={false}
            onChange={v => handleSelectDelete(v, 'req')}
            onInputChange={v => handleSelectInputChange(v, 'req')}
            onKeyDown={e => handleSelectKeyDown(e, 'req')}
            placeholder="Type Required ref and press enter..."
            value={required.value}
          />
          <Input
            type="text"
            style={{ display: 'none' }}
            // onChange={e => handleOwner(e.target)}
            // value={owner.password}
            placeholder="hidden"
            invalid={refState.required}
          />
          <FormFeedback invalid="">Refs must not be a duplicate</FormFeedback>
        </FormGroup>
        <div className="optional_url formgroup">
          <FormGroup>
            <Input
              onChange={e => handleUrl(e.target.value)}
              invalid={url.invalid}
              className="mt-3"
              placeholder="Optional URL"
              value={url.link}
            />
            <FormFeedback invalid="">URL is invalid</FormFeedback>
          </FormGroup>
        </div>
        <div className="search formgroup">
          <CustomInput
            type="switch"
            id="search-toggle"
            onChange={checkSearchable}
            checked={search.searchable}
            name="customSwitch"
            label="Searchable"
          />
          <SearchInput searchable={search.searchable}>
            <TextareaStyled
              type="text"
              placeholder="Search Synopsis"
              value={search.synopsis}
              onChange={e => changeSearchSynopsis(e.target)}
              className="mt-2"
              maxRows={3}
            />
          </SearchInput>
        </div>
        <div className="recaptcha">
          <ReCAPTCHA
            sitekey={RECAPTCHA_CLIENT_KEY}
            // onChange={val => handleRecaptcha(val)}
            onChange={val => setRecaptcha(val)}
            onExpired={() => recaptchaRef.current!.execute()}
            ref={recaptchaRef}
            size="invisible"
          />
        </div>
        <Button onClick={createRef} color="success" className="mt-3">
          Create Ref
        </Button>
      </div>
    </div>
  );
};
export const Logo = styled.div`
  display: none;
  @media (max-width: 768px) {
    overflow: hidden;
    height: 100px;
    display: block;
    width: 100px;
    margin: 0 auto;
    margin-bottom: 1.2rem;
    border-radius: 50%;
  }
`;
const TextareaStyled = styled(Textarea)`
  height: 38px;
  width: 100%;
  min-height: 36px;
  font-size: 1rem;
  padding: 0.375rem 0.75rem;
  font-weight: 400;
  line-height: 1.5;
  color: rgb(73, 80, 87);
  background-color: rgb(255, 255, 255);
  background-clip: padding-box;
  border: 1px solid rgb(206, 212, 218);
  border-radius: 0.25rem;
`;
export default LemmaForm;
