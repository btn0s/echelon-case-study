import fs from 'fs'

type Metadata = {
  title: string
  description: string
}

function parseFrontmatter(fileContent: string) {
  // Match: export const metadata = { ... }
  const frontmatterRegex = /^export const metadata = \{([\s\S]*?)\}\s*\n/
  const match = frontmatterRegex.exec(fileContent)
  
  if (!match) {
    return { metadata: null, content: fileContent.trim() }
  }

  const frontMatterBlock = match[1]
  const content = fileContent.replace(frontmatterRegex, '').trim()
  
  // Parse the metadata object - handle both single and double quotes, trailing commas
  const metadata: Partial<Metadata> = {}
  const titleMatch = frontMatterBlock.match(/title:\s*["']([^"']+)["']/)
  const descMatch = frontMatterBlock.match(/description:\s*["']([^"']+)["']/)
  
  if (titleMatch) metadata.title = titleMatch[1]
  if (descMatch) metadata.description = descMatch[1]

  return { 
    metadata: (metadata.title && metadata.description) ? metadata as Metadata : null, 
    content 
  }
}

export function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}
