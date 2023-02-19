<script>
	import { useThrelte } from '@threlte/core';

	export let backgroundColor;

	const { scene } = useThrelte();
	$: scene.background = backgroundColor;
</script>
