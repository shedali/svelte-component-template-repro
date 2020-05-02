<script lang="typescript">
    export let name: string;
    import {IFace} from "./types";

    export let face: IFace = {head: true, nose: true};
</script>


<style>
    h1 {
        color: blue;
    }
</style>

<h1 on:click={console.log}>{name}</h1>

<p>has head {face.head}</p>
<p>has head {face.nose}</p>
