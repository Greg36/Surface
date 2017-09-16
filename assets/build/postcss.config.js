/* eslint-disable */

const cssnanoConfig = {
	preset: ['default', { discardComments: { removeAll: true } }]
};

module.exports = ({ file, options }) => {
	return {
		parser: options.isProduction ? 'postcss-safe-parser' : undefined,
		plugins: {
			cssnano: options.isProduction ? cssnanoConfig : false,
			autoprefixer: true,
		},
	};
};
