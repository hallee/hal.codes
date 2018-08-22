<template>
  <transition name="fade">
    <section class="projects"> 
      <section ontouchstart>
        <router-link 
          to="/fore" 
          class="fore"
        >
          <img
            src="/images/forePhone.png"
            alt="Fore - A smart portrait editing app"
            srcset="/images/forePhone.png 1x, /images/forePhone@2x.png 2x"
          >
        </router-link>
        <router-link 
          to="/objects" 
          class="objects"
        >
          <img
            src="/images/objectsPhone.png"
            alt="Quartz Objects"
            srcset="/images/objectsPhone.png 1x, /images/objectsPhone@2x.png 2x"
          >
        </router-link>
      </section>
    </section>
  </transition>
</template>

<style lang="scss" scoped>
@import "../Sass/mixins.scss";

.fade-enter-active, .fade-leave-active {
  transition: opacity .4s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

$break-small: 900px;

section.projects {
  margin-top: 4em;
  width: 100%;

  h1, h2, h3 {
    margin: 0 0 2em 0;
  }

  section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-right: -3em;
    @media screen and (max-width: $break-small) {
      margin-right: -1em;
    } 
  }
  
  a {
    display: inline-block;
    border-radius: 8px;
    background: #A8CDE1; 
    cursor: pointer;
    margin-bottom: 8em;
    margin-right: 3em;
    overflow: hidden;
    height: 680px;
    min-width: 200px;

    @media screen and (min-width: $break-mobile) {
      img {
        transition: transform .3s cubic-bezier(0.175, 0.9, 0.32, 1.6);
        pointer-events: none;
        -webkit-user-select: none;
      }

      &:hover {
        overflow: visible;
        img {
          transform: scale(1.01);
        }
      }
      &:active {
        img {
          transform: none;
        }
      }
    }

    @media screen and (max-width: $break-small) {
      margin-right: 1em;
      flex: 1 0 240px !important;
    } 

    @include mobile {
      margin-bottom: 3em;
      height: 500px;
    }
  }

  .objects {
    display: block;
    flex: 1 0 260px;
    max-width: 560px;
    img {
      margin-top: -50px;
      margin-left: -40px;
    }
  }
  .fore {
    display: block;
    background: #E1D4E1;
    flex: 1.6 0 280px;
    img {
      margin-top: -60px;
    }
  }
}
</style>