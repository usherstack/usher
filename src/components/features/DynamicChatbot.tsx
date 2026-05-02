import React, { Suspense } from "react";

const Chatbot = React.lazy(() =>
  import("@/components/features/Chatbot").then(module => ({ default: module.Chatbot }))
);

export function DynamicChatbot() {
  return (
    <Suspense fallback={null}>
      <Chatbot />
    </Suspense>
  );
}
