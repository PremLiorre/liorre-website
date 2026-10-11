import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPolicy, publishedPolicies } from "@/lib/policies";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return publishedPolicies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/policies/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const policy = getPolicy(slug);
  return policy ? { title: policy.title } : {};
}

export default async function PolicyPage(props: PageProps<"/policies/[slug]">) {
  const { slug } = await props.params;
  const policy = getPolicy(slug);
  if (!policy) notFound();

  const blocks = policy.body.trim().split(/\n\s*\n/);

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-bold">{policy.title}</h1>
      {policy.updated && <p className="mt-2 text-sm text-gray-500">Last updated: {policy.updated}</p>}
      <div className="mt-8 space-y-5 text-gray-700 leading-7">
        {blocks.map((block, i) => {
          const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
          if (lines[0].startsWith("## ")) {
            return (
              <div key={i}>
                <h2 className="text-xl font-bold text-black mt-4">{lines[0].slice(3)}</h2>
                {lines.length > 1 && <Lines lines={lines.slice(1)} />}
              </div>
            );
          }
          return <Lines key={i} lines={lines} />;
        })}
      </div>

      {policy.slug !== "contact" && (
        <p className="mt-12 pt-6 border-t border-gray-100 text-gray-600">
          Questions about this policy? Email us at{" "}
          <a href={`mailto:${SITE.email}`} className="text-amber-700 font-semibold hover:underline">
            {SITE.email}
          </a>
          .
        </p>
      )}
    </main>
  );
}

function Lines({ lines }: { lines: string[] }) {
  if (lines.every((l) => l.startsWith("- "))) {
    return (
      <ul className="list-disc pl-6 space-y-1">
        {lines.map((l, i) => (
          <li key={i}>{l.slice(2)}</li>
        ))}
      </ul>
    );
  }
  return <p className="whitespace-pre-line">{lines.join("\n")}</p>;
}
