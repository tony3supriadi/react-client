import { Component } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft, faEdit, faSave, faTable
} from "@fortawesome/free-solid-svg-icons";

import bookService from "../services/book.service";

class EditComponent extends Component {

    constructor(props) {
        super(props)
        this.getById = this.getById.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.edit = this.edit.bind(this)
        this.reset = this.reset.bind(this)

        this.state = {
            book: {
                id: null,
                title: "",
                author: "",
                description: "",
                created_at: null,
                updated_at: null
            },
            submitted: false
        }
    }

    componentDidMount() {
        this.getById(this.props.match.params.id)
    }

    getById = function (id) {
        bookService.find(id)
            .then(ress => {
                this.setState({
                    book: ress.data.result
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    onChangeTitle = function (e) {
        this.setState({
            book: {
                title: e.target.value
            }
        })
    }

    onChangeAuthor = function (e) {
        this.setState({
            book: { author: e.target.value }
        })
    }

    onChangeDescription = function (e) {
        this.setState({
            book: { description: e.target.value }
        })
    }

    edit = function (e) {
        e.preventDefault();

        const book = {
            title: this.state.book.title,
            author: this.state.book.author,
            description: this.state.book.description
        }

        bookService.update(book, this.props.match.params.id)
            .then(ress => {
                this.setState({
                    book: ress.data.result,
                    submitted: true
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    reset = function () {
        this.getById()
        this.setState({
            submitted: false
        })
    }

    render() {
        return (
            <div>
                <h3>
                    <Link to={"/"} className="btn btn-secondary mr-3">
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Link>
                    Edit Book
                </h3>

                <hr />

                {this.state.submitted ? (
                    <div className="text-center">
                        <h4>Edit book with id #{ this.state.book.id } is successfully!!</h4>
                        <Link to={"/"} class="btn btn-outline-secondary btn-sm mx-1">
                                <FontAwesomeIcon icon={faTable} className="mr-2" />
                            Back to Table
                        </Link>
                        <button type="button" onClick={this.reset} className="btn btn-primary btn-sm mx-1">
                            <FontAwesomeIcon icon={faEdit} className="mr-2"/>
                            Edit Again
                        </button>
                    </div>
                ) : (
                <form onSubmit={this.edit}>
                    <div className="form-group row">
                        <label htmlFor="title" className="col-md-3 py-2 text-md-right font-weight-bold">Book Title</label>
                        <div className="col-md-6">
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="form-control"
                                value={this.state.book.title}
                                onChange={this.onChangeTitle}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="author" className="col-md-3 py-2 text-md-right font-weight-bold">Author</label>
                        <div className="col-md-6">
                            <input
                                type="text"
                                id="author"
                                name="author"
                                className="form-control"
                                value={this.state.book.author}
                                onChange={this.onChangeAuthor}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="description" className="col-md-3 py-2 text-md-right font-weight-bold">Description</label>
                        <div className="col-md-6">
                            <textarea
                                id="description"
                                name="description"
                                className="form-control"
                                value={this.state.book.description}
                                onChange={this.onChangeDescription}
                            ></textarea>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-6 offset-md-3">
                            <button type="submit" className="btn btn-primary">
                                <FontAwesomeIcon icon={faSave} className="mr-2" />
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            )}
            </div>
        );
    }
}

export default EditComponent