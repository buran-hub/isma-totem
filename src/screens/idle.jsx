/* idle.jsx — tela de repouso, sem usuário logado */

function IdleScreen({ onStart, onVoice, voiceOpen }) {
  const [touchAnim, setTouchAnim] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setTouchAnim(t => !t), 2200);
    return () => clearInterval(id);
  }, []);

  const d = useClock(false);

  return (
    <>
      {/* Minimal header — no user */}
      <header className="topbar" style={{ background: "var(--ink)" }}>
        <div className="brand">
          <div className="mark">i</div>
          <span>ISMA</span>
        </div>
        <span className="clock">{formatTime(d)}</span>
      </header>

      <div className="body idle-body" onClick={onStart} style={{ cursor: "pointer" }}>
        <style>{`
          .idle-body {
            background:
              radial-gradient(ellipse at 50% 40%, rgba(245,166,35,.08), transparent 60%),
              linear-gradient(180deg, #F2F4F7 0%, #E7EBF1 100%);
            display: grid;
            place-items: center;
            padding: 40px;
            position: relative;
          }
          .idle-eyebrow {
            font-family: var(--f-mono);
            font-size: 13px;
            letter-spacing: 0.3em;
            color: var(--muted);
            font-weight: 600;
            margin-bottom: 24px;
            text-align: center;
          }
          .idle-cta {
            font-size: 96px;
            font-weight: 900;
            letter-spacing: -0.04em;
            line-height: 0.95;
            color: var(--ink);
            text-align: center;
            margin: 0;
          }
          .idle-cta .accent { color: var(--orange); }
          .idle-sub {
            font-size: 22px;
            color: var(--muted);
            margin-top: 20px;
            text-align: center;
            max-width: 620px;
            line-height: 1.4;
          }
          .touch-pulse {
            position: relative;
            width: 140px; height: 140px;
            margin: 32px auto 0;
            display: grid; place-items: center;
          }
          .touch-pulse .hand { width: 104px !important; height: 104px !important; }
          .touch-pulse .ring {
            position: absolute; inset: 0;
            border: 3px solid var(--orange);
            border-radius: 50%;
            animation: touchPulse 2.2s ease-out infinite;
            opacity: 0;
          }
          .touch-pulse .ring:nth-child(2) { animation-delay: .7s; }
          .touch-pulse .ring:nth-child(3) { animation-delay: 1.4s; }
          .touch-pulse .hand {
            width: 120px; height: 120px;
            border-radius: 50%;
            background: var(--ink);
            color: #fff;
            display: grid; place-items: center;
            box-shadow: 0 20px 40px -10px rgba(11,35,64,.4);
            position: relative; z-index: 2;
          }
          @keyframes touchPulse {
            0% { transform: scale(.9); opacity: .8; }
            100% { transform: scale(1.8); opacity: 0; }
          }
          .idle-voice-chip {
            position: absolute;
            bottom: 32px;
            left: 50%;
            transform: translateX(-50%);
            display: flex; align-items: center; gap: 16px;
            padding: 16px 24px;
            background: #fff;
            border-radius: 999px;
            box-shadow: var(--sh-2);
            border: 1px solid var(--line);
          }
          .idle-voice-chip .mic {
            width: 56px; height: 56px; border-radius: 50%;
            background: var(--orange); color: var(--ink);
            display: grid; place-items: center;
            position: relative;
          }
          .idle-voice-chip .mic::after {
            content: ""; position: absolute; inset: -4px;
            border-radius: 50%;
            border: 2px solid var(--orange);
            opacity: .5;
            animation: micRing 2s ease-out infinite;
          }
          @keyframes micRing {
            0% { transform: scale(1); opacity: .8; }
            100% { transform: scale(1.4); opacity: 0; }
          }
          .idle-voice-chip .txt {
            display: flex; flex-direction: column;
            font-weight: 600;
          }
          .idle-voice-chip .txt .a { font-size: 18px; color: var(--ink); }
          .idle-voice-chip .txt .b {
            font-family: var(--f-mono);
            font-size: 11px; letter-spacing: 0.18em;
            color: var(--muted); margin-top: 2px;
          }
        `}</style>

        <div style={{ paddingBottom: 140 }}>
          <div className="idle-eyebrow">TOTEM DE AUTOATENDIMENTO</div>
          <h1 className="idle-cta">
            TOQUE<br/>
            PARA <span className="accent">COMEÇAR</span>
          </h1>
          <p className="idle-sub">Olhe para a câmera ou aproxime seu crachá. É rápido.</p>
          <div className="touch-pulse">
            <span className="ring" />
            <span className="ring" />
            <span className="ring" />
            <div className="hand">
              <Icon name="touch_app" size={64} />
            </div>
          </div>
        </div>

        <div className="idle-voice-chip" onClick={e => { e.stopPropagation(); onVoice(); }}>
          <div className="mic"><Icon name="mic" size={28} /></div>
          <div className="txt">
            <span className="a">Ou diga: “Isma, bom dia”</span>
            <span className="b">COMANDOS DE VOZ ATIVOS</span>
          </div>
        </div>
      </div>

      <footer className="footerbar">
        <div className="group">
          <span><span className="dot" />CONECTADO</span>
          <span className="signal">SINAL<span className="bar" /><span className="bar" /><span className="bar" /><span className="bar" /></span>
        </div>
        <div className="group">
          <span>ISMA • TOTEM INDUSTRIAL V1.0</span>
        </div>
      </footer>
    </>
  );
}

window.IdleScreen = IdleScreen;
