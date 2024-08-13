import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Paper, AppBar, Toolbar, IconButton, TextField, Button, makeStyles, InputAdornment, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Send } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import DialogComponent from '../../components/common/DialogComponent';

interface Request {
    id: string;
    sender: {
        fullName: string;
        email: string;
    },
    subject: string;
    messages: {
        text: string;
        sender: string;
        date: string;
    }[];
    status: 'pending' | 'completed' | 'canceled' | 'inProgress';
}


const createRequest = () => {
    const requests: Request[] = [];

    const message = (text: string, sender: string, date: string) => {
        return { text, sender, date }
    }

    for (let i = 1; i < 6; i++) {
        requests.push({
            id: i.toString(),
            sender: {
                fullName: `Sender ${i}`,
                email: `sender${i}@gmail.com`,
            },
            subject: `Subject ${i}`,
            messages: [
                message('Hello', 'Admin', '13.08.24'),
                message('Hi', 'Sender', '13.08.24'),
                message('How are you?', 'Admin', '13.08.24'),
                message('I am fine', 'Sender', '13.08.24'),
                message('What can I do for you?', 'Admin', '13.08.24'),
                message('I need help', 'Sender', '13.08.24'),
                message('I am here to help you', 'Admin', '13.08.24'),
                message('Thank you', 'Sender', '13.08.24'),
            ],
            status: 'inProgress'
        });

    }
    return requests;
}




const LiveSupportPage = () => {
    const [requests, setRequests] = useState<Request[]>(createRequest());

    const [selectedRequest, setSelectedRequest] = useState<Request>();
    const [text, setText] = useState('');
    const [sending, setSending] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertText, setAlertText] = useState('');


    const handleSelectRequest = (request: any) => {
        setSelectedRequest(request);
    };

    const sendMessage = () => {
        setSending(true);
        setTimeout(() => {
            setSending(false);
            setText('');
        }, 500);

    }

    const handleCompleteRequest = (request: Request) => {
        setOpenAlert(true);
        setAlertText(`Are you sure you want to complete the request from ${request.sender.fullName}?`);
    }

    const handleConfirm = async () => {
        if (!selectedRequest) return;
        setOpenAlert(false);
        setRequests(requests.filter((request) => request.id !== selectedRequest.id));
        setSelectedRequest(undefined);
    }

    return (
        <>
            <Box sx={{ height: '80vh', backgroundColor: 'background.default' }}>
                <Grid container sx={{ height: '100%' }}>
                    <Grid item xs={12} sm={4} md={3} sx={{ backgroundColor: 'background.paper', padding: 2, height: '100%', overflowY: 'auto' }}>
                        <Typography variant="h6" gutterBottom>
                            Waiting Requests
                        </Typography>
                        <Divider />
                        <List>
                            {requests && requests.map((request) => (
                                <ListItem key={request.id} button onClick={() => handleSelectRequest(request)}
                                    sx={{
                                        backgroundColor: selectedRequest?.id === request.id ? 'primary.main' : 'background.paper',
                                        "&:hover": {
                                            backgroundColor: selectedRequest?.id === request.id ? 'primary.main' : 'divider',
                                        },
                                        color: selectedRequest?.id === request.id ? 'background.paper' : 'text.primary',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    <Typography variant="subtitle1"><b>Sender: </b> {request.sender.fullName}</Typography>
                                    <Typography variant="body2"><b>Subject: </b> {request.subject}</Typography>
                                </ListItem>
                            ))}
                            {requests.length === 0 && (
                                <ListItem>
                                    <ListItemText primary="There is no request to show right now" />
                                </ListItem>
                            )}
                        </List>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        {selectedRequest ? (
                            <>
                                <Box sx={{ backgroundColor: 'background.paper', color: 'primary.contrastText', padding: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="h6" color="textPrimary">
                                                <b>Subject:</b> {selectedRequest.subject}
                                                <br />
                                                <b>Sender:</b> {selectedRequest.sender.fullName} - {selectedRequest.sender.email}
                                            </Typography>
                                        </Box>
                                        <IconButton edge="end" color="primary" onClick={() => handleCompleteRequest(selectedRequest)}>
                                            <CheckIcon />
                                        </IconButton>
                                        <IconButton edge="end" color="error" onClick={() => setSelectedRequest(undefined)}>
                                            <CloseIcon />
                                        </IconButton>
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        padding: 2,
                                        border: '.1rem solid',
                                        borderColor: 'divider',
                                        overflowY: 'auto',
                                        flex: 1,
                                        maxHeight: 'calc(100vh - 200px)'
                                    }}>
                                    {selectedRequest.messages.map((message, index) => (
                                        <Paper
                                            key={index}
                                            sx={{
                                                padding: 2,
                                                marginBottom: 2,
                                                width: 'fit-content',
                                                backgroundColor: message.sender === 'Admin' ? 'primary.main' : 'background.paper',
                                                color: message.sender === 'Admin' ? 'background.paper' : 'text.primary',
                                                marginLeft: message.sender === 'Admin' ? 'auto' : 0,
                                            }}>
                                            <Typography variant="body1">{message.text}</Typography>
                                            <Typography variant="caption">{message.date}</Typography>
                                        </Paper>
                                    ))}
                                </Box>

                                <Box>
                                    <TextField
                                        label="Mesajınızı yazın"
                                        variant="filled"
                                        fullWidth
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        placeholder="write your message here..."
                                        autoComplete="off"
                                        sx={{ position: 'sticky', bottom: 0, zIndex: 1 }}
                                        disabled={sending}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    {sending ? 'Sending...' : ''}
                                                    <IconButton
                                                        disabled={sending}
                                                        onClick={() => sendMessage()}
                                                    >
                                                        <Send />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !sending) {
                                                sendMessage();
                                            }
                                        }}
                                    />
                                </Box>
                            </>
                        ) : (
                            <Typography variant="h6" align="center">
                                Please select a request to start conversation
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </Box>
            {openAlert && (
                <DialogComponent
                    title='Caution'
                    open={openAlert}
                    handleClose={() => setOpenAlert(false)}
                    handleConfirm={async () => await handleConfirm()}
                    text={alertText}
                />
            )}
        </>
    );
};

export default LiveSupportPage;