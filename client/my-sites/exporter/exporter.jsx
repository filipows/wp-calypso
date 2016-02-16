/**
 * External dependencies
 */
import React, { PropTypes } from 'react';

/**
 * Internal dependencies
 */
import FoldableCard from 'components/foldable-card';
import AdvancedSettings from 'my-sites/exporter/advanced-settings';
import SpinnerButton from './spinner-button';
import Interval, { EVERY_SECOND } from 'lib/interval';
import Notice from 'components/notice';
import NoticeAction from 'components/notice/notice-action';

export default React.createClass( {
	displayName: 'Exporter',

	propTypes: {
		startExport: PropTypes.func.isRequired,
		setPostType: PropTypes.func.isRequired,
		advancedSettingsFetch: PropTypes.func.isRequired,

		shouldShowProgress: PropTypes.bool.isRequired,
		postType: PropTypes.string,
		siteId: PropTypes.number
	},

	componentWillMount() {
		this.props.advancedSettingsFetch( this.props.siteId );
	},

	componentWillReceiveProps( newProps ) {
		if ( newProps.siteId !== this.props.siteId ) {
			this.props.advancedSettingsFetch( newProps.siteId );
		}
	},

	render: function() {
		const { setPostType, startExport, exportStatusFetch, clearExport } = this.props;
		const { postType, shouldShowProgress, isExporting } = this.props;
		const siteId = this.props.site.ID;

		const exportAll = () => startExport( siteId );
		const fetchStatus = () => exportStatusFetch( siteId );
		const dismissNotice = () => clearExport( siteId );

		const exportButton = (
			<SpinnerButton
				className="exporter__export-button"
				loading={ shouldShowProgress }
				isPrimary={ true }
				onClick={ exportAll }
				text={ this.translate( 'Export All' ) }
				loadingText={ this.translate( 'Exporting…' ) } />
		);

		var notice = null;
		if ( this.props.didComplete ) {
			notice = (
				<Notice
					status="is-success"
					text={ this.translate( 'Your export was successful! A download link has also been sent to your email.' ) }
					onDismissClick={ dismissNotice }
				>
					<NoticeAction href={ this.props.downloadURL }>
						Download
					</NoticeAction>
				</Notice>
			);
		}
		if ( this.props.didFail ) {
			notice = (
				<Notice
					status="is-error"
					text={ this.translate( 'There was a problem preparing your export file. Please check your connection and try again, or contact support.' ) }
					onDismissClick={ dismissNotice }
				>
					<NoticeAction href={ '/help/contact' }>
						Get Help
					</NoticeAction>
				</Notice>
			);
		}

		return (
			<div className="exporter">
				{ notice }
				<FoldableCard
					actionButtonIcon="cog"
					header={
						<div>
							<h1 className="exporter__title">
								{ this.translate( 'Export your content' ) }
							</h1>
							<h2 className="exporter__subtitle">
								{ this.translate( 'Or select specific content items to export' ) }
							</h2>
						</div>
					}
					summary={ exportButton }
					expandedSummary={ exportButton }
					>
					<AdvancedSettings
						postType={ postType }
						shouldShowProgress={ shouldShowProgress }
						onSelectPostType={ setPostType }
						onClickExport={ startExport }
					/>
				</FoldableCard>
				{ isExporting && <Interval onTick={ fetchStatus } period={ EVERY_SECOND } /> }
			</div>
		);
	}
} );
