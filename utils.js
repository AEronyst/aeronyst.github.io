window.KRW_PER_USD = 1100;

window.formatUsd = function formatUsd(usd) {
  if (!isFinite(usd) || usd <= 0) return "";
  if (usd >= 1_000_000) {
    const m = usd / 1_000_000;
    return "$" + (m >= 10 ? Math.round(m) : m.toFixed(1).replace(/\.0$/, "")) + "M";
  }
  if (usd >= 1_000) {
    const k = usd / 1_000;
    return "$" + (k >= 10 ? Math.round(k) : k.toFixed(1).replace(/\.0$/, "")) + "K";
  }
  return "$" + Math.round(usd);
};

window.localizeAmount = function localizeAmount(text, lang) {
  if (lang !== "en" || !text || typeof text !== "string") return text;
  const rate = window.KRW_PER_USD || 1100;
  let s = text;
  s = s.replace(/(\d+(?:[.,]\d+)?)\s*억\s*원?/g, (_, n) => {
    const krw = parseFloat(n.replace(/,/g, "")) * 100_000_000;
    return window.formatUsd(krw / rate);
  });
  s = s.replace(/(\d+(?:,\d{3})*(?:\.\d+)?)\s*만\s*원?/g, (_, n) => {
    const krw = parseFloat(n.replace(/,/g, "")) * 10_000;
    return window.formatUsd(krw / rate);
  });
  s = s.replace(/₩\s*(\d+(?:[.,]\d+)?)\s*M/gi, (_, n) => {
    const krw = parseFloat(n.replace(/,/g, "")) * 1_000_000;
    return window.formatUsd(krw / rate);
  });
  s = s.replace(/₩\s*(\d+(?:[.,]\d+)?)\s*K/gi, (_, n) => {
    const krw = parseFloat(n.replace(/,/g, "")) * 1_000;
    return window.formatUsd(krw / rate);
  });
  s = s.replace(/₩\s*(\d{1,3}(?:,\d{3})+|\d+)/g, (_, n) => {
    const krw = parseFloat(n.replace(/,/g, ""));
    return window.formatUsd(krw / rate);
  });
  return s;
};

window.t = function t(field, lang) {
  if (field == null) return "";
  if (typeof field === "string") return window.localizeAmount(field, lang);
  const raw = field[lang] != null ? field[lang] : (field.ko != null ? field.ko : (field.en != null ? field.en : ""));
  return window.localizeAmount(raw, lang);
};

window.useStored = function useStored(key, initial) {
  const [v, setV] = React.useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw != null ? JSON.parse(raw) : initial;
    } catch (e) { return initial; }
  });
  React.useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(v)); } catch (e) {}
  }, [key, v]);
  return [v, setV];
};

window.applyTheme = function applyTheme(theme) {
  const r = document.documentElement.style;
  if (theme.accent) r.setProperty("--accent", theme.accent);
  if (theme.radius != null) r.setProperty("--radius", theme.radius + "px");
  if (theme.fontScale != null) r.setProperty("--font-scale", String(theme.fontScale));
  if (theme.sectionSpacing != null) r.setProperty("--section-spacing", String(theme.sectionSpacing));
};

window.showToast = function showToast(msg) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(window.__toastT);
  window.__toastT = setTimeout(function () { el.classList.remove("show"); }, 1800);
};
