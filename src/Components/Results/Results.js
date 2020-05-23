import React, {Component} from 'react';
import {SearchResults} from "./SearchResults/SearchResults";
import RecommendedResults from "./RecommendedResults/RecommendedResults";
import './Results.css';

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayResults: "search"
        };
        this.displayRecommendedResults = this.displayRecommendedResults.bind(this);
        this.displaySearchResults = this.displaySearchResults.bind(this);
    }

    displaySearchResults() {
        this.setState({displayResults: "search"});
    }

    displayRecommendedResults() {
        this.props.onRecommend();
        this.setState({displayResults: "recommended"});
    }

    render() {
        switch (this.state.displayResults) {
            case "recommended":
                return (
                    <div className="Results">
                        <ul className="Results-select">
                            <li onClick={this.displaySearchResults}>Search results</li>
                            <li className="active" id="recommend" onClick={this.displayRecommendedResults}>Recommended</li>
                        </ul>
                        <RecommendedResults
                            recommendedTracks={this.props.recommendedTracks}
                            onAdd={this.props.onAdd}
                            onPlay={this.props.onPlay}
                            onPause={this.props.onPause}
                            playingTrack={this.props.playingTrack}/>
                    </div>);
            default:
                return (
                    <div className="Results">
                        <ul className="Results-select">
                            <li className="active">Search results</li>
                            <li onClick={this.displayRecommendedResults}>Recommended</li>
                        </ul>
                        <SearchResults
                            searchResults={this.props.searchResults}
                            onAdd={this.props.onAdd}
                            onPlay={this.props.onPlay}
                            onPause={this.props.onPause}
                            playingTrack={this.props.playingTrack}/>
                    </div>);
        }
    }
}

export default Results;