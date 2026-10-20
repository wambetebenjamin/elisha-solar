import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { blogPosts, formatDate, getPost } from "@/data/blog";
import { whatsappLink } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return { title: "Article not found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        crumbs={[
          { href: "/blog", label: "Insights" },
          { href: `/blog/${post.slug}`, label: post.category },
        ]}
      />

      <article className="mx-auto max-w-3xl px-6 py-14">
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {post.readMinutes} minute read
          </span>
          <span>Elisha Solar engineering team</span>
        </div>

        <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-[4px]">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <div className="prose-solar mt-10">
          {post.body.map((section, index) => (
            <section key={index}>
              {section.heading && (
                <h2 className="font-[Roboto] text-2xl font-bold text-ink">
                  {section.heading}
                </h2>
              )}
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-[4px] bg-light p-6">
          <p className="font-[Roboto] text-lg font-bold text-ink">
            Want this answered for your own property?
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            A free site assessment gives you measured numbers instead of averages. We visit, read
            your bills and quote a fixed price.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/quote" className="btn-brand !py-2.5 text-sm">
              Book an assessment
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost !py-2.5 text-sm"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>

        <Link
          href="/blog"
          className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-brand-deep"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to all insights
        </Link>

        <div className="mt-12 border-t border-line pt-8">
          <h2 className="font-[Roboto] text-sm font-bold uppercase tracking-wide text-ink">
            Keep reading
          </h2>
          <ul className="mt-4 space-y-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/blog/${item.slug}`}
                  className="font-semibold text-muted hover:text-brand-ink"
                >
                  {item.title}
                </Link>
                <p className="text-xs text-faint">{item.category}</p>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </>
  );
}
