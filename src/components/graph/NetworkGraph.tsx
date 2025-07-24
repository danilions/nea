import React, { useEffect, useRef, useState, useCallback } from 'react';
// SigmaRenderer and Graph will be dynamically imported client-side
import { fetchGraphDataAsync } from '../../lib/graph/service';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export interface NetworkGraphProps {
  title?: string;
  description?: string;
  initialGraph?: any;
  onNodeClick?: () => void;
}

export default function NetworkGraph({ title, description, initialGraph, onNodeClick }: NetworkGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [graph, setGraph] = useState<any>(initialGraph || null);
  const [message, setMessage] = useState<string | null>(null);
  const messageTimeoutRef = useRef<any>(null);
  const { t } = useTranslation();

  // Show user message
  const showMessage = useCallback((msg: string, duration = 3000) => {
    setMessage(msg);
    if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current);
    messageTimeoutRef.current = setTimeout(() => setMessage(null), duration);
  }, []);

  // Fetch graph if not provided
  useEffect(() => {
    let mounted = true;
    async function fetchGraph() {
      if (!graph) {
        const Graphology = (await import('graphology')).default;
        fetchGraphDataAsync().then((data) => {
      if (mounted) setGraph(data instanceof Graphology ? data : new Graphology());
        });
      }
    }
    fetchGraph();
    return () => {
      mounted = false;
      if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current);
    };
  }, [graph]);

  // Mount Sigma renderer (client-side only)
  useEffect(() => {
    let renderer: any = null;
    // ...existing code...
    async function mountSigma() {
      if (typeof window === 'undefined' || !containerRef.current || !graph) return;
      const SigmaRenderer = (await import('sigma')).default;
      containerRef.current.innerHTML = '';
      renderer = new SigmaRenderer(graph, containerRef.current, {
        renderLabels: true,
        labelColor: { color: '#BBBBBB' },
        defaultNodeColor: '#00FFFF',
        defaultEdgeColor: '#00FF00',
      });
      // Removed: unused type ClickNodeEvent
      renderer.on('clickNode', () => {
        showMessage(t('graph.nodeClicked'));
        if (onNodeClick) onNodeClick();
      });
      renderer.on('doubleClickNode', () => {
        showMessage(t('graph.nodeDoubleClicked'));
      });
      renderer.refresh();
    }
    mountSigma();
    return () => {
      if (renderer) renderer.kill();
    };
  }, [containerRef, graph, showMessage, t, onNodeClick]);

  return (
    <div className="relative w-full h-96 md:h-[500px] bg-gray-900 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
      {/* Graph container */}
      <div
        ref={containerRef}
        className="w-full h-full"
        role="region"
        aria-label={description || title || "Network Graph Visualization"}
        tabIndex={0}
      ></div>

      {/* Title for accessibility and clarity */}
      {title && (
        <h3 className="absolute top-4 left-4 text-xl font-bold text-blue-400 z-10" id="network-graph-title">
          {title}
        </h3>
      )}

      {/* User message display */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-blue-800 text-white text-sm px-4 py-2 rounded-full shadow-lg z-20"
            role="status"
            aria-live="polite"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
