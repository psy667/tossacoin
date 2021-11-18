import {Text, Box } from 'ink';
import React from 'react';

export const TransactionsTable = ({transactions}) =>
	React.createElement(
    Box,
    {
      flexDirection: "column",
      width: 80,
	    borderStyle: "single",
    },
    React.createElement(
      Box,
      {
	  },
      React.createElement(
        Box,
        {
          width: "25%",
        },
        React.createElement(Text, {bold: true}, "ID")
      ),
      React.createElement(
        Box,
        {
          width: "25%",
        },
        React.createElement(Text, {bold: true}, "To")
      ),
      React.createElement(
        Box,
        {
          width: "25%",
        },
        React.createElement(Text, {bold: true}, "Amount")
      ),
	  React.createElement(
        Box,
        {
          width: "25%",
        },
        React.createElement(Text, {bold: true}, "Date")
      ),
    ),
    transactions.map((it) =>
      React.createElement(
        Box,
        {
          key: it.id
        },
        React.createElement(
          Box,
          {
            width: "25%"
          },
          React.createElement(Text, null, it.id)
        ),
        React.createElement(
          Box,
          {
            width: "25%"
          },
          React.createElement(Text, null, it.to)
        ),
        React.createElement(
          Box,
          {
            width: "25%"
          },
          React.createElement(Text, {color: it.amount > 0 ? 'green' : 'red'}, (it.amount > 0 ? '+' : '') + it.amount)
        ),
		React.createElement(
			Box,
			{
			  width: "25%"
			},
			React.createElement(Text, null, (new Date(it.date)).toLocaleTimeString())
		  )
      )
    )
  );