import React from 'react';
import { render } from '@testing-library/react';
import OrasGoV2Redirect from '../oras-go/v2/index.jsx';
import OrasGoRedirect from '../oras-go/index.jsx';
import OrasRedirect from '../oras/index.jsx';

// Docusaurus modules are automatically mocked via moduleNameMapper in jest.config.js

describe('Redirect Pages', () => {
  describe('oras-go/v2/index.jsx', () => {
    it('should render meta refresh redirect to oras-go GitHub', () => {
      render(<OrasGoV2Redirect />);
      const metaRefresh = document.querySelector('meta[http-equiv="refresh"]');

      expect(metaRefresh).toBeInTheDocument();
      expect(metaRefresh).toHaveAttribute('content', '0; url=https://github.com/oras-project/oras-go');
    });

    it('should include go-import meta tag with correct content', () => {
      render(<OrasGoV2Redirect />);
      const goImport = document.querySelector('meta[name="go-import"]');

      expect(goImport).toBeInTheDocument();
      expect(goImport).toHaveAttribute('content', 'oras.land/oras-go/v2 git https://github.com/oras-project/oras-go');
    });

    it('should include go-source meta tag with correct content', () => {
      render(<OrasGoV2Redirect />);
      const goSource = document.querySelector('meta[name="go-source"]');

      expect(goSource).toBeInTheDocument();
      expect(goSource).toHaveAttribute(
        'content',
        'oras.land/oras-go/v2 git https://github.com/oras-project/oras-go https://github.com/oras-project/oras-go/tree/v2{/dir} https://github.com/oras-project/oras-go/blob/v2{/dir}/{file}#L{line}'
      );
    });

    it('should include charset meta tag', () => {
      render(<OrasGoV2Redirect />);
      const charset = document.querySelector('meta[charset="utf-8"]');

      expect(charset).toBeInTheDocument();
    });
  });

  describe('oras-go/index.jsx', () => {
    it('should render meta refresh redirect to oras-go GitHub', () => {
      render(<OrasGoRedirect />);
      const metaRefresh = document.querySelector('meta[http-equiv="refresh"]');

      expect(metaRefresh).toBeInTheDocument();
      expect(metaRefresh).toHaveAttribute('content', '0; url=https://github.com/oras-project/oras-go');
    });

    it('should include go-import meta tag with correct content', () => {
      render(<OrasGoRedirect />);
      const goImport = document.querySelector('meta[name="go-import"]');

      expect(goImport).toBeInTheDocument();
      expect(goImport).toHaveAttribute('content', 'oras.land/oras-go git https://github.com/oras-project/oras-go');
    });

    it('should include go-source meta tag with correct content', () => {
      render(<OrasGoRedirect />);
      const goSource = document.querySelector('meta[name="go-source"]');

      expect(goSource).toBeInTheDocument();
      expect(goSource).toHaveAttribute(
        'content',
        'oras.land/oras-go git https://github.com/oras-project/oras-go https://github.com/oras-project/oras-go/tree/v1{/dir} https://github.com/oras-project/oras-go/blob/v1{/dir}/{file}#L{line}'
      );
    });

    it('should include charset meta tag', () => {
      render(<OrasGoRedirect />);
      const charset = document.querySelector('meta[charset="utf-8"]');

      expect(charset).toBeInTheDocument();
    });
  });

  describe('oras/index.jsx', () => {
    it('should render meta refresh redirect to oras GitHub', () => {
      render(<OrasRedirect />);
      const metaRefresh = document.querySelector('meta[http-equiv="refresh"]');

      expect(metaRefresh).toBeInTheDocument();
      expect(metaRefresh).toHaveAttribute('content', '0; url=https://github.com/oras-project/oras');
    });

    it('should include go-import meta tag with correct content', () => {
      render(<OrasRedirect />);
      const goImport = document.querySelector('meta[name="go-import"]');

      expect(goImport).toBeInTheDocument();
      expect(goImport).toHaveAttribute('content', 'oras.land/oras git https://github.com/oras-project/oras');
    });

    it('should include go-source meta tag with correct content', () => {
      render(<OrasRedirect />);
      const goSource = document.querySelector('meta[name="go-source"]');

      expect(goSource).toBeInTheDocument();
      expect(goSource).toHaveAttribute(
        'content',
        'oras.land/oras git https://github.com/oras-project/oras https://github.com/oras-project/oras/tree/main{/dir} https://github.com/oras-project/oras/blob/main{/dir}/{file}#L{line}'
      );
    });

    it('should not include charset meta tag (different from oras-go pages)', () => {
      render(<OrasRedirect />);
      const charset = document.querySelector('meta[charset="utf-8"]');

      // This page doesn't have charset meta tag, unlike the oras-go pages
      expect(charset).not.toBeInTheDocument();
    });
  });

  describe('Redirect URLs consistency', () => {
    it('should redirect oras-go/v2 and oras-go to the same URL', () => {
      const { unmount: unmountV2 } = render(<OrasGoV2Redirect />);
      const v2MetaRefresh = document.querySelector('meta[http-equiv="refresh"]');
      const v2Content = v2MetaRefresh.getAttribute('content');
      unmountV2();

      const { unmount: unmountBase } = render(<OrasGoRedirect />);
      const baseMetaRefresh = document.querySelector('meta[http-equiv="refresh"]');
      const baseContent = baseMetaRefresh.getAttribute('content');
      unmountBase();

      expect(v2Content).toBe(baseContent);
    });

    it('should redirect to different repositories for oras-go and oras', () => {
      const { unmount: unmountGo } = render(<OrasGoRedirect />);
      const goMetaRefresh = document.querySelector('meta[http-equiv="refresh"]');
      const goContent = goMetaRefresh.getAttribute('content');
      unmountGo();

      const { unmount: unmountOras } = render(<OrasRedirect />);
      const orasMetaRefresh = document.querySelector('meta[http-equiv="refresh"]');
      const orasContent = orasMetaRefresh.getAttribute('content');
      unmountOras();

      expect(goContent).toContain('oras-go');
      expect(orasContent).toContain('oras-project/oras');
      expect(goContent).not.toBe(orasContent);
    });
  });
});
