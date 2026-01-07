import { useEffect, useRef } from "react";

interface AdBlockProps {
  blockId: string;
  className?: string;
}

const AdBlock = ({ blockId, className = "" }: AdBlockProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedBlocks = localStorage.getItem("adBlocks");
    let adCode = "";

    if (savedBlocks) {
      const blocks = JSON.parse(savedBlocks);
      adCode = blocks[blockId] || "";
    }

    if (adCode && containerRef.current) {
      containerRef.current.innerHTML = adCode;

      const scripts = containerRef.current.querySelectorAll("script");
      scripts.forEach((oldScript) => {
        const newScript = document.createElement("script");
        Array.from(oldScript.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value);
        });
        newScript.textContent = oldScript.textContent;
        oldScript.parentNode?.replaceChild(newScript, oldScript);
      });
    } else if (containerRef.current) {
      containerRef.current.innerHTML = `
        <div class="p-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
          <p class="text-sm text-yellow-800 font-medium text-center">📢 Реклама</p>
        </div>
      `;
    }
  }, [blockId]);

  return <div ref={containerRef} className={className} />;
};

export default AdBlock;
