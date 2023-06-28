import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

function Loading({isLoading}) {
  return (
    <Backdrop open={isLoading}
        sx={{
            color: '#ffffff',
            zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
    >
        <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default Loading