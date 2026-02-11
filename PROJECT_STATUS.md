# Blockchain Trust & Automation Platform — Project Status

> **Last Updated:** February 10, 2026  
> **Framework:** Next.js 16.0.10 · React 19.2.0 · TypeScript 5 · Tailwind CSS v4  
> **Database:** Prisma 5.22.0 + SQLite  
> **Auth:** NextAuth v4 (Google OAuth + Credentials) + standalone JWT  
> **Web3:** Wagmi v3 + Viem (Ethereum, Sepolia, Polygon, Arbitrum)  
> **AI:** OpenAI GPT-4 (smart contract generation)

---

## Table of Contents

1. [Public Pages](#1-public-pages)
2. [Dashboard Pages](#2-dashboard-pages)
3. [API Routes](#3-api-routes)
4. [Authentication System](#4-authentication-system)
5. [Database Schema](#5-database-schema)
6. [Reusable Components](#6-reusable-components)
7. [Libraries & Utilities](#7-libraries--utilities)
8. [Configuration & Environment](#8-configuration--environment)
9. [Key Dependencies](#9-key-dependencies)
10. [Known Limitations & Notes](#10-known-limitations--notes)

---

## 1. Public Pages

### 1.1 Landing Page — `/`

| Item | Detail |
|------|--------|
| **File** | `app/page.tsx` |
| **Purpose** | Marketing home page and entry point to the platform |

**Features & Use Cases:**

- **Hero Section** — Gradient animated "Trust & Automation" headline with platform tagline. Draws users into the platform's mission.
- **3 Feature Cards** — AI-Powered Generation, Security Scanner, Document Verification. Each links to its respective tool page.
- **4 Feature Categories** — Smart Contracts, Document Control, Access & Sharing, Learning Center. Showcases the breadth of the platform.
- **6 Quick Tools Grid** — Direct links to Generate Contract, Analyze Security, Verify Document, Browse Templates, Interactive Sandbox, Contract Explorer.
- **Navigation** — Links to all major pages: `/contracts/generate`, `/security`, `/verify`, `/templates`, `/sandbox`, `/explorer`, `/dashboard/auth`.

---

### 1.2 Smart Contract Templates — `/templates`

| Item | Detail |
|------|--------|
| **File** | `app/templates/page.tsx` |
| **Purpose** | Browse and discover pre-built smart contract templates |

**Features & Use Cases:**

- **Search Bar** — Full-text search across template names and descriptions.
- **Category Filters** — Filter by: All, Tokens, NFT, Governance, DeFi, Staking, Security, Utility.
- **Template Cards (20 templates)** — Each card displays emoji icon, title, description, star rating, usage count, and category tags.
- **Template Catalog includes:** ERC-20 Token, ERC-721 NFT, ERC-1155 Multi-Token, DAO Governance, Yield Farming, Staking Pool, DEX Swap, Token Vesting, Multi-Sig Wallet, Escrow Contract, Lottery, Airdrop Distributor, Token Bridge, Insurance Pool, Prediction Market, Supply Chain, Real Estate Tokenization, Social Token, Carbon Credits, Identity Verification.
- **Click-through** — Each card links to `/templates/[id]` for detailed view.

---

### 1.3 Template Detail — `/templates/[id]`

| Item | Detail |
|------|--------|
| **File** | `app/templates/[id]/page.tsx` |
| **Purpose** | View, customize, and use a specific smart contract template |

**Features & Use Cases:**

- **Template Info** — Title, description, star rating, total uses count.
- **Customizable Parameters Panel** — Editable inputs for Token Name, Symbol, Total Supply, Decimals. Users can tweak values before deploying.
- **Code Viewer** — Syntax-highlighted Solidity source code display with scrollable overflow.
- **Copy Button** — Copy the full contract source to clipboard.
- **Download Button** — Download the contract as a file.
- **"Use This Template" Button** — CTA to deploy/use the template.

---

### 1.4 AI Contract Generator — `/contracts/generate`

| Item | Detail |
|------|--------|
| **File** | `app/contracts/generate/page.tsx` |
| **Purpose** | Generate smart contract code using AI from a natural language prompt |

**Features & Use Cases:**

- **Contract Type Selector** — Dropdown with: ERC-20 Token, ERC-721 NFT, ERC-1155 Multi-Token, DAO Governance, Staking Contract, DEX Swap.
- **Prompt Input** — Free-text description of what the contract should do (e.g., "Create a token with 1M supply and burn mechanism").
- **"Generate Contract" Button** — Triggers contract generation with loading state.
- **Generated Code Output** — Displays the generated Solidity code in a code panel.
- **Copy to Clipboard** — One-click copy.
- **Download as .sol** — Download the generated contract file.
- **Contract Explanation** — A human-readable description of what the generated contract does.
- **Backend API Available** — `POST /api/contracts/generate` supports OpenAI GPT-4 generation with built-in template fallback.

---

### 1.5 Security Scanner — `/security`

| Item | Detail |
|------|--------|
| **File** | `app/security/page.tsx` |
| **Purpose** | Analyze smart contract code for security vulnerabilities |

**Features & Use Cases:**

- **Code Input Area** — Large textarea to paste Solidity contract code for analysis.
- **File Upload Button** — UI for uploading a `.sol` file.
- **"Analyze Contract" Button** — Triggers vulnerability scan with loading animation.
- **Security Report Panel:**
  - **Security Score** — Percentage score (0–100) rating the contract's safety.
  - **Gas Usage Estimate** — Estimated gas consumption in millions.
  - **Issues Count** — Total number of vulnerabilities found.
- **Detailed Findings Section** — Color-coded vulnerability list:
  - 🔴 **Critical** — e.g., Reentrancy vulnerabilities
  - 🟠 **High** — e.g., Integer overflow risks
  - 🟡 **Medium** — e.g., Timestamp dependency
  - 🔵 **Low** — e.g., Gas optimization suggestions
- **Each finding shows:** Icon, severity badge, title, and description.
- **Backend API Available** — `POST /api/security/analyze` provides real rule-based static analysis with 8 vulnerability checks.

---

### 1.6 Document Verification — `/verify`

| Item | Detail |
|------|--------|
| **File** | `app/verify/page.tsx` |
| **Purpose** | Verify authenticity of documents against blockchain records |

**Features & Use Cases:**

- **File Upload** — Drag-and-drop or click to upload PDF, Word, TXT, or JSON files.
- **Document ID Input** — Paste a known document ID for lookup.
- **"Verify Document" Button** — Initiates verification with loading animation.
- **Verification Result Panel:**
  - **Status** — Authentic ✅ or Tampered ❌
  - **Document Hash** — SHA-256 hash of the file content
  - **Upload Date** — When the document was originally registered
  - **Blockchain Info** — Chain name (e.g., Ethereum Mainnet)
  - **Transaction Hash** — On-chain tx reference
- **"How It Works" Section** — 4-step visual explainer:
  1. Upload Document
  2. Hash Generated
  3. Blockchain Check
  4. Result Returned
- **Backend API Available** — `POST /api/documents/verify` queries Prisma database for matching document hashes.

---

### 1.7 Contract Explorer — `/explorer`

| Item | Detail |
|------|--------|
| **File** | `app/explorer/page.tsx` |
| **Purpose** | Search, browse, and inspect smart contracts on the blockchain |

**Features & Use Cases:**

- **Search Bar** — Search by contract address, name, or token symbol.
- **Contract List Panel (Left)** — Scrollable list of contracts with name, symbol, and shortened address.
- **Contract Detail Panel (Right):**
  - **Contract Address** — Full address display
  - **Transaction Count** — Number of transactions processed
  - **Holder Count** — Number of token holders
  - **Event Types** — Transfer, Approval, etc.
- **Recent Events List** — Timeline of recent contract events with type badges, from/to addresses, amounts, and timestamps.
- **"View on Etherscan" Button** — External link to view the contract on a block explorer.
- **Sample Contracts:** Uniswap (UNI), USD Coin (USDC), Dai Stablecoin (DAI).

---

### 1.8 Learning Sandbox — `/sandbox`

| Item | Detail |
|------|--------|
| **File** | `app/sandbox/page.tsx` |
| **Purpose** | Interactive blockchain transaction simulator for educational purposes |

**Features & Use Cases:**

- **5-Step Transaction Flow Simulation:**
  1. **Initiation** — User creates a transaction
  2. **Validation** — Network nodes validate the transaction
  3. **Mining** — Transaction is included in a block
  4. **Execution** — Smart contract logic executes
  5. **Confirmation** — Transaction is finalized on-chain
- **Interactive Timeline** — Click any step to jump to it, or use auto-run mode.
- **Auto-Run Mode** — Automatically progresses through all 5 steps with timed transitions.
- **Step Details Panel** — Each step shows a detailed description of what's happening.
- **"Key Concepts" Section** — Educational cards explaining: Smart Contracts, Gas Fees, State Changes, Consensus Mechanisms.

---

## 2. Dashboard Pages

All dashboard pages are protected behind the authentication flow and use the `DashboardNavbar` component.

### 2.1 Auth / Login — `/dashboard/auth`

| Item | Detail |
|------|--------|
| **File** | `app/dashboard/auth/page.tsx` |
| **Purpose** | User authentication — login, register, and wallet connection |

**Features & Use Cases:**

- **Web3 Wallet Connect** — Connect MetaMask or any injected wallet via Wagmi. Shows connected address and disconnect button.
- **Google OAuth** — "Continue with Google" button using NextAuth `signIn("google")`.
- **Email/Password Login** — Traditional credentials form with email and password fields.
- **"Remember Me" Checkbox** — Persist session preference.
- **"Forgot Password?" Link** — Placeholder for password recovery flow.
- **"Sign Up" Link** — Redirect to registration.
- **On successful login** — Redirects to `/dashboard/main`.

---

### 2.2 Main Dashboard — `/dashboard/main`

| Item | Detail |
|------|--------|
| **File** | `app/dashboard/main/page.tsx` |
| **Purpose** | Central workspace hub with overview stats and navigation to all modules |

**Features & Use Cases:**

- **Welcome Header** — Personalized greeting with wallet balance display (e.g., 2.45 ETH).
- **Quick Stats Row:**
  - Total Documents: 128
  - Verified Documents: 98%
  - Active Permissions: 24
  - Network Status: Online
- **8 Workspace Module Cards** — Quick-access tiles linking to:
  1. Documents → `/dashboard/documents`
  2. Access Control → `/dashboard/access`
  3. Approvals → `/dashboard/approvals`
  4. Audit Trail → `/dashboard/audit`
  5. Certificates → `/dashboard/certificates`
  6. Organization → `/dashboard/organization`
  7. Ownership → `/dashboard/ownership`
  8. Payments → `/dashboard/payments`
- **Recent Activity Feed** — Timeline of recent platform actions (uploads, verifications, permission grants).
- **Notifications Panel** — Alert cards for pending items.
- **Quick Actions** — Shortcut buttons for common tasks.

---

### 2.3 Document Management — `/dashboard/documents`

| Item | Detail |
|------|--------|
| **File** | `app/dashboard/documents/page.tsx` |
| **Purpose** | Upload, manage, and track documents with blockchain verification |

**Features & Use Cases:**

- **Stats Row:**
  - Total Documents count
  - Verified percentage
  - Total Storage used
  - Last Updated timestamp
- **Drag-and-Drop Upload Area** — Upload new documents with visual drop zone.
- **Category Filter** — Filter by: All, Legal, Contracts, Finance, Security.
- **Document List** — Each document shows:
  - File name, status badge (Verified/Pending), file size, upload date
  - Expandable detail section with uploader info and document hash
  - Actions: View, Download, Delete
- **Backend API Available** — `POST /api/documents/upload` creates records with SHA-256 hash and simulated blockchain metadata.

---

### 2.4 Access Control — `/dashboard/access`

| Item | Detail |
|------|--------|
| **File** | `app/dashboard/access/page.tsx` |
| **Purpose** | Manage document sharing permissions and access levels |

**Features & Use Cases:**

- **"Share New Document" Form:**
  - Document dropdown selector
  - Recipient email input
  - Permission level dropdown: View Only, Edit Access, Admin (Full Control)
  - Share button to grant access
- **Active Shares List** — Shows all current shares with:
  - Document name and recipient email
  - Permission level badge (color-coded)
  - Revoke/Delete button to remove access
- **Client-side state management** — New shares are added instantly to the list.

---

### 2.5 Approval Workflow — `/dashboard/approvals`

| Item | Detail |
|------|--------|
| **File** | `app/dashboard/approvals/page.tsx` |
| **Purpose** | Review and approve/reject pending document submissions |

**Features & Use Cases:**

- **Stats Cards:**
  - ⏳ Pending Reviews count
  - ✓ Approved count
  - ✕ Rejected count
  - 🕐 Average Review Time
- **Pending Review Queue** — Each item displays:
  - Document name and submitter
  - Submission date and description
  - Priority badge (HIGH — red, MEDIUM — yellow, LOW — green)
  - Review notes textarea for comments
- **Action Buttons per Item:**
  - ✅ **Approve** — Accept the document
  - ❌ **Reject** — Deny the document
  - 💬 **Comment** — Add review notes
- **Empty State** — "All Set! No pending reviews" when queue is clear.

---

### 2.6 Audit Trail — `/dashboard/audit`

| Item | Detail |
|------|--------|
| **File** | `app/dashboard/audit/page.tsx` |
| **Purpose** | View chronological blockchain audit log of all platform events |

**Features & Use Cases:**

- **Search & Filter Bar** — Search through audit events by keyword.
- **Export Button** — Export audit log data.
- **Vertical Timeline** — Chronological list of events with colored indicator dots.
- **Each Event Shows:**
  - Action type (e.g., Document Uploaded, Permission Granted, Contract Verified)
  - User who performed the action
  - Affected asset/document name
  - Timestamp
  - Block number
  - Transaction hash
- **Use Case** — Compliance tracking, dispute resolution, regulatory audit support.

---

### 2.7 Certificate Management — `/dashboard/certificates`

| Item | Detail |
|------|--------|
| **File** | `app/dashboard/certificates/page.tsx` |
| **Purpose** | Issue, manage, and verify digital certificates on the blockchain |

**Features & Use Cases:**

- **Stats:**
  - Total Certificates issued: 42
  - Active Certificates: 38
  - Expired Certificates: 4
- **"Issue Certificate" Button** — Start the process of creating a new certificate.
- **Certificate Cards** — Each certificate displays:
  - Title (e.g., "Compliance Certificate")
  - Recipient name
  - Issue date and expiry date
  - Blockchain hash
  - QR Code button — Generate a verifiable QR code
  - Download button — Export the certificate
- **Use Case** — Academic credentials, professional certifications, compliance records, course completions.

---

### 2.8 Organization Management — `/dashboard/organization`

| Item | Detail |
|------|--------|
| **File** | `app/dashboard/organization/page.tsx` |
| **Purpose** | Manage team members, roles, and organization settings |

**Features & Use Cases:**

- **Stats Row:**
  - Total Members
  - Active Users
  - Pending Invites
  - Storage Used
- **Invite Member** — Email input + invite button to add new team members.
- **Team Member List** — Each member shows:
  - Name, email, join date
  - Role badge: Admin (purple), Reviewer (blue), User (green)
  - Status indicator: Active / Inactive
  - Edit and Remove buttons
- **Organization Settings Section:**
  - Organization name (editable)
  - API Key display with copy-to-clipboard functionality
  - Two-Factor Authentication toggle
  - Save Settings button
- **Use Case** — Enterprise team management, role-based access control, workspace administration.

---

### 2.9 Ownership Transfers — `/dashboard/ownership`

| Item | Detail |
|------|--------|
| **File** | `app/dashboard/ownership/page.tsx` |
| **Purpose** | Track and view document/asset ownership transfer history |

**Features & Use Cases:**

- **Vertical Timeline** — Chronological log of all ownership changes.
- **Each Transfer Record Shows:**
  - Asset/document name
  - Previous owner (From)
  - New owner (To)
  - Transfer date and time
  - Transaction hash (on-chain reference)
- **Use Case** — Property title transfers, intellectual property ownership, asset provenance tracking, legal chain-of-custody.

---

### 2.10 Cross-Border Payments — `/dashboard/payments`

| Item | Detail |
|------|--------|
| **File** | `app/dashboard/payments/page.tsx` |
| **Purpose** | Send and receive cryptocurrency payments with transaction history |

**Features & Use Cases:**

- **Balance Card:**
  - Current wallet balance (e.g., 2.45 ETH)
  - USD equivalent (e.g., ≈ $6,125)
- **Quick Transfer Form:**
  - Recipient wallet address input
  - Amount input (ETH)
  - "Send" button with loading state
- **Exchange Rate Panel:**
  - Live rates for ETH, USDC, BTC (mock data)
- **Transaction History List** — Each transaction shows:
  - Direction icon (Sent ↑ / Received ↓)
  - Counterparty address
  - Amount in ETH + USD equivalent
  - Status badge: Confirmed ✅ / Pending ⏳
  - Date and time
- **Use Case** — Crypto payroll, vendor payments, cross-border transfers, freelancer payments.

---

## 3. API Routes

### 3.1 Authentication APIs

#### `POST /api/auth/login`

| Item | Detail |
|------|--------|
| **File** | `app/api/auth/login/route.ts` |
| **Purpose** | Standalone email/password login with JWT token |

- Accepts `{ email, password }` in request body.
- Looks up user in database via Prisma.
- Verifies password with `bcryptjs`.
- Handles OAuth-only users gracefully (returns descriptive error if no password set).
- Returns JWT token (7-day expiry) + user object `{ id, email, name }`.
- Sets `token` as an httpOnly cookie.
- **Env:** `JWT_SECRET`

#### `POST /api/auth/register`

| Item | Detail |
|------|--------|
| **File** | `app/api/auth/register/route.ts` |
| **Purpose** | New user registration |

- Accepts `{ email, password, name }` in request body.
- Hashes password with `bcryptjs` (10 rounds).
- Creates user in database via Prisma.
- Returns created user object.

#### `GET/POST /api/auth/[...nextauth]`

| Item | Detail |
|------|--------|
| **File** | `app/api/auth/[...nextauth]/route.ts` |
| **Purpose** | NextAuth.js authentication handler |

- **Google OAuth Provider** — Login with Google account.
- **Credentials Provider** — Email/password login with Prisma lookup + bcrypt verification.
- **PrismaAdapter** — Stores accounts, sessions, verification tokens in database.
- **JWT Strategy** — Stateless sessions using JWT.
- **Custom Sign-in Page** — Redirects to `/dashboard/auth`.
- **Callbacks:**
  - `jwt` — Adds `user.id` to token.
  - `session` — Adds `id` to `session.user`.
- **Env:** `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`

---

### 3.2 Smart Contract Generation API

#### `POST /api/contracts/generate`

| Item | Detail |
|------|--------|
| **File** | `app/api/contracts/generate/route.ts` |
| **Purpose** | Generate Solidity smart contract code from natural language |

- Accepts `{ prompt, contractType }` in request body.
- **With OpenAI key:** Calls GPT-4 with a system prompt engineered for Solidity code generation. Returns AI-generated contract + explanation.
- **Without OpenAI key:** Falls back to built-in templates (ERC-20, ERC-721, DAO) with string replacements using the user's prompt.
- Returns `{ code, explanation, contractType }`.
- **Env:** `OPENAI_API_KEY`

---

### 3.3 Security Analysis API

#### `POST /api/security/analyze`

| Item | Detail |
|------|--------|
| **File** | `app/api/security/analyze/route.ts` |
| **Purpose** | Static vulnerability analysis of Solidity smart contract code |

- Accepts `{ code }` in request body (Solidity source code).
- **8 Rule-Based Checks:**
  1. Reentrancy vulnerabilities (`.call{value:` before state changes)
  2. Integer overflow (pre-Solidity 0.8 without SafeMath)
  3. Missing address(0) validation
  4. `tx.origin` authentication (phishing risk)
  5. `block.timestamp` dependency (manipulation risk)
  6. Unchecked external calls (missing return value check)
  7. Gas optimization (public functions that could be external)
  8. Missing event emissions for state changes
- Returns `{ score, gasEstimate, issues[], summary }`.
- Score deductions: Critical −25, High −15, Medium −10, Low −5.
- Returns top 10 issues sorted by severity.

---

### 3.4 Document APIs

#### `POST /api/documents/upload`

| Item | Detail |
|------|--------|
| **File** | `app/api/documents/upload/route.ts` |
| **Purpose** | Upload a document and register it on the blockchain |

- Accepts multipart form data with file.
- Generates SHA-256 hash of file content.
- Creates Prisma `Document` record with:
  - File name, hash, size, category, uploader
  - Simulated blockchain metadata (txHash, blockNumber, chain)
- Returns document record with blockchain reference.

#### `POST /api/documents/verify`

| Item | Detail |
|------|--------|
| **File** | `app/api/documents/verify/route.ts` |
| **Purpose** | Verify document authenticity by hash or document ID |

- Accepts `{ hash }` or `{ documentId }` in request body.
- Queries Prisma for matching document record.
- Returns verification result with:
  - Verified status (true/false)
  - Document metadata (name, hash, upload date)
  - Blockchain info (txHash, blockNumber, chain)

---

### 3.5 Template API

#### `GET /api/templates`

| Item | Detail |
|------|--------|
| **File** | `app/api/templates/route.ts` |
| **Purpose** | Fetch all smart contract templates |

- Optional `?category=` query parameter for filtering.
- Returns templates ordered by rating (descending).

#### `POST /api/templates`

| Item | Detail |
|------|--------|
| **File** | `app/api/templates/route.ts` |
| **Purpose** | Create a new smart contract template |

- Accepts `{ title, description, category, code, tags }`.
- Creates Prisma `Template` record.
- Returns created template.

---

### 3.6 Dashboard Stats API

#### `GET /api/dashboard/stats`

| Item | Detail |
|------|--------|
| **File** | `app/api/dashboard/stats/route.ts` |
| **Purpose** | Aggregate dashboard statistics |

- Returns:
  - Total contracts, documents, templates count
  - Verified documents count
  - Recent contracts (latest 5)
  - Recent documents (latest 5)

---

## 4. Authentication System

The platform uses a **dual authentication architecture**:

| Method | Technology | Use Case |
|--------|-----------|----------|
| **Google OAuth** | NextAuth + Google Provider | Social login, fast onboarding |
| **Email/Password** | NextAuth Credentials + bcryptjs | Traditional login |
| **JWT Token** | jsonwebtoken (standalone API) | API authentication, cookie-based sessions |
| **Web3 Wallet** | Wagmi + MetaMask/Injected | Blockchain wallet connection |

### Authentication Flow

1. User visits `/dashboard/auth`
2. Chooses one of: Google OAuth, Email/Password, or MetaMask wallet connect
3. NextAuth handles session creation with JWT strategy
4. On success, user redirects to `/dashboard/main`
5. JWT token stored as httpOnly cookie (7-day expiry)

### Session Management

- **NextAuth sessions** — JWT-based, no server-side session storage
- **PrismaAdapter** — Stores OAuth accounts and user profiles
- **Type augmentation** — `types/next-auth.d.ts` extends Session.user with `id`

---

## 5. Database Schema

**ORM:** Prisma 5.22.0 | **Provider:** SQLite (`file:./dev.db`)

### User Model

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (UUID) | Primary key |
| `email` | String (unique) | User email address |
| `password` | String? | Hashed password (null for OAuth-only users) |
| `name` | String? | Display name |
| `emailVerified` | DateTime? | Email verification timestamp |
| `image` | String? | Profile image URL |
| `createdAt` | DateTime | Account creation date |
| `updatedAt` | DateTime | Last update date |

**Relations:** → Account[], Session[], Contract[], Document[], Template[]

### Account Model (NextAuth OAuth)

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (UUID) | Primary key |
| `userId` | String (FK) | Linked user |
| `type` | String | Account type (oauth, email) |
| `provider` | String | Provider name (google, credentials) |
| `providerAccountId` | String | Provider's user ID |
| `refresh_token` | String? | OAuth refresh token |
| `access_token` | String? | OAuth access token |
| `expires_at` | Int? | Token expiry epoch |
| `token_type` | String? | Bearer, etc. |
| `scope` | String? | OAuth scopes |
| `id_token` | String? | OIDC ID token |
| `session_state` | String? | Provider session state |

**Unique constraint:** `[provider, providerAccountId]`

### Session Model (NextAuth)

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (UUID) | Primary key |
| `sessionToken` | String (unique) | Session identifier |
| `userId` | String (FK) | Linked user |
| `expires` | DateTime | Session expiry |

### VerificationToken Model (NextAuth)

| Field | Type | Description |
|-------|------|-------------|
| `identifier` | String | Email or phone |
| `token` | String (unique) | Verification token value |
| `expires` | DateTime | Token expiry |

**Unique constraint:** `[identifier, token]`

### Contract Model

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (UUID) | Primary key |
| `name` | String | Contract name |
| `code` | String | Solidity source code |
| `type` | String | Contract type (erc20, erc721, dao, etc.) |
| `prompt` | String? | Original generation prompt |
| `securityScore` | Int? | Last security scan score |
| `userId` | String (FK) | Owner user |
| `createdAt` | DateTime | Creation date |
| `updatedAt` | DateTime | Last update |

### Document Model

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (UUID) | Primary key |
| `name` | String | File name |
| `hash` | String (unique) | SHA-256 content hash |
| `size` | String | File size |
| `status` | String | "pending" / "verified" |
| `category` | String? | Legal, Contract, Finance, Security |
| `uploadedBy` | String | Uploader name |
| `userId` | String (FK) | Owner user |
| `txHash` | String? | Blockchain transaction hash |
| `blockNumber` | Int? | Block number |
| `chain` | String? | Blockchain network |
| `createdAt` | DateTime | Upload date |
| `updatedAt` | DateTime | Last update |

### Template Model

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (UUID) | Primary key |
| `title` | String | Template title |
| `description` | String | Template description |
| `category` | String | tokens, nft, governance, defi, etc. |
| `code` | String | Solidity source code |
| `rating` | Float | Average rating (default 0) |
| `uses` | Int | Usage count (default 0) |
| `tags` | String | Comma-separated tags |
| `userId` | String? (FK) | Creator user (optional) |
| `createdAt` | DateTime | Creation date |
| `updatedAt` | DateTime | Last update |

### Seed Data

- **Demo user:** `demo@example.com` / `demo123`
- **2 templates:** ERC-20 Token Template, ERC-721 NFT Template

---

## 6. Reusable Components

### Layout Components

| Component | File | Description |
|-----------|------|-------------|
| **Navbar** | `components/navbar.tsx` | Public navigation bar — glassmorphism blur, logo, 7 nav links (Home, Smart Contracts, Templates, Security, Learning, Verify, Explorer), "Access Portal" CTA, mobile hamburger menu |
| **DashboardNavbar** | `components/dashboard-navbar.tsx` | Dashboard navigation — "Workspace" logo, settings icon, user avatar (name + email), logout button |
| **Footer** | `components/footer.tsx` | 4-column footer — Product links, Resources, Company info, social icons (GitHub, Twitter, LinkedIn, Mail), copyright notice |

### Animation & Style Components

| Component | File | Status | Description |
|-----------|------|--------|-------------|
| **AnimatedHeroSection** | `components/animated-hero-section.tsx` | Available | Floating gradient blobs + SVG grid background decoration |
| **ScrollAnimation** | `components/scroll-animations.tsx` | Available | IntersectionObserver wrapper — fade-in, slide-in-right, slide-in-left, scale-in animations with configurable delay |
| **GlassComponents** | `components/glass-components.tsx` | Available | React wrappers: `GlassDiv`, `GlassCard`, `GlassButton`, `GlassInput` with glassmorphism styles |
| **ThemeProvider** | `components/theme-provider.tsx` | Available | `next-themes` wrapper for dark/light mode switching |

### UI Component Library (shadcn/ui)

40+ pre-built components in `components/ui/`:

| Category | Components |
|----------|------------|
| **Layout** | Card, Separator, Resizable, Aspect Ratio, Scroll Area, Sidebar |
| **Forms** | Input, Textarea, Select, Checkbox, Radio Group, Switch, Slider, Calendar, Input OTP, Field, Form |
| **Buttons** | Button, Button Group, Toggle, Toggle Group |
| **Feedback** | Alert, Alert Dialog, Dialog, Drawer, Sheet, Toast, Toaster, Sonner, Progress, Spinner, Skeleton |
| **Navigation** | Tabs, Navigation Menu, Breadcrumb, Pagination, Menubar, Command, Context Menu, Dropdown Menu |
| **Data Display** | Table, Badge, Avatar, Hover Card, Tooltip, Accordion, Collapsible, Carousel, Chart, Empty |
| **Overlay** | Popover, Dialog, Drawer, Sheet |
| **Utility** | Label, Kbd, use-mobile hook, use-toast hook |

---

## 7. Libraries & Utilities

### Web3 Provider — `lib/web3-provider.tsx`

- Wraps entire app with Wagmi + React Query providers.
- **Chains configured:** Ethereum Mainnet, Sepolia Testnet, Polygon, Arbitrum.
- **Transport:** HTTP (default RPC endpoints).
- SSR-safe with client-only mounting.
- Used in root `layout.tsx` to provide wallet context app-wide.

### Utility Functions

| File | Exports | Purpose |
|------|---------|---------|
| `lib/utils.ts` | `cn()` | Class name combiner (`clsx` + `tailwind-merge`) — standard shadcn/ui utility |
| `lib/cn.ts` | `cn()`, `glassClasses` | Alternative class combiner + glass morphism class constants |
| `lib/glass-utils.ts` | `glassBase`, `glassCard`, `glassButton`, `glassInput`, `glassPill`, `glassSmall` | Glassmorphism Tailwind class string constants |

### Database Client — `lib/db/prisma.ts`

- Standard Prisma singleton pattern.
- Attaches `PrismaClient` to `globalThis` in development to prevent hot-reload connection exhaustion.
- Used by all API routes for database access.

### Global Styles — `app/globals.css`

- Dark emerald-green theme via CSS custom properties.
- CSS class definitions: `.glass`, `.glass-card`, `.glass-input`, `.glass-button` for glassmorphism effects.
- Tailwind CSS v4 with `@theme` configuration for border-radius and color tokens.

---

## 8. Configuration & Environment

### Environment Variables

| Variable | Required | Used By | Purpose |
|----------|----------|---------|---------|
| `DATABASE_URL` | ✅ | Prisma | SQLite database path (`file:./dev.db`) |
| `NEXTAUTH_SECRET` | ✅ | NextAuth | JWT/session encryption key |
| `NEXTAUTH_URL` | ✅ | NextAuth | Base URL (e.g., `http://localhost:3000`) |
| `GOOGLE_CLIENT_ID` | ✅ | NextAuth Google | Google OAuth Client ID |
| `GOOGLE_CLIENT_SECRET` | ✅ | NextAuth Google | Google OAuth Client Secret |
| `JWT_SECRET` | ⚠️ | `/api/auth/login` | JWT signing (has fallback default) |
| `OPENAI_API_KEY` | ⚠️ | `/api/contracts/generate` | OpenAI GPT-4 (falls back to templates) |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | ⚠️ | `lib/web3-provider.tsx` | WalletConnect Project ID |

### Next.js Configuration — `next.config.mjs`

| Setting | Value | Purpose |
|---------|-------|---------|
| `typescript.ignoreBuildErrors` | `true` | Skip TS errors during production build |
| `images.unoptimized` | `true` | Disable Next.js image optimization |
| `serverExternalPackages` | thread-stream, pino, @walletconnect | Exclude from server bundling |
| `transpilePackages` | @web3modal/wagmi, @walletconnect | Force ES module transpilation |
| `webpack.externals` | pino-pretty, lokijs, encoding | Exclude from webpack bundle |
| Turbopack | Enabled (Next.js 16 default) | Faster development builds |

---

## 9. Key Dependencies

| Package | Version | Category | Purpose |
|---------|---------|----------|---------|
| `next` | 16.0.10 | Framework | App Router, API routes, SSR/RSC |
| `react` / `react-dom` | 19.2.0 | Core | UI rendering engine |
| `typescript` | ^5 | Language | Static type safety |
| `tailwindcss` | ^4.1.9 | Styling | Utility-first CSS framework |
| `@prisma/client` | 5.22.0 | Database | ORM for SQLite |
| `prisma` | 5.22.0 | Database | Schema management & migrations |
| `next-auth` | ^4.24.13 | Auth | OAuth, credentials, sessions |
| `@auth/prisma-adapter` | ^2.11.1 | Auth | NextAuth ↔ Prisma bridge |
| `wagmi` | ^3.4.2 | Web3 | React hooks for Ethereum wallets |
| `viem` | ~2.45.1 | Web3 | Low-level Ethereum client |
| `@tanstack/react-query` | ^5.90.20 | Data | Async state management (Wagmi) |
| `openai` | ^6.18.0 | AI | GPT-4 smart contract generation |
| `bcryptjs` | ^3.0.3 | Security | Password hashing (10 rounds) |
| `jsonwebtoken` | ^9.0.3 | Security | JWT creation/verification |
| `lucide-react` | ^0.454.0 | Icons | SVG icon library |
| `sonner` | ^1.7.4 | UI | Toast notification system |
| `zod` | 3.25.76 | Validation | Schema validation library |
| `react-hook-form` | ^7.60.0 | Forms | Form state management |
| `recharts` | 2.15.4 | Charts | Data visualization library |
| `next-themes` | ^0.4.6 | Theming | Dark/light mode support |
| `@radix-ui/*` | various | UI | Headless component primitives (40+) |

---

## 10. Known Limitations & Notes

### Current Status

| Area | Status | Detail |
|------|--------|--------|
| Authentication | ✅ Working | Google OAuth + Email/Password + MetaMask |
| Database | ✅ Working | SQLite with seeded demo data |
| API Routes | ✅ Working | All 9 endpoints return valid responses |
| TypeScript | ✅ Clean | Zero compilation errors |
| Dev Server | ✅ Running | `localhost:3000` via Turbopack |

### Frontend → API Integration Gaps

Most dashboard pages use **hardcoded mock data** rather than calling their backend APIs:

| Page | Current State | API Available |
|------|---------------|---------------|
| Contract Generator (`/contracts/generate`) | Client-side template strings | ✅ `POST /api/contracts/generate` (OpenAI GPT-4) |
| Security Scanner (`/security`) | Hardcoded mock results | ✅ `POST /api/security/analyze` (8 rule-based checks) |
| Document Verification (`/verify`) | Hardcoded "authentic" result | ✅ `POST /api/documents/verify` (Prisma lookup) |
| Dashboard Stats (`/dashboard/main`) | Hardcoded numbers | ✅ `GET /api/dashboard/stats` (Prisma aggregation) |
| Documents (`/dashboard/documents`) | 4 mock documents | ✅ `POST /api/documents/upload` (SHA-256 + Prisma) |
| Templates (`/templates`) | 20 hardcoded templates | ✅ `GET /api/templates` (Prisma query) |

### Other Notes

- **No real blockchain transactions** — Document upload simulates txHash and blockNumber with random values. No actual on-chain deployment or transactions occur.
- **Dashboard user is hardcoded** — `DashboardNavbar` shows "Alice / alice@company.com" without reading actual NextAuth session data.
- **No auth guards on dashboard routes** — Dashboard pages are accessible without being logged in.
- **Template detail is static** — `/templates/[id]` always shows the same ERC-20 template regardless of the `id` parameter.
- **Footer links are placeholders** — All footer navigation links point to `#`.
- **Several components are defined but not imported** — `AnimatedHeroSection`, `ScrollAnimation`, `GlassComponents`, `ThemeProvider`, `glass-utils.ts` are available for future use.
