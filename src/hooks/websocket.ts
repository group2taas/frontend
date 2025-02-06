import { useState, useEffect, useRef } from "react";
import { WebSocketMessage, UseWebSocketOptions } from "@/types/socket";

const useWebSocket = (ticketId: string, options?: UseWebSocketOptions) => {
  const [status, setStatus] = useState<"connecting" | "open" | "closed">("connecting");
  const [messages, setMessages] = useState<string[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!ticketId) return;

    const wsUrl = `ws://localhost:8000/ws/test_status/${ticketId}/`;
    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      setStatus("open");
      options?.onOpen?.();
    };

    socket.onmessage = (event) => {
      const data: WebSocketMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data.message]);
      options?.onMessage?.(data.message);
    };

    socket.onerror = (error) => {
      options?.onError?.(error);
    };

    socket.onclose = () => {
      setStatus("closed");
      options?.onClose?.();
    };

    return () => {
      socket.close();
    };
  }, [ticketId]);

  return { status, messages };
};

export default useWebSocket;
