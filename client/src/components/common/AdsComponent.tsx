import { Paper, Typography } from '@mui/material'
import React from 'react'

interface AdsComponentProps {
    title?: string
    content?: string;
    imageUrl?: string;
}

const AdsComponent: React.FC<AdsComponentProps> = ({ title, content, imageUrl }) => {
    return (
        <Paper elevation={3} sx={{
            padding: 2, borderRadius: 2, margin: 10, textAlign: 'center', width: '75%',
            bgcolor: 'background.paper', color: 'primary.text'
        }}>
            <Typography variant="h5" component="h2" sx={{ marginBottom: 2, color: 'primary.text', fontWeight: 'bold' }}>
                {title ?? "Advertisement"}
            </Typography>
            <Typography variant="body1">
                {content ?? "You can place ads"}
            </Typography>
            {imageUrl
                ? <img src={imageUrl} alt={title}
                    style={{ objectFit: 'cover', marginBottom: 2 }} />
                : "Image Space"}
        </Paper>
    )
}


export default AdsComponent
