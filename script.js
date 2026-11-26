/* =========================================================
   PROJECTS — edit this list to add / remove work.
   format: "h" = horizontal (16:9), "v" = vertical (9:16)
   Folders with no projects automatically show "Coming soon".
========================================================= */

const CLOUD = "https://res.cloudinary.com/jzyi3q37/video/upload/";

const PROJECTS = {
    "ai-films": [
        { title: "Milma Paneer POPZ",        client: "Milma",     format: "h",
          vimeo: "1242764184", hash: "8797835090",
          thumb: "https://i.vimeocdn.com/video/2221099673-4bcdb52ab73531ba27c5ba42a4d3e432a4815654ac3218d9e8fb7c8e24909d61-d_900" },
        { title: "Milma Ice Cream — 15s",    client: "Milma",     format: "h", src: "v1791181831/Milma_Icecream_AD_-_15_sec.mp4" },
        { title: "LOA Logo Launch Film",     client: "LOA",       format: "h", src: "v1791182058/LOA_Logo_Launch_Film.mp4" },
        { title: "Potata Bros",              client: "Pran",      format: "v", src: "v1791182084/Pran_Potata_Bros.mp4" },
        { title: "Milma × Tokyo Drift",      client: "Milma",     format: "v", src: "v1791182118/Milma_x_Tokyo_Drift_trend.mp4" },
        { title: "No Flame Favourites",      client: "Milma",     format: "v", src: "v1791182135/Milma_No_Flame_Favourites.mp4" },
        { title: "Litchi — Father's Day",    client: "Pran",      format: "v", src: "v1791182138/Litchi_Father_s_Day.mp4" },
        { title: "Pran Litchi 02",           client: "Pran",      format: "v", src: "v1791182142/Pran_Litchi_Video_02.mp4" },
        { title: "Milma Yogurt",             client: "Milma",     format: "h", src: "v1791182144/Milma_Yogurt.mp4" },
        { title: "Cold Coffee Café Mocha",   client: "Milma",     format: "h", src: "v1791182147/Milma_Cold_Coffee_Cafe_Mocha.mp4" },
        { title: "Bakrid 2026",              client: "Milma",     format: "v", src: "v1791182149/Milma_Bakrid_2026.mp4" },
        { title: "Milma Bottle",             client: "Milma",     format: "h", src: "v1791182157/Milma_Bottle_Final.mp4" }
    ],
    "motion": [
        { title: "Statue of Liberty",        client: "KT",        format: "v", src: "v1791196411/KT-Statue_of_Liberty_1.mp4" },
        { title: "Colosseum",                client: "KT",        format: "v", src: "v1791196411/KT-Colosseum_1.mp4" },
        { title: "Eiffel Tower",             client: "KT",        format: "v", src: "v1791196412/KT-Eiffel_Tower_1.mp4" }
    ],
    "ads": [],
    "creatives": []
};

/* VIMEO projects: add  vimeo: "VIDEO_ID", hash: "h=VALUE from the embed link" (only for unlisted videos),
   thumb: "thumbnail url" (optional)  instead of src. */

/* Cloudinary thumbnail: frame at 1s, as jpg */
const posterFor = (p) => p.thumb ||
    (p.src ? CLOUD + "so_1,q_auto,w_900/" + p.src.replace(/\.mp4$/i, ".jpg") : "");

const vimeoUrl = (p, extra) =>
    `https://player.vimeo.com/video/${p.vimeo}?${p.hash ? "h=" + p.hash + "&" : ""}${extra}`;

const isTouch = window.matchMedia("(hover: none)").matches;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


/* =========================================================
   INTRO LOADER
========================================================= */

(function loader() {
    const countEl = document.getElementById("loaderCount");
    let n = 0;
    const finish = () => {
        document.body.classList.remove("is-loading");
        document.body.classList.add("is-loaded");
    };
    if (reduceMotion) { finish(); return; }

    const tick = setInterval(() => {
        n += Math.ceil(Math.random() * 9);
        if (n >= 100) { n = 100; clearInterval(tick); setTimeout(finish, 350); }
        if (countEl) countEl.textContent = n;
    }, 45);
})();


/* =========================================================
   SPLIT HERO TITLE INTO LETTERS
========================================================= */

document.querySelectorAll(".split").forEach((el) => {
    const text = el.textContent;
    el.textContent = "";
    [...text].forEach((ch, i) => {
        const s = document.createElement("span");
        s.className = "char";
        s.style.setProperty("--i", i);
        s.textContent = ch === " " ? " " : ch;
        el.appendChild(s);
    });
});


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        menuToggle.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach((a) =>
        a.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("open");
        })
    );
}


/* =========================================================
   NAVBAR HIDE ON SCROLL + PROGRESS BAR
========================================================= */

const navbar = document.querySelector(".navbar");
const progress = document.querySelector(".scroll-progress");
let lastY = 0;

window.addEventListener("scroll", () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

    if (navbar) {
        navbar.classList.toggle("scrolled", y > 40);
        navbar.classList.toggle("hidden", y > lastY && y > 400 && !navLinks.classList.contains("active"));
    }
    lastY = y;
}, { passive: true });


/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursor = document.querySelector(".cursor");
const cursorDot = document.querySelector(".cursor-dot");
const cursorLabel = document.querySelector(".cursor-label");

if (!isTouch && cursor && cursorDot) {
    document.body.classList.add("has-cursor");
    let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;

    window.addEventListener("mousemove", (e) => {
        mx = e.clientX; my = e.clientY;
        cursorDot.style.transform = `translate(${mx}px, ${my}px)`;
    });

    (function loop() {
        cx += (mx - cx) * 0.18;
        cy += (my - cy) * 0.18;
        cursor.style.transform = `translate(${cx}px, ${cy}px)`;
        requestAnimationFrame(loop);
    })();

    document.addEventListener("mouseover", (e) => {
        const t = e.target;
        const card = t.closest(".project-card");
        const link = t.closest("a, button, .skill-item, .software-item");
        cursor.classList.toggle("is-play", !!card);
        cursor.classList.toggle("is-link", !card && !!link);
        cursorLabel.textContent = card ? "PLAY" : "";
    });

    document.addEventListener("mouseleave", () => cursor.classList.add("is-hidden"));
    document.addEventListener("mouseenter", () => cursor.classList.remove("is-hidden"));
}


/* =========================================================
   HERO — SPOTLIGHT FOLLOWS MOUSE + TIMECODE
========================================================= */

const hero = document.querySelector(".hero");

if (hero && !isTouch) {
    hero.addEventListener("mousemove", (e) => {
        const r = hero.getBoundingClientRect();
        hero.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
        hero.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    });
}

const timecode = document.getElementById("timecode");
if (timecode) {
    const start = performance.now();
    const pad = (n) => String(n).padStart(2, "0");
    setInterval(() => {
        const t = (performance.now() - start) / 1000;
        const f = Math.floor((t % 1) * 24);
        const s = Math.floor(t) % 60;
        const m = Math.floor(t / 60) % 60;
        const h = Math.floor(t / 3600);
        timecode.textContent = `${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)}`;
    }, 1000 / 24);
}


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

if (!isTouch) {
    document.querySelectorAll(".magnetic").forEach((el) => {
        el.addEventListener("mousemove", (e) => {
            const r = el.getBoundingClientRect();
            const x = e.clientX - r.left - r.width / 2;
            const y = e.clientY - r.top - r.height / 2;
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
        });
        el.addEventListener("mouseleave", () => (el.style.transform = ""));
    });
}


/* =========================================================
   PROJECT GRID — RENDER + FOLDERS
========================================================= */

const grid = document.getElementById("projectsGrid");
const emptyFolder = document.getElementById("emptyFolder");
const emptyTitle = document.getElementById("emptyTitle");
const folderTitle = document.querySelector(".folder-title");
const folderMeta = document.getElementById("folderMeta");
const folderButtons = document.querySelectorAll(".folder-card");

/* fill folder counts */
folderButtons.forEach((btn) => {
    const list = PROJECTS[btn.dataset.folder] || [];
    btn.querySelector(".folder-count").textContent =
        list.length ? `${list.length} PROJECT${list.length > 1 ? "S" : ""}` : "COMING SOON";
});

function renderFolder(key, name) {
    const list = PROJECTS[key] || [];

    folderTitle.textContent = name;
    folderMeta.textContent = list.length ? `${list.length} REEL${list.length > 1 ? "S" : ""}` : "IN PRODUCTION";

    grid.innerHTML = "";
    grid.classList.remove("swap");
    void grid.offsetWidth;          // restart animation
    grid.classList.add("swap");

    if (!list.length) {
        grid.style.display = "none";
        emptyFolder.style.display = "flex";
        emptyTitle.textContent = name.charAt(0) + name.slice(1).toLowerCase();
        return;
    }

    grid.style.display = "block";
    emptyFolder.style.display = "none";

    /* split into widescreen + reels rows so nothing leaves gaps */
    const groups = [
        { key: "h", label: "16:9 — WIDESCREEN", items: list.filter((p) => p.format !== "v") },
        { key: "v", label: "9:16 — REELS", items: list.filter((p) => p.format === "v") }
    ].filter((g) => g.items.length);

    let n = 0;
    groups.forEach((g) => {
        const wrap = document.createElement("div");
        wrap.className = "reel-group";
        wrap.innerHTML = `<div class="reel-label"><span>${g.label}</span><i></i><span>${g.items.length}</span></div>
                          <div class="reel-grid grid-${g.key}"></div>`;
        grid.appendChild(wrap);
        const target = wrap.querySelector(".reel-grid");
        g.items.forEach((p) => buildCard(p, n++, target));
    });
}

function buildCard(p, i, target) {
        const card = document.createElement("article");
        card.className = `project-card ${p.format === "v" ? "video-vertical" : "video-horizontal"}`;
        card.style.setProperty("--d", `${i * 60}ms`);
        card.tabIndex = 0;
        const media = p.vimeo
            ? `<img class="project-video" src="${posterFor(p)}" alt="${p.title}" loading="lazy">
               <div class="vimeo-preview"></div>`
            : `<video class="project-video" muted loop playsinline preload="none" poster="${posterFor(p)}">
                   <source src="${CLOUD + p.src}" type="video/mp4">
               </video>`;

        card.innerHTML = `
            <div class="project-media">
                ${media}
                <div class="play-badge"><span>▶</span></div>
                <div class="card-index">${String(i + 1).padStart(2, "0")}</div>
                <div class="ai-badge" title="You're watching AI-generated content">✦ AI-GENERATED</div>
            </div>
            <div class="project-info">
                <h4>${p.title}</h4>
                <span>${p.client} — ${p.format === "v" ? "9:16" : "16:9"}</span>
            </div>`;

        /* hover preview (muted) */
        if (!isTouch) {
            const video = card.querySelector("video");
            const vPrev = card.querySelector(".vimeo-preview");
            card.addEventListener("mouseenter", () => {
                card.classList.add("previewing");
                if (video) { video.preload = "auto"; video.play().catch(() => {}); }
                if (vPrev) {
                    vPrev.innerHTML = `<iframe src="${vimeoUrl(p, "background=1&muted=1&autoplay=1&loop=1")}"
                        allow="autoplay; fullscreen" frameborder="0" tabindex="-1"></iframe>`;
                }
            });
            card.addEventListener("mouseleave", () => {
                card.classList.remove("previewing");
                if (video) video.pause();
                if (vPrev) vPrev.innerHTML = "";
            });
        }

        const open = () => openLightbox(p);
        card.addEventListener("click", open);
        card.addEventListener("keydown", (e) => { if (e.key === "Enter") open(); });

        target.appendChild(card);
}

folderButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        folderButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderFolder(btn.dataset.folder, btn.querySelector(".folder-name").textContent.trim());
    });
});

renderFolder("ai-films", "AI FILMS");


/* =========================================================
   LIGHTBOX — full player with sound
========================================================= */

const lightbox = document.querySelector(".lightbox");
const lbStage = document.querySelector(".lightbox-stage");
const lbCaption = document.querySelector(".lightbox-caption");

/* playlist the player steps through: the folder the video belongs to,
   in the same order as on the page (widescreen first, then reels) */
let lbList = [];
let lbIndex = 0;

const orderedFolder = (p) => {
    const list = Object.values(PROJECTS).find((l) => l.includes(p)) || [p];
    return [...list.filter((x) => x.format !== "v"), ...list.filter((x) => x.format === "v")];
};

function showInLightbox(p) {
    const cls = p.format === "v" ? "lb-vertical" : "lb-horizontal";
    lbStage.classList.remove("swap-in");
    void lbStage.offsetWidth;
    lbStage.classList.add("swap-in");

    lbStage.innerHTML = p.vimeo
        ? `<iframe class="lb-frame ${cls}" src="${vimeoUrl(p, "autoplay=1&title=0&byline=0&portrait=0&color=ffde00")}"
                   allow="autoplay; fullscreen; picture-in-picture" allowfullscreen frameborder="0"></iframe>`
        : `<video class="${cls}" controls autoplay playsinline controlsList="nodownload" poster="${posterFor(p)}">
               <source src="${CLOUD + p.src}" type="video/mp4">
           </video>`;
    lbStage.insertAdjacentHTML("beforeend",
        `<div class="ai-badge ai-badge-lg">✦ You're watching AI-generated content</div>`);

    const pad = (n) => String(n).padStart(2, "0");
    lbCaption.innerHTML = `<span class="lb-count">${pad(lbIndex + 1)} / ${pad(lbList.length)}</span>
                           <b>${p.title}</b><span>${p.client}</span>`;

    const single = lbList.length < 2;
    lbPrev.hidden = single;
    lbNext.hidden = single;

    /* when a video finishes, roll on to the next one */
    const v = lbStage.querySelector("video");
    if (v && !single) v.addEventListener("ended", () => stepLightbox(1));
}

function stepLightbox(dir) {
    if (lbList.length < 2) return;
    lbIndex = (lbIndex + dir + lbList.length) % lbList.length;
    showInLightbox(lbList[lbIndex]);
}

function openLightbox(p) {
    lbList = orderedFolder(p);
    lbIndex = Math.max(lbList.indexOf(p), 0);
    showInLightbox(p);
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    document.querySelectorAll(".project-video, .reel-video").forEach((v) => v.pause && v.pause());
}

function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    setTimeout(() => (lbStage.innerHTML = ""), 400);
    const reelV = document.querySelector(".reel-video");
    if (reelV) reelV.play().catch(() => {});
}

const lbPrev = document.querySelector(".lb-prev");
const lbNext = document.querySelector(".lb-next");
lbPrev.addEventListener("click", (e) => { e.stopPropagation(); stepLightbox(-1); });
lbNext.addEventListener("click", (e) => { e.stopPropagation(); stepLightbox(1); });

document.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") stepLightbox(1);
    if (e.key === "ArrowLeft") stepLightbox(-1);
});

/* swipe left / right on phones */
let touchX = null;
lightbox.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
lightbox.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 60) stepLightbox(dx < 0 ? 1 : -1);
    touchX = null;
}, { passive: true });


/* =========================================================
   STAT COUNTERS
========================================================= */

const counterObs = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = +el.dataset.count;
        const t0 = performance.now();
        const dur = 1400;
        (function step(now) {
            const k = Math.min((now - t0) / dur, 1);
            el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
            if (k < 1) requestAnimationFrame(step);
        })(t0);
        obs.unobserve(el);
    });
}, { threshold: 0.6 });

document.querySelectorAll("[data-count]").forEach((el) => counterObs.observe(el));


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealEls = document.querySelectorAll(
    ".section-heading, .folder-card, .about-portrait, .about-lead, .about-text, .experience-item, .software-item, .skill-item, .process-step, .stat, .contact-content > *"
);

revealEls.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.setProperty("--rd", `${(i % 6) * 70}ms`);
});

const revealObs = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealEls.forEach((el) => revealObs.observe(el));


/* =========================================================
   SKILLS — FILL SWEEP FOLLOWS MOUSE DIRECTION
========================================================= */

document.querySelectorAll(".skill-item").forEach((item) => {
    item.addEventListener("mouseenter", (e) => {
        const r = item.getBoundingClientRect();
        item.style.setProperty("--from", e.clientY - r.top < r.height / 2 ? "top" : "bottom");
    });
});


/* =========================================================
   PAUSE BACKGROUND VIDEOS OFF-SCREEN (saves battery)
========================================================= */

const bgVideos = document.querySelectorAll(".hero-video, .toolkit-video, .about-portrait video");
const bgObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
        if (e.isIntersecting) e.target.play().catch(() => {});
        else e.target.pause();
    });
}, { threshold: 0.05 });
bgVideos.forEach((v) => bgObs.observe(v));


/* =========================================================
   MARQUEE PAUSE ON HOVER
========================================================= */

document.querySelectorAll(".marquee-track, .ai-tools-track").forEach((track) => {
    track.addEventListener("mouseenter", () => (track.style.animationPlayState = "paused"));
    track.addEventListener("mouseleave", () => (track.style.animationPlayState = "running"));
});


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});


/* =========================================================
   FOOTER — YEAR + LIVE KERALA TIME
========================================================= */

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const timeEl = document.getElementById("localTime");
function updateTime() {
    if (!timeEl) return;
    const t = new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: true
    });
    timeEl.textContent = `KERALA — ${t.toUpperCase()} IST`;
}
updateTime();
setInterval(updateTime, 30000);


/* =========================================================
   ===============  CREATIVE EXTRAS  ===============
========================================================= */

/* ---------- TEXT SCRAMBLE (hero name + every eyebrow) ---------- */

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+=/<>0123456789";

function scrambleNode(node, delay = 0) {
    const finalText = node.textContent;
    if (!finalText.trim() || reduceMotion) return;
    let frame = 0;
    const total = 22;
    setTimeout(() => {
        const iv = setInterval(() => {
            frame++;
            node.textContent = [...finalText].map((ch, i) => {
                if (ch === " " || ch === "—") return ch;
                return i / finalText.length < frame / total
                    ? ch
                    : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            }).join("");
            if (frame >= total) { clearInterval(iv); node.textContent = finalText; }
        }, 40);
    }, delay);
}

/* hero name scrambles in once the intro ends */
document.querySelectorAll("[data-scramble]").forEach((el) => {
    const run = () => scrambleNode(el.firstChild, 300);
    if (document.body.classList.contains("is-loaded")) run();
    else new MutationObserver((m, o) => {
        if (document.body.classList.contains("is-loaded")) { run(); o.disconnect(); }
    }).observe(document.body, { attributes: true, attributeFilter: ["class"] });
});

/* eyebrows decode as they scroll into view */
const eyebrowObs = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const textNode = [...e.target.childNodes].reverse()
            .find((n) => n.nodeType === 3 && n.textContent.trim());
        if (textNode) scrambleNode(textNode, 150);
        obs.unobserve(e.target);
    });
}, { threshold: 1 });
document.querySelectorAll(".eyebrow").forEach((el) => eyebrowObs.observe(el));


/* ---------- HERO PARALLAX + LETTERBOX ON SCROLL ---------- */

const heroContent = document.querySelector(".hero-content");
const heroVideo = document.querySelector(".hero-video");
/* after the intro zoom finishes, let scroll drive the video scale smoothly */
setTimeout(() => { if (heroVideo) heroVideo.style.transition = "transform 0.15s linear"; }, 4500);

window.addEventListener("scroll", () => {
    if (!hero || reduceMotion) return;
    const k = Math.min(window.scrollY / hero.offsetHeight, 1);
    if (heroContent) {
        heroContent.style.transform = `translateY(${k * -120}px)`;
        heroContent.style.opacity = 1 - k * 1.3;
    }
    if (heroVideo && document.body.classList.contains("is-loaded")) {
        heroVideo.style.transform = `scale(${1 + k * 0.15})`;
    }
    hero.style.setProperty("--lb", `${k * 14}vh`);   // letterbox bars close in
}, { passive: true });


/* ---------- MANIFESTO — words light up with scroll ---------- */

const manifesto = document.querySelector(".manifesto-text");

if (manifesto) {
    /* wrap every word in a span, keeping <mark> styling */
    const wrapWords = (node) => {
        [...node.childNodes].forEach((child) => {
            if (child.nodeType === 3) {
                const frag = document.createDocumentFragment();
                child.textContent.split(/(\s+)/).forEach((part) => {
                    if (!part) return;
                    if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
                    const s = document.createElement("span");
                    s.className = "mw";
                    s.textContent = part;
                    frag.appendChild(s);
                });
                child.replaceWith(frag);
            } else if (child.nodeType === 1) {
                child.classList.add("mw");
            }
        });
    };
    wrapWords(manifesto);
    const words = manifesto.querySelectorAll(".mw");

    const paint = () => {
        const r = manifesto.getBoundingClientRect();
        const start = innerHeight * 0.85;
        const end = innerHeight * 0.3;
        const k = Math.min(Math.max((start - r.top) / (start - end + r.height * 0.6), 0), 1);
        const lit = Math.floor(k * words.length);
        words.forEach((w, i) => w.classList.toggle("lit", i < lit));
    };
    window.addEventListener("scroll", paint, { passive: true });
    paint();
}


/* ---------- FILMSTRIP of all project thumbnails ---------- */

const stripTrack = document.getElementById("filmstripTrack");

if (stripTrack) {
    const all = Object.values(PROJECTS).flat().filter((p) => posterFor(p));
    const frames = all.map((p) =>
        `<figure class="frame ${p.format === "v" ? "fv" : "fh"}">
            <img src="${posterFor(p)}" alt="" loading="lazy">
            <figcaption>${p.title}</figcaption>
         </figure>`).join("");
    stripTrack.innerHTML = frames + frames;   // duplicated for a seamless loop
}


/* ---------- 3D TILT + GLARE ON PROJECT CARDS ---------- */

if (!isTouch && !reduceMotion && grid) {
    grid.addEventListener("mousemove", (e) => {
        const media = e.target.closest(".project-media");
        if (!media) return;
        const r = media.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        media.style.transform =
            `perspective(900px) rotateY(${(x - 0.5) * 8}deg) rotateX(${(0.5 - y) * 8}deg)`;
        media.style.setProperty("--gx", `${x * 100}%`);
        media.style.setProperty("--gy", `${y * 100}%`);
    });
    grid.addEventListener("mouseout", (e) => {
        const media = e.target.closest(".project-media");
        if (media && !media.contains(e.relatedTarget)) media.style.transform = "";
    });
}


/* ---------- SKILLS — floating thumbnail follows the cursor ---------- */

const skillPreview = document.querySelector(".skill-preview");
const skillImg = skillPreview && skillPreview.querySelector("img");

if (skillPreview && !isTouch) {
    let px = 0, py = 0, tx = 0, ty = 0, raf = null;

    const follow = () => {
        px += (tx - px) * 0.15;
        py += (ty - py) * 0.15;
        const tilt = Math.max(Math.min((tx - px) * 0.08, 12), -12);
        skillPreview.style.transform = `translate(${px}px, ${py}px) rotate(${tilt}deg)`;
        raf = requestAnimationFrame(follow);
    };

    document.querySelectorAll(".skill-item[data-p]").forEach((item) => {
        const [folder, idx] = item.dataset.p.split(":");
        const proj = (PROJECTS[folder] || [])[+idx];
        const src = proj ? posterFor(proj) : "";
        if (src) new Image().src = src;           // preload

        item.addEventListener("mouseenter", () => {
            if (!src) return;
            skillImg.src = src;
            skillPreview.classList.add("show");
            if (!raf) follow();
        });
        item.addEventListener("mouseleave", () => skillPreview.classList.remove("show"));
        item.addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; });
    });
}


/* ---------- TAB TITLE EASTER EGG ---------- */

const baseTitle = document.title;
document.addEventListener("visibilitychange", () => {
    document.title = document.hidden ? "🎬 Cut! Come back to the set…" : baseTitle;
});


/* =========================================================
   ===============  APPLE-STYLE SCROLL STORY  ===============
========================================================= */

const clamp01 = (v) => Math.min(Math.max(v, 0), 1);
const easeInOut = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/* progress of a tall sticky section: 0 when its top hits the top, 1 when its end is reached */
const sectionProgress = (el) => {
    const r = el.getBoundingClientRect();
    return clamp01(-r.top / (r.height - innerHeight));
};


/* ---------- 2. REEL — full-screen video shrinks into a rounded frame ---------- */

const reel = document.querySelector(".reel");

if (reel) {
    const frame = reel.querySelector(".reel-frame");
    const title = reel.querySelector(".reel-title");
    const playBtn = reel.querySelector(".reel-play");

    const update = () => {
        const p = sectionProgress(reel);
        const k = easeInOut(clamp01(p / 0.7));
        const scale = 1 - k * 0.32;
        frame.style.transform = `scale(${scale})`;
        frame.style.borderRadius = `${(k * 34) / scale}px`;
        const t = clamp01((p - 0.35) / 0.35);
        title.style.opacity = t;
        title.style.transform = `translate(-50%, ${(1 - t) * 40}px)`;
        playBtn.style.opacity = t;
        playBtn.style.pointerEvents = t > 0.5 ? "auto" : "none";
    };

    window.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
    update();

    playBtn.addEventListener("click", () => {
        const [folder, idx] = playBtn.dataset.open.split(":");
        const proj = (PROJECTS[folder] || [])[+idx];
        if (proj) openLightbox(proj);
    });
}


/* ---------- 3. BENTO TILES — scale up into place ---------- */

const tileObs = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".tile, .apple-head").forEach((t, i) => {
    t.style.setProperty("--td", `${(i % 4) * 90}ms`);
    tileObs.observe(t);
});

/* spotlight glow follows mouse inside each tile */
document.querySelectorAll(".tile").forEach((t) => {
    t.addEventListener("mousemove", (e) => {
        const r = t.getBoundingClientRect();
        t.style.setProperty("--tx", `${e.clientX - r.left}px`);
        t.style.setProperty("--ty", `${e.clientY - r.top}px`);
    });
});
