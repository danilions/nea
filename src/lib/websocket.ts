// src/lib/websocket.ts
// Simple WebSocket client for Supabase Realtime (demo)

export type UpdateEvent = {
  id: string;
  type: string;
  message: string;
  timestamp: number;
};

export type UpdateCallback = (event: UpdateEvent) => void;

export class WebSocketClient {
  private ws: WebSocket | null = null;
  private listeners: UpdateCallback[] = [];

  connect(url: string) {
    this.ws = new WebSocket(url);
    this.ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data && data.type && data.message) {
          this.listeners.forEach((cb) => cb(data));
        }
      } catch {}
    };
  }

  onUpdate(cb: UpdateCallback) {
    this.listeners.push(cb);
  }

  disconnect() {
    this.ws?.close();
    this.ws = null;
  }
}
