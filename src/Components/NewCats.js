import React, {Component} from 'react';
import axios from 'axios';

export default class NewCats extends Component {
    constructor(){
        super();
        this.state = {
            newCatsRawData: []
        }
    console.log()}
    updateCats(){
        axios.get("http://thecatapi.com/api/images/get?format=html&results_per_page=20").then(res => {
            let response = res.data.split('"').filter(elem => elem.includes('http')).filter(elem => !elem.includes('http://thecatapi'))
           this.setState({newCatsRawData: response})
         })}

    render(){
        let catPictures = this.state.newCatsRawData.map((pic, i) => {
        return <img key={i} src={pic} alt='cat-gifs'/>})
        return(
            <div className='emptydiv'>
            <button className='updatecatpictures' onClick={() => this.updateCats()}>See More Cats</button>
                                   <div className='emptyspace'></div>
                        <span className='updatedcats'>{catPictures}</span> 
            </div>
        )
    }
        }