import { useState } from "react";

// ─────────────────────────────────────────────
// CATEGORÍAS Y PREGUNTAS DINÁMICAS
// ─────────────────────────────────────────────
const CATEGORIES = [
  {
    id: "artist",
    emoji: "🎨",
    label: "Artista",
    sub: "Músico, banda, DJ, fotógrafo, ilustrador",
    color: "#9B6DFF",
    questions: [
      { id: "name",     label: "¿Cuál es tu nombre artístico o nombre de banda?", placeholder: "Ej: The Midnight Echo, Luna Vera, DJ Karlos" },
      { id: "genre",    label: "¿Qué estilo o género representás?", placeholder: "Ej: Indie rock melancólico, fotografía documental urbana" },
      { id: "vibe",     label: "¿Qué emoción querés que sienta tu audiencia?", placeholder: "Ej: Nostalgia, energía pura, introspección, euforia" },
      { id: "refs",     label: "¿Qué artistas o estéticas te inspiran?", placeholder: "Ej: Arctic Monkeys, Lana Del Rey, Basquiat" },
      { id: "audience", label: "¿A quién va dirigido tu arte?", placeholder: "Ej: Jóvenes de 18-30 que van a festivales independientes" },
    ]
  },
  {
    id: "business",
    emoji: "🚀",
    label: "Empresa",
    sub: "Startup, SaaS, agencia, consultora",
    color: "#00C2FF",
    questions: [
      { id: "name",     label: "¿Cuál es el nombre de tu empresa o startup?", placeholder: "Ej: NovaTech, Flowi, Conecta Solutions" },
      { id: "product",  label: "¿Qué problema resuelve tu producto o servicio?", placeholder: "Ej: Automatizamos la facturación para pymes" },
      { id: "audience", label: "¿A quién le vendés?", placeholder: "Ej: Dueños de pymes de 10-50 empleados en LATAM" },
      { id: "values",   label: "¿Qué valores definen tu empresa?", placeholder: "Ej: Innovación, transparencia, eficiencia" },
      { id: "diff",     label: "¿Qué te diferencia de la competencia?", placeholder: "Ej: Somos 3x más rápidos y sin contratos anuales" },
    ]
  },
  {
    id: "commerce",
    emoji: "🏪",
    label: "Comercio",
    sub: "Tienda, restaurante, café, local, e-commerce",
    color: "#FF8A00",
    questions: [
      { id: "name",     label: "¿Cómo se llama tu negocio?", placeholder: "Ej: Panadería Don Fermín, Ropa Urbana XYZ" },
      { id: "product",  label: "¿Qué vendés exactamente?", placeholder: "Ej: Ropa de mujer bohemia hecha a mano, café de especialidad" },
      { id: "audience", label: "¿Quiénes son tus clientes ideales?", placeholder: "Ej: Mujeres de 25-40 años que valoran lo artesanal" },
      { id: "vibe",     label: "¿Qué ambiente o experiencia querés transmitir?", placeholder: "Ej: Calidez hogareña, premium accesible, divertido y joven" },
      { id: "location", label: "¿Dónde operás y quiénes son tu competencia?", placeholder: "Ej: Buenos Aires, competimos con tiendas fast fashion" },
    ]
  },
  {
    id: "creator",
    emoji: "📱",
    label: "Creador",
    sub: "Influencer, YouTuber, streamer, podcaster",
    color: "#FF4D8D",
    questions: [
      { id: "name",     label: "¿Cuál es tu nombre o alias en redes?", placeholder: "Ej: TechConMiguel, La Cocinera Rebelde, GamerX" },
      { id: "content",  label: "¿Sobre qué creás contenido?", placeholder: "Ej: Reviews de tecnología, recetas veganas, gaming competitivo" },
      { id: "audience", label: "¿Quién te sigue actualmente (o quién querés que te siga)?", placeholder: "Ej: Gamers de 15-28 años hispanohablantes" },
      { id: "vibe",     label: "¿Cómo es tu personalidad en pantalla?", placeholder: "Ej: Directo y sin filtros, cercano y divertido, experto serio" },
      { id: "platforms",label: "¿En qué plataformas estás o querés estar?", placeholder: "Ej: YouTube, TikTok, Twitch, Instagram" },
    ]
  },
];

// ─────────────────────────────────────────────
// DEMO RESULTS por categoría
// ─────────────────────────────────────────────
const DEMOS = {
  artist: {
    brandName: "Luna Vera",
    alternativeNames: ["Vera Sound", "Luna Oscura"],
    slogan: "Donde la noche encuentra su voz.",
    alternativeSlogans: ["Música que deja cicatrices.", "El sonido de lo que no se dice."],
    essence: "Una artista que convierte el dolor en belleza y la oscuridad en luz a través de su música.",
    personality: ["Auténtica", "Visceral", "Poética", "Libre"],
    toneOfVoice: "Raw y honesto. Habla directo al corazón sin rodeos. Como una carta que nunca enviaste.",
    colors: {
      primary:   { hex: "#1A0A2E", name: "Noche Profunda",  meaning: "La oscuridad de donde nace el arte" },
      secondary: { hex: "#9B6DFF", name: "Violeta Eléctrico", meaning: "La energía creativa, lo mágico" },
      accent:    { hex: "#FF4D8D", name: "Rosa Herida",      meaning: "La emoción cruda, la vulnerabilidad" },
      neutral:   { hex: "#F0E6FF", name: "Lavanda Suave",    meaning: "El espacio para respirar y sentir" },
    },
    typography: {
      display: { font: "Cormorant Garamond", use: "Nombre artístico, títulos de álbumes" },
      body:    { font: "DM Sans",            use: "Biografía, fechas de shows, redes sociales" },
    },
    logoDirection: "Símbolo de luna creciente estilizada que forma una L sutil. Líneas finas, acabado minimalista. Funciona en blanco sobre oscuro. Con tipografía serif elegante debajo.",
    brandStory: "Luna Vera nació en una habitación a las 3am, cuando las palabras que no podían decirse en voz alta encontraron una melodía. Su música no es entretenimiento — es testimonio.",
    targetMessage: "Para los que sienten demasiado y necesitan saber que no están solos.",
    differentiation: "Mientras otros artistas muestran perfección, Luna Vera muestra las fracturas. Eso la hace irremplazable.",
  },
  business: {
    brandName: "Flowi",
    alternativeNames: ["NovaPay", "Streamly"],
    slogan: "Tu operación, sin fricción.",
    alternativeSlogans: ["Automatizá lo repetitivo. Enfocate en crecer.", "El sistema nervioso de tu empresa."],
    essence: "Software que elimina el trabajo manual para que los equipos se enfoquen en lo que realmente importa.",
    personality: ["Confiable", "Eficiente", "Moderno", "Humano"],
    toneOfVoice: "Directo y claro como un buen ingeniero. Sin jerga innecesaria. Explica lo complejo de forma simple.",
    colors: {
      primary:   { hex: "#0A1628", name: "Azul Medianoche", meaning: "Confianza, profundidad, solidez" },
      secondary: { hex: "#00C2FF", name: "Cian Eléctrico",  meaning: "Velocidad, innovación, claridad" },
      accent:    { hex: "#C8F04A", name: "Verde Acción",    meaning: "Resultados, crecimiento, positividad" },
      neutral:   { hex: "#F4F7FB", name: "Gris Nube",       meaning: "Limpieza, espacio, profesionalismo" },
    },
    typography: {
      display: { font: "Sora",      use: "Titulares, nombre del producto, headlines" },
      body:    { font: "Inter",     use: "UI del producto, documentación, emails" },
    },
    logoDirection: "Ícono abstracto de flujo: tres líneas que convergen en un punto, evocando eficiencia y dirección. Simple, escalable, memorable en cualquier tamaño.",
    brandStory: "Flowi nació de la frustración de ver equipos brillantes perder horas en tareas que una máquina podría hacer. Creemos que el talento humano merece enfocarse en problemas que realmente importan.",
    targetMessage: "Recuperá 10 horas semanales por empleado, desde el primer mes.",
    differentiation: "No vendemos software — vendemos tiempo. Cada automatización que implementamos es tiempo que tu equipo recupera para crear, decidir e innovar.",
  },
  commerce: {
    brandName: "Masa Madre",
    alternativeNames: ["Pan de Casa", "La Fermenta"],
    slogan: "El pan que tu abuela haría si supiera lo que sabemos.",
    alternativeSlogans: ["Fermentado con tiempo. Horneado con amor.", "Desde el trigo hasta tu mesa."],
    essence: "Panadería artesanal que recupera la tradición del pan honesto en un mundo de ultra-procesados.",
    personality: ["Artesanal", "Honesto", "Cálido", "Comprometido"],
    toneOfVoice: "Como el panadero de barrio que conoce tu nombre. Cercano, auténtico, apasionado por su oficio.",
    colors: {
      primary:   { hex: "#5C3D1E", name: "Trigo Tostado",  meaning: "La calidez del pan recién horneado" },
      secondary: { hex: "#E8B86D", name: "Miel Dorada",    meaning: "Lo artesanal, lo dulce de lo simple" },
      accent:    { hex: "#4A7C59", name: "Verde Espelta",   meaning: "Ingredientes naturales, compromiso" },
      neutral:   { hex: "#FAF3E8", name: "Harina Suave",   meaning: "Pureza, simplicidad, transparencia" },
    },
    typography: {
      display: { font: "Playfair Display", use: "Nombre del local, títulos de productos" },
      body:    { font: "Lato",             use: "Descripciones, etiquetas, redes sociales" },
    },
    logoDirection: "Espiga de trigo estilizada que forma una M. Trazos orgánicos y manuscritos. Sello circular estilo artesanal. En una tinta, versátil para packaging y bolsas de papel.",
    brandStory: "Masa Madre nació cuando su fundadora volvió del exterior con una obsesión: recuperar el pan de verdad. El que tarda 48 horas en hacerse. El que tiene tres ingredientes. El que dura una semana.",
    targetMessage: "Para quienes creen que comer bien es un acto de amor propio.",
    differentiation: "Mientras las panaderías industriales reducen costos, nosotros aumentamos el tiempo de fermentación. No porque sea marketing — porque es la única forma de hacer pan de verdad.",
  },
  creator: {
    brandName: "TechConMiguel",
    alternativeNames: ["MiguelTech", "El Lab de Miguel"],
    slogan: "La tecnología explicada por alguien que la usa de verdad.",
    alternativeSlogans: ["Sin humo. Solo lo que funciona.", "Tech para humanos."],
    essence: "Un creador que desmitifica la tecnología con honestidad brutal y cero relleno.",
    personality: ["Directo", "Curioso", "Honesto", "Accesible"],
    toneOfVoice: "Como ese amigo tech que te dice la verdad aunque no quieras escucharla. Sin sponsors que lo condicionen. Sin palabras de más.",
    colors: {
      primary:   { hex: "#0D0D0D", name: "Negro Puro",      meaning: "Seriedad, autoridad, foco total" },
      secondary: { hex: "#00E5FF", name: "Cian Tech",       meaning: "Tecnología, futuro, claridad" },
      accent:    { hex: "#FFD600", name: "Amarillo Alerta",  meaning: "Atención, energía, lo importante" },
      neutral:   { hex: "#F5F5F5", name: "Gris Pantalla",   meaning: "Neutralidad, limpieza, profesionalismo" },
    },
    typography: {
      display: { font: "Space Grotesk", use: "Títulos de videos, thumbnails, nombre" },
      body:    { font: "IBM Plex Sans", use: "Descripciones, subtítulos, comunidad" },
    },
    logoDirection: "Chip de procesador estilizado formando una T y M entrelazadas. Estética tech minimalista. Funciona perfecto como avatar de canal y thumbnail.",
    brandStory: "Miguel empezó a hacer reviews porque estaba harto de los canales patrocinados que nunca dicen la verdad. Un video honesto sobre un producto malo lo hizo viral. El resto es historia.",
    targetMessage: "Si querés saber si vale la pena antes de gastar tu plata, este es tu canal.",
    differentiation: "El único creador tech en español que devuelve productos cuando no le gustan y lo dice en cámara.",
  },
};

const C = {
  bg: "#0a0a0f", surface: "#12121a", border: "#1e1e2e",
  accent: "#c8f04a", accentDim: "#8aaa2a", text: "#e8e8f0",
  muted: "#6b6b80", card: "#16161f",
};

function LogoSVG({ result, size = 160 }) {
  const p  = result.colors?.primary?.hex   || "#333";
  const s  = result.colors?.secondary?.hex || "#888";
  const a  = result.colors?.accent?.hex    || "#aaa";
  const n  = result.colors?.neutral?.hex   || "#f5f5f5";
  const L  = (result.brandName?.[0] || "B").toUpperCase();
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="rg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={n} stopOpacity="0.12"/>
          <stop offset="100%" stopColor={n} stopOpacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="94" fill={p} opacity="0.08" stroke={p} strokeWidth="0.8"/>
      <circle cx="100" cy="100" r="84" fill="url(#rg)"/>
      <circle cx="100" cy="100" r="84" fill="none" stroke={s} strokeWidth="0.5" strokeDasharray="3 5" opacity="0.35"/>
      <path d="M100 28 C116 28 136 50 130 70 C124 86 110 91 100 89 C90 91 76 86 70 70 C64 50 84 28 100 28Z" fill={a} opacity="0.9"/>
      <path d="M100 30 L100 89" stroke={n} strokeWidth="1" opacity="0.4" fill="none"/>
      <path d="M84 58 Q93 61 116 55" stroke={n} strokeWidth="0.7" opacity="0.3" fill="none"/>
      <line x1="100" y1="114" x2="100" y2="158" stroke={s} strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M100 130 Q84 140 77 156" stroke={s} strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.65"/>
      <path d="M100 138 Q116 146 123 159" stroke={s} strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.65"/>
      <circle cx="100" cy="101" r="21" fill={p}/>
      <circle cx="100" cy="101" r="19" fill={p} stroke={s} strokeWidth="1"/>
      <text x="100" y="109" textAnchor="middle" fill={n} fontSize="21" fontFamily="Georgia,serif" fontWeight="bold">{L}</text>
      <path id="arc" d="M32 100 A68 68 0 0 1 168 100" fill="none"/>
      <text fontSize="8" fontFamily="Georgia,serif" letterSpacing="2.5" fill={p} opacity="0.85">
        <textPath href="#arc" startOffset="14%">{result.brandName?.toUpperCase()}</textPath>
      </text>
      {[0,60,120,180,240,300].map((deg,i)=>{
        const r2=(deg*Math.PI)/180;
        return <circle key={i} cx={100+89*Math.cos(r2)} cy={100+89*Math.sin(r2)} r="1.8" fill={s} opacity="0.4"/>;
      })}
    </svg>
  );
}

export default function BrandForge() {
  const [phase, setPhase]       = useState("pick");   // pick | form | loading | result
  const [category, setCategory] = useState(null);
  const [answers, setAnswers]   = useState({});
  const [result, setResult]     = useState(null);
  const [loadMsg, setLoadMsg]   = useState("");
  const [isDemo, setIsDemo]     = useState(false);
  const [logoTab, setLogoTab]   = useState("dark");
  const [logoUrl, setLogoUrl]   = useState(null);
  const [loadingLogo, setLoadingLogo] = useState(false);
  const [toast, setToast]       = useState("");
  const [copied, setCopied]     = useState(false);
  const [variants, setVariants] = useState([]);
  const [activeVariant, setActiveVariant] = useState(0);

  const MSGS = ["Analizando tu perfil...","Construyendo identidad de marca...","Eligiendo paleta de colores...","Generando nombres únicos...","Creando concepto de logo...","Últimos detalles..."];

  const showToast = (m) => { setToast(m); setTimeout(()=>setToast(""),3000); };
  const cat = CATEGORIES.find(c => c.id === category);

  const isComplete = cat?.questions.every(q => answers[q.id]?.trim());

  const handleChange = (id, val) => setAnswers(p => ({...p, [id]: val}));

  const pickCategory = (id) => { setCategory(id); setAnswers({}); setPhase("form"); };
  const backToPick   = () => { setPhase("pick"); setCategory(null); setResult(null); setVariants([]); };

  // ── DEMO ──
  const runDemo = () => {
    setPhase("loading"); setIsDemo(true);
    let i=0; setLoadMsg(MSGS[0]);
    const iv = setInterval(()=>{ i=(i+1)%MSGS.length; setLoadMsg(MSGS[i]); }, 600);
    setTimeout(()=>{
      clearInterval(iv);
      const d = DEMOS[category] || DEMOS.commerce;
      setResult(d); setVariants([d]); setActiveVariant(0); setPhase("result");
    }, 3800);
  };

  // ── GENERATE LOGO ──
  const generateLogo = async (brandResult) => {
    setLoadingLogo(true);
    setLogoUrl(null);
    try {
      const prompt = `Minimalist professional logo icon for "${brandResult.brandName}". ${brandResult.logoDirection} Colors: ${Object.values(brandResult.colors||{}).map(c=>c.hex).join(", ")}. Clean vector style, white background, no text, just the symbol.`;
      const res = await fetch("/api/generate-logo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (data.url) setLogoUrl(data.url);
    } catch(err) { console.log("Error generando logo:", err); }
    finally { setLoadingLogo(false); }
  };

  // ── REAL ──
  const runReal = async () => {
    setPhase("loading"); setIsDemo(false); setLogoUrl(null);
    let i=0; setLoadMsg(MSGS[0]);
    const iv = setInterval(()=>{ i=(i+1)%MSGS.length; setLoadMsg(MSGS[i]); }, 1600);
    const ctx = cat.questions.map(q => `- ${q.label}: ${answers[q.id]}`).join("\n");
    try {
      const res = await fetch("/api/generate",{
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:1500,
          messages:[{role:"user",content:`Eres un experto en branding. Genera una identidad de marca completa y profesional para un/a ${cat.label} con esta información:\n${ctx}\n\nResponde SOLO JSON válido sin markdown:\n{"brandName":"","alternativeNames":["",""],"slogan":"","alternativeSlogans":["",""],"essence":"","personality":["","","",""],"toneOfVoice":"","colors":{"primary":{"hex":"#XXXXXX","name":"","meaning":""},"secondary":{"hex":"#XXXXXX","name":"","meaning":""},"accent":{"hex":"#XXXXXX","name":"","meaning":""},"neutral":{"hex":"#XXXXXX","name":"","meaning":""}},"typography":{"display":{"font":"","use":""},"body":{"font":"","use":""}},"logoDirection":"","brandStory":"","targetMessage":"","differentiation":""}`}]
        })
      });
      const data = await res.json();
      const parsed = JSON.parse(data.content.map(x=>x.text||"").join("").replace(/```json|```/g,"").trim());
      setResult(parsed); setVariants([parsed]); setActiveVariant(0); setPhase("result");
      generateLogo(parsed);
    } catch {
      showToast("⚠️ Error de API. Probá el modo demo."); setPhase("form");
    } finally { clearInterval(iv); }
  };

  // ── REGENERAR VARIANTE ──
  const regenerate = async () => {
    if (isDemo) {
      showToast("En la versión real, esto genera una nueva variante con IA 🎨");
      return;
    }
    showToast("Generando nueva variante...");
    const ctx = cat.questions.map(q=>`- ${q.label}: ${answers[q.id]}`).join("\n");
    try {
      const res = await fetch("/api/generate",{
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:1500,
          messages:[{role:"user",content:`Eres un experto en branding. Genera UNA VARIANTE DIFERENTE de identidad de marca para un/a ${cat.label}. IMPORTANTE: debe ser distinta a nombres como ${variants.map(v=>v.brandName).join(", ")}.\n${ctx}\n\nResponde SOLO JSON válido sin markdown:\n{"brandName":"","alternativeNames":["",""],"slogan":"","alternativeSlogans":["",""],"essence":"","personality":["","","",""],"toneOfVoice":"","colors":{"primary":{"hex":"#XXXXXX","name":"","meaning":""},"secondary":{"hex":"#XXXXXX","name":"","meaning":""},"accent":{"hex":"#XXXXXX","name":"","meaning":""},"neutral":{"hex":"#XXXXXX","name":"","meaning":""}},"typography":{"display":{"font":"","use":""},"body":{"font":"","use":""}},"logoDirection":"","brandStory":"","targetMessage":"","differentiation":""}`}]
        })
      });
      const data = await res.json();
      const parsed = JSON.parse(data.content.map(x=>x.text||"").join("").replace(/```json|```/g,"").trim());
      const newVariants = [...variants, parsed];
      setVariants(newVariants); setActiveVariant(newVariants.length-1); setResult(parsed);
      generateLogo(parsed);
      showToast(`¡Variante ${newVariants.length} generada! 🎨`);
    } catch { showToast("Error al generar variante."); }
  };

  const handleShare = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setCopied(true); showToast("¡Link copiado! 🔗");
      setTimeout(()=>setCopied(false),3000);
    } catch { showToast("No se pudo copiar"); }
  };

  const logoBg = {
    dark:  result?.colors?.primary?.hex   || "#0a0a0f",
    light: result?.colors?.neutral?.hex   || "#f5f5f5",
    brand: result?.colors?.secondary?.hex || "#888",
  };

  const card  = { background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:20, marginBottom:12 };
  const lbl   = { fontSize:10, fontWeight:700, letterSpacing:"0.13em", textTransform:"uppercase", color:C.accent, marginBottom:7, display:"block" };

  return (
    <div style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:"'DM Sans',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Bebas+Neue&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::placeholder{color:#3a3a50} textarea{outline:none} textarea:focus{border-color:${C.accent}!important}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideUp{from{opacity:0;transform:translateX(-50%) translateY(8px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
        @keyframes popIn{from{opacity:0;transform:scale(0.9)}to{opacity:1;transform:scale(1)}}
        .fu{animation:fadeUp 0.4s ease forwards}
        .pi{animation:popIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards}
        .toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#112008;border:1px solid ${C.accent}50;color:${C.accent};padding:11px 22px;border-radius:30px;font-size:13px;font-weight:500;z-index:999;animation:slideUp 0.3s ease;white-space:nowrap}
        .tag{display:inline-block;background:#1a1a28;border:1px solid #2a2a3e;border-radius:20px;padding:3px 12px;font-size:12px;color:${C.muted};margin:3px}
        .swatch{width:42px;height:42px;border-radius:9px;flex-shrink:0}
        .btnM{background:${C.accent};color:#0a0a0f;border:none;padding:11px 22px;border-radius:8px;font-weight:700;font-size:14px;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.2s;display:inline-flex;align-items:center;gap:7px}
        .btnM:hover{background:${C.accentDim};transform:translateY(-1px)} .btnM:disabled{opacity:0.4;cursor:not-allowed;transform:none}
        .btnD{background:#1a1a08;color:#d4c840;border:1px solid #d4c84030;padding:11px 22px;border-radius:8px;font-weight:700;font-size:13px;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.2s;display:inline-flex;align-items:center;gap:7px}
        .btnD:hover{background:#252510}
        .btnG{background:transparent;color:${C.muted};border:1px solid ${C.border};padding:9px 16px;border-radius:8px;font-size:13px;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.2s;display:inline-flex;align-items:center;gap:6px}
        .btnG:hover{border-color:${C.accent};color:${C.accent}}
        .btnR{background:#1a0f2e;color:#9B6DFF;border:1px solid #9B6DFF40;padding:9px 16px;border-radius:8px;font-size:13px;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.2s;display:inline-flex;align-items:center;gap:6px;font-weight:700}
        .btnR:hover{background:#240f3e}
        .tab{padding:7px 14px;border-radius:7px;font-size:11px;font-weight:700;cursor:pointer;border:none;font-family:'DM Sans',sans-serif;transition:all 0.2s;text-transform:uppercase;letter-spacing:0.08em}
        .tA{background:${C.accent};color:#0a0a0f} .tI{background:transparent;color:${C.muted};border:1px solid ${C.border}}
        .catCard{background:${C.card};border:1px solid ${C.border};border-radius:14px;padding:22px 18px;cursor:pointer;transition:all 0.2s;text-align:center}
        .catCard:hover{transform:translateY(-4px);border-color:var(--cat-color)}
        .varBtn{padding:6px 14px;border-radius:20px;font-size:12px;font-weight:700;cursor:pointer;border:1px solid ${C.border};font-family:'DM Sans',sans-serif;transition:all 0.2s;background:transparent;color:${C.muted}}
        .varBtn:hover{border-color:${C.accent};color:${C.accent}}
        .varBtnA{background:${C.accent}20;border-color:${C.accent};color:${C.accent}}
      `}</style>

      {toast && <div className="toast">{toast}</div>}

      {/* ── HEADER ── */}
      <div style={{borderBottom:`1px solid ${C.border}`,padding:"15px 22px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={backToPick}>
          <div style={{width:29,height:29,background:C.accent,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>✦</div>
          <span style={{fontFamily:"'Bebas Neue'",fontSize:20,letterSpacing:"0.08em"}}>BRANDFORGE</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          {cat && phase!=="pick" && (
            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:20,padding:"4px 12px",fontSize:12,color:C.muted,display:"flex",alignItems:"center",gap:6}}>
              <span>{cat.emoji}</span><span>{cat.label}</span>
            </div>
          )}
          {phase==="result" && <button className="btnG" onClick={backToPick}>← Cambiar tipo</button>}
        </div>
      </div>

      {/* ══════════════════════════════
          FASE 1 — ELEGIR CATEGORÍA
      ══════════════════════════════ */}
      {phase==="pick" && (
        <div style={{maxWidth:680,margin:"0 auto",padding:"52px 20px"}} className="fu">
          <p style={{fontSize:10,letterSpacing:"0.16em",color:C.accent,fontWeight:700,textTransform:"uppercase",marginBottom:10}}>Generador de Identidad de Marca con IA</p>
          <h1 style={{fontFamily:"'Bebas Neue'",fontSize:46,lineHeight:1,marginBottom:10}}>¿QUÉ TIPO DE<br/><span style={{color:C.accent}}>MARCA CREAMOS?</span></h1>
          <p style={{color:C.muted,fontSize:14,lineHeight:1.65,marginBottom:36}}>Elegí tu categoría y el formulario se adapta con preguntas específicas para vos. Identidad completa en 60 segundos.</p>

          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:14}}>
            {CATEGORIES.map(c => (
              <div key={c.id} className="catCard pi" style={{"--cat-color":c.color}} onClick={()=>pickCategory(c.id)}>
                <div style={{fontSize:36,marginBottom:10}}>{c.emoji}</div>
                <div style={{fontWeight:700,fontSize:16,marginBottom:4,color:C.text}}>{c.label}</div>
                <div style={{fontSize:12,color:C.muted,lineHeight:1.5}}>{c.sub}</div>
                <div style={{marginTop:14,background:c.color+"20",border:`1px solid ${c.color}40`,borderRadius:20,padding:"5px 14px",display:"inline-block",fontSize:11,fontWeight:700,color:c.color}}>
                  Elegir →
                </div>
              </div>
            ))}
          </div>

          <p style={{textAlign:"center",color:C.muted,fontSize:11,marginTop:24}}>Powered by Claude AI · Identidades únicas y profesionales · ~20 segundos</p>
        </div>
      )}

      {/* ══════════════════════════════
          FASE 2 — FORMULARIO
      ══════════════════════════════ */}
      {phase==="form" && cat && (
        <div style={{maxWidth:580,margin:"0 auto",padding:"48px 20px"}} className="fu">
          {/* Cat badge */}
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:cat.color+"20",border:`1px solid ${cat.color}40`,borderRadius:20,padding:"6px 16px",marginBottom:24}}>
            <span style={{fontSize:18}}>{cat.emoji}</span>
            <span style={{fontSize:13,fontWeight:700,color:cat.color}}>{cat.label}</span>
          </div>

          <h1 style={{fontFamily:"'Bebas Neue'",fontSize:42,lineHeight:1,marginBottom:10}}>
            TU IDENTIDAD,<br/><span style={{color:C.accent}}>EN MINUTOS.</span>
          </h1>
          <p style={{color:C.muted,fontSize:13,lineHeight:1.65,marginBottom:28}}>
            Respondé estas {cat.questions.length} preguntas específicas para {cat.label.toLowerCase()}s y recibís tu identidad completa con nombre, slogan, colores y logo.
          </p>

          {cat.questions.map((q,i) => (
            <div key={q.id} style={{marginBottom:18}}>
              <label style={{display:"block",fontSize:13,color:C.text,marginBottom:6,fontWeight:500}}>
                <span style={{color:cat.color,fontFamily:"'Bebas Neue'",fontSize:17,marginRight:7}}>{i+1}</span>{q.label}
              </label>
              <textarea value={answers[q.id]||""} onChange={e=>handleChange(q.id,e.target.value)} placeholder={q.placeholder} rows={2}
                style={{width:"100%",background:C.surface,border:`1px solid ${C.border}`,borderRadius:9,padding:"11px 13px",color:C.text,fontSize:13,resize:"none",fontFamily:"'DM Sans',sans-serif",lineHeight:1.5,transition:"border-color 0.2s"}}/>
            </div>
          ))}

          <div style={{display:"flex",flexDirection:"column",gap:9,marginTop:6}}>
            <button className="btnM" onClick={runReal} disabled={!isComplete} style={{justifyContent:"center",fontSize:15,padding:"14px",background:cat.color,borderColor:cat.color}}>
              ✦ Generar identidad con IA
            </button>
            <button className="btnD" onClick={runDemo} style={{justifyContent:"center",fontSize:13,padding:"12px"}}>
              ★ Ver demo (sin API key)
            </button>
          </div>
          <p style={{textAlign:"center",color:C.muted,fontSize:11,marginTop:9}}>Powered by Claude AI · ~20 segundos</p>
        </div>
      )}

      {/* ══════════════════════════════
          LOADING
      ══════════════════════════════ */}
      {phase==="loading" && (
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"80vh",gap:24}}>
          <div style={{position:"relative",width:72,height:72}}>
            <div style={{width:72,height:72,border:`2px solid ${C.border}`,borderTopColor:cat?.color||C.accent,borderRadius:"50%",animation:"spin 1s linear infinite",position:"absolute"}}/>
            <div style={{width:48,height:48,border:`2px solid ${C.border}`,borderBottomColor:cat?.color||C.accent,borderRadius:"50%",animation:"spin 1.5s linear infinite reverse",position:"absolute",top:12,left:12}}/>
          </div>
          <p style={{color:C.text,fontSize:15,fontWeight:500,animation:"pulse 1.4s ease infinite"}}>{loadMsg}</p>
          <p style={{color:C.muted,fontSize:12}}>{isDemo?"Cargando demo...":"Hasta 20 segundos"}</p>
        </div>
      )}

      {/* ══════════════════════════════
          RESULTADO
      ══════════════════════════════ */}
      {phase==="result" && result && (
        <div style={{maxWidth:740,margin:"0 auto",padding:"36px 20px"}} className="fu">

          {/* Demo banner */}
          {isDemo && (
            <div style={{background:"#151000",border:"1px solid #c8a02040",borderRadius:10,padding:"10px 16px",marginBottom:18,display:"flex",gap:10,alignItems:"center"}}>
              <span>★</span>
              <span style={{color:"#c8a020",fontSize:12,fontWeight:600}}>Demo para {cat?.label} — </span>
              <span style={{color:C.muted,fontSize:12}}>Con tu API key genera identidades únicas para cada cliente real.</span>
            </div>
          )}

          {/* ── HERO ── */}
          <div style={{textAlign:"center",marginBottom:24}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,background:cat?.color+"20",border:`1px solid ${cat?.color}40`,borderRadius:20,padding:"5px 14px",marginBottom:14}}>
              <span>{cat?.emoji}</span>
              <span style={{fontSize:12,fontWeight:700,color:cat?.color}}>{cat?.label}</span>
            </div>
            <h1 style={{fontFamily:"'Bebas Neue'",fontSize:58,color:C.accent,lineHeight:1}}>{result.brandName}</h1>
            <p style={{fontSize:16,color:C.text,marginTop:8,fontStyle:"italic"}}>"{result.slogan}"</p>
            <p style={{color:C.muted,marginTop:8,fontSize:13,maxWidth:440,margin:"9px auto 0",lineHeight:1.65}}>{result.essence}</p>
          </div>

          {/* ── VARIANTES ── */}
          {variants.length > 0 && (
            <div style={{display:"flex",alignItems:"center",gap:8,justifyContent:"center",marginBottom:16,flexWrap:"wrap"}}>
              <span style={{fontSize:11,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em"}}>Variante:</span>
              {variants.map((v,i) => (
                <button key={i} className={`varBtn ${activeVariant===i?"varBtnA":""}`}
                  onClick={()=>{ setActiveVariant(i); setResult(variants[i]); }}>
                  {i+1} — {v.brandName}
                </button>
              ))}
              {variants.length < 3 && (
                <button className="btnR" onClick={regenerate} style={{fontSize:12,padding:"6px 14px"}}>
                  🎲 Nueva variante {isDemo?"(demo)":""}
                </button>
              )}
            </div>
          )}

          {/* ── ACTIONS ── */}
          <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:20,flexWrap:"wrap"}}>
            <button className="btnG" onClick={handleShare}>{copied?"✓ Copiado":"🔗 Compartir con cliente"}</button>
            <button className="btnG" onClick={()=>{ setPhase("form"); setResult(null); setVariants([]); }}>✏️ Editar respuestas</button>
            <button className="btnG" onClick={backToPick}>← Otra categoría</button>
          </div>

          {/* ── LOGO ── */}
          <div style={card}>
            <span style={lbl}>Logo generado automáticamente</span>
            <div style={{display:"flex",gap:7,marginBottom:14}}>
              {[["dark","🌙"],["light","☀️"],["brand","🎨"]].map(([k,icon])=>(
                <button key={k} className={`tab ${logoTab===k?"tA":"tI"}`} onClick={()=>setLogoTab(k)}>{icon} {k==="dark"?"Oscuro":k==="light"?"Claro":"Marca"}</button>
              ))}
            </div>
            <div style={{background:logoBg[logoTab],borderRadius:12,padding:"40px 20px",display:"flex",flexDirection:"column",alignItems:"center",gap:16,transition:"background 0.4s",marginBottom:12}}>
              {logoUrl ? (
                <img src={logoUrl} alt="Logo generado" style={{width:160,height:160,borderRadius:12,objectFit:"contain",background:"white",padding:8}}/>
              ) : loadingLogo ? (
                <div style={{width:160,height:160,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10}}>
                  <div style={{width:40,height:40,border:`3px solid rgba(255,255,255,0.2)`,borderTopColor:"white",borderRadius:"50%",animation:"spin 1s linear infinite"}}/>
                  <span style={{fontSize:11,color:"rgba(255,255,255,0.6)"}}>Generando logo con IA...</span>
                </div>
              ) : (
                <LogoSVG result={result} size={160}/>
              )}
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:22,fontWeight:700,color:logoTab==="light"?result.colors?.primary?.hex:result.colors?.neutral?.hex,letterSpacing:"0.04em",transition:"color 0.3s"}}>{result.brandName}</div>
                <div style={{fontSize:10,color:logoTab==="light"?result.colors?.secondary?.hex:result.colors?.accent?.hex,letterSpacing:"0.2em",textTransform:"uppercase",marginTop:3,transition:"color 0.3s"}}>{result.slogan}</div>
              </div>
            </div>
            {!isDemo && (
              <div style={{background:"#0a1a08",border:`1px solid ${C.accent}20`,borderRadius:8,padding:"10px 14px",fontSize:12,color:C.muted,lineHeight:1.6,marginBottom:8}}>
                ⚡ <strong style={{color:C.accent}}>Logo generado por DALL-E 3</strong> — único para cada marca. Costo: $0.04.
              </div>
            )}
          </div>

          {/* Nombres y slogans */}
          <div style={card}>
            <span style={lbl}>Nombres alternativos</span>
            <div>{result.alternativeNames?.map((n,i)=><span key={i} className="tag">{n}</span>)}</div>
            <span style={{...lbl,marginTop:14}}>Slogans alternativos</span>
            <div>{result.alternativeSlogans?.map((s,i)=><span key={i} className="tag">"{s}"</span>)}</div>
          </div>

          {/* Colores */}
          <div style={card}>
            <span style={lbl}>Paleta de colores</span>
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12}}>
              {result.colors && Object.entries(result.colors).map(([k,c])=>(
                <div key={k} style={{display:"flex",alignItems:"center",gap:10}}>
                  <div className="swatch" style={{background:c.hex,boxShadow:`0 3px 12px ${c.hex}55`}}/>
                  <div>
                    <div style={{fontWeight:600,fontSize:13}}>{c.name}</div>
                    <div style={{fontSize:11,color:C.muted,fontFamily:"monospace"}}>{c.hex}</div>
                    <div style={{fontSize:11,color:C.muted,marginTop:1}}>{c.meaning}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tipografía */}
          <div style={card}>
            <span style={lbl}>Tipografía</span>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {result.typography && Object.entries(result.typography).map(([k,t])=>(
                <div key={k} style={{background:C.surface,borderRadius:9,padding:14}}>
                  <div style={{fontSize:9,color:C.accent,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:4}}>{k==="display"?"Titulares":"Cuerpo"}</div>
                  <div style={{fontWeight:700,fontSize:14}}>{t.font}</div>
                  <div style={{fontSize:11,color:C.muted,marginTop:3}}>{t.use}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Personalidad */}
          <div style={card}>
            <span style={lbl}>Personalidad</span>
            <div style={{marginBottom:10}}>{result.personality?.map((p,i)=><span key={i} className="tag">#{p}</span>)}</div>
            <span style={lbl}>Tono de voz</span>
            <p style={{color:C.text,fontSize:13,lineHeight:1.65}}>{result.toneOfVoice}</p>
          </div>

          {/* Historia + Diferenciación */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
            <div style={{...card,margin:0}}>
              <span style={lbl}>Historia</span>
              <p style={{color:C.text,fontSize:12,lineHeight:1.7}}>{result.brandStory}</p>
            </div>
            <div style={{...card,margin:0}}>
              <span style={lbl}>Diferenciación</span>
              <p style={{color:C.text,fontSize:12,lineHeight:1.7}}>{result.differentiation}</p>
            </div>
          </div>

          {/* Logo direction */}
          <div style={card}>
            <span style={lbl}>Dirección de logo</span>
            <p style={{color:C.text,fontSize:13,lineHeight:1.7}}>{result.logoDirection}</p>
          </div>

          {/* Mensaje clave */}
          <div style={{background:cat?.color||C.accent,borderRadius:13,padding:"22px 24px",textAlign:"center",marginBottom:24}}>
            <span style={{fontSize:9,fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:"#000",opacity:0.5}}>Mensaje clave</span>
            <p style={{fontSize:17,fontWeight:700,color:"#0a0a0f",marginTop:6,lineHeight:1.5}}>"{result.targetMessage}"</p>
          </div>

          <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
            <button className="btnG" onClick={handleShare}>{copied?"✓ Copiado":"🔗 Compartir"}</button>
            <button className="btnG" onClick={backToPick}>← Nueva marca</button>
          </div>
        </div>
      )}
    </div>
  );
}
