import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import ListofUnits from './ListUnits';

describe('Search Units Test', () => {

    function renderComponent() {
        const units = []
        const userId = 0

        render(
            <ListofUnits units={units} userId={userId}/>
        );
    }

    it('Ensure proper error text appears', () => {
        renderComponent();
        expect(screen.getByText('No Results')).toBeInTheDocument();
    });
});