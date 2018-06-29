import React, { Component } from 'react';

import { connect } from 'react-redux';


import Result from './Result';



class Results extends Component {
    render() {
        const { keywords, sounds } = this.props;

        return (
            <div>
                <div>
                    {keywords.map((keyword, index) =>
                        <Result keyword={keyword} 
                            sound={(sounds[keyword]) ? sounds[keyword] : {}} 
                            key={keyword}/>
                    )}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        keywords: state.general.keywords,
        sounds: state.sounds
    }
}

export default connect(
    mapStateToProps,
    null
)(Results);
