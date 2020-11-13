<template>
  <footer>
    <container>
      <strong>
        <router-link to="/">dbots</router-link>
      </strong>
      <p>The universal count poster</p>
      <a class="icon-link" href="https://github.com/dbots-pkg">
        <i class="fab fa-github"></i>
      </a>
      <a class="icon-link" href="https://npmjs.org/package/dbots">
        <i class="fab fa-npm"></i>
      </a>
      <a class="icon-link" href="https://yarn.pm/dbots">
        <i class="fab fa-yarn"></i>
      </a>
      <a class="icon-link" href="https://www.jsdelivr.com/package/npm/dbots">
        <i class="fa fa-server"></i>
      </a>
      <stats/>
      <a href id="dark-mode-link" @click="toggleDarkMode">
        <em class="fa" :class="darkMode ? 'fa-sun' : 'fa-moon'"></em>
        Turn {{ darkMode ? 'on' : 'off' }} the lights
      </a>
    </container>
  </footer>
</template>

<script>
import Stats from './Stats.vue';

export default {
  name: 'footer',
  props: ['darkMode'],
  components: {
    Stats,
  },

  methods: {
    toggleDarkMode(event) {
      this.$emit('toggleDarkMode');
      event.preventDefault();
    },
  },
};
</script>

<style lang="scss">
@import "../styles/theming";

footer {
  padding: 3rem;
  background: $color-navbar-bg;
  color: $color-footer-text;

  a {
    text-decoration: none;
    color: $color-footer-text;
  }

  a:hover {
    color: lighten($color-footer-text, 10%);
  }

  .container {
    text-align: center;
  }

  .icon-link {
    margin: 5px;
  }

  .stats {
    padding: 0;
    list-style: none;

    li {
      display: inline-block;
      padding-left: 0.3em;

      &:not(:last-child):after {
        content: ",";
      }
    }
  }
}

#dark-mode-link {
  display: inline-block;
  padding: 8px 6px;
  border-radius: 4px;
  background: $color-primary;
  color: white;
  font-size: 0.9rem;

  &:hover {
    background: lighten($color-primary, 10%);
  }
}
</style>
