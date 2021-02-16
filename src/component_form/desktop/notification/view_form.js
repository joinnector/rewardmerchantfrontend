/* eslint-disable react/prop-types */
import React from "react";

import collection_helper from "../../helper/collection_helper";

//from system
import * as antd from "antd";

// eslint-disable-next-line no-unused-vars
const NotificationViewForm = (props) => {
	return (
		<antd.Layout className="generic-form">
			<antd.Card style={{ minWidth: 400, maxWidth: 450, }} bordered={false} title={"VIEW NOTIFICATION"}>
				<antd.Descriptions bordered column={1}>
					<antd.Descriptions.Item label={"Notification id"}>{props.action_item._id}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Event"}>{collection_helper.get_lodash().capitalize(collection_helper.get_lodash().split(props.action_item.event, "_").join(" "))}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Title"}>{props.action_item.title}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Description"}>{props.action_item.description}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Link"}>{props.action_item.link}</antd.Descriptions.Item>
				</antd.Descriptions>
			</antd.Card>
		</antd.Layout>
	);
};

export default NotificationViewForm;