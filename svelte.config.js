import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess'
import seqPreprocessor from 'svelte-sequential-preprocessor'
import { preprocessThrelte } from '@threlte/preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
      assets: 'build',
      fallback: null,
      precompress: false,
      strict: false
		})
	},
	preprocess: seqPreprocessor([preprocess(), preprocessThrelte()])
};

export default config;
