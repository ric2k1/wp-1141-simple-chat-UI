import { useState, useRef, useEffect } from 'react'
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemButton,
  TextField,
  Avatar,
  Chip
} from '@mui/material'
import './App.css'

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
    "期待下次見面"
  ]

  const users = ['Albert', 'Boyd', 'Carolin', 'Dave', 'Elliot']
  const conversations = {}

  users.forEach(user => {
    const messageCount = Math.floor(Math.random() * 8) + 5 // 5-12 條訊息
    const messages = []
    
    for (let i = 0; i < messageCount; i++) {
      const isUserMessage = Math.random() > 0.5 // 50% 機率是用戶的訊息
      const randomTemplate = messageTemplates[Math.floor(Math.random() * messageTemplates.length)]
      
      messages.push({
        id: i,
        text: randomTemplate,
        isUser: isUserMessage,
        timestamp: new Date(Date.now() - (messageCount - i) * 60000).toLocaleTimeString('zh-TW', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      })
    }
    
    conversations[user] = messages
  })

  return conversations
}

function App() {
  const [selectedUser, setSelectedUser] = useState('Carolin')
  const [conversations, setConversations] = useState({})
  const [messageInput, setMessageInput] = useState('')
  const messageInputRef = useRef(null)
  const messagesEndRef = useRef(null)
  
  const users = ['Albert', 'Boyd', 'Carolin', 'Dave', 'Elliot']

  // 在組件初始化時載入對話數據
  useEffect(() => {
    const randomConversations = generateRandomMessages()
    setConversations(randomConversations)
  }, [])

  // 自動滾動到最新訊息的函數
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // 當對話數據載入完成後，滾動到底部
  useEffect(() => {
    if (Object.keys(conversations).length > 0) {
      scrollToBottom()
    }
  }, [conversations])

  // 當切換用戶時，滾動到底部
  useEffect(() => {
    scrollToBottom()
  }, [selectedUser])

  // 當對話內容變化時，滾動到底部
  useEffect(() => {
    scrollToBottom()
  }, [conversations[selectedUser]])

  const handleUserSelect = (user) => {
    setSelectedUser(user)
  }

  // 處理訊息提交
  const handleMessageSubmit = () => {
    if (messageInput.trim() === '') return

    const newMessage = {
      id: Date.now(), // 使用時間戳作為唯一 ID
      text: messageInput.trim(),
      isUser: true,
      timestamp: new Date().toLocaleTimeString('zh-TW', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    }

    // 更新對話狀態
    setConversations(prev => ({
      ...prev,
      [selectedUser]: [...(prev[selectedUser] || []), newMessage]
    }))

    // 清空輸入框
    setMessageInput('')
  }

  // 處理 Enter 鍵按下
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleMessageSubmit()
    }
  }

  // 當選擇的用戶改變時，自動聚焦到訊息輸入框
  useEffect(() => {
    // 使用 setTimeout 確保 DOM 元素完全渲染
    const timer = setTimeout(() => {
      if (messageInputRef.current) {
        messageInputRef.current.focus()
      }
    }, 100)
    
    return () => clearTimeout(timer)
  }, [selectedUser])

  return (
    <Box sx={{ height: '100vh', width: '100vw', display: 'flex' }}>
      <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
        {/* 左側用戶列表 */}
        <Paper 
          elevation={3} 
          sx={{ 
            width: '300px', 
            height: '100%',
            borderRight: '1px solid #e0e0e0'
          }}
        >
          <Box 
            sx={{ 
              p: 2, 
              borderBottom: '1px solid #e0e0e0',
              backgroundColor: '#f5f5f5'
            }}
          >
            <Typography variant="h6" align="center">
              Users
            </Typography>
          </Box>
          <List sx={{ p: 0 }}>
            {users.map((user) => (
              <ListItem key={user} disablePadding>
                <ListItemButton
                  onClick={() => handleUserSelect(user)}
                  sx={{
                    backgroundColor: selectedUser === user ? '#e3f2fd' : 'transparent',
                    '&:hover': {
                      backgroundColor: selectedUser === user ? '#e3f2fd' : '#f5f5f5'
                    }
                  }}
                >
                  <Typography variant="body1">{user}</Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* 右側聊天區域 */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* 聊天標題 */}
          <Paper 
            elevation={1} 
            sx={{ 
              p: 2, 
              borderBottom: '1px solid #e0e0e0',
              backgroundColor: '#f5f5f5',
              width: '100%'
            }}
          >
            <Typography variant="h6" align="center" sx={{ width: '100%' }}>
              {selectedUser}
            </Typography>
          </Paper>

          {/* 訊息顯示區域 */}
          <Box 
            sx={{ 
              flex: 1, 
              backgroundColor: '#f8f9fa',
              overflow: 'auto',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            {conversations[selectedUser]?.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: 'flex',
                  justifyContent: message.isUser ? 'flex-end' : 'flex-start',
                  mb: 1
                }}
              >
                <Box
                  sx={{
                    maxWidth: '70%',
                    display: 'flex',
                    flexDirection: message.isUser ? 'row-reverse' : 'row',
                    alignItems: 'flex-end',
                    gap: 1
                  }}
                >
                  {/* 頭像 */}
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: message.isUser ? '#1976d2' : '#4caf50',
                      fontSize: '0.875rem'
                    }}
                  >
                    {message.isUser ? '我' : selectedUser[0]}
                  </Avatar>
                  
                  {/* 訊息氣泡 */}
                  <Box
                    sx={{
                      backgroundColor: message.isUser ? '#1976d2' : '#ffffff',
                      color: message.isUser ? '#ffffff' : '#000000',
                      borderRadius: 2,
                      px: 2,
                      py: 1,
                      boxShadow: 1,
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '50%',
                        [message.isUser ? 'right' : 'left']: '-6px',
                        transform: 'translateY(-50%)',
                        width: 0,
                        height: 0,
                        borderTop: '6px solid transparent',
                        borderBottom: '6px solid transparent',
                        [message.isUser ? 'borderLeft' : 'borderRight']: `6px solid ${message.isUser ? '#1976d2' : '#ffffff'}`
                      }
                    }}
                  >
                    <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                      {message.text}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        display: 'block',
                        opacity: 0.7,
                        mt: 0.5,
                        fontSize: '0.7rem'
                      }}
                    >
                      {message.timestamp}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
            {/* 滾動定位元素 */}
            <div ref={messagesEndRef} />
          </Box>

          {/* 訊息輸入區域 */}
          <Box 
            sx={{ 
              p: 2, 
              borderTop: '1px solid #e0e0e0',
              backgroundColor: 'white',
              width: '100%'
            }}
          >
            <TextField
              inputRef={messageInputRef}
              fullWidth
              variant="outlined"
              placeholder="輸入訊息..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default App
