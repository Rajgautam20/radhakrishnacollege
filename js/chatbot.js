/* Bilingual (English / Hindi) FAQ assistant. No server and no AI service: it matches
   keywords (English, Hindi, and Hinglish typed in English letters) to the answers below
   and replies in the language the visitor used. Edit KB / FAQ text to change what it says. */
(() => {
  const WA = '919977855675';
  const PHONES = ['+91 99778 55675', '+91 99819 64121'];
  const TEL = ['+919977855675', '+919981964121'];
  const COLLEGE = 'Radha Krishna Computer Education College, Khaddi';
  const COLLEGE_HI = 'राधा कृष्णा कंप्यूटर एजुकेशन कॉलेज, खड्डी';

  const wa = (text) => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
  const T = (en, hi) => ({ en, hi });

  // ---- Interface strings ----
  const UI = {
    title: T('College assistant', 'कॉलेज सहायक'),
    sub: T('Ask in English or हिंदी · instant replies', 'हिंदी या English में पूछें · तुरंत जवाब'),
    placeholder: T('Type your question…', 'अपना प्रश्न लिखें…'),
    send: T('Send', 'भेजें'),
    ask: T('Ask us', 'पूछें'),
    close: T('Close chat', 'चैट बंद करें'),
    welcome: T(`Namaste! Welcome to ${COLLEGE}. What would you like to know?`,
      `नमस्ते! ${COLLEGE_HI} में आपका स्वागत है। आप क्या जानना चाहते हैं?`),
    fallback: T('Sorry, I am not sure about that one. The college team can answer it directly.',
      'क्षमा करें, मुझे इसका सही उत्तर नहीं पता। कॉलेज की टीम सीधे आपकी मदद कर सकती है।'),
    fallbackLink: T('Send this question on WhatsApp', 'यह प्रश्न WhatsApp पर भेजें'),
  };

  const WA_LINK = { label: T('Chat on WhatsApp', 'WhatsApp पर बात करें'), href: wa(`Hello, I have a question about ${COLLEGE}.`) };
  const CALL_LINKS = TEL.map((t, i) => ({ label: T(`Call ${PHONES[i]}`, `कॉल करें ${PHONES[i]}`), href: `tel:${t}` }));

  // Chips: [id, label]. The id is also a topic key.
  const CH = {
    courses: T('Courses offered', 'उपलब्ध कोर्स'),
    apply: T('How to apply', 'एडमिशन कैसे लें'),
    fees: T('Fees', 'फीस'),
    contact: T('Contact & location', 'संपर्क और पता'),
    dca: T('DCA', 'DCA'), pgdca: T('PGDCA', 'PGDCA'), bca: T('BCA', 'BCA'), bba: T('BBA', 'BBA'),
    ug: T('B.A. / B.Sc / B.Com', 'B.A. / B.Sc / B.Com'),
    pg: T('M.A. / M.Sc / MSW', 'M.A. / M.Sc / MSW'),
    tally: T('Tally', 'Tally'), yoga: T('PG Yoga', 'PG योगा'),
  };
  const MAIN = ['courses', 'apply', 'fees', 'contact'];
  const COURSE_CHIPS = ['dca', 'pgdca', 'bca', 'bba', 'ug', 'pg', 'tally', 'yoga'];
  const AFTER_COURSE = ['fees', 'apply', 'courses'];

  const askWa = (en, hi) => ({ label: T(en, hi), href: wa(`Hello, ${en.toLowerCase().includes('fees') ? 'please share the fees for the courses' : 'I have a question'} at ${COLLEGE}.`) });

  // Each entry: id, keys (lowercase; English, Hindi, Hinglish), answer {en,hi}, links, chips.
  const KB = [
    {
      id: 'hello',
      keys: ['hello', 'hey', 'namaste', 'namaskar', 'नमस्ते', 'नमस्कार', 'हेलो', 'हैलो', 'good morning', 'good evening', 'pranam', 'प्रणाम'],
      exact: ['hi'],
      answer: T(`Namaste! I'm the virtual assistant of ${COLLEGE}. I can tell you about our courses, admission and how to reach us. You can write in English or Hindi.`,
        `नमस्ते! मैं ${COLLEGE_HI} का वर्चुअल सहायक हूँ। मैं आपको कोर्स, एडमिशन और संपर्क की जानकारी दे सकता हूँ। आप हिंदी या English में लिख सकते हैं।`),
      chips: MAIN,
    },
    {
      id: 'courses',
      keys: ['course', 'courses', 'offered', 'program', 'what do you teach', 'what can i study', 'subjects', 'कोर्स', 'पाठ्यक्रम', 'क्या पढ़', 'कौन कौन', 'कौन-कौन', 'विषय', 'kaun kaun', 'kya padh', 'konse', 'kaunse', 'padhai'],
      answer: T('We offer DCA, PGDCA, BCA, B.A., B.Sc, B.Com, BBA, M.A., M.Sc, MSW, Tally and PG Yoga. Tap one to learn more.',
        'हमारे यहाँ DCA, PGDCA, BCA, B.A., B.Sc, B.Com, BBA, M.A., M.Sc, MSW, Tally और PG योगा के कोर्स उपलब्ध हैं। अधिक जानने के लिए किसी एक पर टैप करें।'),
      links: [{ label: T('See all courses', 'सभी कोर्स देखें'), href: 'courses.html' }],
      chips: COURSE_CHIPS,
    },
    {
      id: 'dca',
      keys: ['dca', 'diploma in computer', 'basic computer', 'beginner', 'computer basics', 'डीसीए', 'डिप्लोमा इन कंप्यूटर', 'बेसिक कंप्यूटर', 'कंप्यूटर सीखना', 'computer seekhna', 'computer sikhna'],
      answer: T('DCA (Diploma in Computer Applications) is a foundation diploma: computer basics, office software, internet use and introductory programming. A good first step if you are new to computers.',
        'DCA (डिप्लोमा इन कंप्यूटर एप्लिकेशन्स) एक बुनियादी डिप्लोमा है: कंप्यूटर की बेसिक जानकारी, ऑफिस सॉफ्टवेयर, इंटरनेट और प्रोग्रामिंग की शुरुआत। कंप्यूटर में नए विद्यार्थियों के लिए यह अच्छी शुरुआत है।'),
      chips: AFTER_COURSE,
    },
    {
      id: 'pgdca',
      keys: ['pgdca', 'post graduate diploma in computer', 'postgraduate diploma in computer', 'पीजीडीसीए', 'पी जी डी सी ए'],
      answer: T('PGDCA (Post Graduate Diploma in Computer Applications) is for graduates who want job-ready computer skills in applications and programming.',
        'PGDCA (पोस्ट ग्रेजुएट डिप्लोमा इन कंप्यूटर एप्लिकेशन्स) उन स्नातकों के लिए है जो एप्लिकेशन और प्रोग्रामिंग में नौकरी के लिए तैयार कंप्यूटर कौशल चाहते हैं।'),
      chips: AFTER_COURSE,
    },
    {
      id: 'bca',
      keys: ['bca', 'bachelor of computer', 'बीसीए', 'बी सी ए', 'बैचलर ऑफ कंप्यूटर'],
      answer: T('BCA (Bachelor of Computer Applications) is an undergraduate degree covering programming, databases, networks and software development.',
        'BCA (बैचलर ऑफ कंप्यूटर एप्लिकेशन्स) एक स्नातक डिग्री है जिसमें प्रोग्रामिंग, डेटाबेस, नेटवर्क और सॉफ्टवेयर डेवलपमेंट पढ़ाया जाता है।'),
      chips: AFTER_COURSE,
    },
    {
      id: 'bba',
      keys: ['bba', 'business administration', 'management', 'बीबीए', 'बिजनेस', 'बिज़नेस', 'प्रबंधन', 'मैनेजमेंट'],
      answer: T('BBA (Bachelor of Business Administration) is an undergraduate degree in business and management.',
        'BBA (बैचलर ऑफ बिजनेस एडमिनिस्ट्रेशन) व्यवसाय और प्रबंधन की स्नातक डिग्री है।'),
      chips: AFTER_COURSE,
    },
    {
      id: 'ug',
      keys: ['ba', 'bsc', 'bcom', 'b a', 'b sc', 'b com', 'bachelor of arts', 'bachelor of science', 'bachelor of commerce', 'arts', 'commerce', 'बी.ए', 'बीए', 'बी ए', 'बीएससी', 'बी.एससी', 'बीकॉम', 'बी.कॉम', 'बी कॉम', 'कला', 'कॉमर्स', 'विज्ञान', 'science'],
      answer: T('We offer bachelor degrees in arts, science and commerce: B.A. (Bachelor of Arts), B.Sc (Bachelor of Science) and B.Com (Bachelor of Commerce). Ask the college office about the available subject combinations.',
        'हमारे यहाँ तीनों धाराओं की स्नातक डिग्री उपलब्ध हैं: B.A. (बैचलर ऑफ आर्ट्स), B.Sc (बैचलर ऑफ साइंस) और B.Com (बैचलर ऑफ कॉमर्स)। उपलब्ध विषयों की जानकारी के लिए कॉलेज कार्यालय से पूछें।'),
      links: [askWa('Ask about subjects on WhatsApp', 'विषयों के बारे में WhatsApp पर पूछें')],
      chips: AFTER_COURSE,
    },
    {
      id: 'pg',
      keys: ['ma', 'msc', 'msw', 'm a', 'm sc', 'master', 'masters', 'post graduation', 'postgraduation', 'social work', 'एम.ए', 'एमए', 'एम ए', 'एमएससी', 'एम.एससी', 'एमएसडब्ल्यू', 'एम एस डब्ल्यू', 'मास्टर', 'स्नातकोत्तर', 'समाज कार्य', 'सोशल वर्क'],
      answer: T('Our postgraduate programmes are M.A. (Master of Arts), M.Sc (Master of Science) and MSW (Master of Social Work).',
        'हमारे स्नातकोत्तर कोर्स हैं: M.A. (मास्टर ऑफ आर्ट्स), M.Sc (मास्टर ऑफ साइंस) और MSW (मास्टर ऑफ सोशल वर्क)।'),
      links: [askWa('Ask about subjects on WhatsApp', 'विषयों के बारे में WhatsApp पर पूछें')],
      chips: AFTER_COURSE,
    },
    {
      id: 'tally',
      keys: ['tally', 'gst', 'accounting', 'accounts', 'टैली', 'टेली', 'जीएसटी', 'अकाउंट', 'लेखा'],
      answer: T('Tally teaches the Tally accounting software for accounting and office roles.',
        'Tally कोर्स में Tally अकाउंटिंग सॉफ्टवेयर सिखाया जाता है, जो अकाउंटिंग और ऑफिस की नौकरियों के लिए उपयोगी है।'),
      chips: AFTER_COURSE,
    },
    {
      id: 'yoga',
      keys: ['yoga', 'pg yoga', 'योग', 'योगा', 'पीजी योगा'],
      answer: T('PG Yoga is a postgraduate course in yoga studies. Contact the college office for eligibility and batch details.',
        'PG योगा योग अध्ययन का स्नातकोत्तर कोर्स है। पात्रता और बैच की जानकारी के लिए कॉलेज कार्यालय से संपर्क करें।'),
      links: [askWa('Ask about PG Yoga on WhatsApp', 'PG योगा के बारे में WhatsApp पर पूछें')],
      chips: AFTER_COURSE,
    },
    {
      id: 'apply',
      keys: ['apply', 'admission', 'join', 'enrol', 'enroll', 'register', 'how to get', 'एडमिशन', 'प्रवेश', 'दाखिला', 'भर्ती', 'प्रवेश कैसे', 'admission kaise', 'admission lena', 'dakhila', 'pravesh'],
      answer: T('Joining is simple: 1) choose a course, 2) talk to us by WhatsApp or visit the college to confirm eligibility, fees and batch timings, 3) submit your documents at the college office to secure your seat.',
        'एडमिशन आसान है: 1) अपना कोर्स चुनें, 2) WhatsApp पर बात करें या कॉलेज आकर पात्रता, फीस और बैच का समय पूछें, 3) कॉलेज कार्यालय में अपने दस्तावेज़ जमा करके सीट पक्की करें।'),
      links: [{ label: T('Open enquiry form', 'पूछताछ फॉर्म खोलें'), href: 'admissions.html#enquire' }, WA_LINK],
      chips: ['fees', 'contact'],
    },
    {
      id: 'fees',
      keys: ['fee', 'fees', 'cost', 'price', 'charge', 'payment', 'scholarship', 'how much', 'फीस', 'शुल्क', 'कितना', 'कितनी', 'खर्च', 'खर्चा', 'छात्रवृत्ति', 'kitna', 'kitni', 'shulk', 'kharcha'],
      answer: T('Fees depend on the course. I do not want to quote a wrong number, so please ask the college office. It takes a minute on WhatsApp.',
        'फीस कोर्स के अनुसार अलग-अलग होती है। मैं गलत जानकारी नहीं देना चाहता, इसलिए कृपया कॉलेज कार्यालय से पूछें। WhatsApp पर बस एक मिनट लगेगा।'),
      links: [{ label: T('Ask about fees on WhatsApp', 'फीस के बारे में WhatsApp पर पूछें'), href: wa(`Hello, please share the fees for the courses at ${COLLEGE}.`) }],
      chips: ['courses', 'apply'],
    },
    {
      id: 'duration',
      keys: ['duration', 'how long', 'months', 'years', 'eligibility', 'eligible', 'qualification', 'requirement', 'document', 'अवधि', 'योग्यता', 'पात्रता', 'कितने साल', 'कितने महीने', 'दस्तावेज', 'दस्तावेज़', 'कागज', 'कागज़', 'saal', 'mahine', 'yogyata', 'documents'],
      answer: T('Duration, eligibility and required documents differ by course, and I would rather you get exact details from the college office.',
        'अवधि, पात्रता और ज़रूरी दस्तावेज़ कोर्स के अनुसार अलग होते हैं। सही जानकारी के लिए कृपया कॉलेज कार्यालय से पूछें।'),
      links: [{ label: T('Ask on WhatsApp', 'WhatsApp पर पूछें'), href: wa(`Hello, please share the duration and eligibility for the courses at ${COLLEGE}.`) }],
      chips: ['courses', 'apply'],
    },
    {
      id: 'timing',
      keys: ['timing', 'timings', 'batch', 'schedule', 'hours', 'office hours', 'समय', 'बैच', 'टाइम', 'कब', 'samay', 'kab'],
      answer: T('Batch timings and office hours are confirmed by the college office. Please message us for the current schedule.',
        'बैच का समय और कार्यालय का समय कॉलेज कार्यालय बताता है। वर्तमान समय-सारणी के लिए कृपया हमें संदेश भेजें।'),
      links: [{ label: T('Ask about timings', 'समय के बारे में पूछें'), href: wa(`Hello, please share the batch timings at ${COLLEGE}.`) }],
      chips: ['contact', 'courses'],
    },
    {
      id: 'contact',
      keys: ['contact', 'phone', 'call', 'number', 'whatsapp', 'mobile', 'reach', 'संपर्क', 'सम्पर्क', 'फोन', 'फ़ोन', 'नंबर', 'नम्बर', 'मोबाइल', 'व्हाट्सएप', 'वाट्सएप', 'sampark', 'mobile number'],
      answer: T(`You can call or WhatsApp us on ${PHONES[0]} or ${PHONES[1]}.`,
        `आप हमें ${PHONES[0]} या ${PHONES[1]} पर कॉल या WhatsApp कर सकते हैं।`),
      links: CALL_LINKS.concat([WA_LINK]),
      chips: ['apply', 'courses'],
    },
    {
      id: 'location',
      keys: ['where', 'location', 'address', 'visit', 'map', 'khaddi', '486661', 'pin code', 'pincode', 'पिन', 'rampur', 'naikin', 'sidhi', 'madhya pradesh', 'directions', 'रामपुर', 'सीधी', 'खड्डी', 'कहाँ', 'कहां', 'पता', 'पते', 'लोकेशन', 'दिशा', 'kahan', 'kahaan', 'pata', 'khadi'],
      answer: T('We are at Khaddi, Rampur Naikin, Sidhi District, Madhya Pradesh – 486661. You are welcome to visit the college, see the campus and speak with the staff. For directions, message us on WhatsApp.',
        'हमारा कॉलेज खड्डी, रामपुर नैकिन, जिला सीधी, मध्य प्रदेश – 486661 में है। आप कॉलेज आकर कैंपस देख सकते हैं और स्टाफ से बात कर सकते हैं। रास्ते की जानकारी के लिए WhatsApp पर संदेश भेजें।'),
      links: [{ label: T('Open in Google Maps', 'Google Maps में खोलें'), href: 'https://maps.app.goo.gl/ALh58YBfQHc5LFyf8' }, { label: T('Ask for directions', 'रास्ता पूछें'), href: wa(`Hello, please share the location of ${COLLEGE}.`) }, { label: T('Contact page', 'संपर्क पृष्ठ'), href: 'contact.html' }],
      chips: ['courses', 'apply'],
    },
    {
      id: 'director',
      keys: ['director', 'principal', 'owner', 'निदेशक', 'डायरेक्टर', 'प्राचार्य', 'संचालक'],
      answer: T("Read our Director's welcome message on the About page.", 'हमारे निदेशक का स्वागत संदेश About पृष्ठ पर पढ़ें।'),
      links: [{ label: T("Director's message", 'निदेशक का संदेश'), href: 'about.html#director' }],
      chips: MAIN,
    },
    {
      id: 'thanks',
      keys: ['thank', 'thanks', 'धन्यवाद', 'शुक्रिया', 'आभार', 'dhanyavad', 'dhanyawad', 'shukriya'],
      answer: T("You're welcome! Anything else I can help with?", 'आपका स्वागत है! क्या मैं और कुछ मदद कर सकता हूँ?'),
      chips: MAIN,
    },
  ];
  const BY_ID = Object.fromEntries(KB.map((e) => [e.id, e]));

  // ---- Language detection ----
  const HINGLISH = ['kya', 'hai', 'hain', 'kitna', 'kitni', 'kaise', 'kahan', 'kahaan', 'mujhe', 'batao', 'bataiye', 'batayein', 'kab', 'chahiye', 'karna', 'karni', 'karein', 'aap', 'hum', 'hamare', 'mein', 'kripya', 'jankari', 'namaste', 'dhanyavad', 'shukriya', 'padhai', 'konsa', 'kaunsa', 'wala', 'kaun', 'mera', 'meri', 'liye'];
  const detect = (s) => {
    if (/[ऀ-ॿ]/.test(s)) return 'hi';
    const words = s.toLowerCase().split(/[^a-z]+/);
    return words.some((w) => HINGLISH.includes(w)) ? 'hi' : null;
  };

  const norm = (s) => ` ${s.toLowerCase().replace(/\./g, '').replace(/[^\p{L}\p{M}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim()} `;
  const find = (input) => {
    const q = norm(input);
    let best = null;
    let score = 0;
    KB.forEach((e) => {
      let s = 0;
      e.keys.forEach((k) => {
        const latinShort = k.length <= 3 && /^[a-z ]+$/.test(k);
        if (q.includes(latinShort ? ` ${k.trim()} ` : k)) s += k.length > 3 ? 2 : 1;
      });
      (e.exact || []).forEach((k) => { if (q.trim() === k) s += 3; });
      if (s > score) { score = s; best = e; }
    });
    return best;
  };

  // ---- UI ----
  let lang = 'en';
  try { lang = localStorage.getItem('cb-lang') === 'hi' ? 'hi' : 'en'; } catch (e) { /* ignore */ }
  const tx = (o) => o[lang];

  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  };

  const root = el('div', 'cb');
  const launcher = el('button', 'cb-launcher');
  launcher.type = 'button';
  launcher.setAttribute('aria-expanded', 'false');
  launcher.setAttribute('aria-controls', 'cb-panel');
  const launcherLabel = el('span');
  launcher.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 3h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm3 5v2h10V8H7zm0 4v2h7v-2H7z"/></svg>';
  launcher.append(launcherLabel);

  const panel = el('section', 'cb-panel');
  panel.id = 'cb-panel';
  panel.hidden = true;
  panel.setAttribute('role', 'dialog');

  const head = el('header', 'cb-head');
  const title = el('div', 'cb-title');
  const titleMain = el('strong');
  const titleSub = el('span');
  title.append(titleMain, titleSub);
  const langBtn = el('button', 'cb-lang');
  langBtn.type = 'button';
  const close = el('button', 'cb-close', '×');
  close.type = 'button';
  head.append(title, langBtn, close);

  const log = el('div', 'cb-log');
  log.setAttribute('role', 'log');
  log.setAttribute('aria-live', 'polite');
  const chipsBox = el('div', 'cb-chips');

  const form = el('form', 'cb-form');
  const input = el('input');
  input.type = 'text';
  input.autocomplete = 'off';
  input.maxLength = 200;
  const send = el('button');
  send.type = 'submit';
  form.append(input, send);

  panel.append(head, log, chipsBox, form);
  root.append(panel, launcher);
  document.body.append(root);

  let lastChips = MAIN;
  const scroll = () => { log.scrollTop = log.scrollHeight; };

  const setChips = (ids) => {
    lastChips = ids;
    chipsBox.replaceChildren();
    ids.forEach((id) => {
      const b = el('button', 'cb-chip', tx(CH[id]));
      b.type = 'button';
      b.addEventListener('click', () => ask(tx(CH[id]), id));
      chipsBox.append(b);
    });
  };

  const applyLang = () => {
    document.documentElement.classList.toggle('cb-hi', lang === 'hi');
    panel.setAttribute('aria-label', tx(UI.title));
    titleMain.textContent = tx(UI.title);
    titleSub.textContent = tx(UI.sub);
    input.placeholder = tx(UI.placeholder);
    input.setAttribute('aria-label', tx(UI.placeholder));
    send.textContent = tx(UI.send);
    launcherLabel.textContent = tx(UI.ask);
    close.setAttribute('aria-label', tx(UI.close));
    langBtn.textContent = lang === 'hi' ? 'EN' : 'हिं';
    langBtn.setAttribute('aria-label', lang === 'hi' ? 'Switch to English' : 'हिंदी में बदलें');
    langBtn.lang = lang === 'hi' ? 'en' : 'hi';
    if (chipsBox.children.length) setChips(lastChips);
    try { localStorage.setItem('cb-lang', lang); } catch (e) { /* ignore */ }
  };

  const addMsg = (who, text, links) => {
    const m = el('div', `cb-msg cb-${who}`);
    const p = el('p', '', text);
    if (/[ऀ-ॿ]/.test(text)) p.lang = 'hi';
    m.append(p);
    if (links && links.length) {
      const row = el('div', 'cb-links');
      links.forEach((l) => {
        const a = el('a', 'cb-link', typeof l.label === 'string' ? l.label : tx(l.label));
        a.href = l.href;
        if (/^https?:/.test(l.href)) { a.target = '_blank'; a.rel = 'noopener'; }
        row.append(a);
      });
      m.append(row);
    }
    log.append(m);
    scroll();
  };

  let busy = false;
  const ask = (text, topicId) => {
    const q = text.trim();
    if (!q || busy) return;
    busy = true;
    const detected = topicId ? null : detect(q);
    if (detected && detected !== lang) { lang = detected; applyLang(); }
    addMsg('user', q);
    chipsBox.replaceChildren();
    const hit = topicId ? BY_ID[topicId] : find(q);
    const typing = el('div', 'cb-msg cb-bot cb-typing');
    typing.setAttribute('aria-hidden', 'true');
    typing.append(el('span'), el('span'), el('span'));
    log.append(typing);
    scroll();
    setTimeout(() => {
      typing.remove();
      if (hit) {
        addMsg('bot', tx(hit.answer), hit.links);
        setChips(hit.chips || MAIN);
      } else {
        addMsg('bot', tx(UI.fallback), [{ label: UI.fallbackLink, href: wa(`Hello, I have a question about ${COLLEGE}: ${q}`) }]);
        setChips(MAIN);
      }
      busy = false;
    }, 450);
  };

  let started = false;
  const open = (state) => {
    panel.hidden = !state;
    launcher.setAttribute('aria-expanded', String(state));
    root.classList.toggle('open', state);
    if (state) {
      if (!started) {
        started = true;
        addMsg('bot', tx(UI.welcome));
        setChips(MAIN);
      }
      input.focus();
    } else {
      launcher.focus();
    }
  };

  langBtn.addEventListener('click', () => { lang = lang === 'hi' ? 'en' : 'hi'; applyLang(); });
  launcher.addEventListener('click', () => open(panel.hidden));
  close.addEventListener('click', () => open(false));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) open(false); });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = input.value;
    input.value = '';
    ask(v);
  });
  applyLang();
})();
