import React from 'react';
import './SearchResults.css';
import PropTypes from 'prop-types';
import {TrackList} from '../TrackList/TrackList';

export class SearchResults extends React.Component {
    render() {
        if (this.props.recommendedTracks.length) {
            return (
                <div className="SearchResults">
                    <h2>Recommended Tracks</h2>
                    <TrackList
                        tracks={this.props.recommendedTracks}
                        onAdd={this.props.onAdd}
                        onPlay={this.props.onPlay}
                        onPause={this.props.onPause}
                        isRemoval={false}
                        playingTrack={this.props.playingTrack}/>
                </div>
            );
        } else {
            return (
                <div className="SearchResults">
                    <h2>Search Results</h2>
                    <TrackList
                        tracks={this.props.searchResults}
                        onAdd={this.props.onAdd}
                        onPlay={this.props.onPlay}
                        onPause={this.props.onPause}
                        isRemoval={false}
                        playingTrack={this.props.playingTrack}/>
                </div>
            );
        }
    }
}

SearchResults.propTypes = {
    searchResults: PropTypes.array.isRequired,
    onAdd: PropTypes.func.isRequired
}