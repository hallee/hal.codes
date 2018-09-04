<template>   
  <section class="footer">
    <ul>
      <li><a href="https://github.com/hallee">Github</a></li>
      <li><a href="https://twitter.com/Hal_Lee">Twitter</a></li>
      <li><a href="https://www.instagram.com/hal_lee/">Instagram</a></li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
@import "../Sass/mixins.scss";

section.footer {
  display: flex;
  justify-content: space-between;
  padding: 4em 0 0 0;
  font-size: 0.9em;

  ul {
    list-style: none;
    margin: 0 auto;
  }

  li {
    display: inline-block;
    padding: 0;

    &:not(:last-child):after {
      content: ' •';
      color: #666;
      padding: 0 0.4em;
    }

  }

  a {
    text-decoration: none;
    padding: 0.2em 0.4em;
    border-radius: 2px;

    &:hover {
      color: #efefef;
      background: #666;
    }
  }
}
</style>