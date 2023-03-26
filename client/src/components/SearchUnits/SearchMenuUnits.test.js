import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import SearchMenuUnits from './SearchMenuUnits';

describe('Search Units Test', () => {

    function renderComponent() {
        render(
            <SearchMenuUnits/>
        );
    }

    it('Title and Reset Buttons Exist', () => {
        renderComponent();
        expect(screen.getByText('Order by:')).toBeInTheDocument();
        expect(screen.getByText('Reset Filters')).toBeInTheDocument();
    });

    it('Radio Buttons Exist', () => {
        renderComponent();
        expect(screen.getByText("Oldest to Newest")).toBeInTheDocument();
        expect(screen.getByText("Newest to Oldest")).toBeInTheDocument();
        expect(screen.getByText("Least to Most Expensive")).toBeInTheDocument();
        expect(screen.getByText("Most to Least Expensive")).toBeInTheDocument();
    });

    
});