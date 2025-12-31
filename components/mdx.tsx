import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import remarkGfm from 'remark-gfm'
import React from 'react'
import { AccordionSection } from '@/components/mdx/accordion-section'
import { Alert } from '@/components/mdx/alert'
import { Anchor } from '@/components/mdx/anchor'
import { PerplexityLink } from '@/components/mdx/perplexity-link'
import { LatencyDemo } from '@/components/demos/latency-demo'
import { PredictionDemo } from '@/components/demos/prediction-demo'
import { InterpolationDemo } from '@/components/demos/interpolation-demo'
import type { ComponentProps } from 'react'

function CustomLink(props: ComponentProps<'a'>) {
  const href = props.href

  if (href?.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href?.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function RoundedImage(props: ComponentProps<typeof Image>) {
  // Spread props first so we don't duplicate attributes.
  return <Image {...props} alt={props.alt || ''} className="rounded-lg" />
}

function Code({ children, className, ...props }: ComponentProps<'code'>) {
  // Check if this is a code block (has className with language) or inline code
  const isBlock = className?.startsWith('language-')
  
  if (isBlock) {
    // For code blocks with language, try to highlight
    const code = String(children).replace(/\n$/, '') // Remove trailing newline
    
    // Try to detect if it's plain text/ASCII art (no language specified or empty language)
    const language = className?.replace('language-', '') ?? ''
    if (!language || language === 'text' || language === 'plaintext') {
      // Plain text/ASCII art - don't highlight, just render
      return <code className={className} {...props}>{children}</code>
    }
    
    // For code blocks with actual language, highlight
    const codeHTML = highlight(code)
    return (
      <code
        className={className}
        dangerouslySetInnerHTML={{ __html: codeHTML }}
        {...props}
      />
    )
  }
  
  // For inline code, just return as-is
  return <code className={className} {...props}>{children}</code>
}

function Pre({ children, ...props }: ComponentProps<'pre'>) {
  return <pre {...props}>{children}</pre>
}

function Table({ children, ...props }: ComponentProps<'table'>) {
  return (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full border-collapse" {...props}>
        {children}
      </table>
    </div>
  )
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

function createHeading(level: number) {
  const Heading = ({ children }: { children: React.ReactNode }) => {
    const slug = slugify(String(children))
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    )
  }

  Heading.displayName = `Heading${level}`

  return Heading
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  pre: Pre,
  code: Code,
  table: Table,
  AccordionSection,
  Alert,
  Anchor,
  PerplexityLink,
  LatencyDemo,
  PredictionDemo,
  InterpolationDemo,
}

export function CustomMDX(props: ComponentProps<typeof MDXRemote>) {
  return (
    <MDXRemote
      {...props}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      }}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
