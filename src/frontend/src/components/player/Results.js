import React, { Component } from 'react';

import { connect } from 'react-redux';

import Result from './Result';
import { Row } from 'react-flexa';

class Results extends Component {
    render() {
        const { keywords } = this.props;

        return (
            <div>
                <Row>
                    {keywords.map((keyword) =>
                        <Result keyword={keyword} key={keyword} />
                    )}
                </Row>
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
