"use client";
import { Input } from "@/components/ui/input";
import { useCallback, useRef, useEffect } from "react";
import SimpleMdeReact from "react-simplemde-editor";
import SimpleMDE from "easymde";
import "easymde/dist/easymde.min.css";
import "@/app/_ui/stylesheets/easymde-override.css";

const options: SimpleMDE.Options = {
  spellChecker: false,
  status: false,
  toolbar: [
    "bold",
    "italic",
    "heading",
    "|",
    "quote",
    "unordered-list",
    "ordered-list",
    "|",
    "link",
    "guide",
    "|",
  ],
};

const updateLineClass = (cm: CodeMirror.Editor, lineNum: number) => {
  cm.removeLineClass(lineNum, "text", "line-header1");
  cm.removeLineClass(lineNum, "text", "line-header2");
  cm.removeLineClass(lineNum, "text", "line-header3");
  cm.removeLineClass(lineNum, "text", "line-header4");
  cm.removeLineClass(lineNum, "text", "line-header5");
  cm.removeLineClass(lineNum, "text", "line-header6");
  cm.removeLineClass(lineNum, "text", "line-ul");
  cm.removeLineClass(lineNum, "text", "line-ol");
  cm.removeLineClass(lineNum, "text", "line-quote");
  cm.removeLineClass(lineNum, "text", "line-paragraph");

  const tokens = cm.getLineTokens(lineNum);

  // Add appropriate class based on tokens
  tokens.forEach((token) => {
    let hasSpecialFormatting = false;

    if (token.type) {
      if (token.type.includes("header-1")) {
        cm.addLineClass(lineNum, "text", "line-header1");
        hasSpecialFormatting = true;
      } else if (token.type.includes("header-2")) {
        cm.addLineClass(lineNum, "text", "line-header2");
        hasSpecialFormatting = true;
      } else if (token.type.includes("header-3")) {
        cm.addLineClass(lineNum, "text", "line-header3");
        hasSpecialFormatting = true;
      } else if (token.type.includes("header-4")) {
        cm.addLineClass(lineNum, "text", "line-header4");
        hasSpecialFormatting = true;
      } else if (token.type.includes("header-5")) {
        cm.addLineClass(lineNum, "text", "line-header5");
        hasSpecialFormatting = true;
      } else if (token.type.includes("header-6")) {
        cm.addLineClass(lineNum, "text", "line-header6");
        hasSpecialFormatting = true;
      } else if (token.type.includes("formatting-list-ul")) {
        cm.addLineClass(lineNum, "text", "line-ul");
        hasSpecialFormatting = true;
      } else if (token.type.includes("formatting-list-ol")) {
        cm.addLineClass(lineNum, "text", "line-ol");
        hasSpecialFormatting = true;
      } else if (token.type.includes("quote")) {
        cm.addLineClass(lineNum, "text", "line-quote");
        hasSpecialFormatting = true;
      }
    }

    if (!hasSpecialFormatting) {
      cm.addLineClass(lineNum, "text", "line-paragraph");
    }
  });
};

const Editor = () => {
  const mdeInstanceRef = useRef<SimpleMDE | null>(null);
  const cmInstanceRef = useRef<CodeMirror.Editor | null>(null);

  const getMdeInstanceCallback = useCallback((simpleMde: SimpleMDE) => {
    mdeInstanceRef.current = simpleMde;
    cmInstanceRef.current = simpleMde.codemirror;

    // Set up the change handler
    if (cmInstanceRef.current) {
      cmInstanceRef.current.on("change", (cm, changeObj) => {
        const from = changeObj.from.line;
        const to = changeObj.to.line;

        // Update classes for changed lines
        for (let i = from; i <= to; i++) {
          updateLineClass(cm, i);
        }
      });
    }
  }, []);

  return (
    <main className="w-full max-w-[740px] mx-auto relative">
      <input
        placeholder="Your Story's Title..."
        autoFocus={true}
        className="mb-6 font-display !text-5xl focus-visible:outline-none"
      />
      <SimpleMdeReact
        id="simplemde-editor"
        options={options}
        getMdeInstance={getMdeInstanceCallback}
      />
    </main>
  );
};

export default Editor;
