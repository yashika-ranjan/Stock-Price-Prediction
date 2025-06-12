import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FileUpload = ({ onFileUpload }: { onFileUpload: (file: File) => void }) => {
  return (
    <div className="space-y-2">
      <Label>Upload CSV</Label>
      <Input type="file" accept=".csv" onChange={(e) => {
        if (e.target.files?.[0]) onFileUpload(e.target.files[0]);
      }} />
    </div>
  );
};

export default FileUpload;
