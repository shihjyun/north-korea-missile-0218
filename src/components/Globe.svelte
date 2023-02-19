<script>
	import { T, useTexture } from '@threlte/core';
	import { SphereGeometry, MeshLambertMaterial } from 'three';

	export let earthRadius;

	const texture = useTexture('/dark-world-base.jpg', {
		onLoad: () => {
			material.transparent = false;
			material.opacity = 1.0;
		}
	});

	const geometry = new SphereGeometry(earthRadius, 64, 64);
	const material = new MeshLambertMaterial({
		color: 0xf4f4f4,
		opacity: 0.0,
		transparent: true,
		map: texture
	});
</script>

<T.Mesh {geometry} {material} renderOrder={-3} />
