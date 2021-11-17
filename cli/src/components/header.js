import React from 'react';
import {Text, Box } from 'ink';

export const Header = ({title}) => {
    return React.createElement(
        Text,
        {bold: true},
        title,
    )
}