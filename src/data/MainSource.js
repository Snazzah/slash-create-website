import semver from 'semver';
import DocsSource from './DocsSource';

const branchBlacklist = new Set(['docs', 'webpack', 'v8']);
export default new DocsSource({
  id: 'main',
  name: 'Main library',
  global: 'dbots',
  repo: 'dbots-pkg/dbots.js',
  defaultTag: 'latest',
  branchFilter: branch =>
    !branchBlacklist.has(branch) && !branch.startsWith('dependabot/'),
  tagFilter: tag => tag === 'latest' || semver.gt(tag.replace(/^v/, ''), '1.2.9'),
});
