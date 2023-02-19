<script>
	import { T, useThrelte } from '@threlte/core';
	import { geoInterpolate } from 'd3';
	import { Vector3, TubeBufferGeometry, LineBasicMaterial, QuadraticBezierCurve3 } from 'three';

	const { renderer, scene, camera } = useThrelte();

	export let start;
	export let end;
	export let radius;
	export let height;
	export let progress = 0.8;

	const startXYZ = lonLatToXYZ(start, radius);
	const endXYZ = lonLatToXYZ(end, radius);
	const startThreeXYZ = new Vector3(startXYZ[0], startXYZ[1], startXYZ[2]);
	const endThreeXYZ3 = new Vector3(endXYZ[0], endXYZ[1], endXYZ[2]);
	// geo interpolator
	const curveInterpolate = geoInterpolate([start[0], start[1]], [end[0], end[1]]);
	// set control point
	const controlCentroid = curveInterpolate(0.5);
	// calculate height
	const arcHeight = startThreeXYZ.distanceTo(endThreeXYZ3) + radius + (height / 6371) * radius;
	const controlXYZCentroid = lonLatToXYZ(controlCentroid, arcHeight);
	//create cubicBezier path
	const curve = new QuadraticBezierCurve3(
		startThreeXYZ,
		new Vector3(controlXYZCentroid[0], controlXYZCentroid[1], controlXYZCentroid[2]),
		endThreeXYZ3
	);
	const geometry = new TubeBufferGeometry(curve, 200, 0.06, 8);
	const material = new LineBasicMaterial({
		color: '#ededed',
		depthWrite: false, // overlay, along with renderOrder
		transparent: false,
		opacity: 1
	});
	material.renderOrder = 10;

	geometry.setDrawRange(0, 9600 * (progress * 1));
	// geometry.setDrawRange(0, 3500);

	$: if (progress) {
		updateTrajectory(progress);
    // console.log($camera);
		renderer.render(scene, $camera);
	}

	// utils stuff

	function lonLatToXYZ(coords, radius = earthRadius) {
		const lonrad = degreeToRadians(-coords[0]);
		const latrad = degreeToRadians(coords[1]);
		const x = radius * Math.cos(latrad) * Math.cos(lonrad);
		const y = radius * Math.sin(latrad);
		const z = radius * Math.cos(latrad) * Math.sin(lonrad);
		return [x, y, z];
	}

	function degreeToRadians(degrees) {
		return (degrees * Math.PI) / 180.0;
	}

	function updateTrajectory(progress) {
		geometry.setDrawRange(0, 9600 * (progress * 1));
	}
</script>

<T.Mesh {geometry} {material} />
