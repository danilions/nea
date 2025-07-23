import React, { useEffect, useRef, useState, useCallback } from 'react';
import SigmaRenderer from 'sigma'; // Static import of SigmaRenderer
import { fetchGraphDataAsync } from '../../lib/graph/service';
import { motion, AnimatePresence } from 'framer-motion';
import Graph from 'graphology';
import { useTranslation } from 'react-i18next';

type GraphologyGraph = InstanceType<typeof Graph>;

export interface NetworkGraphProps {
  title?: string;
  description?: string;
  initialGraph?: GraphologyGraph;
  onNodeClick?: (nodeId: string) => void;
}

export default function NetworkGraph({ title, description, initialGraph, onNodeClick }: NetworkGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [graph, setGraph] = useState<GraphologyGraph | null>(initialGraph || null);
  const [message, setMessage] = useState<string | null>(null);
  const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { t } = useTranslation();

  // Show user message
  const showMessage = useCallback((msg: string, duration = 3000) => {
    setMessage(msg);
    if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current);
    messageTimeoutRef.current = setTimeout(() => setMessage(null), duration);
  }, []);

  // Fetch graph if not provided
  useEffect(() => {
    if (!graph) {
      fetchGraphDataAsync().then(setGraph);
    }
    return () => {
      if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current);
    };
  }, [graph]);

  // Mount Sigma renderer (client-side only)
  useEffect(() => {
    let renderer: SigmaRenderer | null = null;
    let isMounted = true;
    function mountSigma() {
      if (typeof window === 'undefined' || !containerRef.current || !graph) return;      
      containerRef.current.innerHTML = '';
      renderer = new SigmaRenderer(graph, containerRef.current, {
        renderLabels: true,
        labelColor: { color: '#BBBBBB' },
        defaultNodeColor: '#00FFFF',
        defaultEdgeColor: '#00FF00',
      });
      type ClickNodeEvent = { node: string };
      renderer.on('clickNode', (event: ClickNodeEvent) => {
        const { node } = event;
        showMessage(t('graph.nodeClicked', { node }));
        if (onNodeClick) onNodeClick(node);
      });
      renderer.on('doubleClickNode', (event: ClickNodeEvent) => {
        const { node } = event;
        showMessage(t('graph.nodeDoubleClicked', { node }));
      });
      renderer.refresh();
    }
    mountSigma();
    return () => {
      isMounted = false;
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
