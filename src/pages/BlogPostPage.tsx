import { Navigate, useParams } from "react-router-dom";
import { BlogArticle, Footer, Header } from "../components";
import {
  blogPath,
  getBlogPost,
  getBlogPublicSlug,
  resolveBlogSlug,
} from "../content/blog";
import { articleDocumentBySlug } from "../seo/articles";
import { DocumentSeo } from "../seo/DocumentSeo";
import { NotFoundPage } from "./NotFoundPage";

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const contentSlug = slug ? resolveBlogSlug(slug) : undefined;
  const post = contentSlug ? getBlogPost(contentSlug) : undefined;
  const seoDocument = contentSlug ? articleDocumentBySlug(contentSlug) : undefined;
  const publicSlug = contentSlug ? getBlogPublicSlug(contentSlug) : undefined;

  // Normalize legacy Persian (or mistyped) URLs onto the ASCII public slug.
  if (publicSlug && slug !== publicSlug) {
    return <Navigate to={blogPath(contentSlug!)} replace />;
  }

  if (!contentSlug || !post || !post.published || !seoDocument) {
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
