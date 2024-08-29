import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import Client from './Client';

jest.mock('axios');

describe('Client Component', () => {
  it('renders client data grid and deletes a client', async () => {
    // Mock axios POST request for fetching client data
    axios.post.mockResolvedValueOnce({ data: [{ id: 1, first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', phone: '123456789', address: '123 Street' }] });

    // Render the component
    const { getByText } = render(<Client />);

    // Wait for initial client data to load
    await waitFor(() => {
      expect(getByText('CLIENTS')).toBeInTheDocument();
      expect(getByText('Managing the list of clients')).toBeInTheDocument();
      expect(getByText('John')).toBeInTheDocument();
      expect(getByText('Doe')).toBeInTheDocument();
      expect(getByText('john.doe@example.com')).toBeInTheDocument();
    });

    // Mock axios DELETE request for deleting a client
    axios.delete.mockResolvedValueOnce({});

    // Find and click the delete button
    const deleteButton = getByText('Delete');
    fireEvent.click(deleteButton);

    // Wait for delete confirmation
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledTimes(1);
    });

    // Assert that the client is removed from the grid
    await waitFor(() => {
      expect(getByText('John')).not.toBeInTheDocument();
      expect(getByText('Doe')).not.toBeInTheDocument();
      expect(getByText('john.doe@example.com')).not.toBeInTheDocument();
    });
  });
});
