'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DocsSidebar } from '@/components/docs/docs-sidebar';
import { MarkdownRenderer } from '@/components/docs/markdown-renderer';
import { docsSections } from '@/lib/docs-data';
import { Loader2, Play, CheckCircle, Terminal, Settings, Sparkles, MessageSquare, Layers } from 'lucide-react';
import { DocSkeleton, PlaygroundSkeleton } from '@/components/docs/doc-skeleton';

interface CodeBlockType {
  lang: string;
  code: string;
}

function highlightCode(code: string): React.ReactNode {
  let esc = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Match: comments, strings, numeric constants, and reserved keywords
  const tokenRegex = /(\/\/.*|\#.*)|(["'][\s\S]*?['"])|(\b\d+\b)|\b(const|let|var|function|return|await|async|try|catch|import|from|require|def|except|class|with|as|print|sys|module|exports|POST|GET|DELETE|PATCH|Authorization|Bearer|Content-Type|true|false|null)\b/g;

  const highlighted = esc.replace(tokenRegex, (match, comment, string, number, keyword) => {
    if (comment) {
      return `<span class="text-zinc-550 font-normal">${match}</span>`;
    }
    if (string) {
      return `<span class="text-amber-300">${match}</span>`;
    }
    if (number) {
      return `<span class="text-sky-400">${match}</span>`;
    }
    if (keyword) {
      if (['POST', 'GET', 'DELETE', 'PATCH', 'Authorization', 'Bearer', 'Content-Type'].includes(keyword)) {
        return `<span class="text-indigo-400 font-bold">${match}</span>`;
      }
      if (['true', 'false', 'null'].includes(keyword)) {
        return `<span class="text-emerald-455 font-bold">${match}</span>`;
      }
      return `<span class="text-indigo-400 font-semibold">${match}</span>`;
    }
    return match;
  });

  return (
    <code
      className="font-mono text-[10.5px] leading-relaxed block text-zinc-200"
      dangerouslySetInnerHTML={{ __html: highlighted }}
    />
  );
}

export default function Home() {
  const [appUrl, setAppUrl] = useState('');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const port = window.location.port;
      if (port === '3000') {
        setAppUrl('');
      } else {
        setAppUrl(`${window.location.protocol}//${window.location.hostname}:3000`);
      }
    }
  }, []);

  const [activeSectionId, setActiveSectionId] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [cleanText, setCleanText] = useState('');
  const [codeBlocks, setCodeBlocks] = useState<CodeBlockType[]>([]);
  const [editableBlocks, setEditableBlocks] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Live Playground Environment States
  const [baseUrl, setBaseUrl] = useState('https://aetherflow-api.vercel.app');
  const [workspaceId, setWorkspaceId] = useState('6a3329fedc827a13d85059fd');
  const [token, setToken] = useState('af_live_42910aef192b');
  const [showSettings, setShowSettings] = useState(false);

  // Request Runner States
  const [simulating, setSimulating] = useState(false);
  const [simulated, setSimulated] = useState(false);
  const [liveResponse, setLiveResponse] = useState('');
  const [responseStatus, setResponseStatus] = useState('');
  const [latency, setLatency] = useState(0);

  const activeSection = docsSections.find(sec => sec.id === activeSectionId) || docsSections[0];

  useEffect(() => {
    let active = true;
    setLoading(true);
    setSimulated(false);
    setSimulating(false);
    setLiveResponse('');
    setResponseStatus('');

    fetch(activeSection.filePath)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load document');
        return res.text();
      })
      .then((text) => {
        if (active) {
          // Parse code blocks dynamically
          let blocks: CodeBlockType[] = [];
          const regex = /```(\w*)\n([\s\S]*?)```/g;
          let match;
          
          while ((match = regex.exec(text)) !== null) {
            blocks.push({
              lang: match[1] || 'json',
              code: match[2].trim(),
            });
          }

          // Check if this is a POST/PUT endpoint page that separates headers (block 0) and JSON request body (block 1)
          const isPostOrPut = activeSectionId === 'auth-login' || 
                              activeSectionId === 'connections' || 
                              activeSectionId === 'web-search' || 
                              activeSectionId === 'mcp-servers' || 
                              activeSectionId === 'agent-conversation' || 
                              activeSectionId === 'workflow-run' || 
                              activeSectionId === 'webhook-trigger';

          if (isPostOrPut && blocks.length >= 2) {
            const block0 = blocks[0];
            const block1 = blocks[1];
            if (block0.lang === 'http' && block1.lang === 'json') {
              const mergedCode = `${block0.code}\n\n${block1.code}`;
              const mergedBlock: CodeBlockType = {
                lang: 'http',
                code: mergedCode
              };
              blocks = [mergedBlock, ...blocks.slice(2)];
            }
          }

          // Strip code blocks to get narrative content for the center pane
          const narrative = text.replace(/```\w*\n[\s\S]*?```/g, '').trim();

          setCleanText(narrative);
          setCodeBlocks(blocks);
          setEditableBlocks(blocks.map(b => b.code));
          setLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          setCleanText(`Failed to load document: ${err instanceof Error ? err.message : String(err)}`);
          setCodeBlocks([]);
          setEditableBlocks([]);
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [activeSection.filePath, activeSectionId]);

  const handleRunTest = async () => {
    setSimulating(true);
    setSimulated(false);
    setLiveResponse('');
    setResponseStatus('');
    setLatency(0);

    const requestText = editableBlocks[0] || '';
    
    let method = 'GET';
    let path = '';
    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    let requestBody: string | undefined = undefined;

    // Parse HTTP verb and path if explicitly defined
    const lines = requestText.trim().split('\n');
    const firstLine = lines[0].trim();
    const httpVerbRegex = /^(GET|POST|PUT|DELETE|PATCH)\s+(\S+)/i;
    const httpMatch = firstLine.match(httpVerbRegex);

    if (httpMatch) {
      method = httpMatch[1].toUpperCase();
      path = httpMatch[2];
      
      const bodyLines: string[] = [];
      let parsingHeaders = true;
      
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (parsingHeaders) {
          if (line === '') {
            parsingHeaders = false;
          } else if (line.includes(':')) {
            const colonIndex = line.indexOf(':');
            const hName = line.slice(0, colonIndex).trim();
            const hVal = line.slice(colonIndex + 1).trim();
            if (hName.toLowerCase() !== 'authorization') {
              headers[hName] = hVal;
            }
          } else {
            parsingHeaders = false;
            bodyLines.push(lines[i]);
          }
        } else {
          bodyLines.push(lines[i]);
        }
      }
      const rawBody = bodyLines.join('\n').trim();
      if (rawBody && method !== 'GET') {
        requestBody = rawBody;
      }
    } else {
      // Map routes dynamically if it is a pure JSON payload
      switch (activeSectionId) {
        case 'auth-login':
          method = 'POST';
          path = '/auth/login';
          requestBody = requestText;
          break;
        case 'connections':
          method = 'POST';
          path = '/connections/workspace/:workspaceId';
          requestBody = requestText;
          break;
        case 'get-models':
          method = 'GET';
          path = '/ai-models/unified';
          break;
        case 'get-providers':
          method = 'GET';
          path = '/providers';
          break;
        case 'get-profile':
          method = 'GET';
          path = '/users/me';
          break;
        case 'get-messages':
          method = 'GET';
          path = '/workspaces/:workspaceId/conversations/thread_881a029c/messages';
          break;
        case 'delete-thread':
          method = 'DELETE';
          path = '/workspaces/:workspaceId/conversations/thread_881a029c';
          break;
        case 'get-nodes':
          method = 'GET';
          path = '/workflow-nodes';
          break;
        case 'web-search':
          method = 'POST';
          path = '/workflow-nodes/web-search';
          requestBody = requestText;
          break;
        case 'mcp-servers':
          method = 'POST';
          path = '/mcp/workspace/:workspaceId/servers';
          requestBody = requestText;
          break;
        case 'agent-conversation':
          method = 'POST';
          path = '/chat/stream';
          requestBody = requestText;
          break;
        case 'workflow-run':
          method = 'POST';
          path = '/workspaces/:workspaceId/workflows/run';
          requestBody = requestText;
          break;
        case 'webhook-trigger':
          method = 'POST';
          path = '/workspaces/:workspaceId/webhooks/run';
          requestBody = requestText;
          break;
        default:
          method = 'GET';
          path = '/';
          break;
      }
    }

    // Resolve URL path variables
    const resolvedPath = path.replace(/:workspaceId/g, workspaceId);
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const finalUrl = `${baseUrl.replace(/\/$/, '')}${resolvedPath}`;
    const startTime = performance.now();

    try {
      const response = await fetch(finalUrl, {
        method,
        headers,
        body: method !== 'GET' ? requestBody : undefined,
      });
      
      const duration = Math.round(performance.now() - startTime);
      setLatency(duration);
      setResponseStatus(`HTTP ${response.status} ${response.statusText}`);
      
      if (resolvedPath.includes('/chat/stream') && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          accumulated += chunk;
          setLiveResponse(accumulated);
        }
      } else {
        const resText = await response.text();
        let formattedBody = resText;
        try {
          const parsedJson = JSON.parse(resText);
          formattedBody = JSON.stringify(parsedJson, null, 2);
        } catch {}
        setLiveResponse(formattedBody);
      }
      setSimulated(true);
    } catch (err) {
      const duration = Math.round(performance.now() - startTime);
      setLatency(duration);
      setResponseStatus('Network Error / CORS Blocked');
      setLiveResponse(JSON.stringify({
        error: "CORS Blocked or Server Offline",
        message: err instanceof Error ? err.message : String(err),
        tip: "Note: Live browser requests will fail if CORS rules are not open on the server. Review settings below.",
        requestDetails: {
          url: finalUrl,
          method,
          headersSent: {
            ...headers,
            Authorization: token ? `Bearer ${token.slice(0, 15)}...` : 'none'
          }
        }
      }, null, 2));
      setSimulated(true);
    } finally {
      setSimulating(false);
    }
  };

  return (
    <div className="flex h-screen bg-white text-zinc-900 overflow-hidden font-sans select-text">
      {/* Navigation Sidebar */}
      <DocsSidebar
        activeSectionId={activeSectionId}
        setActiveSectionId={setActiveSectionId}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Documentation Container */}
      <main className="flex-1 flex flex-col h-full min-w-0 bg-white">
        {/* Top Header Bar */}
        <div className="h-14 border-b border-zinc-200/80 px-8 flex items-center justify-between bg-white/70 backdrop-blur-md sticky top-0 z-40 flex-shrink-0">
          <div className="flex items-center gap-2.5 text-[10px] font-bold text-zinc-500 tracking-wider">
            <span className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider shadow-sm">AetherFlow</span>
            <span>Docs</span>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-400 uppercase tracking-widest">{activeSection.category}</span>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-800 uppercase tracking-widest">{activeSection.title}</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Quick Links Navigation */}
            <div className="flex items-center gap-2 border-r border-zinc-200 pr-4">
              <Link
                href="/playground"
                className="group flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 text-[10px] font-bold text-zinc-700 hover:text-zinc-900 shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Layers size={12} className="text-zinc-500 group-hover:text-indigo-600 transition-colors" />
                <span>Playground Page</span>
                <Sparkles size={10} className="text-indigo-500 group-hover:text-indigo-600 transition-colors animate-pulse" />
              </Link>

              <Link
                href="/playground"
                className="group flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 text-[10px] font-bold text-zinc-700 hover:text-zinc-900 shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageSquare size={12} className="text-zinc-500 group-hover:text-indigo-600 transition-colors" />
                <span>Conversations</span>
                <Sparkles size={10} className="text-indigo-500 group-hover:text-indigo-600 transition-colors animate-pulse" />
              </Link>
            </div>

            <a
              href="https://smtanimur.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-black text-zinc-650 hover:text-zinc-900 border border-zinc-200 hover:border-zinc-300 px-3 py-1.5 rounded-lg bg-zinc-50/50 hover:bg-white shadow-sm transition-all duration-200"
            >
              Developer Profile
            </a>
          </div>
        </div>

        {/* Content Pane Split */}
        <div className="flex-1 flex min-h-0 divide-x divide-zinc-200 overflow-hidden">
          {/* Middle Column: Narrative Text (Markdown) */}
          <div className="flex-1 overflow-y-auto px-8 py-10">
            <div className="max-w-2xl space-y-6">
              {/* Title Block */}
              <div className="border-b border-zinc-200 pb-5 space-y-2">
                <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight leading-none">
                  {activeSection.title}
                </h1>
                <p className="text-xs sm:text-sm text-zinc-550 leading-normal font-semibold">
                  {activeSection.subtitle}
                </p>
              </div>

              {/* Markdown Narrative / Skeleton */}
              {loading ? (
                <DocSkeleton />
              ) : (
                <MarkdownRenderer content={cleanText} />
              )}
            </div>
          </div>

          {/* Right Column: Code & Response Playground */}
          <div className="w-[460px] bg-zinc-950 border-l border-zinc-900 flex flex-col h-full flex-shrink-0 select-none overflow-hidden font-sans">
            {/* Terminal Window Header */}
            <div className="p-4 border-b border-zinc-900 flex items-center justify-between text-zinc-400 bg-zinc-900/30">
              <div className="flex items-center gap-3">
                {/* macOS Style Window Controls */}
                <div className="flex gap-1.5 items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex items-center gap-1.5 border-l border-zinc-800 pl-3">
                  <Terminal size={13} className="text-indigo-400" />
                  <span className="text-[10px] font-extrabold tracking-wider uppercase text-zinc-300">API Playground</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className={`p-1.5 rounded border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 cursor-pointer transition-colors ${
                    showSettings ? 'bg-zinc-800 text-indigo-400' : 'bg-transparent'
                  }`}
                  title="Configure Credentials"
                >
                  <Settings size={12} />
                </button>
                {codeBlocks.length > 0 && (
                  <button
                    disabled={simulating}
                    onClick={handleRunTest}
                    className="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-colors shadow"
                  >
                    {simulating ? <Loader2 size={10} className="animate-spin" /> : <Play size={10} />}
                    Run Test
                  </button>
                )}
              </div>
            </div>

            {/* Collapsible Environment Credentials Settings */}
            {showSettings && (
              <div className="p-4 border-b border-zinc-900 bg-zinc-900/20 space-y-3">
                <div className="text-[9px] font-black text-zinc-550 uppercase tracking-widest">Environment Setup</div>
                <div className="space-y-2.5">
                  <div>
                    <label className="block text-[8px] text-zinc-500 font-black uppercase mb-1">API Base URL</label>
                    <input
                      type="text"
                      value={baseUrl}
                      onChange={(e) => setBaseUrl(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-zinc-950 border border-zinc-850 rounded text-[10px] font-mono text-zinc-200 focus:outline-none focus:border-zinc-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] text-zinc-500 font-black uppercase mb-1">Workspace ID</label>
                    <input
                      type="text"
                      value={workspaceId}
                      onChange={(e) => setWorkspaceId(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-zinc-950 border border-zinc-850 rounded text-[10px] font-mono text-zinc-200 focus:outline-none focus:border-zinc-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] text-zinc-500 font-black uppercase mb-1">Workspace Integration Key (af_live_...)</label>
                    <textarea
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      rows={2}
                      className="w-full px-2.5 py-1.5 bg-zinc-950 border border-zinc-850 rounded text-[9.5px] font-mono text-zinc-200 focus:outline-none focus:border-zinc-700 resize-none leading-normal"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {loading ? (
                <PlaygroundSkeleton />
              ) : codeBlocks.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-500 text-[10px] text-center px-6 leading-relaxed">
                  <Terminal size={20} className="text-zinc-700 mb-2.5" />
                  <span>Select any developer route to view mock payloads and trigger sandbox test calls.</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {codeBlocks.map((block, idx) => {
                    const isResponse = idx > 0 || block.code.startsWith('{') && !block.code.includes('POST');
                    return (
                      <div
                        key={idx}
                        className={`space-y-1.5 rounded-lg overflow-hidden border transition-all duration-350 ${
                          isResponse && simulated ? 'border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.05)]' : 'border-zinc-800'
                        }`}
                      >
                        <div className="px-3 py-1 bg-zinc-900 border-b border-zinc-850 flex items-center justify-between text-zinc-400 text-[9px] font-bold uppercase tracking-wider">
                          <span>{isResponse ? 'RESPONSE BODY' : 'REQUEST SPECIFICATION'}</span>
                          <span>{block.lang}</span>
                        </div>
                        {idx === 0 ? (
                          <textarea
                            value={editableBlocks[idx] !== undefined ? editableBlocks[idx] : block.code}
                            onChange={(e) => {
                              const newBlocks = [...editableBlocks];
                              newBlocks[idx] = e.target.value;
                              setEditableBlocks(newBlocks);
                            }}
                            rows={Math.max(4, (editableBlocks[idx] || block.code).split('\n').length)}
                            className="w-full p-3.5 bg-zinc-900/10 text-zinc-200 font-mono text-[10.5px] leading-relaxed focus:outline-none resize-y border-0 min-h-[90px] select-text"
                          />
                        ) : (
                          <pre className="p-3.5 overflow-x-auto bg-zinc-900/40 select-text">
                            {highlightCode(isResponse && simulated && liveResponse ? liveResponse : block.code)}
                          </pre>
                        )}
                      </div>
                    );
                  })}

                  {/* Simulated Output Status Banner */}
                  {simulating && (
                    <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 font-semibold flex items-center gap-2 animate-pulse">
                      <Loader2 size={12} className="animate-spin text-indigo-400" />
                      <span>Sending network payload and waiting for server response...</span>
                    </div>
                  )}

                  {simulated && (
                    <div className={`p-3 rounded-lg border text-[10px] font-semibold flex items-start gap-2 ${
                      responseStatus.includes('200') || responseStatus.includes('201')
                        ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-400'
                        : 'bg-rose-950/20 border-rose-800/40 text-rose-400'
                    }`}>
                      <CheckCircle size={14} className={`flex-shrink-0 mt-0.5 ${
                        responseStatus.includes('200') || responseStatus.includes('201') ? 'text-emerald-500' : 'text-rose-500'
                      }`} />
                      <div>
                        <div className="font-bold">{responseStatus} ({latency}ms)</div>
                        <div className="text-[9px] font-normal mt-0.5 opacity-80">
                          {responseStatus.includes('200') || responseStatus.includes('201')
                            ? 'Request processed successfully. Data retrieved from API server.'
                            : 'Request execution completed with status notifications.'}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
