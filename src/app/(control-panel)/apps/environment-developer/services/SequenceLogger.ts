export function createLogger(ref: React.RefObject<HTMLDivElement>) {
  return (text: string) => {
    if (!ref.current) return;
    const lines = text.split('\n');
    lines.forEach(line => {
      const div = document.createElement('div');
      div.textContent = line || ' ';
      div.style.cssText = `...your existing styles...`;
      ref.current!.appendChild(div);
    });
    ref.current.scrollTop = ref.current.scrollHeight;
  };
}