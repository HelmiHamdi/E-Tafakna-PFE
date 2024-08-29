import React from 'react'; // Importe la bibliothèque React
import { render, waitFor } from '@testing-library/react'; // Importe les fonctions render et waitFor de la bibliothèque de tests React Testing Library
import axios from 'axios'; // Importe le module Axios pour faire des requêtes HTTP
import MockAdapter from 'axios-mock-adapter'; // Importe le module MockAdapter pour mocker les requêtes Axios
import { AuthContext } from '../../context/authContext'; // Importe le contexte d'authentification
import PieChartBox from '../../components/pieChartBox/PieChartBox'; // Importe le composant PieChartBox

// Décrit le bloc de tests pour le composant PieChartBox
describe('PieChartBox Component', () => {
  // Initialisation du mock Axios pour simuler les requêtes
  const mock = new MockAdapter(axios);

  // Mock du contexte d'authentification
  const currentUser = { id: 'test_user_id' }; // Définit un utilisateur simulé
  const AuthProvider = ({ children }) => (
    <AuthContext.Provider value={{ currentUser }}>
      {children} // Fournit le contexte d'authentification aux enfants
    </AuthContext.Provider>
  );

  // Réinitialise le mock après chaque test
  afterEach(() => {
    mock.reset(); // Réinitialise les handlers des mocks Axios
  });

  // Test pour vérifier que le graphique à secteurs est correctement rendu avec des données mockées
  it('renders pie chart correctly with mock data', async () => {
    // Données de test pour simuler la réponse de l'API
    const mockData = [
      { address: 'Paris' },
      { address: 'London' },
      { address: 'New York' },
    ];

    // Mock de la requête POST
    mock.onPost('http://localhost:8800/api/link/getUsersByLoyer').reply(200, mockData);

    // Rendu du composant avec le contexte d'authentification
    const { getByText } = render(
      <AuthProvider>
        <PieChartBox />
      </AuthProvider>
    );

    // Attente de la résolution de la promesse de requête asynchrone
    await waitFor(() => {
      // Vérification du rendu des éléments dans le graphique
      expect(getByText('Paris')).toBeInTheDocument(); // Vérifie que 'Paris' est présent dans le document
      expect(getByText('London')).toBeInTheDocument(); // Vérifie que 'London' est présent dans le document
      expect(getByText('New York')).toBeInTheDocument(); // Vérifie que 'New York' est présent dans le document
    });
  });
});
