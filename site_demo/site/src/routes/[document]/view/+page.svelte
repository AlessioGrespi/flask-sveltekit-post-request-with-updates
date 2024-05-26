<script lang='ts'>
    export let data: PageData;

    $:({result} = data);


    console.log(result);
</script>

<p>{result}</p>
<p>{result.message}</p>