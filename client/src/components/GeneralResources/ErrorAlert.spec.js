import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import ErrorAlert from './alert';

describe('Error Alert Test', () => {

    const alertVisible = true;
    const alertMessage = "Error Message";
    const setAlertVisible = () => {}

    function renderComponent() {
        render(
            <ErrorAlert alertVisible={alertVisible} alertMessage={alertMessage} setAlertVisible={setAlertVisible} />
        );
    }

    it('Error Message Exists', () => {
        renderComponent();
        expect(screen.getByText('Error Message')).toBeInTheDocument();
    });
    
});