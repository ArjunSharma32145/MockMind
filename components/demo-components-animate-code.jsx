'use client';

import {
  Code,
  CodeBlock,
  CodeHeader,
} from '@/components/animate-ui/components/animate/code';

import { Code2, File } from 'lucide-react';


export const CodeDemo = ({
  duration,
  delay,
  writing,
  cursor,
}) => {
  return (
    <Code
      key={`${duration}-${delay}-${writing}-${cursor}`}
      className="w-full sm:w-110 h-120 border-none"
      code={`import * as React from 'react';

type CodeBlockProps = {
  className?: string;
} & React.ComponentProps<'div'>;

function CodeBlock({ className, ...props }: CodeBlockProps) {
  return (
    <div className={className} {...props} style={{ background: '#09090b', border: '1px solid #27272a', borderRadius: 12, padding: 24, fontFamily: 'monospace', fontSize: 13, width: 320 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {['#ef4444', '#eab308', '#22c55e'].map(c => (
          <span key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c, display: 'block' }} />
        ))}
      </div>
  
      <p style={{ color: '#f472b6', marginTop: 8 }}>import MockMind from 'mockmind-ai';</p>
      <p style={{ color: '#60a5fa', marginTop: 8 }}>const dev = {"{ name: 'Arjun Sharma' }"};</p>
      <p style={{ color: '#facc15', marginTop: 8 }}>app.train{"({ interviews: Infinity })"}</p>
      <p style={{ color: '#a78bfa', marginTop: 8 }}>if (prepared) getLandDreamJob();</p>
      <p style={{ color: '#6b7280', marginTop: 8 }}>// MockMind — ace every interview</p>
    </div>
  );
}

export { CodeBlock, type CodeBlockProps };`}
    >
      <CodeHeader icon={Code2} copyButton>
       use mockbird-ai.jsx (Arjun Sharma)
      </CodeHeader>

      <CodeBlock
        cursor={cursor}
        lang="tsx"
        writing={writing}
        duration={duration}
        delay={delay}
      />
    </Code>
  );
};