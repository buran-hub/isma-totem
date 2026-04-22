/* atestado.jsx — F2 Anexar atestado médico */

function AtestadoScreen({ user, onBack, onDone }) {
  const [step, setStep] = useState(1); // 1 instrução, 2 captura, 3 revisão, 4 dados, 5 success
  const [tipo, setTipo] = useState(null);
  const [dias, setDias] = useState(null);

  const next = () => setStep(s => s + 1);
  const prev = () => step > 1 ? setStep(s => s - 1) : onBack();

  if (step === 5) {
    return (
      <>
        <TopBar user={user} />
        <div className="body" style={{ background: "var(--bg)" }}>
          <SuccessScene
            title="Atestado enviado!"
            message="O RH foi notificado e vai validar em até 24h. Você vai receber a confirmação por SMS."
            protocol="ATST-24891"
            onDone={onDone}
            autoSeconds={6}
            narration="Tudo certo, seu atestado foi enviado."
          />
        </div>
        <FooterBar onVoice={() => {}} />
      </>
    );
  }

  return (
    <>
      <TopBar user={user} onBack={prev} />
      <div className="body flow">
        <style>{`
          .atst-steps {
            display: flex; gap: 8px; margin-bottom: 4px;
          }
          .atst-step {
            flex: 1; height: 6px; border-radius: 3px;
            background: var(--line);
          }
          .atst-step.active { background: var(--orange); }
          .atst-step.done { background: var(--ink); }

          .cap-area {
            flex: 1;
            background: #0F1D30;
            border-radius: 20px;
            position: relative;
            overflow: hidden;
            display: grid; place-items: center;
            color: #fff;
          }
          .cap-area::before {
            content: "";
            position: absolute; inset: 0;
            background-image: repeating-linear-gradient(0deg, rgba(255,255,255,.03) 0 2px, transparent 2px 4px);
          }
          .doc-frame {
            position: relative;
            width: 54%; aspect-ratio: 3/4;
            background: linear-gradient(180deg, #F9FAFB 0%, #E7EBF1 100%);
            border-radius: 8px;
            box-shadow: 0 30px 60px -10px rgba(0,0,0,.6);
            padding: 18px;
            display: flex; flex-direction: column; gap: 10px;
          }
          .doc-frame .ln {
            height: 6px; background: #D5DBE4; border-radius: 2px;
          }
          .doc-frame .ln.short { width: 40%; }
          .doc-frame .ln.med { width: 70%; }
          .doc-frame .stamp {
            position: absolute;
            bottom: 16px; right: 16px;
            width: 80px; height: 80px; border-radius: 50%;
            border: 3px solid rgba(217,45,32,.5);
            color: rgba(217,45,32,.7);
            display: grid; place-items: center;
            font-family: var(--f-mono); font-size: 10px;
            letter-spacing: 0.14em;
            transform: rotate(-8deg);
            font-weight: 700;
          }
          .doc-corners::before, .doc-corners::after,
          .doc-corners .b1, .doc-corners .b2 {
            content: ""; position: absolute;
            width: 48px; height: 48px;
            border: 4px solid var(--orange);
          }
          .doc-corners::before { top: -14px; left: -14px; border-right: none; border-bottom: none; border-top-left-radius: 10px; }
          .doc-corners::after { top: -14px; right: -14px; border-left: none; border-bottom: none; border-top-right-radius: 10px; }
          .doc-corners .b1 { bottom: -14px; left: -14px; border-right: none; border-top: none; border-bottom-left-radius: 10px; }
          .doc-corners .b2 { bottom: -14px; right: -14px; border-left: none; border-top: none; border-bottom-right-radius: 10px; }

          .scan-bar {
            position: absolute; left: 0; right: 0;
            height: 4px;
            background: linear-gradient(90deg, transparent, var(--orange), transparent);
            box-shadow: 0 0 12px var(--orange);
            animation: scanBar 2s ease-in-out infinite;
          }
          @keyframes scanBar {
            0%,100% { top: 10%; }
            50% { top: 85%; }
          }
          .cap-status {
            position: absolute;
            top: 20px; left: 50%; transform: translateX(-50%);
            padding: 8px 16px;
            background: rgba(18,183,106,.12);
            color: var(--green);
            border: 1px solid var(--green);
            border-radius: 999px;
            font-family: var(--f-mono);
            font-size: 11px; letter-spacing: 0.18em;
            display: flex; align-items: center; gap: 8px;
          }
          .cap-status .d {
            width: 8px; height: 8px; border-radius: 50%;
            background: var(--green);
          }
          .cap-foot {
            position: absolute; bottom: 20px; left: 50%;
            transform: translateX(-50%);
            display: flex; gap: 10px;
          }
          .alt-audio {
            padding: 12px 18px;
            background: rgba(255,255,255,.08);
            border: 1px solid rgba(255,255,255,.12);
            border-radius: 10px;
            color: #fff;
            font: inherit; font-size: 14px; font-weight: 600;
            display: flex; align-items: center; gap: 8px;
            cursor: pointer;
          }

          .inst-grid {
            flex: 1;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
          .inst-side {
            display: flex; flex-direction: column; gap: 14px; justify-content: center;
          }
          .inst-step {
            display: flex; gap: 14px; align-items: flex-start;
            padding: 14px 18px;
            background: #fff; border: 1px solid var(--line);
            border-radius: 14px;
          }
          .inst-step .num {
            width: 36px; height: 36px; border-radius: 50%;
            background: var(--ink); color: #fff;
            display: grid; place-items: center;
            font-weight: 800;
            flex: 0 0 auto;
          }
          .inst-step .tt { font-size: 17px; font-weight: 700; color: var(--ink); }
          .inst-step .ss { font-size: 13px; color: var(--muted); margin-top: 2px; line-height: 1.4; }
          .inst-visual {
            background: #0F1D30;
            border-radius: 20px;
            position: relative;
            display: grid; place-items: center;
            color: #fff;
            padding: 24px;
            overflow: hidden;
          }
        `}</style>

        <div className="flow-head">
          <h1 className="flow-title">
            <span className="eyebrow">ATESTADO · PASSO {step} DE 4</span>
            {step === 1 && "Como enviar seu atestado"}
            {step === 2 && "Posicione o documento"}
            {step === 3 && "Confirme os dados"}
            {step === 4 && "Tipo de afastamento"}
          </h1>
        </div>

        <div className="atst-steps">
          {[1,2,3,4].map(i => (
            <div key={i} className={"atst-step " + (i < step ? "done" : (i === step ? "active" : ""))} />
          ))}
        </div>

        {step === 1 && (
          <div className="flow-body">
            <div className="inst-grid">
              <div className="inst-side">
                <div className="inst-step"><div className="num">1</div><div><div className="tt">Pegue o atestado em papel</div><div className="ss">Original, com carimbo e assinatura do médico.</div></div></div>
                <div className="inst-step"><div className="num">2</div><div><div className="tt">Deixe bem iluminado</div><div className="ss">A câmera do totem vai detectar automaticamente.</div></div></div>
                <div className="inst-step"><div className="num">3</div><div><div className="tt">Mantenha parado por 1 segundo</div><div className="ss">Assim a foto sai nítida. Se errar, você pode tirar de novo.</div></div></div>
                <div className="inst-step"><div className="num">4</div><div><div className="tt">Se não tiver o documento</div><div className="ss">Você pode gravar um áudio contando o motivo.</div></div></div>
              </div>
              <div className="inst-visual">
                <Icon name="description" size={140} style={{ color: "var(--orange)", opacity: .9 }} />
                <div style={{ position: "absolute", bottom: 24, fontSize: 14, color: "rgba(255,255,255,.6)", textAlign: "center" }}>
                  Fique tranquilo. Leva uns 30 segundos.
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flow-body">
            <div className="cap-area">
              <div className="cap-status"><span className="d" />DOCUMENTO DETECTADO</div>
              <div className="doc-frame">
                <div className="doc-corners"><span className="b1" /><span className="b2" /></div>
                <div className="ln med" /><div className="ln" /><div className="ln short" />
                <div className="ln" /><div className="ln med" /><div className="ln" />
                <div className="ln short" /><div className="ln med" />
                <div className="stamp">MÉDICO</div>
              </div>
              <div className="scan-bar" />
              <div className="cap-foot">
                <button className="alt-audio"><Icon name="mic" /> GRAVAR ÁUDIO</button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flow-body" style={{ gap: 20, flexDirection: "column" }}>
            <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 24, flex: 1 }}>
              <div style={{ background: "#fff", borderRadius: 14, border: "1px solid var(--line)", padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ flex: 1, background: "#F9FAFB", borderRadius: 8, display: "flex", flexDirection: "column", gap: 6, padding: 16 }}>
                  <div style={{ height: 4, background: "#D5DBE4", borderRadius: 2, width: "80%" }} />
                  <div style={{ height: 4, background: "#D5DBE4", borderRadius: 2 }} />
                  <div style={{ height: 4, background: "#D5DBE4", borderRadius: 2, width: "50%" }} />
                  <div style={{ height: 4, background: "#D5DBE4", borderRadius: 2 }} />
                  <div style={{ height: 4, background: "#D5DBE4", borderRadius: 2, width: "70%" }} />
                </div>
                <button className="btn btn-ghost" style={{ height: 52, fontSize: 14 }}><Icon name="refresh" /> TIRAR DE NOVO</button>
              </div>
              <div className="card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ fontFamily: "var(--f-mono)", fontSize: 12, letterSpacing: ".2em", color: "var(--muted)" }}>LEITURA AUTOMÁTICA</div>
                {[
                  ["Médico", "Dr. Roberto Neves · CRM 48.221"],
                  ["Data do atendimento", "19 · abril · 2026"],
                  ["CID", "J06.9 — Infecção respiratória"],
                  ["Dias de afastamento", "2 dias"],
                ].map(([k, v], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < 3 ? "1px solid var(--line)" : "none" }}>
                    <span style={{ color: "var(--muted)", fontSize: 15 }}>{k}</span>
                    <span style={{ fontWeight: 700, color: "var(--ink)", fontSize: 17 }}>{v}</span>
                  </div>
                ))}
                <div style={{ marginTop: "auto", padding: 14, background: "var(--green-soft)", borderRadius: 10, fontSize: 14, color: "var(--green-ink)", display: "flex", gap: 10, alignItems: "center" }}>
                  <Icon name="verified" style={{ color: "var(--green)" }} />
                  Tudo legível. Os dados foram lidos corretamente?
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="flow-body" style={{ flexDirection: "column", gap: 14 }}>
            <div style={{ fontSize: 18, color: "var(--muted)", marginBottom: 4 }}>Qual foi o motivo do afastamento?</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
              {[
                ["Consulta", "stethoscope", "Ida ao médico sem internação"],
                ["Exame", "biotech", "Exames laboratoriais ou imagem"],
                ["Internação", "local_hospital", "Ficou internado no hospital"],
              ].map(([t, ic, s]) => (
                <button key={t} className={"opt" + (tipo === t ? " selected" : "")} style={{ flexDirection: "column", alignItems: "flex-start", gap: 14, padding: 20 }} onClick={() => setTipo(t)}>
                  <div className="opt-ico" style={{ width: 52, height: 52 }}><Icon name={ic} size={28} /></div>
                  <div>
                    <div className="opt-title">{t}</div>
                    <div className="opt-sub">{s}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flow-actions">
          <button className="btn btn-ghost btn-lg" onClick={prev}><Icon name="arrow_back" /> {step === 1 ? "CANCELAR" : "VOLTAR"}</button>
          <button className="btn btn-primary btn-lg" onClick={next} disabled={step === 4 && !tipo} style={step === 4 && !tipo ? { opacity: 0.5 } : {}}>
            {step === 4 ? "ENVIAR ATESTADO" : "CONTINUAR"} <Icon name="arrow_forward" />
          </button>
        </div>
      </div>
      <FooterBar onVoice={() => {}} />
    </>
  );
}

window.AtestadoScreen = AtestadoScreen;
