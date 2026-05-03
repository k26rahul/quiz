# AI Content Generation Skill: Quizzes and Guides

This skill defines the technical constraints, JSON schemas, and stylistic guidelines for generating new Quiz and Guide content files.

## General Stylistic & Formatting Guidelines

1. **Format:** Both Quiz and Guide contents must be generated as raw JSON arrays containing objects.
2. **Tone:** Professional, precise, and educational.
3. **Consistency:** Guides must be structured as questions (Q&A/FAQ style) to maintain stylistic parity with the quizzes.
4. **Markdown Usage:**
   - Use standard Markdown for all textual descriptions, questions, and explanations.
   - **Inline Code:** Must always be fenced using single backticks (e.g., `let x = 10;`).
   - **Code Blocks:** Use triple backticks with the appropriate language tag (e.g., ```javascript).
   - Use bolding (`**text**`) for emphasis on key technical terms.

## Quiz JSON Structure

Generate a JSON array of objects. Each object represents a single multiple-choice question.

### Schema
```json
[
  {
    "id": 1, 
    "topic": "Specific sub-topic (e.g., 'Closures')",
    "text": "The question body. Can include markdown and code blocks.",
    "options": [
      { "id": "a", "text": "First option (markdown supported)" },
      { "id": "b", "text": "Second option" },
      { "id": "c", "text": "Third option" },
      { "id": "d", "text": "Fourth option" }
    ],
    "correct": "c", 
    "feedback": "Explanation of why the answer is correct and why others might be wrong. Markdown supported."
  }
]
```

### Quiz Dos and Don'ts
* **DO** ensure the `id` for options are strictly `"a", "b", "c", "d"`.
* **DO** ensure the `correct` key strictly matches one of the option `id`s.
* **DON'T** make the correct answer obviously longer or more detailed than the incorrect options.
* **DON'T** use HTML tags; strictly rely on Markdown.

## Guide JSON Structure

Generate a JSON array of objects. Each object represents a single educational topic, styled as a question and its comprehensive answer.

### Schema
```json
[
  {
    "id": 1,
    "category": "Broad topic (e.g., 'Functions and Execution Context')",
    "question": "The guiding question (e.g., 'What is a closure?')",
    "markdown": "The detailed explanation using markdown. Include bullet points, code blocks, and bold text for readability. Add a '📌 Extra Information:' section at the bottom for trivia or edge cases."
  }
]
```

### Guide Dos and Don'ts
* **DO** structure every guide item as a question and an answer.
* **DO** include concrete code examples in the `markdown` property to illustrate the concepts.
* **DON'T** write massive walls of text. Break explanations up with bullet points and code snippets.
