import { NextRequest, NextResponse } from 'next/server'

interface SecurityIssue {
  level: 'critical' | 'high' | 'medium' | 'low'
  title: string
  description: string
  line: number
}

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()

    if (!code) {
      return NextResponse.json(
        { error: 'Code is required' },
        { status: 400 }
      )
    }

    const issues: SecurityIssue[] = []
    const lines = code.split('\n')

    // Security checks
    lines.forEach((line: string, index: number) => {
      const lineNum = index + 1

      // Check for reentrancy
      if (line.includes('.call{') || line.includes('.transfer(')) {
        const nextLines = lines.slice(index, index + 5).join(' ')
        if (!nextLines.includes('ReentrancyGuard') && !nextLines.includes('nonReentrant')) {
          issues.push({
            level: 'critical',
            title: 'Potential Reentrancy Vulnerability',
            description: 'External call detected. Consider using ReentrancyGuard or checks-effects-interactions pattern.',
            line: lineNum
          })
        }
      }

      // Check for unchecked arithmetic (pre 0.8.0)
      if ((line.includes('+=') || line.includes('-=') || line.includes('*=') || line.includes('/=')) && 
          !code.includes('pragma solidity ^0.8')) {
        issues.push({
          level: 'high',
          title: 'Potential Integer Overflow/Underflow',
          description: 'Use Solidity ^0.8.0 or SafeMath library for automatic overflow checks.',
          line: lineNum
        })
      }

      // Check for missing address validation
      if (line.includes('address') && line.includes('(') && !line.includes('require') && !line.includes('address(0)')) {
        issues.push({
          level: 'medium',
          title: 'Missing Address Validation',
          description: 'Consider validating address parameter against zero address.',
          line: lineNum
        })
      }

      // Check for tx.origin usage
      if (line.includes('tx.origin')) {
        issues.push({
          level: 'high',
          title: 'Use of tx.origin',
          description: 'tx.origin should not be used for authorization. Use msg.sender instead.',
          line: lineNum
        })
      }

      // Check for block timestamp dependency
      if (line.includes('block.timestamp') || line.includes('now')) {
        issues.push({
          level: 'medium',
          title: 'Block Timestamp Dependency',
          description: 'Avoid using block.timestamp for critical logic as miners can manipulate it.',
          line: lineNum
        })
      }

      // Check for unchecked external calls
      if (line.includes('.call(') && !line.includes('require') && !line.includes('if')) {
        issues.push({
          level: 'high',
          title: 'Unchecked External Call',
          description: 'External call return value should be checked.',
          line: lineNum
        })
      }

      // Check for public functions that should be external
      if (line.includes('function') && line.includes('public') && !line.includes('returns')) {
        issues.push({
          level: 'low',
          title: 'Gas Optimization',
          description: 'Consider using external visibility for functions not called internally.',
          line: lineNum
        })
      }

      // Check for missing events
      if ((line.includes('=') && !line.includes('==')) && 
          (line.includes('balance') || line.includes('owner') || line.includes('status'))) {
        const hasEvent = lines.slice(Math.max(0, index - 3), index + 3).some((l: string) => l.includes('emit'))
        if (!hasEvent) {
          issues.push({
            level: 'low',
            title: 'Missing Event Emission',
            description: 'Important state changes should emit events for transparency.',
            line: lineNum
          })
        }
      }
    })

    // Calculate security score
    const criticalCount = issues.filter(i => i.level === 'critical').length
    const highCount = issues.filter(i => i.level === 'high').length
    const mediumCount = issues.filter(i => i.level === 'medium').length
    const lowCount = issues.filter(i => i.level === 'low').length

    const score = Math.max(0, 100 - (criticalCount * 25 + highCount * 15 + mediumCount * 8 + lowCount * 3))

    // Estimate gas usage (simplified)
    const gasEstimate = lines.length * 1000 + (code.match(/mapping/g) || []).length * 20000

    return NextResponse.json({
      success: true,
      score,
      gasUsage: gasEstimate,
      issues: issues.slice(0, 10), // Limit to top 10 issues
      summary: {
        critical: criticalCount,
        high: highCount,
        medium: mediumCount,
        low: lowCount
      }
    })
  } catch (error) {
    console.error('Security analysis error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
