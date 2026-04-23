import { render, screen } from '@testing-library/react';
import App from './App';

test('renders profile content and sticky header source content', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: '보험컨설턴트 이희제' })).toBeInTheDocument();
  expect(screen.getAllByText('HANSSEM INTERIOR DESIGNER').length).toBeGreaterThan(0);
  expect(screen.getByRole('link', { name: '카카오톡 상담' })).toBeInTheDocument();
});
