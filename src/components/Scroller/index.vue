<template>
    <div class="wapper" ref="wapper">
        <slot></slot>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    export default {
        name: "Scroller",
        props:{
            handleToScroll:{
                type: Function,
                default: function () {}
            },
            handleToTouchEnd:{
                type: Function,
                default: function () {}
            }
        },
        mounted() {
            var scroll =  new BScroll(this.$refs.wapper,{
                tap:true,
                probeType:1
            });
            scroll.on('scroll',(pos)=>{
                this.handleToScroll(pos);
            });
            scroll.on('touchEnd',(pos)=>{
                this.handleToTouchEnd(pos);
            });
            this.scroll = scroll;
        },
        methods: {
            toScrollTop(y){
                this.scroll.scrollTo(0,y)
            }
        }
    }
</script>

<style scoped>
.wapper{height: 100%}
</style>
