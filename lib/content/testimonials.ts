export type Testimonial = {
  quote: string;
  name: string;
  project: string;
  location: string;
  image: string;
};

// ⚠️ PLACEHOLDER CONTENT — layout testing only.
// Replace every entry with a real, client-approved review before launch.
// Never publish invented testimonials.
export const testimonials: Testimonial[] = [
  {
    quote:
      "From the first site visit to handover, we dealt with one team who knew every detail of our villa. The finish is exactly what we saw in the renders.",
    name: "Client Name",
    project: "Villa interior & fit-out",
    location: "Dubai Hills",
    image: "/images/testimonials/01.jpg",
  },
  {
    quote:
      "They planned our office around how our team actually works. The build ran on schedule and we moved in without losing a working day.",
    name: "Client Name",
    project: "Office fit-out",
    location: "Business Bay",
    image: "/images/testimonials/02.jpg",
  },
  {
    quote:
      "Our restaurant needed to feel warm yet survive a busy service every night. The materials, lighting and layout have held up beautifully.",
    name: "Client Name",
    project: "Restaurant interior",
    location: "Jumeirah",
    image: "/images/testimonials/03.jpg",
  },
  {
    quote:
      "Having design, MEP and joinery under one roof made the renovation far less stressful than we expected. Communication was clear throughout.",
    name: "Client Name",
    project: "Apartment renovation",
    location: "Dubai Marina",
    image: "/images/testimonials/04.jpg",
  },
];