import {TransactionsTable} from "./components/transactionsTable.js";

export const buildMenu = ({confirmTransaction, setAmount, setAddress, quit}, {transactions}) => [
    {
        id: 'main',
        title: 'Main menu',
        items: [
            {
                id: 'wallet',
                title: 'Wallet',
            },
            {
                id: 'mining',
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
            return TransactionsTable(transactions);
        }
    },
    {
        id: 'quit',
        onInit: quit,
    }
]