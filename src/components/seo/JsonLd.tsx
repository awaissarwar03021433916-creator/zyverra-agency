// Server component that emits a JSON-LD <script>. Accepts a single schema
// object or an array of them. Invisible — no UI impact.
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
