const LINES = [
    {
        row: ".row-sm",
        text: "*The feed is a graveyard.",
        cuts: [0.0411, 0.0962, 0.1463, 0.1964, 0.2156, 0.2465, 0.2966, 0.3467, 0.3993, 0.4185, 0.4386, 0.4828, 0.502, 0.5496, 0.5688, 0.6214, 0.6551, 0.7028, 0.7501, 0.8002, 0.8463, 0.8939, 0.9276, 0.9802, 1]
    },
    {
        row: ".row-lg",
        text: "We build monuments.",
        cuts: [0.0992, 0.1569, 0.1789, 0.2394, 0.297, 0.32, 0.3431, 0.4036, 0.4255, 0.514, 0.573, 0.6305, 0.688, 0.7764, 0.8342, 0.8917, 0.9266, 0.9774, 1]
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
