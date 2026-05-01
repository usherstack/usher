import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface PreviewModalProps {
  url: string;
  title: string;
  trigger?: React.ReactNode;
}

export function PreviewModal({ url, title, trigger }: PreviewModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2">
            <Eye className="w-4 h-4" /> Live Preview
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] w-[1200px] h-[85vh] p-0 overflow-hidden border-border/50 bg-background/95 backdrop-blur-xl">
        <DialogHeader className="p-4 border-b border-border/50 absolute top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-10 flex flex-row items-center justify-between">
          <div>
            <DialogTitle className="text-lg">{title}</DialogTitle>
            <DialogDescription className="sr-only">Preview of {title}</DialogDescription>
          </div>
          <div className="flex gap-2">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm">Open in new tab</Button>
            </a>
          </div>
        </DialogHeader>
        <div className="w-full h-full pt-[73px]">
          <iframe 
            src={url} 
            className="w-full h-full border-0 bg-white" 
            title={`Preview of ${title}`}
            loading="lazy"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
