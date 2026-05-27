window.parseYouTubeId = function (url) {
  if (!url) return null;
  const s = url.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s;
  const m = s.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
};

window.WorkGrid = function WorkGrid({ data, lang }) {
  const [openCat, setOpenCat] = React.useState(null);
  const layoutCls = "work-grid work-grid--" + (data.theme.layout || "grid");

  return React.createElement(React.Fragment, null,
    React.createElement("section", { className: "section", id: "work" },
      React.createElement("div", { className: "container" },
        React.createElement("p", { className: "eyebrow" }, "03 — ", lang === "ko" ? "작업" : "Work"),
        React.createElement("h2", { className: "section-title" }, window.t(data.workSection.title, lang)),
        React.createElement("p", { className: "section-sub" }, window.t(data.workSection.sub, lang)),
        React.createElement("div", { className: layoutCls },
          data.categories.map((c, i) => {
            const items = c.items || [];
            return React.createElement("div", {
              key: c.id,
              className: "work-tile",
              onClick: () => setOpenCat(i),
            },
              c.cover
                ? React.createElement("img", { className: "work-tile-cover", src: c.cover, alt: window.t(c.title, lang), loading: "lazy" })
                : React.createElement("div", { className: "work-tile-bg", style: { "--hue": c.hue } }),
              React.createElement("div", { className: "work-tile-shade" }),
              React.createElement("div", { className: "work-tile-content" },
                React.createElement("div", null,
                  React.createElement("div", { className: "work-tile-cat" }, String(i + 1).padStart(2, "0"), " · ", lang === "ko" ? "카테고리" : "Category")
                ),
                React.createElement("div", { className: "work-tile-title" }, window.t(c.title, lang)),
                React.createElement("div", { className: "work-tile-meta" },
                  React.createElement("span", null, items.length, " ", lang === "ko" ? "작업" : (items.length === 1 ? "work" : "works")),
                  React.createElement("span", null, "→")
                )
              )
            );
          })
        )
      )
    ),
    openCat != null && React.createElement(window.CategoryDetail, {
      category: data.categories[openCat],
      catIndex: openCat,
      lang,
      onClose: () => setOpenCat(null),
    })
  );
};

window.CategoryDetail = function CategoryDetail({ category, catIndex, lang, onClose }) {
  const [lightboxIdx, setLightboxIdx] = React.useState(null);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape" && lightboxIdx == null) onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose, lightboxIdx]);

  const items = category.items || [];
  const imageItems = items.filter(it => it.type === "image");
  const stop = (e) => e.stopPropagation();

  const openLightbox = (item) => {
    const idx = imageItems.findIndex(it => it.id === item.id);
    if (idx !== -1) setLightboxIdx(idx);
  };

  return React.createElement(React.Fragment, null,
    React.createElement("div", { className: "cat-modal-overlay", onClick: onClose },
      React.createElement("div", { className: "cat-modal", onClick: stop },
        React.createElement("button", { className: "cat-modal-close", onClick: onClose, "aria-label": "Close" }, "✕"),
        React.createElement("div", { className: "cat-modal-hero" },
          category.cover && React.createElement("img", { src: category.cover, alt: "" }),
          React.createElement("div", { className: "cat-modal-hero-shade" }),
          React.createElement("div", { className: "cat-modal-hero-content" },
            React.createElement("div", { className: "cat-modal-hero-eyebrow" },
              String(catIndex + 1).padStart(2, "0"), " · ", lang === "ko" ? "카테고리" : "Category"),
            React.createElement("h2", { className: "cat-modal-hero-title" }, window.t(category.title, lang))
          )
        ),
        React.createElement("div", { className: "cat-modal-body" },
          items.length === 0
            ? React.createElement("div", { className: "cat-empty" },
                React.createElement("div", { className: "cat-empty-text" },
                  lang === "ko" ? "아직 등록된 작업이 없습니다." : "No works yet.")
              )
            : React.createElement("div", { className: "cat-items-grid" },
                items.map((it, idx) => React.createElement(window.CategoryItem, {
                  key: it.id || idx,
                  item: it,
                  lang,
                  onImageClick: it.type === "image" ? openLightbox : null,
                }))
              )
        )
      )
    ),
    lightboxIdx != null && React.createElement(window.ImageLightbox, {
      items: imageItems,
      index: lightboxIdx,
      lang,
      onClose: () => setLightboxIdx(null),
      onPrev: () => setLightboxIdx((lightboxIdx - 1 + imageItems.length) % imageItems.length),
      onNext: () => setLightboxIdx((lightboxIdx + 1) % imageItems.length),
    })
  );
};

window.CategoryItem = function CategoryItem({ item, lang, onImageClick }) {
  if (item.type === "youtube") {
    const watchUrl = `https://www.youtube.com/watch?v=${item.youtubeId}`;
    return React.createElement("div", { className: "cat-item" },
      React.createElement("div", { className: "cat-item-media" },
        React.createElement("iframe", {
          src: `https://www.youtube-nocookie.com/embed/${item.youtubeId}?rel=0&playsinline=1&hl=${lang}`,
          width: "100%", height: "100%",
          frameBorder: "0",
          allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen",
          allowFullScreen: true,
          referrerPolicy: "strict-origin-when-cross-origin",
          title: window.t(item.title, lang) || "YouTube video player",
          loading: "lazy",
        })
      ),
      React.createElement("div", { className: "cat-item-body" },
        React.createElement("h3", { className: "cat-item-title" },
          window.t(item.title, lang) || "YouTube"),
        React.createElement("div", { className: "cat-item-meta" },
          React.createElement("a", {
            href: watchUrl, target: "_blank", rel: "noopener noreferrer",
            style: { color: "var(--text-soft)", textDecoration: "underline", textUnderlineOffset: "2px" },
          }, "YouTube ↗")
        )
      )
    );
  }

  let media;
  if (item.type === "video") {
    media = React.createElement("video", { src: item.url, controls: true, preload: "metadata" });
  } else if (item.type === "image") {
    media = React.createElement("img", { src: item.url, alt: window.t(item.title, lang) || item.filename || "" });
  }

  const isClickable = item.type === "image" && onImageClick;

  return React.createElement("div", {
    className: "cat-item" + (isClickable ? " cat-item--clickable" : ""),
    onClick: isClickable ? () => onImageClick(item) : undefined,
  },
    React.createElement("div", { className: "cat-item-media" },
      media,
      isClickable && React.createElement("div", { className: "cat-item-zoom-hint" }, "⤢")
    ),
    React.createElement("div", { className: "cat-item-body" },
      React.createElement("h3", { className: "cat-item-title" },
        window.t(item.title, lang) || (item.filename || "Untitled")),
      React.createElement("div", { className: "cat-item-meta" },
        item.type === "video" ? (lang === "ko" ? "비디오" : "Video") : (lang === "ko" ? "이미지" : "Image")
      )
    )
  );
};

window.ImageLightbox = function ImageLightbox({ items, index, lang, onClose, onPrev, onNext }) {
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") { e.stopImmediatePropagation(); onClose(); }
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  const item = items[index];
  const total = items.length;

  return React.createElement("div", { className: "lightbox-overlay", onClick: onClose },
    React.createElement("div", { className: "lightbox-content", onClick: (e) => e.stopPropagation() },
      React.createElement("button", { className: "lightbox-close", onClick: onClose }, "✕"),
      React.createElement("img", {
        className: "lightbox-img",
        src: item.url,
        alt: window.t(item.title, lang) || item.filename || "",
      }),
      total > 1 && React.createElement(React.Fragment, null,
        React.createElement("button", { className: "lightbox-nav lightbox-nav--prev", onClick: onPrev }, "‹"),
        React.createElement("button", { className: "lightbox-nav lightbox-nav--next", onClick: onNext }, "›"),
        React.createElement("div", { className: "lightbox-counter" }, (index + 1) + " / " + total)
      )
    )
  );
};

window.Career = function Career({ data, lang }) {
  const items = data.career.items || [];
  return React.createElement("section", { className: "section", id: "career", style: { background: "var(--bg-deep)" } },
    React.createElement("div", { className: "container" },
      React.createElement("p", { className: "eyebrow" }, "04 — ", lang === "ko" ? "경력" : "Career"),
      React.createElement("h2", { className: "section-title" }, window.t(data.career.title, lang)),
      React.createElement("p", { className: "section-sub" }, window.t(data.career.sub, lang)),
      React.createElement("div", { className: "career-list" },
        items.map((it, i) => React.createElement("div", { key: i, className: "career-row" },
          React.createElement("div", { className: "career-year" }, it.year),
          React.createElement("div", { className: "career-content" },
            React.createElement("div", { className: "career-title" }, window.t(it.title, lang)),
            React.createElement("div", { className: "career-body" }, window.t(it.body, lang))
          ),
          it.badge && React.createElement("div", { className: "career-badge" }, window.t(it.badge, lang))
        ))
      )
    )
  );
};

window.Contact = function Contact({ data, lang }) {
  return React.createElement("section", { className: "contact", id: "contact" },
    React.createElement("div", { className: "container" },
      React.createElement("h2", null, window.t(data.contact.title, lang)),
      React.createElement("p", null, window.t(data.contact.sub, lang)),
      React.createElement("a", { className: "btn btn--primary", href: "mailto:" + data.meta.email },
        window.t(data.contact.cta, lang), " →")
    )
  );
};

window.Footer = function Footer({ data, lang }) {
  return React.createElement("footer", { className: "footer" },
    React.createElement("div", { className: "container footer-inner" },
      React.createElement("div", null, "© ", new Date().getFullYear(), " ", window.t(data.meta.name, lang), " · ", window.t(data.meta.location, lang)),
      React.createElement("div", null, data.meta.email)
    )
  );
};
