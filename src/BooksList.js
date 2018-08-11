import React, {Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class BooksList extends Component{
    static propTypes = {
        books: PropTypes.array.isRequired,
        shelfes: PropTypes.array.isRequired,
        updateBook: PropTypes.func.isRequired
    }

    /**
     * Main function to render the BooksList component.
     * It dynamically fills the books grid.
     */
    render(){
        const { books,shelfes, updateBook } = this.props;
        return(
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            {shelfes.map((shelf)=>(
                            <div key={shelf} className="bookshelf">
                                <h2 className="bookshelf-title">{shelf==='wantToRead'&&( 'Want to Read' )}
                                    {shelf==='currentlyReading'&&( 'Currently Reading' )}
                                    {shelf==='read'&&( 'Read' )}
                                </h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                    {books.map((book)=>(
                                        <span key={book.previewLink}>
                                            {shelf===book.shelf&&(
                                                    <li key={book.previewLink}>
                                                        <div className="book">
                                                            <div className="book-top">
                                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.smallThumbnail ? book.imageLinks.smallThumbnail : ''})` }}></div>
                                                                <div className="book-shelf-changer">
                                                                    <select value={book.shelf} onChange={(e) => updateBook(e,book)}>
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
                                            )}
                                            </span>
                                    ))}
                                    </ol>
                                </div>

                            </div>

                            ))}

                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default BooksList;