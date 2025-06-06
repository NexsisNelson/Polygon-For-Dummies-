"use client"

import { useState, useEffect } from "react"
import { useWeb3React } from "@web3-react/core"

interface Transaction {
  id: number
  amount: number
  fee: number
}

export default function ValidatorSimGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [validatedTransactions, setValidatedTransactions] = useState<number[]>([])
  const [balance, setBalance] = useState(1000)
  const [reputation, setReputation] = useState(50)
  const { active, account } = useWeb3React()

  useEffect(() => {
    if (gameStarted) {
      const interval = setInterval(() => {
        const newTransaction: Transaction = {
          id: Date.now(),
          amount: Math.floor(Math.random() * 1000) + 1,
          fee: Math.floor(Math.random() * 10) + 1,
        }
        setTransactions(prev => [...prev, newTransaction])
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [gameStarted])

  const validateTransaction = (transaction: Transaction) => {
    setValidatedTransactions(prev => [...prev, transaction.id])
    setBalance(prev => prev + transaction.fee)
    setReputation(prev => Math.min(100, prev + 1))
  }

  const rejectTransaction = (transaction: Transaction) => {
    setValidatedTransactions(prev => [...prev, transaction.id])
    setReputation(prev => Math.max(0, prev - 1))
  }

  const startGame = () => {
    setGameStarted(true)
    setTransactions([\
