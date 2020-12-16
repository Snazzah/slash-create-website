<template>
  <div v-if="showAsCards" class="stats stats-cards">
    <div class="stat-card">
      <h3>{{ downloads }}</h3>
      <span>Downloads</span>
    </div>
    <a href="https://github.com/Snazzah/slash-create/stargazers" class="stat-card">
      <h3>{{ stars }}</h3>
      <span>Stars</span>
    </a>
    <a href="https://github.com/Snazzah/slash-create/network/members" class="stat-card">
      <h3>{{ forks }}</h3>
      <span>Forks</span>
    </a>
  </div>
  <ul v-else class="stats">
    <li>{{ downloads }} downloads</li>
    <li>{{ stars }} stars</li>
    <li>{{ forks }} forks</li>
  </ul>
</template>

<script>
const json = res => res.json();
const noop = () => {
  // Do nothing.
};

export default {
  name: 'stats',
  props: ['showAsCards'],

  data() {
    return {
      downloads: `${(2000).toLocaleString()}+`,
      stars: '...',
      forks: '...',
      fetching: false,
    };
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
      ] = await Promise.all([
        fetch(
          'https://api.npmjs.org/downloads/range/2013-08-21:2100-08-21/slash-create',
        ).then(json, noop),
        fetch('https://api.github.com/repos/Snazzah/slash-create').then(
          json,
          noop,
        ),
      ]);

      if (downloads) {
        this.downloads = 0;
        for (const item of downloads.downloads)
          this.downloads += item.downloads;
        this.downloads = this.downloads.toLocaleString();
      }

      if (github) {
        this.stars = github.stargazers_count.toLocaleString();
        this.forks = github.forks_count.toLocaleString();
      }
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
