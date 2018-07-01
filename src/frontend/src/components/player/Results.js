import React, { Component } from 'react';

import { connect } from 'react-redux';

import styled from 'styled-components'
import Result from './Result';

const ResultsContainer = styled.div`
    background: #ddd;
    padding: 1px 1px;
    top: -1px;
    position: relative;
`

class Results extends Component {
    render() {
        const { keywords } = this.props;

        return (
            <div>
                <ResultsContainer>
                    {keywords.map((keyword) =>
                        <Result keyword={keyword} key={keyword} />
                    )}
                </ResultsContainer>
            </div>
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
