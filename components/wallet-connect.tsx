"use client"

import { useWeb3 } from "@/lib/web3"
import { Button } from "@/components/ui/button"

export function WalletConnect() {
  const { isConnected, account, connect, disconnect, error } = useWeb3()

  if (error) {
    return <div className="text-red-500 text-xs">Error: {error.message}</div>
  }

  if (isConnected && account) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-xs text-gray-300">
          {account.slice(0, 4)}...{account.slice(-4)}
        </span>
        <Button onClick={disconnect} variant="outline" size="sm" className="text-xs py-1 px-2">
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <Button onClick={connect} variant="outline" size="sm" className="text-xs py-1 px-2">
      Connect Wallet
    </Button>
  )
}
