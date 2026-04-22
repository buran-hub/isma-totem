/* chamar.jsx — F5 Chamar Encarregado */

function ChamarScreen({ user, onBack, onDone }) {
  const [step, setStep] = useState(1); // 1 motivo, 2 aguardando
  const [motivo, setMotivo] = useState(null);
  const [statusIdx, setStatusIdx] = useState(0);

  const motivos = [
    ["Dúvida", "help", "Sobre processo ou procedimento"],
    ["Problema na máquina", "build_circle", "Algo não está funcionando"],
    ["Falta de material", "inventory_2", "Acabou EPI, insumo ou peça"],
    ["Outro", "more_horiz", "Explicar ao encarregado"],
  ];

  const statusSeq = [
    { k: "Notificado", ic: "send", t: "Encarregado recebeu seu chamado." },
    { k: "Visualizou", ic: "visibility", t: "Carlos viu a notificação." },
    { k: "A caminho", ic: "directions_run", t: "Carlos está indo até você." },
  ];

  useEffect(() => {
    if (step !== 2) return;
    if (statusIdx >= statusSeq.length - 1) return;
    const id = setTimeout(() => setStatusIdx(s => s + 1), 2200);
    return () => clearTimeout(id);
  }, [step, statusIdx]);

  return (
    <>
      <TopBar user={user} onBack={step === 1 ? onBack : undefined} />
      <div className="body flow">
        <style>{`
          .cham-waiting {
            flex: 1; display: grid; place-items: center;
            padding: 20px;
          }
          .cham-pulse {
            width: 200px; height: 200px;
            border-radius: 50%;
            background: var(--orange);
            color: var(--ink);
            display: grid; place-items: center;
            margin: 0 auto 32px;
            position: relative;
          }
          .cham-pulse::before, .cham-pulse::after {
            content: ""; position: absolute; inset: 0;
            border-radius: 50%;
            border: 3px solid var(--orange);
            animation: cham-ring 2s ease-out infinite;
          }
          .cham-pulse::after { animation-delay: 1s; }
          @keyframes cham-ring {
            0% { transform: scale(1); opacity: .8; }
            100% { transform: scale(1.6); opacity: 0; }
          }
          .cham-status-list { display: flex; flex-direction: column; gap: 14px; margin-top: 24px; max-width: 520px; }
          .cham-status-it {
            display: flex; align-items: center; gap: 16px;
            padding: 18px 22px;
            background: #fff; border: 2px solid var(--line);
            border-radius: 14px;
            transition: all .2s;
          }
          .cham-status-it.done { border-color: var(--green); background: var(--green-soft); }
          .cham-status-it.active { border-color: var(--orange); background: var(--orange-soft); animation: statusPulse 1.2s ease-in-out infinite; }
          @keyframes statusPulse { 0%,100% { transform: translateX(0); } 50% { transform: translateX(4px); } }
          .cham-status-it .ic {
            width: 48px; height: 48px; border-radius: 12px;
            background: var(--bg-2); display: grid; place-items: center;
            flex: 0 0 auto;
          }
          .cham-status-it.done .ic { background: var(--green); color: #fff; }
          .cham-status-it.active .ic { background: var(--orange); color: var(--ink); }
          .cham-status-it .k { font-size: 18px; font-weight: 800; color: var(--ink); }
          .cham-status-it .t { font-size: 14px; color: var(--muted); }
        `}</style>

        {step === 1 && (
          <>
            <div className="flow-head">
              <h1 className="flow-title">
                <span className="eyebrow">CHAMAR ENCARREGADO</span>
                Qual é o motivo?
              </h1>
            </div>
            <div className="flow-body">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, width: "100%" }}>
                {motivos.map(([t, ic, s]) => (
                  <button key={t} className={"opt" + (motivo === t ? " selected" : "")} onClick={() => setMotivo(t)}>
                    <div className="opt-ico"><Icon name={ic} /></div>
                    <div className="opt-body">
                      <div className="opt-title">{t}</div>
                      <div className="opt-sub">{s}</div>
                    </div>
                    <div className="opt-check">{motivo === t && <Icon name="check" />}</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="flow-actions">
              <button className="btn btn-ghost btn-lg" onClick={onBack}><Icon name="close" /> CANCELAR</button>
              <button className="btn btn-primary btn-lg" disabled={!motivo} style={!motivo ? { opacity: .5 } : {}} onClick={() => setStep(2)}>
                <Icon name="send" /> CHAMAR AGORA
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="flow-head">
              <h1 className="flow-title">
                <span className="eyebrow">CHAMADO ABERTO · #EC-8843</span>
                Aguarde um momento, {user.name.split(" ")[0]}
              </h1>
            </div>
            <div className="cham-waiting">
              <div style={{ textAlign: "center" }}>
                <div className="cham-pulse"><Icon name="support_agent" size={96} /></div>
                <div style={{ fontSize: 24, fontWeight: 800, color: "var(--ink)" }}>Carlos Almeida</div>
                <div style={{ fontSize: 16, color: "var(--muted)", marginTop: 4 }}>Seu encarregado · Setor Costura</div>
                <div className="cham-status-list" style={{ margin: "24px auto 0" }}>
                  {statusSeq.map((s, i) => (
                    <div key={i} className={"cham-status-it " + (i < statusIdx ? "done" : (i === statusIdx ? "active" : ""))}>
                      <div className="ic"><Icon name={i < statusIdx ? "check" : s.ic} /></div>
                      <div>
                        <div className="k">{s.k}</div>
                        <div className="t">{s.t}</div>
                      </div>
                      {i === statusIdx && <div style={{ marginLeft: "auto", fontFamily: "var(--f-mono)", fontSize: 12, color: "var(--orange-ink)", fontWeight: 700 }}>AGORA</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flow-actions between">
              <button className="btn btn-ghost btn-lg" onClick={onDone}>
                <Icon name="home" /> VOLTAR PARA O INÍCIO
              </button>
              <button className="btn btn-danger btn-lg" onClick={onDone}>
                <Icon name="cancel" /> CANCELAR CHAMADO
              </button>
            </div>
          </>
        )}
      </div>
      <FooterBar onVoice={() => {}} />
    </>
  );
}

window.ChamarScreen = ChamarScreen;
