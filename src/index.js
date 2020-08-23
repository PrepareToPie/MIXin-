import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App';
import * as serviceWorker from './serviceWorker';
import {AppContextProvider} from "./Contexts/AppContext";
import {PlayerContextProvider} from "./Contexts/PlayerContext";

ReactDOM.render(
    <React.StrictMode>
        <PlayerContextProvider>
            <AppContextProvider>
                <App/>
            </AppContextProvider>
        </PlayerContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();
