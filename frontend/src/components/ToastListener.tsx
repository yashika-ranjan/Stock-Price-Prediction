// src/components/ToastListener.tsx
import { useEffect, useState } from "react";

const ToastListener = () => {
  const [messages, setMessages] = useState<{ id: number; message: string; variant: string }[]>([]);

  useEffect(() => {
    const handler = (e: any) => {
      const id = Date.now();
      const msg = { id, ...e.detail };
      setMessages((prev) => [...prev, msg]);

      setTimeout(() => {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      }, 3000);
    };

    window.addEventListener("custom-toast", handler);
    return () => window.removeEventListener("custom-toast", handler);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-[9999]">
      {messages.map(({ id, message, variant }) => (
        <div
          key={id}
          className={`px-4 py-2 text-sm rounded shadow-lg transition-opacity bg-white dark:bg-slate-800 ${
            variant === "destructive"
              ? "border-l-4 border-red-500 text-red-700 dark:text-red-300"
              : "border-l-4 border-green-500 text-green-700 dark:text-green-300"
          }`}
        >
          {message}
        </div>
      ))}
    </div>
  );
};

export default ToastListener;
