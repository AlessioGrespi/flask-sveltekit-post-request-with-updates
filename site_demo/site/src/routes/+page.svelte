<form method="POST" enctype="multipart/form-data">
    <label for='file'>Upload the CV to scan</label>
	<input type="file" id="file" name="file" required accept='.pdf'/>
	<button type="submit">Submit</button>
</form>

<!-- <script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
  
    let data = writable([]);
    let loading = writable(true);
    let error = writable(null);
  
    const pollInterval = 1000; // 5 seconds
  
    async function fetchData() {
      try {
        const response = await fetch('/api/data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log('requesting')
        data.set(result);
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
  
  {#if $loading}
    <p>Loading...</p>
  {:else if $error}
    <p>Error: {$error}</p>
  {:else}
    <ul>
      {#each $data as item}
        <li>{item}</li>
      {/each}
    </ul>
  {/if}
   -->
