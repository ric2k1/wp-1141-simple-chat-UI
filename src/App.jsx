import { Box } from '@mui/material'
import './App.css'
import UserList from './components/UserList'
import ChatBox from './components/ChatBox'
import { useUserList } from './hooks/useUserList'

function App() {
  const { selectedUser, handleUserSelect } = useUserList()

  return (
    <Box sx={{ height: '100vh', width: '100vw', display: 'flex' }}>
      <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
        <UserList 
          selectedUser={selectedUser} 
          onUserSelect={handleUserSelect} 
        />
        <ChatBox selectedUser={selectedUser} />
      </Box>
    </Box>
  )
}

export default App
