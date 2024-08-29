import { render, screen, fireEvent } from 'vitest'; // Importe les fonctions nécessaires de Vitest
import '@testing-library/jest-dom'; // Importe les matchers personnalisés de Jest pour les tests DOM
import React from 'react'; // Importe la bibliothèque React
import SideBar from '../../components/contentNotes/SideBar'; // Importe le composant SideBar

// Mock du contexte d'authentification
jest.mock('../../context/authContext', () => ({
  AuthContext: {
    Consumer: ({ children }) => children({ currentUser: { id: 1 } }), // Simule le contexte d'authentification avec un utilisateur ayant l'id 1
  },
}));

// Décrit le bloc de tests pour le composant SideBar
describe('SideBar Component', () => {
  // Définition des notes de test
  const notes = [
    {
      id: 1,
      title: 'Note 1',
      body: 'Body of note 1',
      lastModified: Date.now(), // Date actuelle pour la dernière modification
    },
    {
      id: 2,
      title: 'Note 2',
      body: 'Body of note 2',
      lastModified: Date.now(), // Date actuelle pour la dernière modification
    },
  ];

  // Mock des fonctions de gestion des notes
  const onAddNote = jest.fn(); // Mock de la fonction pour ajouter une note
  const onDeleteNote = jest.fn(); // Mock de la fonction pour supprimer une note
  const setActiveNote = jest.fn(); // Mock de la fonction pour définir la note active

  // Test pour vérifier que les notes sont rendues correctement
  test('renders notes correctly', () => {
    render(
      <SideBar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={null}
        setActiveNote={setActiveNote}
      />
    );

    // Vérifie que les titres des notes sont affichés
    expect(screen.getByText('Note 1')).toBeInTheDocument();
    expect(screen.getByText('Note 2')).toBeInTheDocument();
  });

  // Test pour vérifier que la fonction onAddNote est appelée lors du clic sur le bouton d'ajout
  test('calls onAddNote when add button is clicked', () => {
    render(
      <SideBar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={null}
        setActiveNote={setActiveNote}
      />
    );

    fireEvent.click(screen.getByText('Add Note')); // Simule un clic sur le bouton "Add Note"
    expect(onAddNote).toHaveBeenCalledTimes(1); // Vérifie que la fonction onAddNote a été appelée une fois
  });

  // Test pour vérifier que la fonction onDeleteNote est appelée lors de la confirmation de suppression
  test('calls onDeleteNote when delete button is confirmed', () => {
    render(
      <SideBar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={null}
        setActiveNote={setActiveNote}
      />
    );

    fireEvent.click(screen.getByText('Delete')); // Simule un clic sur le bouton "Delete"
    expect(onDeleteNote).toHaveBeenCalledTimes(1); // Vérifie que la fonction onDeleteNote a été appelée une fois
  });

  // Ajoutez d'autres tests selon vos besoins pour tester d'autres interactions ou comportements du composant SideBar
});
