# 🔐 Google OAuth & MetaMask Authentication Setup Guide

## ✅ What's Been Implemented

I've set up **3 authentication methods** for your platform:

1. **Google OAuth** - Social login with Google accounts
2. **MetaMask Wallet** - Web3 wallet authentication
3. **Email/Password** - Traditional authentication

---

## 🔑 API Keys & Credentials You Need

### 1. **Google OAuth** (For "Sign in with Google")

#### Step 1: Go to Google Cloud Console
Visit: https://console.cloud.google.com/

#### Step 2: Create a New Project (or select existing)
- Click "Select a Project" → "New Project"
- Name it: "Blockchain Platform" (or any name)
- Click "Create"

#### Step 3: Enable Google+ API
- Go to "APIs & Services" → "Library"
- Search for "Google+ API"
- Click "Enable"

#### Step 4: Create OAuth Credentials
- Go to "APIs & Services" → "Credentials"
- Click "Create Credentials" → "OAuth client ID"
- If prompted, configure OAuth consent screen:
  - User Type: External
  - App name: "Blockchain Platform"
  - Add your email
  - Add authorized domains: `localhost` (for development)
  - Save

- Application type: **Web application**
- Name: "Blockchain Platform Web Client"
- **Authorized JavaScript origins:** 
  ```
  http://localhost:3000
  ```
- **Authorized redirect URIs:**
  ```
  http://localhost:3000/api/auth/callback/google
  ```
- Click "Create"

#### Step 5: Copy Your Credentials
You'll see:
- **Client ID** (looks like: `123456789-abc123.apps.googleusercontent.com`)
- **Client Secret** (looks like: `GOCSPX-abc123def456`)

#### Step 6: Add to .env.local
```env
GOOGLE_CLIENT_ID="123456789-abc123.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-abc123def456"
```

---

### 2. **WalletConnect Project ID** (For MetaMask Integration)

#### Step 1: Go to WalletConnect Cloud
Visit: https://cloud.walletconnect.com/

#### Step 2: Sign Up / Login
- Create a free account or login
- No credit card required!

#### Step 3: Create a New Project
- Click "Create New Project"
- Project Name: "Blockchain Platform"
- Click "Create"

#### Step 4: Copy Project ID
You'll see a **Project ID** on your dashboard (looks like: `abc123def456xyz789`)

#### Step 5: Add to .env.local
```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID="abc123def456xyz789"
```

---

### 3. **NextAuth Secret** (Security Key)

#### Generate a Secure Secret
Run this in your terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Or use any random 32+ character string.

#### Add to .env.local
```env
NEXTAUTH_SECRET="your-generated-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

---

## 📋 Complete .env.local Template

After getting your credentials, your `.env.local` should look like:

```env
# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="put-your-generated-secret-here"

# Google OAuth
GOOGLE_CLIENT_ID="your-actual-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-your-actual-google-secret"

# WalletConnect Project ID
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID="your-walletconnect-project-id"

# Database (already configured)
DATABASE_URL="file:./dev.db"

# JWT Secret (already set)
JWT_SECRET="your-super-secret-jwt-key"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 🎨 What Users Will See

### On the Login Page (`/dashboard/auth`):

1. **🦊 "Connect Wallet (MetaMask)" Button** (Top)
   - Instantly connects Web3 wallets
   - Works with MetaMask, Coinbase Wallet, WalletConnect
   - No password needed!

2. **🔵 "Sign in with Google" Button**
   - One-click Google authentication
   - Uses your Google account
   - Secure OAuth 2.0 flow

3. **📧 Email/Password Fields** (Bottom)
   - Traditional username/password login
   - For users who prefer email

---

## 🚀 Testing Your Setup

### 1. Test MetaMask (Works Immediately!)
- Go to `/dashboard/auth`
- Click "Connect Wallet (MetaMask)"
- Your MetaMask extension will pop up
- Approve connection
- You're logged in! ✅

**Note:** MetaMask needs to be installed as a browser extension. Get it from: https://metamask.io/download/

### 2. Test Google OAuth (After adding credentials)
- Go to `/dashboard/auth`
- Click "Sign in with Google"
- Choose your Google account
- You're logged in! ✅

### 3. Test Email/Password (Works Now!)
- Go to `/dashboard/auth`
- Enter email and password
- Click "Sign In with Email"
- Works with existing database users! ✅

---

## 🎯 Priority Order (What to Set Up First)

### **Immediate (No API Keys Needed):**
✅ MetaMask authentication - Just install MetaMask browser extension
✅ Email/Password - Already working with database

### **Quick Setup (5 minutes):**
1. WalletConnect Project ID - Makes MetaMask prettier with better wallet selection
2. NextAuth Secret - Generate with one command

### **Optional (10 minutes):**
3. Google OAuth - For social login

---

## 🔧 After Adding Credentials

1. **Update .env.local** with your credentials
2. **Restart the dev server:**
   ```bash
   # Stop current server (Ctrl+C)
   pnpm dev
   ```
3. **Test authentication** at http://localhost:3000/dashboard/auth

---

## 💡 What Works Without Any Setup

Even without API keys, your platform has:
- ✅ MetaMask wallet connection (basic mode)
- ✅ Email/password authentication
- ✅ All other platform features
- ✅ Backend APIs

---

## 🆘 Quick Links

- **Google Cloud Console:** https://console.cloud.google.com/
- **WalletConnect Cloud:** https://cloud.walletconnect.com/
- **MetaMask Download:** https://metamask.io/download/
- **NextAuth Docs:** https://next-auth.js.org/

---

## 📝 Summary

### What You Need:
1. **GOOGLE_CLIENT_ID** - From Google Cloud Console
2. **GOOGLE_CLIENT_SECRET** - From Google Cloud Console  
3. **NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID** - From WalletConnect Cloud
4. **NEXTAUTH_SECRET** - Generate with crypto

### What's Already Working:
- ✅ MetaMask connection (basic)
- ✅ Email/Password login
- ✅ User sessions
- ✅ Protected routes

---

**Ready to test?** Just refresh your browser and go to `/dashboard/auth` to see all three authentication options! 🎉
