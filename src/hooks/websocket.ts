import { useState, useEffect, useRef } from "react";
import { WebSocketMessage, UseWebSocketOptions } from "@/types/socket";
import axios from "axios";
import { Tickets } from "@/types/mongo-documents";
import { getTicket } from '@/requests/ticket-actions';

const useWebSocket = (ticketId: string | null , options?: UseWebSocketOptions) => {
  const [status, setStatus] = useState<"connecting" | "open" | "closed">("connecting");
  const [messages, setMessages] = useState<string[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const [ticket, setTicket] = useState<Tickets | null>(null)

  const fetchTicket = async() => {
    if (ticketId) {
          getTicket(Number(ticketId)).then((data) => {
            if (!data) {
              console.error("Ticket not found");
            }
            setTicket(data);
          });
        }
  }

  useEffect(() => {
    if (!ticketId) return;

    const wsUrl = `ws://localhost:8000/ws/test_status/${ticketId}/`;
    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      setStatus("open");
      options?.onOpen?.();
      fetchTicket();
    };

    socket.onmessage = (event) => {
      console.log("Raw WebSocket Message:", event.data);
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
      fetchTicket();
    };

    return () => {
      socket.close();
    };
  }, [ticketId]);

  return { status, messages, ticket };
};

export default useWebSocket;
