import React from 'react';
import { render } from '@testing-library/react';
import Bar from '../../scenes/bar/index';

describe('Bar Component', () => {
  it('renders header and bar chart correctly', () => {
    const { getByText } = render(<Bar />);

    // Vérification du rendu du titre et du sous-titre dans le Header
    expect(getByText('Bar Chart')).toBeInTheDocument();
    expect(getByText('Simple Bar Chart')).toBeInTheDocument();

    // Vérification du rendu du composant BarChart (peut être plus spécifique selon les besoins)
    // Ici, nous pourrions vérifier la présence d'un élément spécifique du BarChart s'il est identifiable
    // Par exemple :
    // expect(getByTestId('bar-chart-element')).toBeInTheDocument();
  });
});
