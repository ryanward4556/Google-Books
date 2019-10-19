import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
import { List, ListItem } from "../components/List";

class Search extends Component {
    state = {
        search: "",
        books: []
        // authors: "",
        // description: "",
        // image: "",
        // link: "",
        // title: ""
    };

    componentDidMount() {
        console.log("search mounted");
    }
    // loadBooks = () => {
    //     API.getBooks()
    //         .then(res =>
    //             this.setState({ books: res.data, title: "", author: "", synopsis: "" })
    //         )
    //         .catch(err => console.log(err));
    // };
    // deleteBook = id => {
    //     API.deleteBook(id)
    //         .then(res => this.loadBooks())
    //         .catch(err => console.log(err));
    // };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
        console.log(this.state)
    };

    handleFormSubmit = event => {
        event.preventDefault();
        console.log("submitted")
        if (this.state.search.length >= 1) {
            API.getBooks(this.state.search)
                .then(res => {
                    console.log(res)
                    this.setState({ books: res.data.items })
                    console.log(this.state)
                })
                .catch(err => console.log(err))
        }
    };

    // returnResults = arr => {
    //     const listResults = arr.map((book) =>
    //         <li key={book}>
    //             {book}
    //         </li>
    //     )
    //     return listResults;
    // }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="sm-12">
                        <Jumbotron>
                            <h1>Google Books Search</h1>
                        </Jumbotron>
                        <Row>
                            <div className="col-sm-6 offset-3">
                                <form>
                                    <Input
                                        value={this.state.search}
                                        onChange={this.handleInputChange}
                                        name="search"
                                        placeholder="The Fellowship of the Ring..."
                                    />
                                    <FormBtn
                                        disabled={!this.state.search}
                                        onClick={this.handleFormSubmit}
                                    >
                                        Search Book
                                    </FormBtn>
                                </form>
                            </div>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col size="sm-12">
                        {this.state.books.length ? (
                            <List>
                                {this.state.books.map(book => (
                                    <ListItem key={book.id}>
                                        <a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">
                                            <strong>
                                                {book.volumeInfo.title} by {book.volumeInfo.authors}
                                            </strong>
                                            <p>Description: {book.volumeInfo.description}</p>
                                            if ({book.volumeInfo.imageLinks === undefined}) {
                                                <p>No Image Provided</p>
                                            } else {
                                                <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title}></img>
                                            }

                                        </a>
                                        {/* <DeleteBtn onClick={() => this.deleteBook(book._id)} /> */}
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                                <h3>No Results to Display</h3>
                            )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Search;
