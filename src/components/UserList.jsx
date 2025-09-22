import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemButton
} from '@mui/material'
import { useUserList } from '../hooks/useUserList'

const UserList = ({ selectedUser, onUserSelect }) => {
  const { users } = useUserList()

  return (
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
              onClick={() => onUserSelect(user)}
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
  )
}

export default UserList
