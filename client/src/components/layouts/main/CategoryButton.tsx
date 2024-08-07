import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { CustomThemeContext } from '../../../contexts/CustomThemeContext';
import { useNavigate } from 'react-router-dom';

export interface CategoryButtonProps {
    name: string;
    id: number;
}

const CategoryButton = (props: CategoryButtonProps) => {
    const themeContext = useContext(CustomThemeContext);
    const navigate = useNavigate()

    return (
        <Button size="small" variant="contained"
            onClick={() => navigate(`/category/${props.id}`)}
            sx={{
                bgcolor: themeContext.theme ? "#1b1e34" : "#f6f8ff",
                color: themeContext.theme ? "#4561e2" : "#4B6BFB",
                '&:hover': {
                    bgcolor: themeContext.theme ? "#1b1e34" : "#f6f8ff",
                },
                borderRadius: 2
            }}>
            {props.name}
        </Button>
    )
}

export default CategoryButton