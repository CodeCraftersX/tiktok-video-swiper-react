/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './WalletPage.css'
import BackTop from '../BackTop/BackTop'
import WalletMain from './WalletMain/WalletMain'
import TransactionHistory from './TransactionHistory/TransactionHistory'
import Deposit from './Deposit/Deposit'
import SavedCards from './SavedCards/SavedCards'
import SavedBanks from './SavedCards/SavedBanks'

function WalletPage() {
    const transactionHistory = [
        {
            transactionType: "Withdrawal",
            transactionDate: "Apr 18, 2024",
            transactionPrice: 1370,
            id: 0
        },
        {
            transactionType: "Deposit",
            transactionDate: "Apr 18, 2024",
            transactionPrice: 150,
            id: 2
        },
        {
            transactionType: "Withdrawal",
            transactionDate: "Apr 19, 2024",
            transactionPrice: 4670,
            id: 3
        },
        {
            transactionType: "Withdrawal",
            transactionDate: "Apr 20, 2024",
            transactionPrice: 350,
            id: 4
        },
        {
            transactionType: "Deposit",
            transactionDate: "Apr 24, 2024",
            transactionPrice: 2000,
            id: 5
        },
        {
            transactionType: "Withdrawal",
            transactionDate: "Apr 24, 2024",
            transactionPrice: 300,
            id: 6
        },
        {
            transactionType: "Deposit",
            transactionDate: "Apr 25, 2024",
            transactionPrice: 700,
            id: 7
        },
        {
            transactionType: "Deposit",
            transactionDate: "Apr 30, 2024",
            transactionPrice: 70,
            id: 8
        },
        {
            transactionType: "Withdrawal",
            transactionDate: "Apr 30, 2024",
            transactionPrice: 230,
            id: 9
        },
        {
            transactionType: "Withdrawal",
            transactionDate: "Apr 30, 2024",
            transactionPrice: 1500,
            id: 10
        },
        {
            transactionType: "Withdrawal",
            transactionDate: "Apr 30, 2024",
            transactionPrice: 820,
            id: 11
        },
        {
            transactionType: "Withdrawal",
            transactionDate: "Apr 30, 2024",
            transactionPrice: 300,
            id: 12
        },
        {
            transactionType: "Withdrawal",
            transactionDate: "Apr 30, 2024",
            transactionPrice: 400,
            id: 13
        },
        {
            transactionType: "Withdrawal",
            transactionDate: "Apr 30, 2024",
            transactionPrice: 280,
            id: 14
        }
    ]
    const [cards, setCards] = useState([
        {
            userName: "user name",
            cardNumber: "1234555566667890",
            cardType: "mastercard",
            id: 0
        },
        {
            userName: "user name",
            cardNumber: "1234555566667890",
            cardType: "visa",
            id: 1
        }
    ])
    const [banks, setBanks] = useState([
        {
            bankName: "Capital one",
            accountNumber: "1234567890",
            id: 0
        },
        {
            bankName: "Bank of one",
            accountNumber: "1234567890",
            id: 1
        }
    ])
    const [walletDir, setWalletDir] = useState("main")
    const [walletDirHistory, setWalletDirHistory] = useState("main")
    //  the following sections are functionalities, not necessary!
    useEffect(() => {
      if(walletDir == "main"){
        setWalletDirHistory("main")
      }
    }, [walletDir])



    function removeBankList(id){
        let newBankArray = banks.filter(bank=>bank.id !==id)
        setBanks(newBankArray)
    }
    function addBankList(item){
        banks.map(i=>{
            if(i.accountNumber == item.accountNumber){
                return
            }
        })
        item.id = banks.length-1
        setBanks(prev => [...prev, item])

        // stopped here for today
    }

    const actions = {
        addBankList,
        removeBankList
    }
    // remove the set wallet dir, it is the navigator for the wallet page, it's not well functional!

    // -------------------------ends here

    



  return (
    <div className='WalletPage'>
        <BackTop onClick={()=>{
                        setWalletDirHistory(walletDir)
                        setWalletDir(walletDirHistory)
        }}/>
        <div className="WalletPageContent">
            {
                walletDir=="main"?
                    <WalletMain transactionHistory={transactionHistory} nav={(dir)=> {
                        setWalletDirHistory(walletDir)
                        setWalletDir(dir)
                    }}/>
                :walletDir=="transactionHistory"?
                    <TransactionHistory transactionHistory={transactionHistory}/>
                :walletDir=="deposit"?
                    <Deposit cards={cards} nav={(dir)=> {
                        setWalletDirHistory(walletDir)
                        setWalletDir(dir)
                    }}/>
                :walletDir=="saved-cards"?
                    <SavedCards cards={cards} nav={(dir)=> {
                        setWalletDirHistory(walletDir)
                        setWalletDir(dir)
                    }}/>
                :walletDir=="saved-banks"?
                    <SavedBanks actions={actions} banks={banks}/>
                :walletDir=="withdraw"?
                    <SavedBanks actions={actions} banks={banks} withdraw={true}/>
                :null
            }
        </div>

        
    </div>
  )
}

export default WalletPage