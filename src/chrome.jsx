/* chrome.jsx — topbar, footer, bezel, voice panel, annotations */

function TopBar({ user, onExit, onBack }) {
  const d = useClock(false);
  return (
    <header className="topbar">
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div className="brand">
          <div className="mark">i</div>
          <span>ISMA</span>
        </div>
        {onBack && (
          <button className="backbtn" onClick={onBack}>
            <Icon name="arrow_back" />
            VOLTAR
          </button>
        )}
      </div>
      <div className="session">
        {user && (
          <div className="who">
            <Avatar name={user.name} size={36} />
            <span>Olá, {user.name.split(" ")[0]}</span>
          </div>
        )}
        <span className="clock">{formatTime(d)}</span>
        {onExit && (
          <button className="exit-btn" onClick={onExit} aria-label="Sair">
            <Icon name="logout" />
          </button>
        )}
      </div>
    </header>
  );
}

function FooterBar({ onVoice, voiceOpen }) {
  return (
    <footer className="footerbar">
      <div className="group">
        <span><span className="dot" />CONECTADO</span>
        <span className="signal">
          SINAL
          <span className="bar" /><span className="bar" /><span className="bar" /><span className="bar" />
        </span>
        <span>SISTEMA-A</span>
      </div>
      <div className="group">
        <button className="voice-btn" onClick={onVoice}>
          <Icon name={voiceOpen ? "close" : "mic"} />
          {voiceOpen ? "FECHAR" : "COMANDOS DE VOZ"}
        </button>
        <span>ISMA • TOTEM INDUSTRIAL V1.0</span>
      </div>
    </footer>
  );
}

/* -------------------------------------------------- */
/*  Voice panel — slides in from the right            */
/* -------------------------------------------------- */
function VoicePanel({ open, commands }) {
  return (
    <aside className={"voice-panel" + (open ? " open" : "")} aria-hidden={!open}>
      <div className="inner">
        <div className="title">
          <span className="pulse" />
          Ouvindo…
        </div>
        <div className="sub">
          Você pode falar em voz alta. O totem está sempre ouvindo.
          Diga um dos comandos abaixo:
        </div>
        <ul>
          {commands.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
        <div style={{ marginTop: "auto", fontSize: 11, color: "rgba(255,255,255,.4)", lineHeight: 1.5 }}>
          <Icon name="info" size={14} style={{ verticalAlign: "middle", marginRight: 4 }} />
          Comandos processados localmente. Seu áudio não é enviado à nuvem.
        </div>
      </div>
    </aside>
  );
}

/* -------------------------------------------------- */
/*  Annotation overlay                                */
/* -------------------------------------------------- */
function Annotations({ show, items }) {
  if (!show || !items?.length) return null;
  return (
    <div className="anno-wrap">
      {items.map((it, i) => (
        <div
          key={i}
          className={"anno tag-" + (it.tag || "ux") + " " + (it.side || "left")}
          style={{ top: it.top, left: it.left, right: it.right, bottom: it.bottom }}
        >
          <span className="lbl">{it.label || (it.tag === "voz" ? "Voz" : it.tag === "a11y" ? "Acessibilidade" : "Decisão de UX")}</span>
          {it.body}
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------- */
/*  Bezel wrapper                                     */
/* -------------------------------------------------- */
function Bezel({ children, bezel }) {
  return (
    <div className={"totem" + (bezel ? "" : " no-bz")}>
      <div className="totem-brand">ISMA · INDUSTRIAL TOTEM</div>
      <div className="totem-cam">
        <div className="dot" />
        <div className="lens" />
        <div className="dot" />
        <div className="led" />
      </div>
      <div className="screen">
        <div className="screen-inner">{children}</div>
      </div>
      <div className="totem-badge">MODELO T-10 · 1024×768</div>
    </div>
  );
}

Object.assign(window, { TopBar, FooterBar, VoicePanel, Annotations, Bezel });
