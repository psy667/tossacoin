import {Text, Box } from 'ink';
import React from 'react';
const bold = true;
export const MiningData = ({data}) => {
    const tableWidth = '25%';

    return React.createElement(Box, 
        {
            flexDirection: 'column'
        },
        React.createElement(Text, {}, `Chain length: ${data.length}\n`),
        React.createElement(Text, {}, `Hashrate: ${data.filter(it => it.timestamp + 60000 > (new Date).getTime()).reduce((acc,cur) => acc + cur.nonce, 0) / 60000} GH/sec`),
        React.createElement(Text, {}, ``),
        React.createElement(
            Box,
            {
                flexDirection: 'row',
                // borderStyle: 'single',
            },
            React.createElement(
                Box,
                {marginRight: 2, width: '10%', bold},
                React.createElement(Text, null, 'Index')
            ),
            React.createElement(
                Box,
                {marginRight: 2, width: tableWidth, bold},
                React.createElement(Text, null, 'Data')
            ),
            React.createElement(
                Box,
                {marginRight: 2, width: '40%', bold},
                React.createElement(Text, null, 'Hash')
            ),
            React.createElement(
                Box,
                {marginRight: 2, width: tableWidth, bold},
                React.createElement(Text, null, 'Nonce')
            ),
            
        ),
        data.slice(data.length < 12 ?  0 : data.length - 12).reverse().map((it, idx) => 
            React.createElement(
                Box,
                {
                    flexDirection: 'row',
                    key: it.hash,
                    // borderStyle: 'single',
                    borderColor: it.index === (data.length - 1) ? 'green' : 'white',
                },
                React.createElement(
                    Box,
                    {marginRight: 2, width: '10%'},
                    React.createElement(Text, null, it.index)
                ),
                React.createElement(
                    Box,
                    {marginRight: 2, width: tableWidth},
                    React.createElement(Text, null, it.data)
                ),
                React.createElement(
                    Box,
                    {marginRight: 2, width: '40%'},
                    React.createElement(Text, null, it.hash.slice(0,32))
                ),
                React.createElement(
                    Box,
                    {marginRight: 2, width: tableWidth},
                    React.createElement(Text, null, it.nonce)
                ),
            )
        )
        )
}