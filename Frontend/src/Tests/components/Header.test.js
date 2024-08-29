import React from 'react'; // Importe la bibliothèque React
import { render } from '@testing-library/react'; // Importe la fonction render de la bibliothèque de tests React Testing Library
import Header from '../../components/Header/Header'; // Importe le composant Header depuis son emplacement

// Décrit le bloc de tests pour le composant Header
describe('Header Component', () => {
  
  // Test pour vérifier si le titre et le sous-titre sont rendus correctement
  it('renders title and subtitle correctly', () => {
    const mockTitle = 'Test Title'; // Définit une valeur de titre simulée
    const mockSubtitle = 'Test Subtitle'; // Définit une valeur de sous-titre simulée

    // Rend le composant Header avec les valeurs simulées pour le titre et le sous-titre
    const { getByText } = render(
      <Header title={mockTitle} subtitle={mockSubtitle} />
    );

    const titleElement = getByText(mockTitle); // Récupère l'élément qui contient le titre simulé
    const subtitleElement = getByText(mockSubtitle); // Récupère l'élément qui contient le sous-titre simulé

    // Vérifie que l'élément titre est bien présent dans le document
    expect(titleElement).toBeInTheDocument();
    // Vérifie que l'élément sous-titre est bien présent dans le document
    expect(subtitleElement).toBeInTheDocument();
  });
});
