import React from 'react';
import { render } from '@testing-library/react';
import OrasGoV2Redirect from '../oras-go/v2/index.jsx';
import OrasGoRedirect from '../oras-go/index.jsx';
import OrasRedirect from '../oras/index.jsx';

// Docusaurus modules are automatically mocked via moduleNameMapper in jest.config.js

describe('Redirect Pages', () => {
  describe('oras-go/v2/index.jsx', () => {
    it('should render meta refresh redirect to oras-go GitHub', () => {
      const { container } = render(<OrasGoV2Redirect />);
      const metaRefresh = container.querySelector('meta[http-equiv="refresh"]');

      expect(metaRefresh).toBeInTheDocument();
      expect(metaRefresh).toHaveAttribute('content', '0; url=https://github.com/oras-project/oras-go');
    });

    it('should include go-import meta tag with correct content', () => {
      const { container } = render(<OrasGoV2Redirect />);
      const goImport = container.querySelector('meta[name="go-import"]');

      expect(goImport).toBeInTheDocument();
      expect(goImport).toHaveAttribute('content', 'oras.land/oras-go/v2 git https://github.com/oras-project/oras-go');
    });

    it('should include go-source meta tag with correct content', () => {
      const { container } = render(<OrasGoV2Redirect />);
      const goSource = container.querySelector('meta[name="go-source"]');

      expect(goSource).toBeInTheDocument();
      expect(goSource).toHaveAttribute(
        'content',
        'oras.land/oras-go/v2 git https://github.com/oras-project/oras-go https://github.com/oras-project/oras-go/tree/main{/dir} https://github.com/oras-project/oras-go/blob/main{/dir}/{file}#L{line}'
      );
    });

    it('should include charset meta tag', () => {
      const { container } = render(<OrasGoV2Redirect />);
      const charset = container.querySelector('meta[charset="utf-8"]');

      expect(charset).toBeInTheDocument();
    });
  });

  describe('oras-go/index.jsx', () => {
    it('should render meta refresh redirect to oras-go GitHub', () => {
      const { container } = render(<OrasGoRedirect />);
      const metaRefresh = container.querySelector('meta[http-equiv="refresh"]');

      expect(metaRefresh).toBeInTheDocument();
      expect(metaRefresh).toHaveAttribute('content', '0; url=https://github.com/oras-project/oras-go');
    });

    it('should include go-import meta tag with correct content', () => {
      const { container } = render(<OrasGoRedirect />);
      const goImport = container.querySelector('meta[name="go-import"]');

      expect(goImport).toBeInTheDocument();
      expect(goImport).toHaveAttribute('content', 'oras.land/oras-go git https://github.com/oras-project/oras-go');
    });

    it('should include go-source meta tag with correct content', () => {
      const { container } = render(<OrasGoRedirect />);
      const goSource = container.querySelector('meta[name="go-source"]');

      expect(goSource).toBeInTheDocument();
      expect(goSource).toHaveAttribute(
        'content',
        'oras.land/oras-go git https://github.com/oras-project/oras-go https://github.com/oras-project/oras-go/tree/main{/dir} https://github.com/oras-project/oras-go/blob/main{/dir}/{file}#L{line}'
      );
    });

    it('should include charset meta tag', () => {
      const { container } = render(<OrasGoRedirect />);
      const charset = container.querySelector('meta[charset="utf-8"]');

      expect(charset).toBeInTheDocument();
    });
  });

  describe('oras/index.jsx', () => {
    it('should render meta refresh redirect to oras GitHub', () => {
      const { container } = render(<OrasRedirect />);
      const metaRefresh = container.querySelector('meta[http-equiv="refresh"]');

      expect(metaRefresh).toBeInTheDocument();
      expect(metaRefresh).toHaveAttribute('content', '0; url=https://github.com/oras-project/oras');
    });

    it('should include go-import meta tag with correct content', () => {
      const { container } = render(<OrasRedirect />);
      const goImport = container.querySelector('meta[name="go-import"]');

      expect(goImport).toBeInTheDocument();
      expect(goImport).toHaveAttribute('content', 'oras.land/oras git https://github.com/oras-project/oras');
    });

    it('should include go-source meta tag with correct content', () => {
      const { container } = render(<OrasRedirect />);
      const goSource = container.querySelector('meta[name="go-source"]');

      expect(goSource).toBeInTheDocument();
      expect(goSource).toHaveAttribute(
        'content',
        'oras.land/oras git https://github.com/oras-project/oras https://github.com/oras-project/oras/tree/main{/dir} https://github.com/oras-project/oras/blob/main{/dir}/{file}#L{line}'
      );
    });

    it('should not include charset meta tag (different from oras-go pages)', () => {
      const { container } = render(<OrasRedirect />);
      const charset = container.querySelector('meta[charset="utf-8"]');

      // This page doesn't have charset meta tag, unlike the oras-go pages
      expect(charset).not.toBeInTheDocument();
    });
  });

  describe('Redirect URLs consistency', () => {
    it('should redirect oras-go/v2 and oras-go to the same URL', () => {
      const { container: v2Container } = render(<OrasGoV2Redirect />);
      const { container: baseContainer } = render(<OrasGoRedirect />);

      const v2MetaRefresh = v2Container.querySelector('meta[http-equiv="refresh"]');
      const baseMetaRefresh = baseContainer.querySelector('meta[http-equiv="refresh"]');

      expect(v2MetaRefresh.getAttribute('content')).toBe(baseMetaRefresh.getAttribute('content'));
    });

    it('should redirect to different repositories for oras-go and oras', () => {
      const { container: goContainer } = render(<OrasGoRedirect />);
      const { container: orasContainer } = render(<OrasRedirect />);

      const goMetaRefresh = goContainer.querySelector('meta[http-equiv="refresh"]');
      const orasMetaRefresh = orasContainer.querySelector('meta[http-equiv="refresh"]');

      expect(goMetaRefresh.getAttribute('content')).toContain('oras-go');
      expect(orasMetaRefresh.getAttribute('content')).toContain('oras-project/oras');
      expect(goMetaRefresh.getAttribute('content')).not.toBe(orasMetaRefresh.getAttribute('content'));
    });
  });
});
