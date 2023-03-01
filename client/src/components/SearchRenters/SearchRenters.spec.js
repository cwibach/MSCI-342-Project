import { render, screen } from '@testing-library/react';
import SearchRenters from './index.js';
import React from 'react';
import '@testing-library/jest-dom';

describe('Search Renters Dropdown', () => {

    function renderComponent() {
        render(
            <SearchRenters />,
        );
    }

    it('displays the dropdown', () => {
        renderComponent();
        expect(screen.getByText('SEE RENTERS')).toBeInTheDocument();
    });

});
