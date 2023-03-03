import { render, screen } from '@testing-library/react';
import Home from './index.js';
import React from 'react';
import '@testing-library/jest-dom';

describe('Home Button Text', () => {

    function renderComponent() {
        render(
            <Home/>,
        );
    }

    it('displays the home text fields', () => {
        renderComponent();
        expect(screen.getByText('Landlord')).toBeInTheDocument();
        expect(screen.getByText('Renter')).toBeInTheDocument();

    });

});