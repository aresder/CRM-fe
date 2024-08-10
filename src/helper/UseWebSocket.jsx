import { useState, useEffect } from "react";

const useWebSocket = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Membuka koneksi WebSocket
    const ws = new WebSocket(url);
    setSocket(ws);

    ws.onopen = () => {
      setIsOpen(true);
      console.log("WebSocket Connection Opened");
    };

    ws.onmessage = (event) => {
      setData(JSON.parse(event.data)); // Asumsi data yang diterima adalah JSON
    };

    ws.onerror = (error) => {
      setError(error);
      console.error("WebSocket Error:", error);
    };

    ws.onclose = () => {
      setIsOpen(false);
      console.log("WebSocket Connection Closed");
    };

    // Fungsi cleanup saat komponen di-unmount
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [url]);

  return { data, error, isOpen, socket };
};

export default useWebSocket;
