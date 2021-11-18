import React, { useEffect, useRef } from 'react';
import {render, Text, useApp, useInput, Box, useFocusManager, useFocus } from 'ink';
import {buildMenu} from "./menu.js";
import {CLI} from "./cli.js";
import {TossaCoin} from "../../core/dist/app.js";

const tossaCoin = new TossaCoin();
const App = () => {
    const defaultScreen = 'main';
    const [address, setAddress] = React.useState(null);
	const [amount, setAmount] = React.useState(null);
    const [screen, setScreen] = React.useState(defaultScreen);
    const [mining, setMining] = React.useState(false);
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
	
	

	const [miningData, setMiningData] = React.useState([]);


	const onMiningData = (data) => {
        setMiningData(data)
    }

	const startMining = () => {
		if(!mining) {
			tossaCoin.startMining(onMiningData);
			setMining(true);
		}
	}

    const stopMining = () => {
        tossaCoin.stopMining()
		setMining(false);
    }

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

    return React.createElement(CLI, {currentScreen: screen, defaultScreen, actions: {confirmTransaction: createTransaction, setAmount, setAddress, quit: exit, startMining, stopMining}, state: {transactions, miningData}});
}

render(React.createElement(App));