import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.dirname(__dirname)

// Map of patterns to replace
const replacements = {
  'className="([^"]*)glass-card([^"]*)"': (match, before, after) => {
    const combined = `${before} {glassCard} ${after}`.replace(/\s+/g, " ").trim()
    return `className="\${glassCard}${after}"`
  },
  'className="([^"]*)glass-button([^"]*)"': (match, before, after) => {
    return `className="\${glassButton}${after}"`
  },
  'className="([^"]*)glass-input([^"]*)"': (match, before, after) => {
    return `className="\${glassInput}${after}"`
  },
  'className="([^"]*)glass\\s+([^"]*)"': (match, before, after) => {
    return `className="\${glassSmall} ${after}"`
  },
}

function processFile(filePath) {
  if (!filePath.endsWith(".tsx")) return

  let content = fs.readFileSync(filePath, "utf8")
  let modified = false

  // Replace glass-card
  if (content.includes("glass-card")) {
    content = content.replace(/className="([^"]*)glass-card([^"]*)"/g, (match, before, after) => {
      modified = true
      const newClass = after.replace(/^\s+/, " ").trim()
      if (before.trim()) {
        return `className="${before.trim()} {glassCard} ${newClass}"`
      }
      return `className="{glassCard} ${newClass}"`
    })
  }

  // Replace glass-button
  if (content.includes("glass-button")) {
    content = content.replace(/className="([^"]*)glass-button([^"]*)"/g, (match, before, after) => {
      modified = true
      const newClass = after.replace(/^\s+/, " ").trim()
      if (before.trim()) {
        return `className="${before.trim()} {glassButton} ${newClass}"`
      }
      return `className="{glassButton} ${newClass}"`
    })
  }

  // Replace glass-input
  if (content.includes("glass-input")) {
    content = content.replace(/className="([^"]*)glass-input([^"]*)"/g, (match, before, after) => {
      modified = true
      const newClass = after.replace(/^\s+/, " ").trim()
      if (before.trim()) {
        return `className="${before.trim()} {glassInput} ${newClass}"`
      }
      return `className="{glassInput} ${newClass}"`
    })
  }

  // Replace standalone glass class
  if (content.includes('glass ') || content.includes('glass"')) {
    content = content.replace(/className="([^"]*)\bglass\b([^"]*)"/g, (match, before, after) => {
      modified = true
      const newClass = after.replace(/^\s+/, " ").trim()
      if (before.trim()) {
        return `className="${before.trim()} {glassSmall} ${newClass}"`
      }
      return `className="{glassSmall} ${newClass}"`
    })
  }

  if (modified) {
    // Add imports if not present
    if (!content.includes("import {") || !content.includes("glass")) {
      const importMatch = content.match(/import\s+{[^}]*}\s+from\s+["']@\/lib\/glass-utils["']/);
      if (!importMatch) {
        // Find the last import statement
        const lastImportMatch = content.match(/^.*import.*from.*$/gm);
        if (lastImportMatch && lastImportMatch.length > 0) {
          const lastImport = lastImportMatch[lastImportMatch.length - 1];
          const insertPos = content.indexOf(lastImport) + lastImport.length;
          content = content.slice(0, insertPos) + '\nimport { glassCard, glassButton, glassInput, glassSmall } from "@/lib/glass-utils"' + content.slice(insertPos);
        }
      }
    }

    fs.writeFileSync(filePath, content, "utf8")
    console.log(`✓ Updated: ${path.relative(projectRoot, filePath)}`)
  }
}

function walkDir(dir) {
  try {
    const files = fs.readdirSync(dir)
    for (const file of files) {
      if (file.startsWith(".") || file === "node_modules") continue
      const fullPath = path.join(dir, file)
      const stat = fs.statSync(fullPath)
      if (stat.isDirectory()) {
        walkDir(fullPath)
      } else {
        processFile(fullPath)
      }
    }
  } catch (e) {
    // skip
  }
}

console.log("🔄 Replacing glass classes...\n")
walkDir(projectRoot)
console.log("\n✅ Done!")
