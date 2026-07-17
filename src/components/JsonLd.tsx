import React from 'react';

// Renders one or more schema.org JSON-LD objects as <script> tags. Server
// component — the data is app-controlled, so serialization is safe. The `<`
// escape guards against any string value prematurely closing the script tag.
export default function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, '\\u003c') }}
        />
      ))}
    </>
  );
}
