import MagicString from 'magic-string';
import { test } from '../../test';

const original = '\n<p>Hello</p>\n';
const transformed = new MagicString(original);
transformed.prepend('\n'.repeat(24));

export default test({
	compileOptions: {
		dev: true,
		sourcemap: transformed.generateMap({
			source: 'input.svelte',
			hires: true,
			includeContent: true
		})
	},
	test({ assert, input, code_client }) {
		assert.equal(input, transformed.toString());
		assert.include(code_client, '[[2, 0]]');
	}
});
