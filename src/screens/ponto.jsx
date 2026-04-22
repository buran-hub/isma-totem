/* ponto.jsx — F1 Bater Ponto */

function PontoScreen({ user, onBack, onDone }) {
  const [phase, setPhase] = useState("confirm"); // confirm | loading | success
  const now = useClock(true);

  // Simple state machine: detected type auto from time of day
  const h = now.getHours();
  const tipo = h < 7 ? "Entrada" : (h >= 11 && h < 14 ? "Intervalo" : (h >= 17 ? "Saída" : "Entrada"));
  const horasHoje = "7h 42min";

  if (phase === "loading") {
    return (
      <>
        <TopBar user={user} />
        <div className="body" style={{ background: "var(--bg)" }}>
          <LoadingScene title="Registrando ponto…" sub="Sincronizando com o sistema" onDone={() => setPhase("success")} />
        </div>
        <FooterBar onVoice={() => {}} />
      </>
    );
  }

  if (phase === "success") {
    return (
      <>
        <TopBar user={user} />
        <div className="body" style={{ background: "var(--bg)" }}>
          <SuccessScene
            title={`Ponto registrado, ${user.name.split(" ")[0]}!`}
            message={`${tipo} às ${formatTime(now, true)} — bom trabalho.`}
            onDone={onDone}
            autoSeconds={4}
            narration={`Ponto registrado. Bom trabalho, ${user.name.split(" ")[0]}!`}
          />
        </div>
        <FooterBar onVoice={() => {}} />
      </>
    );
  }

  return (
    <>
      <TopBar user={user} onBack={onBack} />
      <div className="body ponto-body">
        <style>{`
          .ponto-body {
            padding: 28px 40px 24px;
            display: flex; flex-direction: column; gap: 20px;
            background: var(--bg);
          }
          .ponto-card {
            flex: 1;
            background: #fff;
            border-radius: 24px;
            padding: 36px 48px;
            display: grid;
            grid-template-columns: 1fr auto;
            grid-template-rows: auto 1fr auto;
            gap: 24px;
            box-shadow: var(--sh-2);
            border: 1px solid var(--line);
          }
          .ponto-user {
            display: flex; align-items: center; gap: 20px;
          }
          .ponto-user .meta .n { font-size: 26px; font-weight: 800; color: var(--ink); line-height: 1.1; }
          .ponto-user .meta .m { font-size: 14px; color: var(--muted); font-family: var(--f-mono); letter-spacing: 0.14em; margin-top: 2px; }
          .ponto-chip {
            align-self: start;
            padding: 12px 22px;
            background: var(--ink);
            color: #fff;
            border-radius: 999px;
            font-weight: 800;
            font-size: 16px;
            letter-spacing: 0.2em;
            display: inline-flex; align-items: center; gap: 10px;
          }
          .ponto-chip .d { width: 10px; height: 10px; border-radius: 50%; background: var(--green); }
          .ponto-clock {
            grid-column: 1 / -1;
            text-align: center;
            padding: 20px 0;
          }
          .ponto-clock .t {
            font-size: 144px;
            font-weight: 900;
            letter-spacing: -0.04em;
            line-height: 1;
            color: var(--ink);
            font-variant-numeric: tabular-nums;
          }
          .ponto-clock .t .s { color: var(--orange); }
          .ponto-clock .d {
            font-size: 18px;
            font-weight: 600;
            color: var(--muted);
            letter-spacing: 0.06em;
            margin-top: 8px;
            text-transform: uppercase;
          }
          .ponto-stats {
            grid-column: 1 / -1;
            display: flex; gap: 16px;
          }
          .ponto-stat {
            flex: 1;
            padding: 16px 20px;
            background: var(--bg);
            border-radius: 14px;
            border: 1px solid var(--line);
          }
          .ponto-stat .k { font-family: var(--f-mono); font-size: 11px; color: var(--muted); letter-spacing: 0.18em; }
          .ponto-stat .v { font-size: 24px; font-weight: 800; color: var(--ink); margin-top: 4px; }
          .ponto-stat .v.ok { color: var(--green); }
        `}</style>

        <div className="ponto-card">
          <div className="ponto-user">
            <Avatar name={user.name} size={72} ring />
            <div className="meta">
              <div className="n">{user.name}</div>
              <div className="m">{user.matricula} · {user.setor}</div>
            </div>
          </div>
          <span className="ponto-chip"><span className="d" />{tipo.toUpperCase()}</span>

          <div className="ponto-clock">
            <div className="t">
              {formatTime(now).slice(0,2)}
              <span className="s">:</span>
              {formatTime(now).slice(3,5)}
              <span className="s">:</span>
              {String(now.getSeconds()).padStart(2,'0')}
            </div>
            <div className="d">
              {now.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" })}
            </div>
          </div>

          <div className="ponto-stats">
            <div className="ponto-stat"><div className="k">ENTRADA</div><div className="v">07:03</div></div>
            <div className="ponto-stat"><div className="k">INTERVALO</div><div className="v">12:02 — 13:00</div></div>
            <div className="ponto-stat"><div className="k">TRABALHADAS HOJE</div><div className="v ok">{horasHoje}</div></div>
          </div>
        </div>

        <div className="flow-actions">
          <button className="btn btn-ghost btn-lg" onClick={onBack}>
            <Icon name="close" /> CANCELAR
          </button>
          <button className="btn btn-confirm btn-lg" onClick={() => setPhase("loading")}>
            <Icon name="check" /> CONFIRMAR {tipo.toUpperCase()}
          </button>
        </div>
      </div>
      <FooterBar onVoice={() => {}} />
    </>
  );
}

window.PontoScreen = PontoScreen;
