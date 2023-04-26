import { expect, describe, test } from 'vitest';
import { assignURLSearchParams } from './assign_url_search_params';

describe('assignURLSearchParams', () => {
	test('should assign search params to the URL with no existing search params', () => {
		const url = new URL('https://example.com/path');
		const params = new URLSearchParams('foo=bar&baz=qux');
		const result = assignURLSearchParams(url, params);
		expect(result.href).toEqual('https://example.com/path?foo=bar&baz=qux');
	});

	test('should assign search params to the URL with existing search params', () => {
		const url = new URL('https://example.com/path?foo=old');
		const params = new URLSearchParams('foo=new&bar=baz');
		const result = assignURLSearchParams(url, params);
		expect(result.href).toEqual('https://example.com/path?foo=new&bar=baz');
	});

	test('should assign search params to the URL with multiple URLSearchParams', () => {
		const url = new URL('https://example.com/path');
		const params1 = new URLSearchParams('foo=bar');
		const params2 = new URLSearchParams('baz=qux');
		const result = assignURLSearchParams(url, params1, params2);
		expect(result.href).toEqual('https://example.com/path?foo=bar&baz=qux');
	});

	test('should assign hash to the URL with existing hash', () => {
		const url = new URL('https://example.com/path#oldhash');
		const params = new URLSearchParams('foo=bar');
		const result = assignURLSearchParams(url, params);
		expect(result.href).toEqual('https://example.com/path?foo=bar#oldhash');
	});

	test('should assign hash to the URL with no existing hash', () => {
		const url = new URL('https://example.com/path');
		const params = new URLSearchParams('foo=bar');
		const result = assignURLSearchParams(url, params);
		expect(result.href).toEqual('https://example.com/path?foo=bar');
	});
});
