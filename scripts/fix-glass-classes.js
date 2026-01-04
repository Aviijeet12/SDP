import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectRoot = path.join(__dirname, "..")

// Define replacements
const replacements = [
  // .glass-card -> glassCard utility
  {
    pattern: /className="([^"]*)\bglass-card\b([^"]*)"/g,
    replacement: (match, before, after) => {
      const classList = `${before} {glassCard} ${after}`.trim()
      return `className="${classList}"`
    },
  },
  // .glass-button -> glassButton utility
  {
    pattern: /className="([^"]*)\bglass-button\b([^"]*)"/g,
    replacement: (match, before, after) => {
      const classList = `${before} {glassButton} ${after}`.trim()
      return `className="${classList}"`
    },
  },
  // .glass-input -> glassInput utility
  {
    pattern: /className="([^"]*)\bglass-input\b([^"]*)"/g,
    replacement: (match, before, after) => {
      const classList = `${before} {glassInput} ${after}`.trim()
      return `className="${classList}"`
    },
  },
  // .glass -> glassSmall utility
  {
    pattern: /className="([^"]*)\bglass\b([^"]*)"/g,
    replacement: (match, before, after) => {
      const classList = `${before} {glassSmall} ${after}`.trim()
      return `className="${classList}"`
    },
  },
]

function processFile(filePath) {
  if (!filePath.endsWith(".tsx") && !filePath.endsWith(".ts")) return

  let content = fs.readFileSync(filePath, "utf8")
  let changed = false

  for (const { pattern, replacement } of replacements) {
    const newContent = content.replace(pattern, replacement)
    if (newContent !== content) {
      content = newContent
      changed = true
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, "utf8")
    console.log(`Fixed: ${filePath}`)
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory() && !file.startsWith(".") && file !== "node_modules") {
      walkDir(fullPath)
    } else if (stat.isFile()) {
      processFile(fullPath)
    }
  }
}

console.log("Starting glass class fixes...")
walkDir(projectRoot)
console.log("Done!")
