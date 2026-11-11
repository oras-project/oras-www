/**
 * Tests for the docs version banners configured in docusaurus.config.js.
 *
 * Docusaurus picks a banner for each version from its position in
 * versions.json. The config only overrides it for preview versions.
 */

const loadConfig = (versions) => {
  let config;
  jest.isolateModules(() => {
    jest.doMock('../../versions.json', () => versions);
    config = require('../../docusaurus.config.js');
  });
  return config;
};

const docsOptions = (config) => {
  const [, options] = config.presets.find(([name]) => name === 'classic');
  return options.docs;
};

afterEach(() => {
  jest.dontMock('../../versions.json');
});

describe('docs version banners', () => {
  it('leaves banners of released versions to the Docusaurus defaults', () => {
    const config = loadConfig(['1.3', '1.2', '1.1']);

    expect(docsOptions(config).versions).toEqual({});
  });

  it('marks preview versions as unreleased', () => {
    const config = loadConfig(['1.3', '1.2', '1.1', '1.4-preview']);

    expect(docsOptions(config).versions).toEqual({
      '1.4-preview': { banner: 'unreleased' },
    });
  });
});
