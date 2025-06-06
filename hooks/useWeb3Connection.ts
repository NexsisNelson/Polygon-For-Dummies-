import { useState } from "react"
import { hooks, metamask } from "@/lib/web3"

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider } = hooks

export function useWeb3Connection() {
  const chainId = useChainId()
  const accounts = useAccounts()
  const isActivating = useIsActivating()
  const isActive = useIsActive()
  const provider = useProvider()

  const [error, setError] = useState<Error | undefined>(undefined)

  const connect = async () => {
    setError(undefined)
    try {
      await metamask.activate()
    } catch (error) {
      setError(error as Error)
    }
  }

  const disconnect = () => {
    if (metamask?.deactivate) {
      void metamask.deactivate()
    } else {
      void metamask.resetState()
    }
  }

  return { chainId, accounts, isActivating, isActive, provider, error, connect, disconnect }
}
