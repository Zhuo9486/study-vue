<template>
    <div>
        <router-view/>
        <nav-menu></nav-menu>
    </div>
    
</template>

<script>
    import NavMenu from "@/components/common/NavMenu";
    export default {
        name: "Home",
        components:{NavMenu}
    }
</script>

<style scoped>

</style>