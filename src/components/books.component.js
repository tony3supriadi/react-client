import { Component } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faPlusCircle,
    faSearch,
    faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import bookService from "../services/book.service";

class BookComponent extends Component {

    constructor(props) {
        super(props);

        this.deleted = this.deleted.bind(this)

        this.state = {
            books: [],
        }
    }

    componentDidMount() {
        this.getAll();
    }

    getAll = function () {
        bookService.all()
            .then(ress => {
                this.setState({
                    books: ress.data.results
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    deleted = function (book) {
        bookService.delete(book.id)
            .then(ress => {
                alert("Deleted is successfully!!")
                this.getAll()
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const { books } = this.state;

        return (
            <div>
                <Link to={"/books/create"} className="btn btn-primary mb-3">
                    <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
                    Create New
                </Link>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Description</th>
                        <th width="15%" className="text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {books.length ? (
                            books.map((book, index) => (
                                <tr key={index}>
                                    <td>{ book.title }</td>
                                    <td>{ book.author }</td>
                                    <td>{ book.description ? (book.description) : '-' }</td>
                                    <td className="text-center">
                                        <Link to={`/books/${book.id}/edit`} className="text-secondary mx-2">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Link>

                                        <Link to={`/books/${book.id}`} className="text-primary mx-2">
                                            <FontAwesomeIcon icon={faSearch} />
                                        </Link>

                                        <button type="button" onClick={() => { this.deleted(book) }} className="text-danger mx-2 p-0 btn">
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center text-muted">
                                    Data books is empty...
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default BookComponent