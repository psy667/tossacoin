import React from "react";
import { MiningData } from "./components/miningData.js";
import {TransactionsTable} from "./components/transactionsTable.js";

export const buildMenu = ({confirmTransaction, setAmount, setAddress, quit, stopMining, startMining}, {transactions, miningData}) => [
    {
        id: 'main',
        title: 'Main menu',
        onInit: () => {
            stopMining()
        },
        items: [
            {
                id: 'wallet',
                title: 'Wallet',
            },
            {
                id: 'miningMenu',
                title: 'Mining',
            },
            {
                id: 'explorer',
                title: 'Blockchain Explorer'
            },
            {
                id: 'network',
                title: 'Network'
            },
            {
                id: 'quit',
                title: 'Quit',
            }
        ]
    },
    {
        id: 'wallet',
        title: 'Wallet',
        items: [
            {
                id: 'sendTransaction',
                title: 'Send',
            },
            {
                id: 'transactionsHistory',
                title: 'Transaction history'
            },
            {
                id: 'copyWalletAddress',
                title: 'Copy my wallet address to clipboard'
            }
        ]
    },
    {
        id: 'sendTransaction',
        title: 'Send Transcation',
        type: 'dialog',
        questions: [
            {
                id: 'address',
                title: 'Reciever\'s address',
                cb: setAddress,
            },
            {
                id: 'amount',
                title: 'Amount',
                cb: setAmount,
            },
            {
                id: 'confirmation',
                title: 'Confirm transaction (y/n)',
                cb: confirmTransaction,
            }
        ]
    },
    {
        id: 'transactionsHistory',
        title: 'Transactions History',
        output: () => {
            return React.createElement(TransactionsTable, {transactions});
        }
    },
    {
        id: 'miningMenu',
        title: 'Mining',
        items: [
            {
                id: 'startMining',
                title: 'Start Mining'
            }
        ]
    },
    {
        id: 'startMining',
        output: React.createElement(MiningData, {data: miningData}),
        onInit: () => {
            startMining()
        },
    },
    {
        id: 'quit',
        onInit: quit,
    }
]