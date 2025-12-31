import fs from 'fs'

type Metadata = {
  title: string
  description: string
}

function parseFrontmatter(fileContent: string) {
  // Match: export const metadata = { ... }
  let frontmatterRegex = /^export const metadata = \{([\s\S]*?)\}\s*\n/
  let match = frontmatterRegex.exec(fileContent)
  
  if (!match) {
    return { metadata: null, content: fileContent.trim() }
  }

  let frontMatterBlock = match[1]
  let content = fileContent.replace(frontmatterRegex, '').trim()
  
  // Parse the metadata object - handle both single and double quotes, trailing commas
  let metadata: Partial<Metadata> = {}
  let titleMatch = frontMatterBlock.match(/title:\s*["']([^"']+)["']/)
  let descMatch = frontMatterBlock.match(/description:\s*["']([^"']+)["']/)
  
  if (titleMatch) metadata.title = titleMatch[1]
  if (descMatch) metadata.description = descMatch[1]

  return { 
    metadata: (metadata.title && metadata.description) ? metadata as Metadata : null, 
    content 
  }
}

export function readMDXFile(filePath: string) {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}
