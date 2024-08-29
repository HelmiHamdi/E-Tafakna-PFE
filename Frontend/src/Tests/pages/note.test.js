// Notes.test.js
import React from 'react';
import { render, screen, fireEvent } from '@vitest/react';
import axios from 'axios';
import Notes from './Notes';

jest.mock('axios');

describe('Notes Component', () => {
  it('renders notes sidebar and main section', async () => {
    // Mock axios POST request for fetching notes data
    axios.post.mockResolvedValueOnce({ data: [{ id: 1, title: 'Test Note', body: 'This is a test note.', idLoyer: 123, lastModified: Date.now() }] });

    // Render the component
    render(<Notes />);

    // Wait for initial notes data to load
    await screen.findByText('Untitled Note');

    // Verify sidebar and main section are rendered
    expect(screen.getByText('All Notes')).toBeInTheDocument();
    expect(screen.getByText('Untitled Note')).toBeInTheDocument();

    // Simulate adding a new note
    axios.post.mockResolvedValueOnce({ data: { id: 2, title: 'New Note', body: '', idLoyer: 123, lastModified: Date.now() } });
    const addNoteButton = screen.getByText('Add Note');
    fireEvent.click(addNoteButton);
    await screen.findByText('New Note');

    // Simulate updating a note
    axios.put.mockResolvedValueOnce({});
    const updateNoteButton = screen.getByTestId('update-note-button');
    fireEvent.click(updateNoteButton);
    await screen.findByText('Note updated successfully.');

    // Simulate deleting a note
    axios.delete.mockResolvedValueOnce({});
    const deleteNoteButton = screen.getByTestId('delete-note-button');
    fireEvent.click(deleteNoteButton);
    await screen.findByText('Note deleted successfully.');

    // Verify note is removed from the sidebar
    expect(screen.queryByText('New Note')).not.toBeInTheDocument();
  });
});
