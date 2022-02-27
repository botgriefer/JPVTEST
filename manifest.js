export const manifest = {
	appDir: "_app",
	assets: new Set(["favicon.png"]),
	_: {
		mime: {".png":"image/png"},
		entry: {"file":"start-4e902bef.js","js":["start-4e902bef.js","chunks/vendor-e605db34.js"],"css":[]},
		nodes: [
			() => import('./server/nodes/0.js'),
			() => import('./server/nodes/1.js'),
			() => import('./server/nodes/2.js')
		],
		routes: [
			{
				type: 'page',
				pattern: /^\/$/,
				params: null,
				path: "/",
				shadow: null,
				a: [0,2],
				b: [1]
			},
			{
				type: 'endpoint',
				pattern: /^\/([^/]+?)\/?$/,
				params: (m) => ({ code: m[1]}),
				load: () => import('./server/entries/endpoints/_code_.js')
			}
		]
	}
};
