import { useState, useRef, useEffect } from 'react'
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemButton,
  TextField
} from '@mui/material'
import './App.css'

function App() {
  const [selectedUser, setSelectedUser] = useState('Carolin')
  const messageInputRef = useRef(null)
  
  const users = ['Albert', 'Boyd', 'Carolin', 'Dave', 'Elliot']

  const handleUserSelect = (user) => {
    setSelectedUser(user)
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
              backgroundColor: 'white',
              overflow: 'auto'
            }}
          >
            {/* 這裡可以放置訊息列表 */}
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
