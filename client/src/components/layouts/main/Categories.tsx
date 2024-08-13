import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { Box, Button, Typography } from '@mui/material';
import { Category } from '../../../models/category';

const Categories = ({ categories }: { categories: Category[] }) => {
    const navigate = useNavigate();

    const handleCategoryClick = (id: number) => {
        navigate(`/category/${id}`);
    };

    const settings = {
        infinite: true,
        dots: false,
        speed: 250,
        slidesToShow: 5,
        slidesToScroll: 1,
        centerMode: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <>
            {categories && categories.length > 0 &&
                <Box sx={{ px: 5, bgcolor: 'background.default', borderBottom: 1, borderColor: 'divider' }}>
                    <Slider {...settings}>
                        {categories.map(category => (
                            <Box
                                key={category.id}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    p: 1,
                                    textAlign: 'center',
                                }}
                            >
                                <Button
                                    variant="text" 
                                    onClick={() => handleCategoryClick(category.id)}
                                    sx={{
                                        minWidth: 'auto',
                                        px: 2,
                                        py: 1,
                                        borderRadius: 2,                            
                                    }}
                                >
                                    <Typography variant="body2">{category.name}</Typography>
                                </Button>
                            </Box>
                        ))}
                    </Slider>
                </Box>
            }
        </>
    );
};

export default Categories;
