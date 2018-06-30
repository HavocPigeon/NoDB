import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(){
    super();
    this.state = {
      catsRawData: [],
      comments: [],
      userInput: '',
      userEdits: '',
      clicked: false,
    }
  }
  //inital page setup
  componentDidMount(){
    axios.get("http://thecatapi.com/api/images/get?format=html&results_per_page=20").then(res => {
       let response = res.data.split('"').filter(elem => elem.includes('http')).filter(elem => !elem.includes('http://thecatapi'))
      this.setState({catsRawData: response})
    })
  }
  
  //comment section
   changeInput = (input) => {
     this.setState({
       userInput: input
     })
   }
   addComment = () => {
    axios.post('/api/comments', {text: this.state.userInput}).then(comment => {
       this.setState({
         comments: comment.data
       })
     })
   }
  removeComment = (id) => {
    axios.delete(`/api/comments/${id}`).then(comment => {
      this.setState({
        comments: comment.data
      })
    })
  }
  editComment = () => {
    this.setState({
      clicked: true
    })
  }
  saveCommentEdits = () => {
    axios.put('/api/comments/', {text: this.state.userEdits}).then(comment => {
      this.setState({
        comments: comment.data
      })
    })
  }

  render() {
    let catPictures = this.state.catsRawData.map((pic, i) => {
      return <img key={i} src={pic} alt='cat-gifs'/>
    })
    let commentBoxes = this.state.comments.map((message,i) => {
      return <div key={i}>{message.text} <button className='editcomment' onClick={() => this.editComment()}>Edit</button><button className='removecomment' onClick={() => this.removeComment(message.id)}>Remove Comment</button>
      </div>
    })
    
    return (
      <div className="App">
        <div>
          <input className='inputcomment' onChange={(e) => this.changeInput(e.target.value)}/>
          <button className='addcomment' onClick={() => this.addComment()}>Add New Comment</button>
        </div>
      {this.state.clicked ? <input label="Saved Comments" className='commentbox' onSubmit={this.saveCommentEdits} onSubmit={() => this.saveCommentEdits()}/>: null}
        {commentBoxes}
        {catPictures}
      </div>
    );
  }
}

export default App;
