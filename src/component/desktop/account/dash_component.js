import React from "react";
import prop_types from "prop-types";

import collection_helper from "../../../helper/collection_helper";
import constant_helper from "../../../helper/constant_helper";

import * as antd from "antd";

const properties = {
	header: prop_types.object.isRequired,
	history: prop_types.any.isRequired,

	// actions
	app_action: prop_types.object.isRequired,
};

//from app
class DashComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			stat_start: collection_helper.process_new_moment().startOf("day").toISOString(),
			stat_end: collection_helper.process_new_moment().startOf("day").add(1, "day").toISOString(),
			stat_interval: "daily",
			
			lead_count_stat_result: {
				count: 0,
				items: []
			},

			redeem_count_stat_result: {
				count: 0,
				items: []
			},

			redeem_amount_stat_result: {
				count: 0,
				items: []
			},

			reward_count_stat_result: {
				count: 0,
				items: []
			},

			reward_amount_stat_result: {
				count: 0,
				items: []
			},

			swap_count_stat_result: {
				count: 0,
				items: []
			},

			swap_amount_stat_result: {
				count: 0,
				items: []
			},
		};

		this.api_merchant_get_leadstats = this.api_merchant_get_leadstats.bind(this);
		this.api_merchant_get_redeemstats = this.api_merchant_get_redeemstats.bind(this);
		this.api_merchant_get_rewardstats = this.api_merchant_get_rewardstats.bind(this);
		this.api_merchant_get_swapstats = this.api_merchant_get_swapstats.bind(this);

		this.on_interval_select = this.on_interval_select.bind(this);

		this.set_state = this.set_state.bind(this);
	}

	// mounted
	componentDidMount() {
		if (this.props.header.authorization) {
			this.api_merchant_get_leadstats();

			this.api_merchant_get_redeemstats({ count: true });
			this.api_merchant_get_redeemstats({ count: false, currency_code: "coin" });

			this.api_merchant_get_rewardstats({ count: true });
			this.api_merchant_get_rewardstats({ count: false, currency_code: "coin" });

			this.api_merchant_get_swapstats({ count: true });
			this.api_merchant_get_swapstats({ count: false, currency_code: "coin" });
		}
	}

	// updating
	// eslint-disable-next-line no-unused-vars
	shouldComponentUpdate(nextProps, nextState) {
		return true;
	}

	// unmount
	componentWillUnmount() {

	}

	api_merchant_get_leadstats() {
		// eslint-disable-next-line no-unused-vars
		const opts = {
			event: constant_helper.get_app_constant().API_IGNORE_DISPATCH,
			endpoint: "api/v1/merchant/lead-stats",
			params: {
				start: this.state.stat_start,
				end: this.state.stat_end
			},
			has_authorization: true,
			headers: {
				"content-type": "application/x-www-form-urlencoded",
			}
		};

		// eslint-disable-next-line no-unused-vars
		this.props.app_action.api_generic_get(opts, (result) => {
			if (result.meta.status === "success") {
				this.set_state({ lead_count_stat_result: result.data });
			}
		});
	}

	api_merchant_get_redeemstats(values) {
		// eslint-disable-next-line no-unused-vars
		const opts = {
			event: constant_helper.get_app_constant().API_IGNORE_DISPATCH,
			endpoint: "api/v1/merchant/redeem-stats",
			params: {
				...collection_helper.process_nullify(collection_helper.get_lodash().omitBy(collection_helper.get_lodash().omit(values, ["id"]), collection_helper.get_lodash().isNil), true),
				start: this.state.stat_start,
				end: this.state.stat_end
			},
			has_authorization: true,
			headers: {
				"content-type": "application/x-www-form-urlencoded",
			}
		};

		// eslint-disable-next-line no-unused-vars
		this.props.app_action.api_generic_get(opts, (result) => {
			if (result.meta.status === "success") {
				if (values.count) {
					this.set_state({ redeem_count_stat_result: result.data });
				} else {
					this.set_state({ redeem_amount_stat_result: result.data });
				}
			}
		});
	}

	api_merchant_get_rewardstats(values) {
		// eslint-disable-next-line no-unused-vars
		const opts = {
			event: constant_helper.get_app_constant().API_IGNORE_DISPATCH,
			endpoint: "api/v1/merchant/reward-stats",
			params: {
				...collection_helper.process_nullify(collection_helper.get_lodash().omitBy(collection_helper.get_lodash().omit(values, ["id"]), collection_helper.get_lodash().isNil), true),
				start: this.state.stat_start,
				end: this.state.stat_end
			},
			has_authorization: true,
			headers: {
				"content-type": "application/x-www-form-urlencoded",
			}
		};

		// eslint-disable-next-line no-unused-vars
		this.props.app_action.api_generic_get(opts, (result) => {
			if (result.meta.status === "success") {
				if (values.count) {
					this.set_state({ reward_count_stat_result: result.data });
				} else {
					this.set_state({ reward_amount_stat_result: result.data });
				}
			}
		});
	}

	api_merchant_get_swapstats(values) {
		// eslint-disable-next-line no-unused-vars
		const opts = {
			event: constant_helper.get_app_constant().API_IGNORE_DISPATCH,
			endpoint: "api/v1/merchant/swap-stats",
			params: {
				...collection_helper.process_nullify(collection_helper.get_lodash().omitBy(collection_helper.get_lodash().omit(values, ["id"]), collection_helper.get_lodash().isNil), true),
				start: this.state.stat_start,
				end: this.state.stat_end
			},
			has_authorization: true,
			headers: {
				"content-type": "application/x-www-form-urlencoded",
			}
		};

		// eslint-disable-next-line no-unused-vars
		this.props.app_action.api_generic_get(opts, (result) => {
			if (result.meta.status === "success") {
				if (values.count) {
					this.set_state({ swap_count_stat_result: result.data });
				} else {
					this.set_state({ swap_amount_stat_result: result.data });
				}
			}
		});
	}

	on_interval_select(value) {
		this.set_state({
			stat_interval: value,
		});

		if (value === "daily") {
			this.set_state({
				stat_start: collection_helper.process_new_moment().startOf("day").toISOString(),
				stat_end: collection_helper.process_new_moment().startOf("day").add(1, "day").toISOString(),
			});
		} else if (value === "weekly") {
			this.set_state({
				stat_start: collection_helper.process_new_moment().startOf("week").toISOString(),
				stat_end: collection_helper.process_new_moment().startOf("week").add(1, "week").toISOString(),
			});
		} else if (value === "monthly") {
			this.set_state({
				stat_start: collection_helper.process_new_moment().startOf("month").toISOString(),
				stat_end: collection_helper.process_new_moment().startOf("month").add(1, "month").toISOString(),
			});
		}
	}

	set_state(values) {
		// eslint-disable-next-line no-unused-vars
		this.setState((state, props) => ({
			...state,
			...values
		}));
	}

	render() {
		return (
			<antd.Layout>
				<antd.PageHeader
					ghost={false}
					title={"LEAD STATS"}>
					<antd.Typography.Text style={{ marginRight: 10, display: "block" }}>Interval</antd.Typography.Text>
					<antd.Select style={{ width: 350, marginBottom: 30 }} value={this.state.stat_interval} onSelect={this.on_interval_select}>
						<antd.Select.Option key={"daily"} value={"daily"}>{collection_helper.get_lodash().capitalize("daily")}</antd.Select.Option>
						<antd.Select.Option key={"weekly"} value={"weekly"}>{collection_helper.get_lodash().capitalize("weekly")}</antd.Select.Option>
						<antd.Select.Option key={"monthly"} value={"monthly"}>{collection_helper.get_lodash().capitalize("monthly")}</antd.Select.Option>
						<antd.Select.Option key={"custom"} value={"custom"}>{collection_helper.get_lodash().capitalize("custom")}</antd.Select.Option>
					</antd.Select>

					{
						this.state.stat_interval === "custom"
							? (<div>
								<div style={{ width: 350, marginBottom: 30 }}>
									<antd.Typography.Text style={{ marginRight: 10 }}>Start</antd.Typography.Text>
									<antd.DatePicker value={collection_helper.get_moment()(this.state.stat_start)} onSelect={(value) => this.set_state({ stat_start: value.toISOString() })} />
								</div>

								<div style={{ width: 350, marginBottom: 30 }}>
									<antd.Typography.Text style={{ marginRight: 10 }}>End</antd.Typography.Text>
									<antd.DatePicker value={collection_helper.get_moment()(this.state.stat_end)} onSelect={(value) => this.set_state({ stat_end: value.toISOString() })} />
								</div>
							</div>)
							: <div />
					}

					<antd.Row gutter={16}>
						<antd.Col span={12}>
							<antd.Card>
								<antd.Statistic title="Total lead count" value={this.state.lead_count_stat_result.count} />
								<antd.Button style={{ marginTop: 16 }} type="primary" onClick={() => this.api_merchant_get_leadstats({ count: true })}>
									Refresh
								</antd.Button>
							</antd.Card>
						</antd.Col>
					</antd.Row>

				</antd.PageHeader>

				<div style={{ padding: 10 }} />

				<antd.PageHeader
					ghost={false}
					title={"REDEEM STATS"}>
					<antd.Typography.Text style={{ marginRight: 10, display: "block" }}>Interval</antd.Typography.Text>
					<antd.Select style={{ width: 350, marginBottom: 30 }} value={this.state.stat_interval} onSelect={this.on_interval_select}>
						<antd.Select.Option key={"daily"} value={"daily"}>{collection_helper.get_lodash().capitalize("daily")}</antd.Select.Option>
						<antd.Select.Option key={"weekly"} value={"weekly"}>{collection_helper.get_lodash().capitalize("weekly")}</antd.Select.Option>
						<antd.Select.Option key={"monthly"} value={"monthly"}>{collection_helper.get_lodash().capitalize("monthly")}</antd.Select.Option>
						<antd.Select.Option key={"custom"} value={"custom"}>{collection_helper.get_lodash().capitalize("custom")}</antd.Select.Option>
					</antd.Select>

					{
						this.state.stat_interval === "custom"
							? (<div>
								<div style={{ width: 350, marginBottom: 30 }}>
									<antd.Typography.Text style={{ marginRight: 10 }}>Start</antd.Typography.Text>
									<antd.DatePicker value={collection_helper.get_moment()(this.state.stat_start)} onSelect={(value) => this.set_state({ stat_start: value.toISOString() })} />
								</div>

								<div style={{ width: 350, marginBottom: 30 }}>
									<antd.Typography.Text style={{ marginRight: 10 }}>End</antd.Typography.Text>
									<antd.DatePicker value={collection_helper.get_moment()(this.state.stat_end)} onSelect={(value) => this.set_state({ stat_end: value.toISOString() })} />
								</div>
							</div>)
							: <div />
					}

					<antd.Row gutter={16}>
						<antd.Col span={12}>
							<antd.Card>
								<antd.Statistic title="Total redeem count" value={this.state.redeem_count_stat_result.count} />
								<antd.Button style={{ marginTop: 16 }} type="primary" onClick={() => this.api_merchant_get_redeemstats({ count: true })}>
									Refresh
								</antd.Button>
							</antd.Card>
						</antd.Col>
						<antd.Col span={12}>
							<antd.Card>
								{this.state.redeem_amount_stat_result.items.map(item => (<antd.Statistic key={item.currency_code} title={`Total redeem amount (${collection_helper.get_lodash().upperCase(item.currency_code)})`} value={item.amount} precision={2} />))}
								{this.state.redeem_amount_stat_result.items.length <= 0 && <antd.Statistic title={"Total redeem amount (COIN)"} value={0} precision={2} />}
								<antd.Button style={{ marginTop: 16 }} type="primary" onClick={() => this.api_merchant_get_redeemstats({ count: false, currency_code: "coin" })}>
									Refresh
								</antd.Button>
							</antd.Card>
						</antd.Col>
					</antd.Row>

				</antd.PageHeader>

				<div style={{ padding: 10 }} />

				<antd.PageHeader
					ghost={false}
					title={"REWARD STATS"}>
					<antd.Typography.Text style={{ marginRight: 10, display: "block" }}>Interval</antd.Typography.Text>
					<antd.Select style={{ width: 350, marginBottom: 30 }} value={this.state.stat_interval} onSelect={this.on_interval_select}>
						<antd.Select.Option key={"daily"} value={"daily"}>{collection_helper.get_lodash().capitalize("daily")}</antd.Select.Option>
						<antd.Select.Option key={"weekly"} value={"weekly"}>{collection_helper.get_lodash().capitalize("weekly")}</antd.Select.Option>
						<antd.Select.Option key={"monthly"} value={"monthly"}>{collection_helper.get_lodash().capitalize("monthly")}</antd.Select.Option>
						<antd.Select.Option key={"custom"} value={"custom"}>{collection_helper.get_lodash().capitalize("custom")}</antd.Select.Option>
					</antd.Select>

					{
						this.state.stat_interval === "custom"
							? (<div>
								<div style={{ width: 350, marginBottom: 30 }}>
									<antd.Typography.Text style={{ marginRight: 10 }}>Start</antd.Typography.Text>
									<antd.DatePicker value={collection_helper.get_moment()(this.state.stat_start)} onSelect={(value) => this.set_state({ stat_start: value.toISOString() })} />
								</div>

								<div style={{ width: 350, marginBottom: 30 }}>
									<antd.Typography.Text style={{ marginRight: 10 }}>End</antd.Typography.Text>
									<antd.DatePicker value={collection_helper.get_moment()(this.state.stat_end)} onSelect={(value) => this.set_state({ stat_end: value.toISOString() })} />
								</div>
							</div>)
							: <div />
					}

					<antd.Row gutter={16}>
						<antd.Col span={12}>
							<antd.Card>
								<antd.Statistic title="Total reward count" value={this.state.reward_count_stat_result.count} />
								<antd.Button style={{ marginTop: 16 }} type="primary" onClick={() => this.api_merchant_get_rewardstats({ count: true })}>
									Refresh
								</antd.Button>
							</antd.Card>
						</antd.Col>
						<antd.Col span={12}>
							<antd.Card>
								{this.state.reward_amount_stat_result.items.map(item => (<antd.Statistic key={item.currency_code} title={`Total reward amount (${collection_helper.get_lodash().upperCase(item.currency_code)})`} value={item.amount} precision={2} />))}
								{this.state.reward_amount_stat_result.items.length <= 0 && <antd.Statistic title={"Total reward amount (COIN)"} value={0} precision={2} />}
								<antd.Button style={{ marginTop: 16 }} type="primary" onClick={() => this.api_merchant_get_rewardstats({ count: false, currency_code: "coin" })}>
									Refresh
								</antd.Button>
							</antd.Card>
						</antd.Col>
					</antd.Row>

				</antd.PageHeader>

				<div style={{ padding: 10 }} />

				<antd.PageHeader
					ghost={false}
					title={"SWAP STATS"}>
					<antd.Typography.Text style={{ marginRight: 10, display: "block" }}>Interval</antd.Typography.Text>
					<antd.Select style={{ width: 350, marginBottom: 30 }} value={this.state.stat_interval} onSelect={this.on_interval_select}>
						<antd.Select.Option key={"daily"} value={"daily"}>{collection_helper.get_lodash().capitalize("daily")}</antd.Select.Option>
						<antd.Select.Option key={"weekly"} value={"weekly"}>{collection_helper.get_lodash().capitalize("weekly")}</antd.Select.Option>
						<antd.Select.Option key={"monthly"} value={"monthly"}>{collection_helper.get_lodash().capitalize("monthly")}</antd.Select.Option>
						<antd.Select.Option key={"custom"} value={"custom"}>{collection_helper.get_lodash().capitalize("custom")}</antd.Select.Option>
					</antd.Select>

					{
						this.state.stat_interval === "custom"
							? (<div>
								<div style={{ width: 350, marginBottom: 30 }}>
									<antd.Typography.Text style={{ marginRight: 10 }}>Start</antd.Typography.Text>
									<antd.DatePicker value={collection_helper.get_moment()(this.state.stat_start)} onSelect={(value) => this.set_state({ stat_start: value.toISOString() })} />
								</div>

								<div style={{ width: 350, marginBottom: 30 }}>
									<antd.Typography.Text style={{ marginRight: 10 }}>End</antd.Typography.Text>
									<antd.DatePicker value={collection_helper.get_moment()(this.state.stat_end)} onSelect={(value) => this.set_state({ stat_end: value.toISOString() })} />
								</div>
							</div>)
							: <div />
					}

					<antd.Row gutter={16}>
						<antd.Col span={12}>
							<antd.Card>
								<antd.Statistic title="Total swap count" value={this.state.swap_count_stat_result.count} />
								<antd.Button style={{ marginTop: 16 }} type="primary" onClick={() => this.api_merchant_get_swapstats({ count: true })}>
									Refresh
								</antd.Button>
							</antd.Card>
						</antd.Col>
						<antd.Col span={12}>
							<antd.Card>
								{this.state.swap_amount_stat_result.items.map(item => (<antd.Statistic key={item.currency_code} title={`Total swap amount (${collection_helper.get_lodash().upperCase(item.currency_code)})`} value={item.amount} precision={2} />))}
								{this.state.swap_amount_stat_result.items.length <= 0 && <antd.Statistic title={"Total swap amount (COIN)"} value={0} precision={2} />}
								<antd.Button style={{ marginTop: 16 }} type="primary" onClick={() => this.api_merchant_get_swapstats({ count: false, currency_code: "coin" })}>
									Refresh
								</antd.Button>
							</antd.Card>
						</antd.Col>
					</antd.Row>

				</antd.PageHeader>

			</antd.Layout>
		);
	}
}

DashComponent.propTypes = properties;

export default DashComponent;