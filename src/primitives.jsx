/* primitives.jsx — shared atoms */

const { useState, useEffect, useRef, useMemo, useCallback, createContext, useContext } = React;

/* ------------------------------------------------------------------ */
/*  Material Symbols shorthand                                        */
/* ------------------------------------------------------------------ */
function Icon({ name, size, style, className }) {
  return (
    <span
      className={"material-symbols-rounded " + (className || "")}
      style={{ fontSize: size, ...(style || {}) }}
    >
      {name}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  App context — ferries global state to every screen                */
/* ------------------------------------------------------------------ */
const AppCtx = createContext(null);
const useApp = () => useContext(AppCtx);

/* ------------------------------------------------------------------ */
/*  Live clock hook                                                   */
/* ------------------------------------------------------------------ */
function useClock(fast) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), fast ? 1000 : 15000);
    return () => clearInterval(id);
  }, [fast]);
  return now;
}
function formatTime(d, seconds) {
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return seconds ? `${hh}:${mm}:${ss}` : `${hh}:${mm}`;
}

/* ------------------------------------------------------------------ */
/*  Stage scaler — fits the 1120×820 bezel inside any viewport        */
/* ------------------------------------------------------------------ */
function useFitScale(w, h) {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const fit = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const s = Math.min(vw / (w + 80), vh / (h + 80), 1);
      setScale(s);
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [w, h]);
  return scale;
}

/* ------------------------------------------------------------------ */
/*  Auto-return countdown — used by success screens                   */
/* ------------------------------------------------------------------ */
function useAutoReturn(onDone, seconds = 4) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    if (left <= 0) { onDone(); return; }
    const id = setTimeout(() => setLeft(left - 1), 1000);
    return () => clearTimeout(id);
  }, [left]);
  return left;
}

/* ------------------------------------------------------------------ */
/*  Success scene                                                     */
/* ------------------------------------------------------------------ */
function SuccessScene({ title, message, protocol, onDone, autoSeconds = 5, narration }) {
  const left = useAutoReturn(onDone, autoSeconds);
  return (
    <div className="scene">
      <div className="scene-inner">
        <div className="ring"><Icon name="check" size={96} /></div>
        <h1>{title}</h1>
        {message && <p>{message}</p>}
        {protocol && (
          <div className="protocol">
            <span>PROTOCOLO</span>
            {protocol}
          </div>
        )}
        {narration && (
          <div style={{ marginTop: 24 }}>
            <span className="voice-hint">
              <Icon name="volume_up" /> “{narration}”
            </span>
          </div>
        )}
        <div className="countdown">Voltando ao início em {left}s</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Generic loading scene                                             */
/* ------------------------------------------------------------------ */
function LoadingScene({ title, sub, ms = 1400, onDone }) {
  useEffect(() => { const id = setTimeout(onDone, ms); return () => clearTimeout(id); }, []);
  return (
    <div className="scene">
      <div className="scene-inner">
        <div className="ring loading" />
        <h1 style={{ marginTop: 28 }}>{title}</h1>
        {sub && <p>{sub}</p>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Placeholder avatar — striped SVG                                  */
/* ------------------------------------------------------------------ */
function Avatar({ name, size = 64, ring }) {
  const initials = (name || "JS").split(" ").map(s => s[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div
      style={{
        width: size, height: size, borderRadius: "50%",
        background: "linear-gradient(135deg,#2E5C90,#0B2340)",
        color: "#fff",
        display: "grid", placeItems: "center",
        fontWeight: 800, fontSize: size * 0.38,
        flex: "0 0 auto",
        boxShadow: ring ? "0 0 0 3px #fff, 0 0 0 5px var(--orange)" : "none"
      }}
    >{initials}</div>
  );
}

Object.assign(window, {
  Icon, AppCtx, useApp, useClock, formatTime, useFitScale,
  useAutoReturn, SuccessScene, LoadingScene, Avatar
});
