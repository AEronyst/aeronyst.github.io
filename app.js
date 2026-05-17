window.App = function App() {
  const data = window.PORTFOLIO_DATA;
  const [lang, setLang] = window.useStored("portfolio-lang", "ko");

  React.useEffect(() => { window.applyTheme(data.theme); }, []);
  React.useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  return React.createElement(React.Fragment, null,
    React.createElement(window.Nav, { lang, setLang, data }),
    React.createElement(window.Hero, { data, lang }),
    React.createElement(window.Stats, { data, lang }),
    React.createElement(window.About, { data, lang }),
    React.createElement(window.Capabilities, { data, lang }),
    React.createElement(window.WorkGrid, { data, lang }),
    React.createElement(window.Career, { data, lang }),
    React.createElement(window.Contact, { data, lang }),
    React.createElement(window.Footer, { data, lang })
  );
};

document.addEventListener("DOMContentLoaded", () => {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(React.createElement(window.App));
});
