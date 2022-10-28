odoo.define('skit_pos_restaurant_custom.CustomActionpadWidget', function(require) {
    'use strict';

    var ActionpadWidget = require('point_of_sale.ActionpadWidget');
    const Registries = require('point_of_sale.Registries');


    const skitActionpadWidget = (ActionpadWidget) =>
        class extends ActionpadWidget {

            orderPaid() {

                var order = this.env.pos.get_order();
                if (order.order_paid) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        Registries.Component.extend(ActionpadWidget, skitActionpadWidget);
    });
