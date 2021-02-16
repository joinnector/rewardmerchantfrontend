//from system
import React from "react";

import * as react_router_dom from "react-router-dom";

// containers

import AuthenticatedContainer from "../container/misc/authenticated_container";
import NotAuthenticatedContainer from "../container/misc/not_authenticated_container";

import AppContainer from "../container/app_container";


import LoginContainer from "../container/auth/login_container";
import RegisterContainer from "../container/auth/register_container";
import ForgotPasswordContainer from "../container/auth/forgot_passoword_container";

import DashContainer from "../container/account/dash_container";
import ProfileContainer from "../container/account/profile_container";

import ApiListContainer from "../container/api/list_container";
import DealListContainer from "../container/deal/list_container";
import TaskListContainer from "../container/task/list_container";
import SwapListContainer from "../container/swap/list_container";
import CouponCodeListContainer from "../container/couponcode/list_container";
import WalletListContainer from "../container/wallet/list_container";
import WalletTransactionListContainer from "../container/wallettransaction/list_container";
import CurrencyListContainer from "../container/currency/list_container";
import UploadListContainer from "../container/upload/list_container";
import ReviewListContainer from "../container/review/list_container";
import LoginActivityListContainer from "../container/loginactivity/list_container";
import TaskActivityListContainer from "../container/taskactivity/list_container";
import NotificationListContainer from "../container/notification/list_container";
import CouponListContainer from "../container/coupon/list_container";
import LeadListContainer from "../container/lead/list_container";
import StatListContainer from "../container/stat/list_container";

import NotFoundContainer from "../container/misc/not_found_container";
import MaintenanceContainer from "../container/misc/maintenance_container";

const initialize_route = () => (
	<AppContainer>
		<react_router_dom.Switch>
			<AuthenticatedContainer exact path="/" component={DashContainer} />
			<NotAuthenticatedContainer exact path="/login" component={LoginContainer} />
			<NotAuthenticatedContainer exact path="/register" component={RegisterContainer} />
			<NotAuthenticatedContainer exact path="/forgot-password" component={ForgotPasswordContainer} />

			<AuthenticatedContainer exact path="/profile" component={ProfileContainer} />

			<AuthenticatedContainer exact path="/api-list" component={ApiListContainer} />
			<AuthenticatedContainer exact path="/lead-list" component={LeadListContainer} />
			<AuthenticatedContainer exact path="/deal-list" component={DealListContainer} />
			<AuthenticatedContainer exact path="/task-list" component={TaskListContainer} />
			<AuthenticatedContainer exact path="/swap-list" component={SwapListContainer} />
			<AuthenticatedContainer exact path="/coupon-list" component={CouponListContainer} />
			<AuthenticatedContainer exact path="/wallet-list" component={WalletListContainer} />
			<AuthenticatedContainer exact path="/wallettransaction-list" component={WalletTransactionListContainer} />
			<AuthenticatedContainer exact path="/couponcode-list" component={CouponCodeListContainer} />
			<AuthenticatedContainer exact path="/currency-list" component={CurrencyListContainer} />
			<AuthenticatedContainer exact path="/upload-list" component={UploadListContainer} />
			<AuthenticatedContainer exact path="/review-list" component={ReviewListContainer} />
			<AuthenticatedContainer exact path="/loginactivity-list" component={LoginActivityListContainer} />
			<AuthenticatedContainer exact path="/taskactivity-list" component={TaskActivityListContainer} />
			<AuthenticatedContainer exact path="/notification-list" component={NotificationListContainer} />
			
			<AuthenticatedContainer exact path="/stat-list" component={StatListContainer} />

			<react_router_dom.Route path='/404' component={NotFoundContainer} />
			<react_router_dom.Route path='/maintenance' component={MaintenanceContainer} />
			<react_router_dom.Redirect from='*' to='/404' />
		</react_router_dom.Switch>
	</AppContainer>
);

export default initialize_route;