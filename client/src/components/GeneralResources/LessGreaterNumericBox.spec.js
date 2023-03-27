import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import LessGreaterNumericBox from './LessGreaterNumericBox';

describe('LessGreaterNumericBox Test', () => {

    function renderComponent() {
        render(
            <LessGreaterNumericBox minValue={0} maxValue={100} minChange={() => {}} maxChange={() => {}} 
            minLabel={"Minimum # of Rooms"} maxLabel={"Maximum # of Rooms"} centreLabel={"Beds"} icon={""} />
        );
    }

    it('Titles Exist', () => {
        renderComponent();
        expect(screen.getByText('Minimum # of Rooms')).toBeInTheDocument();
        expect(screen.getByText('Maximum # of Rooms')).toBeInTheDocument();
        expect(screen.getByText('Beds')).toBeInTheDocument();
    });
    
});