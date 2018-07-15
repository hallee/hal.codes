<template>
<transition name="fade">
    <section class="projects"> 
        <section>
            <article class="objects">
                <img src="/images/objectsPhone.png" alt="Quartz Objects" srcset="/images/objectsPhone.png 1x, /images/objectsPhone@2x.png 2x">
            </article>
            <article class="fore">
                <img src="/images/objectsPhone.png" alt="Quartz Objects" srcset="/images/forePhone.png 1x, /images/forePhone@2x.png 2x">
            </article>
        </section>
    </section>
</transition>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity .4s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}

$break-mobile: 768px;

section.projects {
    margin-top: 4em;
    overflow: hidden;
    width: 100%;

    h1, h2, h3 {
        margin: 0 0 2em 0;
    }

    section {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-right: -4em;
    }
    
    article {
        display: inline-block;
        border-radius: 8px;
        background: #A8CDE1; 
        cursor: pointer;
        margin-bottom: 8em;
        margin-right: 4em;
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

        @media screen and (max-width: $break-mobile) { 
            flex: 1 0 200px !important;
            margin-bottom: 3em;
            height: 500px;
        }
    }

    article.objects {
        flex: 1 0 380px;
        max-width: 560px;
        img {
            margin-top: -100px;
        }
    }
    article.fore {
        background: #E1D4E1;
        flex: 2 0 500px;
        img {
            margin-top: -60px;
        }
    }
}
</style>