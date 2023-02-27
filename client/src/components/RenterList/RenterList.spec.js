import { render, screen } from '@testing-library/react';
import RenterList from './index.js';
import React from 'react';
import '@testing-library/jest-dom';

describe('RestaurantList', () => {
    const renterList = [
        { renter_id: 1, first_name: 'Carter', last_name: 'Ibach', birthday: '4/7/2002', gender: 'M' },
        { renter_id: 2, first_name: 'Owen', last_name: 'Sellner', birthday: '2/29/2002', gender: 'M' },
    ];

    function renderComponent() {
        render(
            <RenterList
                renters={renterList}
            />,
        );
    }

    it('displays the renters', () => {
        renderComponent();
        expect(screen.getByText('Carter Ibach')).toBeInTheDocument();
        expect(screen.getByText('Owen Sellner')).toBeInTheDocument();
    });

});