'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Bot, 
  Send, 
  Settings, 
  RefreshCw, 
  Loader2, 
  ChevronLeft,
  Flame,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export default function PlaygroundPage() {
  const [workspaceId, setWorkspaceId] = useState('6a3329fedc827a13d85059fd');
  const [agentId, setAgentId] = useState('6a336cf10849c7a4f5de4353');
  const [conversationId, setConversationId] = useState('6a3754210a3ca41735e03f56');
  const [token, setToken] = useState('af_live_42910aef192b');
  const [baseUrl, setBaseUrl] = useState('https://aetherflow-api.vercel.app');

  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Welcome to AetherFlow Interactive Playground! Configure your Integration Key and session parameters, then send a message to start conversing with your live agent.' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingHistory, setFetchingHistory] = useState(false);
  const [streamText, setStreamText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamText]);

  // Load conversation history from backend
  const handleLoadHistory = async () => {
    if (!workspaceId || !conversationId) {
      toast.error('Workspace ID and Conversation ID are required to load history');
      return;
    }

    setFetchingHistory(true);
    try {
      const targetUrl = `${baseUrl.replace(/\/$/, '')}/workspaces/${workspaceId}/conversations/${conversationId}/messages`;
      const res = await fetch(targetUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      // Handle wrapped paginated array or direct array
      const rawList = Array.isArray(data) ? data : (data.docs || data.messages || []);
      const formattedList: Message[] = rawList
        .map((m: any) => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: m.content || '',
          timestamp: m.createdAt || m.timestamp
        }))
        .reverse(); // backend typically returns newest first

      if (formattedList.length > 0) {
        setMessages(formattedList);
        toast.success(`Successfully loaded ${formattedList.length} messages.`);
      } else {
        setMessages([
          { role: 'assistant', content: 'This conversation thread is empty. Start typing below to begin.' }
        ]);
        toast.info('No messages found in this thread.');
      }
    } catch (err: any) {
      toast.error(`Failed to load history: ${err.message}`);
    } finally {
      setFetchingHistory(false);
    }
  };

  // Send message with live SSE streaming
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    if (!token) {
      toast.error('Workspace Integration Key is required to send messages');
      return;
    }

    const userMsg = inputMessage.trim();
    setInputMessage('');
    
    // Add user message to thread
    const updatedMessages = [...messages, { role: 'user', content: userMsg } as Message];
    setMessages(updatedMessages);
    setLoading(true);
    setStreamText('');

    try {
      const targetUrl = `${baseUrl.replace(/\/$/, '')}/chat/stream`;
      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
          agent_id: agentId || undefined,
          workspace_id: workspaceId || undefined,
          conversation_id: conversationId || undefined
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      if (!response.body) {
        throw new Error('ReadableStream not supported on this response');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        assistantResponse += chunk;
        setStreamText(assistantResponse);
      }

      // Commit finalized streaming message
      setMessages(prev => [...prev, { role: 'assistant', content: assistantResponse }]);
      setStreamText('');
    } catch (err: any) {
      toast.error(`Streaming error: ${err.message}`);
      setMessages(prev => [...prev, { role: 'assistant', content: `⚠️ Error streaming response: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-zinc-100 overflow-hidden font-sans select-text">
      {/* Top Header Bar */}
      <header className="h-14 border-b border-zinc-900 px-8 flex items-center justify-between bg-zinc-900/30 backdrop-blur-md z-45 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <ChevronLeft size={16} className="text-zinc-400 group-hover:text-white transition-colors" />
            <span className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors">Back to Docs</span>
          </Link>
          <span className="text-zinc-700">|</span>
          <div className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider shadow">Playground</span>
            <span className="text-[10px] font-bold text-zinc-400">Agent Conversation Client</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://smtanimur.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-black text-zinc-400 hover:text-white border border-zinc-900 hover:border-zinc-800 px-3 py-1.5 rounded-lg bg-zinc-950 shadow-sm transition-all duration-200"
          >
            Developer Profile
          </a>
        </div>
      </header>

      {/* Main Container Split Layout */}
      <div className="flex-1 flex min-h-0 overflow-hidden divide-x divide-zinc-900">
        {/* Left Column: Configuration inputs */}
        <aside className="w-80 p-6 bg-zinc-900/20 overflow-y-auto space-y-6 flex-shrink-0">
          <div className="space-y-1">
            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
              <Settings size={12} className="text-indigo-400" />
              Session Config
            </h3>
            <p className="text-[10px] text-zinc-500 leading-normal">
              Setup credentials to communicate directly with your local or live orchestrator API.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[8px] text-zinc-500 font-black uppercase mb-1">API Base URL</label>
              <input
                type="text"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-zinc-950 border border-zinc-850 rounded-lg text-[10px] font-mono text-zinc-200 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-800"
              />
            </div>

            <div>
              <label className="block text-[8px] text-zinc-500 font-black uppercase mb-1">Workspace ID</label>
              <input
                type="text"
                value={workspaceId}
                onChange={(e) => setWorkspaceId(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-zinc-950 border border-zinc-850 rounded-lg text-[10px] font-mono text-zinc-200 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-800"
              />
            </div>

            <div>
              <label className="block text-[8px] text-zinc-500 font-black uppercase mb-1">Agent / Workflow ID</label>
              <input
                type="text"
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-zinc-950 border border-zinc-850 rounded-lg text-[10px] font-mono text-zinc-200 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-800"
              />
            </div>

            <div>
              <label className="block text-[8px] text-zinc-500 font-black uppercase mb-1">Conversation ID (Thread)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={conversationId}
                  onChange={(e) => setConversationId(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-zinc-950 border border-zinc-850 rounded-lg text-[10px] font-mono text-zinc-200 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-800"
                  placeholder="e.g. thread_123"
                />
                <button
                  type="button"
                  onClick={handleLoadHistory}
                  disabled={fetchingHistory || !conversationId}
                  className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-750 text-zinc-300 hover:text-white border border-zinc-800 flex items-center justify-center cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Load chat history"
                >
                  {fetchingHistory ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[8px] text-zinc-500 font-black uppercase mb-1">Integration Key (af_live_...)</label>
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-zinc-950 border border-zinc-850 rounded-lg text-[10px] font-mono text-zinc-200 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-800"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-900 space-y-2">
            <div className="p-3 bg-zinc-900/40 rounded-lg border border-zinc-850/60 text-[9px] text-zinc-400 leading-relaxed flex gap-2">
              <AlertCircle size={14} className="text-zinc-500 flex-shrink-0 mt-0.5" />
              <span>
                Make sure your backend server is online. Requests will route to AetherFlow's APIs same-origin rewriting pathways seamlessly.
              </span>
            </div>
          </div>
        </aside>

        {/* Right Column: Chat window interface */}
        <section className="flex-1 flex flex-col h-full bg-zinc-950 overflow-hidden relative">
          {/* Agent Identity Bar */}
          <div className="px-6 py-3 bg-zinc-900/10 border-b border-zinc-900 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-950/65 border border-indigo-900 flex items-center justify-center text-indigo-400">
                <Bot size={16} />
              </div>
              <div>
                <div className="text-[11px] font-bold text-zinc-200">AetherFlow Agent</div>
                <div className="text-[8px] text-zinc-500 font-black uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  Active Stream Node
                </div>
              </div>
            </div>
          </div>

          {/* Messages Thread list */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex gap-3 max-w-2xl ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 border ${
                  msg.role === 'user' 
                    ? 'bg-zinc-800 border-zinc-700 text-zinc-300' 
                    : 'bg-indigo-950/65 border-indigo-900 text-indigo-400'
                }`}>
                  {msg.role === 'user' ? 'U' : <Bot size={12} />}
                </div>
                <div className={`p-3.5 rounded-2xl text-[11.5px] leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none font-medium' 
                    : 'bg-zinc-900 border border-zinc-850/70 text-zinc-200 rounded-tl-none'
                }`}>
                  <p className="whitespace-pre-wrap select-text">{msg.content}</p>
                </div>
              </div>
            ))}

            {/* SSE Stream token loader bubble */}
            {streamText && (
              <div className="flex gap-3 max-w-2xl">
                <div className="w-6 h-6 rounded-full bg-indigo-950/65 border border-indigo-900 flex items-center justify-center text-indigo-400 flex-shrink-0">
                  <Bot size={12} />
                </div>
                <div className="p-3.5 rounded-2xl text-[11.5px] leading-relaxed bg-zinc-900 border border-zinc-850/70 text-zinc-200 rounded-tl-none shadow-sm animate-pulse">
                  <p className="whitespace-pre-wrap select-text">{streamText}</p>
                </div>
              </div>
            )}

            {/* Waiting for response stream start */}
            {loading && !streamText && (
              <div className="flex gap-3 items-center text-[10px] text-zinc-500 font-semibold pl-9">
                <Loader2 size={12} className="animate-spin text-indigo-400" />
                <span>Connecting to streaming node...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Interactive Chat Form Input Box */}
          <div className="p-5 border-t border-zinc-900 bg-zinc-950/50 flex-shrink-0">
            <form onSubmit={handleSendMessage} className="relative flex items-center">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask your agent anything..."
                disabled={loading}
                className="w-full pl-4 pr-12 py-3 bg-zinc-900 border border-zinc-850 rounded-xl text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-800 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || !inputMessage.trim()}
                className="absolute right-2 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-850 text-white disabled:text-zinc-500 cursor-pointer disabled:cursor-default flex items-center justify-center transition-colors shadow"
              >
                <Send size={12} />
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
