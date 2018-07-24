# crop-chrome

Basically, install this as an unpacked chrome extension. Once installed, go to chrome://extensions/shortcuts and ensure 
that shortcuts have been set for

* Copy crop data (Cmd + Shift + K)
* Toggle Crop feature (Cmd + Shift + O)

This extenion is off by deafult and must be toggled on. This is to avoid it from impacting anything when not in use. 

To start using it, toggle it on via the toggle on command. This should display a notification that the feature is turned on.

Now, select an image. The image that has been selected should flash. Due to the DOM being a little odd, it tries desperately 
to search for an image, thus if you click anywhere on the page at all, it'll still attempt to resolve it down to a single image.

The image that has been selected will slowly pulse. Use this to confirm which image has been selected.

Once the image you desire has been selected, you must press "Copy crop data" shortcut (Cmd + Shift + K for me) and the 
crop data for the currently selected image will be placed on the clipboard. This will be confirmed via a notification.

If asked, please allow this extension access to your clipboard, and to display notifications.
