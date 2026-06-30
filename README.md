import { useState } from "react";

// ── DATOS REALES ────────────────────────────────────────────────────────────
const USUARIOS = [
  { nombre: "Niger Leyton Leyton", pin: "1111" },
  { nombre: "Macarena González Dossi", pin: "2222" },
  { nombre: "Pablo Gómez Torres", pin: "3333" },
  { nombre: "Nibaldo Hidalgo Rosales", pin: "4444" },
  { nombre: "María Magdalena Spoerer", pin: "5555" },
];

const EQUIPOS = {
  "Equipo 3 FRU": [
    "Sector 09","Sector 10","Sector 11",
    "Sector 12-Norte","Sector 12-Sur",
    "Sector 13-Norte","Sector 13-Sur",
    "Sector 14","Sector 15","Sector 16","Sector 17","Sector 18",
    "Sector 19-Norte","Sector 19-Sur",
    "Sector 20","Sector 21","Sector 22","Sector 23",
  ],
  "Equipo HID 3 FRU": [
    "Sector 1","Sector 2","Sector 3","Sector 4","Sector 5","Sector 6","Sector 7",
    "Playa 3",
  ],
  "Equipo 1 FRA": [
    "Sector 3","Sector 4","Sector 5","Sector 6",
    "Sector 16","Sector 17","Sector 18","Sector 19","Sector 20",
  ],
  "Equipo 1 MO": ["Sector 1","Sector 2B","Sector 7","Sector 9","Sector 11"],
  "Equipo 1 ARA": ["Sector 1","Sector 6","Sector 7","Sector 8"],
};

// ── TOKENS DE DISEÑO ────────────────────────────────────────────────────────
const C = {
  bg:           "#0d1a10",
  surface:      "#111f14",
  card:         "#172b1a",
  cardHover:    "#1e3822",
  border:       "#243d27",
  borderLight:  "#2e5033",
  accent:       "#52c25a",
  accentDark:   "#2d7a34",
  accentDim:    "#52c25a33",
  accentText:   "#a8e6ac",
  purple:       "#9b7fe8",
  purpleDim:    "#9b7fe833",
  purpleText:   "#c9b8f5",
  yellow:       "#f5c842",
  yellowDim:    "#f5c84233",
  yellowText:   "#fde68a",
  text:         "#e4f0e6",
  textMuted:    "#6b9470",
  textDim:      "#4a6b4e",
  error:        "#f07070",
  white:        "#ffffff",
  navBg:        "#0a1410",
};

// ── ESTILOS BASE ────────────────────────────────────────────────────────────
const S = {
  wrap: {
    minHeight: "100vh",
    background: `radial-gradient(ellipse at top, #0d2a12 0%, ${C.bg} 60%)`,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "28px 16px 48px",
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
  },
  phone: {
    width: 375,
    minHeight: 750,
    background: C.surface,
    borderRadius: 36,
    border: `1.5px solid ${C.border}`,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px #ffffff08",
    position: "relative",
  },
  statusBar: {
    background: C.bg,
    padding: "10px 22px 6px",
    display: "flex",
    justifyContent: "space-between",
    fontSize: 11,
    color: C.textDim,
    letterSpacing: 0.4,
    flexShrink: 0,
  },
  header: (bg = C.accentDark) => ({
    background: bg,
    padding: "14px 18px",
    display: "flex",
    alignItems: "center",
    gap: 10,
    borderBottom: `1px solid ${C.border}`,
    flexShrink: 0,
  }),
  headerTitle: {
    color: C.text,
    fontSize: 15,
    fontWeight: 700,
    flex: 1,
    letterSpacing: 0.2,
  },
  body: {
    flex: 1,
    overflowY: "auto",
    padding: "18px 16px",
    display: "flex",
    flexDirection: "column",
    gap: 14,
    paddingBottom: 24,
  },
  nav: {
    background: C.navBg,
    borderTop: `1px solid ${C.border}`,
    display: "flex",
    flexShrink: 0,
  },
  navBtn: (active) => ({
    flex: 1,
    padding: "12px 8px 10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: active ? C.accent : C.textDim,
    fontSize: 10,
    fontWeight: active ? 700 : 500,
    letterSpacing: 0.5,
    transition: "color 0.15s",
  }),
  label: {
    color: C.textMuted,
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 5,
  },
  input: {
    background: C.card,
    border: `1.5px solid ${C.border}`,
    borderRadius: 10,
    padding: "11px 13px",
    color: C.text,
    fontSize: 14,
    width: "100%",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s",
  },
  select: {
    background: C.card,
    border: `1.5px solid ${C.border}`,
    borderRadius: 10,
    padding: "11px 13px",
    color: C.text,
    fontSize: 14,
    width: "100%",
    outline: "none",
    boxSizing: "border-box",
    appearance: "none",
    cursor: "pointer",
  },
  btn: (bg = C.accent, fg = C.bg) => ({
    background: bg,
    color: fg,
    border: "none",
    borderRadius: 12,
    padding: "14px",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    width: "100%",
    letterSpacing: 0.3,
  }),
  btnGhost: {
    background: "transparent",
    color: C.textMuted,
    border: `1.5px solid ${C.border}`,
    borderRadius: 12,
    padding: "12px",
    fontWeight: 600,
    fontSize: 13,
    cursor: "pointer",
    width: "100%",
  },
  card: {
    background: C.card,
    border: `1.5px solid ${C.border}`,
    borderRadius: 14,
    padding: "14px",
  },
  divider: {
    borderTop: `1px solid ${C.border}`,
    margin: "2px 0",
  },
  tag: (bg, fg) => ({
    background: bg,
    color: fg,
    borderRadius: 7,
    padding: "3px 9px",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 0.3,
    display: "inline-block",
  }),
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  grid3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 },
  row: { display: "flex", alignItems: "center", gap: 8 },
  toast: (bg = C.accent, fg = C.bg) => ({
    position: "absolute",
    bottom: 80,
    left: 20,
    right: 20,
    background: bg,
    color: fg,
    borderRadius: 12,
    padding: "13px 16px",
    fontWeight: 700,
    fontSize: 13,
    textAlign: "center",
    zIndex: 200,
    boxShadow: `0 6px 24px ${bg}55`,
  }),
};

// ── URL GOOGLE SHEETS ───────────────────────────────────────────────────────
const SHEETS_URL = "https://script.google.com/macros/s/AKfycbydce4hOCVAFuxP5KHtxutF0sPW7M9zdElCPKUzcLZRmkhkvkNxrhowhkIAdClhPBHI/exec";

async function enviarASheets(data) {
  try {
    await fetch(SHEETS_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return true;
  } catch (e) {
    console.error("Error enviando a Sheets:", e);
    return false;
  }
}

// ── UTILIDADES ──────────────────────────────────────────────────────────────
function horaActual() {
  return new Date().toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" });
}
function fechaHoy() {
  return new Date().toISOString().split("T")[0];
}
function fechaLegible() {
  return new Date().toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

// ── COMPONENTES COMUNES ────────────────────────────────────────────────────
function StatusBar() {
  return (
    <div style={S.statusBar}>
      <span>{new Date().toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" })}</span>
      <span style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <span>●●●</span><span>WiFi</span><span>🔋</span>
      </span>
    </div>
  );
}

function BackBtn({ onBack }) {
  return (
    <button onClick={onBack} style={{
      background: "transparent", border: "none", color: C.accentText,
      fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center",
      gap: 4, padding: 0, fontWeight: 600,
    }}>
      ‹ Volver
    </button>
  );
}

function Navbar({ tab, setTab }) {
  const tabs = [
    { id: "menu", icon: "⊞", label: "Menú" },
    { id: "resumen", icon: "◈", label: "Resumen" },
  ];
  return (
    <nav style={S.nav}>
      {tabs.map(t => (
        <button key={t.id} style={S.navBtn(tab === t.id)} onClick={() => setTab(t.id)}>
          <span style={{ fontSize: 20 }}>{t.icon}</span>
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  );
}

function FieldGroup({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <div style={S.label}>{label}</div>
      {children}
    </div>
  );
}

function CommonFields({ data, onChange }) {
  const sectores = data.equipo ? EQUIPOS[data.equipo] || [] : [];
  return (
    <>
      <FieldGroup label="Fecha de registro">
        <input style={S.input} type="date" value={data.fecha}
          onChange={e => onChange("fecha", e.target.value)} />
      </FieldGroup>
      <div style={S.grid2}>
        <FieldGroup label="Equipo">
          <select style={S.select} value={data.equipo}
            onChange={e => onChange("equipo", e.target.value)}>
            <option value="">Seleccionar</option>
            {Object.keys(EQUIPOS).map(e => <option key={e}>{e}</option>)}
          </select>
        </FieldGroup>
        <FieldGroup label="Sector">
          <select style={S.select} value={data.sector} disabled={!data.equipo}
            onChange={e => onChange("sector", e.target.value)}>
            <option value="">Seleccionar</option>
            {sectores.map(s => <option key={s}>{s}</option>)}
          </select>
        </FieldGroup>
      </div>
    </>
  );
}

function MedicionFields({ data, onChange }) {
  const campos = ["pH", "CE", "Nitratos", "Potasio", "Calcio", "Sodio"];
  return (
    <div style={S.grid2}>
      {campos.map(c => (
        <FieldGroup key={c} label={c}>
          <input style={S.input} type="number" inputMode="decimal" placeholder="0.00"
            value={data[c] || ""} onChange={e => onChange(c, e.target.value)} />
        </FieldGroup>
      ))}
    </div>
  );
}

// ── PANTALLA LOGIN ──────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const ingresar = () => {
    const u = USUARIOS.find(u => u.nombre === usuario);
    if (!u) { setError("Selecciona tu nombre."); return; }
    if (pin.length < 4) { setError("Ingresa tu PIN de 4 dígitos."); return; }
    // En prototipo cualquier PIN de 4 dígitos funciona
    setError("");
    onLogin(usuario);
  };

  return (
    <>
      <StatusBar />
      <div style={{ ...S.body, justifyContent: "center", paddingTop: 48, gap: 22 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <div style={{
            width: 72, height: 72, borderRadius: 20,
            background: `linear-gradient(135deg, ${C.accentDark}, ${C.accent})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 34, margin: "0 auto 14px", boxShadow: `0 8px 24px ${C.accentDim}`,
          }}>🌿</div>
          <div style={{ color: C.text, fontSize: 24, fontWeight: 800, letterSpacing: -0.5 }}>
            AgroMonitor
          </div>
          <div style={{ color: C.textMuted, fontSize: 12, marginTop: 4 }}>
            Sistema de registro de campo
          </div>
        </div>

        <FieldGroup label="Trabajador">
          <select style={S.select} value={usuario} onChange={e => setUsuario(e.target.value)}>
            <option value="">Selecciona tu nombre</option>
            {USUARIOS.map(u => <option key={u.nombre}>{u.nombre}</option>)}
          </select>
        </FieldGroup>

        <FieldGroup label="PIN">
          <input style={S.input} type="password" inputMode="numeric" maxLength={4}
            placeholder="● ● ● ●" value={pin}
            onChange={e => setPin(e.target.value.replace(/\D/g, ""))}
            onKeyDown={e => e.key === "Enter" && ingresar()} />
        </FieldGroup>

        {error && <div style={{ color: C.error, fontSize: 12, textAlign: "center" }}>{error}</div>}

        <button style={S.btn()} onClick={ingresar}>Ingresar</button>

        <div style={{ color: C.textDim, fontSize: 11, textAlign: "center", marginTop: 4 }}>
          ¿Problemas para ingresar? Contacta a administración.
        </div>
      </div>
    </>
  );
}

// ── MENÚ PRINCIPAL ──────────────────────────────────────────────────────────
function MenuScreen({ user, onSelect, onLogout }) {
  const opciones = [
    { id: "goteo",   icon: "💧", label: "Registro de Goteo",    desc: "pH · CE · Nitratos · Potasio · Calcio · Sodio", accent: C.accent,  dim: C.accentDim,  cardBg: "#0e2e18" },
    { id: "drenaje", icon: "🚿", label: "Registro de Drenaje",  desc: "pH · CE · Nitratos · Potasio · Calcio · Sodio", accent: C.purple,  dim: C.purpleDim,  cardBg: "#1a1030" },
    { id: "humedad", icon: "🌱", label: "Registro de Humedad",  desc: "6 hileras · H. Inicial · H. Media · H. Final",  accent: C.yellow,  dim: C.yellowDim,  cardBg: "#1e2a0e" },
  ];

  const nombre = user.split(" ")[0];

  return (
    <>
      <StatusBar />
      <div style={S.header()}>
        <div style={{ flex: 1 }}>
          <div style={{ color: C.textMuted, fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>Bienvenido</div>
          <div style={S.headerTitle}>{nombre}</div>
        </div>
        <button onClick={onLogout} style={{
          background: "transparent", border: `1px solid ${C.border}`,
          borderRadius: 8, color: C.textMuted, fontSize: 11,
          padding: "6px 11px", cursor: "pointer", fontWeight: 600,
        }}>Salir</button>
      </div>

      <div style={S.body}>
        <div>
          <div style={{ color: C.textMuted, fontSize: 11, marginBottom: 2 }}>{fechaLegible()}</div>
          <div style={{ color: C.text, fontSize: 17, fontWeight: 800 }}>¿Qué vas a registrar?</div>
        </div>

        {opciones.map(o => (
          <div key={o.id} onClick={() => onSelect(o.id)}
            style={{ ...S.card, cursor: "pointer", display: "flex", alignItems: "center", gap: 14, borderColor: C.border }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: o.cardBg, border: `1px solid ${o.dim}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 24, flexShrink: 0,
            }}>{o.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: C.text, fontWeight: 700, fontSize: 14, marginBottom: 3 }}>{o.label}</div>
              <div style={{ color: C.textMuted, fontSize: 11 }}>{o.desc}</div>
            </div>
            <div style={{ color: C.textDim, fontSize: 20, lineHeight: 1 }}>›</div>
          </div>
        ))}

        <div style={{ ...S.divider, marginTop: 4 }} />
        <div style={{ color: C.textDim, fontSize: 10, textAlign: "center" }}>
          AgroMonitor · Datos sincronizados con SharePoint
        </div>
      </div>
    </>
  );
}

// ── FORMULARIO GOTEO ────────────────────────────────────────────────────────
function GoteoScreen({ onBack, user, onGuardar }) {
  const [common, setCommon] = useState({ fecha: fechaHoy(), equipo: "", sector: "" });
  const [med, setMed] = useState({});
  const [toast, setToast] = useState(false);

  const handleCommon = (k, v) => setCommon(p => ({ ...p, [k]: v, ...(k === "equipo" ? { sector: "" } : {}) }));

  const enviar = async () => {
    const payload = {
      tipo: "Goteo", trabajador: user, fecha: common.fecha,
      equipo: common.equipo, sector: common.sector,
      pH: med.pH || "", CE: med.CE || "", Nitratos: med.Nitratos || "",
      Potasio: med.Potasio || "", Calcio: med.Calcio || "", Sodio: med.Sodio || ""
    };
    onGuardar({ ...payload, hora: horaActual() });
    await enviarASheets(payload);
    setToast(true);
    setTimeout(() => { setToast(false); setMed({}); setCommon({ fecha: fechaHoy(), equipo: "", sector: "" }); }, 2200);
  };

  return (
    <>
      <StatusBar />
      <div style={S.header("#0e3d1a")}>
        <BackBtn onBack={onBack} />
        <div style={S.headerTitle}>💧 Registro de Goteo</div>
        <div style={S.tag(C.accentDim, C.accentText)}>{user.split(" ")[0]}</div>
      </div>
      <div style={S.body}>
        <CommonFields data={common} onChange={handleCommon} />
        <div style={S.divider} />
        <div style={{ color: C.text, fontWeight: 700, fontSize: 13 }}>Mediciones</div>
        <MedicionFields data={med} onChange={(k, v) => setMed(p => ({ ...p, [k]: v }))} />
        <button style={S.btn(C.accent, C.bg)} onClick={enviar}>✓ Enviar registro</button>
        <button style={S.btnGhost} onClick={onBack}>← Volver al menú</button>
      </div>
      {toast && <div style={S.toast(C.accent, C.bg)}>✓ Registro de Goteo enviado</div>}
    </>
  );
}

// ── FORMULARIO DRENAJE ──────────────────────────────────────────────────────
function DrenajeScreen({ onBack, user, onGuardar }) {
  const [common, setCommon] = useState({ fecha: fechaHoy(), equipo: "", sector: "" });
  const [med, setMed] = useState({});
  const [toast, setToast] = useState(false);

  const handleCommon = (k, v) => setCommon(p => ({ ...p, [k]: v, ...(k === "equipo" ? { sector: "" } : {}) }));

  const enviar = async () => {
    const payload = {
      tipo: "Drenaje", trabajador: user, fecha: common.fecha,
      equipo: common.equipo, sector: common.sector,
      pH: med.pH || "", CE: med.CE || "", Nitratos: med.Nitratos || "",
      Potasio: med.Potasio || "", Calcio: med.Calcio || "", Sodio: med.Sodio || ""
    };
    onGuardar({ ...payload, hora: horaActual() });
    await enviarASheets(payload);
    setToast(true);
    setTimeout(() => { setToast(false); setMed({}); setCommon({ fecha: fechaHoy(), equipo: "", sector: "" }); }, 2200);
  };

  return (
    <>
      <StatusBar />
      <div style={S.header("#1a0e38")}>
        <BackBtn onBack={onBack} />
        <div style={S.headerTitle}>🚿 Registro de Drenaje</div>
        <div style={S.tag(C.purpleDim, C.purpleText)}>{user.split(" ")[0]}</div>
      </div>
      <div style={S.body}>
        <CommonFields data={common} onChange={handleCommon} />
        <div style={S.divider} />
        <div style={{ color: C.text, fontWeight: 700, fontSize: 13 }}>Mediciones</div>
        <MedicionFields data={med} onChange={(k, v) => setMed(p => ({ ...p, [k]: v }))} />
        <button style={S.btn(C.purple, C.white)} onClick={enviar}>✓ Enviar registro</button>
        <button style={S.btnGhost} onClick={onBack}>← Volver al menú</button>
      </div>
      {toast && <div style={S.toast(C.purple, C.white)}>✓ Registro de Drenaje enviado</div>}
    </>
  );
}

// ── FORMULARIO HUMEDAD ──────────────────────────────────────────────────────
function HumedadScreen({ onBack, user, onGuardar }) {
  const [common, setCommon] = useState({ fecha: fechaHoy(), equipo: "", sector: "" });
  const [hileras, setHileras] = useState([{ id: 1, hi: "", hm: "", hf: "" }]);
  const [toast, setToast] = useState(false);

  const handleCommon = (k, v) => setCommon(p => ({ ...p, [k]: v, ...(k === "equipo" ? { sector: "" } : {}) }));
  const updateH = (id, key, val) => setHileras(hs => hs.map(h => h.id === id ? { ...h, [key]: val } : h));
  const addH = () => { if (hileras.length < 6) setHileras(hs => [...hs, { id: hs.length + 1, hi: "", hm: "", hf: "" }]); };
  const removeH = (id) => { if (hileras.length > 1) setHileras(hs => hs.filter(h => h.id !== id).map((h, i) => ({ ...h, id: i + 1 }))); };

  const enviar = async () => {
    // Enviar cada hilera como fila separada en Google Sheets
    for (const h of hileras) {
      const payload = {
        tipo: "Humedad", trabajador: user, fecha: common.fecha,
        equipo: common.equipo, sector: common.sector,
        hilera: h.id, humedad_inicial: h.hi, humedad_media: h.hm, humedad_final: h.hf
      };
      await enviarASheets(payload);
    }
    onGuardar({ tipo: "Humedad", usuario: user, hora: horaActual(), ...common, hileras: hileras.length });
    setToast(true);
    setTimeout(() => {
      setToast(false);
      setHileras([{ id: 1, hi: "", hm: "", hf: "" }]);
      setCommon({ fecha: fechaHoy(), equipo: "", sector: "" });
    }, 2200);
  };

  return (
    <>
      <StatusBar />
      <div style={S.header("#1e2a0a")}>
        <BackBtn onBack={onBack} />
        <div style={S.headerTitle}>🌱 Registro de Humedad</div>
        <div style={S.tag(C.yellowDim, C.yellowText)}>{user.split(" ")[0]}</div>
      </div>
      <div style={S.body}>
        <CommonFields data={common} onChange={handleCommon} />
        <div style={S.divider} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: C.text, fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
            Hileras <span style={S.tag(C.yellowDim, C.yellowText)}>{hileras.length} / 6</span>
          </div>
          {hileras.length < 6 && (
            <button onClick={addH} style={{
              background: C.yellowDim, color: C.yellowText,
              border: `1px solid ${C.yellow}44`, borderRadius: 8,
              padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer",
            }}>+ Nueva hilera</button>
          )}
        </div>

        {hileras.map(h => (
          <div key={h.id} style={{ ...S.card, gap: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ color: C.text, fontWeight: 700, fontSize: 13 }}>Hilera {h.id}</span>
              {hileras.length > 1 && (
                <button onClick={() => removeH(h.id)} style={{
                  background: "transparent", border: "none",
                  color: C.error, fontSize: 16, cursor: "pointer", padding: 0, lineHeight: 1,
                }}>✕</button>
              )}
            </div>
            <div style={S.grid3}>
              {[["hi", "H. Inicial"], ["hm", "H. Media"], ["hf", "H. Final"]].map(([key, lbl]) => (
                <FieldGroup key={key} label={lbl}>
                  <input style={{ ...S.input, padding: "9px 8px", fontSize: 13, textAlign: "center" }}
                    type="number" inputMode="decimal" placeholder="0.0"
                    value={h[key]} onChange={e => updateH(h.id, key, e.target.value)} />
                </FieldGroup>
              ))}
            </div>
          </div>
        ))}

        <button style={S.btn(C.yellow, "#1a2a08")} onClick={enviar}>
          ✓ Enviar {hileras.length} hilera{hileras.length > 1 ? "s" : ""}
        </button>
        <button style={S.btnGhost} onClick={onBack}>← Volver al menú</button>
      </div>
      {toast && (
        <div style={S.toast(C.yellow, "#1a2a08")}>
          ✓ {hileras.length} hilera{hileras.length > 1 ? "s" : ""} registrada{hileras.length > 1 ? "s" : ""}
        </div>
      )}
    </>
  );
}

// ── PANTALLA RESUMEN DEL DÍA ────────────────────────────────────────────────
function ResumenScreen({ registros }) {
  const porTipo = { Goteo: [], Drenaje: [], Humedad: [] };
  registros.forEach(r => { if (porTipo[r.tipo]) porTipo[r.tipo].push(r); });

  const config = {
    Goteo:   { icon: "💧", accent: C.accent,  dim: C.accentDim,  text: C.accentText },
    Drenaje: { icon: "🚿", accent: C.purple,  dim: C.purpleDim,  text: C.purpleText },
    Humedad: { icon: "🌱", accent: C.yellow,  dim: C.yellowDim,  text: C.yellowText },
  };

  return (
    <>
      <StatusBar />
      <div style={S.header()}>
        <div style={S.headerTitle}>◈ Resumen del día</div>
        <div style={{ color: C.textMuted, fontSize: 11 }}>
          {new Date().toLocaleDateString("es-CL", { day: "numeric", month: "short" })}
        </div>
      </div>

      <div style={S.body}>
        {/* Contadores */}
        <div style={S.grid3}>
          {Object.entries(porTipo).map(([tipo, lista]) => {
            const cf = config[tipo];
            return (
              <div key={tipo} style={{ ...S.card, textAlign: "center", borderColor: lista.length > 0 ? cf.accent + "44" : C.border }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{cf.icon}</div>
                <div style={{ color: lista.length > 0 ? cf.accent : C.textDim, fontSize: 22, fontWeight: 800 }}>
                  {lista.length}
                </div>
                <div style={{ color: C.textMuted, fontSize: 10, fontWeight: 600, letterSpacing: 0.5 }}>{tipo}</div>
              </div>
            );
          })}
        </div>

        {registros.length === 0 ? (
          <div style={{ ...S.card, textAlign: "center", padding: "32px 16px" }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>📋</div>
            <div style={{ color: C.textMuted, fontSize: 13 }}>No hay registros hoy.</div>
            <div style={{ color: C.textDim, fontSize: 11, marginTop: 4 }}>Los registros aparecerán aquí.</div>
          </div>
        ) : (
          <>
            <div style={{ color: C.text, fontWeight: 700, fontSize: 13 }}>Últimos registros</div>
            {[...registros].reverse().map((r, i) => {
              const cf = config[r.tipo];
              return (
                <div key={i} style={{ ...S.card, display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: cf.dim, display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 18, flexShrink: 0,
                  }}>{cf.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                      <span style={{ color: cf.accent, fontWeight: 700, fontSize: 13 }}>{r.tipo}</span>
                      <span style={{ color: C.textDim, fontSize: 11 }}>{r.hora}</span>
                    </div>
                    <div style={{ color: C.text, fontSize: 12, marginBottom: 2 }}>
                      {r.equipo || "—"} · {r.sector || "—"}
                    </div>
                    <div style={{ color: C.textMuted, fontSize: 11 }}>
                      {r.usuario.split(" ")[0]}
                      {r.tipo === "Humedad" && r.hileras ? ` · ${r.hileras} hilera${r.hileras > 1 ? "s" : ""}` : ""}
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}

// ── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("login");
  const [tab, setTab] = useState("menu");
  const [user, setUser] = useState("");
  const [registros, setRegistros] = useState([]);

  const login = (u) => { setUser(u); setScreen("app"); };
  const logout = () => { setUser(""); setScreen("login"); setTab("menu"); };
  const guardar = (r) => setRegistros(p => [...p, r]);

  const handleTab = (t) => { setTab(t); if (screen !== "app") return; };

  if (screen === "login") {
    return (
      <div style={S.wrap}>
        <div style={S.phone}>
          <LoginScreen onLogin={login} />
        </div>
      </div>
    );
  }

  // Subpantallas dentro de "app"
  const subScreens = ["goteo", "drenaje", "humedad"];
  const enFormulario = subScreens.includes(screen);

  return (
    <div style={S.wrap}>
      <div style={S.phone}>
        {/* Contenido principal */}
        {screen === "app" && tab === "menu" && (
          <MenuScreen user={user} onSelect={s => setScreen(s)} onLogout={logout} />
        )}
        {screen === "app" && tab === "resumen" && (
          <ResumenScreen registros={registros} />
        )}
        {screen === "goteo" && (
          <GoteoScreen onBack={() => setScreen("app")} user={user} onGuardar={guardar} />
        )}
        {screen === "drenaje" && (
          <DrenajeScreen onBack={() => setScreen("app")} user={user} onGuardar={guardar} />
        )}
        {screen === "humedad" && (
          <HumedadScreen onBack={() => setScreen("app")} user={user} onGuardar={guardar} />
        )}

        {/* Navbar (solo cuando no estás en formulario) */}
        {!enFormulario && (
          <Navbar tab={tab} setTab={t => { setTab(t); setScreen("app"); }} />
        )}
      </div>
    </div>
  );
}

