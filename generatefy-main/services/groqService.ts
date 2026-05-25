type GroqMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

type GroqTextOptions = {
  prompt: string;
  system?: string;
  customApiKey?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  json?: boolean;
};

const getBrowserGroqKey = () => {
  const env = (import.meta as any).env || {};
  return env.VITE_GROQ_API_KEY || '';
};

export async function generateGroqText({
  prompt,
  system,
  customApiKey,
  model,
  temperature = 0.3,
  maxTokens = 8192,
  json = false,
}: GroqTextOptions): Promise<string> {
  const messages: GroqMessage[] = [];
  if (system?.trim()) {
    messages.push({ role: 'system', content: system.trim() });
  }
  messages.push({ role: 'user', content: prompt });

  const response = await fetch('/api/groq/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages,
      model,
      temperature,
      maxTokens,
      responseFormat: json ? { type: 'json_object' } : undefined,
      apiKey: customApiKey?.trim() || getBrowserGroqKey() || undefined,
    }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = payload?.message || payload?.error || 'Falha ao gerar com Groq.';
    throw new Error(String(message));
  }

  return String(payload.text || '');
}

export function extractJsonObject(text: string) {
  const cleaned = text.replace(/```json|```/gi, '').trim();
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    return cleaned.slice(firstBrace, lastBrace + 1);
  }
  return cleaned;
}
