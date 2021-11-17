import React, { useEffect } from 'react';
import {render, Text, useApp, useInput, Box, useFocusManager, useFocus } from 'ink';
import {buildMenu} from "./menu.js";
import {CLI} from "./cli.js";

const App = () => {
    const defaultScreen = 'main';
    const [address, setAddress] = React.useState(null);
	const [amount, setAmount] = React.useState(null);
    const [screen, setScreen] = React.useState(defaultScreen);
	const {exit} = useApp();

	const [transactions, setTransactions] = React.useState([
		{
			id: Math.random().toString(16),
			to: Math.random().toString(16),
			amount: Math.floor((Math.random()) * 1e3),
			date: Math.random() * 1e6,
		},
		{
			id: Math.random().toString(16),
			to: Math.random().toString(16),
			amount: Math.floor((Math.random()) * 1e3),
			date: Math.random() * 1e6,
		},
		{
			id: Math.random().toString(16),
			to: Math.random().toString(16),
			amount: Math.floor((Math.random()) * 1e3),
			date: Math.random() * 1e6,
		},
	]);


    const createTransaction = () => {
		setTransactions([
			...transactions,
			{
				date: Date.now(),
				amount: -amount,
				to: address,
				id: Math.random().toString(36).slice(2)
			}
		])

		setScreen('transactionsHistory')
	}

	const menu = buildMenu({confirmTransaction: createTransaction, setAmount, setAddress, quit: exit}, {transactions});


    
    return CLI(menu, screen, defaultScreen);
}

render(React.createElement(App));