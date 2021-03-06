import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types';

import IPsList from './IPsList.jsx'
import Loading from '../../common/loading/Loading.jsx'

import { flushAndRequestIPs } from '../../redux/ips/actions.js'

class IPsListScopesUpdater extends React.Component {
	constructor(props) {
		super(props);

		this.renewIps = this.renewIps.bind(this);
	}

	renewIps(page=this.props.ips.page, page_size=this.props.ips.page_size, filters=this.props.filters) {
		let { project_uuid } = this.props;

		this.context.store.dispatch(flushAndRequestIPs(project_uuid, filters, page, page_size));
	}

	shouldComponentUpdate(nextProps) {
		return !_.isEqual(nextProps, this.props);
	}

	componentDidUpdate(prevProps) {
		let { filters, ips } = this.props;

		if (!_.isEqual(filters, prevProps.filters)) {
			this.renewIps(0, ips.pages_size, filters);
		}
	}

	render() {
		return (
			<div>
				<Loading
					componentLoading={!this.props.ips.loaded}
				>
					<IPsList
						renewIps={this.renewIps}
						{...this.props}
					/>
				</Loading>
			</div>
		)
	}
}

IPsListScopesUpdater.contextTypes = {
    store: PropTypes.object
}

export default IPsListScopesUpdater;