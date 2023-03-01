import { render, screen } from '@testing-library/react';
import SearchUnits from './index.js';
import React from 'react';
import '@testing-library/jest-dom';

describe('Search Units Dropdown', () => {

    function renderComponent() {
        render(
            <SearchUnits />,
        );
    }

    it('displays the dropdown', () => {
        renderComponent();
        expect(screen.getByText('SEE UNITS')).toBeInTheDocument();
    });

});
