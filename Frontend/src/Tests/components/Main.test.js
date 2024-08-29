// src/components/Main.test.js

// Importation des fonctions nécessaires depuis la bibliothèque de test
import { render, screen, fireEvent } from '@testing-library/react';
// Importation des extensions Jest pour les assertions DOM
import '@testing-library/jest-dom';
// Importation de React pour pouvoir utiliser JSX
import React from 'react';
// Importation du composant Main à tester
import Main from '../../components/contentNotes/Main';

// Mock de ReactMarkdown car ce n'est pas nécessaire de tester son fonctionnement ici
jest.mock('react-markdown', () => (props) => <div>{props.children}</div>);

describe('Main Component', () => {
  // Définition d'une note active fictive pour les tests
  const activeNote = {
    title: 'Test Title',
    body: 'Test Body',
    lastModified: Date.now(),
  };

  // Création d'une fonction mock pour onUpdateNote
  const onUpdateNote = jest.fn();

  // Teste l'affichage du message "No note selected" lorsque aucune note active n'est présente
  test('displays "No note selected" when no active note is present', () => {
    // Rendu du composant Main avec activeNote défini à null
    render(<Main activeNote={null} onUpdateNote={onUpdateNote} />);
    // Vérification que le texte "No note selected" est bien présent dans le document
    expect(screen.getByText(/no note selected/i)).toBeInTheDocument();
  });

  // Teste que le titre et le corps de la note sont rendus correctement
  test('renders the note title and body correctly', () => {
    // Rendu du composant Main avec une note active
    render(<Main activeNote={activeNote} onUpdateNote={onUpdateNote} />);
    // Vérification que le titre de la note est bien présent dans le document
    expect(screen.getByDisplayValue(activeNote.title)).toBeInTheDocument();
    // Vérification que le corps de la note est bien présent dans le document
    expect(screen.getByDisplayValue(activeNote.body)).toBeInTheDocument();
  });

  // Teste l'appel à onUpdateNote avec le titre mis à jour lors du changement de titre
  test('calls onUpdateNote with updated title on title change', () => {
    // Rendu du composant Main avec une note active
    render(<Main activeNote={activeNote} onUpdateNote={onUpdateNote} />);
    const newTitle = 'Updated Title';
    // Simulation d'un changement de titre
    fireEvent.change(screen.getByDisplayValue(activeNote.title), {
      target: { value: newTitle },
    });
    // Vérification que la fonction onUpdateNote a été appelée avec les nouvelles valeurs
    expect(onUpdateNote).toHaveBeenCalledWith({
      ...activeNote,
      title: newTitle,
      lastModified: expect.any(Number),
    });
  });

  // Teste l'appel à onUpdateNote avec le corps mis à jour lors du changement de corps
  test('calls onUpdateNote with updated body on body change', () => {
    // Rendu du composant Main avec une note active
    render(<Main activeNote={activeNote} onUpdateNote={onUpdateNote} />);
    const newBody = 'Updated Body';
    // Simulation d'un changement de corps
    fireEvent.change(screen.getByDisplayValue(activeNote.body), {
      target: { value: newBody },
    });
    // Vérification que la fonction onUpdateNote a été appelée avec les nouvelles valeurs
    expect(onUpdateNote).toHaveBeenCalledWith({
      ...activeNote,
      body: newBody,
      lastModified: expect.any(Number),
    });
  });
});
