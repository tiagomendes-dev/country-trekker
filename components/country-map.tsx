import { getCountryBordersByName, getCountryByName } from "@/app/api/country";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("@/components/map"), {
  ssr: false,
});

export default async function CountryMap({
  params: { name },
}: {
  params: { name: string };
}) {
  const map = await getCountryByName(decodeURI(name));

  return (
    <div>
      <DynamicMap
        lan={map.capitalInfo.latlng[0] || 0}
        lon={map.capitalInfo.latlng[1] || 0}
      />
    </div>
  );
}
