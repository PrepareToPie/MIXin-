import React, {Component} from 'react';
import {TrackList} from "../../TrackList/TrackList";

class RecommendedResults extends Component {
    render() {
        if (this.props.recommendedTracks.length) {
            return (
                <div className="SearchResults">
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
            return <div className="SearchResults"><h2>At first let's add some tracks to playlist ;)</h2></div>
        }
    }
}

export default RecommendedResults;