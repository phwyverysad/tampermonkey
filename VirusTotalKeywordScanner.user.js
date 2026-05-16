// ==UserScript==
// @name         VirusTotal Keyword Scanner (Draggable UI & Top Notification)
// @namespace    http://tampermonkey.net/
// @version      5.3
// @description  สแกนคีย์เวิร์ดมัลแวร์ แจ้งเตือนด้านบนจอ พร้อมปุ่ม View Intel Report แบบเต็มๆ
// @author       Gemini & User (UI by Assistant)
// @match        https://www.virustotal.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // ฐานข้อมูลมัลแวร์และคีย์เวิร์ด
    const malwareDb = {
        'PYTHON': 'Scripting Language: มักถูกใช้รันโค้ดอันตรายผ่าน Packer เช่น PyInstaller เพื่อหลบเลี่ยงการสแกนแบบ Static',
        'PY': 'Python Script: ไฟล์สคริปต์ภาษา Python ที่แฮ็กเกอร์มักใช้เขียนโค้ดมุ่งร้าย',
        'EXPIRO': 'File Infector: ไวรัสอันตรายที่แพร่กระจายโดยการเกาะไฟล์ .EXE และขโมยข้อมูลผู้ใช้ส่งกลับไปยัง C2',
        'REDLINE': 'Stealer: ขโมยรหัสผ่าน, คุกกี้เบราว์เซอร์, ข้อมูลบัตรเครดิต และกระเป๋าเงินคริปโต',
        'AGENTTESLA': 'Spyware: เน้นบันทึกการพิมพ์ (Keylogger) และขโมยข้อมูลจากอีเมล, FTP, และ Web Browser',
        'LUMMA': 'Stealer: มัลแวร์สมัยใหม่ที่ออกแบบมาเพื่อขโมย Browser Extension และรหัส 2FA โดยเฉพาะ',
        'RACCOON': 'Stealer: มัลแวร์ยอดนิยมที่ขโมยข้อมูลแบบครอบคลุม มักแพร่กระจายผ่านโฆษณาปลอม (Malvertising)',
        'VIDAR': 'Stealer/Spyware: ดึงข้อมูลประวัติการใช้งาน (History) และเอกสารสำคัญในเครื่องเหยื่อ',
        'ASYNCRAT': 'Remote Access Trojan: ควบคุมเครื่องระยะไกล สั่งรันคำสั่ง และเปิดกล้อง/ไมโครโฟนได้',
        'REMCOS': 'RAT: เครื่องมือควบคุมระยะไกลเกรดพาณิชย์ที่มักถูกใช้สอดแนมและขโมยข้อมูลสำคัญ',
        'QUASAR': 'RAT: มัลแวร์โอเพนซอร์สที่ถูกดัดแปลงมาเพื่อใช้เจาะระบบเครือข่ายภายในองค์กร',
        'XWORM': 'RAT/Botnet: สามารถแพร่กระจายผ่าน USB, สั่งยิง DDoS และดาวน์โหลดมัลแวร์ตัวอื่นมาลงเพิ่ม',
        'VENOMRAT': 'RAT: พัฒนาจาก Quasar โดยเพิ่มฟีเจอร์การขโมยข้อมูลและการขุดเหรียญคริปโต',
        'WARZONE': 'RAT: มีความสามารถสูงในการ Bypass UAC (สิทธิ์แอดมิน) และขโมยรหัสผ่านเบราว์เซอร์',
        'DARKCOMET': 'Legacy RAT: มัลแวร์ควบคุมเครื่องรุ่นเก่าที่ยังคงถูกใช้อยู่ในการโจมตีแบบไม่ซับซ้อน',
        'LOCKBIT': 'Ransomware: ไวรัสเรียกค่าไถ่ที่มีความเร็วในการเข้ารหัสไฟล์สูงและทำลายระบบ Backup',
        'STOP': 'Ransomware: มักติดมากับไฟล์ Crack เกม/ซอฟต์แวร์ จะเข้ารหัสไฟล์เป็นนามสกุล .djvu',
        'WANNACRY': 'Ransomware: แพร่กระจายผ่านช่องโหว่ SMB (EternalBlue) ในเครือข่ายอัตโนมัติ',
        'CONTI': 'Ransomware Group: กลุ่มมัลแวร์เรียกค่าไถ่ระดับองค์กรที่มีความซับซ้อนสูง',
        'PHOBOS': 'Ransomware: มักโจมตีผ่านช่องโหว่ RDP (Remote Desktop) เพื่อเข้าล็อกไฟล์ในเซิร์ฟเวอร์',
        'XMRIG': 'Miner: แอบใช้พลังประมวลผล (CPU) ขุดเหรียญคริปโต ทำให้เครื่องทำงานหนักและร้อน',
        'COBALTSTRIKE': 'Post-Exploitation: เครื่องมือจำลองการโจมตีที่แฮ็กเกอร์ใช้ค้างอยู่ในระบบ (Persistence)',
        'SLIVER': 'C2 Framework: เครื่องมือควบคุมมัลแวร์สมัยใหม่ที่เป็นคู่แข่งของ Cobalt Strike',
        'HAVOC': 'C2 Framework: แพลตฟอร์มควบคุมมัลแวร์รุ่นใหม่ที่เน้นการหลบเลี่ยง EDR/Antivirus',
        'PYINSTALLER': 'Packer: การรวมสคริปต์ Python เป็นไฟล์ .exe (นิยมใช้ซ่อนโค้ดอันตรายให้ตรวจจับยาก)',
        'EMOTET': 'Botnet/Dropper: มัลแวร์ตัวนำทางที่ใช้แพร่กระจาย Ransomware และ Trojan ตัวอื่นๆ',
        'TRICKBOT': 'Modular Trojan: เน้นขโมยข้อมูลธนาคารและช่วยแพร่กระจายมัลแวร์เรียกค่าไถ่ Ryuk',
        'QAKBOT': 'Banking Trojan: มักแฝงมากับไฟล์เอกสารในอีเมล เพื่อขโมยข้อมูลการเงินในองค์กร',
        'INJECTOR': 'Malware Component: โค้ดที่ใช้ฉีดมัลแวร์เข้าไปในโปรเซสที่ปลอดภัยเพื่อพรางตัว',
        'SHELLCODE': 'Exploit Payload: ชุดคำสั่งขนาดเล็กที่รันในหน่วยความจำเพื่อเริ่มการโจมตีระบบ',
        'DROPPER': 'Loader: มัลแวร์เริ่มต้นที่ทำหน้าที่ดาวน์โหลดและติดตั้งมัลแวร์ตัวจริงลงในเครื่อง',
        'DLLINJECT': 'Injection Technique: เทคนิคการฉีดโค้ดอันตรายเข้าไปใน Process ที่ทำงานอยู่เพื่อขโมยข้อมูลหรือพรางตัว',
        'HOOKING': 'Malware Technique: การดักจับการทำงานของ API ของระบบปฏิบัติการเพื่อแก้ไขข้อมูลหรืออ่านค่าคีย์บอร์ด',
        'ROOTKIT': 'Persistence: ซอฟต์แวร์ที่ออกแบบมาเพื่อซ่อนการมีอยู่ของมัลแวร์จากระบบปฏิบัติการและโปรแกรม Antivirus',
        'KEYLOGGER': 'Spyware: ฟังก์ชันดักจับทุกการกดคีย์บอร์ดเพื่อขโมยรหัสผ่านและข้อความสนทนา',
        'STAGER': 'Payload Loader: โค้ดส่วนแรกที่แฮ็กเกอร์ส่งมาเพื่อเตรียมสภาวะแวดล้อมก่อนดาวน์โหลดมัลแวร์หลัก',
        'CRYPTER': 'Obfuscation: ซอฟต์แวร์ที่ใช้เข้ารหัสไฟล์มัลแวร์เพื่อหลบเลี่ยงการตรวจจับแบบ Signature-based',
        'ANTI-VM': 'Evasion: โค้ดที่ตรวจสอบว่ากำลังรันอยู่ในระบบจำลอง (Sandbox) หรือไม่ หากใช่ จะไม่ทำงานเพื่อเลี่ยงการวิเคราะห์',
        'POWERSHELL': 'Living-off-the-land: ใช้เครื่องมือ Windows ในการโจมตี (Fileless Malware) เพื่อเลี่ยงการเขียนไฟล์ลง Disk',
        'WMI': 'Persistence: การใช้ Windows Management Instrumentation เพื่อรันมัลแวร์โดยไม่ทิ้งร่องรอยใน Registry ปกติ',
        'EXPLOIT': 'Vulnerability: โค้ดที่ใช้โจมตีช่องโหว่ของซอฟต์แวร์เพื่อยกระดับสิทธิ์ (Privilege Escalation)',
        'SPYWARE': 'Data Theft: มัลแวร์ที่เน้นการสอดแนม ขโมยภาพหน้าจอ, ไมโครโฟน และไฟล์ข้อมูลส่วนตัว',
        'RANSOM': 'Encryption: รูปแบบพฤติกรรมการเข้ารหัสไฟล์เพื่อเรียกค่าไถ่',
        'RANSOMWARE': 'Encryption: ไวรัสเรียกค่าไถ่ที่ทำการเข้ารหัสไฟล์เพื่อเรียกร้องเงินจากเหยื่อ',
        'PHISHING': 'Social Engineering: การหลอกลวงให้ผู้ใช้กรอกข้อมูลสำคัญผ่านการปลอมแปลงหน้าเว็บหรืออีเมล',
        'TROJAN': 'Malware: โปรแกรมที่แฝงตัวเป็นซอฟต์แวร์ปกติ แต่แอบทำงานอันตรายอยู่ด้านหลัง',
        'BACKDOOR': 'Persistence: เปิดช่องทางพิเศษให้แฮ็กเกอร์สามารถแอบเข้ามาควบคุมเครื่องได้ตลอดเวลา',
        'WORM': 'Malware: ไวรัสกระจายตัวผ่านเครือข่ายอัตโนมัติโดยหาท่อเชื่อมโยง (SMB, RDP)',
        'BOTNET': 'Network: คอมพิวเตอร์ซอมบี้ ถูกโปรแกรมให้ซิงค์รับคำสั่งจากเซิร์ฟเวอร์เพื่องานมุ่งร้าย',
        'ADWARE': 'Malware: ฝังโฆษณา แอบโหลดสคริปต์ และเปลี่ยนการตั้งค่าเบราว์เซอร์',
        'VBE': 'Script: สคริปต์ VBScript ห่อหุ้มที่มักเอาไว้ดาวน์โหลด Ransomware หรือ RAT',
        'MACRO': 'Document Malware: โค้ดไวรัส VBA ที่ติดมากับไฟลล์อย่างเอกสารแนบ',
        'OBFUSCATION': 'Evasion: ทำโค้ดให้สับสน อ่านยาก ยืดรหัสป้องกัน EDR ตรวจจับ',
        'C2': 'Command and Control: หัวใจส่วนเซิร์ฟเวอร์ที่รวบรวมไฟล์ที่แอบขโมยไปและบงการมัลแวร์',
        'PACKER': 'Evasion: เทคนิคบีบอัดตัวร้ายให้เปลี่ยนจากแฮชเดิม ไม่ซ้ำรหัสเพื่อเลี่ยงของเก่า',
        'CREDENTIAL': 'Data Theft: เน้นค้นคลังรหัสผ่าน ล็อกอินเบราว์เซอร์ ข้อมูลบัตรเครดิต',
        'MALICIOUS': 'Verdict: การประเมินผลจากระบบ Antivirus หรือ Sandbox ว่าไฟล์/URL นี้เป็นอันตรายและมุ่งร้ายอย่างชัดเจน',
        'SUSPICIOUS': 'Verdict: การประเมินผลว่าไฟล์/URL นี้มีพฤติกรรมน่าสงสัยหรือผิดปกติ แต่อาจยังไม่ชัดเจนพอที่จะระบุว่าเป็นมัลแวร์ 100%',
        'DLL': 'Library: Dynamic-link library ที่มักถูกมัลแวร์ใช้เทคนิค DLL Hijacking เพื่อแทรกซึมเข้าสู่โปรเซสปกติ',
        'INJECTION': 'Technique: พฤติกรรมการฉีดโค้ดอันตรายเข้าไปในหน่วยความจำของโปรแกรมอื่นเพื่อซ่อนตัวจากการตรวจจับ',
        'EXE': 'Executable: ไฟล์โปรแกรมหลักบนระบบ Windows ซึ่งเป็นรูปแบบไฟล์ที่มัลแวร์นิยมใช้มากที่สุด',
        'BAT': 'Batch Script: ไฟล์สคริปต์คำสั่ง มักถูกใช้ในขั้นตอนแรกๆ ของการโจมตีเพื่อโหลดมัลแวร์ตัวหลัก หรือปิดระบบป้องกัน',
        'CMD': 'Command Line Script: สคริปต์คำสั่งคล้าย BAT มักถูกมัลแวร์ใช้เพื่อประมวลผลคำสั่งอันตรายในระบบ',
        'VBS': 'VBScript: สคริปต์ Windows ที่แฮ็กเกอร์นิยมส่งแนบมากับอีเมลเพื่อดาวน์โหลดมัลแวร์ลงเครื่อง',
        'PS1': 'PowerShell Script: มักถูกนำมาใช้โจมตีแบบ Fileless (ไม่เขียนไฟล์ลงดิสก์) เพื่อความแนบเนียนขั้นสูง',
        'SCR': 'Screensaver: ไฟล์สกรีนเซฟเวอร์ของ Windows ซึ่งแท้จริงแล้วคือไฟล์ EXE รูปแบบหนึ่งที่มักถูกใช้หลอกผู้ใช้',
        'HTA': 'HTML Application: ไฟล์แอปพลิเคชันเว็บที่รันนอกเบราว์เซอร์ มักถูกใช้เป็น Dropper เพื่อโหลดมัลแวร์'
    };

    const malwareList = Object.keys(malwareDb);
    malwareList.sort((a, b) => b.length - a.length);
    const regex = new RegExp(`\\b(${malwareList.join('|')})\\b`, 'gi');

    let foundMalwareSet = new Set();
    let count = 0;
    let toastTimeout;

    // ระบบแจ้งเตือนด้านบน (Toast Notification) ปรับ UI ใหม่
    function showTopToast(count) {
        let toast = document.getElementById('vt-top-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'vt-top-toast';
            document.body.appendChild(toast);
        }

        if (count > 0) {
            toast.className = 'vt-toast-danger';
            toast.innerHTML = `
                <div class="vt-toast-header">
                    <div class="vt-toast-info">
                        <div class="vt-toast-icon">🚨</div>
                        <div class="vt-toast-text">
                            <div class="vt-toast-title">ตรวจพบภัยคุกคาม!</div>
                            <div class="vt-toast-desc">พบคำที่น่าสงสัย <b>${count}</b> จุดในหน้านี้</div>
                        </div>
                    </div>
                    <button class="vt-toast-close">&times;</button>
                </div>
                <button id="vt-toast-report-btn">📋 View Intel Report</button>
            `;
            setTimeout(() => {
                document.getElementById('vt-toast-report-btn').onclick = () => {
                    toast.classList.remove('show');
                    showIntel(); // เปิดหน้าต่างใหญ่
                };
                document.querySelector('.vt-toast-close').onclick = () => toast.classList.remove('show');
            }, 50);
        } else {
            toast.className = 'vt-toast-success';
            toast.innerHTML = `
                <div class="vt-toast-header" style="margin-bottom: 0;">
                    <div class="vt-toast-info">
                        <div class="vt-toast-icon">✅</div>
                        <div class="vt-toast-text">
                            <div class="vt-toast-title">สแกนเสร็จสิ้น</div>
                            <div class="vt-toast-desc">ไม่พบภัยคุกคามตามฐานข้อมูล</div>
                        </div>
                    </div>
                    <button class="vt-toast-close">&times;</button>
                </div>
            `;
            setTimeout(() => {
                document.querySelector('.vt-toast-close').onclick = () => toast.classList.remove('show');
            }, 50);
        }

        // แสดงแอนิเมชันเลื่อนลง
        requestAnimationFrame(() => toast.classList.add('show'));

        // ซ่อนอัตโนมัติหลังจาก 10 วินาที
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 10000);
    }

    // ระบบหน้าต่าง Popup อ่าน Report (Modal ใหญ่)
    function showCustomModal(title, htmlContent) {
        let overlay = document.getElementById('vt-custom-modal-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'vt-custom-modal-overlay';
            overlay.innerHTML = `
                <div id="vt-custom-modal-box">
                    <div id="vt-custom-modal-header">
                        <span id="vt-custom-modal-title"></span>
                        <button id="vt-custom-modal-close">&times;</button>
                    </div>
                    <div id="vt-custom-modal-content"></div>
                </div>
            `;
            document.body.appendChild(overlay);

            document.getElementById('vt-custom-modal-close').onclick = () => overlay.style.display = 'none';
            overlay.onclick = (e) => {
                if (e.target === overlay) overlay.style.display = 'none';
            };
        }

        document.getElementById('vt-custom-modal-title').innerHTML = title;
        document.getElementById('vt-custom-modal-content').innerHTML = htmlContent;
        overlay.style.display = 'flex';
    }

    function findAndHighlight(root) {
        if (!root) return;
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while (node = walker.nextNode()) {
            const parent = node.parentElement;
            if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA'].includes(parent.tagName)) continue;
            if (parent.offsetParent === null) continue;

            const text = node.textContent;
            if (regex.test(text)) {
                const matches = text.match(regex);
                if (matches) {
                    matches.forEach(m => {
                        const upperM = m.toUpperCase();
                        foundMalwareSet.add(upperM);
                    });

                    if (!parent.classList.contains('vt-found')) {
                        parent.style.backgroundColor = '#ffeb3b';
                        parent.style.color = '#000';
                        parent.style.fontWeight = 'bold';
                        parent.style.outline = '3px solid #f44336';
                        parent.classList.add('vt-found');
                        count++;
                    }
                }
            }
            regex.lastIndex = 0;
        }

        const allElements = root.querySelectorAll?.('*') || [];
        allElements.forEach(el => {
            if (el.shadowRoot) findAndHighlight(el.shadowRoot);
        });
    }

    function startScan() {
        count = 0;
        foundMalwareSet.clear();

        const intelBtn = document.getElementById('vt-intel-btn');
        if (intelBtn) intelBtn.style.display = 'none';

        document.querySelectorAll('.vt-found').forEach(el => {
            el.style.backgroundColor = '';
            el.style.outline = '';
            el.style.color = '';
            el.classList.remove('vt-found');
        });

        findAndHighlight(document.body);

        if (count > 0 && foundMalwareSet.size > 0) {
            const firstFound = document.querySelector('.vt-found');
            if (firstFound) {
                firstFound.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            setTimeout(() => {
                if (intelBtn) intelBtn.style.display = 'flex';
                showTopToast(count); // เรียกใช้แจ้งเตือนเล็กด้านบน
            }, 300);

        } else {
            setTimeout(() => {
                showTopToast(0);
            }, 100);
        }
    }

    function showIntel() {
        let htmlContent = "";

        if (foundMalwareSet.size === 0) {
            htmlContent = "<p style='text-align:center; color:#bbb; padding: 20px;'>ไม่พบข้อมูลมัลแวร์จากการสแกนครั้งล่าสุด</p>";
        } else {
            const sortedResults = Array.from(foundMalwareSet).sort();
            htmlContent += '<ul style="list-style-type: none; padding: 0; margin: 0;">';

            sortedResults.forEach(name => {
                let desc = malwareDb[name];
                if (desc) {
                    htmlContent += `
                    <li style="margin-bottom: 15px; border-bottom: 1px solid #333; padding-bottom: 10px;">
                        <div style="color: #ff5252; font-weight: bold; font-size: 16px; margin-bottom: 5px;">[!] ${name}</div>
                        <div style="color: #ddd; font-size: 14px; line-height: 1.5;">ℹ️ ${desc}</div>
                    </li>`;
                }
            });
            htmlContent += '</ul>';
        }

        showCustomModal('📋 บทสรุปข้อมูลภัยคุกคาม (Threat Intel)', htmlContent);
    }

    const initUI = () => {
        const style = document.createElement("style");
        style.innerHTML = `
            /* สไตล์สำหรับแจ้งเตือนด้านบนจอ (Toast) */
            #vt-top-toast {
                position: fixed; top: 20px; left: 50%; transform: translate(-50%, -150%);
                background: #1e1e1e; color: #fff; padding: 15px 20px; border-radius: 10px;
                box-shadow: 0 8px 30px rgba(0,0,0,0.8); z-index: 99999999;
                display: flex; flex-direction: column;
                transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                border: 1px solid #333; min-width: 320px;
            }
            #vt-top-toast.show { transform: translate(-50%, 0); }
            #vt-top-toast.vt-toast-danger { border-left: 6px solid #f44336; }
            #vt-top-toast.vt-toast-success { border-left: 6px solid #4caf50; }

            .vt-toast-header {
                display: flex; justify-content: space-between; align-items: flex-start;
                margin-bottom: 12px; width: 100%;
            }
            .vt-toast-info { display: flex; align-items: center; gap: 15px; }
            .vt-toast-icon { font-size: 26px; }
            .vt-toast-text { flex-grow: 1; }
            .vt-toast-title { font-weight: bold; font-size: 16px; margin-bottom: 3px; }
            .vt-toast-desc { font-size: 14px; color: #ccc; }

            #vt-toast-report-btn {
                background: linear-gradient(135deg, #1976d2, #0d47a1);
                color: white; border: none; padding: 10px 15px; border-radius: 6px;
                cursor: pointer; font-weight: bold; font-size: 14px; width: 100%;
                box-shadow: 0 4px 10px rgba(25, 118, 210, 0.3); transition: transform 0.2s;
            }
            #vt-toast-report-btn:hover { transform: translateY(-2px); }

            .vt-toast-close {
                background: none; border: none; color: #888; font-size: 24px; cursor: pointer;
                padding: 0; margin: 0; line-height: 1; height: 24px;
            }
            .vt-toast-close:hover { color: #fff; }

            /* สไตล์สำหรับเมนูลากได้ */
            #vt-wrapper {
                position: fixed; z-index: 999999; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                width: 60px; height: 60px; top: 50%; left: calc(100vw - 60px);
                transform: translateY(-50%); transition: left 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), top 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
            }
            #vt-wrapper.dragging { transition: none !important; }

            #vt-toggle-btn {
                background: #1e1e1e; border: 3px solid #d32f2f; width: 100%; height: 100%; border-radius: 50%;
                cursor: grab; font-size: 28px; box-shadow: 0 4px 15px rgba(0,0,0,0.5);
                display: flex; align-items: center; justify-content: center; position: relative; z-index: 2;
                transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), background 0.2s ease, border-color 0.2s ease;
                user-select: none;
            }
            #vt-toggle-btn:active { cursor: grabbing; }
            #vt-toggle-btn:hover { background: #2a2a2a; border-color: #f44336; }

            #vt-icon { display: inline-block; transition: transform 0.3s ease; }
            #vt-wrapper.menu-open #vt-icon { transform: scale(1.1); }

            .snap-right #vt-toggle-btn { transform: translateX(35px); }
            .snap-right:hover #vt-toggle-btn, .snap-right.menu-open #vt-toggle-btn { transform: translateX(0); }
            .snap-left #vt-toggle-btn { transform: translateX(-35px); }
            .snap-left:hover #vt-toggle-btn, .snap-left.menu-open #vt-toggle-btn { transform: translateX(0); }

            #vt-panel {
                position: absolute; top: 50%; background: #1a1c23; border: 1px solid #333; padding: 15px;
                border-radius: 12px; box-shadow: 0 8px 25px rgba(0,0,0,0.6); width: 220px; opacity: 0; pointer-events: none;
                transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); transform: translateY(-50%) scale(0.8); z-index: 1;
            }

            .snap-right #vt-panel { right: 75px; left: auto; transform-origin: right center; }
            .snap-left #vt-panel { left: 75px; right: auto; transform-origin: left center; }

            #vt-wrapper.menu-open #vt-panel { opacity: 1; pointer-events: auto; transform: translateY(-50%) scale(1); }

            .vt-title {
                font-weight: 800; font-size: 15px; margin-bottom: 12px; color: #fff;
                text-align: center; border-bottom: 2px solid #444; padding-bottom: 10px; letter-spacing: 0.5px;
            }

            .vt-btn {
                width: 100%; color: white; border: none; padding: 10px 15px; margin-bottom: 10px;
                border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: bold;
                transition: all 0.2s ease; display: flex; align-items: center; justify-content: center; gap: 8px;
            }
            .vt-btn:last-child { margin-bottom: 0; }

            #vt-scan-btn { background: linear-gradient(135deg, #d32f2f, #b71c1c); box-shadow: 0 4px 10px rgba(211, 47, 47, 0.3); }
            #vt-scan-btn:hover { background: linear-gradient(135deg, #f44336, #d32f2f); transform: translateY(-2px); }

            #vt-intel-btn { background: linear-gradient(135deg, #1976d2, #0d47a1); box-shadow: 0 4px 10px rgba(25, 118, 210, 0.3); }
            #vt-intel-btn:hover { background: linear-gradient(135deg, #2196f3, #1976d2); transform: translateY(-2px); }

            /* สไตล์สำหรับ Custom Modal (อ่าน Report หน้าต่างใหญ่) */
            #vt-custom-modal-overlay {
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(0, 0, 0, 0.75); backdrop-filter: blur(3px);
                z-index: 9999999; display: none; align-items: center; justify-content: center;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            #vt-custom-modal-box {
                background: #1e1e1e; width: 500px; max-width: 90%; max-height: 80vh;
                border-radius: 10px; border: 1px solid #444; box-shadow: 0 10px 40px rgba(0,0,0,0.8);
                display: flex; flex-direction: column; overflow: hidden;
            }
            #vt-custom-modal-header {
                background: #2a2a2a; padding: 15px 20px; display: flex;
                justify-content: space-between; align-items: center; border-bottom: 1px solid #444;
            }
            #vt-custom-modal-title { color: #fff; font-size: 18px; font-weight: bold; margin: 0; }
            #vt-custom-modal-close {
                background: none; border: none; color: #aaa; font-size: 28px;
                cursor: pointer; line-height: 1; margin: 0; padding: 0; transition: color 0.2s;
            }
            #vt-custom-modal-close:hover { color: #f44336; }
            #vt-custom-modal-content {
                padding: 20px; color: #eee; overflow-y: auto; font-size: 15px; flex-grow: 1;
            }
            #vt-custom-modal-content::-webkit-scrollbar { width: 8px; }
            #vt-custom-modal-content::-webkit-scrollbar-track { background: #1e1e1e; }
            #vt-custom-modal-content::-webkit-scrollbar-thumb { background: #555; border-radius: 4px; }
            #vt-custom-modal-content::-webkit-scrollbar-thumb:hover { background: #777; }
        `;
        document.head.appendChild(style);

        const wrapper = document.createElement("div");
        wrapper.id = "vt-wrapper";
        wrapper.className = "snap-right";
        wrapper.innerHTML = `
            <button id="vt-toggle-btn" title="Drag to move">
                <span id="vt-icon">🛡️</span>
            </button>
            <div id="vt-panel">
                <div class="vt-title">VT Keyword Scanner</div>
                <button class="vt-btn" id="vt-scan-btn">🔍 Deep Scan</button>
                <button class="vt-btn" id="vt-intel-btn" style="display: none;">📋 View Intel Report</button>
            </div>
        `;
        document.body.appendChild(wrapper);

        const btn = document.getElementById("vt-toggle-btn");
        const scanBtn = document.getElementById("vt-scan-btn");
        const intelBtn = document.getElementById("vt-intel-btn");

        scanBtn.onclick = () => { startScan(); wrapper.classList.remove("menu-open"); };
        intelBtn.onclick = () => { showIntel(); wrapper.classList.remove("menu-open"); };

        let isDragging = false;
        let isMoved = false;
        let startX, startY, initialLeft, initialTop;

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
                wrapper.style.left = `${w - 60}px`;
            }
        });

        window.addEventListener("resize", () => {
            if (wrapper.classList.contains("snap-right")) {
                wrapper.style.left = `${window.innerWidth - 60}px`;
            }
            const rect = wrapper.getBoundingClientRect();
            let finalTop = Math.max(0, Math.min(rect.top, window.innerHeight - rect.height));
            wrapper.style.top = `${finalTop}px`;
        });

        btn.addEventListener("click", () => {
            if (isMoved) return;
            wrapper.classList.toggle("menu-open");
        });

        document.addEventListener("click", (e) => {
            if (wrapper.classList.contains("menu-open") && !wrapper.contains(e.target)) {
                wrapper.classList.remove("menu-open");
            }
        });

        setTimeout(() => {
            wrapper.style.transform = "none";
            const rect = wrapper.getBoundingClientRect();
            wrapper.style.top = `${rect.top}px`;
            wrapper.style.left = `${window.innerWidth - 60}px`;
        }, 100);
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initUI);
    } else {
        initUI();
    }
})();
