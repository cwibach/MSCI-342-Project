import { render, screen } from '@testing-library/react';
import {CssBaseline, ThemeProvider, Typography} from '@mui/material';
import Messaging from './index.js';
import React from 'react';
import '@testing-library/jest-dom';

describe('Messaging screen render', () => {

    function renderComponent() {
        render(
            <Messaging/>,
        );
    }

    it('displays the home text fields', () => {
        renderComponent();
        expect(screen.getByText('Communicate with other renters')).toBeInTheDocument();

    });

});
