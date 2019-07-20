import React, { useState, useEffect, KeyboardEvent } from 'react';
import styled from 'styled-components';
import ReCAPTCHA from 'react-google-recaptcha';
import {
  CustomInput,
  FormGroup,
  FormFeedback,
  Row,
  Col,
  Input,
  UncontrolledTooltip,
  Button
} from 'reactstrap';
import { IoMdTrash } from 'react-icons/io';
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
import '../../../node_modules/noty/lib/noty.css';
import '../../../node_modules/noty/lib/themes/bootstrap-v4.css';
import Noty from 'noty';
import CreatableSelect from 'react-select/creatable';
import LogoDark from '../../logo-dark';

interface IAuthors {
  list: string[];
  input: string;
}
interface IParents {
  list: { id: number; ref: string; required: boolean; invalid: boolean }[];
  currentId: number;
}
const SearchInput = styled('div')<{ searchable: boolean }>`
  display: ${props => (props.searchable ? 'block' : 'none')};
`;
const AddMore = styled('span')`
  font-size: 2rem;
  font-weight: bold;
  color: #007bff;
  margin-left: 1rem;
  cursor: pointer;
  align-self: start;
`;
const LemmaForm = (props: any) => {
  const query = queryString.parse(props.location.search);
  // Activation notification
  useEffect(() => {
    if (query.activated === '1') {
      new Noty({
        text: 'Account has been created',
        theme: 'bootstrap-v4',
        type: 'success',
        closeWith: ['button', 'click'],
        animation: {
          open: 'animated bounceInRight',
          close: 'animated bounceOutRight'
        }
      }).show();
    } else if (query.activated === '0') {
      new Noty({
        text: 'Activation code has expired',
        theme: 'bootstrap-v4',
        closeWith: ['button', 'click'],
        type: 'error',
        animation: {
          open: 'animated bounceInRight',
          close: 'animated bounceOutRight'
        }
      }).show();
    }
  }, [query.activated]);

  // States
  const [owner, setOwner] = useState({
    name: '',
    password: '',
    invalid: false
  });
  const [url, setUrl] = useState({ link: '', invalid: false });
  const [title, setTitle] = useState('');
  const [parentsRefs, setParentsRefs] = useState<IParents>({
    list: [{ ref: '', required: true, id: 0, invalid: false }],
    currentId: 0
  });
  const [search, setSearch] = useState({
    searchable: false,
    synopsis: ''
  });
  const [authors, setAuthors] = useState<{ inputValue: string; value: any[] }>({
    inputValue: '',
    value: []
  });
  const [recaptcha, setRecaptcha] = useState<string | null>('');

  // Reset form
  const resetForm = () => {
    setOwner({
      name: '',
      password: '',
      invalid: false
    });
    setUrl({ link: '', invalid: false });
    setTitle('');
    setParentsRefs({
      list: [{ ref: '', required: true, id: 0, invalid: false }],
      currentId: 0
    });
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
    const filteredParents = parentsRefs.list.filter(p => !!p.ref);
    const processedAuthors = authors.value.map(au => au.value);
    const parents = filteredParents.map(p =>
      p.required
        ? `required:${ownerLink}${p.ref}`
        : `recommended:${ownerLink}${p.ref}`
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
    const search_title = `${title} ${authors.value.join(' ')}`;
    const search_synopsis = !!search.searchable ? search.synopsis : '';
    const recaptcha_code = recaptcha;

    if (recaptcha_code === '') {
      alertWarning('Please Verify Recaptcha');
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
        parents,
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

  const changeParent = (ref: EventTarget & HTMLInputElement) => {
    const id = parseInt(ref.id || '0');
    const duplicate = parentsRefs.list.some(p => p.ref === ref.value);
    const newParents = parentsRefs.list.map(p =>
      p.id === id
        ? duplicate && !!ref.value
          ? { ...p, ref: ref.value, invalid: true }
          : { ...p, ref: ref.value, invalid: false }
        : p
    );
    setParentsRefs({ ...parentsRefs, list: newParents });
  };

  const addParent = () => {
    if (parentsRefs.list.every(p => !!p.ref)) {
      setParentsRefs({
        list: [
          {
            id: ++parentsRefs.currentId,
            ref: '',
            required: true,
            invalid: false
          },
          ...parentsRefs.list
        ],
        currentId: parentsRefs.currentId++
      });
    }
  };

  const deleteParent = (id: number) => {
    if (parentsRefs.list.length > 1) {
      const newParents = parentsRefs.list.filter(parent => parent.id !== id);
      setParentsRefs({ list: newParents, currentId: parentsRefs.currentId });
    } else {
      const newParents = parentsRefs.list.map(p =>
        p.id === id ? { ...p, ref: '' } : p
      );
      setParentsRefs({ ...parentsRefs, list: newParents });
    }
  };

  const parentCheck = (eventId: string) => {
    const id = parseInt(eventId.replace(/[a-zA-Z]+/, '') || '0');
    const newParents = parentsRefs.list.map(p =>
      p.id === id ? { ...p, required: !p.required } : p
    );
    setParentsRefs({ ...parentsRefs, list: newParents });
  };
  // Createselect
  const handleSelectChange = (value: any[]) => {
    if (!!value) {
      setAuthors({ ...authors, value });
    } else {
      setAuthors({ ...authors, value: [] });
    }
  };
  const handleSelectInputChange = (inputValue: string) => {
    setAuthors({ ...authors, inputValue });
    // console.log(authors);
  };
  const createOption = (label: string) => ({
    label,
    value: label
  });
  const handleSelectKeyDown = (event: KeyboardEvent) => {
    if (!authors.inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setAuthors({
          inputValue: '',
          value: [...authors.value, createOption(authors.inputValue)]
        });
        event.preventDefault();
    }
  };
  // end createselect

  return (
    <div className="form-container" style={{ width: '100%' }}>
      <form style={{ width: '100%', padding: '0 5vw' }}>
        <div className="logo">
          <LogoDark />
        </div>
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
          menuIsOpen={false}
          onChange={handleSelectChange}
          onInputChange={handleSelectInputChange}
          onKeyDown={handleSelectKeyDown}
          placeholder="Type Author's name and press enter..."
          value={authors.value}
        />
        <div className="optional_url formgroup">
          <FormGroup>
            <Input
              onChange={e => handleUrl(e.target.value)}
              invalid={url.invalid}
              className="mt-3"
              placeholder="Optional Url"
              value={url.link}
            />
            <FormFeedback invalid="">URL is invalid</FormFeedback>
          </FormGroup>
        </div>
        <div className="parents-refs formgroup">
          <div className="parents">
            {parentsRefs.list.map(parent => (
              <Row key={parent.id} className="mb-1">
                <Col md={6}>
                  <FormGroup>
                    <Input
                      invalid={parent.invalid}
                      type="text"
                      id={`${parent.id}`}
                      placeholder="Parent Ref"
                      value={parent.ref}
                      onChange={e => changeParent(e.target)}
                    />
                    <FormFeedback invalid="">
                      Doesn't allow duplicates
                    </FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={6} className="parent-button">
                  <CustomInput
                    type="switch"
                    id={`check${parent.id}`}
                    color="success"
                    onChange={e => parentCheck(e.target.id)}
                    checked={parent.required}
                    label="required"
                  />
                  <IoMdTrash
                    color="#f74949"
                    size="1.5em"
                    onClick={() => deleteParent(parent.id)}
                  />
                </Col>
              </Row>
            ))}
          </div>
          <AddMore onClick={addParent} id="addMoreParents">
            +
          </AddMore>
          <UncontrolledTooltip placement="bottom" target="addMoreParents">
            Add More Parent Refs
          </UncontrolledTooltip>
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
            onChange={val => handleRecaptcha(val)}
          />
        </div>
        <Button onClick={createRef} color="success" className="mt-3">
          Create Ref
        </Button>
      </form>
    </div>
  );
};
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
