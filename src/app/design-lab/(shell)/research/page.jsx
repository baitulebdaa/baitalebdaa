"use client";
import { useRouter } from "next/navigation";
import { Research } from "../../Studies";
import { servicePageVariants, LAB } from "../../../../lib/design-lab/registry";
import { PageHeader } from "../../../../components/design-lab/ui";

export default function ResearchPage() {
  const router = useRouter();
  return <>
    <PageHeader title="Design research" description="Source observations and working service-page directions." />
    <div className="research-collection">
      <Research inspect={index => router.push(LAB + "/service-pages/" + servicePageVariants[index].id)} />
      <a href={LAB + "/studies"}>Open the earlier study workspace</a>
    </div>
  </>;
}