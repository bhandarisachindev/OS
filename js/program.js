
document.querySelectorAll(".apps-div").forEach(ele=>{
  stopMouseEvents(ele);
});

function stopMouseEvents(target) {
  target.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  target.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    e.stopPropagation();
  }, { passive: false }); 
}



document.addEventListener('DOMContentLoaded', () => {
  const codeEditor = document.getElementById('code-editor');
  const lineNumbers = document.querySelector('.line-numbers');
  const runCodeBtn = document.getElementById('run-code');
  const terminalOutput = document.getElementById('terminal-output');
  const tabs = document.querySelectorAll('.tab');
  const terminalTabs = document.querySelectorAll('.terminal-tab');
  const terminalPanel = document.querySelector('.terminal-panel');
  const resizeHandle = document.querySelector('.resize-handle');

  highlightCode();

  terminalOutput.textContent = 'Hello! Harsh Bhaiya';

  codeEditor.addEventListener('input', () => {
    highlightCode();
    updateCursorPosition();
  });

  codeEditor.addEventListener('paste', (e) => {
    setTimeout(() => {
      codeEditor.style.height = 'auto';
      codeEditor.style.height = codeEditor.scrollHeight + 'px';
      highlightCode();
      updateCursorPosition();
    }, 10);
  });

  codeEditor.addEventListener('keydown', handleTabKey);

  runCodeBtn.addEventListener('click', runJavaScriptCode);

  tabs.forEach(tab => {
    tab.addEventListener('click', () => setActiveTab(tab));
    const closeBtn = tab.querySelector('.close-tab');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeTab(tab);
      });
    }
  });

  terminalTabs.forEach(tab => {
    tab.addEventListener('click', () => setActiveTerminalTab(tab));
  });




  function highlightCode() {
    const tempPre = document.createElement('pre');
    const tempCode = document.createElement('code');
    tempCode.className = 'language-javascript';
    tempCode.textContent = codeEditor.value;
    tempPre.appendChild(tempCode);
    hljs.highlightElement(tempCode);
  }

  function updateCursorPosition() {
    const text = codeEditor.value;
    const cursorPosition = codeEditor.selectionStart;
    let line = 1;
    let col = 1;
    for (let i = 0; i < cursorPosition; i++) {
      if (text[i] === '\n') {
        line++;
        col = 1;
      } else {
        col++;
      }
    }
    document.querySelector('.right .status-item:last-child').textContent = `Ln ${line}, Col ${col}`;
  }

  function handleTabKey(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = codeEditor.selectionStart;
      const end = codeEditor.selectionEnd;
      codeEditor.value = codeEditor.value.substring(0, start) + '    ' + codeEditor.value.substring(end);
      codeEditor.selectionStart = codeEditor.selectionEnd = start + 4;
      updateLineNumbers();
      highlightCode();
    }
  }

  function runJavaScriptCode() {
    const code = codeEditor.value;
    terminalOutput.innerHTML = '';
    const originalConsoleLog = console.log;
    const logs = [];
    console.log = function() {
      logs.push(Array.from(arguments).join(' '));
      originalConsoleLog.apply(console, arguments);
    };
    try {
      const result = eval(code);
      logs.forEach(log => {
        const logElement = document.createElement('div');
        logElement.textContent = log;
        terminalOutput.appendChild(logElement);
      });
      if (result !== undefined) {
        const resultElement = document.createElement('div');
        resultElement.textContent = `> ${result}`;
        resultElement.style.color = '#6A9955';
        terminalOutput.appendChild(resultElement);
      }
    } catch (error) {
      const errorElement = document.createElement('div');
      errorElement.textContent = `Error: ${error.message}`;
      errorElement.style.color = '#f44747';
      terminalOutput.appendChild(errorElement);
    } finally {
      console.log = originalConsoleLog;
    }
  }

  function setActiveTab(activeTab) {
    tabs.forEach(tab => tab.classList.remove('active'));
    activeTab.classList.add('active');
  }

  function closeTab(tab) {
    alert('Tab closed: ' + tab.getAttribute('data-filename'));
  }

  function setActiveTerminalTab(activeTab) {
    terminalTabs.forEach(tab => tab.classList.remove('active'));
    activeTab.classList.add('active');
  }

  updateCursorPosition();
});
