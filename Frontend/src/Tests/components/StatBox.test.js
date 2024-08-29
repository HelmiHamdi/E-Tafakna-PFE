import React from 'react';
import { render } from '@testing-library/react';
import StatBox from '../../components/StatBox/StatBox';
import { ThemeProvider } from '@mui/material/styles';
import { tokens } from '../../theme';

describe('StatBox Component', () => {
  it('renders title, subtitle, and secondSubtitle correctly', () => {
    // Mock des données pour les props du composant StatBox
    const mockProps = {
      title: 'Test Title',
      subtitle: 'Test Subtitle',
      secondSubtitle: 'Test Second Subtitle',
      icon: <div>Mock Icon</div>,
      progress: 50,
      increase: '+10%',
    };

    // Fonction utilitaire pour obtenir les couleurs du thème
    const getThemeColors = () => tokens('light'); // Remplacez 'light' par votre mode de palette actuel

    // Rendu du composant StatBox avec les props mockées
    const { getByText } = render(
      <ThemeProvider theme={{ palette: { mode: 'light' } }}>
        <StatBox {...mockProps} />
      </ThemeProvider>
    );

    // Vérification du rendu des éléments dans le composant StatBox
    expect(getByText('Test Title')).toBeInTheDocument();
    expect(getByText('Test Subtitle')).toBeInTheDocument();
    expect(getByText('Test Second Subtitle')).toBeInTheDocument();
    expect(getByText('Mock Icon')).toBeInTheDocument();
    expect(getByText('+10%')).toBeInTheDocument();

    // Exemple supplémentaire de vérification avec les couleurs du thème
    const colors = getThemeColors();
    expect(getByText('Test Subtitle')).toHaveStyle(`color: ${colors.greenAccent[500]}`);
    expect(getByText('Test Second Subtitle')).toHaveStyle(`color: ${colors.greenAccent[600]}`);
  });
});
