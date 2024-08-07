import React, { useState, useRef, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Divider, Grid, IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { toast } from 'react-toastify';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

interface ImagePickerComponentProps {
    label?: string;
    fullWidth?: boolean;
    setSelectedImage?: (image: File | null) => void;
    formik?: any;
}

const ImagePickerComponent = (props: ImagePickerComponentProps) => {
    const theme = useTheme();
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (selectedImage) {
            props.setSelectedImage && props.setSelectedImage(selectedImage);
        }
    }, [selectedImage, props]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            toast.dismiss();
            const file = event.target.files[0];

            setSelectedImage(file);
            props.setSelectedImage && props.setSelectedImage(file);
            props.formik && props.formik.setFieldValue('image', file);
        }
    };

    const handleDeleteImage = () => {
        setSelectedImage(null);
        props.setSelectedImage && props.setSelectedImage(null);
        props.formik && props.formik.setFieldValue('image', null);
    };

    return (
        <>
            <Button component="label"
                variant="outlined" startIcon={<CloudUploadIcon />}
                fullWidth={props.fullWidth || true}
                style={{ borderRadius: '1rem', marginBottom: '1rem' }}
            >
                {props.label || 'Upload Image'}
                <VisuallyHiddenInput type="file"
                    onChange={handleFileChange}
                    accept=".png, .jpg, .jpeg"
                />
            </Button>
            {selectedImage && <Divider style={{ marginBottom: '1rem' }} />}
            {selectedImage && (
                <div ref={containerRef} style={{ paddingTop: "1rem", paddingBottom: "1rem", overflowX: 'auto', maxHeight: "25rem" }}>
                    <div>
                        <Grid container spacing={2} style={{ marginBottom: '1rem', paddingBottom: '1rem', }}>
                            <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                                <img src={URL.createObjectURL(selectedImage)} alt="" style={{ maxWidth: '20rem', maxHeight: '20rem', width: 'auto', height: 'auto' }} />
                            </Grid>
                            <Grid item xs={12} style={{ display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center' }}>
                                <IconButton disableRipple
                                    onClick={handleDeleteImage}
                                    style={{ color: theme.palette.error.main, cursor: 'pointer', }}>
                                    <DeleteForeverIcon />
                                    Remove
                                </IconButton>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            )}
        </>
    );
};

export default ImagePickerComponent;
