<template>
  <div v-if="showAsCards" class="stats stats-cards">
    <div class="stat-card">
      <h3>{{ downloads }}</h3>
      <span>Downloads</span>
    </div>
    <a href="https://bundlephobia.com/result?p=dbots" class="stat-card">
      <h3>{{ size }}</h3>
      <span>Kilobytes</span>
    </a>
    <a href="https://github.com/dbots-pkg/dbots.js/stargazers" class="stat-card">
      <h3>{{ stars }}</h3>
      <span>Stars</span>
    </a>
    <a href="https://github.com/dbots-pkg/dbots.js/graphs/contributors" class="stat-card">
      <h3>{{ contributors }}</h3>
      <span>Contributors</span>
    </a>
    <a v-if="usedBy" href="https://github.com/dbots-pkg/dbots.js/network/dependents?package_id=UGFja2FnZS0zNzA1MzQ1MA%3D%3D" class="stat-card">
      <h3>{{ usedBy }}</h3>
      <span>GitHub repos using dbots.js</span>
    </a>
    <a href="https://github.com/dbots-pkg/dbots.js/commits/master" class="stat-card">
      <h3>{{ commits }}</h3>
      <span>Commits to master</span>
    </a>
    <a v-if="openIssues" href="https://github.com/dbots-pkg/dbots.js/issues" class="stat-card">
      <h3>{{ openIssues }}</h3>
      <span>Open Issues</span>
    </a>
    <a href="https://github.com/dbots-pkg/dbots.js/watchers" class="stat-card">
      <h3>{{ watchers }}</h3>
      <span>Watchers</span>
    </a>
    <a v-if="forks" href="https://github.com/dbots-pkg/dbots.js/network/members" class="stat-card">
      <h3>{{ forks }}</h3>
      <span>Forks</span>
    </a>
    <a href="https://www.npmjs.com/package/dbots?activeTab=versions" class="stat-card">
      <h3>{{ versions }}</h3>
      <span>Versions Published</span>
    </a>
  </div>
  <ul v-else class="stats">
    <li>{{ downloads }} downloads</li>
    <li>{{ stars }} stars</li>
    <li>{{ contributors }} contributors</li>
  </ul>
</template>

<script>
const json = res => res.json();
const noop = () => {
  // Do nothing.
};
const data = {
  downloads: `${(2000).toLocaleString()}+`,
  stars: '2+',
  watchers: '2+',
  contributors: '100+',
  openIssues: '',
  forks: '',
  commits: '100+',
  versions: '10+',
  usedBy: '10+',
  size: '~24',
  fetching: false,
};

export default {
  name: 'stats',
  props: ['showAsCards'],

  data() {
    return data;
  },

  beforeMount() {
    this.fetch();
  },

  methods: {
    async fetch() {
      if (this.fetching) return;
      this.fetching = true;

      const [
        downloads,
        github,
        contributors,
        commiters,
        versions,
        size,
        usedBy,
      ] = await Promise.all([
        fetch(
          'https://api.npmjs.org/downloads/range/2013-08-21:2100-08-21/dbots',
        ).then(json, noop),
        fetch('https://api.github.com/repos/dbots-pkg/dbots.js').then(
          json,
          noop,
        ),
        fetch(
          'https://api.github.com/repos/dbots-pkg/dbots.js/stats/contributors',
        ).then(json, noop),
        fetch(
          'https://api.github.com/repos/dbots-pkg/dbots.js/contributors',
        ).then(json, noop),
        fetch('https://api.npms.io/v2/package/dbots').then(json, noop),
        fetch(
          'https://bundlephobia.com/api/size?package=dbots&record=true',
        ).then(json, noop),
        fetch('https://api.snaz.in/v2/github/used-by/dbots-pkg/dbots.js').then(json, noop),
      ]);

      if (downloads) {
        this.downloads = 0;
        for (const item of downloads.downloads)
          this.downloads += item.downloads;
        this.downloads = this.downloads.toLocaleString();
      }

      if (github) {
        this.stars = github.stargazers_count.toLocaleString();
        this.watchers = github.watchers_count.toLocaleString();
        if (github.forks)
          this.forks = github.forks.toLocaleString();
        if (github.open_issues_count)
          this.openIssues = github.open_issues_count.toLocaleString();
      }

      if (contributors)
        this.contributors = contributors.length.toLocaleString();

      if (commiters)
        this.commits = commiters
          .reduce((prev, val) => prev + val.contributions, 0)
          .toLocaleString();

      if (versions)
        this.versions = versions.collected.metadata.releases
          .reverse()[0]
          .count.toLocaleString();

      if (size)
        this.size = (size.size / 1000).toFixed(1);

      if (usedBy)
        this.usedBy = usedBy.used_by.value.toLocaleString();
    },
  },
};
</script>

<style lang="scss">
@import "../styles/theming";

#app.dark {
  .stat-card {
    background: $color-inactive-border-dark;
  }

  a.stat-card {
    color: $color-content-text-dark;

    &:hover {
      background: $color-card-hover-dark;
    }
  }
}

.stats-cards {
  display: flex;
  flex-flow: row wrap;
  -webkit-flex-flow: row wrap;
  justify-content: space-evenly;

  .stat-card {
    background: $color-inactive-border;
    border-radius: 5px;
    padding: 20px;
    text-align: center;
    margin: 10px;
    min-width: 25%;
    flex: 1;

    h3 {
      font-weight: bold;
      font-size: 48px;
      margin: 10px 0 3px 0;
    }

    span {
      line-height: 2rem;
      white-space: nowrap;
    }
  }

  a.stat-card {
    color: $color-content-text;
    transition: all 0.3s ease;

    &:hover {
      background: $color-card-hover;
      -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.75);
      box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.75);
      transform: translateY(-5px);
      transition: all 0.3s ease;
    }
  }
}

@media only screen and (max-width: 500px) {
  .stats-cards .stat-card {
    min-width: 75%;
  }
}
</style>
