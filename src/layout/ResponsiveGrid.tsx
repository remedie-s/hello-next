import { Grid2 } from '@mui/material';
import React from 'react';

const ResponsiveGrid = ({ children }:any) => {
    return (
        <Grid2 container spacing={2}>
            {React.Children.map(children, (child) => (
                <Grid2 item xs={12} sm={6} md={3}>
                    {child}
                </Grid2>
            ))}
        </Grid2>
    );
};

export default ResponsiveGrid;