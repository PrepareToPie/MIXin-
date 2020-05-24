import React, {Component} from "react";
import ResultsHeaderItem from "./ResultsHeaderItem";

class ResultsHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isJumpy: false
        }
        this.handleRecommendedClick = this.handleRecommendedClick.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
    }

    handleSearchClick() {
        this.setState({isJumpy: !this.state.isJumpy});
        setTimeout(() => {
            this.setState({isJumpy: !this.state.isJumpy});
        }, 500);
        this.props.onDisplaySearchResults();
    }

    handleRecommendedClick() {
        this.setState({isJumpy: !this.state.isJumpy});
        setTimeout(() => {
            this.setState({isJumpy: !this.state.isJumpy});
        }, 500);
        this.props.onDisplayRecommendedResults();
    }

    render() {
        return (
            <ul className="Results-select">
                <ResultsHeaderItem active={this.props.activeDisplay === "search"}
                                   onClick={this.props.onDisplaySearchResults}
                                   title="Search results"/>
                <ResultsHeaderItem id="recommend" active={this.props.activeDisplay === "recommended"}
                                   onClick={this.props.onDisplayRecommendedResults}
                                   title="Recommended"/>
            </ul>
        );
    }
}

export default ResultsHeader;