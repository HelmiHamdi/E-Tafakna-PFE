// Contacts.test.js
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@vitest/react';
import axios from 'axios';
import Contacts from './Contacts';

jest.mock('axios');

describe('Contacts Component', () => {
  it('renders meetings data grid and deletes a meeting', async () => {
    // Mock axios POST request for fetching meetings data
    axios.post.mockResolvedValueOnce({ data: [{ id: 1, first_name: 'John', last_name: 'Doe', date: '2024-07-01', created_at: '2024-06-30', end_time: '12:00 PM', joinMeeting: 'https://meet.google.com/ery-fqkf-ymt' }] });

    // Render the component
    render(<Contacts />);

    // Wait for initial meetings data to load
    await waitFor(() => {
      expect(screen.getByText('MEETINGS')).toBeInTheDocument();
      expect(screen.getByText('welcome to your meeting')).toBeInTheDocument();
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Doe')).toBeInTheDocument();
      expect(screen.getByText('2024-07-01')).toBeInTheDocument();
    });

    // Mock axios DELETE request for deleting a meeting
    axios.delete.mockResolvedValueOnce({});

    // Find and click the delete button
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    // Wait for delete confirmation
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledTimes(1);
    });

    // Assert that the meeting is removed from the grid
    await waitFor(() => {
      expect(screen.queryByText('John')).not.toBeInTheDocument();
      expect(screen.queryByText('Doe')).not.toBeInTheDocument();
      expect(screen.queryByText('2024-07-01')).not.toBeInTheDocument();
    });
  });
});
