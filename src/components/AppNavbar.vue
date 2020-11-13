<template>
  <header>
    <container>
      <router-link to="/">dbots.js</router-link>

      <nav>
        <router-link to="/docs">Documentation</router-link>
        <a :href="`https://github.com/${repository}`">GitHub</a>
        <nav class="hidden-nav" :class="visible ? 'open' : 'closed'">
          <a href="https://github.com/dbots-pkg/dbots-pkg.github.io">Website Source</a>
          <router-link to="/services">Services</router-link>
        </nav>
        <a class="nav-open-btn" @click="toggle">
          <em class="fa fa-bars"></em>
        </a>
      </nav>
    </container>
  </header>
</template>

<script>
export default {
  name: 'navbar',
  props: ['repository'],

  data() {
    return {
      visible: false,
    };
  },

  methods: {
    toggle() {
      this.visible = !this.visible;
    },
  },
};
</script>

<style lang="scss">
@import "../styles/theming";
@import "../styles/mq";

header {
  height: 3rem;
  line-height: 3rem;
  background: $color-navbar-bg;

  a {
    display: inline-block;
    padding: 0 16px;
    text-decoration: none;
    color: white;
  }

  & .container > a {
    background: $color-primary;
    font-size: 1.1rem;

    &:hover {
      color: white;
      background: darken($color-primary, 10%);
    }
  }

  nav {
    float: right;

    a:hover {
      color: white;
      background: darken($color-navbar-bg, 10%);
    }
  }

  .nav-open-btn {
    display: none;

    @include mq($until: 600px) {
      display: inline-block;
    }
  }

  .hidden-nav {
    @include mq($until: 600px) {
      position: absolute;
      background: darken($color-navbar-bg, 10%);
      right: 0;
      opacity: 0;
      max-width: 50%;
      transition: opacity 0.2s ease;

      &.closed {
        display: none;
      }

      &.open {
        opacity: 1;
        transition: opacity 0.2s ease;
      }

      a {
        display: block;
        text-align: right;
      }

      &.open + .nav-open-btn {
        background: darken($color-navbar-bg, 10%);
      }
    }

    @include mq($until: 370px) {
      max-width: 100%;
    }
  }

  @include mq($until: 370px) {
    & .container > nav > a:nth-child(1) {
      font-size: 0;
      line-height: 0;

      &:after {
        content: "Docs";
        font-size: initial;
        line-height: 48px;
      }
    }
  }
}
</style>
