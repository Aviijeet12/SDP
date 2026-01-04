"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Wallet } from "lucide-react"
import DashboardNavbar from "@/components/dashboard-navbar"

export default function MainDashboardPage() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Document verified successfully", time: "2 hours ago" },
    { id: 2, message: "New contract template available", time: "5 hours ago" },
  ])

  const modules = [
    {
      title: "Document Management",
      desc: "Upload, verify, and manage documents",
      icon: "📄",
      href: "/dashboard/documents",
      stats: { label: "Documents", value: 24 },
      color: "from-blue-500",
    },
    {
      title: "Workflow Approvals",
      desc: "Review and approve pending documents",
      icon: "✓",
      href: "/dashboard/approvals",
      stats: { label: "Pending", value: 3 },
      color: "from-purple-500",
    },
    {
      title: "Blockchain Audit",
      desc: "View complete blockchain history",
      icon: "⛓",
      href: "/dashboard/audit",
      stats: { label: "Events", value: 156 },
      color: "from-cyan-500",
    },
    {
      title: "Payments",
      desc: "Cross-border crypto transactions",
      icon: "💳",
      href: "/dashboard/payments",
      stats: { label: "Balance", value: "$1.2M" },
      color: "from-emerald-500",
    },
    {
      title: "Access Control",
      desc: "Manage sharing and permissions",
      icon: "🔐",
      href: "/dashboard/access",
      stats: { label: "Shared", value: 12 },
      color: "from-primary",
    },
    {
      title: "Organization",
      desc: "Team and workspace management",
      icon: "👥",
      href: "/dashboard/organization",
      stats: { label: "Members", value: 8 },
      color: "from-orange-500",
    },
    {
      title: "Ownership Logs",
      desc: "Track ownership transfers",
      icon: "🔄",
      href: "/dashboard/ownership",
      stats: { label: "Transfers", value: 5 },
      color: "from-red-500",
    },
    {
      title: "Certificates",
      desc: "Issue and verify certificates",
      icon: "🎓",
      href: "/dashboard/certificates",
      stats: { label: "Issued", value: 42 },
      color: "from-indigo-500",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />

      <main className="pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">Welcome, Alice</h1>
                <p className="text-muted-foreground">Your blockchain workspace dashboard</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-card border border-border rounded-lg py-3 px-6">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-5 h-5 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" />
                    <div>
                      <p className="text-xs text-muted-foreground">Wallet Balance</p>
                      <p className="font-bold">2.45 ETH</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { label: "Total Documents", value: "128", change: "+12 this month" },
                { label: "Documents Verified", value: "98%", change: "Authentic" },
                { label: "Active Permissions", value: "24", change: "+3 new shares" },
                { label: "Network Status", value: "Online", change: "All systems operational" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-card border border-border rounded-lg p-6 transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/10"
                >
                  <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                  <p className="text-2xl font-bold mb-1">{stat.value}</p>
                  <p className="text-xs text-primary">{stat.change}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Modules Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Workspace Modules</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {modules.map((module, idx) => (
                <Link
                  key={idx}
                  href={module.href}
                  className={`bg-card border border-border rounded-lg p-6 transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/10 bg-gradient-to-br ${module.color} to-transparent group`}
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{module.icon}</div>
                  <h3 className="font-bold text-white mb-1">{module.title}</h3>
                  <p className="text-sm text-white/80 mb-4">{module.desc}</p>

                  <div className="pt-4 border-t border-white/20">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/70">{module.stats.label}</span>
                      <span className="font-bold text-white text-lg">{module.stats.value}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Activity Section */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="md:col-span-2 bg-card border border-border rounded-lg p-6 transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/10">
              <h2 className="text-xl font-bold mb-6">Recent Activity</h2>

              <div className="space-y-4">
                {[
                  {
                    icon: "✓",
                    title: "Contract Verified",
                    desc: "ERC-20 token contract passed security audit",
                    time: "1 hour ago",
                  },
                  {
                    icon: "📄",
                    title: "Document Uploaded",
                    desc: "Legal agreement document_2025_01_15.pdf",
                    time: "3 hours ago",
                  },
                  {
                    icon: "👥",
                    title: "Access Granted",
                    desc: "Sarah Johnson gained view access to Q1 Reports",
                    time: "5 hours ago",
                  },
                  {
                    icon: "⛓",
                    title: "Blockchain Recorded",
                    desc: "Transaction 0x9e4f1a3c5b7d2f8e confirmed",
                    time: "1 day ago",
                  },
                ].map((activity, idx) => (
                  <div key={idx} className="bg-card border border-border rounded-lg p-4 flex gap-4">
                    <div className="text-2xl">{activity.icon}</div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{activity.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.desc}</p>
                      <p className="text-xs text-muted-foreground/70 mt-2">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-card border border-border rounded-lg p-6 transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/10">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </h2>

              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div key={notif.id} className="bg-card border border-border rounded-lg p-3">
                    <p className="text-sm text-foreground">{notif.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">{notif.time}</p>
                  </div>
                ))}

                <button className="w-full text-sm text-primary font-medium pt-2 border-t border-white/10">
                  View all notifications
                </button>
              </div>

              {/* Quick Actions */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-sm font-semibold mb-3">Quick Actions</p>
                <div className="space-y-2">
                  <Link
                    href="/dashboard/documents"
                    className="w-full bg-card border border-border rounded-lg p-3 text-sm hover:shadow-lg block text-center transition-all duration-300"
                  >
                    Upload Document
                  </Link>
                  <Link
                    href="/dashboard/audit"
                    className="w-full bg-card border border-border rounded-lg p-3 text-sm hover:shadow-lg block text-center transition-all duration-300"
                  >
                    View Audit Trail
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
