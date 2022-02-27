<script type="text/javascript">
	import { writable } from 'svelte/store';
	const data = writable({});
	const current = writable("");
	let code = "";
	let src = "";

	async function onSubmit(){
		if(code){
			const response = await fetch(`/${code}`);
			const j = await response.json();
			console.log(j);
			data.set(j);
			current.set("");
		}
	}
</script>

<h1>Enter code:</h1>
<form on:submit|preventDefault={onSubmit}>
	<input type="text" bind:value={code}>
	<button type="submit">Submit</button>
</form>
{#if $data.name}
	<p>{$data.name}</p>
{/if}
{#if $data.img}
	<img alt="img" src={$data.img}>
{/if}
{#if $data.video}
	{#each $data.video as vid}
		<button on:click={() => {
			current.set(vid.file);
		}}>{vid.label} {vid.file == $current ? "Active" : ""}</button>		
	{/each}
{/if}
{#if $current}
	<iframe title="video" src={$current} allowfullscreen></iframe>
{/if}
