// ==UserScript==
// @name         Remove Adblock Youtube
// @namespace    http://tampermonkey.net/
// @version      5.0
// @description  Removes Adblock Thing
// @author       phwyverysad
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    const adblocker = true;
    const removePopup = false;
    const debugMessages = true;

    let currentUrl = window.location.href;
    let isAdFound = false;
    let adLoop = 0;

    const event = new PointerEvent('click', {
        pointerId: 1,
        bubbles: true,
        cancelable: true,
        view: window,
        detail: 1,
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        metaKey: false,
        button: 0,
        buttons: 1,
        width: 1,
        height: 1,
        pressure: 0.5,
        tiltX: 0,
        tiltY: 0,
        pointerType: 'mouse',
        isPrimary: true
    });

    log("Script started");

    if (adblocker) removeAds();
    if (removePopup) popupRemover();

    function popupRemover() {
        setInterval(() => {
            const modalOverlay = document.querySelector("tp-yt-iron-overlay-backdrop");
            const popup = document.querySelector(".style-scope ytd-enforcement-message-view-model");
            const popupButton = document.getElementById("dismiss-button");

            var video = document.querySelector('video');

            const bodyStyle = document.body.style;
            bodyStyle.setProperty('overflow-y', 'auto', 'important');

            if (modalOverlay) {
                modalOverlay.removeAttribute("opened");
                modalOverlay.remove();
            }

            if (popup) {
                log("Popup detected, removing...");

                if(popupButton) popupButton.click();

                popup.remove();
                video.play();

                setTimeout(() => {
                    video.play();
                }, 500);

                log("Popup removed");
            }
            if (!video.paused) return;
            video.play();

        }, 1000);
    }

    function removeAds() {
        log("removeAds()");

        var videoPlayback = 1;

        setInterval(() => {

            var video = document.querySelector('video');
            const ad = [...document.querySelectorAll('.ad-showing')][0];

            if (window.location.href !== currentUrl) {
                currentUrl = window.location.href;
                removePageAds();
            }

            if (ad) {
                isAdFound = true;
                adLoop = adLoop + 1;

                const openAdCenterButton = document.querySelector('.ytp-ad-button-icon');
                openAdCenterButton?.dispatchEvent(event);

                const blockAdButton = document.querySelector('[label="Block ad"]');
                blockAdButton?.dispatchEvent(event);

                const blockAdButtonConfirm = document.querySelector('.Eddif [label="CONTINUE"] button');
                blockAdButtonConfirm?.dispatchEvent(event);

                const closeAdCenterButton = document.querySelector('.zBmRhe-Bz112c');
                closeAdCenterButton?.dispatchEvent(event);

                var popupContainer = document.querySelector('body > ytd-app > ytd-popup-container > tp-yt-paper-dialog');
                if (popupContainer)
                    if (popupContainer.style.display == "")
                        popupContainer.style.display = 'none';

                log("Found Ad");

                const skipButtons = ['ytp-ad-skip-button-container', 'ytp-ad-skip-button-modern', '.videoAdUiSkipButton', '.ytp-ad-skip-button', '.ytp-ad-skip-button-modern', '.ytp-ad-skip-button', '.ytp-ad-skip-button-slot'];

                if (video) {

                    skipButtons.forEach(selector => {
                        const elements = document.querySelectorAll(selector);

                        if (elements && elements.length > 0) {
                            elements.forEach(element => {
                                element?.dispatchEvent(event);
                            });
                        }
                    });
                    video.play();

                    let randomNumber = Math.random() * (0.5 - 0.1) + 0.1;
                    video.currentTime = video.duration + randomNumber || 0;
                }

                log("skipped Ad (✔️)");

            } else {

                if (video && video?.playbackRate == 10) {
                    video.playbackRate = videoPlayback;
                }

                if (isAdFound) {
                    isAdFound = false;

                    if (videoPlayback == 10) videoPlayback = 1;
                    if (video && isFinite(videoPlayback)) video.playbackRate = videoPlayback;

                    adLoop = 0;
                } else {
                    if (video) videoPlayback = video.playbackRate;
                }
            }

        }, 50)

        removePageAds();
    }

    function removePageAds() {

        const sponsor = document.querySelectorAll("div#player-ads.style-scope.ytd-watch-flexy, div#panels.style-scope.ytd-watch-flexy");
        const style = document.createElement('style');

        style.textContent = `
            ytd-action-companion-ad-renderer,
            ytd-display-ad-renderer,
            ytd-video-masthead-ad-advertiser-info-renderer,
            ytd-video-masthead-ad-primary-video-renderer,
            ytd-in-feed-ad-layout-renderer,
            ytd-ad-slot-renderer,
            yt-about-this-ad-renderer,
            yt-mealbar-promo-renderer,
            ytd-statement-banner-renderer,
            ytd-ad-slot-renderer,
            ytd-in-feed-ad-layout-renderer,
            ytd-banner-promo-renderer-background
            statement-banner-style-type-compact,
            .ytd-video-masthead-ad-v3-renderer,
            div#root.style-scope.ytd-display-ad-renderer.yt-simple-endpoint,
            div#sparkles-container.style-scope.ytd-promoted-sparkles-web-renderer,
            div#main-container.style-scope.ytd-promoted-video-renderer,
            div#player-ads.style-scope.ytd-watch-flexy,
            ad-slot-renderer,
            ytm-promoted-sparkles-web-renderer,
            masthead-ad,
            tp-yt-iron-overlay-backdrop,

            #masthead-ad {
                display: none !important;
            }
        `;

        document.head.appendChild(style);

        sponsor?.forEach((element) => {
            if (element.getAttribute("id") === "rendering-content") {
                element.childNodes?.forEach((childElement) => {
                    if (childElement?.data.targetId && childElement?.data.targetId !== "engagement-panel-macro-markers-description-chapters") {
                        element.style.display = 'none';
                    }
                });
            }
        });

        log("Removed page ads (✔️)");
    }

    function log(log, level = 'l', ...args) {
        if (!debugMessages) return;

        const prefix = 'Remove Adblock Thing:'
        const message = `${prefix} ${log}`;
        switch (level) {
            case 'e':
            case 'err':
            case 'error':
                console.error(message, ...args);
                break;
            case 'l':
            case 'log':
                console.log(message, ...args);
                break;
            case 'w':
            case 'warn':
            case 'warning':
                console.warn(message, ...args);
                break;
            case 'i':
            case 'info':
            default:
                console.info(message, ...args);
                break
        }
    }

})();