import React, {Component} from 'react';
import {SearchResults} from "./SearchResults/SearchResults";
import RecommendedResults from "./RecommendedResults/RecommendedResults";
import './Results.css';
import ResultsHeader from "./ResultsHeader/ResultsHeader";

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayResults: "search",

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
                        <ResultsHeader
                            activeDisplay={this.state.displayResults}
                            onDisplaySearchResults={this.displaySearchResults}
                            onDisplayRecommendedResults={this.displayRecommendedResults}/>
                        <RecommendedResults
                            recommended={this.props.recommended}
                            onAdd={this.props.onAdd}
                            onPlay={this.props.onPlay}
                            onPause={this.props.onPause}
                            playingTrack={this.props.playingTrack}/>
                    </div>);
            default:
                return (
                    <div className="Results">
                        <ResultsHeader
                            activeDisplay={this.state.displayResults}
                            onDisplaySearchResults={this.displaySearchResults}
                            onDisplayRecommendedResults={this.displayRecommendedResults}/>
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