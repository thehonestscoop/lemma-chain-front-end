import React, { useState } from 'react';

const LemmaForm = () => {
    const [owner, setOwner] = useState({exists: false, name: ''});
    const [title, setTitle] = useState('');
    const [authors, setAuthors] = useState([]);
    const [parentsRefs, setParentsRefs] = useState([{ref: '', optional: false}]);
    const [search, setSearch] = useState({searchable: false, title: '', synopsis: ''})

    const CreateRef = () => {
        console.log({owner, title, authors, parentsRefs, search})
    }
    return <div className="form-container">
        <form onSubmit={CreateRef}>
            <div className="owner formgroup">
                <div className="text-toggle">
                    <span className="text">Owner</span>
                    <div className="toggle-con">
                    </div>
                </div>
            </div>
            <div className="title-formgroup">
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title"/>
            </div>
            <div className="authors formgroup">
                <label htmlFor="authors">Authors</label>
                <div className="chips">
                    <div className="chip" data-chip-index="1">
                        <span>Chip 1</span>
                        <button className="delete-chip">x</button>
                    </div>
                </div>
                <input type="text" placeholder="Type Here and Hit Enter" id="authors"
                name="authors" />
            </div>
            <div className="parentsf ormgroup">
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
                    <span className="text">Owner</span>
                    <div className="toggle-con">
                    </div>
                </div>
                <div className="search-title">
                    <label htmlFor="search-title">Title</label>
                    <input type="search-title" name="title" id="search-title"/>
                </div>
                <div className="search-synopsis">
                    <label htmlFor="search-synopsis">Synopsis</label>
                    <input type="search-synopsis" name="synopsis" id="search-synopsis"/>
                </div>
            </div>
            <div className="recaptcha"></div>
            <input type="submit" value="Create Ref"/>
        </form>
    </div>
}

export default LemmaForm;