import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Chatbot from '../../scenes/chatboot/chatbot';

jest.mock('axios');

describe('Chatbot Component', () => {
  it('renders chat messages and sends user message', async () => {
    // Mocking axios post request
    axios.post.mockResolvedValue({ data: { response: 'Bot response' } });

    // Render the component
    const { getByText, getByPlaceholderText } = render(<Chatbot />);

    // Wait for initial messages to load
    await waitFor(() => {
      expect(getByText('CHATBOT')).toBeInTheDocument();
      expect(getByText('assissant IA')).toBeInTheDocument();
    });

    // Type a message into the input field
    const inputField = getByPlaceholderText('Tapez votre message...');
    fireEvent.change(inputField, { target: { value: 'Hello Bot' } });

    // Send the message
    fireEvent.click(getByText('Send'));

    // Wait for the bot response to appear
    await waitFor(() => {
      expect(getByText('Bot response')).toBeInTheDocument();
    });
  });
});
