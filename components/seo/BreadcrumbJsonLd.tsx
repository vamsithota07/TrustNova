import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

type BreadcrumbJsonLdProps = {
  pageName: string;
  pagePath: string;
};

export default function BreadcrumbJsonLd({ pageName, pagePath }: BreadcrumbJsonLdProps) {
  return <JsonLd data={breadcrumbSchema(pagePath, pageName)} />;
}
