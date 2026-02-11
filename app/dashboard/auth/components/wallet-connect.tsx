"use client"

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface WalletConnectProps {
  onError: (error: string) => void
}

export function WalletConnect({ onError }: WalletConnectProps) {
  const router = useRouter()
  const { address, isConnected } = useAccount()
  const { connectors, connect } = useConnect()
  const { disconnect } = useDisconnect()

  const handleMetaMaskConnect = async () => {
    try {
      const metamaskConnector = connectors.find(c => c.id === 'io.metamask')
      if (metamaskConnector) {
        connect({ connector: metamaskConnector })
      } else {
        // Fallback to injected
        const injectedConnector = connectors.find(c => c.id === 'injected')
        if (injectedConnector) {
          connect({ connector: injectedConnector })
        } else {
          onError("No wallet connector found. Please install MetaMask.")
        }
      }
    } catch (err) {
      onError("Failed to connect wallet")
    }
  }

  // Auto-redirect if wallet is connected
  useEffect(() => {
    if (isConnected && address) {
      setTimeout(() => router.push("/dashboard/main"), 1000)
    }
  }, [isConnected, address, router])

  return (
    <>
      {/* Web3 Wallet Connect */}
      {!isConnected ? (
        <div className="mb-6">
          <button
            onClick={handleMetaMaskConnect}
            className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.05 7.54a.91.91 0 00-.09-.18l-5.5-9a1 1 0 00-1.72 0l-5.5 9a.91.91 0 00-.09.18 1 1 0 00.09 1.09l5.5 9a1 1 0 001.72 0l5.5-9a1 1 0 00.09-1.09z"/>
            </svg>
            Connect Wallet (MetaMask)
          </button>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Connect your Web3 wallet to access the platform
          </p>
        </div>
      ) : (
        <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary">Wallet Connected</p>
              <p className="text-xs text-muted-foreground font-mono">{address?.slice(0, 6)}...{address?.slice(-4)}</p>
            </div>
            <button
              onClick={() => disconnect()}
              className="text-xs text-destructive hover:text-destructive/80"
            >
              Disconnect
            </button>
          </div>
        </div>
      )}
    </>
  )
}
