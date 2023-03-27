import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import SuccessAlert from './alert';

describe('Success Alert Test', () => {

    const alertVisible = true;
    const alertMessage = "Success Message";
    const setAlertVisible = () => {}

    function renderComponent() {
        render(
            <SuccessAlert alertVisible={alertVisible} alertMessage={alertMessage} setAlertVisible={setAlertVisible} />
        );
    }

    it('Success Message Exists', () => {
        renderComponent();
        expect(screen.getByText('Success Message')).toBeInTheDocument();
    });
    
});