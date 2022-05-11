export let domManager = {
    addChild(parentIdentifier, childContent, position = "beforeend") {
        const parent = document.querySelector(parentIdentifier);
        if (parent) {
            parent.insertAdjacentHTML(position, childContent);
        } else {
            console.error("could not find such html element: " + parentIdentifier);
        }
    },
    addEventListener(parentIdentifier, eventType, eventHandler) {
        const parent = document.querySelector(parentIdentifier);
        if (parent) {
            parent.addEventListener(eventType, eventHandler);
        } else {
            console.error("could not find such html element: " + parentIdentifier);
        }
    },
    removeChild(parentIdentifier, childContent) {
        const parent = document.querySelector(parentIdentifier);
        const child = document.querySelector(childContent);
        if (parent) {
            child.remove();
        } else {
            console.error("could not find such html element: " + parentIdentifier);
        }
    },
    getParent(parentIdentifier) {
        const parent = document.querySelector(parentIdentifier);
        if (parent) {
            return parent;
        } else {
            console.error("could not find such html element: " + parentIdentifier);
        }
    },

    clearElement(element) {
        document.querySelector(element).innerHTML = ""
    },

    addClassToParent(element, className) {
        document.querySelector(element).parentNode.classList.add(className)
    }
};
