{
    'name': 'POS Full Screen Button & Wake Lock',
    'version': '20.0.2.0.0',
    'category': 'Sales/Point of Sale',
    'summary': 'Add a full screen toggle button, auto-fullscreen, and screen wake lock to POS',
    'description': """
POS Full Screen Button & Wake Lock (Odoo 20)
============================================
Enhances the Point of Sale interface with:
- One-click Full Screen toggle button in the POS header (using Odoo 20 Material Symbols).
- Optional Auto-Fullscreen mode on first tap/interaction.
- Screen Wake Lock support to prevent tablet/touchscreen POS terminals from sleeping.
- Keyboard shortcut (Alt + F / F11) support.
    """,
    'author': 'Custom',
    'depends': ['point_of_sale'],
    'data': [
        'views/pos_config_views.xml',
    ],
    'assets': {
        'point_of_sale._assets_pos': [
            'pos_full_screen/static/src/js/navbar_patch.js',
            'pos_full_screen/static/src/xml/navbar_patch.xml',
        ],
    },
    'installable': True,
    'application': False,
    'license': 'LGPL-3',
}