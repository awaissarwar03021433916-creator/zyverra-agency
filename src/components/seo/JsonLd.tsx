// Server component that emits a JSON-LD <script>. Accepts a single schema
// object or an array of them. "<" is escaped so content can never close the
// script element early.
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
