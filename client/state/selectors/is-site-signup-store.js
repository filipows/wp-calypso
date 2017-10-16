/** @format */

/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import { getSiteOptions } from 'state/selectors';

/**
 * Returns whether the given site was created as a 'store' during the signup flow.
 *
 * @param    {Object}    state    Global state tree
 * @param    {Number}    siteId   Site ID
 * @returns  {?Boolean}           True/false or null
 */
export default ( state, siteId ) => {
	const siteOptions = getSiteOptions( state, siteId );

	if ( ! siteOptions ) {
		return null;
	}

	return get( siteOptions, 'signup_is_store', false );
};
