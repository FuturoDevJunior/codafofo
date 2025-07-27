import { describe, expect, it } from 'vitest';

import { render, screen } from '@testing-library/react';

import { Select, SelectContent, SelectItem, SelectTrigger } from './select';

describe('Select UI', () => {
  it('renderiza Select e permite selecionar item', async () => {
    render(
      <Select>
        <SelectTrigger>Selecione</SelectTrigger>
        <SelectContent>
          <SelectItem value='a'>A</SelectItem>
          <SelectItem value='b'>B</SelectItem>
        </SelectContent>
      </Select>
    );
    expect(screen.getByText('Selecione')).toBeInTheDocument();
  });
});
