import React from 'react';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { render, screen } from '@testing-library/react';
import ORASCLI from '../index.jsx';
import versions from '../../../../versions.json';

jest.mock('@docusaurus/Link', () => ({ __esModule: true, default: ({ children }) => <a>{children}</a> }), { virtual: true });
jest.mock('@theme/Tabs', () => ({ __esModule: true, default: ({ children }) => <div>{children}</div> }), { virtual: true });
jest.mock('@theme/TabItem', () => ({
  __esModule: true,
  default: ({ children, label }) => <section aria-label={label}>{children}</section>,
}), { virtual: true });
jest.mock('@theme/CodeBlock', () => ({ __esModule: true, default: ({ children }) => <pre>{children}</pre> }), { virtual: true });

describe('ORAS_CLI', () => {
  it('should show the Linux install steps from the installation guide', () => {
    render(<ORASCLI />);
    const snippet = screen.getByRole('region', { name: 'Linux' }).textContent;
    const guide = readFileSync(
      path.resolve(__dirname, '../../../../versioned_docs', `version-${versions[0]}`, 'installation.mdx'),
      'utf8'
    );

    expect(snippet).toContain('_linux_${ARCH}.tar.gz');
    expect(guide).toContain(`\`\`\`bash\n${snippet}\n\`\`\``);
  });
});
