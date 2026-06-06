"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createTrip } from "@/lib/actions/create-trip";
import { UploadButton } from "@/lib/upload-thing";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useTransition } from "react";

function NewTrip() {
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  
  // if (!session) return <h2>Please sing in first...!</h2>;
  return (
    <div className="max-w-lg mx-auto mt-10">
      <Card>
        <CardHeader>New Trip</CardHeader>
        <CardContent>
          <form
            className="space-y-6"
            action={(formData: FormData) => {
              if (imageUrl) {
                formData.append("imageUrl", imageUrl);
              }
              startTransition(() => {
                createTrip(formData);
              });
            }}
          >
            <div>
              <label className="text-sm block font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                className={cn(
                  "w-full border border-gray-300 px-3 py-2",
                  "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                )}
                required
              />
            </div>
            <div>
              <label className="text-sm block font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                className={cn(
                  "w-full border border-gray-300 px-3 py-2",
                  "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                )}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="text-sm block font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  className={cn(
                    "w-full border border-gray-300 px-3 py-2",
                    "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                  )}
                />
              </div>
              <div>
                <label className="text-sm block font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  className={cn(
                    "w-full border border-gray-300 px-3 py-2",
                    "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                  )}
                />
              </div>
            </div>
            <div>
              <label>Image Trip</label>
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Trip image"
                  className="w-full mb-4 rounded-md"
                />
              )}
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res[0].ufsUrl) {
                    setImageUrl(res[0].ufsUrl);
                  }
                }}
                onUploadError={(error: Error) => {
                  console.log("upload error", error);
                }}
              />
            </div>
            <Button type="submit" className="w-full py-4 cursor-pointer" disabled={isPending}>
              {isPending ? "Creating..." : "Submit Trip"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default NewTrip;
