# 🧩 Quiz App v1 (Clean Plan)

## 🎯 Goal
Build a simple but powerful study tool with:
- Flashcards (core learning)
- Test mode (assessment)
- Game mode (engagement)

---

## 📦 Core System (MUST HAVE FIRST)

### Study Set Structure
Each item:
- question
- answer
- options (optional for MCQ)

Example:
{
  id: "q1",
  question: "What is a pointer?",
  answer: "A variable that stores memory address",
  options: [
    "A loop",
    "A variable storing memory address",
    "A function"
  ]
}

---

## 🧠 Mode 1: Flashcards (START HERE)

### Flow:
1. Show question
2. Click → reveal answer
3. User clicks:
   - Again ❌
   - Good ✅
   - Easy ⚡

### What to track:
- timesSeen
- difficulty (based on rating)

---

## 🧪 Mode 2: Test Mode (Upgrade your current)

### Flow:
1. Show question
2. User selects answer
3. Immediately show:
   - Correct / Wrong
   - Correct answer
4. Next question

### Add:
- Untimed mode (important)
- Optional timer

---

## 🎮 Mode 3: Game Mode (KEEP IT SIMPLE)

Inspired by "blocks" idea

### Version 1 (don’t overcomplicate):
- Show question
- Show 4 options
- User must answer FAST
- Score increases
- Timer running

### Rules:
- +10 correct
- -5 wrong OR time penalty
- streak bonus

---

## 🧠 Shared Logic (VERY IMPORTANT)

Every question should store:

{
  timesSeen: 0,
  timesCorrect: 0,
  timesWrong: 0
}

---

## 🔁 Basic Smart Behavior (DON’T SKIP)

When selecting next question:

IF wrong → show again sooner  
IF correct → delay it  

(Simple version, no need for complex algorithm yet)

---

## 🖥️ UI Structure (PC FIX)

Layout:

[ Sidebar ] [ Main Content ] [ Info Panel ]

Sidebar:
- list of sets

Main:
- current mode (flashcard/test/game)

Right:
- progress / score

---

## 🚀 MVP CHECKLIST

- [ ] Create Study Set
- [ ] Flashcard mode working
- [ ] Test mode working (instant feedback)
- [ ] Game mode basic version
- [ ] Track question stats
- [ ] Simple desktop layout

---

## ❌ DO NOT ADD YET

- AI features
- Social features
- Fancy animations
- Too many modes

---

## 🧠 Focus Rule

If a feature does NOT:
- improve learning
- or increase engagement

→ Don’t build it (yet)