/* material.jsx — F8 Solicitar Material */

function MaterialScreen({ user, onBack, onDone }) {
  const [cat, setCat] = useState(null);
  const [itens, setItens] = useState({});
  const [urg, setUrg] = useState(null);

  const cats = [
    { k: "EPI", ic: "health_and_safety", t: "EPI", s: "Luva, máscara, óculos", items: [
      ["Luva de proteção (par)", "latex"], ["Máscara PFF2", "masks"],
      ["Óculos de segurança", "visibility"], ["Protetor auricular", "hearing"],
    ]},
    { k: "INS", ic: "category", t: "Insumo", s: "Material de produção", items: [
      ["Linha preta nº 40 (cone)", "inventory_2"], ["Agulha 90/14 (caixa)", "straighten"],
      ["Etiqueta de tamanho", "label"], ["Bobina de fio", "cable"],
    ]},
    { k: "FER", ic: "handyman", t: "Ferramenta", s: "Tesoura, chave, etc", items: [
      ["Tesoura de costura", "content_cut"], ["Chave de fenda", "build"],
      ["Fita métrica", "straighten"], ["Lupa", "search"],
    ]},
    { k: "LIM", ic: "cleaning_services", t: "Limpeza", s: "Pano, óleo, solvente", items: [
      ["Pano de limpeza", "cleaning"], ["Óleo lubrificante", "oil_barrel"],
      ["Álcool 70%", "sanitizer"], ["Vassoura", "broom"],
    ]},
  ];
  const urgs = [
    { k: "urg", t: "Urgente", s: "Preciso agora, parei", color: "var(--red)" },
    { k: "nor", t: "Normal", s: "Vou acabando o que tenho", color: "var(--orange)" },
    { k: "plan", t: "Planejado", s: "Só pra repor estoque", color: "var(--green)" },
  ];

  const count = (n) => itens[n] || 0;
  const add = (n) => setItens(v => ({ ...v, [n]: (v[n] || 0) + 1 }));
  const sub = (n) => setItens(v => ({ ...v, [n]: Math.max(0, (v[n] || 0) - 1) }));
  const total = Object.values(itens).reduce((a, b) => a + b, 0);
  const catObj = cats.find(c => c.k === cat);

  const [done, setDone] = useState(false);
  if (done) {
    return (
      <>
        <TopBar user={user} />
        <div className="body" style={{ background: "var(--bg)" }}>
          <SuccessScene
            title="Pedido enviado!"
            message={`${total} item(ns) pedido(s). Prazo estimado: ${urg === "urg" ? "30 minutos" : (urg === "nor" ? "4 horas" : "próximo turno")}.`}
            protocol="REQ-6721"
            onDone={onDone}
            autoSeconds={6}
            narration="Tudo certo, seu pedido foi enviado."
          />
        </div>
        <FooterBar onVoice={() => {}} />
      </>
    );
  }

  return (
    <>
      <TopBar user={user} onBack={onBack} />
      <div className="body flow">
        <style>{`
          .mat-layout { flex: 1; display: grid; grid-template-columns: 240px 1fr 320px; gap: 18px; min-height: 0; }
          .mat-cats { display: flex; flex-direction: column; gap: 8px; }
          .mat-cat {
            padding: 16px 18px; background: #fff;
            border: 2px solid var(--line); border-radius: 14px;
            cursor: pointer; font: inherit; text-align: left; color: var(--ink);
            display: flex; gap: 12px; align-items: center;
          }
          .mat-cat.on { background: var(--ink); color: #fff; border-color: var(--ink); }
          .mat-cat.on .material-symbols-rounded { color: var(--orange); }
          .mat-cat .t { font-size: 17px; font-weight: 800; }
          .mat-cat .s { font-size: 12px; opacity: .7; }
          .mat-items { background: #fff; border: 1px solid var(--line); border-radius: 16px; padding: 20px; overflow: auto; display: flex; flex-direction: column; gap: 10px; }
          .mat-it { display: flex; align-items: center; gap: 14px; padding: 14px; background: var(--bg); border-radius: 12px; }
          .mat-it .ph {
            width: 56px; height: 56px; border-radius: 10px;
            background: #fff; border: 1px solid var(--line);
            display: grid; place-items: center;
          }
          .mat-it .t { flex: 1; font-weight: 700; color: var(--ink); font-size: 16px; }
          .mat-qty { display: flex; align-items: center; gap: 8px; }
          .mat-qty button {
            width: 44px; height: 44px; border-radius: 10px;
            border: 2px solid var(--line); background: #fff;
            font-size: 22px; font-weight: 800; cursor: pointer; color: var(--ink);
          }
          .mat-qty .n { width: 40px; text-align: center; font-weight: 800; font-size: 20px; color: var(--ink); }
          .mat-basket { background: var(--ink); color: #fff; border-radius: 16px; padding: 20px; display: flex; flex-direction: column; gap: 14px; }
          .mat-basket h3 { margin: 0; font-size: 18px; font-weight: 800; display: flex; justify-content: space-between; }
          .basket-list { flex: 1; display: flex; flex-direction: column; gap: 8px; overflow: auto; }
          .basket-it { display: flex; justify-content: space-between; padding: 8px 12px; background: rgba(255,255,255,.06); border-radius: 8px; font-size: 14px; }
          .basket-empty { text-align: center; padding: 20px; opacity: .5; font-size: 14px; }
          .urg-mini { display: flex; flex-direction: column; gap: 6px; }
          .urg-mini button {
            display: flex; align-items: center; gap: 10px;
            padding: 10px 12px; background: rgba(255,255,255,.08);
            border: 2px solid transparent; border-radius: 10px;
            color: #fff; font: inherit; cursor: pointer;
            font-size: 14px; text-align: left;
          }
          .urg-mini button.on { border-color: var(--orange); background: rgba(245,166,35,.15); }
          .urg-mini .d { width: 10px; height: 10px; border-radius: 50%; }
        `}</style>

        <div className="flow-head">
          <h1 className="flow-title">
            <span className="eyebrow">SOLICITAR MATERIAL</span>
            O que você precisa?
          </h1>
        </div>

        <div className="flow-body mat-layout">
          <div className="mat-cats">
            {cats.map(c => (
              <button key={c.k} className={"mat-cat" + (cat === c.k ? " on" : "")} onClick={() => setCat(c.k)}>
                <Icon name={c.ic} size={24} />
                <div>
                  <div className="t">{c.t}</div>
                  <div className="s">{c.s}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="mat-items">
            {!catObj && (
              <div style={{ margin: "auto", textAlign: "center", color: "var(--muted)" }}>
                <Icon name="category" size={64} style={{ color: "var(--line)" }} />
                <div style={{ marginTop: 12, fontSize: 16 }}>Escolha uma categoria ao lado</div>
              </div>
            )}
            {catObj?.items.map(([n, ic]) => (
              <div key={n} className="mat-it">
                <div className="ph"><Icon name={ic} size={28} style={{ color: "var(--muted)" }} /></div>
                <div className="t">{n}</div>
                <div className="mat-qty">
                  <button onClick={() => sub(n)}>−</button>
                  <span className="n">{count(n)}</span>
                  <button onClick={() => add(n)}>+</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mat-basket">
            <h3>Pedido <span style={{ color: "var(--orange)" }}>{total} item(ns)</span></h3>
            <div className="basket-list">
              {total === 0 && <div className="basket-empty">Nada no pedido ainda</div>}
              {Object.entries(itens).filter(([,v]) => v > 0).map(([n, v]) => (
                <div key={n} className="basket-it">
                  <span>{n}</span>
                  <span style={{ color: "var(--orange)", fontWeight: 700 }}>×{v}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: ".18em", opacity: .6, marginBottom: 6 }}>URGÊNCIA</div>
              <div className="urg-mini">
                {urgs.map(u => (
                  <button key={u.k} className={urg === u.k ? "on" : ""} onClick={() => setUrg(u.k)}>
                    <span className="d" style={{ background: u.color }} />
                    <span style={{ fontWeight: 700 }}>{u.t}</span>
                    <span style={{ opacity: .7, fontSize: 12 }}>{u.s}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flow-actions">
          <button className="btn btn-ghost btn-lg" onClick={onBack}><Icon name="close" /> CANCELAR</button>
          <button className="btn btn-primary btn-lg" disabled={!total || !urg} style={(!total || !urg) ? { opacity: .5 } : {}} onClick={() => setDone(true)}>
            <Icon name="send" /> ENVIAR PEDIDO
          </button>
        </div>
      </div>
      <FooterBar onVoice={() => {}} />
    </>
  );
}

window.MaterialScreen = MaterialScreen;
