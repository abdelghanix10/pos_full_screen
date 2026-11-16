from odoo import fields, models


class PosConfig(models.Model):
    _inherit = 'pos.config'

    iface_show_fullscreen_btn = fields.Boolean(
        string="Show Full Screen Button",
        default=True,
        help="Display a Full Screen toggle button in the POS navigation bar.",
    )
    iface_auto_fullscreen = fields.Boolean(
        string="Auto Enter Full Screen",
        default=False,
        help="Automatically enter Full Screen mode on the cashier's first interaction.",
    )
    iface_keep_screen_awake = fields.Boolean(
        string="Keep POS Screen Awake",
        default=True,
        help="Prevent tablet/touchscreen displays from dimming or sleeping while POS is open.",
    )