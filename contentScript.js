var lastImage = null;
var classes = null;
var running = false;

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "findCrop") {
            showCrop(sendResponse)
            return true;
        }
        if (request.message === "toggle") {
            running = !running
            sendResponse({ type: "toggle", status: running })
        }
    }
)

document.addEventListener("mouseup", setLastImage)

function possibleImage(tag) {
    tag = tag.toLowerCase();
    return tag === "img" || tag === "image" || tag === "polgon";
}

function setLastImage(e) {
    if (!running) return;

    if (lastImage) {
        lastImage.classList.remove("pulse")
    }

    var img;
    var tag = e.target.tagName.toLowerCase();

    // if we're directly hitting an image then just grab it
    // otherwise we have to attempt a traversal
    if (possibleImage(tag)) {
        img = e.target
    } else {
        var candidates = document.elementsFromPoint(e.clientX, e.clientY)

        for (var i = 0; i < candidates.length; i++) {
            const potential = candidates[i].querySelector("img")
            if (potential) {
                img = potential;
                break;
            }
            if (possibleImage(candidates[i].tagName)) {
                img = candidates[i];
                break;
            }
        }
    }

    // if we've gotten outselves an image, then lets continue on. 
    // otherwise, we'll just clear the selection
    if (img) {
        lastImage = img || e.target;
        classes = lastImage.classList
        lastImage.classList.add("pulse")
    } else {
        lastImage = null;
        classes = null;
    }
}

function elementWithTransform(el) {
    while (true) {
        if (el.style.transform) {
            return el;
        }
        el = el.parentElement;
        if (el == null || el == undefined) {
            return null;
        }
    }
}

function showCrop(resp) {
    if (!running) return;

    var el = elementWithTransform(lastImage);

    var xTransform = subPx(parent.style.transform.split(/\(|\)/)[1].split(",")[0].trim());
    var yTransform = subPx(parent.style.transform.split(/\(|\)/)[1].split(",")[1].trim());
    var width = subPx(parent.style.width);
    var height = subPx(parent.style.height);

    navigator.clipboard.writeText(xTransform.toFixed(5) + "," + yTransform.toFixed(5) + "," + width.toFixed(5) + "," + height.toFixed(5))
        .then(() => {
            resp({ success: true })
        })
    return true;
}

function subDeg(s) {
    return parseFloat(s.substr(0, s.length - 3))
}

function subPx(s) {
    return parseFloat(s.substr(0, s.length - 2))
}