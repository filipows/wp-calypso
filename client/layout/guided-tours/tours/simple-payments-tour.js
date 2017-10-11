/**
 * External dependencies
 *
 * @format
 */

import React from 'react';
import { translate } from 'i18n-calypso';
import { overEvery as and } from 'lodash';

/**
 * Internal dependencies
 */
import { makeTour, Tour, Step, ButtonRow, Link, Quit } from 'layout/guided-tours/config-elements';
import { isNotNewUser } from 'state/ui/guided-tours/contexts';
import { isDesktop } from 'lib/viewport';

export const SimplePaymentsTour = makeTour(
	<Tour
		name="simplePaymentsTour"
		version="20170816"
		path="/post/"
		when={ and( isDesktop, isNotNewUser ) }
	>
		<Step
			name="init"
			arrow="top-left"
			target=".editor-html-toolbar__button-insert-media, .mce-wpcom-insert-menu button"
			placement="below"
			style={ { marginLeft: '-10px', zIndex: 'auto' } }
		>
			<p>
				{ translate(
					'Did you know? ' +
						'If your site is on the Premium or Business plan, you can add {{strong}}payment buttons{{/strong}} here ' +
						'to sell courses, offer event tickets, gather donations, or just ask for tips.',
					{
						components: {
							strong: <strong />,
						},
					}
				) }
			</p>
			<ButtonRow>
				<Quit primary>{ translate( 'Got it, sounds good!' ) }</Quit>
			</ButtonRow>
			<Link href="https://en.support.wordpress.com/simple-payments">
				{ translate( 'Learn more about Simple Payments.' ) }
			</Link>
		</Step>
	</Tour>
);
