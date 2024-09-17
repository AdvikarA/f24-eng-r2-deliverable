"use client";
/*
Note: "use client" is a Next.js App Router directive that tells React to render the component as
a client component rather than a server component. This establishes the server-client boundary,
providing access to client-side functionality such as hooks and event handlers to this component and
any of its imported children. Although the SpeciesCard component itself does not use any client-side
functionality, it is beneficial to move it to the client because it is rendered in a list with a unique
key prop in species/page.tsx. When multiple component instances are rendered from a list, React uses the unique key prop
on the client-side to correctly match component state and props should the order of the list ever change.
React server components don't track state between rerenders, so leaving the uniquely identified components (e.g. SpeciesCard)
can cause errors with matching props and state in child components if the list order changes.
*/
import type { Database } from "@/lib/schema";
import Image from "next/image";
import { useState } from "react";
import SpeciesFormDialog from "./add-species-dialog";
import { SpeciesMoreInfoDialog } from "./species-more-info-dialog";
type Species = Database["public"]["Tables"]["species"]["Row"];

export default function SpeciesCard({
  species,
  isAuthor,
  userId,
}: {
  species: Species;
  isAuthor: boolean;
  userId: string;
}) {
  //hover state
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="relative m-4 flex w-72 flex-col rounded border-2 bg-black p-3 text-white shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-3 h-40 w-full">
        {species.image && (
          <>
            <Image src={species.image} alt={species.scientific_name} fill style={{ objectFit: "cover" }} />
            <div
              className={`absolute inset-0 bg-black transition-opacity duration-500 ${
                isHovered ? "opacity-70" : "opacity-0"
              }`}
            ></div>
            <div
              className={`absolute inset-0 flex items-center justify-center p-4 transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <p className="max-h-full overflow-y-auto text-center text-sm leading-tight text-white">
                {species.description}
              </p>
            </div>
          </>
        )}
      </div>
      <h3 className="text-2xl font-semibold">{species.scientific_name}</h3>
      <h4 className="mb-2 text-lg font-light italic">{species.common_name}</h4>
      <div className="mt-2 flex flex-col gap-2">
        <SpeciesMoreInfoDialog species={species} />

        {
          //idk why there is an error
          isAuthor && <SpeciesFormDialog userId={userId} species={species} mode="edit" />
        }
      </div>
    </div>
  );
}
