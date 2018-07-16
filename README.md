# Bits Toolbar Customizer

Contribute custom toolbar widgets and hide existing toolbar or sidebar items.

## Install and Build

For the following, assume the bits server is installed at `/opt/bits` and your bits modules are in `/opt/bits-modules`.
```
cd /opt/bits-modules
git clone <https or ssh url for this repo>
cd bits-toolbar-customizer
npm install
cd app/
bower install
cd /opt/bits/data/base/modules/modules
ln -s /opt/bits-modules/bits-toolbar-customizer
```
## Usage

Use this module to customize the BITS UI in two ways:

### Add Widgets to the Toolbar

Add custom widgets in `app/elements/bits-toolbar-customizer/bits-toolbar-customizer.html`. Replace the sample `<paper-icon-button>` element with markup that implements your widget. Set the desired icon, add widget listeners, etc. Icons for any contributed widget will appear on the right-side of the BITS toolbar.

### Hide Selected BITS UI Framework Items
 
Launch the BITS server and navigate to `https://localhost:9001/bits-toolbar-customizer` (or select the `Toolbar Customizer` module from the main BITS sidebar). Select items to be hidden or de-select previously-hidden items to be shown, and click `Save Changes`. Items will be hidden or shown immediately, except for Home sidebar items (which require a page reload as described below). Your customizations will persist throughout the session and across BITS server re-starts.

## Notes

* The customizations you specify are saved as json text in the file `customizations.json` in the data directory for this module (default `<bits-installation-dir>/data/bits-toolbar-customizer`). In a production environment, you may want to retain a copy of this file and provide some means for restoring it in the event the module data directory is deleted or purged.
* To prevent users from changing the customizations in a production environment, remove the entries from this module's `module.json` file that have the following keys: `contentElement`, `contentImport`, and `displayName`. The module will continue to apply the customizations specified in the `customizations.json` file, but the module's UI will not be exposed.
* The implementation of the capability for hiding UI framework items is not ideal. Unless and until the BITS framework explicitly supports customization, the only two options are: 1) Modify the BITS codebase and mantain a separate baseline, or 2) Provide a capabilty to find selected items in the rendered DOM, and hide them. This module takes the latter approach, which has several implications.

  * This "screen scrape" implementation is theoretically brittle, and may break with future BITS versions.
  * The hiding of UI elements is sometimes noticeable. The hidden element appears for an instant when the page is loaded, and then disappears.
  * When specific items from the `Home` sidebar are hidden, they are not hidden after clicking the `Home` link from the main sidebar until the page is refreshed. They are hidden immediately if you navigate directly to the `/home` route. This will hopefully be corrected in a future verison of the module.


