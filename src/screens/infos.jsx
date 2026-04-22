/* infos.jsx — F4 Minhas Informações: holerite, banco horas, benefícios, meus dados */

function InfosScreen({ user, onBack, onDone }) {
  const [tab, setTab] = useState("holerite");

  return (
    <>
      <TopBar user={user} onBack={onBack} />
      <div className="body flow">
        <style>{`
          .inf-layout { flex: 1; display: grid; grid-template-columns: 260px 1fr; gap: 20px; min-height: 0; }
          .inf-tabs { display: flex; flex-direction: column; gap: 8px; }
          .inf-tab {
            display: flex; align-items: center; gap: 14px;
            padding: 18px 20px;
            background: #fff; border: 2px solid var(--line);
            border-radius: 14px;
            font-size: 17px; font-weight: 700; color: var(--ink);
            cursor: pointer; text-align: left;
            font-family: inherit;
          }
          .inf-tab.on { background: var(--ink); color: #fff; border-color: var(--ink); }
          .inf-tab.on .material-symbols-rounded { color: var(--orange); }
          .inf-tab .material-symbols-rounded { font-size: 24px; color: var(--muted); }
          .inf-panel { background: #fff; border-radius: 20px; border: 1px solid var(--line); padding: 28px; overflow: auto; }

          .sal-hero { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 20px; }
          .sal-hero .lbl { font-family: var(--f-mono); font-size: 12px; letter-spacing: 0.2em; color: var(--muted); }
          .sal-hero .v { font-size: 64px; font-weight: 900; color: var(--ink); letter-spacing: -0.04em; line-height: 1; margin-top: 8px; }
          .sal-hero .v .r { color: var(--muted); font-size: 28px; vertical-align: 18px; margin-right: 4px; font-weight: 600; }
          .sal-hero .period { background: var(--bg); padding: 10px 16px; border-radius: 10px; font-weight: 700; color: var(--ink); }
          .sal-bars { display: flex; flex-direction: column; gap: 18px; margin-top: 24px; }
          .sal-row { display: flex; justify-content: space-between; align-items: center; }
          .sal-row .t { font-size: 18px; font-weight: 700; color: var(--ink); }
          .sal-row .v { font-size: 22px; font-weight: 800; }
          .sal-row .v.rec { color: var(--green); }
          .sal-row .v.dsc { color: var(--red); }
          .sal-bar { height: 14px; background: var(--bg-2); border-radius: 999px; overflow: hidden; margin-top: 8px; }
          .sal-bar .fill { height: 100%; border-radius: 999px; }
          .sal-bar .fill.rec { background: var(--green); width: 100%; }
          .sal-bar .fill.dsc { background: var(--red); width: 14%; }
          .sal-line-items { display: flex; flex-direction: column; gap: 2px; margin-top: 20px; }
          .sal-it { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--line); font-size: 15px; }
          .sal-it:last-child { border: none; }
          .sal-it .k { color: var(--muted); }
          .sal-it .v { color: var(--ink); font-weight: 700; }

          .bh-hero { display: flex; gap: 20px; margin-bottom: 24px; }
          .bh-card { flex: 1; padding: 24px; border-radius: 16px; color: #fff; }
          .bh-card.pos { background: var(--green); }
          .bh-card.net { background: var(--ink); }
          .bh-card .k { font-family: var(--f-mono); font-size: 11px; letter-spacing: 0.2em; opacity: .8; }
          .bh-card .v { font-size: 46px; font-weight: 900; letter-spacing: -0.03em; margin-top: 4px; line-height: 1; }
          .bh-card .s { font-size: 13px; opacity: .8; margin-top: 6px; }

          .ben-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
          .ben-item { padding: 20px; border: 2px solid var(--line); border-radius: 16px; display: flex; gap: 16px; align-items: center; }
          .ben-item .ic { width: 56px; height: 56px; border-radius: 14px; background: var(--bg); display: grid; place-items: center; flex: 0 0 auto; }
          .ben-item .tt { font-size: 18px; font-weight: 700; color: var(--ink); }
          .ben-item .v { font-size: 26px; font-weight: 900; color: var(--ink); }
          .ben-item .s { font-size: 13px; color: var(--muted); }

          .dados-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
          .dados-card { background: var(--bg); border-radius: 14px; padding: 18px 22px; }
          .dados-card .k { font-family: var(--f-mono); font-size: 11px; letter-spacing: 0.2em; color: var(--muted); }
          .dados-card .v { font-size: 18px; font-weight: 700; color: var(--ink); margin-top: 4px; }
        `}</style>

        <div className="flow-head">
          <h1 className="flow-title">
            <span className="eyebrow">MINHAS INFORMAÇÕES</span>
            Seus dados de trabalho
          </h1>
        </div>

        <div className="inf-layout">
          <div className="inf-tabs">
            {[
              ["holerite", "Holerite", "receipt_long"],
              ["horas", "Banco de horas", "hourglass_top"],
              ["benef", "Benefícios", "redeem"],
              ["dados", "Meus dados", "badge"],
            ].map(([k, t, ic]) => (
              <button key={k} className={"inf-tab" + (tab === k ? " on" : "")} onClick={() => setTab(k)}>
                <Icon name={ic} /> {t}
              </button>
            ))}
          </div>

          <div className="inf-panel">
            {tab === "holerite" && (
              <>
                <div className="sal-hero">
                  <div>
                    <div className="lbl">LÍQUIDO A RECEBER</div>
                    <div className="v"><span className="r">R$</span>3.450<span style={{ fontSize: 32, color: "var(--muted)" }}>,00</span></div>
                  </div>
                  <div className="period">Março · 2026</div>
                </div>

                <div className="sal-bars">
                  <div>
                    <div className="sal-row"><div className="t">Recebimentos</div><div className="v rec">R$ 4.000,00</div></div>
                    <div className="sal-bar"><div className="fill rec" /></div>
                  </div>
                  <div>
                    <div className="sal-row"><div className="t">Descontos</div><div className="v dsc">− R$ 550,00</div></div>
                    <div className="sal-bar"><div className="fill dsc" /></div>
                  </div>
                </div>

                <div className="sal-line-items">
                  <div className="sal-it"><span className="k">Salário base</span><span className="v">R$ 3.200,00</span></div>
                  <div className="sal-it"><span className="k">Horas extras (12h)</span><span className="v">R$ 620,00</span></div>
                  <div className="sal-it"><span className="k">Adicional noturno</span><span className="v">R$ 180,00</span></div>
                  <div className="sal-it"><span className="k">INSS</span><span className="v" style={{ color: "var(--red)" }}>− R$ 352,00</span></div>
                  <div className="sal-it"><span className="k">VT (6%)</span><span className="v" style={{ color: "var(--red)" }}>− R$ 198,00</span></div>
                </div>
              </>
            )}

            {tab === "horas" && (
              <>
                <div className="bh-hero">
                  <div className="bh-card pos">
                    <div className="k">SALDO POSITIVO</div>
                    <div className="v">+14h 20min</div>
                    <div className="s">Vence em 30 dias · use como folga</div>
                  </div>
                  <div className="bh-card net">
                    <div className="k">ESTA SEMANA</div>
                    <div className="v">42h 18min</div>
                    <div className="s">Meta 44h · faltam 1h 42min</div>
                  </div>
                </div>
                <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: ".2em", color: "var(--muted)", marginBottom: 10 }}>ÚLTIMAS 5 JORNADAS</div>
                {[
                  ["sex 18/abr", "7h 58min", "—"],
                  ["qui 17/abr", "9h 02min", "+1h 02min"],
                  ["qua 16/abr", "8h 30min", "+30min"],
                  ["ter 15/abr", "7h 45min", "−15min"],
                  ["seg 14/abr", "8h 00min", "—"],
                ].map(([d, t, e], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: i < 4 ? "1px solid var(--line)" : "none", fontSize: 16 }}>
                    <span style={{ color: "var(--ink)", fontWeight: 600, textTransform: "capitalize" }}>{d}</span>
                    <span style={{ color: "var(--muted)", fontFamily: "var(--f-mono)" }}>{t}</span>
                    <span style={{ color: e.startsWith("+") ? "var(--green)" : (e.startsWith("−") ? "var(--red)" : "var(--muted)"), fontWeight: 700 }}>{e}</span>
                  </div>
                ))}
              </>
            )}

            {tab === "benef" && (
              <div className="ben-grid">
                {[
                  ["restaurant", "Vale Refeição", "R$ 432,50", "Saldo atual · cartão Alelo"],
                  ["directions_bus", "Vale Transporte", "R$ 180,00", "Carga mensal · 18 ida+volta"],
                  ["health_and_safety", "Plano de Saúde", "Ativo", "Unimed · titular + 2 dependentes"],
                  ["menu_book", "Auxílio Creche", "R$ 320,00/mês", "1 dependente elegível"],
                ].map(([ic, t, v, s], i) => (
                  <div key={i} className="ben-item">
                    <div className="ic"><Icon name={ic} size={28} style={{ color: "var(--ink)" }} /></div>
                    <div>
                      <div className="tt">{t}</div>
                      <div className="v">{v}</div>
                      <div className="s">{s}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "dados" && (
              <div className="dados-grid">
                <div className="dados-card"><div className="k">NOME COMPLETO</div><div className="v">{user.name}</div></div>
                <div className="dados-card"><div className="k">MATRÍCULA</div><div className="v">{user.matricula}</div></div>
                <div className="dados-card"><div className="k">CARGO</div><div className="v">Costureira · Sr</div></div>
                <div className="dados-card"><div className="k">SETOR</div><div className="v">{user.setor}</div></div>
                <div className="dados-card"><div className="k">ADMISSÃO</div><div className="v">03 · set · 2019</div></div>
                <div className="dados-card"><div className="k">GESTOR DIRETO</div><div className="v">Carlos Almeida</div></div>
              </div>
            )}
          </div>
        </div>
      </div>
      <FooterBar onVoice={() => {}} />
    </>
  );
}

window.InfosScreen = InfosScreen;
