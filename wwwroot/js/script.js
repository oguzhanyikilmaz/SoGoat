const LINES = [
    {
        row: ".row-sm",
        text: "*The feed is a graveyard.",
        cuts: [0.0335, 0.0867, 0.1382, 0.1878, 0.2088, 0.2352, 0.2848, 0.3345, 0.3877, 0.4087, 0.4278, 0.4739, 0.4949, 0.5446, 0.5656, 0.6188, 0.6506, 0.7002, 0.7446, 0.7942, 0.8386, 0.8882, 0.92, 0.9732, 1]
    },
    {
        row: ".row-lg",
        text: "We build monuments.",
        cuts: [0.0954, 0.1508, 0.1744, 0.2338, 0.2913, 0.3127, 0.3341, 0.3935, 0.417, 0.5083, 0.5678, 0.6253, 0.6828, 0.7741, 0.8295, 0.887, 0.9185, 0.97, 1]
    }
];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function place(line, index) {
    const row = document.querySelector(line.row);
    const reveal = row.querySelector(".reveal");
    const caret = row.querySelector(".caret");
    const at = index < 0 ? 0 : line.cuts[index] * 100;
    reveal.style.width = at + "%";
    caret.style.left = at + "%";
    return caret;
}

async function typeLine(line) {
    const caret = place(line, -1);
    caret.classList.add("on");
    caret.classList.remove("blink");
    for (let i = 0; i < line.text.length; i++) {
        place(line, i);
        const ch = line.text[i];
        let delay = 68 + Math.random() * 28;
        if (ch === " ") delay = 120;
        else if (ch === "." || ch === ",") delay = 200;
        await wait(delay);
    }
    return caret;
}

let started = false;

async function startTagline(instant) {
    if (started) return;
    started = true;
    if (instant) {
        LINES.forEach((line) => {
            const caret = place(line, line.text.length - 1);
            caret.classList.remove("on", "blink");
        });
        return;
    }
    const first = place(LINES[0], -1);
    first.classList.add("on", "blink");
    await wait(480);
    for (let i = 0; i < LINES.length; i++) {
        const caret = await typeLine(LINES[i]);
        const last = i === LINES.length - 1;
        if (last) caret.classList.add("blink");
        else caret.classList.remove("on");
        if (!last) await wait(220);
    }
}

const goat = document.querySelector(".goat");
window.addEventListener("message", (event) => {
    if (!goat || event.source !== goat.contentWindow) return;
    if (!event.data || event.data.type !== "goat-settled") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    startTagline(reduce);
});
