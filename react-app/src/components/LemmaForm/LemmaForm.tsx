import React, { useState } from 'react';
import CheckBox from '../StyledComponents/CheckBox';
import './LemmaForm.css';
import { Input } from '../StyledComponents/Input';
import Chip from '../StyledComponents/Chip';

interface IAuthors {
    list: string[],
    input: string
}
const LemmaForm = () => {
    // States
    const [owner, setOwner] = useState({exists: false, name: ''});
    const [title, setTitle] = useState('');
    const [authors, setAuthors] = useState<IAuthors>({list: [], input: ''});
    const [parentsRefs, setParentsRefs] = useState([{ref: '', optional: false}]);
    const [search, setSearch] = useState({searchable: false, title: '', synopsis: ''})
    // End States

    // const CreateRef = () => {
    //     console.log({owner, title, authors, parentsRefs, search})
    // }
    const handleOwner = () => setOwner({...owner, exists: !owner.exists})
    const changeTitle = (newTitle: string) => setTitle(newTitle);
    const changeSearchTitle = (title: string) => setSearch({...search, title});
    const changeSearchSynopsis = (synopsis: string) => setSearch({...search, synopsis});
    const changeAuthor = (input: string) => {
        if(input.slice(-1) === ',') {
            setAuthors({list: [...authors.list, authors.input], input: ''}) 
        } else {
            setAuthors({...authors, input})
        }
    }
    const deleteAuthor = (delAuthor: string) => {
        const newAuthors = authors.list.filter(author => author !== delAuthor)
        setAuthors({list: newAuthors, input: authors.input})
    }

    return <div className="form-container">
        <form>
            <div className="owner formgroup">
                <span className="text">Owner</span>
                <div className="check-owner" onClick={handleOwner}>
                    <CheckBox checked={owner.exists}/>
                </div>
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
                    <div className="parent">
                        <label htmlFor="parent">Title</label>
                        <input type="text" name="parent" id="parent"/>
                    </div>
                </div>
                <button className="add">Add New Parent</button>
            </div>
            <div className="search formgroup">
                <div className="text-toggle">
                    <span className="text">Searchable</span>
                    <div className="toggle-con">
                    </div>
                </div>
                <Input 
                name="search-title" changeHandle={changeSearchTitle}
                placeholder="Search Title"
                value={search.title}/>
                <Input 
                name="search-synopsis" changeHandle={changeSearchSynopsis}
                placeholder="Search Synopsis"
                value={search.synopsis}/>
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