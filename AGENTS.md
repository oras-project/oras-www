# GitHub AI Agent Instructions for ORAS Documentation Website

This repository contains the documentation website for ORAS (OCI Registry As Storage), built with Docusaurus 2.

## Repository Overview

- **Technology Stack**: Docusaurus 2, React, MDX, JavaScript
- **Purpose**: Documentation and website for the ORAS project at https://oras.land
- **Key Features**: Versioned documentation, auto-generated CLI command pages, blog, community resources

## Important Files and Directories

### Do NOT Modify These Files
- **`versioned_docs/version-*/commands/*.mdx`** - Auto-generated from ORAS CLI command help text
  - These files have a warning comment: `warning: Do NOT modify this generated file`
  - To fix these, modify the command help text in the ORAS CLI repository
  - Run `npm run refresh-commands` to regenerate
- **`package-lock.json`** - Only update via `npm install`
- **Build artifacts** - Anything in `build/`, `.docusaurus/`, `node_modules/`

### Key Configuration Files
- **`docusaurus.config.js`** - Main Docusaurus configuration
- **`sidebars.js`** - Documentation sidebar structure
- **`package.json`** - Dependencies and npm scripts
- **`.vale.ini`** - Vale linter configuration for documentation
- **`versions.json`** - Supported documentation versions
- **`versions-map`** - Maps short versions to exact releases

### Content Directories
- **`versioned_docs/version-*/`** - Versioned documentation (current: 1.1, 1.2, 1.3)
- **`blog/`** - Blog posts in MDX format
- **`community/`** - Community resources (contributing guide, contributor ladder, etc.)
- **`static/`** - Static assets (images, CSS, etc.)
- **`src/`** - Custom React components and pages

## Building and Testing

### Local Development
```bash
npm install          # Install dependencies
npm run start        # Start dev server at http://localhost:3000
npm run build        # Production build
npm run serve        # Serve production build locally
```

### Validation and Linting
```bash
npm run check-links  # Check internal markdown links (uses remark-validate-links)
# Vale linting runs in CI on pull requests
```

### Command Documentation
```bash
npm run refresh-commands  # Regenerate CLI command documentation
```
This script:
- Downloads ORAS binaries for each supported version
- Generates MDX files from `oras help` output
- Places them in `versioned_docs/version-*/commands/`

## Code Style and Conventions

### Documentation (MDX/Markdown)
- Use MDX for documentation files (supports React components)
- Front matter with `title` and `sidebar_position` is required
- Follow existing formatting patterns in the repository
- Use Vale vocabulary from `vale/config/vocabularies/oras/accept.txt`
- Common project terms: ORAS, OCI, SBOMs, Zot, etc.

### React/JavaScript
- Use functional components with hooks
- Follow existing code patterns in `src/` directory
- Use vanilla CSS (not CSS-in-JS or preprocessors)
- Import styles from `.css` files

### Commit Messages
- Follow [Conventional Commits](https://www.conventionalcommits.org/) format
- Sign commits with `-s` flag (DCO requirement)
- Examples: `feat: add new documentation section`, `fix: correct broken link`

## Contributing Guidelines

### Pull Request Process
1. Fork the repository and create a feature branch
2. Make changes following the guidelines above
3. Ensure `npm run build` succeeds without errors
4. Sign your commits (`git commit -s`)
5. Submit a pull request with a clear description
6. Address review feedback and CI failures

### Testing Changes
- Always run `npm run build` before submitting PRs
- Check that links work with `npm run check-links`
- Test locally with `npm run start` to preview changes
- Verify versioned documentation renders correctly

### CI/CD Checks
- **Vale linting**: Checks documentation style and terminology
- **Link checking**: Validates internal markdown links
- **Build verification**: Ensures site builds successfully on Netlify

## Special Considerations

### Versioned Documentation
- Current versions are defined in `versions.json`
- Each version has its own directory: `versioned_docs/version-X.Y/`
- Changes to current documentation go to the latest version
- Use `docusaurus docs:version X.Y` to create new versions

### Auto-Generated Content
- Never manually edit files with `warning: Do NOT modify this generated file`
- Command documentation comes from ORAS CLI source
- If command docs need fixes, update the CLI repository, not this one

### Static Assets
- Images go in `static/img/`
- Adopter logos have light/dark variants
- Use relative paths for internal links

## Common Tasks

### Adding a New Documentation Page
1. Create MDX file in appropriate `versioned_docs/version-X.Y/` directory
2. Add front matter with `title` and `sidebar_position`
3. Update `versioned_sidebars/` if needed
4. Test with `npm run start`

### Updating the Blog
1. Create new MDX file in `blog/` directory
2. Use date prefix: `YYYY-MM-DD-post-title.mdx`
3. Add front matter with `title`, `authors`, `tags`
4. Test locally before submitting

### Fixing Broken Links
1. Run `npm run check-links` to identify broken links
2. Update references to use correct paths
3. Verify fix with another `npm run check-links` run

### Adding a New Adopter/Registry
1. Update the appropriate data file in `versioned_docs/version-X.Y/static/adopters/data.js`
2. Add logos to `static/img/adopters/` (light and dark variants if needed)
3. Test the adopters page locally

## Resources

- [ORAS Documentation](https://oras.land)
- [Docusaurus Documentation](https://docusaurus.io)
- [Contributing Guide](https://oras.land/docs/community/contributing_guide)
- [CNCF Code of Conduct](https://github.com/cncf/foundation/blob/master/code-of-conduct.md)
- [Conventional Commits](https://www.conventionalcommits.org/)

## Questions?

- Join the #oras channel in [CNCF Slack](https://cloud-native.slack.com)
- Review existing issues and pull requests
- Check the [community resources](https://oras.land/docs/community/community_resources)
