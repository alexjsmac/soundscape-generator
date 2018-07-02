import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Row } from 'react-flexa';
import Result from './Result';

const ResultsContainer = Row.extend`
    position: relative;
    top: -1px;
`


class Results extends Component {
    render() {
        const { keywords } = this.props;

        return (
            <ResultsContainer>
                {keywords.map((keyword) =>
                    <Result keyword={keyword} key={keyword} />
                )}
            </ResultsContainer>
        );
    }
}

function mapStateToProps(state) {
    return {
        keywords: state.general.keywords
    }
}

export default connect(
    mapStateToProps,
    null
)(Results);
