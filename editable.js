window.LangToggle = function LangToggle(props) {
  const { lang, setLang } = props;
  return React.createElement("div", { className: "lang-toggle" },
    React.createElement("button", { className: lang === "ko" ? "active" : "", onClick: function () { setLang("ko"); } }, "KO"),
    React.createElement("button", { className: lang === "en" ? "active" : "", onClick: function () { setLang("en"); } }, "EN")
  );
};

window.Nav = function Nav(props) {
  const { lang, setLang, data } = props;
  const links = [
    { id: "about", ko: "소개", en: "About" },
    { id: "capabilities", ko: "역량", en: "Capabilities" },
    { id: "work", ko: "작업", en: "Work" },
    { id: "career", ko: "경력", en: "Career" },
    { id: "contact", ko: "연락", en: "Contact" }
  ];
  const goto = function (id) {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
  };
  return React.createElement("nav", { className: "nav" },
    React.createElement("div", { className: "nav-inner" },
      React.createElement("div", { className: "nav-brand" }, window.t(data.meta.name, lang)),
      React.createElement("div", { className: "nav-links" },
        links.map(function (l) {
          return React.createElement("button", { key: l.id, className: "nav-link", onClick: function () { goto(l.id); } }, l[lang]);
        })
      ),
      React.createElement("div", { className: "nav-right" },
        React.createElement(window.LangToggle, { lang: lang, setLang: setLang })
      )
    )
  );
};
