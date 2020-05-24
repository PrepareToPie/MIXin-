import React from 'react';
import './SearchBar.css';
export class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }
    search(term){
        this.props.onSearch(term);
    }

    handleTermChange(event) {
        this.search(event.target.value);
    }

    render(){
        return (
            <div className="SearchBar">
                <input placeholder="Track, artist or album" onChange={this.handleTermChange}/>
                {/*<button className="SearchButton">SEARCH</button>*/}
            </div>
        );
    }
}