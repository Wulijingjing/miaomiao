<template>
    <div id="main">
        <Header title="登录喵喵"></Header>
        <div id="content">
            <Login />
        </div>
        <TabBar></TabBar>
    </div>
</template>

<script>
    import Header from '@/components/Header';
    import TabBar from '@/components/TabBar';
    import Login from "../../components/Login/index";
    export default {
        name: "Mine",
        components: {
            Login,
            Header,
            TabBar
        }
    }
</script>

<style scoped>

</style>
