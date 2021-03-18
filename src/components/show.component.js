import { Component } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft, faEdit
} from "@fortawesome/free-solid-svg-icons";
import bookService from "../services/book.service";

class ShowComponent extends Component {
    
    constructor(props) {
        super(props)
        this.getById = this.getById.bind(this)

        this.state = {
            book: {
                id: null,
                title: "",
                author: "",
                description: "",
                created_at: null,
                updated_at: null
            }
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

    render() {
        const { book } = this.state
        return (
            <div>
                <h3>
                    <Link to={"/"} className="btn btn-secondary mr-3">
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Link>
                    { book.title }
                </h3>

                <hr />

                <table className="table table-striped table-borderless">
                    <tr>
                        <th width="20%" className="text-md-right">ID</th>
                        <th width="5px">:</th>
                        <td>#{ book.id }</td>
                    </tr>
                    <tr>
                        <th width="20%" className="text-md-right">Book Title</th>
                        <th width="5px">:</th>
                        <td>{ book.title }</td>
                    </tr>
                    <tr>
                        <th width="20%" className="text-md-right">Author</th>
                        <th width="5px">:</th>
                        <td>{ book.author }</td>
                    </tr>
                    <tr>
                        <th width="20%" className="text-md-right">Description</th>
                        <th width="5px">:</th>
                        <td>{ book.description ? (book.description) : '-' }</td>
                    </tr>
                    <tr>
                        <th width="20%" className="text-md-right">Updated At</th>
                        <th width="5px">:</th>
                        <td>{ book.updated_at }</td>
                    </tr>
                    <tr>
                        <th width="20%" className="text-md-right">Created At</th>
                        <th width="5px">:</th>
                        <td>{ book.created_at }</td>
                    </tr>
                    <tr>
                        <th></th>
                        <th></th>
                        <td>
                            <Link to={`/books/${book.id}/edit`} className="btn btn-primary">
                                <FontAwesomeIcon icon={faEdit} className="mr-2" />
                                Edit
                            </Link>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default ShowComponent