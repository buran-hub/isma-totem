/* falha.jsx — F7 Reportar Falha em Maquinário */

function FalhaScreen({ user, onBack, onDone }) {
  const [step, setStep] = useState(1); // 1 máquina, 2 falha+urgência, 3 success
  const [maquina, setMaquina] = useState(null);
  const [falhas, setFalhas] = useState([]);
  const [urgencia, setUrgencia] = useState(null);

  const maquinas = [
    { id: "M-12", n: "Reta M-12", tipo: "Máquina de costura reta", ic: "precision_manufacturing" },
    { id: "OV-04", n: "Overloque 04", tipo: "Costura de acabamento", ic: "linear_scale" },
    { id: "GL-01", n: "Galoneira 01", tipo: "Costura elástica", ic: "waves" },
    { id: "CR-03", n: "Corte CR-03", tipo: "Mesa de corte", ic: "content_cut" },
    { id: "PS-02", n: "Passadeira 02", tipo: "Prensa de acabamento", ic: "iron" },
    { id: "EB-01", n: "Embaladora", tipo: "Embalagem final", ic: "inventory" },
  ];
  const falhasComuns = [
    "Faz barulho estranho", "Não liga", "Trava no meio da operação",
    "Linha quebrando toda hora", "Superaqueceu", "Pulando pontos",
    "Vibração fora do normal", "Agulha quebrou",
  ];
  const urgencias = [
    { k: "PAROU", t: "Parou de funcionar", s: "Não dá pra trabalhar com ela", color: "var(--red)" },
    { k: "RISCO", t: "Risco de parar", s: "Ainda funciona, mas pode parar", color: "var(--amber)" },
    { k: "PROBLEMA", t: "Com problema", s: "Funciona, mas não está 100%", color: "var(--yellow)" },
  ];

  const toggleFalha = (x) => setFalhas(a => a.includes(x) ? a.filter(i => i !== x) : [...a, x]);

  if (step === 3) {
    return (
      <>
        <TopBar user={user} />
        <div className="body" style={{ background: "var(--bg)" }}>
          <SuccessScene
            title="Ordem de serviço aberta!"
            message={`Manutenção vai atender a ${maquinas.find(m => m.id === maquina)?.n}. Prazo estimado: 40 minutos.`}
            protocol="OS-2048"
            onDone={onDone}
            autoSeconds={6}
            narration="OS aberta. A manutenção já foi avisada."
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
          .maq-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
          .maq {
            padding: 18px; background: #fff; border: 2px solid var(--line);
            border-radius: 16px; cursor: pointer; font: inherit;
            display: flex; gap: 14px; align-items: center;
            text-align: left; color: var(--ink);
          }
          .maq.on { border-color: var(--ink); background: var(--ink); color: #fff; }
          .maq.on .ic { background: var(--orange); color: var(--ink); }
          .maq .ic {
            width: 64px; height: 64px; border-radius: 12px;
            background: var(--bg-2); display: grid; place-items: center;
            flex: 0 0 auto;
          }
          .maq .ic .material-symbols-rounded { font-size: 36px; }
          .maq .t { font-size: 18px; font-weight: 800; }
          .maq .s { font-size: 13px; color: var(--muted); }
          .maq.on .s { color: rgba(255,255,255,.7); }
          .maq .id { font-family: var(--f-mono); font-size: 11px; letter-spacing: .14em; opacity: .6; margin-top: 2px; }

          .urg-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
          .urg {
            padding: 20px; border-radius: 14px;
            border: 3px solid var(--line); background: #fff;
            cursor: pointer; font: inherit; text-align: left;
            display: flex; flex-direction: column; gap: 8px;
            position: relative;
          }
          .urg.on { border-width: 3px; transform: translateY(-2px); box-shadow: 0 12px 24px -8px rgba(0,0,0,.18); }
          .urg .dot {
            width: 16px; height: 16px; border-radius: 50%;
            background: var(--color);
          }
          .urg .t { font-size: 18px; font-weight: 800; color: var(--ink); }
          .urg .s { font-size: 13px; color: var(--muted); }

          .extras { display: flex; gap: 10px; margin-top: 12px; }
          .extra-btn {
            flex: 1; padding: 14px; background: var(--bg-2);
            border: 1px dashed var(--muted-2); border-radius: 12px;
            display: flex; align-items: center; gap: 10px;
            font: inherit; font-weight: 600; color: var(--ink);
            cursor: pointer;
          }
        `}</style>

        {step === 1 && (
          <>
            <div className="flow-head">
              <h1 className="flow-title">
                <span className="eyebrow" style={{ color: "var(--red)" }}>REPORTAR FALHA · PASSO 1 DE 2</span>
                Qual máquina está com problema?
              </h1>
            </div>
            <div className="flow-body" style={{ flexDirection: "column" }}>
              <div className="maq-grid">
                {maquinas.map(m => (
                  <button key={m.id} className={"maq" + (maquina === m.id ? " on" : "")} onClick={() => setMaquina(m.id)}>
                    <div className="ic"><Icon name={m.ic} /></div>
                    <div>
                      <div className="t">{m.n}</div>
                      <div className="s">{m.tipo}</div>
                      <div className="id">CÓD · {m.id}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="flow-actions">
              <button className="btn btn-ghost btn-lg" onClick={onBack}><Icon name="close" /> CANCELAR</button>
              <button className="btn btn-primary btn-lg" disabled={!maquina} style={!maquina ? { opacity: .5 } : {}} onClick={() => setStep(2)}>
                CONTINUAR <Icon name="arrow_forward" />
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="flow-head">
              <h1 className="flow-title">
                <span className="eyebrow" style={{ color: "var(--red)" }}>{maquinas.find(m => m.id === maquina).n.toUpperCase()} · PASSO 2 DE 2</span>
                O que está acontecendo?
              </h1>
            </div>
            <div className="flow-body" style={{ flexDirection: "column", overflow: "auto", gap: 18 }}>
              <div>
                <div style={{ fontFamily: "var(--f-mono)", fontSize: 12, letterSpacing: ".18em", color: "var(--muted)", marginBottom: 10 }}>SINTOMAS (PODE MARCAR MAIS DE UM)</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {falhasComuns.map(f => (
                    <button key={f} onClick={() => toggleFalha(f)}
                      style={{
                        padding: "14px 16px",
                        background: falhas.includes(f) ? "var(--ink)" : "#fff",
                        color: falhas.includes(f) ? "#fff" : "var(--ink)",
                        border: "2px solid " + (falhas.includes(f) ? "var(--ink)" : "var(--line)"),
                        borderRadius: 12, fontSize: 15, fontWeight: 600,
                        textAlign: "left", fontFamily: "inherit", cursor: "pointer",
                        display: "flex", gap: 10, alignItems: "center"
                      }}>
                      <div style={{ width: 20, height: 20, borderRadius: 5, border: "2px solid " + (falhas.includes(f) ? "var(--orange)" : "var(--line)"), background: falhas.includes(f) ? "var(--orange)" : "#fff", display: "grid", placeItems: "center", flex: "0 0 auto" }}>
                        {falhas.includes(f) && <Icon name="check" size={14} style={{ color: "var(--ink)" }} />}
                      </div>
                      {f}
                    </button>
                  ))}
                </div>
                <div className="extras">
                  <button className="extra-btn"><Icon name="photo_camera" /> TIRAR FOTO</button>
                  <button className="extra-btn"><Icon name="mic" /> GRAVAR ÁUDIO DO BARULHO</button>
                </div>
              </div>

              <div>
                <div style={{ fontFamily: "var(--f-mono)", fontSize: 12, letterSpacing: ".18em", color: "var(--muted)", marginBottom: 10 }}>URGÊNCIA</div>
                <div className="urg-cards">
                  {urgencias.map(u => (
                    <button key={u.k} className={"urg" + (urgencia === u.k ? " on" : "")}
                      style={{ borderColor: urgencia === u.k ? u.color : "var(--line)", "--color": u.color }}
                      onClick={() => setUrgencia(u.k)}>
                      <div className="dot" style={{ background: u.color }} />
                      <div className="t">{u.t}</div>
                      <div className="s">{u.s}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flow-actions">
              <button className="btn btn-ghost btn-lg" onClick={() => setStep(1)}><Icon name="arrow_back" /> VOLTAR</button>
              <button className="btn btn-danger btn-lg" disabled={!falhas.length || !urgencia} style={(!falhas.length || !urgencia) ? { opacity: .5 } : {}} onClick={() => setStep(3)}>
                <Icon name="send" /> ABRIR OS
              </button>
            </div>
          </>
        )}
      </div>
      <FooterBar onVoice={() => {}} />
    </>
  );
}

window.FalhaScreen = FalhaScreen;
