import { useState, useRef, useEffect } from "react";

// 隨機對話內容數據
const generateRandomMessages = () => {
  const messageTemplates = [
    "你好！今天過得怎麼樣？",
    "我剛完成了一個很棒的專案！",
    "天氣真不錯，要不要出去走走？",
    "你看到昨天的新聞了嗎？",
    "我正在學習新的技術，感覺很有趣",
    "今天工作很忙，但很有成就感",
    "你有什麼推薦的電影嗎？",
    "我剛嘗試了新的餐廳，味道很棒！",
    "週末有什麼計劃嗎？",
    "這個想法聽起來很不錯！",
    "我需要一些建議，你有時間嗎？",
    "恭喜你！這真是個好消息",
    "我同意你的觀點",
    "讓我們一起努力吧！",
    "謝謝你的幫助！",
    "沒問題，我很樂意幫忙",
    "這個問題確實需要仔細考慮",
    "我對這個話題很感興趣",
    "讓我們保持聯繫！",
    "期待下次見面",
  ];

  const users = ["Albert", "Boyd", "Carolin", "Dave", "Elliot"];
  const conversations = {};

  users.forEach((user) => {
    const messageCount = Math.floor(Math.random() * 8) + 5; // 5-12 條訊息
    const messages = [];

    for (let i = 0; i < messageCount; i++) {
      const isUserMessage = Math.random() > 0.5; // 50% 機率是用戶的訊息
      const randomTemplate =
        messageTemplates[Math.floor(Math.random() * messageTemplates.length)];

      messages.push({
        id: i,
        text: randomTemplate,
        isUser: isUserMessage,
        timestamp: new Date(
          Date.now() - (messageCount - i) * 60000
        ).toLocaleTimeString("zh-TW", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    }

    conversations[user] = messages;
  });

  return conversations;
};

export const useChatBox = (selectedUser) => {
  const [conversations, setConversations] = useState({});
  const [messageInput, setMessageInput] = useState("");
  const messageInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // 在組件初始化時載入對話數據
  useEffect(() => {
    const randomConversations = generateRandomMessages();
    setConversations(randomConversations);
  }, []);

  // 自動滾動到最新訊息的函數
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 當對話數據載入完成後，滾動到底部
  useEffect(() => {
    if (Object.keys(conversations).length > 0) {
      scrollToBottom();
    }
  }, [conversations]);

  // 當切換用戶時，滾動到底部
  useEffect(() => {
    scrollToBottom();
  }, [selectedUser]);

  // 當對話內容變化時，滾動到底部
  useEffect(() => {
    scrollToBottom();
  }, [conversations[selectedUser]]);

  // 處理訊息提交
  const handleMessageSubmit = () => {
    if (messageInput.trim() === "") return;

    const newMessage = {
      id: Date.now(), // 使用時間戳作為唯一 ID
      text: messageInput.trim(),
      isUser: true,
      timestamp: new Date().toLocaleTimeString("zh-TW", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // 更新對話狀態
    setConversations((prev) => ({
      ...prev,
      [selectedUser]: [...(prev[selectedUser] || []), newMessage],
    }));

    // 清空輸入框
    setMessageInput("");
  };

  // 處理 Enter 鍵按下
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleMessageSubmit();
    }
  };

  // 當選擇的用戶改變時，自動聚焦到訊息輸入框
  useEffect(() => {
    // 使用 setTimeout 確保 DOM 元素完全渲染
    const timer = setTimeout(() => {
      if (messageInputRef.current) {
        messageInputRef.current.focus();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [selectedUser]);

  return {
    conversations,
    messageInput,
    setMessageInput,
    messageInputRef,
    messagesEndRef,
    handleMessageSubmit,
    handleKeyPress,
  };
};
