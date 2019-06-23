import React, { useState } from "react";
import styled from "styled-components";
import {
  CustomInput,
  FormGroup,
  Label,
  Badge,
  Row,
  Col,
  Input,
  UncontrolledTooltip,
  Button
} from "reactstrap";
import "./LemmaForm.css";

interface IAuthors {
  list: string[];
  input: string;
}
interface IParents {
  list: { id: number; ref: string; required: boolean }[];
  currentId: number;
}
const SearchInput = styled("div")<{ searchable: boolean }>`
  display: ${props => (props.searchable ? "block" : "none")};
  padding-left: 3rem;
`;
const AddMore = styled("span")`
  font-size: 2rem;
  font-weight: bold;
  color: #007bff;
  margin-left: 1rem;
  cursor: pointer;
  align-self: start;
`;
const AuthorFG = styled("div")`
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
const BadgeCon = styled("span")`
  font-size: 1.2rem;
`;
const LemmaForm = () => {
  // States
  const [owner, setOwner] = useState({ exists: false, name: "" });
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState<IAuthors>({ list: [], input: "" });
  const [parentsRefs, setParentsRefs] = useState<IParents>({
    list: [{ ref: "", required: false, id: 0 }],
    currentId: 0
  });
  const [search, setSearch] = useState({
    searchable: false,
    synopsis: ""
  });

  // Submit form
  const createRef = () => {
    console.log({ owner, title, authors, parentsRefs, search });
  };

  // Input Change Handlers
  const handleOwner = () => setOwner({ ...owner, exists: !owner.exists });

  const changeTitle = (t: EventTarget & HTMLInputElement) => setTitle(t.value);

  const changeSearchSynopsis = (sS: EventTarget & HTMLInputElement) =>
    setSearch({ ...search, synopsis: sS.value });

  const checkSearchable = () => {
    setSearch({ ...search, searchable: !search.searchable });
  };

  const changeAuthor = (input: EventTarget & HTMLInputElement) => {
    if (input.value.slice(-1) === ",") {
      setAuthors({ list: [...authors.list, authors.input], input: "" });
    } else {
      setAuthors({ ...authors, input: input.value });
    }
  };
  const addAuthor = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key.toLowerCase() === "enter") {
      setAuthors({ list: [...authors.list, authors.input], input: "" });
    }
  };

  const deleteAuthor = (delAuthor: string) => {
    const newAuthors = authors.list.filter(author => author !== delAuthor);
    setAuthors({ list: newAuthors, input: authors.input });
  };

  const changeParent = (ref: EventTarget & HTMLInputElement) => {
    const id = parseInt(ref.id || "0");
    const newParents = parentsRefs.list.map(p =>
      p.id === id ? { ...p, ref: ref.value } : p
    );
    setParentsRefs({ ...parentsRefs, list: newParents });
  };

  const addParent = () => {
    setParentsRefs({
      list: [
        ...parentsRefs.list,
        { id: ++parentsRefs.currentId, ref: "", required: false }
      ],
      currentId: parentsRefs.currentId++
    });
  };

  const deleteParent = (id: number) => {
    const newParents = parentsRefs.list.filter(parent => parent.id !== id);
    setParentsRefs({ list: newParents, currentId: parentsRefs.currentId });
  };

  const parentCheck = (eventId: string) => {
    const id = parseInt(eventId.replace(/[a-zA-Z]+/, "") || "0");
    const newParents = parentsRefs.list.map(p =>
      p.id === id ? { ...p, required: !p.required } : p
    );
    setParentsRefs({ ...parentsRefs, list: newParents });
  };

  return (
    <div className="form-container">
      <form>
        <div className="owner formgroup">
          <CustomInput
            type="switch"
            id="exampleCustomSwitch"
            onChange={handleOwner}
            checked={owner.exists}
            name="customSwitch"
            label="Owner"
          />
          {!!owner.exists && <span>TestUser123</span>}
        </div>
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
            <article key={author} style={{ display: "inline-block" }}>
              <BadgeCon id={author.replace(/\s+|[']/g, "-")}>
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
                target={author.replace(/\s+|[']/g, "-")}
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
                  <Input
                    type="text"
                    id={`${parent.id}`}
                    placeholder="Parent Ref"
                    value={parent.ref}
                    onChange={e => changeParent(e.target)}
                  />
                </Col>
                <Col md={6} className="parent-button">
                  <CustomInput
                    type="switch"
                    id={`check${parent.id}`}
                    onChange={e => parentCheck(e.target.id)}
                    checked={!parent.required}
                    label="Optional"
                  />
                  <button
                    type="button"
                    onClick={() => deleteParent(parent.id)}
                    className="delete-parent"
                  >
                    Delete
                  </button>
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
        <div className="recaptcha" />
        <Button onClick={createRef} color="success" className="mt-3">
          Create Ref
        </Button>
      </form>
    </div>
  );
};

export default LemmaForm;
