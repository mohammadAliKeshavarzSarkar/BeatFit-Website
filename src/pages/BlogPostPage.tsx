import { Navigate, useParams } from "react-router-dom";
import { BlogArticle, Footer, Header } from "../components";
import { getBlogPost, resolveBlogSlug } from "../content/blog";
import { articleDocumentBySlug } from "../seo/articles";
import { DocumentSeo } from "../seo/DocumentSeo";
import { NotFoundPage } from "./NotFoundPage";

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const canonicalSlug = slug ? resolveBlogSlug(slug) : undefined;
  const post = canonicalSlug ? getBlogPost(canonicalSlug) : undefined;
  const seoDocument = canonicalSlug ? articleDocumentBySlug(canonicalSlug) : undefined;

  if (canonicalSlug && slug !== canonicalSlug) {
    return <Navigate to={`/blog/${canonicalSlug}`} replace />;
  }

  if (!post || !post.published || !seoDocument) {
    return <NotFoundPage />;
  }

  return (
    <>
      <DocumentSeo document={seoDocument} />
      <Header solid />
      <main className="bf-blog-post-page">
        <BlogArticle post={post} />
      </main>
      <Footer />
    </>
  );
}
