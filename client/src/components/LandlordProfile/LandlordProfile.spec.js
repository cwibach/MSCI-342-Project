import { render, screen } from '@testing-library/react';
import LandlordProfile from './index.js';
import React from 'react';
import '@testing-library/jest-dom';

describe('Landlord Profile Title', () => {

    function renderComponent() {
        render(
            <LandlordProfile />,
        );
    }

    it('displays the title', () => {
        renderComponent();
        expect(screen.getByText('Profile Information')).toBeInTheDocument();
    });

});
