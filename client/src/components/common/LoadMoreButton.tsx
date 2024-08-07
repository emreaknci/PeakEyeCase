import { Button, useTheme } from '@mui/material'
import React from 'react'

const LoadMoreButton = () => {
    const theme = useTheme();

    return (
        <Button variant='outlined' sx={{
            bgcolor: "transparent", color: theme.palette.text.primary,
            border: `1px solid ${theme.palette.divider}`,
            '&:hover': {
                border: `1px solid ${theme.palette.divider}`,
            }
        }} >
            Load More
        </Button>
    )
}

export default LoadMoreButton