<template>
  <transition name="fade">
    <section class="projects">
      <section>
        <router-link 
          to="/quartz-relaunch" 
          class="quartz-relaunch"
          ontouchstart
        >
          <img
            src="/images/forePhone.png"
            alt="Fore - A smart portrait editing app"
            srcset="/images/relaunchPhone.png 1x, /images/relaunchPhone@2x.png 2x"
          >
        </router-link>
        <router-link 
          to="/objects" 
          class="objects"
          ontouchstart
        >
          <img
            src="/images/objectsPhone.png"
            alt="Quartz Objects"
            srcset="/images/objectsPhone.png 1x, /images/objectsPhone@2x.png 2x"
          >
        </router-link>
      </section>
      <section>
        <router-link 
          to="/fore" 
          class="fore"
          ontouchstart
        >
          <img
            src="/images/forePhone.png"
            alt="Fore - A smart portrait editing app"
            srcset="/images/forePhone.png 1x, /images/forePhone@2x.png 2x"
          >
        </router-link>
      </section>
    </section>
  </transition>
</template>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .4s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

$break-small: 900px;

section.projects {
  width: 100%;

  @include mobile {
    margin-top: 1em;
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
    margin-bottom: 3em;
    margin-right: 3em;
    overflow: hidden;
    height: 680px;
    min-width: 200px;
    max-width: 80%;

    img {
      transition: transform .3s cubic-bezier(0.175, 0.9, 0.32, 1.6);
      pointer-events: none;
      -webkit-user-select: none;
      user-select: none;
    }

    @media screen and (max-width: $break-small) {
      margin-right: 1em;
      flex: 1 0 240px !important;
      max-width: none;
    }

    @include desktop {
      &:hover {
        overflow: visible;
        img {
          transform: scale(1.01);
        }
      }
      &:active {
        overflow: visible;
        img {
          transform: none;
        }
      }
    }

    @include tablet {
      height: 440px;

      img {
        transform: scale(0.85) translateX(-100px) translateY(-30px);
      }

      &:active {
        img {
          transform: scale(0.84) translateX(-100px) translateY(-30px);
        }
      }

    }

    @include mobile {
      margin-bottom: 1em;
      height: 400px;
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
      margin-left: 40px;
    }
  }
  .quartz-relaunch {
    display: block;
    background: #D0D8DD;
    flex: 1.6 0 280px;

    img {
      margin-top: -60px;
      margin-left: 100px;
      @include mobile {
        margin-left: 60px;
      }
      @media screen and (max-width: $break-small) {
        margin-left: 16px;
      }
    }
  }
}
</style>