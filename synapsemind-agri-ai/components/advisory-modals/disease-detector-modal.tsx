"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { predictDisease } from "@/utils/api";

export function DiseaseDetectorModal({ open, onOpenChange }: { open: boolean, onOpenChange: (o: boolean) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string>("");

  const handlePredict = async () => {
    if (!file) return;
    const res = await predictDisease(file);
    setResult(res.result);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crop Disease Detector</DialogTitle>
        </DialogHeader>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4"
        />

        <Button onClick={handlePredict} disabled={!file}>
          Detect Disease
        </Button>

        {result && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <p className="font-bold">Result:</p>
            <p>{result}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
