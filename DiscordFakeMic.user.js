// ==UserScript==
// @name         Discord Fake Mute/Deafen (Draggable & Click Outside)
// @namespace    http://tampermonkey.net/
// @version      2.2
// @description  เมนูปลอม Mute/Deafen ลากได้ ดูดติดขอบ และคลิกพื้นที่ว่างเพื่อปิดเมนูได้
// @author       You
// @match        *://*.discord.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(() => {
    'use strict';

    let spoofMute = false;
    let spoofDeafen = false;

    // 1. ดักจับ WebSocket ปลอมสถานะ
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

    // 2. สร้าง UI เมื่อโหลดเสร็จ
    const initUI = () => {
        const style = document.createElement("style");
        style.innerHTML = `
            #fm-wrapper {
                position: fixed;
                z-index: 99999;
                font-family: 'gg sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
                width: 50px;
                height: 50px;
                top: 50%;
                left: calc(100vw - 50px);
                transform: translateY(-50%);
                transition: left 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), top 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
            }
            #fm-wrapper.dragging {
                transition: none !important;
            }

            #fm-toggle-btn {
                background: #5865F2;
                color: white;
                border: none;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                cursor: grab;
                font-size: 24px;
                box-shadow: 0 4px 10px rgba(0,0,0,0.4);
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                z-index: 2;
                transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), background 0.2s ease;
                user-select: none;
            }
            #fm-toggle-btn:active { cursor: grabbing; }
            #fm-toggle-btn:hover { background: #4752c4; }

            /* แอนิเมชันหมุนไอคอนฟันเฟือง */
            #fm-icon {
                display: inline-block;
                transition: transform 0.3s ease;
            }
            #fm-wrapper.menu-open #fm-icon {
                transform: rotate(90deg);
            }

            /* --- ระบบซ่อนขอบจอ --- */
            .snap-right #fm-toggle-btn { transform: translateX(25px); }
            .snap-right:hover #fm-toggle-btn, .snap-right.menu-open #fm-toggle-btn { transform: translateX(0); }
            .snap-left #fm-toggle-btn { transform: translateX(-25px); }
            .snap-left:hover #fm-toggle-btn, .snap-left.menu-open #fm-toggle-btn { transform: translateX(0); }

            #fm-panel {
                position: absolute;
                top: 50%;
                background: #313338;
                border: 1px solid #1e1f22;
                padding: 15px;
                border-radius: 8px;
                color: white;
                box-shadow: 0 4px 15px rgba(0,0,0,0.5);
                width: 200px;
                opacity: 0;
                pointer-events: none;
                transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                transform: translateY(-50%) scale(0.8);
                z-index: 1;
            }

            /* ตำแหน่ง Panel ซ้าย/ขวา */
            .snap-right #fm-panel { right: 60px; left: auto; transform-origin: right center; }
            .snap-left #fm-panel { left: 60px; right: auto; transform-origin: left center; }

            #fm-wrapper.menu-open #fm-panel {
                opacity: 1;
                pointer-events: auto;
                transform: translateY(-50%) scale(1);
            }

            .fm-title {
                font-weight: 800;
                font-size: 14px;
                margin-bottom: 12px;
                color: #f2f3f5;
                text-align: center;
                border-bottom: 1px solid #404249;
                padding-bottom: 8px;
            }
            .fm-btn {
                width: 100%;
                background: #4e5058;
                color: white;
                border: none;
                padding: 8px 12px;
                margin-bottom: 8px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 600;
                transition: all 0.2s ease;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .fm-btn:last-child { margin-bottom: 0; }
            .fm-btn:hover { background: #6d6f78; }
            .fm-btn.active { background: #ed4245; }
            .fm-btn.active:hover { background: #c9383b; }
        `;
        document.head.appendChild(style);

        const wrapper = document.createElement("div");
        wrapper.id = "fm-wrapper";
        wrapper.className = "snap-right";
        wrapper.innerHTML = `
            <button id="fm-toggle-btn" title="Drag me!">
                <span id="fm-icon">⚙️</span>
            </button>
            <div id="fm-panel">
                <div class="fm-title">🎭 Fake Status</div>
                <button class="fm-btn" id="fakeMuteBtn">
                    <span>🎤 Mute</span><span class="status-text">OFF</span>
                </button>
                <button class="fm-btn" id="fakeDeafenBtn">
                    <span>🎧 Deafen</span><span class="status-text">OFF</span>
                </button>
            </div>
        `;
        document.body.appendChild(wrapper);

        const btn = document.getElementById("fm-toggle-btn");
        const muteBtn = document.getElementById("fakeMuteBtn");
        const deafenBtn = document.getElementById("fakeDeafenBtn");

        let isDragging = false;
        let isMoved = false;
        let startX, startY, initialLeft, initialTop;

        const updateButtons = () => {
            muteBtn.querySelector(".status-text").textContent = spoofMute ? "ON" : "OFF";
            deafenBtn.querySelector(".status-text").textContent = spoofDeafen ? "ON" : "OFF";
            spoofMute ? muteBtn.classList.add("active") : muteBtn.classList.remove("active");
            spoofDeafen ? deafenBtn.classList.add("active") : deafenBtn.classList.remove("active");
        };

        muteBtn.onclick = () => { spoofMute = !spoofMute; updateButtons(); };
        deafenBtn.onclick = () => { spoofDeafen = !spoofDeafen; updateButtons(); };

        // --- ระบบ Drag & Snap ---
        btn.addEventListener("mousedown", (e) => {
            if (e.button !== 0) return;
            isDragging = true;
            isMoved = false;
            startX = e.clientX;
            startY = e.clientY;

            wrapper.style.transform = "none";
            initialLeft = wrapper.getBoundingClientRect().left;
            initialTop = wrapper.getBoundingClientRect().top;

            wrapper.style.left = `${initialLeft}px`;
            wrapper.style.top = `${initialTop}px`;
            wrapper.classList.add("dragging");
        });

        window.addEventListener("mousemove", (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            if (Math.abs(dx) > 3 || Math.abs(dy) > 3) isMoved = true;

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
                wrapper.style.left = `${w - 50}px`;
            }
        });

        window.addEventListener("resize", () => {
            if (wrapper.classList.contains("snap-right")) {
                wrapper.style.left = `${window.innerWidth - 50}px`;
            }
            const rect = wrapper.getBoundingClientRect();
            let finalTop = Math.max(0, Math.min(rect.top, window.innerHeight - rect.height));
            wrapper.style.top = `${finalTop}px`;
        });

        // --- การกดเปิด-ปิด เมนู ---
        btn.addEventListener("click", () => {
            if (isMoved) return; // ถ้าลากอยู่ ไม่ให้เปิดเมนู
            wrapper.classList.toggle("menu-open");
        });

        // ⭐ ไฮไลต์ฟีเจอร์ใหม่: คลิกพื้นที่ว่างเพื่อปิดเมนู
        document.addEventListener("click", (e) => {
            // เช็คว่าเมนูเปิดอยู่ไหม และ เช็คว่าจุดที่คลิก ไม่ได้อยู่ในกรอบของปุ่ม/เมนู
            if (wrapper.classList.contains("menu-open") && !wrapper.contains(e.target)) {
                wrapper.classList.remove("menu-open");
            }
        });

        setTimeout(() => {
            wrapper.style.transform = "none";
            const rect = wrapper.getBoundingClientRect();
            wrapper.style.top = `${rect.top}px`;
            wrapper.style.left = `${window.innerWidth - 50}px`;
        }, 100);
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initUI);
    } else {
        initUI();
    }
})();