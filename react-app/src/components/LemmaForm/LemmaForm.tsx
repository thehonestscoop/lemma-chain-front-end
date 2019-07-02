import React, { useState } from 'react';
import styled from 'styled-components';
import ReCAPTCHA from 'react-google-recaptcha';
import {
  CustomInput,
  FormGroup,
  FormFeedback,
  Badge,
  Row,
  Col,
  Input,
  UncontrolledTooltip,
  Button
} from 'reactstrap';
import { IoMdTrash } from 'react-icons/io';
import './LemmaForm.css';
import { isNotRef, isNotOwner } from '../../helpers/input-validation';
import { RECAPTCHA_CLIENT_KEY, BASE_URL } from '../../helpers/Globals';
import Axios from 'axios';

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
  padding-left: 3rem;
`;
const AddMore = styled('span')`
  font-size: 2rem;
  font-weight: bold;
  color: #007bff;
  margin-left: 1rem;
  cursor: pointer;
  align-self: start;
`;
const AuthorFG = styled('div')`
  border: 1px solid #ced4da;
  padding: 5px 1rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  & > input {
    flex: 1 1 250px;
    margin-left: 10px;
    outline: none;
  }
`;
const BadgeCon = styled('span')`
  font-size: 1.2rem;
`;
const LemmaForm = (props: any) => {
  // States
  const [owner, setOwner] = useState({
    name: '',
    password: '',
    invalid: false
  });
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState<IAuthors>({ list: [], input: '' });
  const [parentsRefs, setParentsRefs] = useState<IParents>({
    list: [{ ref: '', required: false, id: 0, invalid: false }],
    currentId: 0
  });
  const [search, setSearch] = useState({
    searchable: false,
    synopsis: ''
  });
  const [recaptcha, setRecaptcha] = useState<string | null>('');

  // Submit form
  const createRef = () => {
    const nOwner = !!owner.password && !!owner.name ? '@' + owner.name : '';
    const ownerLink = !!owner.name ? '@' + owner.name + '/' : '';
    const filteredParents = parentsRefs.list.filter(p => !!p.ref);
    const parents = filteredParents.map(p =>
      p.required
        ? `required:${ownerLink}${p.ref}`
        : `recommended:${ownerLink}${p.ref}`
    );

    const data = JSON.stringify({
      title,
      authors: JSON.stringify(authors.list)
    });
    const search_title = `${title} ${authors.list.join(' ')}`;
    const search_synopsis = !!search.searchable ? search.synopsis : '';
    const recaptcha_code = recaptcha;

    if (recaptcha_code === '') {
      alert('Please Verify Recaptcha');
    } else if (search.searchable && !search_synopsis) {
      alert('Search synopsis must not be empty for searchable refs');
    } else if (owner.name && !owner.password) {
      alert('Password must be filled when Username is set');
    } else if (title === '') {
      alert('Title must not be empty');
    } else if (authors.list.length === 0) {
      alert('Must have at least one Author');
    } else if (filteredParents.some(p => isNotRef.test(p.ref))) {
      alert('Some parents refs are invalid');
    } else {
      const req = {
        parents,
        data,
        searchable: search.searchable,
        recaptcha_code
      };
      const withOwner = !!nOwner ? { ...req, owner: nOwner } : req;
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
      // console.log(withSearch, headers)
      Axios.post(`${BASE_URL}/ref`, withSearch, { headers })
        .then(res => {
          props.addRef(res.data.link);
          alert('Ref Successflly Created');
        })
        .catch(err => {
          debugger;
          alert(JSON.stringify(err.response));
        });
    }
  };

  // Input Change Handlers
  const handleOwner = (input: EventTarget & HTMLInputElement) => {
    if (isNotOwner.test(input.value) && input.id === 'name') {
      setOwner({ ...owner, [input.id]: input.value, invalid: true });
    } else {
      setOwner({ ...owner, [input.id]: input.value, invalid: false });
    }
  };
  const handleRecaptcha = (val: string | null) => setRecaptcha(val);

  const changeTitle = (t: EventTarget & HTMLInputElement) => setTitle(t.value);

  const changeSearchSynopsis = (sS: EventTarget & HTMLInputElement) =>
    setSearch({ ...search, synopsis: sS.value });

  const checkSearchable = () => {
    setSearch({ ...search, searchable: !search.searchable });
  };

  const changeAuthor = (input: EventTarget & HTMLInputElement) => {
    if (input.value.slice(-1) === ',') {
      setAuthors({ list: [...authors.list, authors.input], input: '' });
    } else {
      setAuthors({ ...authors, input: input.value });
    }
  };
  const addAuthor = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key.toLowerCase() === 'enter') {
      setAuthors({ list: [...authors.list, authors.input], input: '' });
    }
  };

  const deleteAuthor = (delAuthor: string) => {
    const newAuthors = authors.list.filter(author => author !== delAuthor);
    setAuthors({ list: newAuthors, input: authors.input });
  };

  const changeParent = (ref: EventTarget & HTMLInputElement) => {
    const id = parseInt(ref.id || '0');
    const newParents = parentsRefs.list.map(p =>
      p.id === id
        ? isNotRef.test(ref.value)
          ? { ...p, ref: ref.value, invalid: true }
          : { ...p, ref: ref.value, invalid: false }
        : p
    );
    setParentsRefs({ ...parentsRefs, list: newParents });
  };

  const addParent = () => {
    setParentsRefs({
      list: [
        ...parentsRefs.list,
        {
          id: ++parentsRefs.currentId,
          ref: '',
          required: false,
          invalid: false
        }
      ],
      currentId: parentsRefs.currentId++
    });
  };

  const deleteParent = (id: number) => {
    const newParents = parentsRefs.list.filter(parent => parent.id !== id);
    setParentsRefs({ list: newParents, currentId: parentsRefs.currentId });
  };

  const parentCheck = (eventId: string) => {
    const id = parseInt(eventId.replace(/[a-zA-Z]+/, '') || '0');
    const newParents = parentsRefs.list.map(p =>
      p.id === id ? { ...p, required: !p.required } : p
    );
    setParentsRefs({ ...parentsRefs, list: newParents });
  };

  return (
    <div className="form-container" style={{ width: '100%' }}>
      <form style={{ width: '100%', padding: '0 3rem' }}>
        <h3 style={{ textAlign: 'center' }}>Create References</h3>
        <p
          style={{
            textAlign: 'center',
            marginBottom: '1.3rem',
            color: '#666666'
          }}
        >
          To create an owned reference, make sure to fill in your username and
          password
        </p>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Input
                type="text"
                invalid={owner.invalid}
                id="name"
                placeholder="Username"
                value={owner.name}
                onChange={e => handleOwner(e.target)}
              />
              <FormFeedback invalid="">
                Username must not contain (@, /, or whitespace)
              </FormFeedback>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup style={{ display: !!owner.name ? 'block' : 'none' }}>
              <Input
                type="password"
                id="password"
                onChange={e => handleOwner(e.target)}
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
        <AuthorFG>
          {authors.list.map(author => (
            <article key={author} style={{ display: 'inline-block' }}>
              <BadgeCon id={author.replace(/\s+|[']/g, '-')}>
                <Badge
                  color="secondary"
                  pill
                  onDoubleClick={() => deleteAuthor(author)}
                >
                  {author}
                </Badge>
              </BadgeCon>
              <UncontrolledTooltip
                placement="bottom"
                target={author.replace(/\s+|[']/g, '-')}
              >
                Double Click to Remove
              </UncontrolledTooltip>
            </article>
          ))}
          <Input
            onChange={e => changeAuthor(e.target)}
            plaintext
            onKeyPress={e => addAuthor(e)}
            className="mt-1"
            placeholder="Author(s) - Enter to add more"
            value={authors.input}
          />
        </AuthorFG>
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
                      Should contain only alphanumerals
                    </FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={6} className="parent-button">
                  <CustomInput
                    type="switch"
                    id={`check${parent.id}`}
                    color="success"
                    onChange={e => parentCheck(e.target.id)}
                    checked={!parent.required}
                    label="optional"
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
            <Input
              type="text"
              placeholder="Search Synopsis"
              value={search.synopsis}
              onChange={e => changeSearchSynopsis(e.target)}
              className="mt-2"
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

export default LemmaForm;
