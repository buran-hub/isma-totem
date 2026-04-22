/* ferias.jsx — F3 Solicitar Férias */

function FeriasScreen({ user, onBack, onDone }) {
  const [step, setStep] = useState(1); // 1 saldo, 2 calendario, 3 resumo, 4 success
  const [inicio, setInicio] = useState(null);
  const [dias, setDias] = useState(15);

  const saldoTotal = 24;
  const today = new Date(2026, 3, 19);

  if (step === 4) {
    return (
      <>
        <TopBar user={user} />
        <div className="body" style={{ background: "var(--bg)" }}>
          <SuccessScene
            title="Solicitação enviada!"
            message={`Seu gestor vai aprovar em até 48h. Você tirará ${dias} dias a partir de ${inicio?.toLocaleDateString("pt-BR")}.`}
            protocol="FER-10248"
            onDone={onDone}
            autoSeconds={6}
            narration="Pronto! Enviamos para seu gestor aprovar."
          />
        </div>
        <FooterBar onVoice={() => {}} />
      </>
    );
  }

  return (
    <>
      <TopBar user={user} onBack={() => step > 1 ? setStep(step - 1) : onBack()} />
      <div className="body flow">
        <style>{`
          .fer-saldo {
            flex: 1;
            display: grid;
            grid-template-columns: 1.1fr 1fr;
            gap: 24px;
          }
          .fer-big {
            background: var(--ink);
            color: #fff;
            border-radius: 24px;
            padding: 40px;
            position: relative;
            overflow: hidden;
            display: flex; flex-direction: column; justify-content: center;
          }
          .fer-big::before {
            content: "";
            position: absolute; right: -60px; top: -60px;
            width: 280px; height: 280px; border-radius: 50%;
            background: radial-gradient(circle, rgba(245,166,35,.2), transparent 70%);
          }
          .fer-big .lbl {
            font-family: var(--f-mono);
            font-size: 12px; letter-spacing: 0.22em;
            color: rgba(255,255,255,.55);
            margin-bottom: 16px;
          }
          .fer-big .num {
            font-size: 180px;
            font-weight: 900;
            letter-spacing: -0.06em;
            line-height: 0.9;
            color: var(--orange);
          }
          .fer-big .un { font-size: 32px; font-weight: 700; color: #fff; margin-left: 12px; }
          .fer-big .sub { font-size: 20px; color: rgba(255,255,255,.8); margin-top: 24px; line-height: 1.4; }
          .fer-side { display: flex; flex-direction: column; gap: 16px; justify-content: center; }
          .fer-card {
            background: #fff; border: 1px solid var(--line); border-radius: 16px;
            padding: 20px 24px;
          }
          .fer-card .k { font-family: var(--f-mono); font-size: 11px; color: var(--muted); letter-spacing: 0.2em; }
          .fer-card .v { font-size: 26px; font-weight: 800; color: var(--ink); margin-top: 6px; }
          .fer-card .v.warn { color: var(--orange-ink); }

          .cal-wrap {
            flex: 1;
            display: grid; grid-template-columns: 1fr 340px; gap: 24px;
          }
          .cal {
            background: #fff; border-radius: 20px; border: 1px solid var(--line);
            padding: 24px;
            display: flex; flex-direction: column;
          }
          .cal-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
          .cal-head .m { font-size: 22px; font-weight: 800; color: var(--ink); }
          .cal-head button {
            width: 44px; height: 44px; border-radius: 12px;
            background: var(--bg); border: 1px solid var(--line);
            display: grid; place-items: center; cursor: pointer;
          }
          .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; flex: 1; }
          .cal-dow { font-family: var(--f-mono); font-size: 11px; letter-spacing: 0.14em; color: var(--muted); text-align: center; padding: 6px 0; font-weight: 600; }
          .cal-d {
            display: grid; place-items: center;
            font-size: 18px; font-weight: 600;
            border-radius: 10px;
            cursor: pointer;
            border: 2px solid transparent;
            color: var(--ink);
          }
          .cal-d.out { color: var(--muted-2); }
          .cal-d.today { border-color: var(--ink); }
          .cal-d.sel { background: var(--orange); color: var(--ink); }
          .cal-d.range { background: var(--orange-soft); color: var(--orange-ink); }
          .cal-d:hover:not(.out) { background: var(--bg-2); }
          .cal-d.sel:hover, .cal-d.range:hover { filter: brightness(.95); }

          .dias-box {
            background: var(--ink); color: #fff;
            border-radius: 20px; padding: 28px; display: flex; flex-direction: column; gap: 16px;
          }
          .dias-box .k { font-family: var(--f-mono); font-size: 11px; letter-spacing: 0.2em; color: rgba(255,255,255,.55); }
          .dias-box .v { font-size: 72px; font-weight: 900; color: var(--orange); line-height: 1; }
          .dias-ctrl { display: flex; gap: 10px; align-items: center; }
          .dias-ctrl button {
            width: 60px; height: 60px; border-radius: 14px;
            background: rgba(255,255,255,.1); border: none; color: #fff;
            font-size: 28px; font-weight: 700; cursor: pointer;
          }
          .dias-ctrl .val { flex: 1; text-align: center; font-size: 28px; font-weight: 800; }
        `}</style>

        <div className="flow-head">
          <h1 className="flow-title">
            <span className="eyebrow">FÉRIAS · PASSO {step} DE 3</span>
            {step === 1 && "Seu saldo de férias"}
            {step === 2 && "Quando você quer sair?"}
            {step === 3 && "Confira e envie"}
          </h1>
        </div>

        {step === 1 && (
          <div className="flow-body fer-saldo">
            <div className="fer-big">
              <div className="lbl">SALDO DISPONÍVEL</div>
              <div>
                <span className="num">{saldoTotal}</span>
                <span className="un">dias</span>
              </div>
              <div className="sub">Você adquiriu direito em 03/set/2025. Precisa tirar até 03/set/2026.</div>
            </div>
            <div className="fer-side">
              <div className="fer-card">
                <div className="k">PERÍODO AQUISITIVO</div>
                <div className="v">set/2024 — set/2025</div>
              </div>
              <div className="fer-card">
                <div className="k">ABONO PECUNIÁRIO</div>
                <div className="v">Até 8 dias · R$ 1.150</div>
              </div>
              <div className="fer-card">
                <div className="k">RECOMENDAÇÃO</div>
                <div className="v warn">Tire pelo menos 14 dias seguidos</div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flow-body cal-wrap">
            <div className="cal">
              <div className="cal-head">
                <button><Icon name="chevron_left" /></button>
                <div className="m">Maio · 2026</div>
                <button><Icon name="chevron_right" /></button>
              </div>
              <div className="cal-grid">
                {["DOM","SEG","TER","QUA","QUI","SEX","SÁB"].map(d => <div key={d} className="cal-dow">{d}</div>)}
                {[...Array(35)].map((_, i) => {
                  const day = i - 4;
                  const out = day < 1 || day > 31;
                  const selStart = day === 11;
                  const inRange = day >= 11 && day < 11 + dias;
                  return (
                    <div
                      key={i}
                      className={"cal-d" + (out ? " out" : "") + (selStart ? " sel" : (inRange ? " range" : ""))}
                      onClick={() => !out && setInicio(new Date(2026, 4, day))}
                    >{out ? "" : day}</div>
                  );
                })}
              </div>
            </div>
            <div className="dias-box">
              <div>
                <div className="k">INÍCIO</div>
                <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>11 · maio · 2026</div>
              </div>
              <div>
                <div className="k">QUANTOS DIAS</div>
                <div className="v">{dias}</div>
                <div className="dias-ctrl">
                  <button onClick={() => setDias(Math.max(5, dias - 1))}>−</button>
                  <span className="val">dias</span>
                  <button onClick={() => setDias(Math.min(saldoTotal, dias + 1))}>+</button>
                </div>
              </div>
              <div style={{ background: "rgba(245,166,35,.15)", border: "1px solid var(--orange)", borderRadius: 12, padding: 14, fontSize: 14, color: "#FFE8BF" }}>
                <Icon name="info" style={{ verticalAlign: "middle", marginRight: 6, color: "var(--orange)" }} />
                Você vai usar {dias} dos seus {saldoTotal} dias. Sobram {saldoTotal - dias}.
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flow-body" style={{ display: "block" }}>
            <div className="card" style={{ padding: 32, display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
                <div><div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--muted)", letterSpacing: ".2em" }}>INÍCIO</div><div style={{ fontSize: 28, fontWeight: 800, color: "var(--ink)" }}>11 mai 2026</div></div>
                <div><div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--muted)", letterSpacing: ".2em" }}>RETORNO</div><div style={{ fontSize: 28, fontWeight: 800, color: "var(--ink)" }}>26 mai 2026</div></div>
                <div><div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--muted)", letterSpacing: ".2em" }}>DIAS</div><div style={{ fontSize: 28, fontWeight: 800, color: "var(--orange)" }}>{dias} dias</div></div>
              </div>
              <div style={{ padding: 20, background: "var(--bg)", borderRadius: 14, fontSize: 17, color: "var(--ink)", lineHeight: 1.5 }}>
                Seu gestor <b>Carlos Almeida</b> será notificado agora. A aprovação costuma sair em até 48h.
                Você recebe a confirmação por SMS no número <b>(••) •••• {user.cel}</b>.
              </div>
            </div>
          </div>
        )}

        <div className="flow-actions">
          <button className="btn btn-ghost btn-lg" onClick={() => step > 1 ? setStep(step - 1) : onBack()}>
            <Icon name="arrow_back" /> {step === 1 ? "CANCELAR" : "VOLTAR"}
          </button>
          <button className="btn btn-primary btn-lg" onClick={() => setStep(step + 1)}>
            {step === 3 ? "ENVIAR SOLICITAÇÃO" : "CONTINUAR"} <Icon name="arrow_forward" />
          </button>
        </div>
      </div>
      <FooterBar onVoice={() => {}} />
    </>
  );
}

window.FeriasScreen = FeriasScreen;
