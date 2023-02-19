<script>
	import {fade} from 'svelte/transition'
	import { Canvas, T } from '@threlte/core';
	import Background from './Background.svelte';
	import Globe from './Globe.svelte';
	import Trajectory from './Trajectory.svelte';
	import { degToRad } from 'three/src/math/MathUtils';

	// editing tools
	// import { Theatre, Editable } from '@threlte/theatre';

	let earthGroup;

	const earthRadius = 40;

	let progress = 0;

	setInterval(() => {
		progress += 0.01;
		if (progress > 1.5) {
			progress = 0;
		}
	}, 20);
</script>

<div class="wrapper">
	<Canvas rendererParameters={{ powerPreference: 'high-performance' }}>
		<!-- <Theatre> -->
		<!-- camera -->
		<T.PerspectiveCamera
			makeDefault
			position={[45, -2, 46]}
			rotation={[degToRad(4), degToRad(2), degToRad(-90)]}
			fov={50}
			near={0.1}
			far={1000}
		/>
		<!-- light stuff -->
		<T.SpotLight position={[47, -2, 5]} power={1} intensity={2} />
		<T.AmbientLight color="0xffffff" intensity="0.3" />

		<!-- globe -->
		<T.Group rotation={[degToRad(121), degToRad(-33), degToRad(-126)]}>
			<Globe {earthRadius} />
			<Trajectory
				start={[125.69, 39.19833]}
				end={[137, 41]}
				height={5700}
				radius={earthRadius}
				{progress}
			/>
		</T.Group>
		<!-- </Theatre> -->
		<Background backgroundColor="0x2d2d2d" />
	</Canvas>
	{#if progress > 0.49}
		<span in:fade={{duration: 300}}>~ 5,700 km</span>
	{/if}
</div>

<style>
	.wrapper {
		width: 100vw;
		height: 100vh;
		position: relative;
	}

	span {
		position: absolute;
		color: white;
		top: 20px;
		left: 50%;
		transform: translateX(-50%);
	}

	@media screen and (max-width: 767px){
		span {
			top: 22px;
		}
	}
</style>
