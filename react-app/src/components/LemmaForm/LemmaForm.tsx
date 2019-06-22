import React, { useState } from 'react';
import styled from 'styled-components';
import { CustomInput, FormGroup, Label, Row, Col, Input, Button } from 'reactstrap';

import CheckBox from '../StyledComponents/CheckBox';
import './LemmaForm.css';
// import { Input } from '../StyledComponents/Input';
import Chip from '../StyledComponents/Chip';

interface IAuthors {
    list: string[],
    input: string
}
interface IParents {
    list: {id: number, ref: string, required: boolean}[]
    currentId: number 
}
const SearchInput = styled('div')<{searchable: boolean}>`
    display: ${props => props.searchable ? 'block': 'none'};
    padding-left: 3rem;
`;
const LemmaForm = () => {
    // States
    const [owner, setOwner] = useState({exists: false, name: ''});
    const [title, setTitle] = useState('');
    const [authors, setAuthors] = useState<IAuthors>({list: [], input: ''});
    const [parentsRefs, setParentsRefs] = useState<IParents>({
        list: [{ref: '', required: false, id: 0}],
        currentId: 0
    });
    const [search, setSearch] = useState({searchable: false, title: '', synopsis: ''})
    
    // Submit form
    const CreateRef = () => {
        console.log({owner, title, authors, parentsRefs, search})
    }

    // Input Change Handlers
    const handleOwner = () => setOwner({...owner, exists: !owner.exists})

    const changeTitle = (t: EventTarget & HTMLInputElement) => setTitle(t.value);

    const changeSearchTitle = (sT: EventTarget & HTMLInputElement) => setSearch({...search, title: sT.value});

    const changeSearchSynopsis = (sS: EventTarget & HTMLInputElement) => setSearch({...search, synopsis: sS.value});

    const checkSearchable = () => {
        setSearch({...search, searchable: !search.searchable})
    }

    const changeAuthor = (input: EventTarget & HTMLInputElement) => {
        if(input.value.slice(-1) === ',') {
            setAuthors({list: [...authors.list, authors.input], input: ''}) 
        } else {
            setAuthors({...authors, input: input.value})
        }
    }

    const deleteAuthor = (delAuthor: string) => {
        const newAuthors = authors.list.filter(author => author !== delAuthor)
        setAuthors({list: newAuthors, input: authors.input})
    }

    const changeParent = (ref: EventTarget & HTMLInputElement) => {
        const id = parseInt(ref.id || '0');
        const newParents = parentsRefs.list.map(p => p.id === id? {...p, ref: ref.value}: p)
        setParentsRefs({...parentsRefs, list: newParents})
    }

    const addParent = () => {
        setParentsRefs({
            list: [...parentsRefs.list, {id: ++parentsRefs.currentId, ref: '', required: false}], 
            currentId: parentsRefs.currentId++
        })
    }

    const deleteParent = (id: number) => {
        const newParents = parentsRefs.list.filter(parent => parent.id !== id);
        setParentsRefs({list: newParents, currentId: parentsRefs.currentId})
    }

    const parentCheck = (eventId: string) => {
        const id = parseInt(eventId.replace(/[a-zA-Z]+/,'') || '0');
        const newParents = parentsRefs.list.map(p => p.id === id ? {...p, required: !p.required} : p)
        setParentsRefs({...parentsRefs, list: newParents})
    }

    return <div className="form-container">
        <form>
            <div className="owner formgroup">
                <CustomInput 
                 type="switch" id="exampleCustomSwitch"
                 onChange={handleOwner}
                 checked={owner.exists} name="customSwitch"
                 label="Owner" />
                {!!owner.exists &&
                <span>TestUser123</span>
                }
            </div>
            <div className="formgroup">
                <Input 
                    name="title" changeHandle={changeTitle}
                    placeholder="Ref Title"
                    value={title}/>
            </div>
            <div className="authors formgroup">
                {authors.list.map(author => 
                    <Chip data={author} key={author} deleteChip={deleteAuthor}/>
                )}
                {/* <Input 
                    name="author" changeHandle={changeAuthor}
                    placeholder="Author(s) - Separate with commas"
                    value={authors.input}
                    displayLabel={false}
                /> */}
            </div>
            <div className="parents-refs formgroup">
                <div className="parents">
                    {parentsRefs.list.map(parent =>
                        <Row key={parent.id} form="true">
                            <Col md={6}>
                                <Input type="text" id={`${parent.id}`}
                                placeholder="Parent Ref"
                                value={parent.ref}
                                onChange={e => changeParent(e.target)} />
                            </Col>
                            <Col md={6} className='parent-button'>
                                    <CustomInput 
                                    type="switch" id={`check${parent.id}`}
                                    onChange={e => parentCheck(e.target.id)}
                                    checked={!parent.required}
                                    label="Optional" />
                                    <button type="button"
                                    onClick={() => deleteParent(parent.id)}
                                    className="delete-parent"
                                    >Delete</button>
                            </Col>
                        </Row>
                    )}
                </div>
                <Button color="primary" onClick={addParent} className="mt-3">New Parent Ref</Button>
            </div>
            <div className="search formgroup">
                <CustomInput 
                 type="switch" id="search-toggle"
                 onChange={checkSearchable}
                 checked={search.searchable} name="customSwitch"
                 label="Searchable" />
                <SearchInput searchable={search.searchable}>
                    {/* <Input 
                    name="search-title" changeHandle={changeSearchTitle}
                    placeholder="Search Title"
                    value={search.title}/>
                    <Input 
                    name="search-synopsis" changeHandle={changeSearchSynopsis}
                    placeholder="Search Synopsis"
                    value={search.synopsis}/> */}
                </SearchInput>
            </div>
            <div className="recaptcha"></div>
            <input type="submit" value="Create Ref"/>
        </form>
    <p>owner: {JSON.stringify(owner)}</p>
    <p>title: {title}</p>
    <p>authors: {JSON.stringify(authors)}</p>
    <p>parents: {JSON.stringify(parentsRefs)}</p>
    <p>search: {JSON.stringify(search)}</p>
    </div>
}

export default LemmaForm;