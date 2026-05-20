'use client';

async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  // Fallback para browsers/contextos sem Clipboard API
  const el = document.createElement('textarea');
  el.value = text;
  el.style.position = 'fixed';
  el.style.opacity = '0';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

export function CopyButton({ value, onCopied }: { value: string; onCopied: () => void }) {
  const handleClick = async () => {
    try {
      await copyToClipboard(value);
      onCopied();
    } catch {
      // silencia — o usuário simplesmente não vê o toast de confirmação
    }
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
    >
      Copiar
    </button>
  );
}
