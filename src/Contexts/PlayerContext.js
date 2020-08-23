import React, {createContext, useState} from 'react';

const PlayerContext = createContext()

function PlayerContextProvider({children}) {
    const [playingTrack, setPlayingTrack] = useState(null)

    const playTrack = (track) => {
        if (playingTrack) {
            playingTrack.audio.pause()
        }
        setPlayingTrack(track);
        playingTrack.audio.play()
    }

    const pauseTrack = () => {
        playingTrack.audio.pause()
    }

    return (
        <PlayerContext.Provider value={{playingTrack, playTrack, pauseTrack}}>
            {children}
        </PlayerContext.Provider>
    );
}

export {PlayerContext as default, PlayerContextProvider}