import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Search extends Component {
    state = {
        search: ""
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
                })
                .catch(err => console.log(err));
        }
    };

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
            </Container>
        );
    }
}

export default Search;
