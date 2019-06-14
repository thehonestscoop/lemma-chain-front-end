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
            
        </form>
    </div>
}

export default LemmaForm;