import { describe, expect, it, vi } from 'vitest';
import { elementUpdated, fixture } from '@open-wc/testing-helpers';
import './my-element.ts';
import { MyElement } from './my-element.ts';
import { html } from 'lit';
import { getByShadowTestId } from 'shadow-dom-testing-library';

describe('MyElement', () => {
	it('could not handle click event correctly', async () => {
		const element = await fixture<MyElement>(html`<my-element></my-element>`);
		const button = getByShadowTestId(element, 'button');
		button.click();
		// breaks in line above, no breakpoints after this will be reached
		expect((element as any).count).toBe(1);
	});
	it('could not handle custom event correctly', async () => {
		const handler = vi.fn();
		const element = await fixture<MyElement>(html`<my-element @update-count=${handler}></my-element>`);
		(element as any).count = 1;
		await elementUpdated(element);
		// breaks in line above, no breakpoints after this will be reached
		expect(handler.mock.calls[handler.mock.calls.length - 1][0].detail).toBe(1);
		expect((element as any).count).toBe(1);
	});
	it('could handle click event on plain html element', async () => {
		const handleClickMock = vi.fn();
		const button = document.createElement('button');
		button.addEventListener('click', handleClickMock);
		button.click();
		expect(handleClickMock).toHaveBeenCalled();
	});
	it('could handle click event with dispatchEvent on plain html element', async () => {
		const handleClickMock = vi.fn();
		const button = document.createElement('button');
		button.addEventListener('click', handleClickMock);
		button.dispatchEvent(new Event('click'));
		expect(handleClickMock).toHaveBeenCalled();
	});
});
