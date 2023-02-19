import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import seqPreprocessor from 'svelte-sequential-preprocessor';
import { preprocessThrelte } from '@threlte/preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// default options are shown
			pages: 'build',
			assets: 'build',
			fallback: null
		}),
		files: {
			assets: 'static',
			lib: 'src/components',
			routes: 'src/routes',
			appTemplate: 'src/app.html'
		}
	},
	preprocess: seqPreprocessor([preprocess(), preprocessThrelte()])
};

export default config;
