import React, { useState } from 'react';
import styled from 'styled-components';

import CheckBox from '../StyledComponents/CheckBox';
import './LemmaForm.css';
import { Input } from '../StyledComponents/Input';
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
        list: [{ref: 'Kings', required: false, id: 0}],
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
        const id = parseInt(ref.dataset.id || '0');
        let oldParents = parentsRefs.list;
        let target = parentsRefs.list.filter(parent => parent.id === id)[0];
        let targetIndex = parentsRefs.list.findIndex(parent => parent.id === id);
        target.ref = ref.value;
        oldParents[targetIndex] = target;
        setParentsRefs({list: oldParents, currentId: parentsRefs.currentId})
    }

    const addParent = () => {
        setParentsRefs({
            list: [...parentsRefs.list, {id: ++parentsRefs.currentId, ref: '', required: false}], 
            currentId: ++parentsRefs.currentId
        })
    }

    const deleteParent = (id: number) => {
        const newParents = parentsRefs.list.filter(parent => parent.id !== id);
        setParentsRefs({list: newParents, currentId: parentsRefs.currentId})
    }

    const parentCheck = (id: number) => {
        let oldParents = parentsRefs.list;
        let target = parentsRefs.list.filter(parent => parent.id === id)[0];
        let targetIndex = parentsRefs.list.findIndex(parent => parent.id === id);
        target.required = !target.required;
        oldParents[targetIndex] = target;
        setParentsRefs({list: oldParents, currentId: parentsRefs.currentId})
    }

    return <div className="form-container">
        <form>
            <div className="owner formgroup">
                <span className="text">Owner</span>
                <CheckBox checked={owner.exists} checkToggle={handleOwner}/>
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
                <Input 
                    name="author" changeHandle={changeAuthor}
                    placeholder="Author(s) - Separate with commas"
                    value={authors.input}
                    displayLabel={false}
                />
            </div>
            <div className="parents-refs formgroup">
                <div className="parents">
                    {parentsRefs.list.map(parent => 
                        <div className="parent" key={parent.id}>
                            <Input 
                                name="author" changeHandle={changeParent}
                                placeholder="Parent Ref"
                                value={parent.ref}
                                dataId={parent.id}
                            />
                            <span className="optional">Optional</span>
                            <CheckBox checked={!parent.required} checkToggle={() => parentCheck(parent.id)}/>
                            <button type="button"
                            onClick={() => deleteParent(parent.id)}
                            className="delete-parent"
                            >Delete</button>
                        </div>
                    )}
                    <button className="add" type="button" onClick={addParent}>New Parent Ref</button>
                </div>
            </div>
            <div className="search formgroup">
                <div className="text-toggle">
                    <span className="text">Searchable</span>
                    <CheckBox checked={search.searchable} checkToggle={checkSearchable}/>
                </div>
                <SearchInput searchable={search.searchable}>
                    <Input 
                    name="search-title" changeHandle={changeSearchTitle}
                    placeholder="Search Title"
                    value={search.title}/>
                    <Input 
                    name="search-synopsis" changeHandle={changeSearchSynopsis}
                    placeholder="Search Synopsis"
                    value={search.synopsis}/>
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