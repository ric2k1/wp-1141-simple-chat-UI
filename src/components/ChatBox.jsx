import {
  Box,
  Paper,
  Typography,
  TextField,
  Avatar
} from '@mui/material'
import { useChatBox } from '../hooks/useChatBox'

const ChatBox = ({ selectedUser }) => {
  const {
    conversations,
    messageInput,
    setMessageInput,
    messageInputRef,
    messagesEndRef,
    handleMessageSubmit,
    handleKeyPress
  } = useChatBox(selectedUser)

  return (
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
  )
}

export default ChatBox
