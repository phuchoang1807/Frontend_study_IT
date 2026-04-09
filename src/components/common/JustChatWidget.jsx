import { useEffect } from 'react';

const SCRIPT_URL = 'https://cdn.jsdelivr.net/npm/@kieng/just-chat/dist/just-chat.umd.js';

const CHAT_CONFIG = {
  webhookUrl:
    'https://phuchoang1807.app.n8n.cloud/webhook-test/9f529345-bae0-4432-822c-6658888fbaef',
  themeColor: '#1E40AF',
  position: 'bottom-right',
  title: 'Chat with us',
  welcomeMessage: 'How can we help you today?',
  history: { enabled: true, clearButton: true },
};

function loadJustChatScript() {
  return new Promise((resolve, reject) => {
    if (globalThis.UniversalChatPopup?.initChatPopup) {
      resolve();
      return;
    }
    const existing = document.querySelector(`script[src="${SCRIPT_URL}"]`);
    if (existing) {
      if (globalThis.UniversalChatPopup?.initChatPopup) {
        resolve();
        return;
      }
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Không tải được just-chat')));
      return;
    }
    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Không tải được just-chat'));
    document.body.appendChild(script);
  });
}

function removeChatWidgets() {
  document.querySelectorAll('chat-widget').forEach((el) => el.remove());
}

/** Khung Chat with us — chỉ mount tại nơi dùng (UserLayout / AdminDashboard). */
export default function JustChatWidget() {
  useEffect(() => {
    let cancelled = false;
    let widget = null;

    (async () => {
      try {
        await loadJustChatScript();
        if (cancelled) return;
        removeChatWidgets();
        const api = globalThis.UniversalChatPopup;
        if (!api?.initChatPopup) return;
        widget = api.initChatPopup(CHAT_CONFIG);
      } catch (e) {
        console.error('JustChatWidget:', e);
      }
    })();

    return () => {
      cancelled = true;
      widget?.remove();
      removeChatWidgets();
    };
  }, []);

  return null;
}
