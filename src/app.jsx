/* app.jsx — top-level shell, routing, tweaks */

const USER = {
  name: "Joana da Silva",
  matricula: "MAT-84.221",
  setor: "Costura · Linha 3",
  cel: "4821",
};

/* voice command dictionaries per screen */
const VOICE = {
  idle: ["Isma, bom dia", "Isma, começar", "Isma, entrar"],
  auth: ["Cancelar", "Usar crachá"],
  home: ["Bater ponto", "Atestado", "Minhas férias", "Minhas informações", "Chamar encarregado", "Reportar incidente", "Reportar falha", "Solicitar material"],
  ponto: ["Confirmar", "Cancelar", "Voltar"],
  atestado: ["Tirar foto", "Tirar de novo", "Gravar áudio", "Continuar", "Voltar"],
  ferias: ["Quantos dias tenho?", "Escolher 15 dias", "Enviar", "Voltar"],
  infos: ["Holerite", "Banco de horas", "Benefícios", "Meus dados", "Voltar"],
  chamar: ["Dúvida", "Problema na máquina", "Falta de material", "Chamar agora", "Voltar"],
  incidente: ["Acidente", "Quase acidente", "Condição insegura", "Anônimo", "Falando", "Da lista", "Enviar"],
  falha: ["Máquina parou", "Risco de parar", "Com problema", "Abrir OS", "Voltar"],
  material: ["EPI", "Insumo", "Ferramenta", "Limpeza", "Urgente", "Enviar pedido", "Voltar"],
};

const ANNO = {
  idle: [
    { tag: "ux", top: 80, right: 40, side: "right", label: "Decisão UX",
      body: "Sem nome/foto de usuário. Tela de repouso não pode vazar identidade." },
    { tag: "voz", top: 280, left: 40, side: "left", label: "Voz",
      body: "Totem escuta passivamente. Chip mostra que NÃO precisa tocar no microfone." },
    { tag: "a11y", bottom: 80, right: 40, side: "right", label: "Acessibilidade",
      body: "Toque em qualquer lugar da tela. Alvo grande reduz erro com luva ou mão úmida." },
  ],
  home: [
    { tag: "ux", top: 100, left: 10, side: "left", body: "8 cards visíveis sem scroll. Ordem: RH primeiro, urgências em vermelho, operacional por último." },
    { tag: "a11y", top: 300, right: 10, side: "right", body: "Cards vermelhos sinalizam urgência pela cor (não só pelo texto) — pesquisa mostrou baixa leitura em turno noturno." },
    { tag: "voz", bottom: 60, left: 10, side: "left", body: "Todo card responde a comando falando o nome: “Isma, bater ponto”." },
  ],
  ponto: [
    { tag: "ux", top: 140, left: 10, side: "left", body: "Tipo (Entrada/Saída/Intervalo) detectado automaticamente. 0 escolhas = 2 toques para concluir." },
    { tag: "a11y", bottom: 100, right: 10, side: "right", body: "CTA em verde + feedback sonoro + narração do nome. 3 canais redundantes." },
  ],
  incidente: [
    { tag: "ux", top: 120, left: 10, side: "left", body: "Cor antes do texto — cada tipo tem cor distinta para quem não lê bem." },
    { tag: "a11y", top: 400, right: 10, side: "right", body: "Anônimo exposto no passo 1 para gerar confiança antes de relatar." },
  ],
  ferias: [
    { tag: "ux", top: 160, left: 10, side: "left", body: "Número do saldo em fonte gigante ANTES de qualquer ação — reduz ansiedade sobre “tenho direito?”." },
  ],
  atestado: [
    { tag: "ux", top: 140, left: 10, side: "left", body: "Captura por câmera do totem. Alternativa por áudio para quem esqueceu o papel." },
  ],
  chamar: [
    { tag: "ux", top: 400, right: 10, side: "right", body: "Status em tempo real (Notificado → Visualizou → A caminho) reduz ansiedade e evita chamar 2x." },
  ],
  falha: [
    { tag: "ux", top: 140, left: 10, side: "left", body: "Máquinas pré-cadastradas por setor — sem digitação." },
  ],
  material: [
    { tag: "ux", top: 140, right: 10, side: "right", body: "Carrinho sempre visível. Modelo mental de compra online que muita gente já conhece." },
  ],
};

function TweaksPanel({ tw, set }) {
  return (
    <div className="tweaks">
      <h3>Tweaks</h3>
      <div className="row">
        <span>Moldura do totem</span>
        <button className={"toggle" + (tw.bezel ? " on" : "")} onClick={() => set({ bezel: !tw.bezel })} />
      </div>
      <div className="row">
        <span>Anotações de UX</span>
        <button className={"toggle" + (tw.anno ? " on" : "")} onClick={() => set({ anno: !tw.anno })} />
      </div>
      <div className="row">
        <span>Alto contraste</span>
        <button className={"toggle" + (tw.hc ? " on" : "")} onClick={() => set({ hc: !tw.hc })} />
      </div>
      <div className="row">
        <span>Tamanho da fonte</span>
        <select value={tw.fs} onChange={e => set({ fs: e.target.value })}>
          <option value="">Padrão</option>
          <option value="xl">Grande</option>
          <option value="xxl">Extra grande</option>
        </select>
      </div>
      <div className="row">
        <span>Hora do dia</span>
        <select value={tw.shift} onChange={e => set({ shift: e.target.value })}>
          <option value="morning">Manhã</option>
          <option value="midday">Almoço</option>
          <option value="night">Saída</option>
        </select>
      </div>
    </div>
  );
}

function App() {
  const DEFAULTS = /*EDITMODE-BEGIN*/{
    "bezel": true,
    "anno": false,
    "hc": false,
    "fs": "",
    "shift": "morning"
  }/*EDITMODE-END*/;

  const [tw, setTw] = useState(() => {
    try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem("isma-tw") || "{}") }; }
    catch { return DEFAULTS; }
  });
  const setTweak = (p) => setTw(t => { const n = { ...t, ...p }; localStorage.setItem("isma-tw", JSON.stringify(n)); return n; });

  const [route, setRoute] = useState(() => localStorage.getItem("isma-route") || "idle");
  useEffect(() => { localStorage.setItem("isma-route", route); }, [route]);

  const [voiceOpen, setVoiceOpen] = useState(false);
  const toggleVoice = () => setVoiceOpen(v => !v);
  const scale = useFitScale(1120, 820);

  const go = (r) => { setRoute(r); setVoiceOpen(false); };
  const toHome = () => go("home");
  const toIdle = () => go("idle");

  /* Tweaks protocol */
  useEffect(() => {
    const [editMode, setEditMode] = [false, () => {}]; // placeholder
    const handler = (e) => {
      if (e.data?.type === "__activate_edit_mode") window.__isma_showTweaks?.(true);
      if (e.data?.type === "__deactivate_edit_mode") window.__isma_showTweaks?.(false);
    };
    window.addEventListener("message", handler);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", handler);
  }, []);
  const [showTweaks, setShowTweaks] = useState(false);
  useEffect(() => { window.__isma_showTweaks = setShowTweaks; }, []);

  // persist tweaks back to file when changed via postMessage
  useEffect(() => {
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: tw }, "*");
  }, [tw]);

  const bodyClass =
    (tw.hc ? "hc " : "") +
    (tw.fs === "xl" ? "fs-xl " : "") +
    (tw.fs === "xxl" ? "fs-xxl " : "");

  const screen = (() => {
    switch (route) {
      case "idle":      return <IdleScreen onStart={() => go("auth")} onVoice={toggleVoice} voiceOpen={voiceOpen} />;
      case "auth":      return <AuthScreen onDone={toHome} onCancel={toIdle} />;
      case "home":      return <HomeScreen user={USER} onPick={go} onExit={toIdle} />;
      case "ponto":     return <PontoScreen user={USER} onBack={toHome} onDone={toHome} />;
      case "atestado":  return <AtestadoScreen user={USER} onBack={toHome} onDone={toHome} />;
      case "ferias":    return <FeriasScreen user={USER} onBack={toHome} onDone={toHome} />;
      case "infos":     return <InfosScreen user={USER} onBack={toHome} onDone={toHome} />;
      case "chamar":    return <ChamarScreen user={USER} onBack={toHome} onDone={toHome} />;
      case "incidente": return <IncidenteScreen user={USER} onBack={toHome} onDone={toHome} />;
      case "falha":     return <FalhaScreen user={USER} onBack={toHome} onDone={toHome} />;
      case "material":  return <MaterialScreen user={USER} onBack={toHome} onDone={toHome} />;
      default: return <IdleScreen onStart={() => go("auth")} onVoice={toggleVoice} voiceOpen={voiceOpen} />;
    }
  })();

  return (
    <div className={"stage " + (tw.bezel ? "" : "no-bezel ") + bodyClass} style={{ "--scale": scale }}>
      <div className="scale-wrap">
        <Bezel bezel={tw.bezel}>
          {screen}
          <Annotations show={tw.anno} items={ANNO[route]} />
          <VoicePanel open={voiceOpen} commands={VOICE[route] || []} />
        </Bezel>
      </div>
      {showTweaks && <TweaksPanel tw={tw} set={setTweak} />}

      {/* Always-visible overlay controls for this prototype */}
      <div style={{ position: "fixed", top: 16, left: 16, zIndex: 100, display: "flex", gap: 8, flexWrap: "wrap", maxWidth: 320 }}>
        {["idle","home","ponto","atestado","ferias","infos","chamar","incidente","falha","material"].map(r => (
          <button key={r}
            onClick={() => go(r)}
            style={{
              padding: "6px 10px",
              background: route === r ? "#F5A623" : "rgba(255,255,255,.08)",
              color: route === r ? "#0B2340" : "#fff",
              border: "1px solid rgba(255,255,255,.15)",
              borderRadius: 6,
              fontSize: 11,
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: ".08em",
              cursor: "pointer",
              textTransform: "uppercase",
              fontWeight: 700,
            }}>
            {r}
          </button>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
