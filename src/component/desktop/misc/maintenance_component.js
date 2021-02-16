//from system
import React from "react";
import prop_types from "prop-types";

import * as antd from "antd";

const properties = {
	header: prop_types.object.isRequired,
	history: prop_types.any.isRequired,

	// actions
	app_action: prop_types.object.isRequired,
};

//from app
class MaintenanceComponent extends React.Component {
	render() {
		return (
			<antd.Layout>
				<antd.Result
					status="500"
					title="Under Maintenance"
					subTitle="Sorry, We are under maintenance."
				/>
			</antd.Layout>
		);
	}
}

MaintenanceComponent.propTypes = properties;

export default MaintenanceComponent;