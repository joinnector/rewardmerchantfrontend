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
class NotFoundComponent extends React.Component {
	render() {
		return (
			<antd.Layout>
				<antd.Result
					status="404"
					title="Not Found!"
					subTitle="Sorry, The page you are looking into does not exists."
				/>
				<antd.Button type="primary" style={{ width: 250, alignSelf: "center" }} onClick={() => this.props.history.replace("/")}>Go back to Home</antd.Button>
			</antd.Layout>
		);
	}
}

NotFoundComponent.propTypes = properties;

export default NotFoundComponent;