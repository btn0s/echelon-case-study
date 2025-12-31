import { CustomMDX } from '@/components/mdx'
import { readMDXFile } from '@/lib/mdx-utils'
import path from 'path'

export async function generateMetadata() {
  const filePath = path.join(process.cwd(), 'app/poc/5-economy/page.mdx')
  const { metadata } = readMDXFile(filePath)
  return metadata || {
    title: 'Untitled',
    description: '',
  }
}

export default function Page() {
  const filePath = path.join(process.cwd(), 'app/poc/5-economy/page.mdx')
  const { content } = readMDXFile(filePath)
  
  return <CustomMDX source={content} />
}
