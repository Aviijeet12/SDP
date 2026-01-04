"use client"

import { useState } from "react"
import DashboardNavbar from "@/components/dashboard-navbar"
import { Settings, Trash2, Copy, Plus, Edit2, Shield, Mail, CheckCircle } from "lucide-react"

export default function OrganizationPage() {
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@company.com",
      role: "Admin",
      status: "active",
      joinDate: "2024-01-15",
    },
    { id: 2, name: "Bob Smith", email: "bob@company.com", role: "Reviewer", status: "active", joinDate: "2024-02-20" },
    {
      id: 3,
      name: "Sarah Johnson",
      email: "sarah@company.com",
      role: "User",
      status: "active",
      joinDate: "2024-03-10",
    },
    { id: 4, name: "Mike Chen", email: "mike@company.com", role: "User", status: "inactive", joinDate: "2024-04-05" },
  ])

  const [orgName, setOrgName] = useState("Acme Corporation")
  const [inviteEmail, setInviteEmail] = useState("")
  const [apiKeyCopied, setApiKeyCopied] = useState(false)

  const handleAddMember = () => {
    if (inviteEmail) {
      setMembers([
        ...members,
        {
          id: members.length + 1,
          name: inviteEmail.split("@")[0],
          email: inviteEmail,
          role: "User",
          status: "pending",
          joinDate: new Date().toISOString().split("T")[0],
        },
      ])
      setInviteEmail("")
    }
  }

  const handleRemoveMember = (id) => {
    setMembers(members.filter((m) => m.id !== id))
  }

  const stats = [
    { label: "Total Members", value: members.length, icon: "👥", color: "from-blue-500 to-cyan-500" },
    {
      label: "Active Users",
      value: members.filter((m) => m.status === "active").length,
      icon: "✓",
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Pending Invites",
      value: members.filter((m) => m.status === "pending").length,
      icon: "📨",
      color: "from-orange-500 to-red-500",
    },
    { label: "Storage Used", value: "12.4 GB", icon: "💾", color: "from-primary to-accent" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />

      <main className="pt-20 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
            <div>
              <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Organization Management
              </h1>
              <p className="text-muted-foreground text-lg">Manage team members and workspace settings</p>
            </div>
            <button className="px-6 py-3 rounded-lg font-bold bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/50 transition-all flex items-center gap-2 whitespace-nowrap">
              <Plus className="w-4 h-4" />
              Invite Member
            </button>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-6 border border-white/10 backdrop-blur-xl bg-gradient-to-br ${stat.color} bg-opacity-10`}
              >
                <div className="text-3xl mb-3">{stat.icon}</div>
                <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 backdrop-blur-xl bg-white/5 p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Invite Team Members</h2>
            <div className="flex gap-2">
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="Enter email address..."
                className="flex-1 rounded-lg border border-white/10 bg-white/5 backdrop-blur-lg px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
              <button
                onClick={handleAddMember}
                className="px-6 py-3 rounded-lg font-bold bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/50 transition-all"
              >
                <Mail className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              They'll receive an invitation email to join your workspace
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 backdrop-blur-xl bg-white/5 p-8 mb-12">
            <h2 className="text-2xl font-bold mb-8">Team Members</h2>

            <div className="space-y-3">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="rounded-xl p-5 border border-white/10 backdrop-blur-lg bg-white/5 flex items-center justify-between hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg group-hover:shadow-lg group-hover:shadow-primary/50 transition-all">
                      {member.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-white">{member.name}</p>
                      <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                        <span>{member.email}</span>
                        <span>•</span>
                        <span>Joined {member.joinDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20">
                        <Shield className="w-3 h-3" />
                        <span className="text-xs font-bold text-primary">{member.role}</span>
                      </div>
                      <p
                        className={`text-xs mt-1 font-semibold ${member.status === "active" ? "text-green-400" : "text-yellow-400"}`}
                      >
                        {member.status === "active" ? "✓ Active" : "⏳ Pending"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg hover:bg-white/20 transition-colors text-muted-foreground hover:text-foreground">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleRemoveMember(member.id)}
                        className="p-2 rounded-lg hover:bg-red-500/20 transition-colors text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 backdrop-blur-xl bg-white/5 p-8">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Settings className="w-5 h-5 text-primary" />
              </div>
              Organization Settings
            </h2>

            <div className="space-y-8">
              <div className="pb-6 border-b border-white/10">
                <label className="block text-sm font-bold mb-3 text-white">Organization Name</label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 backdrop-blur-lg px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              <div className="pb-6 border-b border-white/10">
                <label className="block text-sm font-bold mb-3 text-white">API Key</label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value="sk_live_8d4f2e9c5b1a3e7f"
                    readOnly
                    className="flex-1 rounded-lg border border-white/10 bg-white/5 backdrop-blur-lg px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("sk_live_8d4f2e9c5b1a3e7f")
                      setApiKeyCopied(true)
                      setTimeout(() => setApiKeyCopied(false), 2000)
                    }}
                    className={`px-4 py-3 rounded-lg transition-all ${apiKeyCopied ? "bg-green-500/20 text-green-400" : "bg-primary/20 text-primary hover:bg-primary/30"}`}
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="pb-6 border-b border-white/10">
                <label className="block text-sm font-bold mb-3 text-white flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Two-Factor Authentication
                </label>
                <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                  <div>
                    <p className="font-semibold text-white">Enable 2FA</p>
                    <p className="text-xs text-muted-foreground">Secure your account with two-factor authentication</p>
                  </div>
                  <button className="px-4 py-2 rounded-lg border border-white/10 text-muted-foreground hover:bg-white/10 transition-colors">
                    Enable
                  </button>
                </div>
              </div>

              <button className="w-full px-6 py-3 rounded-lg font-bold bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/50 transition-all flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
