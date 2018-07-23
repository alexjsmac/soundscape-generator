import React from 'react'
import Responsive from 'react-responsive';

export const Desktop = props => <Responsive {...props} minWidth={768} />;
export const Mobile = props => <Responsive {...props} maxWidth={767} />;