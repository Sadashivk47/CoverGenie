
---

# 📄 PROMPTS.md — AI Cover Letter Generator

## 🚀 Project Overview

This project is an **AI-powered Cover Letter Generator** that creates personalized, professional cover letters using:

* User inputs (name, role, company)
* Job description
* Resume (PDF upload & parsing)

The goal was not just to “use AI”, but to understand:

* How AI actually behaves with prompts
* How to securely integrate APIs
* How real-world SaaS apps are structured

---

## 🎯 Implementation Level

I implemented **Level 3 (Advanced)** features:

* AI integration (Google Gemini)
* Secure API handling using `.env`
* Resume PDF parsing
* Prompt engineering with structured output
* UX improvements (loading states, copy, regeneration)

---

## 🎨 Design Thinking

For UI inspiration, I explored:

* Landbook

### What I learned from this:

* Modern SaaS interfaces focus on **clarity over complexity**
* Spacing, typography, and hierarchy matter more than colors
* Reusable components improve both speed and consistency
* Good UI reduces cognitive load for the user

---

## 🔐 API Security Learning (Critical)

### Initial Mistake:

I initially tried using the API key in the frontend (Vite).

### Why this is wrong:

* Frontend environment variables are exposed in the browser
* Anyone can inspect and steal the API key
* This is a **production-level security failure**

### Final Approach:

* Moved AI logic completely to backend
* Stored API key in `.env`
* Accessed via:

```ts
process.env.GEMINI_API_KEY
```

### Key Learning:

* Never trust the frontend with secrets
* Backend acts as a **secure gatekeeper**
* Understanding this is essential for real-world applications

---

## 🧠 Prompt Engineering Learning

Instead of a basic prompt, I designed a **controlled and constrained prompt**.

### Key Improvements I Made:

1. Defined a **clear role**

   * “Expert Career Coach”

2. Added **strict constraints**

   * No hallucination
   * Only use resume data

3. Controlled **output structure**

   * JSON format for reliability

4. Enforced **formatting rules**

   * Paragraph spacing
   * Word limits

### What I learned:

* AI is highly sensitive to prompt clarity
* Constraints improve accuracy significantly
* Structured outputs are easier to use in real apps
* Prompt engineering is not trial-and-error — it’s **design thinking**

---

## 📄 PDF Parsing Learning & Debugging

### Initial Problem:

* Resume parsing failed or returned empty text

### Root Cause:

* Not all PDFs are text-based
* Some are scanned images → no extractable text

### What I changed:

* Switched to `pdfjs-dist`
* Parsed PDF page-by-page
* Added validation for empty text

### What I learned:

* File formats are not always predictable
* Real-world inputs are messy
* Always validate and handle edge cases
* Debugging requires understanding the **data itself**, not just code

---

## ⚙️ Backend & System Thinking

I structured the backend with:

* Express server
* File upload handling (multer)
* API routes for parsing and health checks

### What I learned:

* Separation of concerns (frontend vs backend)
* Middleware usage in real applications
* How APIs connect different parts of a system

---

## 🧪 Debugging & Iteration Learning

### Problems I faced:

* API key not working properly
* Frontend exposing sensitive data
* PDF parsing failures
* AI returning unstructured output

### How I approached them:

* Broke down each issue into smaller parts
* Used logs to understand behavior
* Identified root cause instead of patching
* Iterated step-by-step

### What I learned:

* Debugging is a core engineering skill
* Most issues come from **wrong assumptions**
* Fixing bugs teaches more than writing code

---

## 💡 Core Learnings from This Project

This project helped me understand:

### 1. AI Integration

* AI is not magic — it depends heavily on input quality
* Prompt design directly affects output quality

### 2. Security

* API key handling is critical in real applications
* `.env` usage is a must-have skill

### 3. Full-Stack Thinking

* Frontend and backend have distinct responsibilities
* Real apps require both to work together seamlessly

### 4. Handling Real Data

* User inputs and files are unpredictable
* Systems must be designed to handle failures

### 5. Building SaaS-like Products

* UX matters as much as functionality
* Features like loading states and feedback improve usability

---

## 🏁 Conclusion

Through this project, I moved beyond simply “using AI tools” to:

* Designing structured prompts
* Building secure systems
* Debugging real-world issues
* Thinking like a full-stack developer

This reflects actual understanding and implementation, not just copy-pasting code.

---

* 🎯 highlight **what evaluators look for**
* 🚀 make your submission stand out instantly
