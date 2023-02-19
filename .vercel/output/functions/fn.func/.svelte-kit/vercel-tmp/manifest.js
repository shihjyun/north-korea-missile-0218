export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","dark-world-base.jpg","favicon.png","reset.css"]),
	mimeTypes: {".jpg":"image/jpeg",".png":"image/png",".css":"text/css"},
	_: {
		entry: {"file":"_app/immutable/start-cd009545.js","imports":["_app/immutable/start-cd009545.js","_app/immutable/chunks/index-a9b6b70b.js","_app/immutable/chunks/singletons-cc54dc15.js","_app/immutable/chunks/index-badcca02.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/2.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
