/* auth.jsx — animated face-scan authentication */

function AuthScreen({ onDone, onCancel }) {
  const [phase, setPhase] = useState("framing");  // framing -> scanning -> matching -> success
  const [mode, setMode] = useState("face");       // face | badge

  useEffect(() => {
    if (mode !== "face") return;
    const seq = [
      ["framing", 800],
      ["scanning", 1800],
      ["matching", 900],
      ["success", 900],
    ];
    let cur = 0, cancelled = false;
    const run = () => {
      if (cancelled) return;
      const [p, t] = seq[cur];
      setPhase(p);
      if (cur < seq.length - 1) {
        cur++;
        setTimeout(run, t);
      } else {
        setTimeout(() => !cancelled && onDone(), t);
      }
    };
    run();
    return () => { cancelled = true; };
  }, [mode]);

  return (
    <>
      <TopBar />
      <div className="body auth-body">
        <style>{`
          .auth-body {
            background: linear-gradient(180deg, #0B2340 0%, #05111F 100%);
            color: #fff;
            padding: 32px 48px;
            display: flex;
            gap: 40px;
            align-items: center;
            justify-content: center;
          }
          .auth-cam {
            position: relative;
            width: 420px; height: 480px;
            border-radius: 20px;
            background:
              radial-gradient(ellipse at 50% 30%, #2a3648 0%, #111823 50%, #050a12 100%);
            overflow: hidden;
            box-shadow:
              inset 0 0 0 1px rgba(255,255,255,.08),
              0 30px 60px -20px rgba(0,0,0,.6);
          }
          .auth-cam::before {
            content: "";
            position: absolute; inset: 0;
            background-image:
              repeating-linear-gradient(0deg, rgba(255,255,255,.02) 0 2px, transparent 2px 4px);
            pointer-events: none;
          }
          .face-silhouette {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 200px; height: 260px;
            border-radius: 50% 50% 46% 46% / 60% 60% 40% 40%;
            background:
              radial-gradient(ellipse at 40% 35%, rgba(255,255,255,.08) 0%, rgba(255,255,255,.03) 40%, transparent 70%);
            border: 1px solid rgba(255,255,255,.08);
          }
          .face-silhouette .eye {
            position: absolute;
            width: 18px; height: 6px;
            background: rgba(255,255,255,.25);
            border-radius: 3px;
            top: 38%;
          }
          .face-silhouette .eye.l { left: 28%; }
          .face-silhouette .eye.r { right: 28%; }
          .face-silhouette .mouth {
            position: absolute;
            bottom: 32%; left: 50%;
            transform: translateX(-50%);
            width: 50px; height: 3px;
            background: rgba(255,255,255,.18);
            border-radius: 2px;
          }
          .scan-frame {
            position: absolute;
            top: 18%; left: 50%;
            transform: translateX(-50%);
            width: 240px; height: 300px;
            border-radius: 40% 40% 36% 36% / 50% 50% 30% 30%;
            pointer-events: none;
          }
          .scan-frame::before,
          .scan-frame::after {
            content: ""; position: absolute;
            width: 30px; height: 30px;
            border: 3px solid var(--orange);
          }
          .scan-frame .c1, .scan-frame .c2, .scan-frame .c3, .scan-frame .c4 {
            position: absolute; width: 40px; height: 40px;
            border: 4px solid var(--orange);
            border-radius: 4px;
          }
          .scan-frame .c1 { top: -4px; left: -4px; border-right: none; border-bottom: none; border-top-left-radius: 12px; }
          .scan-frame .c2 { top: -4px; right: -4px; border-left: none; border-bottom: none; border-top-right-radius: 12px; }
          .scan-frame .c3 { bottom: -4px; left: -4px; border-right: none; border-top: none; border-bottom-left-radius: 12px; }
          .scan-frame .c4 { bottom: -4px; right: -4px; border-left: none; border-top: none; border-bottom-right-radius: 12px; }
          .scan-frame::before, .scan-frame::after { display: none; }

          .scan-line {
            position: absolute;
            left: 0; right: 0; top: 0;
            height: 3px;
            background: linear-gradient(90deg, transparent, var(--orange), transparent);
            box-shadow: 0 0 16px var(--orange);
            animation: scanDown 1.6s ease-in-out infinite;
          }
          @keyframes scanDown {
            0%   { top: 10%; opacity: 0; }
            20%  { opacity: 1; }
            80%  { opacity: 1; }
            100% { top: 90%; opacity: 0; }
          }
          .auth-dots {
            position: absolute;
            top: 18%; left: 50%; transform: translateX(-50%);
            width: 240px; height: 300px;
          }
          .auth-dots .d {
            position: absolute;
            width: 6px; height: 6px; border-radius: 50%;
            background: var(--orange);
            box-shadow: 0 0 6px var(--orange);
            opacity: 0;
            animation: pt 1.5s ease-out forwards;
          }
          @keyframes pt { 0% { transform: scale(0); } 30% { opacity: 1; } 100% { transform: scale(1); opacity: 1; } }

          .auth-side { flex: 1; max-width: 420px; }
          .auth-side h1 {
            font-size: 54px;
            font-weight: 800;
            letter-spacing: -0.02em;
            line-height: 1.05;
            margin: 0 0 16px;
          }
          .auth-side h1 .accent { color: var(--orange); }
          .auth-side p {
            font-size: 20px;
            line-height: 1.5;
            color: rgba(255,255,255,.75);
            margin: 0 0 24px;
          }
          .auth-steps { display: flex; flex-direction: column; gap: 12px; }
          .auth-step {
            display: flex; align-items: center; gap: 14px;
            padding: 14px 18px;
            background: rgba(255,255,255,.05);
            border: 1px solid rgba(255,255,255,.08);
            border-radius: 12px;
            font-size: 16px;
            transition: background .2s;
          }
          .auth-step.active { background: rgba(245,166,35,.12); border-color: var(--orange); }
          .auth-step.done { background: rgba(18,183,106,.12); border-color: var(--green); }
          .auth-step .num {
            width: 32px; height: 32px; border-radius: 50%;
            background: rgba(255,255,255,.12);
            display: grid; place-items: center;
            font-weight: 700; font-size: 14px;
          }
          .auth-step.done .num { background: var(--green); color: #fff; }
          .auth-step.active .num { background: var(--orange); color: var(--ink); }
          .auth-fallback {
            margin-top: 28px;
            padding-top: 24px;
            border-top: 1px solid rgba(255,255,255,.08);
          }
          .auth-fallback button {
            background: rgba(255,255,255,.08);
            border: 1px solid rgba(255,255,255,.12);
            color: #fff;
            padding: 14px 20px;
            border-radius: 10px;
            font: inherit;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            display: flex; align-items: center; gap: 12px;
            width: 100%;
          }
          .status-bar {
            position: absolute;
            left: 20px; right: 20px; bottom: 20px;
            padding: 10px 14px;
            background: rgba(0,0,0,.5);
            border-radius: 10px;
            font-family: var(--f-mono);
            font-size: 11px;
            letter-spacing: 0.14em;
            color: var(--orange);
            display: flex; align-items: center; gap: 8px;
          }
          .status-bar .blip {
            width: 8px; height: 8px; border-radius: 50%;
            background: var(--orange);
            animation: pulse-dot 1s infinite;
          }
          .badge-scene {
            position: absolute; inset: 0;
            display: grid; place-items: center;
            padding: 40px;
            text-align: center;
          }
          .badge-card {
            width: 220px; height: 140px;
            border-radius: 14px;
            background: linear-gradient(135deg, #2E5C90, #0B2340);
            display: grid; place-items: center;
            color: #fff;
            position: relative;
            animation: tapBadge 1.6s ease-in-out infinite;
            box-shadow: 0 20px 40px -10px rgba(0,0,0,.5);
          }
          @keyframes tapBadge {
            0%,100% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
          }
          .badge-card::before {
            content: "";
            position: absolute;
            inset: -12px;
            border-radius: 20px;
            border: 2px dashed rgba(245,166,35,.4);
          }
        `}</style>

        <div className="auth-cam">
          {mode === "face" && (
            <>
              <div className="face-silhouette">
                <div className="eye l" /><div className="eye r" />
                <div className="mouth" />
              </div>
              <div className="scan-frame"><span className="c1" /><span className="c2" /><span className="c3" /><span className="c4" /></div>
              {phase === "scanning" && <div className="scan-line" />}
              {(phase === "matching" || phase === "success") && (
                <div className="auth-dots">
                  {[[20,30],[50,15],[78,28],[25,50],[75,50],[40,68],[60,68],[50,85]].map(([x,y],i)=>(
                    <span key={i} className="d" style={{ left: x+"%", top: y+"%", animationDelay: (i*40)+"ms" }} />
                  ))}
                </div>
              )}
              <div className="status-bar">
                <span className="blip" />
                {phase === "framing" && "ENQUADRANDO ROSTO…"}
                {phase === "scanning" && "ANALISANDO TRAÇOS · 1024 PONTOS"}
                {phase === "matching" && "CRUZANDO COM BANCO LOCAL…"}
                {phase === "success" && "IDENTIDADE CONFIRMADA ✓"}
              </div>
            </>
          )}
          {mode === "badge" && (
            <div className="badge-scene">
              <div>
                <div className="badge-card">
                  <Icon name="badge" size={48} />
                </div>
                <p style={{ marginTop: 32, color: "rgba(255,255,255,.7)", fontSize: 16 }}>
                  Aproxime o crachá do leitor
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="auth-side">
          <h1>Olhe para a câmera<br/><span className="accent">sem pressa</span>.</h1>
          <p>Levamos menos de 2 segundos. Você não precisa tirar a máscara, luva ou touca.</p>
          <div className="auth-steps">
            <div className={"auth-step " + (phase === "framing" ? "active" : "done")}>
              <div className="num">1</div>
              <span>Posicionando rosto</span>
              {phase !== "framing" && <Icon name="check" style={{ marginLeft: "auto", color: "var(--green)" }} />}
            </div>
            <div className={"auth-step " + (phase === "scanning" ? "active" : (["matching","success"].includes(phase) ? "done" : ""))}>
              <div className="num">2</div>
              <span>Lendo traços faciais</span>
              {["matching","success"].includes(phase) && <Icon name="check" style={{ marginLeft: "auto", color: "var(--green)" }} />}
            </div>
            <div className={"auth-step " + (phase === "matching" ? "active" : (phase === "success" ? "done" : ""))}>
              <div className="num">3</div>
              <span>Identificando você</span>
              {phase === "success" && <Icon name="check" style={{ marginLeft: "auto", color: "var(--green)" }} />}
            </div>
          </div>

          <div className="auth-fallback">
            <button onClick={() => setMode(mode === "face" ? "badge" : "face")}>
              <Icon name={mode === "face" ? "badge" : "face"} />
              {mode === "face" ? "Usar crachá ou QR code" : "Voltar para reconhecimento facial"}
            </button>
          </div>

          <div style={{ marginTop: 20, fontSize: 12, color: "rgba(255,255,255,.4)", lineHeight: 1.5 }}>
            <Icon name="shield" size={14} style={{ verticalAlign: "middle", marginRight: 4 }} />
            Seus dados biométricos são processados localmente. Nada sai do totem.
          </div>
        </div>
      </div>
      <FooterBar onVoice={() => {}} />
    </>
  );
}

window.AuthScreen = AuthScreen;
