# Authentication Setup Guide

## Current Status

✅ **NextAuth Secret**: Generated and configured
✅ **Database**: SQLite database created at `prisma/dev.db`
✅ **MetaMask Integration**: Ready (works without API keys)
⚠️ **Google OAuth**: Requires setup (see below)
⚠️ **WalletConnect**: Optional enhancement (see below)

---

## 🔧 What's Already Working

### 1. Email/Password Authentication
- ✅ Backend API routes created
- ✅ Database schema ready
- ✅ Login form functional
- **Note**: No users exist yet. Create users via the register endpoint.

### 2. MetaMask Wallet Connection
- ✅ Works immediately if MetaMask extension is installed
- ✅ No API keys required
- **To test**: Install [MetaMask Extension](https://metamask.io/download/) and click "Connect Wallet"

---

## 🔐 Required Setup for Google OAuth

Google Sign-In requires API credentials from Google Cloud Console.

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name it "Blockchain Platform" → Click "Create"
4. Wait for project creation (30 seconds)

### Step 2: Enable Google+ API

1. In the left menu: **APIs & Services** → **Library**
2. Search for "Google+ API"
3. Click on it → Click **"Enable"**

### Step 3: Configure OAuth Consent Screen

1. Left menu: **APIs & Services** → **OAuth consent screen**
2. Choose **"External"** → Click **"Create"**
3. Fill in required fields:
   - **App name**: Blockchain Platform
   - **User support email**: Your email
   - **Developer contact**: Your email
4. Click **"Save and Continue"** (skip scopes)
5. Click **"Save and Continue"** (skip test users)
6. Click **"Back to Dashboard"**

### Step 4: Create OAuth Credentials

1. Left menu: **APIs & Services** → **Credentials**
2. Click **"+ Create Credentials"** → **"OAuth client ID"**
3. Application type: **"Web application"**
4. Name: "Blockchain Platform Web"
5. **Authorized JavaScript origins**:
   - Add: `http://localhost:3000`
6. **Authorized redirect URIs**:
   - Add: `http://localhost:3000/api/auth/callback/google`
7. Click **"Create"**
8. Copy the **Client ID** and **Client Secret**

### Step 5: Update Environment Variables

Open `.env.local` and replace:

```env
GOOGLE_CLIENT_ID="your-google-client-id-here"
GOOGLE_CLIENT_SECRET="your-google-client-secret-here"
```

With your actual credentials:

```env
GOOGLE_CLIENT_ID="123456789-abc...xyz.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-ABC...XYZ"
```

### Step 6: Restart Server

```bash
pnpm dev
```

Now "Sign in with Google" button will work!

---

## 🚀 Optional: WalletConnect Enhancement

WalletConnect provides a better multi-wallet experience (supports 300+ wallets).

### Quick Setup (5 minutes)

1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Click **"Sign Up"** (free account)
3. Create a new project:
   - **Name**: Blockchain Platform
   - **Type**: App
4. Copy your **Project ID**
5. Update `.env.local`:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID="abc123def456..."
```

**Benefits**: 
- QR code scanning for mobile wallets
- Support for Coinbase Wallet, Trust Wallet, Rainbow, etc.
- Better UX for users without MetaMask

---

## 🧪 Testing Authentication

### Test MetaMask (No setup required)
1. Install [MetaMask extension](https://metamask.io/download/)
2. Visit: http://localhost:3000/dashboard/auth
3. Click "Connect Wallet (MetaMask)"
4. Approve connection in MetaMask popup
5. You'll be redirected to dashboard

### Test Google OAuth (After setup)
1. Complete Google OAuth setup above
2. Visit: http://localhost:3000/dashboard/auth
3. Click "Sign in with Google"
4. Choose your Google account
5. You'll be redirected to dashboard

### Test Email/Password
1. First create a user:
   ```bash
   curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
   ```
2. Visit: http://localhost:3000/dashboard/auth
3. Enter email and password
4. Click "Sign In with Email"

---

## 🐛 Troubleshooting

### "Google sign-in failed"
- ✅ Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env.local`
- ✅ Check redirect URI is exactly: `http://localhost:3000/api/auth/callback/google`
- ✅ Restart server after changing `.env.local`

### MetaMask button does nothing
- ✅ Install MetaMask browser extension
- ✅ Refresh the page after installing
- ✅ Check browser console for errors (F12)

### "No wallet connector found"
- ✅ Install [MetaMask Extension](https://metamask.io/download/)
- ✅ Alternative: Set up WalletConnect (see optional section above)

---

## 📁 Files Modified

- ✅ `app/dashboard/auth/page.tsx` - Fixed SSR issues with Wagmi hooks
- ✅ `app/dashboard/auth/components/wallet-connect.tsx` - Isolated Web3 logic
- ✅ `lib/web3-provider.tsx` - Added SSR support
- ✅ `.env.local` - Generated NextAuth secret
- ✅ `prisma/dev.db` - Database created

---

## ⏱️ Time Estimates

- ✅ **MetaMask**: 2 minutes (install extension)
- **Google OAuth**: 10 minutes (follow steps above)
- **WalletConnect**: 5 minutes (optional, better UX)

---

## 🎯 Summary

**What works NOW (no setup):**
- ✅ MetaMask wallet connection (install extension only)
- ✅ Email/password authentication (create users via API)

**What needs 10 minutes setup:**
- ⏳ Google OAuth (requires Google Cloud Console setup)
- ⏳ WalletConnect (optional, enhances wallet support)

**Next Steps:**
1. Test MetaMask connection (should work now!)
2. Follow Google OAuth setup if you want social login
3. Create test users for email/password auth
