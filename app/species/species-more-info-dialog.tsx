"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Database } from "@/lib/schema";
import { useState } from "react";

type Speices = Database["public"]["Tables"]["species"]["Row"];

export function SpeciesMoreInfoDialog({ species }: { species: Speices }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)} className="mt-3 w-full">
        Learn More
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{species.scientific_name}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p>
              <strong>Common Name:</strong> {species.common_name}
            </p>
            <p>
              <strong>Kingdom:</strong> {species.kingdom}
            </p>
            <p>
              <strong>Total Population:</strong> {species.total_population}
            </p>
            <p>
              <strong>Endangered:</strong> {species.endangered ? "Yes" : "No"}
            </p>
            <p>
              <strong>Description:</strong> {species.description}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
