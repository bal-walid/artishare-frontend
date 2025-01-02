'use client'
import { Input } from "@/components/ui/input";
import { useCallback, useRef } from "react";
import SimpleMdeReact from "react-simplemde-editor"
import SimpleMDE from "easymde"
import "easymde/dist/easymde.min.css";
import "@/app/_ui/stylesheets/easymde-override.css"

const options : SimpleMDE.Options =  {
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
}

const Editor = () => {
  const mdeInstanceRef = useRef<SimpleMDE | null>(null);
  const getMdeInstanceCallback = useCallback((simpleMde: SimpleMDE) => mdeInstanceRef.current = simpleMde, []);
  return (
    <main className="w-full max-w-[740px] mx-auto relative">
      <input autoFocus={true} className="mb-6 font-display !text-5xl focus-visible:outline-none"/>
      <SimpleMdeReact
          id="simplemde-editor"
            options={options}
            getMdeInstance={getMdeInstanceCallback}
          />
    </main>
  );
}
export default Editor;