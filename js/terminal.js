/* ═══════════════════════════════════════════════════════════
   CODEYATRA — Live Coding Terminal / IDE Simulator
   3 real JavaScript challenges with in-browser execution,
   XP rewards, and animated feedback
════════════════════════════════════════════════════════════ */
'use strict';

const CHALLENGES = [
  {
    title: 'challenge.js',
    label: 'Challenge 1',
    description: '💡 Task: Write a function <code>reverseWords(str)</code> that reverses each word in a sentence but keeps the word order.<br/>Example: "hello world" → "olleh dlrow"',
    fnName: 'reverseWords',
    starter: `// Challenge 1: Reverse Each Word
// Hint: Split → map → reverse → join

function reverseWords(str) {
  // Your code here

}

// Test it
console.log(reverseWords("hello world"));
console.log(reverseWords("CodeYatra is awesome"));
`,
    validator: (fn) => {
      try {
        const r1 = fn('hello world') === 'olleh dlrow';
        const r2 = fn('CodeYatra is awesome') === 'artaYedoC si emosewa';
        return {
          pass: r1 && r2,
          results: [
            { label: 'reverseWords("hello world")', pass: r1, got: fn('hello world'), expected: 'olleh dlrow' },
            { label: 'reverseWords("CodeYatra is awesome")', pass: r2, got: fn('CodeYatra is awesome'), expected: 'artaYedoC si emosewa' }
          ]
        };
      } catch (err) {
        return { pass: false, results: [{ label: 'Error running tests', pass: false, got: err.message, expected: 'No error' }] };
      }
    }
  },
  {
    title: 'flatten.js',
    label: 'Challenge 2',
    description: '💡 Task: Write a function <code>flattenDeep(arr)</code> that flattens a deeply nested array.<br/>Example: [1, [2, [3, [4]]]] → [1, 2, 3, 4]',
    fnName: 'flattenDeep',
    starter: `// Challenge 2: Deep Flatten Array
// Hint: Recursion or Array.flat(Infinity)

function flattenDeep(arr) {
  // Your code here

}

// Test it
console.log(flattenDeep([1, [2, [3, [4]]]]));
console.log(flattenDeep([[1, 2], [3, [4, 5]]]));
`,
    validator: (fn) => {
      try {
        const r1 = JSON.stringify(fn([1, [2, [3, [4]]]])) === '[1,2,3,4]';
        const r2 = JSON.stringify(fn([[1, 2], [3, [4, 5]]])) === '[1,2,3,4,5]';
        return {
          pass: r1 && r2,
          results: [
            { label: 'flattenDeep([1,[2,[3,[4]]]])', pass: r1, got: JSON.stringify(fn([1, [2, [3, [4]]]])), expected: '[1,2,3,4]' },
            { label: 'flattenDeep([[1,2],[3,[4,5]]])', pass: r2, got: JSON.stringify(fn([[1, 2], [3, [4, 5]]])), expected: '[1,2,3,4,5]' }
          ]
        };
      } catch (err) {
        return { pass: false, results: [{ label: 'Error running tests', pass: false, got: err.message, expected: 'No error' }] };
      }
    }
  },
  {
    title: 'memoize.js',
    label: 'Challenge 3',
    description: '💡 Task: Write a <code>memoize(fn)</code> function that caches results of expensive function calls.<br/>Same arguments → return cached result.',
    fnName: 'memoize',
    starter: `// Challenge 3: Memoization
// Hint: Use a Map or plain object as cache

function memoize(fn) {
  // Your code here

}

// Test it
const slowSquare = (n) => n * n;
const fastSquare = memoize(slowSquare);

console.log(fastSquare(4));   // 16
console.log(fastSquare(4));   // 16 (from cache)
console.log(fastSquare(7));   // 49
`,
    validator: (fn) => {
      try {
        let callCount = 0;
        const tracked = (n) => { callCount++; return n * n; };
        const memoized = fn(tracked);
        const r1 = memoized(4) === 16;
        const r2 = memoized(4) === 16;
        const beforeCount = callCount;
        memoized(4);
        const cached = callCount === beforeCount;
        const r3 = memoized(7) === 49;
        return {
          pass: r1 && r2 && r3 && cached,
          results: [
            { label: 'memoize(fn)(4) === 16', pass: r1, got: String(memoized(4)), expected: '16' },
            { label: 'memoize(fn)(7) === 49', pass: r3, got: String(memoized(7)), expected: '49' },
            { label: 'Result is cached (no re-compute)', pass: cached, got: cached ? 'Yes' : 'No', expected: 'Yes' }
          ]
        };
      } catch (err) {
        return { pass: false, results: [{ label: 'Error running tests', pass: false, got: err.message, expected: 'No error' }] };
      }
    }
  }
];

(function initTerminal() {
  const codeArea = document.getElementById('ideCode');
  const gutterEl = document.getElementById('ideGutter');
  const runBtn = document.getElementById('ideRun');
  const resetBtn = document.getElementById('ideReset');
  const resultEl = document.getElementById('ideResult');
  const descEl = document.getElementById('ideChallengeDesc');
  const tabName = document.getElementById('ideTabName');
  const ctabs = document.querySelectorAll('.ctab');

  if (!codeArea || !runBtn) return;

  let currentChallenge = 0;
  let xpEarned = 0;
  const completed = new Set();

  /* ── Load Challenge ── */
  function loadChallenge(idx) {
    currentChallenge = idx;
    const ch = CHALLENGES[idx];
    codeArea.value = ch.starter;
    if (tabName) tabName.textContent = ch.title;
    if (descEl) descEl.innerHTML = ch.description;
    resultEl.innerHTML = '<span class="result-placeholder">// Click "Run" to execute your code</span>';
    updateGutter();

    ctabs.forEach((t, i) => {
      t.classList.toggle('active', i === idx);
      if (completed.has(i)) {
        t.style.color = '#16A34A';
        t.style.borderColor = 'rgba(22,163,74,0.3)';
        t.style.background = '#F0FDF4';
      }
    });
  }

  /* ── Gutter line numbers ── */
  function updateGutter() {
    if (!gutterEl) return;
    const lines = codeArea.value.split('\n').length;
    gutterEl.textContent = Array.from({ length: lines }, (_, i) => i + 1).join('\n');
  }

  codeArea.addEventListener('input', updateGutter);
  codeArea.addEventListener('scroll', () => {
    if (gutterEl) gutterEl.scrollTop = codeArea.scrollTop;
  });
  codeArea.addEventListener('keydown', e => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = codeArea.selectionStart;
      const end = codeArea.selectionEnd;
      codeArea.value = codeArea.value.slice(0, start) + '  ' + codeArea.value.slice(end);
      codeArea.selectionStart = codeArea.selectionEnd = start + 2;
      updateGutter();
    }
  });

  /* ── Run Code ── */
  function runCode() {
    // Visual feedback
    runBtn.style.transform = 'scale(0.95)';
    setTimeout(() => { runBtn.style.transform = ''; }, 150);

    const code = codeArea.value;
    const ch = CHALLENGES[currentChallenge];
    const logs = [];

    // Capture console.log output
    const origLog = console.log;
    console.log = (...args) => {
      logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
    };

    let execResult = null;
    let execError = null;

    try {
      // Build a function that returns the user-defined function
      const fnName = ch.fnName;
      const wrappedCode = code + `\n; return typeof ${fnName} === 'function' ? ${fnName} : null;`;
      const userFn = new Function(wrappedCode)();

      if (userFn && ch.validator) {
        execResult = ch.validator(userFn);
      } else if (!userFn) {
        execError = { message: `Function "${fnName}" not found. Make sure you defined it correctly.` };
      }
    } catch (err) {
      execError = err;
    } finally {
      console.log = origLog;
    }

    // Display output
    let html = '';

    if (logs.length > 0) {
      html += `<div style="margin-bottom:10px; padding-bottom:10px; border-bottom:1px solid rgba(255,255,255,0.06)">`;
      logs.forEach(log => {
        html += `<div class="result-info">→ ${escHtml(log)}</div>`;
      });
      html += `</div>`;
    }

    if (execError) {
      html += `<div class="result-err">✗ Error: ${escHtml(execError.message)}</div>`;
      html += `<div style="color:rgba(255,255,255,0.3); font-size:.72rem; margin-top:8px;">Check your syntax and try again.</div>`;
    } else if (execResult) {
      const { pass, results } = execResult;

      results.forEach(r => {
        html += `<div class="result-${r.pass ? 'ok' : 'err'}" style="margin-bottom:6px">`;
        html += `<span style="margin-right:6px">${r.pass ? '✓' : '✗'}</span>`;
        html += `<span style="color:rgba(255,255,255,0.6)">${escHtml(r.label)}</span>`;
        if (!r.pass) {
          html += `<div style="padding-left:16px; font-size:.72rem; color:rgba(255,255,255,0.3); margin-top:2px">`;
          html += `Got: <span style="color:#f87171">${escHtml(String(r.got))}</span> `;
          html += `Expected: <span style="color:#4ade80">${escHtml(String(r.expected))}</span>`;
          html += `</div>`;
        }
        html += `</div>`;
      });

      if (pass && !completed.has(currentChallenge)) {
        completed.add(currentChallenge);
        xpEarned += 100;
        html += `<div style="margin-top:16px; padding:12px 16px; border-radius:10px; background:rgba(22,163,74,0.1); border:1px solid rgba(22,163,74,0.2)">`;
        html += `<div style="color:#4ade80; font-weight:700; margin-bottom:4px">🎉 Challenge Complete! +100 XP</div>`;
        html += `<div style="color:rgba(255,255,255,0.35); font-size:.75rem">Total XP: ${xpEarned} • ${3 - completed.size} challenge${3 - completed.size !== 1 ? 's' : ''} left</div>`;
        html += `</div>`;

        ctabs[currentChallenge].style.color = '#16A34A';
        ctabs[currentChallenge].style.borderColor = 'rgba(22,163,74,0.3)';
        ctabs[currentChallenge].style.background = '#F0FDF4';

        if (currentChallenge < CHALLENGES.length - 1) {
          setTimeout(() => loadChallenge(currentChallenge + 1), 2000);
        }
      } else if (pass) {
        html += `<div style="margin-top:12px; color:#4ade80; font-size:.78rem">✓ Already completed — nice consistency!</div>`;
      }
    }

    if (!html) {
      html = '<div style="color:rgba(255,255,255,0.3)">// Code ran with no output. Add console.log() to see results.</div>';
    }

    resultEl.innerHTML = html;
    resultEl.scrollTop = 0;
  }

  // Bind click AND keyboard shortcut
  runBtn.addEventListener('click', runCode);
  codeArea.addEventListener('keydown', e => {
    // Ctrl+Enter or Cmd+Enter to run
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runCode();
    }
  });

  /* ── Reset ── */
  resetBtn?.addEventListener('click', () => {
    codeArea.value = CHALLENGES[currentChallenge].starter;
    resultEl.innerHTML = '<span class="result-placeholder">// Reset. Click "Run" when ready.</span>';
    updateGutter();
  });

  /* ── Tab Switching ── */
  ctabs.forEach((tab, i) => {
    tab.addEventListener('click', () => loadChallenge(i));
  });

  /* ── Escape HTML ── */
  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  /* ── Init ── */
  loadChallenge(0);

})();
