import React, { useState, createContext } from 'react'
import Loading from '../Loading/Loading'

const WindowContext = createContext()

const Window = ({ children, className, initialDispay, isSaving = false }) => {
    const [activeDisplay, setActiveDisplay] = useState(initialDispay)

    return isSaving ? (
        <div className="playlist-window">
            <Loading>
                <p>Saving your playlist to <span id="spotify">Spotify</span></p>
            </Loading>
        </div>
    ) : (
            <div className={className}>
                <WindowContext.Provider
                    value={{ activeDisplay, setActiveDisplay }}>
                    {children}
                </WindowContext.Provider>
            </div>
        )
}

export { WindowContext as default, Window }
