/* incidente.jsx — F6 Reportar Incidente de Segurança */

function IncidenteScreen({ user, onBack, onDone }) {
  const [step, setStep] = useState(1); // 1 tipo, 2 detalhe, 3 success
  const [tipo, setTipo] = useState(null);
  const [anonimo, setAnonimo] = useState(false);
  const [modo, setModo] = useState(null); // 'voz' | 'lista'
  const [itens, setItens] = useState([]);

  const tipos = [
    { k: "ACIDENTE", sub: "Alguém se feriu ou se machucou", ic: "e911_emergency", color: "red" },
    { k: "QUASE ACIDENTE", sub: "Algo perigoso quase aconteceu", ic: "warning", color: "amber" },
    { k: "CONDIÇÃO INSEGURA", sub: "Um risco no ambiente", ic: "report", color: "yellow" },
  ];
  const opcoesPre = [
    "Vazamento no piso", "Fiação exposta", "EPI inadequado",
    "Máquina sem proteção", "Iluminação ruim", "Obstrução de rota de fuga",
    "Produto químico mal guardado", "Alarme não funciona",
  ];
  const toggleItem = (x) => setItens(arr => arr.includes(x) ? arr.filter(i => i !== x) : [...arr, x]);

  if (step === 3) {
    return (
      <>
        <TopBar user={user} />
        <div className="body" style={{ background: "var(--bg)" }}>
          <SuccessScene
            title="Relato recebido!"
            message={anonimo
              ? "Registramos seu relato de forma anônima. Encarregado, Segurança e RH foram avisados."
              : `Obrigado, ${user.name.split(" ")[0]}. A equipe de Segurança já foi notificada.`}
            protocol="INC-00492"
            onDone={onDone}
            autoSeconds={6}
            narration="Relato recebido. Você ajudou a proteger todo mundo aqui."
          />
        </div>
        <FooterBar onVoice={() => {}} />
      </>
    );
  }

  return (
    <>
      <TopBar user={user} onBack={step === 1 ? onBack : () => setStep(1)} />
      <div className="body flow">
        <style>{`
          .inc-cards { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; width: 100%; }
          .inc-card {
            padding: 26px 22px;
            border-radius: 16px;
            border: 3px solid transparent;
            cursor: pointer;
            text-align: left;
            font: inherit;
            color: #fff;
            display: flex; flex-direction: column; gap: 12px;
            min-height: 240px;
            justify-content: space-between;
            position: relative;
            overflow: hidden;
          }
          .inc-card.red { background: linear-gradient(180deg, #D92D20, #9F1D13); }
          .inc-card.amber { background: linear-gradient(180deg, #F59E0B, #B45309); }
          .inc-card.yellow { background: linear-gradient(180deg, #EAB308, #854D0E); color: #fff; }
          .inc-card.selected { box-shadow: 0 0 0 6px rgba(11,35,64,.2); transform: scale(1.02); }
          .inc-card .hd { display: flex; align-items: center; gap: 12px; }
          .inc-card .hd .n {
            width: 40px; height: 40px; border-radius: 50%;
            background: rgba(255,255,255,.18); display: grid; place-items: center;
            font-family: var(--f-mono); font-size: 12px; letter-spacing: 0.14em; font-weight: 800;
          }
          .inc-card .ic { font-size: 80px; opacity: .95; }
          .inc-card .t { font-size: 26px; font-weight: 900; letter-spacing: 0.01em; line-height: 1.05; }
          .inc-card .s { font-size: 14px; color: rgba(255,255,255,.85); line-height: 1.4; }
          .inc-card::after {
            content: ""; position: absolute;
            right: -30px; bottom: -30px;
            width: 140px; height: 140px; border-radius: 50%;
            background: rgba(255,255,255,.08);
          }

          .anon-row {
            margin-top: 16px; padding: 16px 20px;
            background: var(--bg-2); border-radius: 12px;
            display: flex; align-items: center; gap: 14px;
          }
          .anon-tg {
            width: 52px; height: 30px; border-radius: 999px;
            background: var(--line); border: none; position: relative;
            cursor: pointer; padding: 0; flex: 0 0 auto;
          }
          .anon-tg::after {
            content: ""; position: absolute; top: 3px; left: 3px;
            width: 24px; height: 24px; border-radius: 50%;
            background: #fff; transition: left .15s;
          }
          .anon-tg.on { background: var(--ink); }
          .anon-tg.on::after { left: 25px; }

          .inc-modos { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
          .inc-modo {
            padding: 28px;
            border: 2px solid var(--line);
            border-radius: 16px; background: #fff;
            cursor: pointer; font: inherit; text-align: center;
            display: flex; flex-direction: column; align-items: center; gap: 14px;
          }
          .inc-modo.selected { border-color: var(--ink); background: var(--ink); color: #fff; }
          .inc-modo.selected .ic { background: var(--orange); color: var(--ink); }
          .inc-modo .ic {
            width: 80px; height: 80px; border-radius: 50%;
            background: var(--bg); display: grid; place-items: center;
          }
          .inc-modo .t { font-size: 22px; font-weight: 800; }
          .inc-modo .s { font-size: 14px; color: var(--muted); }
          .inc-modo.selected .s { color: rgba(255,255,255,.7); }

          .lista { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 16px; }
          .lista .chip {
            padding: 16px 18px;
            background: #fff; border: 2px solid var(--line);
            border-radius: 12px; cursor: pointer;
            display: flex; align-items: center; gap: 12px;
            font-size: 16px; font-weight: 600; color: var(--ink);
            text-align: left;
          }
          .lista .chip.on { border-color: var(--red); background: var(--red-soft); color: var(--red-ink); }
          .lista .chip .bx {
            width: 24px; height: 24px; border-radius: 6px;
            border: 2px solid var(--line); flex: 0 0 auto;
            display: grid; place-items: center;
          }
          .lista .chip.on .bx { background: var(--red); border-color: var(--red); color: #fff; }

          .voz-card {
            background: var(--ink); color: #fff; border-radius: 16px;
            padding: 28px; text-align: center;
            display: flex; flex-direction: column; align-items: center; gap: 14px;
            margin-top: 16px;
          }
          .voz-mic {
            width: 100px; height: 100px; border-radius: 50%;
            background: var(--red);
            display: grid; place-items: center;
            animation: voz-pulse 1.4s ease-in-out infinite;
          }
          @keyframes voz-pulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(217,45,32,.5); }
            50% { box-shadow: 0 0 0 16px rgba(217,45,32,0); }
          }
          .voz-wave { display: flex; gap: 4px; height: 48px; align-items: center; }
          .voz-wave span {
            width: 4px; background: var(--orange); border-radius: 2px;
            animation: wave 1.2s ease-in-out infinite;
          }
          @keyframes wave {
            0%,100% { height: 8px; }
            50% { height: 40px; }
          }
        `}</style>

        {step === 1 && (
          <>
            <div className="flow-head">
              <h1 className="flow-title" style={{ color: "var(--red)" }}>
                <span className="eyebrow" style={{ color: "var(--red)" }}>RELATAR INCIDENTE · PASSO 1 DE 2</span>
                O que aconteceu?
              </h1>
            </div>
            <div className="flow-body" style={{ flexDirection: "column" }}>
              <div className="inc-cards">
                {tipos.map((t, i) => (
                  <button key={t.k} className={"inc-card " + t.color + (tipo === t.k ? " selected" : "")} onClick={() => setTipo(t.k)}>
                    <div className="hd"><div className="n">0{i+1}</div></div>
                    <Icon name={t.ic} className="ic" />
                    <div>
                      <div className="t">{t.k}</div>
                      <div className="s">{t.sub}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="anon-row">
                <button className={"anon-tg" + (anonimo ? " on" : "")} onClick={() => setAnonimo(!anonimo)} />
                <div>
                  <div style={{ fontWeight: 700, color: "var(--ink)", fontSize: 16 }}>Relatar de forma anônima</div>
                  <div style={{ fontSize: 13, color: "var(--muted)" }}>Registramos apenas o setor, não seu nome.</div>
                </div>
              </div>
            </div>
            <div className="flow-actions">
              <button className="btn btn-ghost btn-lg" onClick={onBack}><Icon name="close" /> CANCELAR</button>
              <button className="btn btn-danger btn-lg" disabled={!tipo} style={!tipo ? { opacity: .5 } : {}} onClick={() => setStep(2)}>
                CONTINUAR <Icon name="arrow_forward" />
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="flow-head">
              <h1 className="flow-title">
                <span className="eyebrow" style={{ color: "var(--red)" }}>{tipo} · PASSO 2 DE 2</span>
                Como você quer contar?
              </h1>
            </div>
            <div className="flow-body" style={{ flexDirection: "column", overflow: "auto" }}>
              <div className="inc-modos">
                <button className={"inc-modo" + (modo === "voz" ? " selected" : "")} onClick={() => setModo("voz")}>
                  <div className="ic"><Icon name="mic" size={40} /></div>
                  <div className="t">Contar falando</div>
                  <div className="s">Aperte e diga o que viu. Você tem 60 segundos.</div>
                </button>
                <button className={"inc-modo" + (modo === "lista" ? " selected" : "")} onClick={() => setModo("lista")}>
                  <div className="ic"><Icon name="checklist" size={40} /></div>
                  <div className="t">Escolher da lista</div>
                  <div className="s">Marque o que está errado. Pode marcar mais de um.</div>
                </button>
              </div>

              {modo === "voz" && (
                <div className="voz-card">
                  <div className="voz-mic"><Icon name="mic" size={48} /></div>
                  <div className="voz-wave">{[...Array(24)].map((_,i) => <span key={i} style={{ animationDelay: (i * 60) + "ms" }} />)}</div>
                  <div style={{ fontSize: 20, fontWeight: 700 }}>Pode falar</div>
                  <div style={{ fontSize: 14, opacity: .7, fontFamily: "var(--f-mono)", letterSpacing: ".16em" }}>00:08 / 01:00</div>
                </div>
              )}

              {modo === "lista" && (
                <div className="lista">
                  {opcoesPre.map(o => (
                    <button key={o} className={"chip" + (itens.includes(o) ? " on" : "")} onClick={() => toggleItem(o)}>
                      <div className="bx">{itens.includes(o) && <Icon name="check" size={16} />}</div>
                      {o}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flow-actions">
              <button className="btn btn-ghost btn-lg" onClick={() => setStep(1)}><Icon name="arrow_back" /> VOLTAR</button>
              <button className="btn btn-danger btn-lg" disabled={!modo || (modo === "lista" && !itens.length)} style={(!modo || (modo === "lista" && !itens.length)) ? { opacity: .5 } : {}} onClick={() => setStep(3)}>
                <Icon name="send" /> ENVIAR RELATO
              </button>
            </div>
          </>
        )}
      </div>
      <FooterBar onVoice={() => {}} />
    </>
  );
}

window.IncidenteScreen = IncidenteScreen;
