import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom';
import './App.css'
import BooksList from './BooksList';
import SearchBook from './SearchBook';

class BooksApp extends React.Component {
  state = {
    books: []
  }
  shelfes = ['currentlyReading','wantToRead','read'];

  /**
   * Call API and update state immediately after a component is mounted.
   */
  componentDidMount(){
    BooksAPI.getAll().then(data =>{
      this.setState({books:data})
      console.log(data);
    })
  }

  /**
   * Function that update book on server and on for user view without refreshing page or calling API again.
   */
  updateBook = (event, book) =>{
    let newShelf = event.target.value;
    BooksAPI.update(book,event.target.value).then(() =>{
      if(newShelf==='none'){
        console.log('1if');
        this.setState({books:this.state.books.filter((b) => b.title!==book.title)})
      }
      if(book.shelf===undefined) {
        book.shelf = newShelf;
        this.setState({books: this.state.books.concat([book])})
      }
      else {
        book.shelf = newShelf;
        this.setState({books: this.state.books})
      }
    });
  }

  /**
   * Main function to render the App.
   */

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={()=> (<BooksList books={this.state.books} shelfes={this.shelfes} updateBook={this.updateBook}/>)}
        />

        <Route path="/search" render={() => (
          <SearchBook BooksList={this.state.books} updateBook={this.updateBook} />
          )}/>
      </div>
    )
  }
}

export default BooksApp
