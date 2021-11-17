import React from 'react';
import {Text, Box } from 'ink';

export const Menu = ({items, menu, focusedItem}) => {
    return items.map((it, idx) => React.createElement(() => {
        const isFocused = focusedItem === it.id;

        return React.createElement(
            Box, {key: it.title},
            React.createElement(
                Text, 
                {
                    width: 20,
                    inverse: isFocused,
                    color: menu.findIndex(item => item.id === it.id) + 1 ? 'green' : 'gray'
                },
                `${idx+1}. ${it.title} `))

    }, {key: it.title + '1'}))
}