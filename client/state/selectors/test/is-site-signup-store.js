/** @format */

/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import { isSiteSignupStore } from '../';

describe( 'isSiteSignupStore()', () => {
	test( 'should return null if the specified site was not found in the state', () => {
		const state = {
			sites: {
				items: {},
			},
		};

		expect( isSiteSignupStore( state, 12345 ) ).to.be.null;
	} );

	test( 'should return true if the specified site was created as a "store" in the signup flow', () => {
		const state = {
			sites: {
				items: {
					12345: {
						options: {
							signup_is_store: true,
						},
					},
				},
			},
		};

		expect( isSiteSignupStore( state, 12345 ) ).to.be.true;
	} );

	test(
		'should return false if the specified site was not created as a "store" in the signup flow' +
			' or the site is missing the option key',
		() => {
			const state = {
				sites: {
					items: {
						12345: {
							options: {
								signup_is_store: false,
							},
						},
						12346: {
							options: {},
						},
					},
				},
			};

			expect( isSiteSignupStore( state, 12345 ) ).to.be.false;
			expect( isSiteSignupStore( state, 12346 ) ).to.be.false;
		}
	);
} );
