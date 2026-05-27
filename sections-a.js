window.Hero = function Hero({ data, lang }) {
  const h = data.hero;
  return React.createElement("section", { className: "hero" },
    React.createElement("div", { className: "container" },
      React.createElement("p", { className: "eyebrow" }, window.t(h.eyebrow, lang)),
      React.createElement("h1", null, window.t(h.headline, lang)),
      React.createElement("p", { className: "lede" }, window.t(h.sub, lang)),
      React.createElement("div", { className: "cta-row" },
        React.createElement("button", { className: "btn btn--primary", onClick: () => { const el = document.getElementById("work"); if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" }); } },
          window.t(h.primaryCta, lang), " →"),
        React.createElement("button", { className: "btn btn--ghost", onClick: () => window.print() },
          window.t(h.secondaryCta, lang), " ↗")
      )
    )
  );
};

window.Stats = function Stats({ data, lang }) {
  return React.createElement("section", { className: "stats" },
    data.stats.map((s, i) => React.createElement("div", { key: i, className: "stat" },
      React.createElement("div", { className: "stat-value" }, window.t(s.value, lang)),
      React.createElement("div", { className: "stat-label" }, window.t(s.label, lang))
    ))
  );
};

window.About = function About({ data, lang }) {
  return React.createElement("section", { className: "section", id: "about" },
    React.createElement("div", { className: "container" },
      React.createElement("div", { className: "about" },
        React.createElement("div", null,
          React.createElement("p", { className: "eyebrow" }, "01 — ", lang === "ko" ? "소개" : "About"),
          React.createElement("a", { href: "about.html", className: "section-title-link", title: lang === "ko" ? "자세히 보기" : "View detail" },
            React.createElement("h2", { className: "section-title" }, window.t(data.about.title, lang)),
            React.createElement("span", { className: "section-title-arrow" }, "→")
          )
        ),
        React.createElement("p", { className: "about-body" }, window.t(data.about.body, lang))
      )
    )
  );
};

window.Capabilities = function Capabilities({ data, lang }) {
  return React.createElement("section", { className: "section", id: "capabilities", style: { background: "var(--bg-deep)" } },
    React.createElement("div", { className: "container" },
      React.createElement("p", { className: "eyebrow" }, "02 — ", lang === "ko" ? "역량" : "Capabilities"),
      React.createElement("a", { href: "capabilities.html", className: "section-title-link", title: lang === "ko" ? "자세히 보기" : "View detail" },
        React.createElement("h2", { className: "section-title" }, window.t(data.capabilitiesSection.title, lang)),
        React.createElement("span", { className: "section-title-arrow" }, "→")
      ),
      React.createElement("p", { className: "section-sub" }, window.t(data.capabilitiesSection.sub, lang)),
      React.createElement("div", { className: "cap-grid" },
        data.capabilities.map((c, i) => React.createElement("div", { key: c.id, className: "cap-card" },
          React.createElement("span", { className: "cap-num" }, String(i + 1).padStart(2, "0")),
          React.createElement("div", null,
            React.createElement("h3", { className: "cap-title" }, window.t(c.title, lang)),
            React.createElement("p", { className: "cap-body" }, window.t(c.body, lang))
          )
        ))
      )
    )
  );
};
