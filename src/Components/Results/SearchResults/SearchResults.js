import React from 'react';
import './SearchResults.css';
import PropTypes from 'prop-types';
import {TrackList} from '../../TrackList/TrackList';

export class SearchResults extends React.Component {
    render() {
        if (this.props.searchResults.length) {
            return (
                <div className="SearchResults">
                    <TrackList
                        tracks={this.props.searchResults}
                        onAdd={this.props.onAdd}
                        onPlay={this.props.onPlay}
                        onPause={this.props.onPause}
                        isRemoval={false}
                        playingTrack={this.props.playingTrack}/>
                </div>
            );
        } else {
            return <div className="SearchResults"><h2>...</h2></div>
        }
    }
}

SearchResults.propTypes = {
    searchResults: PropTypes.array.isRequired,
    onAdd: PropTypes.func.isRequired
}