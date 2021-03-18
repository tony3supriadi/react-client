import React, { Component } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft, faPlusCircle, faSave, faTable
} from "@fortawesome/free-solid-svg-icons";

import BookService from '../services/book.service';

class CreateComponent extends Component {

    constructor(props) {
        super(props)
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.save = this.save.bind(this)
        this.reset = this.reset.bind(this)
        
        this.state = {
            id: null,
            title: "",
            author: "",
            description: "",
            created_at: null,
            submitted: false
        }
    }

    onChangeTitle = function (e) {
        this.setState({
            title: e.target.value
        })
    }

    onChangeAuthor = function (e) {
        this.setState({
            author: e.target.value
        })
    }

    onChangeDescription = function (e) {
        this.setState({
            description: e.target.value
        })
    }

    save = function (e) {
        e.preventDefault();
        const data = {
            title: this.state.title,
            author: this.state.author,
            description: this.state.description
        }

        BookService.create(data)
            .then(ress => {
                const result = ress.data.result
                this.setState({
                    id: result.id,
                    title: result.title,
                    author: result.author,
                    description: result.description,
                    created_at: result.created_at,
                    submitted: true
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    reset = function () {
        this.setState({
            id: null,
            title: "",
            author: "",
            description: "",
            created_at: null,
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
                    Create New Book
                </h3>

                <hr />
                
                {this.state.submitted ? (
                    <div className="text-center">
                        <h4>Create new book is successfully!!</h4>
                        <Link to={"/"} class="btn btn-outline-secondary btn-sm mx-1">
                                <FontAwesomeIcon icon={faTable} className="mr-2" />
                            Back to Table
                        </Link>
                        <button type="button" onClick={this.reset} className="btn btn-primary btn-sm mx-1">
                            <FontAwesomeIcon icon={faPlusCircle} className="mr-2"/>
                            Create New
                        </button>
                    </div>
                ) : (
                <form onSubmit={this.save}>
                    <div className="form-group row">
                        <label htmlFor="title" className="col-md-3 py-2 text-md-right font-weight-bold">Book Title</label>
                        <div className="col-md-6">
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="form-control"
                                value={this.state.title}
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
                                value={this.state.author}
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

export default CreateComponent