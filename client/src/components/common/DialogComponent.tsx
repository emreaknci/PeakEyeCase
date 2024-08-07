import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

export interface DialogComponentProps {
    title?: string,
    open: any,
    handleClose: any,
    handleConfirm: any,
    text: any,
}

const DialogComponent = (props: DialogComponentProps) => {
    return (
        <Dialog open={Boolean(open)} onClose={props.handleClose}>
            <DialogTitle>{props.title ?? "Attention"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="error">
                    Cancel
                </Button>
                <Button onClick={props.handleConfirm} color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogComponent;
