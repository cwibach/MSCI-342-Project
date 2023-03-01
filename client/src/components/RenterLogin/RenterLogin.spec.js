import { render, screen } from '@testing-library/react';
import RenterLogin from './index.js';
import React from 'react';
import '@testing-library/jest-dom';

describe('Renter Login Fields', () => {

    function renderComponent() {
        render(
            <RenterLogin/>,
        );
    }

    it('displays the login text fields', () => {
        renderComponent();
        expect(screen.getByText('Login as a Renter')).toBeInTheDocument();
    });

});