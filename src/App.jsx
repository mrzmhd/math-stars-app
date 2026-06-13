import { useState, useEffect, useRef, useCallback } from "react";

// ===================== i18n =====================
const LANGS = {
  en: { flag: "🇬🇧", name: "English" },
  fa: { flag: "🇮🇷", name: "فارسی" },
  ar: { flag: "🇸🇦", name: "العربية" },
  fr: { flag: "🇫🇷", name: "Français" },
  tr: { flag: "🇹🇷", name: "Türkçe" },
  zh: { flag: "🇨🇳", name: "中文" },
};
const RTL = ["fa", "ar"];

const T = {
  en: {
    appTitle: "Math Stars", appSub: "Club",
    tagline: "Turn Math into Adventure! 🚀",
    chooseExplorer: "Choose your explorer:", whatsYourName: "What's your name?",
    namePlaceholder: "Enter your name...", startAdventure: "Start Adventure! 🌟",
    funGames: "🎮 Fun Games", progressTracking: "📊 Progress", earnBadges: "🏆 Badges",
    hiName: n => `Hi, ${n}!`, pickGame: "Pick your game",
    numbers: "Numbers", best: "Best", played: "Played",
    back: "← Back", timeUp: "Time's up! ⏰", sec: "s",
    playAgain: "🔄 Play Again", home: "🏠 Home",
    mathChampion: "🏆 Math Champion!", greatExplorer: "🥈 Great Explorer!", keepGoing: "🥉 Keep Going!",
    achievementUnlocked: "🎖️ Achievement: Perfect Score!",
    question: (c, t) => `Question ${c} of ${t}`,
    encouragements: ["Amazing! You're a Star! 🌟","Brilliant! ⚡","Fantastic! 🚀","You got it! 🏆","Superb! 🦁"],
    wrongMsgs: ["Oops! Try again! 🤔","Almost there! 💪","Don't give up! 🌈"],
    // Games
    games: {
      quiz:    { name: "Quick Math", desc: "Answer fast math questions", icon: "⚡" },
      missing: { name: "Missing Number", desc: "Fill in the blank □", icon: "🔍" },
      pattern: { name: "Pattern Detective", desc: "Find the next number in the sequence", icon: "🔮" },
      builder: { name: "Number Builder", desc: "Reach the target using the given numbers", icon: "🏗️" },
      balance: { name: "Balance Scale", desc: "Make both sides equal", icon: "⚖️" },
    },
    targetLabel: "Target:", useLabel: "Use:", tryLabel: "Try:",
    correct: "Correct! 🎉", wrong: "Not quite! 🤔",
    equationLabel: "Make the scale balance!", leftSide: "Left", rightSide: "Right",
    patternLabel: "What comes next?", missingLabel: "Find the missing number:",
    builderHint: "Tap numbers and operators to build the answer",
    clear: "Clear", check: "✓ Check",
    score: "Score", level: "Level",
    easyMode: "⭐ Easy", mediumMode: "🌟 Medium", hardMode: "💫 Hard",
    selectLevel: "Select Difficulty",
    startGame: "▶ Start",
    levelLabel: "Level",
  },
  fa: {
    appTitle: "ستاره‌های ریاضی", appSub: "باشگاه",
    tagline: "ریاضی رو به ماجرا تبدیل کن! 🚀",
    chooseExplorer: "کاشف خودت رو انتخاب کن:", whatsYourName: "اسمت چیه؟",
    namePlaceholder: "اسمت رو بنویس...", startAdventure: "شروع ماجرا! 🌟",
    funGames: "🎮 بازی", progressTracking: "📊 پیشرفت", earnBadges: "🏆 مدال",
    hiName: n => `سلام ${n}!`, pickGame: "بازی خودت رو انتخاب کن",
    numbers: "اعداد", best: "بهترین", played: "بازی",
    back: "→ برگشت", timeUp: "وقت تموم شد! ⏰", sec: "ث",
    playAgain: "🔄 دوباره", home: "🏠 خانه",
    mathChampion: "🏆 قهرمان ریاضی!", greatExplorer: "🥈 کاشف عالی!", keepGoing: "🥉 ادامه بده!",
    achievementUnlocked: "🎖️ دستاورد: نمره کامل!",
    question: (c, t) => `سوال ${c} از ${t}`,
    encouragements: ["عالیه! ستاره‌ای! 🌟","فوق‌العاده! ⚡","آفرین! 🚀","درسته! 🏆","بی‌نظیر! 🦁"],
    wrongMsgs: ["اشکالی نداره! دوباره! 🤔","نزدیک بود! 💪","ناامید نشو! 🌈"],
    games: {
      quiz:    { name: "ریاضی سریع", desc: "سوالات ریاضی سریع جواب بده", icon: "⚡" },
      missing: { name: "عدد گمشده", desc: "جای خالی □ رو پر کن", icon: "🔍" },
      pattern: { name: "کارآگاه الگو", desc: "عدد بعدی دنباله رو پیدا کن", icon: "🔮" },
      builder: { name: "عددساز", desc: "با اعداد داده‌شده به هدف برس", icon: "🏗️" },
      balance: { name: "ترازو", desc: "دو طرف رو مساوی کن", icon: "⚖️" },
    },
    targetLabel: "هدف:", useLabel: "استفاده کن:", tryLabel: "امتحان:",
    correct: "درسته! 🎉", wrong: "نه دقیقاً! 🤔",
    equationLabel: "ترازو رو تعادل بده!", leftSide: "چپ", rightSide: "راست",
    patternLabel: "عدد بعدی چیه؟", missingLabel: "عدد گمشده رو پیدا کن:",
    builderHint: "اعداد و عملگرها رو بزن تا جواب رو بسازی",
    clear: "پاک", check: "✓ بررسی",
    score: "امتیاز", level: "سطح",
    easyMode: "⭐ آسان", mediumMode: "🌟 متوسط", hardMode: "💫 سخت",
    selectLevel: "سختی رو انتخاب کن",
    startGame: "▶ شروع",
    levelLabel: "سطح",
  },
  ar: {
    appTitle: "نجوم الرياضيات", appSub: "النادي",
    tagline: "حوّل الرياضيات إلى مغامرة! 🚀",
    chooseExplorer: "اختر مستكشفك:", whatsYourName: "ما اسمك؟",
    namePlaceholder: "أدخل اسمك...", startAdventure: "ابدأ المغامرة! 🌟",
    funGames: "🎮 ألعاب", progressTracking: "📊 تقدم", earnBadges: "🏆 شارات",
    hiName: n => `مرحباً ${n}!`, pickGame: "اختر لعبتك",
    numbers: "أرقام", best: "أفضل", played: "لُعب",
    back: "→ رجوع", timeUp: "انتهى الوقت! ⏰", sec: "ث",
    playAgain: "🔄 مجدداً", home: "🏠 رئيسية",
    mathChampion: "🏆 بطل الرياضيات!", greatExplorer: "🥈 مستكشف!", keepGoing: "🥉 استمر!",
    achievementUnlocked: "🎖️ إنجاز: نتيجة مثالية!",
    question: (c, t) => `السؤال ${c} من ${t}`,
    encouragements: ["رائع! أنت نجم! 🌟","ممتاز! ⚡","أحسنت! 🚀","صحيح! 🏆","بطل! 🦁"],
    wrongMsgs: ["حاول مجدداً! 🤔","قريب! 💪","لا تستسلم! 🌈"],
    games: {
      quiz:    { name: "رياضيات سريعة", desc: "أجب على أسئلة رياضية سريعة", icon: "⚡" },
      missing: { name: "الرقم المفقود", desc: "أكمل الفراغ □", icon: "🔍" },
      pattern: { name: "محقق النمط", desc: "اكتشف الرقم التالي", icon: "🔮" },
      builder: { name: "بناء الأرقام", desc: "ابنِ الهدف بالأرقام المعطاة", icon: "🏗️" },
      balance: { name: "الميزان", desc: "اجعل الطرفين متساويين", icon: "⚖️" },
    },
    targetLabel: "الهدف:", useLabel: "استخدم:", tryLabel: "جرّب:",
    correct: "صحيح! 🎉", wrong: "ليس تماماً! 🤔",
    equationLabel: "وازن الميزان!", leftSide: "يسار", rightSide: "يمين",
    patternLabel: "ما التالي؟", missingLabel: "اكتشف الرقم المفقود:",
    builderHint: "اضغط الأرقام والعمليات لبناء الجواب",
    clear: "مسح", check: "✓ تحقق",
    score: "نقاط", level: "مستوى",
    easyMode: "⭐ سهل", mediumMode: "🌟 متوسط", hardMode: "💫 صعب",
    selectLevel: "اختر الصعوبة",
    startGame: "▶ ابدأ",
    levelLabel: "مستوى",
  },
  fr: {
    appTitle: "Math Stars", appSub: "Club",
    tagline: "Transforme les maths en aventure! 🚀",
    chooseExplorer: "Choisis ton explorateur:", whatsYourName: "Quel est ton prénom?",
    namePlaceholder: "Entre ton prénom...", startAdventure: "Commencer! 🌟",
    funGames: "🎮 Jeux", progressTracking: "📊 Progrès", earnBadges: "🏆 Badges",
    hiName: n => `Salut, ${n}!`, pickGame: "Choisis ton jeu",
    numbers: "Nombres", best: "Meilleur", played: "Joué",
    back: "← Retour", timeUp: "Temps écoulé! ⏰", sec: "s",
    playAgain: "🔄 Rejouer", home: "🏠 Accueil",
    mathChampion: "🏆 Champion!", greatExplorer: "🥈 Explorateur!", keepGoing: "🥉 Continue!",
    achievementUnlocked: "🎖️ Succès: Score Parfait!",
    question: (c, t) => `Question ${c} / ${t}`,
    encouragements: ["Incroyable! 🌟","Brillant! ⚡","Fantastique! 🚀","Tu l'as fait! 🏆","Super! 🦁"],
    wrongMsgs: ["Réessaie! 🤔","Presque! 💪","N'abandonne pas! 🌈"],
    games: {
      quiz:    { name: "Maths Rapides", desc: "Réponds vite aux questions", icon: "⚡" },
      missing: { name: "Nombre Manquant", desc: "Complète le □", icon: "🔍" },
      pattern: { name: "Détective Motifs", desc: "Trouve le prochain nombre", icon: "🔮" },
      builder: { name: "Constructeur", desc: "Atteins l'objectif avec les nombres", icon: "🏗️" },
      balance: { name: "Balance", desc: "Équilibre les deux côtés", icon: "⚖️" },
    },
    targetLabel: "Cible:", useLabel: "Utilise:", tryLabel: "Essaie:",
    correct: "Correct! 🎉", wrong: "Pas tout à fait! 🤔",
    equationLabel: "Équilibre la balance!", leftSide: "Gauche", rightSide: "Droite",
    patternLabel: "Quel est le suivant?", missingLabel: "Trouve le nombre manquant:",
    builderHint: "Appuie sur les nombres et opérateurs",
    clear: "Effacer", check: "✓ Vérifier",
    score: "Score", level: "Niveau",
    easyMode: "⭐ Facile", mediumMode: "🌟 Moyen", hardMode: "💫 Difficile",
    selectLevel: "Choisis la difficulté",
    startGame: "▶ Jouer",
    levelLabel: "Niveau",
  },
  tr: {
    appTitle: "Matematik Yıldızları", appSub: "Kulübü",
    tagline: "Matematiği maceraya dönüştür! 🚀",
    chooseExplorer: "Kaşifini seç:", whatsYourName: "Adın ne?",
    namePlaceholder: "Adını gir...", startAdventure: "Maceraya başla! 🌟",
    funGames: "🎮 Oyunlar", progressTracking: "📊 İlerleme", earnBadges: "🏆 Rozetler",
    hiName: n => `Merhaba, ${n}!`, pickGame: "Oyununu seç",
    numbers: "Sayılar", best: "En iyi", played: "Oynandı",
    back: "← Geri", timeUp: "Süre doldu! ⏰", sec: "s",
    playAgain: "🔄 Tekrar", home: "🏠 Ana Sayfa",
    mathChampion: "🏆 Şampiyon!", greatExplorer: "🥈 Kaşif!", keepGoing: "🥉 Devam!",
    achievementUnlocked: "🎖️ Başarım: Mükemmel!",
    question: (c, t) => `Soru ${c} / ${t}`,
    encouragements: ["Harika! 🌟","Muhteşem! ⚡","Fantastik! 🚀","Başardın! 🏆","Süper! 🦁"],
    wrongMsgs: ["Tekrar dene! 🤔","Neredeyse! 💪","Vazgeçme! 🌈"],
    games: {
      quiz:    { name: "Hızlı Matematik", desc: "Hızlı sorulara cevap ver", icon: "⚡" },
      missing: { name: "Kayıp Sayı", desc: "□ boşluğu doldur", icon: "🔍" },
      pattern: { name: "Desen Dedektifi", desc: "Sıradaki sayıyı bul", icon: "🔮" },
      builder: { name: "Sayı Yapıcı", desc: "Verilen sayılarla hedefe ulaş", icon: "🏗️" },
      balance: { name: "Terazi", desc: "İki tarafı eşitle", icon: "⚖️" },
    },
    targetLabel: "Hedef:", useLabel: "Kullan:", tryLabel: "Dene:",
    correct: "Doğru! 🎉", wrong: "Tam değil! 🤔",
    equationLabel: "Teraziyi dengele!", leftSide: "Sol", rightSide: "Sağ",
    patternLabel: "Sıradaki ne?", missingLabel: "Kayıp sayıyı bul:",
    builderHint: "Sayılar ve operatörlere dokun",
    clear: "Temizle", check: "✓ Kontrol",
    score: "Puan", level: "Seviye",
    easyMode: "⭐ Kolay", mediumMode: "🌟 Orta", hardMode: "💫 Zor",
    selectLevel: "Zorluk seç",
    startGame: "▶ Başla",
    levelLabel: "Seviye",
  },
  zh: {
    appTitle: "数学之星", appSub: "俱乐部",
    tagline: "把数学变成冒险！🚀",
    chooseExplorer: "选择你的探险家：", whatsYourName: "你叫什么名字？",
    namePlaceholder: "输入你的名字...", startAdventure: "开始冒险！🌟",
    funGames: "🎮 游戏", progressTracking: "📊 进度", earnBadges: "🏆 徽章",
    hiName: n => `你好，${n}！`, pickGame: "选择你的游戏",
    numbers: "数字", best: "最佳", played: "已玩",
    back: "← 返回", timeUp: "时间到！⏰", sec: "秒",
    playAgain: "🔄 再玩", home: "🏠 主页",
    mathChampion: "🏆 数学冠军！", greatExplorer: "🥈 探险家！", keepGoing: "🥉 继续！",
    achievementUnlocked: "🎖️ 成就：满分！",
    question: (c, t) => `第${c}/${t}题`,
    encouragements: ["太棒了！🌟","出色！⚡","太厉害了！🚀","做到了！🏆","超级棒！🦁"],
    wrongMsgs: ["再试试！🤔","差一点！💪","不要放弃！🌈"],
    games: {
      quiz:    { name: "快速数学", desc: "快速回答数学问题", icon: "⚡" },
      missing: { name: "缺失数字", desc: "填写空白 □", icon: "🔍" },
      pattern: { name: "图案侦探", desc: "找出序列中的下一个数字", icon: "🔮" },
      builder: { name: "数字建造者", desc: "用给定数字达到目标", icon: "🏗️" },
      balance: { name: "天平", desc: "使两边相等", icon: "⚖️" },
    },
    targetLabel: "目标：", useLabel: "使用：", tryLabel: "尝试：",
    correct: "正确！🎉", wrong: "不太对！🤔",
    equationLabel: "平衡天平！", leftSide: "左", rightSide: "右",
    patternLabel: "下一个是什么？", missingLabel: "找出缺失的数字：",
    builderHint: "点击数字和运算符来构建答案",
    clear: "清除", check: "✓ 检查",
    score: "分数", level: "级别",
    easyMode: "⭐ 简单", mediumMode: "🌟 中等", hardMode: "💫 困难",
    selectLevel: "选择难度",
    startGame: "▶ 开始",
    levelLabel: "级别",
  },
};

// ===================== UTILS =====================
const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const AVATARS = ["🦁","🐯","🦊","🐻","🐼","🦄","🐲","🚀"];

// ===================== GAME GENERATORS =====================

// 1. QUIZ
function genQuiz(difficulty) {
  const configs = {
    easy:   { range: [1,5],  ops:["+"] },
    medium: { range: [1,10], ops:["+","-"] },
    hard:   { range: [1,20], ops:["+","-","×","÷"] },
  };
  const { range, ops } = configs[difficulty];
  const op = pick(ops);
  let a = rnd(...range), b = rnd(...range), answer, display;
  if (op==="+") { answer=a+b; display=`${a} + ${b}`; }
  else if (op==="-") { if(a<b)[a,b]=[b,a]; answer=a-b; display=`${a} − ${b}`; }
  else if (op==="×") { a=rnd(1,5); b=rnd(1,5); answer=a*b; display=`${a} × ${b}`; }
  else { // ÷ — generate cleanly divisible numbers
    b=rnd(1,5); answer=rnd(1,10); a=b*answer;
    display=`${a} ÷ ${b}`;
  }
  const wrong = new Set();
  while(wrong.size<3){ const w=answer+rnd(-4,4); if(w!==answer&&w>=0)wrong.add(w); }
  return { display, answer, options:[...wrong,answer].sort(()=>Math.random()-.5) };
}

// 2. MISSING NUMBER  e.g.  □ + 5 = 9
function genMissing(difficulty) {
  const r = difficulty==="easy"?[1,5]:difficulty==="medium"?[1,10]:[1,20];
  const ops = difficulty==="hard"?["+","-","×","÷"]:["+","-"];
  const op = pick(ops);
  let a=rnd(...r), b=rnd(...r), answer;
  if(op==="×"){a=rnd(1,5);b=rnd(1,5);}
  if(op==="-"&&a<b)[a,b]=[b,a];
  if(op==="÷"){ b=rnd(1,5); answer=rnd(1,10); a=b*answer; }
  const result = op==="+"?a+b:op==="-"?a-b:op==="×"?a*b:a/b;
  const side = op==="÷"?1:pick([0,1]); // for ÷ only right side (□) makes sense: a ÷ b = □  OR  a ÷ □ = answer
  if(op==="÷"){
    // Two forms: "a ÷ b = □"  or  "a ÷ □ = answer"
    const form=pick([0,1]);
    if(form===0){ answer=result; return { display:`${a} ÷ ${b} = □`, answer, options:[...new Set([answer+rnd(-3,3),answer+rnd(-3,3),answer+rnd(-3,3)].filter(w=>w!==answer&&w>0)).values()].slice(0,3).concat([answer]).sort(()=>Math.random()-.5) }; }
    else { answer=b; const wrong=new Set(); while(wrong.size<3){const w=b+rnd(-3,3);if(w!==b&&w>=1)wrong.add(w);} return { display:`${a} ÷ □ = ${result}`, answer, options:[...wrong,answer].sort(()=>Math.random()-.5) }; }
  }
  answer = side===0?a:b;
  const opSym = op==="×"?"×":op;
  const display = side===0 ? `□ ${opSym} ${b} = ${result}` : `${a} ${opSym} □ = ${result}`;
  const wrong = new Set();
  while(wrong.size<3){ const w=answer+rnd(-4,4); if(w!==answer&&w>=0)wrong.add(w); }
  return { display, answer, options:[...wrong,answer].sort(()=>Math.random()-.5) };
}

// 3. PATTERN DETECTIVE
function genPattern(difficulty) {
  const patterns = difficulty==="easy" ? [
    ()=>{ const s=rnd(1,5),d=rnd(1,3); return {seq:[s,s+d,s+2*d,s+3*d],answer:s+4*d,rule:`+${d}`}; },
    ()=>{ const s=rnd(2,10),d=rnd(1,3); return {seq:[s,s-d,s-2*d,s-3*d].filter(x=>x>=0).slice(0,4),answer:Math.max(0,s-4*d),rule:`-${d}`}; },
  ] : difficulty==="medium" ? [
    ()=>{ const s=rnd(1,5),d=rnd(2,5); return {seq:[s,s+d,s+2*d,s+3*d],answer:s+4*d,rule:`+${d}`}; },
    ()=>{ const s=rnd(2,3); return {seq:[s,s*2,s*4,s*8],answer:s*16,rule:"×2"}; },
    ()=>{ const s=rnd(5,15),d=rnd(2,4); return {seq:[s,s-d,s-2*d,s-3*d].filter(x=>x>=0).slice(0,4),answer:Math.max(0,s-4*d),rule:`-${d}`}; },
  ] : [
    ()=>{ const s=rnd(1,4); return {seq:[s,s*s,(s+1)*(s+1),(s+2)*(s+2)],answer:(s+3)*(s+3),rule:"squares"}; },
    ()=>{ const s=rnd(1,3); return {seq:[s,s*3,s*9,s*27],answer:s*81,rule:"×3"}; },
    ()=>{ const a=rnd(1,4),b=rnd(1,4); return {seq:[a,b,a+b,a+2*b],answer:2*a+3*b,rule:"Fibonacci-like"}; },
  ];
  const p = pick(patterns)();
  const wrong = new Set();
  while(wrong.size<3){ const w=p.answer+rnd(-5,5); if(w!==p.answer&&w>=0)wrong.add(w); }
  return { seq:p.seq, answer:p.answer, rule:p.rule, options:[...wrong,p.answer].sort(()=>Math.random()-.5) };
}

// 4. NUMBER BUILDER — use given tiles to reach target
function genBuilder(difficulty) {
  const configs = {
    easy:   { nums:()=>[rnd(1,5),rnd(1,5),rnd(1,5)], ops:["+"] },
    medium: { nums:()=>[rnd(1,10),rnd(1,10),rnd(1,5)], ops:["+","-"] },
    hard:   { nums:()=>[rnd(1,10),rnd(1,10),rnd(2,5)], ops:["+","-","×","÷"] },
  };
  const { nums, ops: allowedOps } = configs[difficulty];
  const tiles = nums();
  const op1 = pick(allowedOps), op2 = pick(allowedOps);
  const a=tiles[0],b=tiles[1],c=tiles[2];
  const calc = (x,y,op)=>{
    if(op==="+") return x+y;
    if(op==="-") return Math.abs(x-y);
    if(op==="×") return x*y;
    if(op==="÷") return y!==0&&x%y===0?x/y:null;
    return null;
  };
  const mid = calc(a,b,op1);
  if(mid===null) return genBuilder(difficulty);
  const target = calc(mid,c,op2);
  if(target===null||target<1||target>99) { return genBuilder(difficulty); }
  return { tiles, target, ops: allowedOps };
}

// 5. BALANCE SCALE — fill in ? to make both sides equal
function genBalance(difficulty) {
  const r = difficulty==="easy"?[1,5]:difficulty==="medium"?[1,10]:[1,20];
  const a=rnd(...r), b=rnd(...r), c=rnd(...r);
  // left = a + b, right = c + ?answer
  const total = a+b;
  const answer = total - c;
  if(answer<0||answer===c) return genBalance(difficulty);
  const wrong = new Set();
  while(wrong.size<3){ const w=answer+rnd(-4,4); if(w!==answer&&w>=0&&w!==c)wrong.add(w); }
  return { leftA:a, leftB:b, rightC:c, answer, total, options:[...wrong,answer].sort(()=>Math.random()-.5) };
}

// ===================== SMALL UI =====================
function StarBurst({x,y}){
  return <div style={{position:"fixed",left:x-20,top:y-20,pointerEvents:"none",zIndex:9999,fontSize:32,animation:"starburst 0.7s ease-out forwards"}}>⭐</div>;
}
function ProgressBar({value,max,color}){
  return(
    <div style={{background:"#fff3",borderRadius:99,height:10,overflow:"hidden",margin:"5px 0"}}>
      <div style={{width:`${(value/max)*100}%`,height:"100%",background:`linear-gradient(90deg,${color},#fff5)`,borderRadius:99,transition:"width 0.5s cubic-bezier(.4,2,.6,1)",boxShadow:`0 0 10px ${color}`}}/>
    </div>
  );
}
function LangPicker({lang,setLang}){
  const [open,setOpen]=useState(false);
  return(
    <div style={{position:"relative",marginBottom:14}}>
      <button onClick={()=>setOpen(o=>!o)} style={S.langBtn}>{LANGS[lang].flag} {LANGS[lang].name} ▾</button>
      {open&&(
        <div style={S.langDropdown}>
          {Object.entries(LANGS).map(([k,v])=>(
            <button key={k} onClick={()=>{setLang(k);setOpen(false);}}
              style={{...S.langOption,background:k===lang?"rgba(255,211,61,0.2)":"transparent"}}>
              {v.flag} {v.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
function Msg({text,color}){
  return text?<div style={{...S.msgBanner,color,borderColor:color}}>{text}</div>:null;
}

// ===================== WELCOME =====================
function WelcomeScreen({onStart,lang,setLang}){
  const [name,setName]=useState(""); const [avatar,setAvatar]=useState("🦁"); const [shake,setShake]=useState(false);
  const t=T[lang]; const isRTL=RTL.includes(lang);
  function go(){ if(!name.trim()){setShake(true);setTimeout(()=>setShake(false),500);return;} onStart(name.trim(),avatar); }
  return(
    <div style={S.screen} dir={isRTL?"rtl":"ltr"}>
      <div style={S.card}>
        <LangPicker lang={lang} setLang={setLang}/>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:4}}>
          <span style={{fontSize:48}}>⭐</span>
          <div><div style={S.logoTitle}>{t.appTitle}</div><div style={S.logoSub}>{t.appSub}</div></div>
        </div>
        <p style={S.tagline}>{t.tagline}</p>
        <div style={S.sectionLabel}>{t.chooseExplorer}</div>
        <div style={S.avatarGrid}>
          {AVATARS.map(a=><button key={a} onClick={()=>setAvatar(a)} style={{...S.avatarBtn,...(avatar===a?S.avatarActive:{})}}>{a}</button>)}
        </div>
        <div style={S.sectionLabel}>{t.whatsYourName}</div>
        <input value={name} onChange={e=>setName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&go()}
          placeholder={t.namePlaceholder} maxLength={20}
          style={{...S.nameInput,...(shake?S.shake:{}),textAlign:isRTL?"right":"left"}}/>
        <button onClick={go} style={S.startBtn}>{t.startAdventure}</button>
        <div style={S.featureRow}>
          {[t.funGames,t.progressTracking,t.earnBadges].map(f=><span key={f} style={S.featurePill}>{f}</span>)}
        </div>
      </div>
    </div>
  );
}

// ===================== GAME SELECT =====================
const GAME_KEYS = ["quiz","missing","pattern","builder","balance"];
const GAME_COLORS = { quiz:"#FFD93D", missing:"#6BCB77", pattern:"#4D96FF", builder:"#FF6B6B", balance:"#A855F7" };

function GameSelectScreen({name,avatar,scores,onSelect,lang,setLang}){
  const t=T[lang]; const isRTL=RTL.includes(lang);
  return(
    <div style={S.screen} dir={isRTL?"rtl":"ltr"}>
      <div style={S.card}>
        <LangPicker lang={lang} setLang={setLang}/>
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20}}>
          <span style={{fontSize:44}}>{avatar}</span>
          <div><div style={S.heroName}>{t.hiName(name)}</div><div style={S.heroSub}>{t.pickGame}</div></div>
        </div>
        {GAME_KEYS.map(gk=>{
          const g=t.games[gk]; const color=GAME_COLORS[gk];
          const sc=scores[gk]||{best:0,played:0};
          return(
            <button key={gk} onClick={()=>onSelect(gk)} style={{...S.gameBtn,borderColor:color,boxShadow:`0 3px 16px ${color}33`}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:28,lineHeight:1}}>{g.icon}</span>
                <div style={{flex:1,textAlign:"left"}}>
                  <div style={{fontSize:16,fontWeight:800,color}}>{g.name}</div>
                  <div style={{fontSize:11,opacity:0.6,marginTop:2}}>{g.desc}</div>
                </div>
                {sc.played>0&&<div style={{fontSize:11,color,whiteSpace:"nowrap"}}>{t.best}: {sc.best}</div>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ===================== DIFFICULTY SELECT =====================
function DifficultyScreen({gameKey,name,avatar,onStart,onBack,lang}){
  const t=T[lang]; const isRTL=RTL.includes(lang);
  const color=GAME_COLORS[gameKey];
  const g=t.games[gameKey];
  const diffs=["easy","medium","hard"];
  const labels=[t.easyMode,t.mediumMode,t.hardMode];
  return(
    <div style={S.screen} dir={isRTL?"rtl":"ltr"}>
      <div style={S.card}>
        <button onClick={onBack} style={S.backBtn}>{t.back}</button>
        <div style={{textAlign:"center",margin:"16px 0"}}>
          <div style={{fontSize:52}}>{g.icon}</div>
          <div style={{fontFamily:"'Fredoka One',cursive",fontSize:24,color,marginTop:6}}>{g.name}</div>
          <div style={{fontSize:12,opacity:0.55,marginTop:4}}>{g.desc}</div>
        </div>
        <div style={S.sectionLabel}>{t.selectLevel}</div>
        {diffs.map((d,i)=>(
          <button key={d} onClick={()=>onStart(d)} style={{...S.levelBtn,borderColor:color,boxShadow:`0 3px 14px ${color}33`,marginBottom:10}}>
            <span style={{fontSize:18}}>{labels[i]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ===================== RESULT =====================
function ResultScreen({name,avatar,gameKey,score,total,onRetry,onHome,lang}){
  const t=T[lang]; const isRTL=RTL.includes(lang);
  const color=GAME_COLORS[gameKey];
  const pct=score/total;
  const stars=pct>=0.9?3:pct>=0.6?2:1;
  const badge=pct>=0.9?t.mathChampion:pct>=0.6?t.greatExplorer:t.keepGoing;
  return(
    <div style={S.screen} dir={isRTL?"rtl":"ltr"}>
      <div style={{...S.card,textAlign:"center"}}>
        <div style={{fontSize:60}}>{avatar}</div>
        <div style={{fontFamily:"'Fredoka One',cursive",fontSize:24,color:"#FFD93D",marginTop:6}}>{badge}</div>
        <div style={{fontSize:13,opacity:0.5,marginBottom:10}}>{name}</div>
        <div style={{display:"flex",justifyContent:"center",gap:8,margin:"10px 0"}}>
          {[1,2,3].map(i=><span key={i} style={{fontSize:36,opacity:i<=stars?1:0.2,filter:i<=stars?"drop-shadow(0 0 8px #FFD93D)":"none",animation:i<=stars?`starPop 0.3s ${i*.15}s both`:"none"}}>⭐</span>)}
        </div>
        <div style={{display:"flex",justifyContent:"center",alignItems:"baseline",gap:4,margin:"8px 0"}}>
          <span style={{fontSize:52,fontWeight:900,color}}>{score}</span>
          <span style={{fontSize:24,opacity:0.4,color:"#fff"}}>/{total}</span>
        </div>
        <ProgressBar value={score} max={total} color={color}/>
        <div style={{display:"flex",gap:10,marginTop:18}}>
          <button onClick={onRetry} style={{...S.retryBtn,borderColor:color,color}}>{t.playAgain}</button>
          <button onClick={onHome} style={S.homeBtn}>{t.home}</button>
        </div>
        {pct>=0.9&&<div style={S.achievementBanner}>{t.achievementUnlocked}</div>}
      </div>
    </div>
  );
}

// ===================== GAME WRAPPER =====================
function GameWrapper({gameKey,difficulty,name,avatar,onDone,onBack,lang}){
  const TOTAL=8;
  const t=T[lang]; const isRTL=RTL.includes(lang);
  const color=GAME_COLORS[gameKey];
  const [current,setCurrent]=useState(1);
  const [score,setScore]=useState(0);
  const [q,setQ]=useState(()=>makeQ());
  const [chosen,setChosen]=useState(null);
  const [msg,setMsg]=useState(""); const [msgColor,setMsgColor]=useState("#fff");
  const [stars,setStars]=useState([]);
  const [timer,setTimer]=useState(20);
  const timerRef=useRef();
  const [builderExpr,setBuilderExpr]=useState([]);
  const [speaking,setSpeaking]=useState(false);
  const ttsLang={en:"en-US",fa:"fa-IR",ar:"ar-SA",fr:"fr-FR",tr:"tr-TR",zh:"zh-CN"};

  function speakQuestion(qObj){
    if(!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    let text="";
    if(gameKey==="quiz"||gameKey==="missing"){
      text=qObj.display
        .replace(/☐/g," blank ")
        .replace(/−/g," minus ")
        .replace(/×/g," times ")
        .replace(/÷/g," divided by ")
        .replace(/=/g," equals ")
        +" question mark";
    } else if(gameKey==="pattern"){
      text="What comes next? "+qObj.seq.join(", ");
    } else if(gameKey==="builder"){
      text="Reach the target: "+qObj.target+". Numbers: "+qObj.tiles.join(", ");
    } else if(gameKey==="balance"){
      text=qObj.leftA+" plus "+qObj.leftB+" equals "+qObj.rightC+" plus question mark";
    }
    if(!text) return;
    const trySpeak=()=>{
      const utt=new SpeechSynthesisUtterance(text);
      const langCode=ttsLang[lang]||"en-US";
      const voices=window.speechSynthesis.getVoices();
      const voice=voices.find(v=>v.lang===langCode)||voices.find(v=>v.lang.startsWith(langCode.split("-")[0]))||null;
      if(voice) utt.voice=voice;
      utt.lang=langCode; utt.rate=0.82; utt.pitch=1.1; utt.volume=1;
      utt.onstart=()=>setSpeaking(true);
      utt.onend=()=>setSpeaking(false);
      utt.onerror=(e)=>{ console.warn("TTS error",e); setSpeaking(false); };
      window.speechSynthesis.speak(utt);
    };
    if(window.speechSynthesis.getVoices().length>0){ setTimeout(trySpeak, 100); }
    else { window.speechSynthesis.onvoiceschanged=()=>{ window.speechSynthesis.onvoiceschanged=null; setTimeout(trySpeak,100); }; }
  }

  function makeQ(){
    if(gameKey==="quiz") return genQuiz(difficulty);
    if(gameKey==="missing") return genMissing(difficulty);
    if(gameKey==="pattern") return genPattern(difficulty);
    if(gameKey==="builder") return genBuilder(difficulty);
    if(gameKey==="balance") return genBalance(difficulty);
  }

  useEffect(()=>{
    setSpeaking(false);
    setTimer(20); clearInterval(timerRef.current);
    timerRef.current=setInterval(()=>{
      setTimer(p=>{
        if(p<=1){ clearInterval(timerRef.current); handleAnswer(-999); return 20; }
        return p-1;
      });
    },1000);
    return ()=>clearInterval(timerRef.current);
  },[current]);

  function handleAnswer(ans){
    clearInterval(timerRef.current);
    setChosen(ans);
    const correct=ans===q.answer;
    const newScore=score+(correct?1:0);
    if(correct){
      setScore(newScore);
      setMsg(pick(t.encouragements)); setMsgColor("#FFD93D");
      const ns=Array.from({length:3},(_,i)=>({id:Date.now()+i,x:80+Math.random()*(window.innerWidth-160),y:80+Math.random()*200}));
      setStars(s=>[...s,...ns]);
      setTimeout(()=>setStars(s=>s.filter(st=>!ns.find(n=>n.id===st.id))),800);
    } else {
      setMsg(ans===-999?t.timeUp:pick(t.wrongMsgs)); setMsgColor("#FF6B6B");
    }
    setTimeout(()=>{
      setMsg(""); setChosen(null); setBuilderExpr([]);
      if(current>=TOTAL){ onDone(newScore); }
      else { setCurrent(c=>c+1); setQ(makeQ()); }
    },1000);
  }

  const pct=timer/20;
  const timerColor=pct>0.5?"#6BCB77":pct>0.25?"#FFD93D":"#FF6B6B";

  // Builder check
  function builderEval(expr){
    try{
      const str=expr.map(e=>e==="×"?"*":e==="÷"?"/":e).join(" ");
      // eslint-disable-next-line no-new-func
      const result=Function(`"use strict";return (${str})`)();
      return Number.isFinite(result)&&Number.isInteger(result)?result:null;
    }catch{ return null; }
  }

  function renderQuestionArea(){
    const SpeakBtn=()=>(
      <button onClick={()=>speakQuestion(q)} style={{...S.speakBtn,background:speaking?"rgba(255,211,61,0.3)":"rgba(255,255,255,0.1)",borderColor:speaking?"#FFD93D":"rgba(255,255,255,0.2)"}}>
        {speaking?"🔊":"🔈"}
      </button>
    );
    if(gameKey==="quiz"){
      return(
        <>
          <div style={{...S.questionBox,position:"relative"}}>
            <div style={{position:"absolute",top:10,right:10}}><SpeakBtn/></div>
            <div style={S.questionText}>{q.display} = ?</div>
          </div>
          <div style={S.optGrid}>
            {q.options.map((opt,i)=>{
              let bg="rgba(255,255,255,0.1)",border="rgba(255,255,255,0.2)";
              if(chosen!==null){ if(opt===q.answer){bg="#6BCB7744";border="#6BCB77";}else if(opt===chosen){bg="#FF6B6B44";border="#FF6B6B";} }
              return <button key={i} disabled={chosen!==null} onClick={()=>chosen===null&&handleAnswer(opt)} style={{...S.optionBtn,background:bg,borderColor:border}}>{opt}</button>;
            })}
          </div>
        </>
      );
    }
    if(gameKey==="missing"){
      // display already has □ in the right place — no extra = ?
      // highlight □ in color
      const parts = q.display.split("□");
      return(
        <>
          <div style={{...S.questionBox,position:"relative"}}>
            <div style={{position:"absolute",top:10,right:10}}><SpeakBtn/></div>
            <div style={S.questionText}>
              {parts[0]}
              <span style={{color:"#FFD93D",textShadow:"0 0 16px #FFD93D99",fontFamily:"'Fredoka One',cursive"}}>□</span>
              {parts[1]}
            </div>
          </div>
          <div style={S.optGrid}>
            {q.options.map((opt,i)=>{
              let bg="rgba(255,255,255,0.1)",border="rgba(255,255,255,0.2)";
              if(chosen!==null){ if(opt===q.answer){bg="#6BCB7744";border="#6BCB77";}else if(opt===chosen){bg="#FF6B6B44";border="#FF6B6B";} }
              return <button key={i} disabled={chosen!==null} onClick={()=>chosen===null&&handleAnswer(opt)} style={{...S.optionBtn,background:bg,borderColor:border}}>{opt}</button>;
            })}
          </div>
        </>
      );
    }
    if(gameKey==="pattern"){
      return(
        <>
          <div style={{...S.questionBox,paddingBottom:16,position:"relative"}}>
            <div style={{position:"absolute",top:10,right:10}}><SpeakBtn/></div>
            <div style={{fontSize:12,opacity:0.55,marginBottom:10}}>{t.patternLabel}</div>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:8,flexWrap:"wrap"}}>
              {q.seq.map((n,i)=>(
                <span key={i} style={{fontSize:28,fontFamily:"'Fredoka One',cursive",color:"#fff",background:"rgba(255,255,255,0.12)",borderRadius:12,padding:"6px 14px"}}>{n}</span>
              ))}
              <span style={{fontSize:28,fontFamily:"'Fredoka One',cursive",color:color,background:`${color}22`,border:`2px dashed ${color}`,borderRadius:12,padding:"6px 14px"}}>?</span>
            </div>
          </div>
          <div style={S.optGrid}>
            {q.options.map((opt,i)=>{
              let bg="rgba(255,255,255,0.1)",border="rgba(255,255,255,0.2)";
              if(chosen!==null){ if(opt===q.answer){bg="#6BCB7744";border="#6BCB77";}else if(opt===chosen){bg="#FF6B6B44";border="#FF6B6B";} }
              return <button key={i} disabled={chosen!==null} onClick={()=>chosen===null&&handleAnswer(opt)} style={{...S.optionBtn,background:bg,borderColor:border}}>{opt}</button>;
            })}
          </div>
        </>
      );
    }
    if(gameKey==="builder"){
      const val=builderEval(builderExpr);
      const ops=q.ops;
      return(
        <>
          <div style={{...S.questionBox,position:"relative"}}>
            <div style={{position:"absolute",top:10,right:10}}><SpeakBtn/></div>
            <div style={{fontSize:12,opacity:0.55,marginBottom:4}}>{t.targetLabel}</div>
            <div style={{fontFamily:"'Fredoka One',cursive",fontSize:48,color}}>{q.target}</div>
            <div style={{fontSize:11,opacity:0.45,marginTop:4}}>{t.builderHint}</div>
          </div>
          {/* Expression display */}
          <div style={{background:"rgba(255,255,255,0.08)",borderRadius:14,padding:"12px 14px",marginBottom:10,minHeight:46,display:"flex",alignItems:"center",justifyContent:"center",gap:6,flexWrap:"wrap"}}>
            {builderExpr.length===0?<span style={{opacity:0.35,fontSize:14}}>?</span>:
              builderExpr.map((e,i)=><span key={i} style={{fontFamily:"'Fredoka One',cursive",fontSize:22,color:typeof e==="number"?"#FFD93D":color}}>{e}</span>)}
            {val!==null&&<span style={{fontSize:14,opacity:0.6,marginLeft:8}}>= {val}</span>}
          </div>
          {/* Tiles */}
          <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:8}}>
            {q.tiles.map((n,i)=>(
              <button key={i} onClick={()=>setBuilderExpr(e=>[...e,n])} style={{...S.tileBtn,borderColor:color}}>
                {n}
              </button>
            ))}
          </div>
          <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:10}}>
            {ops.map(op=>(
              <button key={op} onClick={()=>setBuilderExpr(e=>[...e,op])} style={{...S.tileBtn,borderColor:"#A855F7",color:"#A855F7",fontSize:20}}>
                {op}
              </button>
            ))}
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>setBuilderExpr([])} style={{...S.smallBtn,flex:1}}>{t.clear}</button>
            <button onClick={()=>{ if(val===q.target) handleAnswer(q.target); else { setMsg(t.wrong); setMsgColor("#FF6B6B"); setTimeout(()=>setMsg(""),800); } }}
              style={{...S.smallBtn,flex:2,background:color,color:"#1a0533",borderColor:color}}>{t.check}</button>
          </div>
        </>
      );
    }
    if(gameKey==="balance"){
      return(
        <>
          <div style={{...S.questionBox,paddingBottom:14,position:"relative"}}>
            <div style={{position:"absolute",top:10,right:10}}><SpeakBtn/></div>
            <div style={{fontSize:12,opacity:0.55,marginBottom:10}}>{t.equationLabel}</div>
            {/* Scale visual */}
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
              <div style={{background:"rgba(255,255,255,0.1)",borderRadius:12,padding:"8px 14px",textAlign:"center"}}>
                <div style={{fontSize:11,opacity:0.5,marginBottom:4}}>{t.leftSide}</div>
                <div style={{fontFamily:"'Fredoka One',cursive",fontSize:26,color:"#FFD93D"}}>{q.leftA} + {q.leftB}</div>
                <div style={{fontSize:12,opacity:0.5}}>= {q.total}</div>
              </div>
              <span style={{fontSize:28}}>⚖️</span>
              <div style={{background:"rgba(255,255,255,0.1)",borderRadius:12,padding:"8px 14px",textAlign:"center"}}>
                <div style={{fontSize:11,opacity:0.5,marginBottom:4}}>{t.rightSide}</div>
                <div style={{fontFamily:"'Fredoka One',cursive",fontSize:26,color}}>{q.rightC} + <span style={{color:"#FF6B6B"}}>?</span></div>
                <div style={{fontSize:12,opacity:0.5}}>= {q.total}</div>
              </div>
            </div>
          </div>
          <div style={S.optGrid}>
            {q.options.map((opt,i)=>{
              let bg="rgba(255,255,255,0.1)",border="rgba(255,255,255,0.2)";
              if(chosen!==null){ if(opt===q.answer){bg="#6BCB7744";border="#6BCB77";}else if(opt===chosen){bg="#FF6B6B44";border="#FF6B6B";} }
              return <button key={i} disabled={chosen!==null} onClick={()=>chosen===null&&handleAnswer(opt)} style={{...S.optionBtn,background:bg,borderColor:border}}>{opt}</button>;
            })}
          </div>
        </>
      );
    }
  }

  return(
    <div style={S.screen} dir={isRTL?"rtl":"ltr"}>
      {stars.map(s=><StarBurst key={s.id} x={s.x} y={s.y}/>)}
      <div style={S.card}>
        {/* Header */}
        <div style={S.gameHeader}>
          <button onClick={onBack} style={S.backBtn}>{t.back}</button>
          <div style={{...S.scoreChip,background:`${color}22`,border:`1px solid ${color}44`,color}}>{score}/{TOTAL}</div>
          <div style={{fontSize:12,opacity:0.5}}>{t.games[gameKey].icon}</div>
        </div>
        <ProgressBar value={current-1} max={TOTAL} color={color}/>
        <div style={{fontSize:10,opacity:0.4,textAlign:isRTL?"left":"right",marginBottom:8}}>{t.question(current,TOTAL)}</div>
        {/* Timer */}
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
          <div style={{flex:1,height:6,background:"#fff2",borderRadius:99,overflow:"hidden"}}>
            <div style={{width:`${pct*100}%`,height:"100%",background:timerColor,borderRadius:99,transition:"width 1s linear"}}/>
          </div>
          <span style={{fontSize:11,color:timerColor,fontWeight:700,minWidth:26}}>{timer}{t.sec}</span>
        </div>
        {renderQuestionArea()}
        <Msg text={msg} color={msgColor}/>
      </div>
    </div>
  );
}

// ===================== MAIN APP =====================
export default function App(){
  const [lang,setLang]=useState("en");
  const [screen,setScreen]=useState("welcome");
  const [name,setName]=useState(""); const [avatar,setAvatar]=useState("🦁");
  const [gameKey,setGameKey]=useState(null);
  const [difficulty,setDifficulty]=useState("easy");
  const [scores,setScores]=useState({});
  const [lastScore,setLastScore]=useState(0);

  function handleDone(score){
    setLastScore(score);
    setScores(prev=>{
      const old=prev[gameKey]||{best:0,played:0};
      return {...prev,[gameKey]:{best:Math.max(old.best,score),played:old.played+1}};
    });
    setScreen("result");
  }

  return(
    <div style={S.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;700;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;} button{cursor:pointer;font-family:inherit;}
        input::placeholder{color:rgba(255,255,255,0.35);} input:focus{outline:none;}
        @keyframes starburst{0%{transform:scale(0) rotate(0deg);opacity:1;}80%{transform:scale(1.4) rotate(180deg);}100%{transform:scale(0) rotate(360deg);opacity:0;}}
        @keyframes starPop{0%{transform:scale(0);}70%{transform:scale(1.3);}100%{transform:scale(1);}}
        @keyframes shake{0%,100%{transform:translateX(0);}25%{transform:translateX(-8px);}75%{transform:translateX(8px);}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
        @keyframes pulse{0%,100%{transform:scale(1);}50%{transform:scale(1.04);}}
        button:hover{opacity:0.88;} button:active{transform:scale(0.96);}
      `}</style>
      {screen==="welcome"&&<WelcomeScreen onStart={(n,a)=>{setName(n);setAvatar(a);setScreen("select");}} lang={lang} setLang={setLang}/>}
      {screen==="select"&&<GameSelectScreen name={name} avatar={avatar} scores={scores} onSelect={gk=>{setGameKey(gk);setScreen("difficulty");}} lang={lang} setLang={setLang}/>}
      {screen==="difficulty"&&<DifficultyScreen gameKey={gameKey} name={name} avatar={avatar} onStart={d=>{setDifficulty(d);setScreen("game");}} onBack={()=>setScreen("select")} lang={lang}/>}
      {screen==="game"&&<GameWrapper gameKey={gameKey} difficulty={difficulty} name={name} avatar={avatar} onDone={handleDone} onBack={()=>setScreen("select")} lang={lang}/>}
      {screen==="result"&&<ResultScreen name={name} avatar={avatar} gameKey={gameKey} score={lastScore} total={8} onRetry={()=>setScreen("game")} onHome={()=>setScreen("select")} lang={lang}/>}
    </div>
  );
}

// ===================== STYLES =====================
const S={
  root:{minHeight:"100vh",background:"linear-gradient(135deg,#1a0533 0%,#0d1b4b 55%,#0a2444 100%)",fontFamily:"'Nunito',sans-serif",display:"flex",justifyContent:"center",alignItems:"flex-start",padding:"14px 12px 40px"},
  screen:{width:"100%",maxWidth:440,animation:"fadeUp 0.35s ease both"},
  card:{background:"rgba(255,255,255,0.06)",backdropFilter:"blur(20px)",borderRadius:26,border:"1.5px solid rgba(255,255,255,0.11)",padding:"22px 18px",boxShadow:"0 24px 80px rgba(0,0,0,0.45)"},
  logoTitle:{fontFamily:"'Fredoka One',cursive",fontSize:26,color:"#FFD93D",lineHeight:1},
  logoSub:{fontFamily:"'Fredoka One',cursive",fontSize:20,color:"#fff",lineHeight:1},
  tagline:{color:"rgba(255,255,255,0.6)",fontSize:13,marginBottom:16},
  sectionLabel:{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.5)",textTransform:"uppercase",letterSpacing:1,marginBottom:9},
  avatarGrid:{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:7,marginBottom:16},
  avatarBtn:{fontSize:24,padding:"8px 0",background:"rgba(255,255,255,0.07)",border:"2px solid transparent",borderRadius:12,transition:"all 0.2s"},
  avatarActive:{background:"rgba(255,211,61,0.18)",border:"2px solid #FFD93D",transform:"scale(1.08)",boxShadow:"0 0 12px #FFD93D55"},
  nameInput:{width:"100%",padding:"12px 14px",background:"rgba(255,255,255,0.09)",border:"1.5px solid rgba(255,255,255,0.18)",borderRadius:12,color:"#fff",fontSize:15,marginBottom:14},
  shake:{animation:"shake 0.4s ease"},
  startBtn:{width:"100%",padding:"14px",background:"linear-gradient(135deg,#FFD93D,#FF6B35)",border:"none",borderRadius:14,color:"#1a0533",fontSize:16,fontWeight:900,boxShadow:"0 8px 24px rgba(255,211,61,0.4)",marginBottom:14,animation:"pulse 2s infinite"},
  featureRow:{display:"flex",flexWrap:"wrap",gap:6,justifyContent:"center"},
  featurePill:{background:"rgba(255,255,255,0.07)",borderRadius:99,padding:"4px 11px",fontSize:11,color:"rgba(255,255,255,0.6)",border:"1px solid rgba(255,255,255,0.1)"},
  heroName:{fontFamily:"'Fredoka One',cursive",fontSize:22,color:"#FFD93D"},
  heroSub:{fontSize:12,color:"rgba(255,255,255,0.5)",marginTop:2},
  gameBtn:{width:"100%",padding:"14px 16px",background:"rgba(255,255,255,0.07)",border:"2px solid",borderRadius:16,color:"#fff",marginBottom:10,transition:"transform 0.15s",textAlign:"left"},
  levelBtn:{width:"100%",padding:"15px 18px",background:"rgba(255,255,255,0.07)",border:"2px solid",borderRadius:16,color:"#fff",fontFamily:"'Nunito',sans-serif"},
  gameHeader:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10},
  backBtn:{background:"rgba(255,255,255,0.1)",border:"none",borderRadius:9,padding:"6px 11px",color:"rgba(255,255,255,0.65)",fontSize:12},
  scoreChip:{borderRadius:99,padding:"5px 13px",fontWeight:800,fontSize:13},
  questionBox:{background:"rgba(255,255,255,0.08)",borderRadius:16,padding:"20px 14px",textAlign:"center",marginBottom:10},
  questionText:{fontFamily:"'Fredoka One',cursive",fontSize:44,color:"#fff",textShadow:"0 0 24px rgba(255,255,255,0.2)"},
  optGrid:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10},
  optionBtn:{padding:"16px 8px",border:"2px solid",borderRadius:14,color:"#fff",fontSize:22,fontFamily:"'Fredoka One',cursive",transition:"all 0.15s"},
  tileBtn:{padding:"12px 18px",border:"2px solid",borderRadius:12,color:"#fff",fontSize:22,fontFamily:"'Fredoka One',cursive",background:"rgba(255,255,255,0.1)"},
  smallBtn:{padding:"10px",border:"2px solid rgba(255,255,255,0.2)",borderRadius:12,color:"#fff",fontSize:14,fontWeight:800,background:"rgba(255,255,255,0.1)"},
  msgBanner:{textAlign:"center",fontSize:13,fontWeight:700,padding:"7px 12px",borderRadius:9,border:"1px solid",marginTop:8,animation:"fadeUp 0.2s ease"},
  retryBtn:{flex:1,padding:"12px",background:"transparent",border:"2px solid",borderRadius:14,fontSize:14,fontWeight:800},
  homeBtn:{flex:1,padding:"12px",background:"rgba(255,255,255,0.1)",border:"2px solid rgba(255,255,255,0.18)",borderRadius:14,fontSize:14,fontWeight:800,color:"#fff"},
  achievementBanner:{marginTop:12,padding:"8px 12px",background:"rgba(255,211,61,0.13)",border:"1px solid #FFD93D33",borderRadius:10,color:"#FFD93D",fontSize:12,fontWeight:700},
  langBtn:{background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:9,padding:"6px 12px",color:"#fff",fontSize:12,fontWeight:600},
  langDropdown:{position:"absolute",top:"calc(100% + 4px)",left:0,background:"#1a0533ee",border:"1px solid rgba(255,255,255,0.15)",borderRadius:12,zIndex:100,overflow:"hidden",boxShadow:"0 8px 32px rgba(0,0,0,0.5)",backdropFilter:"blur(16px)"},
  langOption:{display:"block",width:"100%",padding:"8px 16px",color:"#fff",fontSize:12,border:"none",textAlign:"left",cursor:"pointer"},
  speakBtn:{border:"1.5px solid",borderRadius:8,padding:"4px 8px",fontSize:16,cursor:"pointer",transition:"all 0.2s",lineHeight:1},
};
