import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function All() {
    const [ authorList, setAuthorList ] = useState([])

    useEffect(() => {
        getAllAuthors();
    }, [])

    const getAllAuthors = () => {
        axios.get('http://localhost:8000/api/authors')
        .then((res) => {setAuthorList(res.data.results)})
        .catch((err) => {console.log(err)})
    }

    const deleteAuthor = (id) => {
        axios.delete(`http://localhost:8000/api/authors/`+id)
        .then(() => {
            const newAuthors = authorList.filter((author) => author._id !== id)
            console.log(newAuthors)
            setAuthorList(newAuthors)
        })
        .catch((err) => {console.log(err)})
    }


    return (
        <div>
            <h1>View All Authors</h1>
            <table className='table'>
                <tr>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
                <tbody>
                    {
                        authorList.map((author, i) => {
                            return (
                                <tr key={i}>
                                    <td>{author.name}</td>
                                    <td>
                                        <button> <Link to={`/authors/one/${author._id}`}>View</Link></button>|
                                        <button> <Link to={`/authors/edit/${author._id}`}>Edit</Link></button>|
                                        <button onClick={()=>deleteAuthor(author._id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
