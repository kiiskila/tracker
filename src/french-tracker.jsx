import { useState, useEffect } from "react";

// ─── SESSION QUEUE ────────────────────────────────────────────────────────────
const ALL_SESSIONS = [
  // ════════════════════════════════════════════════════════
  // PHASE 1 — Foundation (A1) · Months 1–3
  // ════════════════════════════════════════════════════════

  // ── MONTH 1, WEEK 1 ──
  {
    id: 1, phase: 1, month: 1, week: 1,
    type: "Pronunciation + Assimil",
    duration: 120,
    title: "The Alphabet & First Assimil Lesson",
    tasks: [
      { text: "Watch TPF Pronunciation Lesson 1: The French alphabet", link: "https://www.theperfectfrench.com/french-pronunciation", done: false },
      { text: "Listen to Assimil Lesson 1 audio 3× before reading", done: false },
      { text: "Read Assimil Lesson 1 with bilingual text", done: false },
      { text: "Shadow the dialogue aloud, mimicking intonation", done: false },
      { text: "Do 10 new Anki cards (French Core 2000 deck)", done: false },
    ],
    note: "First day! Don't overthink it. The goal is just to start and feel the language."
  },
  {
    id: 2, phase: 1, month: 1, week: 1,
    type: "Grammar",
    duration: 120,
    title: "Accents & Simple Sentence Structure",
    tasks: [
      { text: "Watch TPF Pronunciation Lesson 2: Accent aigu (é)", done: false },
      { text: "Watch TPF Pronunciation Lesson 3: Accent grave (è)", done: false },
      { text: "Watch TPF Grammar Lesson 1: Simple sentence structure", done: false },
      { text: "Write 5 original sentences using today's structures", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
    ],
    note: "Write your sentences by hand if possible — it forces you to slow down and process."
  },
  {
    id: 3, phase: 1, month: 1, week: 1,
    type: "Listening + Vocabulary",
    duration: 120,
    title: "Language Transfer Begins",
    tasks: [
      { text: "Language Transfer French: Tracks 1–5 (free audio — langaugetransfer.org)", done: false },
      { text: "Watch TPF Pronunciation Lesson 4: â ê î ô û", done: false },
      { text: "Assimil Lesson 2: listen 3×, read, shadow", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
    ],
    note: "Language Transfer can be done while walking or commuting. No reading needed."
  },
  {
    id: 4, phase: 1, month: 1, week: 1,
    type: "Assimil + Output",
    duration: 120,
    title: "Articles & Assimil Lesson 3",
    tasks: [
      { text: "Watch TPF Grammar Lesson 2: Un, une, des (indefinite articles)", done: false },
      { text: "Watch TPF Grammar Lesson 3: Gender of nouns", done: false },
      { text: "Assimil Lesson 3: listen, read, shadow", done: false },
      { text: "Write 8 sentences using un/une/des correctly", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
    ],
    note: "Gender is the hardest habit to build — always learn 'le chat' not just 'chat'."
  },
  {
    id: 5, phase: 1, month: 1, week: 1,
    type: "Expressions + Reading",
    duration: 120,
    title: "Tréma, Cédille & Plural Nouns",
    tasks: [
      { text: "Watch TPF Pronunciation Lesson 5: Tréma and cédille (ë, ï, ç)", done: false },
      { text: "Watch TPF Grammar Lesson 4: Plural of nouns", done: false },
      { text: "Assimil Lesson 4: listen, read, shadow", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
    ],
    note: null
  },

  // ── MONTH 1, WEEK 2 ──
  {
    id: 6, phase: 1, month: 1, week: 2,
    type: "Pronunciation + Assimil",
    duration: 120,
    title: "Subject Pronouns & Silent Letters",
    tasks: [
      { text: "Watch TPF Pronunciation Lesson 7: Silent letters", done: false },
      { text: "Watch TPF Grammar Lesson 5: Subject pronouns (je, tu, il, elle…)", done: false },
      { text: "Assimil Lesson 5: listen 3×, read, shadow", done: false },
      { text: "Language Transfer: Tracks 6–10", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
    ],
    note: null
  },
  {
    id: 7, phase: 1, month: 1, week: 2,
    type: "Grammar",
    duration: 120,
    title: "Definite Articles & Contractions",
    tasks: [
      { text: "Watch TPF Pronunciation Lesson 8: Contractions / Élision", done: false },
      { text: "Watch TPF Grammar Lesson 6: Le, la, les, l' (definite articles)", done: false },
      { text: "Write 10 sentences mixing un/une/des with le/la/les", done: false },
      { text: "Assimil Lesson 6: listen, read, shadow", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
    ],
    note: null
  },
  {
    id: 8, phase: 1, month: 1, week: 2,
    type: "Listening + Vocabulary",
    duration: 120,
    title: "Liaison & Partitive Articles",
    tasks: [
      { text: "Watch TPF Pronunciation Lesson 9: When to link words (liaison)", done: false },
      { text: "Watch TPF Grammar Lesson 7: Du, de la, des (partitive articles)", done: false },
      { text: "Assimil Lesson 7: listen, read, shadow", done: false },
      { text: "Language Transfer: Tracks 11–15", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
    ],
    note: null
  },
  {
    id: 9, phase: 1, month: 1, week: 2,
    type: "Assimil + Output",
    duration: 120,
    title: "Pronunciation of É & Assimil 8",
    tasks: [
      { text: "Watch TPF Pronunciation Lesson 10: Pronunciation of É", done: false },
      { text: "Assimil Lesson 8: listen, read, shadow", done: false },
      { text: "Review: write the 3 article types with 3 examples each", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
    ],
    note: null
  },
  {
    id: 10, phase: 1, month: 1, week: 2,
    type: "Expressions + Reading",
    duration: 120,
    title: "Week 2 Review",
    tasks: [
      { text: "Review your handwritten notes from sessions 1–9", done: false },
      { text: "Assimil Lessons 9–10: listen, read, shadow (do both back to back)", done: false },
      { text: "Re-read TPF Grammar Lessons 1–7 notes", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
      { text: "Watch any French YouTube video with French subtitles (anything you enjoy)", done: false },
    ],
    note: "You've completed 10 sessions! You now know all article types and subject pronouns."
  },

  // ── MONTH 1, WEEKS 3-4 ──
  {
    id: 11, phase: 1, month: 1, week: 3,
    type: "Pronunciation + Assimil",
    duration: 120,
    title: "Present Tense -er Verbs",
    tasks: [
      { text: "Watch TPF Pronunciation Lesson 11: Pronunciation of È", done: false },
      { text: "Watch TPF Grammar Lesson 8: When to use the present tense", done: false },
      { text: "Watch TPF Grammar Lesson 9: Regular -er verbs (parler, aimer, manger)", done: false },
      { text: "Assimil Lesson 11: listen, read, shadow", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
    ],
    note: "Conjugate parler fully from memory before looking. je parle, tu parles…"
  },
  {
    id: 12, phase: 1, month: 1, week: 3,
    type: "Grammar",
    duration: 120,
    title: "Être & Avoir — The Big Two",
    tasks: [
      { text: "Watch TPF Grammar Lesson 13: Être (to be) — memorize all forms", done: false },
      { text: "Watch TPF Grammar Lesson 14: Avoir (to have) — memorize all forms", done: false },
      { text: "Language Transfer: Tracks 16–20", done: false },
      { text: "Assimil Lesson 12: listen, read, shadow", done: false },
      { text: "Write être and avoir conjugations from memory 3 times each", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
    ],
    note: "These two verbs underpin almost everything. Don't move on until you have them cold."
  },
  {
    id: 13, phase: 1, month: 1, week: 3,
    type: "Listening + Vocabulary",
    duration: 120,
    title: "Aller, Faire & Nasal Vowels",
    tasks: [
      { text: "Watch TPF Pronunciation Lesson 12: On, Om", done: false },
      { text: "Watch TPF Pronunciation Lesson 13: An, Am, En, Em", done: false },
      { text: "Watch TPF Grammar Lesson 15: Aller (to go)", done: false },
      { text: "Watch TPF Grammar Lesson 16: Faire (to do/make)", done: false },
      { text: "Assimil Lesson 13: listen, read, shadow", done: false },
      { text: "Language Transfer: Tracks 21–25", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
    ],
    note: null
  },
  {
    id: 14, phase: 1, month: 1, week: 3,
    type: "Assimil + Output",
    duration: 120,
    title: "Irregular -ir Verbs & Prendre",
    tasks: [
      { text: "Watch TPF Pronunciation Lesson 14: In, Im, Ain, Ein", done: false },
      { text: "Watch TPF Grammar Lesson 11: Regular -ir verbs", done: false },
      { text: "Watch TPF Grammar Lesson 18: Prendre (to take)", done: false },
      { text: "Assimil Lesson 14: listen, read, shadow", done: false },
      { text: "Write a 5-sentence paragraph about your daily routine using aller + faire", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
    ],
    note: null
  },
  {
    id: 15, phase: 1, month: 1, week: 3,
    type: "Expressions + Reading",
    duration: 120,
    title: "-re Verbs & Venir/Tenir",
    tasks: [
      { text: "Watch TPF Grammar Lesson 12: Regular -re verbs", done: false },
      { text: "Watch TPF Grammar Lesson 20: Venir and tenir", done: false },
      { text: "Assimil Lessons 15–16: listen, read, shadow", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
    ],
    note: null
  },
  {
    id: 16, phase: 1, month: 1, week: 4,
    type: "Pronunciation + Assimil",
    duration: 120,
    title: "Modal Verbs: Vouloir, Pouvoir, Devoir",
    tasks: [
      { text: "Watch TPF Grammar Lesson 23: Devoir, vouloir, pouvoir — learn all 3 conjugations", done: false },
      { text: "Language Transfer: Tracks 26–30", done: false },
      { text: "Assimil Lesson 17: listen, read, shadow", done: false },
      { text: "Conjugate all 3 modals from memory + write 2 sentences with each", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
    ],
    note: "Je veux, tu veux, il veut, nous voulons, vous voulez, ils veulent. These are essential for daily communication."
  },
  {
    id: 17, phase: 1, month: 1, week: 4,
    type: "Grammar",
    duration: 120,
    title: "Reflexive Verbs & Negation",
    tasks: [
      { text: "Watch TPF Grammar Lesson 26: Reflexive verbs (se lever, se coucher)", done: false },
      { text: "Watch TPF Grammar Lesson 31: The French negation (ne…pas, ne…jamais, ne…rien)", done: false },
      { text: "Assimil Lesson 18: listen, read, shadow", done: false },
      { text: "Write 8 negative sentences using different negation patterns", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
    ],
    note: null
  },
  {
    id: 18, phase: 1, month: 1, week: 4,
    type: "Listening + Vocabulary",
    duration: 120,
    title: "TPF Vocabulary: People & Emotions",
    tasks: [
      { text: "Watch TPF Vocabulary Lesson 1: French gender and plural", done: false },
      { text: "Watch TPF Vocabulary Lesson 2: Les personnes", done: false },
      { text: "Watch TPF Vocabulary Lesson 3: Les émotions et les caractéristiques", done: false },
      { text: "Assimil Lessons 19–20: listen, read, shadow", done: false },
      { text: "Language Transfer: Tracks 31–35", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
    ],
    note: null
  },
  {
    id: 19, phase: 1, month: 1, week: 4,
    type: "Assimil + Output",
    duration: 120,
    title: "Nasal Vowels & Assimil 21",
    tasks: [
      { text: "Watch TPF Pronunciation Lessons 15–16: vowel sounds review", done: false },
      { text: "Assimil Lesson 21: listen, read, shadow", done: false },
      { text: "Write a 8-sentence text about yourself (use être, avoir, aller, vouloir, and a reflexive verb)", done: false },
      { text: "Language Transfer: Tracks 36–40 (finish the course!)", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
    ],
    note: "You finished Language Transfer! Great milestone — the grammar intuition it built will accelerate everything from here."
  },
  {
    id: 20, phase: 1, month: 1, week: 4,
    type: "Expressions + Reading",
    duration: 120,
    title: "Month 1 Checkpoint",
    tasks: [
      { text: "Conjugate the 8 core verbs from memory: être, avoir, aller, faire, prendre, vouloir, pouvoir, devoir", done: false },
      { text: "Write a 10-sentence paragraph in the present tense about your typical week", done: false },
      { text: "Read Assimil lessons 1–5 aloud without audio — check your pronunciation feels natural", done: false },
      { text: "Anki: check how many cards you have in your 'known' pile (aim for ~200)", done: false },
      { text: "Watch 'Piece of French' on YouTube — any beginner video", done: false },
    ],
    note: "✅ MONTH 1 COMPLETE. You know all article types, the 8 core verbs, present tense, and negation. Solid foundation."
  },

  // ── MONTH 2 ──
  {
    id: 21, phase: 1, month: 2, week: 5,
    type: "Pronunciation + Assimil",
    duration: 120,
    title: "Passé Composé Begins",
    tasks: [
      { text: "Watch TPF Grammar Lesson 32: How to build the passé composé", done: false },
      { text: "Watch TPF Grammar Lesson 33: Passé composé with avoir", done: false },
      { text: "Watch TPF Pronunciation Lessons 17–18: vowel sounds A and E", done: false },
      { text: "Assimil Lesson 22: listen, read, shadow", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
    ],
    note: "The passé composé is one of the two main past tenses. Take your time building it correctly now."
  },
  {
    id: 22, phase: 1, month: 2, week: 5,
    type: "Grammar",
    duration: 120,
    title: "Être Verbs in Passé Composé",
    tasks: [
      { text: "Watch TPF Grammar Lesson 34: Passé composé with être (the 17 house verbs)", done: false },
      { text: "Watch TPF Grammar Lesson 37: Passé composé of reflexive verbs", done: false },
      { text: "Memorize the 17 être verbs (Dr & Mrs Vandertramp mnemonic)", done: false },
      { text: "Assimil Lesson 23: listen, read, shadow", done: false },
      { text: "Write 10 past tense sentences, 5 with avoir, 5 with être", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
    ],
    note: null
  },
  {
    id: 23, phase: 1, month: 2, week: 5,
    type: "Listening + Vocabulary",
    duration: 120,
    title: "Agreement & Negation in Past Tense",
    tasks: [
      { text: "Watch TPF Grammar Lesson 35: Agreement with avoir", done: false },
      { text: "Watch TPF Grammar Lesson 38: Passé composé in negation and questions", done: false },
      { text: "Watch TPF Pronunciation Lessons 19–20: Eu and I sounds", done: false },
      { text: "Assimil Lessons 24–25: listen, read, shadow", done: false },
      { text: "Language input: watch 'Piece of French' on YouTube — 2 beginner videos", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
    ],
    note: null
  },
  {
    id: 24, phase: 1, month: 2, week: 5,
    type: "Assimil + Output",
    duration: 120,
    title: "Vocabulary: Professions & Countries",
    tasks: [
      { text: "Watch TPF Vocabulary Lesson 4: Les métiers (professions)", done: false },
      { text: "Watch TPF Vocabulary Lesson 5: Les pays, nationalités, langues", done: false },
      { text: "Assimil Lesson 26: listen, read, shadow", done: false },
      { text: "Write a past-tense paragraph about something you did last weekend", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
    ],
    note: null
  },
  {
    id: 25, phase: 1, month: 2, week: 5,
    type: "Expressions + Reading",
    duration: 120,
    title: "C'est & Demonstratives",
    tasks: [
      { text: "Watch TPF Grammar Lesson 27: C'est, ce sont, il est", done: false },
      { text: "Watch TPF Grammar Lesson 28: Ce, cet, cette, ces", done: false },
      { text: "Assimil Lessons 27–28: listen, read, shadow", done: false },
      { text: "Watch TPF Pronunciation Lessons 21–22: O and U sounds", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
    ],
    note: null
  },
  {
    id: 26, phase: 1, month: 2, week: 6,
    type: "Pronunciation + Assimil",
    duration: 120,
    title: "Possessives & Numbers",
    tasks: [
      { text: "Watch TPF Grammar Lesson 29: Possessive adjectives (mon, ma, mes, ton…)", done: false },
      { text: "Watch TPF Grammar Lesson 30: Numbers in French", done: false },
      { text: "Practice numbers: langpractice.com/french/numbers/listening — 10 min", done: false },
      { text: "Assimil Lesson 29: listen, read, shadow", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
    ],
    note: "French numbers (soixante-dix, quatre-vingts) are genuinely weird. Daily number drills on langpractice.com pay off fast."
  },
  {
    id: 27, phase: 1, month: 2, week: 6,
    type: "Grammar",
    duration: 120,
    title: "When to Use Passé Composé",
    tasks: [
      { text: "Watch TPF Grammar Lesson 36: When to use the passé composé", done: false },
      { text: "Assimil Lessons 30–31: listen, read, shadow", done: false },
      { text: "Do SchoLingua conjugation trainer: avoir and être in all past forms (scholingua.com)", done: false },
      { text: "Write 6 sentences describing yesterday's events", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
    ],
    note: null
  },
  {
    id: 28, phase: 1, month: 2, week: 6,
    type: "Listening + Vocabulary",
    duration: 120,
    title: "Pronunciation: Oi & Ui sounds",
    tasks: [
      { text: "Watch TPF Pronunciation Lessons 23–24: Oi and Ui sounds", done: false },
      { text: "Assimil Lessons 32–33: listen, read, shadow", done: false },
      { text: "Language input: 30 min 'Piece of French' YouTube (aim for 3–4 short videos)", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
    ],
    note: null
  },
  {
    id: 29, phase: 1, month: 2, week: 7,
    type: "Assimil + Output",
    duration: 120,
    title: "Il/Ille sounds & Assimil 34–35",
    tasks: [
      { text: "Watch TPF Pronunciation Lessons 25–26: Il/Ille, Ail/Aille sounds", done: false },
      { text: "Assimil Lessons 34–35: listen, read, shadow", done: false },
      { text: "SchoLingua: aller, faire, prendre in present + passé composé", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
    ],
    note: null
  },
  {
    id: 30, phase: 1, month: 2, week: 7,
    type: "Expressions + Reading",
    duration: 120,
    title: "Month 2 Checkpoint",
    tasks: [
      { text: "Write a 12-sentence paragraph telling a story in past tense — mix passé composé and present", done: false },
      { text: "Conjugate all 8 core verbs in passé composé from memory", done: false },
      { text: "Assimil Lessons 36–38: listen, read, shadow", done: false },
      { text: "Anki: aim for ~400 cards known in your pile", done: false },
    ],
    note: "✅ MONTH 2 COMPLETE. You can talk about the past. You're approaching A2 territory."
  },

  // ── MONTH 3 ──
  {
    id: 31, phase: 1, month: 3, week: 8,
    type: "Pronunciation + Assimil",
    duration: 120,
    title: "Imparfait Introduction",
    tasks: [
      { text: "Watch TPF Grammar Lesson 49: How to build the imparfait", done: false },
      { text: "Watch TPF Grammar Lesson 50: When to use the imparfait", done: false },
      { text: "Watch TPF Pronunciation Lessons 27–28: Eil/Eille and Ouille", done: false },
      { text: "Assimil Lesson 39: listen, read, shadow", done: false },
      { text: "Conjugate parler and finir in imparfait from memory", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
    ],
    note: "The imparfait is for descriptions and habits in the past. It's simpler to form than passé composé."
  },
  {
    id: 32, phase: 1, month: 3, week: 8,
    type: "Grammar",
    duration: 120,
    title: "Prepositions Intro + Assimil 40",
    tasks: [
      { text: "Watch TPF Grammar Lesson 40: The preposition à (au, aux, à la, à l')", done: false },
      { text: "Watch TPF Grammar Lesson 41: The preposition de (du, des, de la)", done: false },
      { text: "Assimil Lesson 40: listen, read, shadow", done: false },
      { text: "Write 8 sentences using à and de correctly with different nouns", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
    ],
    note: null
  },
  {
    id: 33, phase: 1, month: 3, week: 8,
    type: "Listening + Vocabulary",
    duration: 120,
    title: "ASSIMIL WAVE 2 BEGINS + Pronunciation Consonants",
    tasks: [
      { text: "Watch TPF Pronunciation Lessons 29–30: consonants B and C", done: false },
      { text: "Assimil Lesson 41 (Wave 1): listen, read, shadow", done: false },
      { text: "⭐ WAVE 2 START — Assimil Lesson 1 (active): cover French, translate English→French, check, do exercises", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
    ],
    note: "⭐ WAVE 2 HAS BEGUN. From now on, every session you do TWO Assimil lessons — the new one (Wave 1) and the one from ~40 lessons ago (Wave 2 active recall). This is where Assimil really earns its reputation."
  },
  {
    id: 34, phase: 1, month: 3, week: 9,
    type: "Assimil + Output",
    duration: 120,
    title: "Countries with Prepositions + Assimil 42",
    tasks: [
      { text: "Watch TPF Grammar Lesson 43: Aller + prepositions (à Paris, en France, au Canada…)", done: false },
      { text: "Assimil Lesson 42 (Wave 1) + Lesson 2 (Wave 2 active)", done: false },
      { text: "Write 6 sentences: where you've been, where you want to go", done: false },
      { text: "SchoLingua: vouloir, pouvoir, devoir in present and passé composé", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
    ],
    note: null
  },
  {
    id: 35, phase: 1, month: 3, week: 9,
    type: "Expressions + Reading",
    duration: 120,
    title: "Prepositions of Place & Time",
    tasks: [
      { text: "Watch TPF Grammar Lesson 44: Prepositions of place (devant, derrière, à côté de…)", done: false },
      { text: "Watch TPF Grammar Lesson 45: Prepositions of time (depuis, pendant, il y a, dans)", done: false },
      { text: "Assimil Lesson 43 (Wave 1) + Lesson 3 (Wave 2 active)", done: false },
      { text: "Watch TPF Pronunciation Lessons 31–32: Ch and D sounds", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
    ],
    note: null
  },
  {
    id: 36, phase: 1, month: 3, week: 9,
    type: "Pronunciation + Assimil",
    duration: 120,
    title: "Pour, Par & No-Article Rules",
    tasks: [
      { text: "Watch TPF Grammar Lesson 46: Pour and par", done: false },
      { text: "Watch TPF Grammar Lesson 47: When NOT to use an article", done: false },
      { text: "Assimil Lesson 44 (Wave 1) + Lesson 4 (Wave 2 active)", done: false },
      { text: "Write 3 sentences for each preposition: à, de, en, pour, par, dans", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
    ],
    note: null
  },
  {
    id: 37, phase: 1, month: 3, week: 10,
    type: "Grammar",
    duration: 120,
    title: "Same Verb, Different Prepositions",
    tasks: [
      { text: "Watch TPF Grammar Lesson 48: Same verb, different prepositions", done: false },
      { text: "Watch TPF Pronunciation Lessons 33–35: F, G, and J sounds", done: false },
      { text: "Assimil Lesson 45 (Wave 1) + Lesson 5 (Wave 2 active)", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
    ],
    note: null
  },
  {
    id: 38, phase: 1, month: 3, week: 10,
    type: "Listening + Vocabulary",
    duration: 120,
    title: "Colours, Body & Clothes Vocabulary",
    tasks: [
      { text: "Watch TPF Vocabulary Lesson 6: Les couleurs", done: false },
      { text: "Watch TPF Vocabulary Lesson 7: Le visage et l'hygiène", done: false },
      { text: "Watch TPF Vocabulary Lesson 8: Le corps", done: false },
      { text: "Assimil Lesson 46 (Wave 1) + Lesson 6 (Wave 2 active)", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
    ],
    note: null
  },
  {
    id: 39, phase: 1, month: 3, week: 10,
    type: "Assimil + Output",
    duration: 120,
    title: "Vocabulary: Clothes & Sports",
    tasks: [
      { text: "Watch TPF Vocabulary Lesson 9: Les vêtements", done: false },
      { text: "Watch TPF Vocabulary Lesson 10: Les sports", done: false },
      { text: "Assimil Lesson 47 (Wave 1) + Lesson 7 (Wave 2 active)", done: false },
      { text: "Write a short paragraph describing what you're wearing and what sports you like", done: false },
      { text: "Anki reviews + 10 new cards", done: false },
    ],
    note: null
  },
  {
    id: 40, phase: 1, month: 3, week: 11,
    type: "Expressions + Reading",
    duration: 120,
    title: "Phase 1 Final Checkpoint",
    tasks: [
      { text: "Conjugate the 8 core verbs in: present, passé composé, and imparfait — from memory", done: false },
      { text: "Write a 15-sentence story about a trip you took — use both past tenses", done: false },
      { text: "Read Assimil lessons 1–10 aloud (Wave 2 reinforcement — no audio, just your voice)", done: false },
      { text: "Assimil Lesson 48 (Wave 1) + Lesson 8 (Wave 2 active)", done: false },
      { text: "Anki: check your known pile — aim for ~500 cards", done: false },
      { text: "Optional: try reading the first page of Le Petit Nicolas in French", done: false },
    ],
    note: "🎉 PHASE 1 COMPLETE — A1. You have a solid foundation. You can form sentences in present and past tense, handle articles and prepositions, and read basic French. Phase 2 begins."
  },

  // ════════════════════════════════════════════════════════
  // PHASE 2 — Elementary (A2) · Months 4–6
  // ════════════════════════════════════════════════════════

  {
    id: 41, phase: 2, month: 4, week: 12,
    type: "Pronunciation + Assimil",
    duration: 120,
    title: "Questions: Est-ce que & Inversion",
    tasks: [
      { text: "Watch TPF Grammar Lesson 53: Yes/no questions (est-ce que, inversion)", done: false },
      { text: "Watch TPF Grammar Lesson 54: Question words (quand, comment, pourquoi, où, combien)", done: false },
      { text: "Watch TPF Pronunciation Lessons 36–37: H muet vs aspiré, and K/Q sounds", done: false },
      { text: "Assimil Lesson 49 (Wave 1) + Lesson 9 (Wave 2 active)", done: false },
      { text: "Anki reviews + 15 new cards (increase from 10)", done: false },
    ],
    note: "Increasing to 15 new cards/day from here. Your foundation is solid enough to absorb more vocabulary."
  },
  {
    id: 42, phase: 2, month: 4, week: 12,
    type: "Grammar",
    duration: 120,
    title: "Question Words: Qui, Que, Quel",
    tasks: [
      { text: "Watch TPF Grammar Lesson 55: Qui, que, quoi", done: false },
      { text: "Watch TPF Grammar Lesson 56: Quel and lequel", done: false },
      { text: "Start RFI Journal en français facile: listen to today's episode (rfi.fr — free, 10 min)", done: false },
      { text: "Assimil Lesson 50 (Wave 1) + Lesson 10 (Wave 2 active)", done: false },
      { text: "Write 10 questions using different question structures", done: false },
      { text: "Anki reviews + 15 new cards", done: false },
    ],
    note: "⭐ Start RFI Journal en français facile today. Every single day from now on — even if you understand only 40%. 10 minutes. Non-negotiable."
  },
  {
    id: 43, phase: 2, month: 4, week: 12,
    type: "Listening + Vocabulary",
    duration: 120,
    title: "Il y a & Adjectives",
    tasks: [
      { text: "Watch TPF Grammar Lesson 39: Il y a (there is / there are)", done: false },
      { text: "Watch TPF Grammar Lesson 57: French adjectives (gender and number agreement)", done: false },
      { text: "Watch TPF Grammar Lesson 58: Where to place adjectives", done: false },
      { text: "RFI Journal en français facile: today's episode", done: false },
      { text: "Assimil Lesson 51 (Wave 1) + Lesson 11 (Wave 2 active)", done: false },
      { text: "Anki reviews + 15 new cards", done: false },
    ],
    note: null
  },
  {
    id: 44, phase: 2, month: 4, week: 13,
    type: "Assimil + Output",
    duration: 120,
    title: "Comparative & Superlative",
    tasks: [
      { text: "Watch TPF Grammar Lesson 59: Comparative and superlative (plus grand que, le plus grand)", done: false },
      { text: "Watch TPF Pronunciation Lessons 38–39: L and M sounds", done: false },
      { text: "RFI Journal en français facile: today's episode", done: false },
      { text: "Assimil Lesson 52 (Wave 1) + Lesson 12 (Wave 2 active)", done: false },
      { text: "Write 8 comparative sentences (cities, foods, activities you know)", done: false },
      { text: "Anki reviews + 15 new cards", done: false },
    ],
    note: null
  },
  {
    id: 45, phase: 2, month: 4, week: 13,
    type: "Expressions + Reading",
    duration: 120,
    title: "Future Tense + Vocabulary: Animals & Nature",
    tasks: [
      { text: "Watch TPF Grammar Lesson 61: The future tense (futur simple)", done: false },
      { text: "Watch TPF Grammar Lesson 62: The near future (aller + infinitive)", done: false },
      { text: "Watch TPF Vocabulary Lesson 11: Les animaux", done: false },
      { text: "Watch TPF Vocabulary Lesson 12: La nature", done: false },
      { text: "RFI Journal en français facile: today's episode", done: false },
      { text: "Assimil Lesson 53 (Wave 1) + Lesson 13 (Wave 2 active)", done: false },
      { text: "Anki reviews + 15 new cards", done: false },
    ],
    note: null
  },
  {
    id: 46, phase: 2, month: 4, week: 13,
    type: "Pronunciation + Assimil",
    duration: 120,
    title: "Switch Phone to French Today",
    tasks: [
      { text: "⭐ Set your phone language to French right now", done: false },
      { text: "Watch TPF Pronunciation Lessons 40–41: N, Gn sounds", done: false },
      { text: "Watch TPF Grammar Lesson 60: Indefinite adjectives (chaque, plusieurs, quelques)", done: false },
      { text: "Assimil Lesson 54 (Wave 1) + Lesson 14 (Wave 2 active)", done: false },
      { text: "RFI Journal en français facile: today's episode", done: false },
      { text: "Anki reviews + 15 new cards", done: false },
    ],
    note: "Switching your phone to French is a free immersion hack. It's disorienting for a week then invisible — while training your reading brain every day."
  },
  {
    id: 47, phase: 2, month: 5, week: 14,
    type: "Grammar",
    duration: 120,
    title: "Imparfait vs Passé Composé — The Key Distinction",
    tasks: [
      { text: "Watch TPF Grammar Lesson 51: Imparfait vs passé composé (spend extra time here)", done: false },
      { text: "Watch TPF Grammar Lesson 52: The recent past (venir de + infinitive)", done: false },
      { text: "RFI Journal en français facile: today's episode", done: false },
      { text: "Assimil Lesson 55 (Wave 1) + Lesson 15 (Wave 2 active)", done: false },
      { text: "Write a story in past tense — at least 15 sentences — mixing both tenses deliberately", done: false },
      { text: "Anki reviews + 15 new cards", done: false },
    ],
    note: "This lesson is the single most important distinction in French past tenses. Re-watch it if needed. Passé composé = completed event. Imparfait = background/description/habit."
  },
  {
    id: 48, phase: 2, month: 5, week: 14,
    type: "Listening + Vocabulary",
    duration: 120,
    title: "Direct Object Pronouns",
    tasks: [
      { text: "Watch TPF Grammar Lesson 63: Direct object pronouns (me, te, le, la, nous, vous, les)", done: false },
      { text: "Watch TPF Pronunciation Lessons 42–43: P and R sounds", done: false },
      { text: "RFI Journal en français facile: today's episode", done: false },
      { text: "Assimil Lesson 56 (Wave 1) + Lesson 16 (Wave 2 active)", done: false },
      { text: "TV5Monde: do one 'débutant' reading exercise (apprendre.tv5monde.com)", done: false },
      { text: "Anki reviews + 15 new cards", done: false },
    ],
    note: "Start TV5Monde reading exercises today. Free, graded by level, new exercises constantly."
  },
  {
    id: 49, phase: 2, month: 5, week: 14,
    type: "Assimil + Output",
    duration: 120,
    title: "Indirect Object Pronouns",
    tasks: [
      { text: "Watch TPF Grammar Lesson 64: Indirect object pronouns (me, te, lui, nous, vous, leur)", done: false },
      { text: "Watch TPF Grammar Lesson 65: Y and en", done: false },
      { text: "RFI Journal en français facile: today's episode", done: false },
      { text: "Assimil Lesson 57 (Wave 1) + Lesson 17 (Wave 2 active)", done: false },
      { text: "Write 10 sentences replacing the direct object with a pronoun", done: false },
      { text: "Anki reviews + 15 new cards", done: false },
    ],
    note: null
  },
  {
    id: 50, phase: 2, month: 5, week: 15,
    type: "Expressions + Reading",
    duration: 120,
    title: "Double Object Pronouns & Conditional",
    tasks: [
      { text: "Watch TPF Grammar Lesson 66: Using pronouns together (double object pronouns)", done: false },
      { text: "Watch TPF Grammar Lesson 67: The conditional (je voudrais, j'aimerais)", done: false },
      { text: "RFI Journal en français facile: today's episode", done: false },
      { text: "Assimil Lesson 58 (Wave 1) + Lesson 18 (Wave 2 active)", done: false },
      { text: "Start 'Français Authentique' on YouTube — watch 2 videos with French subtitles", done: false },
      { text: "Anki reviews + 15 new cards", done: false },
    ],
    note: null
  },
  {
    id: 51, phase: 2, month: 5, week: 15,
    type: "Pronunciation + Assimil",
    duration: 120,
    title: "The Imperative",
    tasks: [
      { text: "Watch TPF Grammar Lesson 68: The imperative (commands)", done: false },
      { text: "Watch TPF Grammar Lesson 69: The imperative with pronouns", done: false },
      { text: "Watch TPF Pronunciation Lessons 44–45: S/Z and T sounds", done: false },
      { text: "Assimil Lesson 59 (Wave 1) + Lesson 19 (Wave 2 active)", done: false },
      { text: "RFI Journal en français facile: today's episode", done: false },
      { text: "Anki reviews + 15 new cards", done: false },
    ],
    note: null
  },
  {
    id: 52, phase: 2, month: 5, week: 16,
    type: "Grammar",
    duration: 120,
    title: "Vocabulary: Holidays, Transport & Hobbies",
    tasks: [
      { text: "Watch TPF Vocabulary Lesson 13: Les vacances et les transports", done: false },
      { text: "Watch TPF Vocabulary Lesson 16: Les passe-temps", done: false },
      { text: "Watch TPF Pronunciation Lessons 46–48: V, W, X sounds", done: false },
      { text: "Assimil Lesson 60 (Wave 1) + Lesson 20 (Wave 2 active)", done: false },
      { text: "RFI Journal en français facile: today's episode", done: false },
      { text: "Anki reviews + 15 new cards", done: false },
    ],
    note: null
  },
  {
    id: 53, phase: 2, month: 6, week: 17,
    type: "Listening + Vocabulary",
    duration: 120,
    title: "Expressions with Avoir & Être",
    tasks: [
      { text: "Watch TPF Expressions Lesson 1: Expressions with avoir", done: false },
      { text: "Watch TPF Expressions Lesson 2: Expressions with être", done: false },
      { text: "Watch TPF Expressions Lesson 3: Expressions with aller", done: false },
      { text: "Assimil Lesson 61 (Wave 1) + Lesson 21 (Wave 2 active)", done: false },
      { text: "RFI Journal en français facile: today's episode", done: false },
      { text: "Weekly writing: write a 8-sentence paragraph in French. Paste into Claude for correction.", done: false },
      { text: "Anki reviews + 15 new cards", done: false },
    ],
    note: "⭐ START WEEKLY WRITING PRACTICE. Every week from now: write French, submit to Claude for correction, log errors in a personal error document."
  },
  {
    id: 54, phase: 2, month: 6, week: 17,
    type: "Assimil + Output",
    duration: 120,
    title: "Expressions with Faire & City Vocabulary",
    tasks: [
      { text: "Watch TPF Expressions Lesson 4: Expressions with faire", done: false },
      { text: "Watch TPF Vocabulary Lesson 14: En ville (in the city)", done: false },
      { text: "Watch TPF Pronunciation Lessons 49–51: unusual letter combinations and stress", done: false },
      { text: "Assimil Lesson 62 (Wave 1) + Lesson 22 (Wave 2 active)", done: false },
      { text: "RFI Journal en français facile: today's episode", done: false },
      { text: "Anki reviews + 15 new cards", done: false },
    ],
    note: null
  },
  {
    id: 55, phase: 2, month: 6, week: 18,
    type: "Expressions + Reading",
    duration: 120,
    title: "Weather, Technology & Pronunciation Completion",
    tasks: [
      { text: "Watch TPF Vocabulary Lesson 15: Le temps (weather)", done: false },
      { text: "Watch TPF Vocabulary Lesson 17: La technologie", done: false },
      { text: "Watch TPF Pronunciation Lessons 52–55: reading practice — COMPLETE PRONUNCIATION COURSE ✅", done: false },
      { text: "Assimil Lesson 63 (Wave 1) + Lesson 23 (Wave 2 active)", done: false },
      { text: "RFI Journal en français facile: today's episode", done: false },
      { text: "Weekly writing: write a paragraph using conditional tense (je voudrais…)", done: false },
      { text: "Anki reviews + 15 new cards", done: false },
    ],
    note: "🎉 TPF PRONUNCIATION COURSE COMPLETE (55 lessons). Your ear and mouth are trained. From here it's input and practice."
  },
  {
    id: 56, phase: 2, month: 6, week: 18,
    type: "Pronunciation + Assimil",
    duration: 120,
    title: "Coffee Break French + Assimil 64",
    tasks: [
      { text: "Start 'Coffee Break French' podcast — Season 3, Episode 1", done: false },
      { text: "Assimil Lesson 64 (Wave 1) + Lesson 24 (Wave 2 active)", done: false },
      { text: "RFI Journal en français facile: today's episode", done: false },
      { text: "Watch any French YouTube video with FRENCH subtitles (not English)", done: false },
      { text: "Anki reviews + 15 new cards", done: false },
    ],
    note: null
  },
  {
    id: 57, phase: 2, month: 6, week: 19,
    type: "Grammar",
    duration: 120,
    title: "Phase 2 Final Checkpoint",
    tasks: [
      { text: "Write a 20-sentence story using: passé composé, imparfait, conditional, questions, object pronouns — all in one text", done: false },
      { text: "Assimil Lesson 65 (Wave 1) + Lesson 25 (Wave 2 active)", done: false },
      { text: "TV5Monde: complete one 'intermédiaire' reading exercise", done: false },
      { text: "Check Anki known cards — aim for ~800–1000", done: false },
      { text: "Can you understand 60% of today's RFI episode without re-listening? If yes, you're on track.", done: false },
    ],
    note: "🎉 PHASE 2 COMPLETE — A2. You can use all major grammar structures, write coherent paragraphs, and understand over half of slow native French. Phase 3 begins."
  },

  // ════════════════════════════════════════════════════════
  // PHASE 3 — Intermediate (B1) · Months 7–10
  // ════════════════════════════════════════════════════════

  {
    id: 58, phase: 3, month: 7, week: 20,
    type: "Grammar",
    duration: 120,
    title: "Emphatic & Possessive Pronouns",
    tasks: [
      { text: "Watch TPF Grammar Lesson 70: Emphatic pronouns (moi, toi, lui, elle…)", done: false },
      { text: "Watch TPF Grammar Lesson 71: Possessive pronouns (le mien, la tienne, les leurs)", done: false },
      { text: "Assimil Lesson 66 (Wave 1) + Lesson 26 (Wave 2 active)", done: false },
      { text: "RFI Journal en français facile: today's episode", done: false },
      { text: "Start InnerFrench podcast (innerfrench.com) — Episode 1", done: false },
      { text: "Anki reviews + 15 new cards", done: false },
    ],
    note: "⭐ Start InnerFrench today. Hugo's French is clear but natural — perfect B1 listening. Subscribe and listen at least 3× per week."
  },
  {
    id: 59, phase: 3, month: 7, week: 20,
    type: "Listening + Vocabulary",
    duration: 120,
    title: "Demonstrative & Indefinite Pronouns",
    tasks: [
      { text: "Watch TPF Grammar Lesson 72: Demonstrative pronouns (celui, celle, ceux, celles)", done: false },
      { text: "Watch TPF Grammar Lesson 73: Indefinite demonstrative pronouns (celui-ci, celui-là)", done: false },
      { text: "Watch TPF Grammar Lesson 74: Indefinite pronouns (quelqu'un, quelque chose, personne, rien)", done: false },
      { text: "Assimil Lesson 67 (Wave 1) + Lesson 27 (Wave 2 active)", done: false },
      { text: "InnerFrench Episode 2 (or continue Ep 1 if not done)", done: false },
      { text: "Weekly writing: write about your ideal vacation — 10 sentences", done: false },
      { text: "Anki reviews + 15 new cards", done: false },
    ],
    note: null
  },
  {
    id: 60, phase: 3, month: 7, week: 21,
    type: "Assimil + Output",
    duration: 120,
    title: "Relative Pronouns: qui, que, dont, où",
    tasks: [
      { text: "Watch TPF Grammar Lesson 75: Relative pronouns (qui, que, dont, où)", done: false },
      { text: "Watch TPF Grammar Lesson 76: Ce qui, ce que, ce dont", done: false },
      { text: "Assimil Lesson 68 (Wave 1) + Lesson 28 (Wave 2 active)", done: false },
      { text: "RFI Journal en français facile: today's episode", done: false },
      { text: "Write 10 sentences using qui, que, dont, où — 2–3 each", done: false },
      { text: "Anki reviews + 15 new cards", done: false },
    ],
    note: "Relative pronouns are what separates robotic French from flowing French. Take your time."
  },
  {
    id: 61, phase: 3, month: 7, week: 21,
    type: "Expressions + Reading",
    duration: 120,
    title: "Infinitive Verb Chains (3 lessons)",
    tasks: [
      { text: "Watch TPF Grammar Lesson 77: Infinitive verbs Part 1 (verbs taking infinitive directly)", done: false },
      { text: "Watch TPF Grammar Lesson 78: Infinitive verbs Part 2 (verbs + à + infinitive)", done: false },
      { text: "Watch TPF Grammar Lesson 79: Infinitive verbs Part 3 (verbs + de + infinitive)", done: false },
      { text: "Assimil Lesson 69 (Wave 1) + Lesson 29 (Wave 2 active)", done: false },
      { text: "InnerFrench: Episode 3", done: false },
      { text: "Anki reviews + 15 new cards", done: false },
    ],
    note: "Make a cheat sheet of the most common verbs in each category. You'll refer to it constantly."
  },
  {
    id: 62, phase: 3, month: 7, week: 22,
    type: "Pronunciation + Assimil",
    duration: 120,
    title: "Expressions: Mettre, Prendre & More",
    tasks: [
      { text: "Watch TPF Expressions Lesson 5: Expressions with mettre", done: false },
      { text: "Watch TPF Expressions Lesson 6: Expressions with prendre", done: false },
      { text: "Watch TPF Expressions Lesson 7: L'amour", done: false },
      { text: "Watch TPF Vocabulary Lesson 18: La maison", done: false },
      { text: "Assimil Lesson 70 (Wave 1) + Lesson 30 (Wave 2 active)", done: false },
      { text: "RFI Journal en français facile: today's episode", done: false },
      { text: "Anki reviews + 15 new cards", done: false },
    ],
    note: null
  },
  {
    id: 63, phase: 3, month: 8, week: 23,
    type: "Grammar",
    duration: 120,
    title: "Adverbs & The Subjunctive Begins",
    tasks: [
      { text: "Watch TPF Grammar Lesson 80: Adverbs (formation and placement)", done: false },
      { text: "Watch TPF Grammar Lesson 81: Where to place adverbs", done: false },
      { text: "Watch TPF Grammar Lesson 85: How to build the subjunctive", done: false },
      { text: "Assimil Lesson 71 (Wave 1) + Lesson 31 (Wave 2 active)", done: false },
      { text: "RFI Journal en français facile: today's episode", done: false },
      { text: "InnerFrench: Episode 4", done: false },
      { text: "Anki reviews + 15 new cards", done: false },
    ],
    note: "The subjunctive is the wall that separates B1 from A2. Once you crack it, everything gets easier."
  },
  {
    id: 64, phase: 3, month: 8, week: 23,
    type: "Listening + Vocabulary",
    duration: 120,
    title: "When to Use the Subjunctive",
    tasks: [
      { text: "Watch TPF Grammar Lesson 86: When to use the subjunctive (triggers list)", done: false },
      { text: "Watch TPF Grammar Lesson 82: Bon vs bien", done: false },
      { text: "Watch TPF Grammar Lesson 83: Encore and toujours", done: false },
      { text: "Assimil Lesson 72 (Wave 1) + Lesson 32 (Wave 2 active)", done: false },
      { text: "Write 8 sentences using different subjunctive triggers", done: false },
      { text: "Weekly writing: describe something you want someone else to do (use que + subjunctive)", done: false },
      { text: "Anki reviews + 15 new cards", done: false },
    ],
    note: "Key triggers: vouloir que, falloir que, bien que, pour que, avant que, à moins que, bien que, afin que."
  },
  {
    id: 65, phase: 3, month: 8, week: 24,
    type: "Assimil + Output",
    duration: 120,
    title: "Plus-que-parfait & Futur Antérieur",
    tasks: [
      { text: "Watch TPF Grammar Lesson 87: Plus-que-parfait (pluperfect)", done: false },
      { text: "Watch TPF Grammar Lesson 88: Futur antérieur (future perfect)", done: false },
      { text: "Watch TPF Grammar Lesson 84: Conjunctions (mais, ou, et, donc, or, ni, car)", done: false },
      { text: "Assimil Lesson 73 (Wave 1) + Lesson 33 (Wave 2 active)", done: false },
      { text: "RFI Journal en français facile: today's episode", done: false },
      { text: "InnerFrench: Episode 5", done: false },
      { text: "Anki reviews + 15 new cards", done: false },
    ],
    note: null
  },
  {
    id: 66, phase: 3, month: 8, week: 24,
    type: "Expressions + Reading",
    duration: 120,
    title: "Conditionnel Passé & Passive Voice",
    tasks: [
      { text: "Watch TPF Grammar Lesson 89: Conditionnel passé (conditional perfect)", done: false },
      { text: "Watch TPF Grammar Lesson 90: Participe passé and gérondif (en faisant)", done: false },
      { text: "Watch TPF Grammar Lesson 91: The passive voice — COMPLETE GRAMMAR COURSE ✅", done: false },
      { text: "Assimil Lesson 74 (Wave 1) + Lesson 34 (Wave 2 active)", done: false },
      { text: "Weekly writing: write a 'what would have happened if…' scenario using conditionnel passé", done: false },
      { text: "Anki reviews + 15 new cards", done: false },
    ],
    note: "🎉 TPF GRAMMAR COURSE COMPLETE (91 lessons). Every major French grammar structure is now in your toolkit."
  },
  {
    id: 67, phase: 3, month: 8, week: 25,
    type: "Pronunciation + Assimil",
    duration: 120,
    title: "Expressions: Manger, Boire & More",
    tasks: [
      { text: "Watch TPF Expressions Lesson 8: Manger et boire", done: false },
      { text: "Watch TPF Expressions Lessons 9–11: Weather, time, money expressions", done: false },
      { text: "Watch TPF Vocabulary Lesson 19: La cuisine", done: false },
      { text: "Assimil Lesson 75 (Wave 1) + Lesson 35 (Wave 2 active)", done: false },
      { text: "RFI Journal en français facile: today's episode", done: false },
      { text: "InnerFrench: Episode 6", done: false },
      { text: "Anki reviews + 15 new cards", done: false },
    ],
    note: null
  },
  {
    id: 68, phase: 3, month: 9, week: 26,
    type: "Grammar",
    duration: 120,
    title: "Assimil Lessons 76–80 + Finish Expressions",
    tasks: [
      { text: "Watch TPF Expressions Lessons 12–15: sleep, work, health, food expressions", done: false },
      { text: "Assimil Lessons 76–77 (Wave 1) + Lessons 36–37 (Wave 2 active)", done: false },
      { text: "RFI Journal en français facile: today's episode", done: false },
      { text: "Try watching Tou.tv or Radio-Canada — pick a short clip with French subtitles", done: false },
      { text: "Weekly writing: write a formal email in French requesting information. Correct with Claude.", done: false },
      { text: "Anki reviews + 15 new cards", done: false },
    ],
    note: "Start exposing yourself to Québécois French on Radio-Canada — the accent is what you'll hear in your PSC oral exam environment."
  },
  {
    id: 69, phase: 3, month: 9, week: 27,
    type: "Listening + Vocabulary",
    duration: 120,
    title: "Vocabulary: Time, Prefixes & Suffixes",
    tasks: [
      { text: "Watch TPF Vocabulary Lesson 20: Le temps et les mesures", done: false },
      { text: "Watch TPF Vocabulary Lesson 21: Les préfixes", done: false },
      { text: "Watch TPF Vocabulary Lesson 22: Les suffixes", done: false },
      { text: "Assimil Lessons 78–79 (Wave 1) + Lessons 38–39 (Wave 2 active)", done: false },
      { text: "InnerFrench: Episode 7", done: false },
      { text: "RFI Journal en français facile: today's episode", done: false },
      { text: "Anki reviews + 15 new cards", done: false },
    ],
    note: null
  },
  {
    id: 70, phase: 3, month: 9, week: 27,
    type: "Assimil + Output",
    duration: 120,
    title: "ASSIMIL WAVE 1 COMPLETE — Lessons 80–91",
    tasks: [
      { text: "Assimil Lessons 80–85 (Wave 1) — PUSH THROUGH", done: false },
      { text: "Wave 2 active: Lessons 40–45", done: false },
      { text: "RFI Journal en français facile: today's episode", done: false },
      { text: "Anki reviews + 15 new cards", done: false },
    ],
    note: null
  },
  {
    id: 71, phase: 3, month: 9, week: 28,
    type: "Expressions + Reading",
    duration: 120,
    title: "Homophones & English Loanwords",
    tasks: [
      { text: "Watch TPF Vocabulary Lesson 23: Les homophones (ou vs où, son vs sont)", done: false },
      { text: "Watch TPF Vocabulary Lesson 24: 100 English words used in French — COMPLETE VOCAB COURSE ✅", done: false },
      { text: "Watch TPF Expressions Lessons 16–20 (body parts, animals, colours expressions)", done: false },
      { text: "Assimil Lessons 86–91 (Wave 1) + Wave 2 Lessons 46–51 (active)", done: false },
      { text: "Start reading Le Petit Nicolas — aim for 5 pages", done: false },
      { text: "Anki reviews + 15 new cards", done: false },
    ],
    note: "🎉 TPF VOCABULARY COURSE COMPLETE (24 lessons). You have a strong structured vocabulary base."
  },
  {
    id: 72, phase: 3, month: 9, week: 29,
    type: "Pronunciation + Assimil",
    duration: 120,
    title: "Assimil Final Push — Lessons 92–103",
    tasks: [
      { text: "Assimil Lessons 92–97 (Wave 1)", done: false },
      { text: "Wave 2 active: Lessons 52–57", done: false },
      { text: "Watch TPF Expressions Lessons 21–26 — COMPLETE EXPRESSIONS COURSE ✅", done: false },
      { text: "InnerFrench: listen without transcript — note what % you understood", done: false },
      { text: "Weekly writing: 200-word opinion piece. Topic: 'Les avantages du bilinguisme au Canada'", done: false },
      { text: "Anki reviews + 15 new cards", done: false },
    ],
    note: "🎉 TPF EXPRESSIONS COURSE COMPLETE. You've now finished ALL TPF courses. Remarkable milestone."
  },
  {
    id: 73, phase: 3, month: 9, week: 30,
    type: "Grammar",
    duration: 120,
    title: "ASSIMIL COMPLETE — Lessons 104–113",
    tasks: [
      { text: "Assimil Lessons 104–113 (Wave 1) — FINISH THE BOOK", done: false },
      { text: "Wave 2 active: Lessons 58–64", done: false },
      { text: "RFI Journal en français facile: today's episode", done: false },
      { text: "InnerFrench: Episode 8", done: false },
      { text: "Anki reviews + 15 new cards", done: false },
    ],
    note: "🎉🎉 ASSIMIL WAVE 1 COMPLETE (113 lessons). You've finished one of the most respected self-study courses in the world. Wave 2 continues for another 2 months."
  },
  {
    id: 74, phase: 3, month: 10, week: 31,
    type: "Listening + Vocabulary",
    duration: 120,
    title: "Dictée Practice Begins",
    tasks: [
      { text: "Dictée: listen to 5 RFI sentences, pause, write what you hear, check. Repeat daily.", done: false },
      { text: "Wave 2 active: Assimil Lessons 65–70", done: false },
      { text: "InnerFrench: Episode 9 — aim for 70% comprehension", done: false },
      { text: "Start reading Le Petit Prince — aim for 10 pages", done: false },
      { text: "Anki reviews + 20 new cards (increase again)", done: false },
    ],
    note: "⭐ Daily dictée from now on. It's the single best simultaneous listening + spelling exercise. 10 minutes per day."
  },
  {
    id: 75, phase: 3, month: 10, week: 31,
    type: "Assimil + Output",
    duration: 120,
    title: "Shadowing Practice + Wave 2 Continues",
    tasks: [
      { text: "Shadowing: pick a 1-min InnerFrench clip — listen once, then repeat sentence by sentence mimicking exact rhythm", done: false },
      { text: "Wave 2 active: Assimil Lessons 71–76", done: false },
      { text: "RFI Journal en français facile: today's episode", done: false },
      { text: "Self-talk: narrate your morning routine aloud in French for 5 minutes", done: false },
      { text: "Anki reviews + 20 new cards", done: false },
    ],
    note: "Self-talk sounds odd but is highly effective. 'Je mets mon manteau. Je fais du café. Il fait froid aujourd'hui.' Do it daily."
  },
  {
    id: 76, phase: 3, month: 10, week: 32,
    type: "Expressions + Reading",
    duration: 120,
    title: "Start 'Dix pour cent' on Netflix",
    tasks: [
      { text: "Watch 1 episode of 'Dix pour cent' (Call My Agent) with FRENCH subtitles — not English", done: false },
      { text: "Wave 2 active: Assimil Lessons 77–82", done: false },
      { text: "Weekly writing: write a 200-word opinion piece. Paste into Claude for correction.", done: false },
      { text: "Review your personal error log — pick 3 recurring errors and drill them", done: false },
      { text: "Dictée: 10 min daily", done: false },
      { text: "Anki reviews + 20 new cards", done: false },
    ],
    note: null
  },
  {
    id: 77, phase: 3, month: 10, week: 33,
    type: "Pronunciation + Assimil",
    duration: 120,
    title: "ASSIMIL WAVE 2 COMPLETE",
    tasks: [
      { text: "Wave 2 active: Assimil Lessons 83–92 — PUSH THROUGH", done: false },
      { text: "InnerFrench: Episode 10 — try without transcript", done: false },
      { text: "RFI Journal en français facile: today's episode", done: false },
      { text: "Anki reviews + 20 new cards", done: false },
    ],
    note: null
  },
  {
    id: 78, phase: 3, month: 10, week: 33,
    type: "Grammar",
    duration: 120,
    title: "Phase 3 Final Checkpoint",
    tasks: [
      { text: "Wave 2 active: Assimil Lessons 93–113 — COMPLETE WAVE 2 ✅", done: false },
      { text: "Write a 200-word opinion piece without any grammar notes — from memory", done: false },
      { text: "Watch one InnerFrench episode and write a 5-sentence summary in French", done: false },
      { text: "Anki: check known cards — aim for 1500+", done: false },
      { text: "Self-assess: can you understand 70%+ of InnerFrench without transcript? If yes, Phase 3 complete.", done: false },
    ],
    note: "🎉🎉 PHASE 3 COMPLETE — B1. Both waves of Assimil done. All TPF courses done. You understand natural French at 70%+ comprehension. Phase 4: the final push to PSC BBB."
  },

  // ════════════════════════════════════════════════════════
  // PHASE 4 — Pre-BBB (B1+ → PSC BBB) · Months 11–14
  // ════════════════════════════════════════════════════════

  {
    id: 79, phase: 4, month: 11, week: 34,
    type: "Listening + Reading",
    duration: 120,
    title: "Heavy Input Phase Begins",
    tasks: [
      { text: "Read one article from Le Devoir (ledevoir.com) — in French, no dictionary for first pass", done: false },
      { text: "InnerFrench: one full episode", done: false },
      { text: "RFI at normal speed (not 'facile' version) — try rfi.fr/fr/podcasts/journal", done: false },
      { text: "Dictée: 10 min", done: false },
      { text: "Anki reviews + 20 new cards — add your own cards from Le Devoir reading", done: false },
    ],
    note: "Phase 4 is about volume. Grammar study is largely done. Now: read, listen, write, repeat."
  },
  {
    id: 80, phase: 4, month: 11, week: 34,
    type: "Writing Output",
    duration: 90,
    title: "Formal Writing: Opinion Structure",
    tasks: [
      { text: "Learn and memorize opinion structure: D'une part… D'autre part… Cependant… En conclusion…", done: false },
      { text: "Write a 250-word structured opinion piece on any current Canadian issue", done: false },
      { text: "Paste into Claude with prompt: 'Correct my French and assess it against DELF B2 written expression criteria'", done: false },
      { text: "Anki reviews", done: false },
    ],
    note: "This structured opinion format is exactly what PSC written expression tests. Learn it cold."
  },
  {
    id: 81, phase: 4, month: 11, week: 35,
    type: "Listening + Reading",
    duration: 120,
    title: "Wikipedia in French + Tou.tv",
    tasks: [
      { text: "Read a Wikipedia article in French on a topic you know in English — no dictionary", done: false },
      { text: "Watch a Radio-Canada or Tou.tv clip — note 5 new words in Anki", done: false },
      { text: "InnerFrench or Arte documentary — 20 min", done: false },
      { text: "Dictée: 10 min", done: false },
      { text: "Anki reviews + 20 new cards", done: false },
    ],
    note: null
  },
  {
    id: 82, phase: 4, month: 11, week: 35,
    type: "Writing Output",
    duration: 90,
    title: "Formal Email Writing",
    tasks: [
      { text: "Learn formal email openers: 'Je vous écris afin de…', 'Suite à notre échange…', 'Je me permets de vous contacter…'", done: false },
      { text: "Learn formal closings: 'Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.'", done: false },
      { text: "Write a formal email requesting information (mock: asking your municipality about a local program)", done: false },
      { text: "Paste into Claude for correction — focus on register and formality", done: false },
      { text: "Anki reviews", done: false },
    ],
    note: "Formal email register is tested directly in the PSC written expression component."
  },
  {
    id: 83, phase: 4, month: 12, week: 36,
    type: "Listening + Reading",
    duration: 120,
    title: "False Friends + Le Devoir Daily",
    tasks: [
      { text: "Study a 'French false friends' list (search 'French false friends PDF' for a free list)", done: false },
      { text: "Read one Le Devoir article — underline 5 new words, add to Anki", done: false },
      { text: "InnerFrench: full episode", done: false },
      { text: "Dictée: 10 min", done: false },
      { text: "Anki reviews + 20 new cards", done: false },
    ],
    note: null
  },
  {
    id: 84, phase: 4, month: 12, week: 36,
    type: "Speaking Practice",
    duration: 90,
    title: "Record Yourself — Oral Self-Assessment",
    tasks: [
      { text: "Listen to a 3-min RFI report", done: false },
      { text: "Record yourself summarizing it in French for 2 minutes", done: false },
      { text: "Play back the recording — note hesitations, mispronunciations, or lost words", done: false },
      { text: "Shadow the original RFI clip for 15 min", done: false },
      { text: "Anki reviews", done: false },
    ],
    note: "Recording yourself is uncomfortable but it's the only way to hear what an examiner will hear. Do this every week from now."
  },
  {
    id: 85, phase: 4, month: 12, week: 37,
    type: "PSC Exam Prep",
    duration: 120,
    title: "DELF B2 Reading Practice Test",
    tasks: [
      { text: "Download a free DELF B2 practice test (search 'exercices DELF B2 compréhension écrite PDF')", done: false },
      { text: "Do the reading comprehension section under timed conditions", done: false },
      { text: "Check answers, note error patterns", done: false },
      { text: "Read one canada.ca page in French — any policy or program page", done: false },
      { text: "Anki reviews + 20 new cards", done: false },
    ],
    note: "PSC reading comprehension uses administrative and government text. canada.ca is a free bank of exactly this type of content."
  },
  {
    id: 86, phase: 4, month: 13, week: 38,
    type: "PSC Exam Prep",
    duration: 120,
    title: "Written Expression: Formal Memo",
    tasks: [
      { text: "Write a 150-word formal memo in French summarizing a policy issue", done: false },
      { text: "Write a 150-word formal letter of recommendation or opinion", done: false },
      { text: "Paste both into Claude with PSC assessment prompt from Iffy's guide", done: false },
      { text: "Add all flagged errors to your personal error log", done: false },
      { text: "Anki reviews", done: false },
    ],
    note: "By this point your error log should have 30–50 recurring errors. Review the whole log weekly."
  },
  {
    id: 87, phase: 4, month: 13, week: 39,
    type: "Speaking Practice",
    duration: 90,
    title: "Language Exchange — Find a Partner",
    tasks: [
      { text: "Download HelloTalk or Tandem (free) and create a profile", done: false },
      { text: "Find a francophone who wants to practise English — propose a 1-hour exchange (30 min each language)", done: false },
      { text: "Do the exchange. Note French words or phrases you couldn't find", done: false },
      { text: "Anki reviews + add words from the exchange", done: false },
    ],
    note: "This is not a teacher — it's a free language exchange. At this point in the plan, speaking with a real person weekly is essential for the PSC oral component."
  },
  {
    id: 88, phase: 4, month: 13, week: 40,
    type: "PSC Exam Prep",
    duration: 120,
    title: "Full DELF B2 Mock Test",
    tasks: [
      { text: "Do a complete DELF B2 practice test — reading + writing — under timed conditions", done: false },
      { text: "Self-assess your written expression against the scoring criteria", done: false },
      { text: "Review cfp-psc.gc.ca for PSC exam format and sample materials", done: false },
      { text: "Anki reviews", done: false },
    ],
    note: null
  },
  {
    id: 89, phase: 4, month: 14, week: 41,
    type: "PSC Exam Prep",
    duration: 120,
    title: "Oral Preparation: Structured Responses",
    tasks: [
      { text: "Practice describing your job and skills in French — 3 minutes, recorded", done: false },
      { text: "Practice giving your opinion on a current issue — 3 minutes, recorded", done: false },
      { text: "Do your weekly language exchange", done: false },
      { text: "Anki reviews", done: false },
    ],
    note: null
  },
  {
    id: 90, phase: 4, month: 14, week: 42,
    type: "BBB Final Checkpoint",
    duration: 120,
    title: "BBB READY ASSESSMENT",
    tasks: [
      { text: "Read a Government of Canada administrative text in French — answer 5 comprehension questions from memory", done: false },
      { text: "Write a formal 150-word email from scratch, no notes — check register and accuracy", done: false },
      { text: "Record yourself discussing a topic for 5–10 minutes in French", done: false },
      { text: "Anki: you should be approaching 2500–3000 known cards", done: false },
      { text: "Assess: Can you do all three of the above comfortably? If yes — you're ready to book your PSC exam.", done: false },
    ],
    note: "🎉🎉🎉 IF YOU'VE REACHED THIS SESSION YOU ARE READY FOR YOUR PSC BBB EXAM. Book it. You've earned it."
  },
];

const TYPE_COLORS = {
  "Pronunciation + Assimil": "#5B8AF0",
  "Grammar": "#E07B4F",
  "Listening + Vocabulary": "#5DBF8A",
  "Assimil + Output": "#A67BDB",
  "Expressions + Reading": "#E0C44F",
  "Listening + Reading": "#5DBF8A",
  "Writing Output": "#E07B4F",
  "Speaking Practice": "#F07BA0",
  "PSC Exam Prep": "#4FC4D0",
  "BBB Final Checkpoint": "#E0C44F",
};

const PHASE_LABELS = {
  1: "Phase 1 — Foundation (A1)",
  2: "Phase 2 — Elementary (A2)",
  3: "Phase 3 — Intermediate (B1)",
  4: "Phase 4 — Pre-BBB",
};

const STORAGE_KEY = "french_tracker_v1";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { completedSessions: {}, currentIdx: 0 };
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

export default function FrenchTracker() {
  const [state, setState] = useState(loadState);
  const [view, setView] = useState("queue"); // queue | progress | session
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [taskStates, setTaskStates] = useState({});

  useEffect(() => {
    saveState(state);
  }, [state]);

  const completedIds = new Set(Object.keys(state.completedSessions).map(Number));
  const remainingSessions = ALL_SESSIONS.filter(s => !completedIds.has(s.id));
  const nextSession = remainingSessions[0] || null;
  const totalCompleted = completedIds.size;
  const totalSessions = ALL_SESSIONS.length;
  const pct = Math.round((totalCompleted / totalSessions) * 100);

  const activeSession = activeSessionId ? ALL_SESSIONS.find(s => s.id === activeSessionId) : null;

  function openSession(session) {
    const init = {};
    session.tasks.forEach((t, i) => { init[i] = false; });
    setTaskStates(init);
    setActiveSessionId(session.id);
    setView("session");
  }

  function completeSession() {
    const now = new Date().toISOString();
    setState(prev => ({
      ...prev,
      completedSessions: { ...prev.completedSessions, [activeSessionId]: now }
    }));
    setView("queue");
    setActiveSessionId(null);
  }

  function undoSession(id) {
    setState(prev => {
      const updated = { ...prev.completedSessions };
      delete updated[id];
      return { ...prev, completedSessions: updated };
    });
  }

  function toggleTask(i) {
    setTaskStates(prev => ({ ...prev, [i]: !prev[i] }));
  }

  const allTasksDone = activeSession && Object.keys(taskStates).length > 0 &&
    Object.values(taskStates).every(Boolean);

  // Group sessions by phase for progress view
  const byPhase = [1, 2, 3, 4].map(ph => ({
    phase: ph,
    sessions: ALL_SESSIONS.filter(s => s.phase === ph),
    completed: ALL_SESSIONS.filter(s => s.phase === ph && completedIds.has(s.id)).length,
  }));

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0F1117",
      color: "#E8E9F0",
      fontFamily: "'Georgia', serif",
      padding: "0",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1A1D2E 0%, #0F1117 100%)",
        borderBottom: "1px solid #2A2D3E",
        padding: "20px 24px 16px",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", color: "#E8E9F0" }}>
                🇫🇷 Chemin vers le BBB
              </h1>
              <div style={{ fontSize: 12, color: "#7A7D95", marginTop: 2 }}>
                {totalCompleted} of {totalSessions} sessions · {pct}% complete
              </div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {["queue", "progress"].map(v => (
                <button key={v} onClick={() => setView(v)} style={{
                  padding: "6px 14px", borderRadius: 6, border: "1px solid",
                  borderColor: view === v ? "#5B8AF0" : "#2A2D3E",
                  background: view === v ? "#1E2540" : "transparent",
                  color: view === v ? "#5B8AF0" : "#7A7D95",
                  fontSize: 12, cursor: "pointer", fontFamily: "inherit",
                  textTransform: "capitalize",
                }}>
                  {v === "queue" ? "Next Up" : "Progress"}
                </button>
              ))}
            </div>
          </div>
          {/* Progress bar */}
          <div style={{ background: "#2A2D3E", borderRadius: 4, height: 6, overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 4,
              background: "linear-gradient(90deg, #5B8AF0, #A67BDB)",
              width: `${pct}%`, transition: "width 0.5s ease",
            }} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "20px 16px" }}>

        {/* ── QUEUE VIEW ── */}
        {view === "queue" && (
          <div>
            {/* Next session card */}
            {nextSession ? (
              <div style={{
                background: "linear-gradient(135deg, #1A1D2E, #1E2030)",
                border: "1px solid #3A4060",
                borderRadius: 12, padding: "20px",
                marginBottom: 24,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "#7A7D95" }}>
                    PHASE {nextSession.phase} · MONTH {nextSession.month}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 16 }}>
                  <div>
                    <h2 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 700, color: "#E8E9F0" }}>
                      {nextSession.title}
                    </h2>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{
                        fontSize: 11, padding: "2px 8px", borderRadius: 20,
                        background: (TYPE_COLORS[nextSession.type] || "#5B8AF0") + "22",
                        color: TYPE_COLORS[nextSession.type] || "#5B8AF0",
                        border: `1px solid ${(TYPE_COLORS[nextSession.type] || "#5B8AF0")}44`,
                      }}>
                        {nextSession.type}
                      </span>
                      <span style={{ fontSize: 11, color: "#7A7D95" }}>
                        ~{nextSession.duration} min
                      </span>
                    </div>
                  </div>
                  <button onClick={() => openSession(nextSession)} style={{
                    padding: "10px 20px", borderRadius: 8, border: "none",
                    background: "linear-gradient(135deg, #5B8AF0, #A67BDB)",
                    color: "#fff", fontWeight: 700, fontSize: 14,
                    cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit",
                    flexShrink: 0,
                  }}>
                    Start →
                  </button>
                </div>
                {nextSession.note && (
                  <div style={{
                    background: "#0F1117", borderRadius: 8, padding: "10px 14px",
                    fontSize: 12, color: "#9A9DB5", lineHeight: 1.6, borderLeft: "3px solid #5B8AF0",
                  }}>
                    {nextSession.note}
                  </div>
                )}
                {/* Task preview */}
                <div style={{ marginTop: 14 }}>
                  <div style={{ fontSize: 11, color: "#7A7D95", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {nextSession.tasks.length} tasks in this session
                  </div>
                  {nextSession.tasks.slice(0, 3).map((t, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 4, opacity: 0.7 }}>
                      <span style={{ color: "#5B8AF0", marginTop: 1, flexShrink: 0 }}>○</span>
                      <span style={{ fontSize: 12, color: "#B0B3C8", lineHeight: 1.5 }}>{t.text}</span>
                    </div>
                  ))}
                  {nextSession.tasks.length > 3 && (
                    <div style={{ fontSize: 11, color: "#5A5D75", marginLeft: 20 }}>
                      +{nextSession.tasks.length - 3} more…
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: 40 }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>Félicitations!</div>
                <div style={{ color: "#7A7D95", marginTop: 8 }}>All sessions complete. Bon courage for the exam!</div>
              </div>
            )}

            {/* Upcoming queue */}
            {remainingSessions.length > 1 && (
              <div>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "#7A7D95", marginBottom: 12 }}>
                  Coming Up — {remainingSessions.length - 1} sessions remaining
                </div>
                {remainingSessions.slice(1, 6).map((s, i) => (
                  <div key={s.id} style={{
                    background: "#1A1D2E", border: "1px solid #2A2D3E",
                    borderRadius: 8, padding: "12px 16px", marginBottom: 8,
                    display: "flex", alignItems: "center", gap: 12,
                    opacity: 1 - i * 0.08,
                  }}>
                    <div style={{
                      width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
                      background: TYPE_COLORS[s.type] || "#5B8AF0",
                    }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, color: "#C8CADE", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {s.title}
                      </div>
                      <div style={{ fontSize: 11, color: "#5A5D75" }}>
                        {s.type} · ~{s.duration} min
                      </div>
                    </div>
                    <button onClick={() => openSession(s)} style={{
                      padding: "5px 12px", borderRadius: 6, border: "1px solid #3A4060",
                      background: "transparent", color: "#7A8DC0", fontSize: 11,
                      cursor: "pointer", fontFamily: "inherit", flexShrink: 0,
                    }}>
                      Preview
                    </button>
                  </div>
                ))}
                {remainingSessions.length > 6 && (
                  <div style={{ textAlign: "center", color: "#5A5D75", fontSize: 12, marginTop: 8 }}>
                    + {remainingSessions.length - 6} more sessions
                  </div>
                )}
              </div>
            )}

            {/* Recently completed */}
            {totalCompleted > 0 && (
              <div style={{ marginTop: 28 }}>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "#7A7D95", marginBottom: 12 }}>
                  Recently Completed
                </div>
                {ALL_SESSIONS.filter(s => completedIds.has(s.id)).slice(-3).reverse().map(s => (
                  <div key={s.id} style={{
                    background: "#141620", border: "1px solid #1E2130",
                    borderRadius: 8, padding: "10px 14px", marginBottom: 6,
                    display: "flex", alignItems: "center", gap: 12,
                  }}>
                    <span style={{ color: "#5DBF8A", fontSize: 14 }}>✓</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, color: "#7A8090" }}>{s.title}</div>
                    </div>
                    <button onClick={() => undoSession(s.id)} style={{
                      padding: "3px 10px", borderRadius: 5, border: "1px solid #2A2D3E",
                      background: "transparent", color: "#5A5D75", fontSize: 10,
                      cursor: "pointer", fontFamily: "inherit",
                    }}>
                      Undo
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── PROGRESS VIEW ── */}
        {view === "progress" && (
          <div>
            <div style={{
              background: "#1A1D2E", border: "1px solid #2A2D3E",
              borderRadius: 12, padding: 20, marginBottom: 20,
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16,
            }}>
              <div>
                <div style={{ fontSize: 11, color: "#7A7D95", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>Sessions Done</div>
                <div style={{ fontSize: 32, fontWeight: 700, color: "#5B8AF0" }}>{totalCompleted}</div>
                <div style={{ fontSize: 12, color: "#5A5D75" }}>of {totalSessions} total</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#7A7D95", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>Est. Hours Done</div>
                <div style={{ fontSize: 32, fontWeight: 700, color: "#A67BDB" }}>
                  {Math.round(ALL_SESSIONS.filter(s => completedIds.has(s.id)).reduce((a, s) => a + s.duration, 0) / 60)}
                </div>
                <div style={{ fontSize: 12, color: "#5A5D75" }}>of ~650 hrs target</div>
              </div>
            </div>

            {byPhase.map(({ phase, sessions, completed }) => {
              const phasePct = Math.round((completed / sessions.length) * 100);
              return (
                <div key={phase} style={{
                  background: "#1A1D2E", border: "1px solid #2A2D3E",
                  borderRadius: 10, padding: 16, marginBottom: 12,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#C8CADE" }}>{PHASE_LABELS[phase]}</div>
                      <div style={{ fontSize: 11, color: "#5A5D75" }}>{completed} / {sessions.length} sessions</div>
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: phasePct === 100 ? "#5DBF8A" : "#7A8DC0" }}>
                      {phasePct}%
                    </div>
                  </div>
                  <div style={{ background: "#0F1117", borderRadius: 4, height: 8, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", borderRadius: 4,
                      background: phasePct === 100
                        ? "#5DBF8A"
                        : phase === 1 ? "#5B8AF0" : phase === 2 ? "#E07B4F" : phase === 3 ? "#A67BDB" : "#E0C44F",
                      width: `${phasePct}%`, transition: "width 0.4s",
                    }} />
                  </div>
                  {/* Session dots */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 10 }}>
                    {sessions.map(s => (
                      <div
                        key={s.id}
                        title={s.title}
                        onClick={() => { if (!completedIds.has(s.id)) { openSession(s); setView("session"); } }}
                        style={{
                          width: 10, height: 10, borderRadius: 2,
                          background: completedIds.has(s.id)
                            ? (TYPE_COLORS[s.type] || "#5B8AF0")
                            : "#2A2D3E",
                          cursor: completedIds.has(s.id) ? "default" : "pointer",
                          opacity: completedIds.has(s.id) ? 1 : 0.5,
                          transition: "background 0.2s",
                        }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── SESSION VIEW ── */}
        {view === "session" && activeSession && (
          <div>
            <button onClick={() => { setView("queue"); setActiveSessionId(null); }} style={{
              background: "transparent", border: "none", color: "#7A7D95",
              cursor: "pointer", fontSize: 13, marginBottom: 16, padding: 0, fontFamily: "inherit",
            }}>
              ← Back to queue
            </button>

            <div style={{
              background: "#1A1D2E", border: "1px solid #3A4060",
              borderRadius: 12, padding: 20, marginBottom: 20,
            }}>
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "#7A7D95", marginBottom: 6 }}>
                {PHASE_LABELS[activeSession.phase]} · Month {activeSession.month} · {activeSession.type}
              </div>
              <h2 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 700, color: "#E8E9F0" }}>
                {activeSession.title}
              </h2>
              <div style={{ fontSize: 12, color: "#7A7D95" }}>~{activeSession.duration} minutes</div>
            </div>

            {activeSession.note && (
              <div style={{
                background: "#1A2030", border: "1px solid #2A4060",
                borderRadius: 8, padding: "12px 16px", marginBottom: 20,
                fontSize: 13, color: "#9AADD0", lineHeight: 1.6,
                borderLeft: "3px solid #5B8AF0",
              }}>
                {activeSession.note}
              </div>
            )}

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "#7A7D95", marginBottom: 12 }}>
                Tasks
              </div>
              {activeSession.tasks.map((task, i) => (
                <div
                  key={i}
                  onClick={() => toggleTask(i)}
                  style={{
                    display: "flex", gap: 14, alignItems: "flex-start",
                    padding: "12px 16px", borderRadius: 8, marginBottom: 8,
                    background: taskStates[i] ? "#142020" : "#1A1D2E",
                    border: `1px solid ${taskStates[i] ? "#2A5040" : "#2A2D3E"}`,
                    cursor: "pointer", transition: "all 0.15s",
                  }}
                >
                  <div style={{
                    width: 20, height: 20, borderRadius: 4, border: "1.5px solid",
                    borderColor: taskStates[i] ? "#5DBF8A" : "#4A4D65",
                    background: taskStates[i] ? "#5DBF8A" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: 1, transition: "all 0.15s",
                  }}>
                    {taskStates[i] && <span style={{ color: "#0F1117", fontSize: 12, fontWeight: 700 }}>✓</span>}
                  </div>
                  <div>
                    <span style={{
                      fontSize: 13, lineHeight: 1.55, color: taskStates[i] ? "#5A8070" : "#C0C3D8",
                      textDecoration: taskStates[i] ? "line-through" : "none",
                      transition: "all 0.15s",
                    }}>
                      {task.text}
                    </span>
                    {task.link && (
                      <a href={task.link} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{
                        display: "block", fontSize: 11, color: "#5B8AF0", marginTop: 2,
                      }}>
                        Open resource ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={completeSession}
                disabled={!allTasksDone}
                style={{
                  flex: 1, padding: "14px", borderRadius: 8, border: "none",
                  background: allTasksDone
                    ? "linear-gradient(135deg, #5DBF8A, #3D9F6A)"
                    : "#2A2D3E",
                  color: allTasksDone ? "#fff" : "#5A5D75",
                  fontWeight: 700, fontSize: 15, cursor: allTasksDone ? "pointer" : "default",
                  fontFamily: "inherit", transition: "all 0.2s",
                }}
              >
                {allTasksDone ? "✓ Complete Session" : `Complete all ${Object.values(taskStates).filter(Boolean).length}/${activeSession.tasks.length} tasks first`}
              </button>
              <button
                onClick={completeSession}
                style={{
                  padding: "14px 16px", borderRadius: 8, border: "1px solid #2A2D3E",
                  background: "transparent", color: "#7A7D95", cursor: "pointer",
                  fontSize: 12, fontFamily: "inherit",
                }}
                title="Mark complete even if not all tasks done"
              >
                Skip →
              </button>
            </div>
            <div style={{ textAlign: "center", fontSize: 11, color: "#4A4D65", marginTop: 8 }}>
              Use "Skip" if you ran out of time — you won't lose your spot
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
