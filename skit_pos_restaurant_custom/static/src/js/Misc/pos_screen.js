odoo.define('skit_pos_restaurant_custom.pos_screen', function (require) {
"use strict";

var productScreen = require('point_of_sale.ProductScreen');
const Registries = require('point_of_sale.Registries');
const { useListener } = require('web.custom_hooks');
const models = require('point_of_sale.models');

var superOrder = models.Order.prototype;
models.Order = models.Order.extend({

	display_Co_Button: function (order) {
		// Change button style
		$(".confirm_label").text('Confirm Order');
		order.set_Is_Order_Confirmed(false);
	},
	display_Confirmed_Button: function (order, orderlines) {
		// Check order and order lines
		if (order && orderlines.length > 0) {
			 //if (order.get_Is_Order_Confirmed()) {
				 order.set_Is_Order_Confirmed(true);
			// }
			 // Change button style
			 $(".confirm_label").text('Confirmed');
			var localTime  = moment.utc(new Date()).toDate();
			var localDateTime = moment(localTime).format('YYYY-MM-DD HH:mm:ss');
			order.setOrderSequenceNo(order.sequence_number)
			order.setOrderCreateDate(localDateTime)
		 }
	},
});

	const skitPosProductCustomScreen = (productScreen) =>
        class extends productScreen {
        	constructor() {
	            super(...arguments);
	         	useListener('click-delivery', this._onClickDelivery);
	         }
	        async _onClickDelivery() {
	         	console.log("Delivered");
                var order = this.currentOrder;
                var olines = order.get_orderlines();
                this.currentOrder.finalized = true;
                order.destroy({ reason: 'delivered' });
                this.env.pos.add_new_order();

            }
    }
    Registries.Component.extend(productScreen, skitPosProductCustomScreen);
});