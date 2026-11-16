from odoo import fields, models


class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    pos_iface_show_fullscreen_btn = fields.Boolean(
        related='pos_config_id.iface_show_fullscreen_btn',
        readonly=False,
    )
    pos_iface_auto_fullscreen = fields.Boolean(
        related='pos_config_id.iface_auto_fullscreen',
        readonly=False,
    )
    pos_iface_keep_screen_awake = fields.Boolean(
        related='pos_config_id.iface_keep_screen_awake',
        readonly=False,
    )