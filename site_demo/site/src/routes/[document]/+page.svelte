<script lang='ts'>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { page } from '$app/stores';
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
  
    let status = writable()
    let datalog = writable([]);
    let loading = writable(true);
    let error = writable(null);

    const pollInterval = 1000; // 5 seconds
    
    async function fetchData() {
      console.log($page.data.task_id)
      try {
        const response = await fetch(`/api/data/${$page.data.task_id}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        // console.log(response)

        const result = await response.json();

        // console.log('requesting')
        console.log(result.status)

        // // data.set(result);
        let test: string = result.status
        status.set(test);
        datalog.set(result.log);

        if (test === 'completed'){
          goto(`/${$page.data.task_id}/view`)
        }

      } catch (err) {
        error.set(err.message);
      } finally {
        loading.set(false);
      }
    }
  
    onMount(() => {
      fetchData();
      const interval = setInterval(fetchData, pollInterval);
      return () => clearInterval(interval);
    });
  </script>
  
  <style>
    /* Add your styles here */
  </style>
  
<!-- {#if $status !== 'completed'} -->

<p>Starting Process...</p>
{#if $loading}
<p>Loading...</p>
{:else if $error}
<p>Error: {$error}</p>
{:else}
<ul>
  {#each $datalog as item}
  <li>{item}</li>
  {/each}
</ul>
{/if}
<!-- {/if} -->
