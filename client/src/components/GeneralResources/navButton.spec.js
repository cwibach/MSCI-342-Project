import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import NavButton from './navButton';

describe('Navbar Button Test', () => {

    function renderComponent() {
        render(
            <NavButton destination={"/"} text={"Home"} strong={false} />
        );
    }

    it('Navbar Button Text Exists', () => {
        renderComponent();
        expect(screen.getByText('Home')).toBeInTheDocument();
    });
    
});