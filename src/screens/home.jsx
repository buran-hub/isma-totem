/* home.jsx — 8 cards visíveis sem scroll */

const HOME_CARDS = [
  { id: "ponto",     icon: "schedule",        title: "BATER PONTO",      sub: "Entrada • Saída • Intervalo", tone: "primary", voice: "bater ponto" },
  { id: "atestado",  icon: "description",     title: "ATESTADO",         sub: "Enviar documento médico",     tone: "primary", voice: "atestado" },
  { id: "ferias",    icon: "beach_access",    title: "FÉRIAS",           sub: "Solicitar ou consultar saldo", tone: "primary", voice: "férias" },
  { id: "infos",     icon: "account_circle",  title: "MINHAS INFOS",     sub: "Holerite, horas, benefícios", tone: "primary", voice: "minhas informações" },
  { id: "chamar",    icon: "support_agent",   title: "CHAMAR",           sub: "Encarregado ou supervisor",   tone: "primary", voice: "chamar encarregado" },
  { id: "incidente", icon: "e911_emergency",  title: "INCIDENTE",        sub: "Acidente ou condição insegura", tone: "danger", voice: "reportar incidente" },
  { id: "falha",     icon: "build",           title: "FALHA",            sub: "Problema com maquinário",     tone: "danger", voice: "reportar falha" },
  { id: "material",  icon: "inventory_2",     title: "MATERIAL",         sub: "EPI, insumo, ferramenta",     tone: "primary", voice: "solicitar material" },
];

function HomeScreen({ user, onPick, onExit }) {
  return (
    <>
      <TopBar user={user} onExit={onExit} />
      <div className="body home-body">
        <style>{`
          .home-body {
            padding: 28px 32px 20px;
            display: flex; flex-direction: column;
            gap: 20px;
            background: var(--bg);
          }
          .home-greet {
            display: flex; align-items: baseline; justify-content: space-between;
            gap: 16px;
          }
          .home-greet h2 {
            margin: 0;
            font-size: 32px;
            font-weight: 800;
            letter-spacing: -0.02em;
            color: var(--ink);
          }
          .home-greet h2 .emph { color: var(--orange); }
          .home-greet .hint {
            font-family: var(--f-mono);
            font-size: 11px; letter-spacing: 0.18em;
            color: var(--muted);
            display: flex; align-items: center; gap: 8px;
          }
          .home-grid {
            flex: 1;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(2, 1fr);
            gap: 18px;
            min-height: 0;
          }
          .hcard {
            position: relative;
            background: var(--ink);
            color: #fff;
            border-radius: 18px;
            padding: 22px 22px 24px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            cursor: pointer;
            overflow: hidden;
            border: 2px solid transparent;
            transition: transform .08s, box-shadow .15s;
            box-shadow: 0 4px 0 rgba(0,0,0,.2);
            text-align: left;
            font: inherit;
          }
          .hcard:hover { transform: translateY(-2px); box-shadow: 0 10px 24px -8px rgba(11,35,64,.5); }
          .hcard:active { transform: translateY(1px); box-shadow: 0 2px 0 rgba(0,0,0,.2); }
          .hcard::after {
            content: "";
            position: absolute;
            right: -40px; top: -40px;
            width: 140px; height: 140px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255,255,255,.06), transparent 70%);
          }
          .hcard .ico {
            width: 64px; height: 64px;
            border-radius: 14px;
            background: rgba(255,255,255,.1);
            display: grid; place-items: center;
            margin-bottom: 14px;
          }
          .hcard .ico .material-symbols-rounded { font-size: 40px; color: #fff; }
          .hcard .t {
            font-size: 22px;
            font-weight: 800;
            letter-spacing: 0.01em;
            line-height: 1.1;
            margin: 0 0 4px;
          }
          .hcard .s {
            font-size: 13px;
            color: rgba(255,255,255,.65);
            line-height: 1.3;
          }
          .hcard .num {
            position: absolute;
            top: 16px; right: 18px;
            font-family: var(--f-mono);
            font-size: 11px;
            letter-spacing: 0.14em;
            color: rgba(255,255,255,.35);
            font-weight: 600;
          }
          .hcard.danger {
            background: #fff;
            color: var(--red);
            border: 2px solid var(--red);
          }
          .hcard.danger .ico {
            background: var(--red);
            color: #fff;
          }
          .hcard.danger .ico .material-symbols-rounded { color: #fff; }
          .hcard.danger .s { color: var(--muted); }
          .hcard.danger .num { color: var(--red); opacity: .5; }
          .hcard.danger::after { background: radial-gradient(circle, rgba(217,45,32,.08), transparent 70%); }
          .hcard.danger::before {
            content: "URGÊNCIA";
            position: absolute;
            top: 16px; left: 22px;
            font-family: var(--f-mono);
            font-size: 10px;
            letter-spacing: 0.2em;
            color: var(--red);
            font-weight: 800;
          }
          .hcard.danger .ico { margin-top: 18px; }
        `}</style>

        <div className="home-greet">
          <h2>Olá, <span className="emph">{user.name.split(" ")[0]}</span>. O que você precisa?</h2>
          <span className="hint">
            <Icon name="mic" size={14} />
            OU DIGA O NOME DA OPÇÃO
          </span>
        </div>

        <div className="home-grid">
          {HOME_CARDS.map((c, i) => (
            <button
              key={c.id}
              className={"hcard" + (c.tone === "danger" ? " danger" : "")}
              onClick={() => onPick(c.id)}
            >
              <span className="num">0{i + 1}</span>
              <div>
                <div className="ico"><Icon name={c.icon} /></div>
                <h3 className="t">{c.title}</h3>
                <p className="s">{c.sub}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

window.HomeScreen = HomeScreen;
window.HOME_CARDS = HOME_CARDS;
