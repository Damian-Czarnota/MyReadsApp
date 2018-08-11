import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types';
import sortBy from 'sort-by';

class SearchBook extends Component {
    static propTypes = {
        updateBook: PropTypes.func.isRequired,
        BooksList: PropTypes.array.isRequired,
    }

    state ={
        query: '',
        books:[],
        noResults:false
    }

    /**
     * Function to search books in API.
     * To prevent double adding the same book to BookList there is a function which compare two arrays - books in BookList and book from searching.
     */
    searchBook = (query) => {
        this.setState({query:query})
        if(query.trim()!=='') {
            BooksAPI.search(query).then(data => {
                if(data instanceof Array){
                data = data.sort(sortBy('title'));
                this.setState(() =>{
                    data.forEach(book =>{
                        this.props.BooksList.forEach(bookL =>{
                            if(bookL.title===book.title&&bookL.subtitle===book.subtitle)
                                book.shelf=bookL.shelf;
                        })
                    })
                    return {books:data}
                })
                }
                else{
                    this.setState({books:data,
                        noResults:true})
                }
            })
        }
        else{
            this.setState({books: []})
        }
    }

    /**
     * Clear input search.
     * The button appears when in input is more than 0 char.
     */
    clearQuery = () => {
        this.setState({query:'',
        books:[],
    noResults:false})
    }

    /**
     * Main function to render the SearchBook component.
     * It dynamically fills the books grid.
     */
    render(){
        const { updateBook } = this.props;
        const { query,books,noResults } = this.state;
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search" >Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                               placeholder="Search by title or author"
                               value={query}
                               onChange={(event) => this.searchBook(event.target.value)}
                        />
                        {query&&(
                            <div onClick={() => this.clearQuery()} className="box">
                            <svg viewBox="0 0 40 40">
                                <path className="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
                            </svg>
                        </div>
                        )}
                    </div>
                </div>
                <div className="search-books-results">
                        {books.length>0&&(
                            <ol className="books-grid">
                                {books.map((book)=>(
                                    <li key={book.previewLink}>
                                        <div className="book">
                                            <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.smallThumbnail ? book.imageLinks.smallThumbnail : ''})` }}></div>
                                                <div className="book-shelf-changer">
                                                    <select value={book.shelf ? book.shelf:'none'} onChange={(e) => updateBook(e,book)}>
                                                        <option value="move" disabled>Move to...</option>
                                                        <option value="currentlyReading">Currently Reading</option>
                                                        <option value="wantToRead">Want to Read</option>
                                                        <option value="read">Read</option>
                                                        <option value="none">None</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="book-title">{book.title}</div>
                                            {book.authors!==undefined&&(
                                                <div className="book-authors">{book.authors.map((author) => (<p key={author} className="book-authors_para">{author}</p>))}</div>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        )}
                        {noResults&&(
                            <p className="text-center">
                                Sorry, there is no results for your input value. <a className="link" onClick={() => this.clearQuery()}>Clear search</a>
                            </p>
                        )}
                </div>
            </div>
        )
    }
}

export default SearchBook;