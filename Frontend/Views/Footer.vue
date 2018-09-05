<template>
  <section class="footer">
    <ul>
      <li><span>👋</span></li>
      <li><a href="https://github.com/hallee">Github</a></li>
      <li><a href="https://twitter.com/hal_lee">Twitter</a></li>
      <li><a href="https://www.instagram.com/hal_lee/">Instagram</a></li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
@import "../Sass/mixins.scss";

section.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 4em 0 0 0;
  font-size: 0.9em;
  text-align: center;

  @include mobile {
    font-size: 0.8em;
  }

  @include mobile-small {
    font-size: 0.7em;
  }

  ul {
    margin: 0 auto;
    padding: 0;
    list-style: none;
  }

  li {
    display: inline-block;
    line-height: 4em;
    padding: 0;

    &:not(:last-child):not(:first-child):after {
      content: ' •';
      color: #bbb;
      padding: 0 0.4em;

      @include mobile {
        padding: 0 0.1em;
      }
    }
  }

  span {
    font-size: 1.5em;
    padding: 0 0.4em;
    vertical-align: bottom;
  }

  a {
    text-decoration: none;
    padding: 0.2em 0.4em;
    border-radius: 2px;

    &:hover {
      color: #efefef;
      background: #333;
    }

    &:active {
      color: #efefef;
      background: #333;
    }

    @include mobile {
      padding: 0.1em 0.3em;
    }
  }
}
</style>