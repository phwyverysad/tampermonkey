// ==UserScript==
// @name         Discord Fake Mute/Deafen
// @namespace    http://tampermonkey.net/
// @version      2.5
// @description
// @author       phwyverysad
// @match        *://*.discord.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(() => {
    'use strict';

    let spoofMute = false;
    let spoofDeafen = false;

    // -------------------------------------------------------------
    // โค้ดหลัก (ห้ามเปลี่ยน) - ดักจับ WebSocket ปลอมสถานะ
    // -------------------------------------------------------------
    const originalSend = WebSocket.prototype.send;
    WebSocket.prototype.send = function (data) {
        try {
            if (typeof data === "string") {
                const json = JSON.parse(data);
                if (json && json.op === 4 && json.d) {
                    if (typeof json.d.self_mute === "boolean") json.d.self_mute = spoofMute;
                    if (typeof json.d.self_deaf === "boolean") json.d.self_deaf = spoofDeafen;
                    data = JSON.stringify(json);
                }
            }
        } catch (err) {}
        return originalSend.call(this, data);
    };

    console.log("%c[FakeMuteDeafen] WebSocket Hooked!", "color: lime; font-weight: bold;");
    // -------------------------------------------------------------

    // 2. สร้าง UI เมื่อโหลดเสร็จ
    const initUI = () => {
        const style = document.createElement("style");
        style.innerHTML = `
            #fm-wrapper {
                position: fixed;
                z-index: 99999;
                font-family: 'gg sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
                width: 44px;
                height: 44px;
                top: 50%;
                left: calc(100vw - 44px);
                transform: translateY(-50%);
                /* แอนิเมชันตอนปล่อยเมาส์ให้วิ่งไปติดขอบจอแบบมีแรงสปริง (Bouncy) */
                transition: left 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            #fm-wrapper.dragging {
                transition: none !important; /* ปิดแอนิเมชันตอนลาก เพื่อให้ติดนิ้ว */
            }

            /* ปุ่มหลัก */
            #fm-toggle-btn {
                background: #1e1f22;
                color: #b5bac1;
                border: 1px solid #313338;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                cursor: grab;
                box-shadow: 0 4px 10px rgba(0,0,0,0.4);
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                z-index: 2;
                transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1), background 0.3s ease, color 0.3s ease;
                user-select: none;
            }
            #fm-toggle-btn:active { cursor: grabbing; transform: scale(0.9); }

            #fm-wrapper:hover #fm-toggle-btn, #fm-wrapper.menu-open #fm-toggle-btn {
                background: #313338;
                color: #fff;
            }

            /* แอนิเมชันไอคอนผี */
            #fm-icon {
                transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
                display: flex;
            }
            #fm-wrapper:hover #fm-icon { transform: scale(1.1); }
            #fm-wrapper.menu-open #fm-icon { transform: scale(0.85); }

            /* --- ระบบซ่อนขอบจอแบบสมูท --- */
            .snap-right #fm-toggle-btn { transform: translateX(22px); opacity: 0.5; }
            .snap-right:hover #fm-toggle-btn, .snap-right.menu-open #fm-toggle-btn { transform: translateX(0); opacity: 1; }
            .snap-left #fm-toggle-btn { transform: translateX(-22px); opacity: 0.5; }
            .snap-left:hover #fm-toggle-btn, .snap-left.menu-open #fm-toggle-btn { transform: translateX(0); opacity: 1; }

            /* Panel */
            #fm-panel {
                position: absolute;
                top: 50%;
                background: #2b2d31;
                border: 1px solid #1e1f22;
                padding: 6px;
                border-radius: 12px;
                box-shadow: 0 8px 24px rgba(0,0,0,0.5);
                display: flex;
                flex-direction: column;
                gap: 4px;
                opacity: 0;
                pointer-events: none;
                /* แอนิเมชันเมนูสไลด์และเฟด */
                transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
                z-index: 1;
            }

            /* สะพานล่องหน: กันเมาส์หลุดตอนลากจากปุ่มไปเมนู */
            #fm-panel::before {
                content: '';
                position: absolute;
                top: 0;
                bottom: 0;
                width: 30px;
            }

            /* กำหนดจุดเริ่มต้นของ Panel ให้ซ่อนอยู่หลังปุ่ม */
            .snap-right #fm-panel { right: 55px; left: auto; transform: translate(20px, -50%) scale(0.9); }
            .snap-right #fm-panel::before { right: -30px; }

            .snap-left #fm-panel { left: 55px; right: auto; transform: translate(-20px, -50%) scale(0.9); }
            .snap-left #fm-panel::before { left: -30px; }

            /* ตอนเปิดเมนู ให้สไลด์ออกมา */
            #fm-wrapper.menu-open #fm-panel {
                opacity: 1;
                pointer-events: auto;
                transform: translate(0, -50%) scale(1);
            }

            /* ปุ่มเปิด/ปิด สถานะ */
            .fm-btn {
                background: transparent;
                color: #b5bac1;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 8px;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: background 0.2s ease, color 0.3s ease;
                position: relative;
            }
            .fm-btn:hover { background: #313338; color: #dbdee1; }
            .fm-btn.active { color: #f23f43; }

            /* แอนิเมชันเส้นขีดทับ (ขีดวาดขึ้นมาแบบสมูท) */
            .slash-line {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 28px;
                height: 3px;
                background-color: #f23f43;
                border-radius: 2px;
                border: 3px solid #2b2d31;
                z-index: 10;
                /* หดเส้นให้เป็น 0 และซ่อนไว้ */
                transform: translate(-50%, -50%) rotate(45deg) scaleX(0);
                opacity: 0;
                transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease;
            }
            /* เมื่อ active ให้วาดเส้นออกมา */
            .fm-btn.active .slash-line {
                transform: translate(-50%, -50%) rotate(45deg) scaleX(1);
                opacity: 1;
            }
            .fm-btn:hover .slash-line { border-color: #313338; }
        `;
        document.head.appendChild(style);

        const wrapper = document.createElement("div");
        wrapper.id = "fm-wrapper";
        wrapper.className = "snap-right";
        wrapper.innerHTML = `
            <button id="fm-toggle-btn" title="ลากเพื่อย้าย">
                <span id="fm-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9 10h.01"/><path d="M15 10h.01"/><path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/>
                    </svg>
                </span>
            </button>
            <div id="fm-panel">
                <button class="fm-btn" id="fakeMuteBtn" title="Fake Mute">
                    <div class="slash-line"></div>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                        <line x1="12" y1="19" x2="12" y2="22"></line>
                        <line x1="8" y1="22" x2="16" y2="22"></line>
                    </svg>
                </button>
                <button class="fm-btn" id="fakeDeafenBtn" title="Fake Deafen">
                    <div class="slash-line"></div>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"></path>
                    </svg>
                </button>
            </div>
        `;
        document.body.appendChild(wrapper);

        const btn = document.getElementById("fm-toggle-btn");
        const muteBtn = document.getElementById("fakeMuteBtn");
        const deafenBtn = document.getElementById("fakeDeafenBtn");

        let isDragging = false;
        let startX, startY, initialLeft, initialTop;
        let hoverTimeout;

        const updateButtons = () => {
            spoofMute ? muteBtn.classList.add("active") : muteBtn.classList.remove("active");
            spoofDeafen ? deafenBtn.classList.add("active") : deafenBtn.classList.remove("active");
        };

        muteBtn.onclick = () => { spoofMute = !spoofMute; updateButtons(); };
        deafenBtn.onclick = () => { spoofDeafen = !spoofDeafen; updateButtons(); };

        // --- ระบบ Hover เปิด/ปิด เมนู ---
        wrapper.addEventListener("mouseenter", () => {
            if (!isDragging) {
                clearTimeout(hoverTimeout);
                wrapper.classList.add("menu-open");
            }
        });

        wrapper.addEventListener("mouseleave", () => {
            hoverTimeout = setTimeout(() => {
                wrapper.classList.remove("menu-open");
            }, 150); // เพิ่มดีเลย์นิดหน่อยให้ลากเมาส์ไปหาเมนูได้สมูท ไม่ดับกลางทาง
        });

        // --- ระบบ Drag & Snap ---
        btn.addEventListener("mousedown", (e) => {
            if (e.button !== 0) return;
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;

            // ปิดเมนูชั่วคราวตอนเริ่มลาก
            wrapper.classList.remove("menu-open");

            initialLeft = wrapper.getBoundingClientRect().left;
            initialTop = wrapper.getBoundingClientRect().top;

            wrapper.style.left = `${initialLeft}px`;
            wrapper.style.top = `${initialTop}px`;
            wrapper.style.transform = "none";
            wrapper.classList.add("dragging");
        });

        window.addEventListener("mousemove", (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            wrapper.style.left = `${initialLeft + dx}px`;
            wrapper.style.top = `${initialTop + dy}px`;
        });

        window.addEventListener("mouseup", () => {
            if (!isDragging) return;
            isDragging = false;
            wrapper.classList.remove("dragging");

            const rect = wrapper.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const w = window.innerWidth;
            const h = window.innerHeight;

            let finalTop = Math.max(0, Math.min(rect.top, h - rect.height));
            wrapper.style.top = `${finalTop}px`;

            if (centerX < w / 2) {
                wrapper.classList.remove("snap-right");
                wrapper.classList.add("snap-left");
                wrapper.style.left = "0px";
            } else {
                wrapper.classList.remove("snap-left");
                wrapper.classList.add("snap-right");
                wrapper.style.left = `${w - 44}px`;
            }
        });

        window.addEventListener("resize", () => {
            if (wrapper.classList.contains("snap-right")) {
                wrapper.style.left = `${window.innerWidth - 44}px`;
            }
            const rect = wrapper.getBoundingClientRect();
            let finalTop = Math.max(0, Math.min(rect.top, window.innerHeight - rect.height));
            wrapper.style.top = `${finalTop}px`;
        });

        setTimeout(() => {
            wrapper.style.transform = "none";
            const rect = wrapper.getBoundingClientRect();
            wrapper.style.top = `${rect.top}px`;
            wrapper.style.left = `${window.innerWidth - 44}px`;
        }, 100);
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initUI);
    } else {
        initUI();
    }
})();
