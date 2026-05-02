import React, { Suspense } from "react";
import { Loader } from "@/components/shared/Loader";

const TestimonialsSlider = React.lazy(() =>
  import("@/components/animations/TestimonialsSlider").then(module => ({ default: module.TestimonialsSlider }))
);

export function DynamicTestimonials({ testimonials }) {
    return (
      <Suspense fallback={<div className="w-full h-96 flex items-center justify-center"><Loader /></div>}>
        <TestimonialsSlider testimonials={testimonials} />
      </Suspense>
    );
  }
