import React, {useContext, useState} from 'react';
import {SearchResults} from "./SearchResults/SearchResults";
import RecommendedResults from "./RecommendedResults/RecommendedResults";
import './Results.css';
import ResultsHeader from "./ResultsHeader/ResultsHeader";
import AppContext from "../../Contexts/AppContext";

function Results() {
    const [displayResults, setDisplayResults] = useState("search")
    const {recommendedContext: {getRecommendations}} = useContext(AppContext)


    const displaySearchResults = () => {
        setDisplayResults("search");
    }

    const displayRecommendedResults = () => {
        getRecommendations()
        setDisplayResults("recommended");
    }

    switch (displayResults) {
        case "recommended":
            return (
                <div className="Results">
                    <ResultsHeader
                        activeDisplay={displayResults}
                        onDisplaySearchResults={displaySearchResults}
                        onDisplayRecommendedResults={displayRecommendedResults}/>
                    <RecommendedResults/>
                </div>);
        default:
            return (
                <div className="Results">
                    <ResultsHeader
                        activeDisplay={displayResults}
                        onDisplaySearchResults={displaySearchResults}
                        onDisplayRecommendedResults={displayRecommendedResults}/>
                    <SearchResults/>
                </div>);
    }
}

export default Results;