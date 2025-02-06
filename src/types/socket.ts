export interface WebSocketMessage {
    message: string;
  }
  
export interface UseWebSocketOptions {
    onMessage?: (message: string) => void;
    onOpen?: () => void;
    onClose?: () => void;
    onError?: (error: Event) => void;
  }