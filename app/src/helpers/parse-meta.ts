export default function parseMeta(meta: string): Record<string, any> {
  try {
    return JSON.parse(meta);
  } catch (error) {
    return {};
  }
}
