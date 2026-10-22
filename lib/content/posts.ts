import { slugify } from "@/lib/utils";

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO yyyy-mm-dd
  image: string;
  body: ArticleBlock[];
  readTime: number; // derived
};

export const author = "Afaq Al Manzel Design Team";

type RawPost = Omit<Post, "readTime">;

const rawPosts: RawPost[] = [
  {
    slug: "planning-a-villa-renovation-in-dubai",
    title: "Planning a villa renovation in Dubai: a step-by-step guide",
    excerpt:
      "From approvals and budgets to sequencing works around family life, here is how a well-run villa renovation comes together.",
    category: "Guides",
    date: "2026-10-14",
    image: "/images/journal/villa-renovation.jpg",
    body: [
      {
        type: "paragraph",
        text: "A villa renovation is one of the most rewarding projects a Dubai homeowner can take on, and one of the easiest to get wrong. The difference between a smooth project and a stressful one is almost always decided before any work begins on site.",
      },
      { type: "heading", text: "Start with how you live, not how it looks" },
      {
        type: "paragraph",
        text: "Before mood boards and material samples, spend time on the brief. Which rooms feel cramped? Where does clutter collect? How will the household change over the next five years? A good designer will turn those answers into a layout before talking about finishes.",
      },
      { type: "heading", text: "Understand approvals early" },
      {
        type: "paragraph",
        text: "Most communities and master developers in Dubai require approval before internal works start, and anything touching structure, façades or MEP may need authority sign-off too. Building these timelines into the programme from day one avoids one of the most common causes of delay.",
      },
      {
        type: "list",
        items: [
          "Check your community or developer's fit-out guidelines",
          "Confirm whether structural or MEP changes need authority approval",
          "Allow time for approvals in the overall programme",
          "Keep copies of approved drawings on site",
        ],
      },
      { type: "heading", text: "Set a realistic budget, with a contingency" },
      {
        type: "paragraph",
        text: "Older villas often hide surprises behind walls and ceilings: outdated wiring, tired drainage or waterproofing that needs replacing. Holding back a contingency means discoveries on site don't force compromises elsewhere in the design.",
      },
      { type: "quote", text: "The best renovations are planned around the family's routine, not just the floor plan." },
      { type: "heading", text: "Sequence the works around family life" },
      {
        type: "paragraph",
        text: "If you plan to stay in the villa during works, phase the project so that one zone is always liveable. Noisy demolition can be scheduled for school hours, and kitchens and bathrooms can be completed in stages rather than all at once.",
      },
      {
        type: "image",
        src: "/images/journal/villa-renovation-2.jpg",
        alt: "Villa living room mid-renovation with protected flooring",
        caption: "Phasing the works keeps part of the home liveable throughout.",
      },
      { type: "heading", text: "Keep one point of contact" },
      {
        type: "paragraph",
        text: "Renovations stall when the designer, contractor and specialists each wait on one another. Working with a single turnkey team means one programme, one set of drawings and one person to call when decisions need to be made.",
      },
    ],
  },
  {
    slug: "turnkey-vs-separate-contractors",
    title: "Turnkey or separate contractors? What really changes",
    excerpt:
      "One team or several: how the choice affects cost control, timelines and who is accountable when something goes wrong.",
    category: "Insights",
    date: "2026-09-30",
    image: "/images/journal/turnkey.jpg",
    body: [
      {
        type: "paragraph",
        text: "One of the first decisions in any interior project is how to procure it: appoint a designer and then tender the works to separate contractors, or work with a single turnkey company from start to finish. Both routes can produce a beautiful result, but they feel very different along the way.",
      },
      { type: "heading", text: "The traditional route" },
      {
        type: "paragraph",
        text: "In the traditional model, a designer produces drawings and specifications, and a main contractor builds them, often alongside separate MEP, joinery and furniture suppliers. This gives you direct control over each appointment, but it also makes you responsible for coordinating them.",
      },
      { type: "heading", text: "What turnkey changes" },
      {
        type: "paragraph",
        text: "With a turnkey company, design, technical delivery and execution sit within one contract. The team that draws the details is the team that builds them, so questions are resolved internally rather than passed between firms.",
      },
      {
        type: "list",
        items: [
          "One contract and one programme",
          "Design decisions tested for cost and buildability early",
          "A single point of accountability",
          "Fewer variations caused by coordination gaps",
        ],
      },
      { type: "quote", text: "When something needs solving on site, the question is never whose responsibility it is." },
      { type: "heading", text: "When separate contractors can make sense" },
      {
        type: "paragraph",
        text: "If you already have a trusted designer, or the scope is limited to a single trade such as joinery, appointing specialists directly can work well. The key is being honest about how much coordination you are prepared to take on yourself.",
      },
      { type: "heading", text: "Questions to ask before you decide" },
      {
        type: "list",
        items: [
          "Who is responsible if the design and the site don't match?",
          "How are changes priced and approved?",
          "Who manages approvals and inspections?",
          "Who will you call after handover?",
        ],
      },
    ],
  },
  {
    slug: "materials-for-the-uae-climate",
    title: "Choosing finishes that last in the UAE climate",
    excerpt:
      "Heat, humidity and sand are hard on interiors. These are the materials and details that hold up year after year.",
    category: "Materials",
    date: "2026-09-12",
    image: "/images/journal/materials.jpg",
    body: [
      {
        type: "paragraph",
        text: "Heat, humidity, sand and intense sunlight are hard on interiors. Materials that perform well in milder climates can fade, warp or stain within a few seasons here, so specification matters as much as style.",
      },
      { type: "heading", text: "Timber and joinery" },
      {
        type: "paragraph",
        text: "Solid timber moves as humidity changes, especially near glazing or air-conditioning outlets. Engineered timber and quality veneers on stable boards hold their shape far better, giving the same warmth with much less risk.",
      },
      { type: "heading", text: "Stone and hard surfaces" },
      {
        type: "paragraph",
        text: "Natural stone suits the region beautifully, but porous stones need sealing and regular care. For kitchens and high-traffic areas, quartz and sintered stone offer the look of stone with far greater resistance to stains and heat.",
      },
      {
        type: "image",
        src: "/images/journal/materials-2.jpg",
        alt: "Stone, timber and fabric samples laid out on a table",
        caption: "Reviewing samples in the room's actual light helps avoid surprises.",
      },
      { type: "heading", text: "Fabrics and soft furnishings" },
      {
        type: "paragraph",
        text: "Strong sunlight fades natural fibres quickly. Solution-dyed and performance fabrics keep their colour, and they are easier to clean when sand inevitably finds its way indoors.",
      },
      {
        type: "list",
        items: [
          "Choose UV-resistant or performance fabrics near windows",
          "Use blackout or solar-control linings on curtains",
          "Rotate cushions and rugs seasonally",
          "Favour removable, washable covers",
        ],
      },
      { type: "quote", text: "A finish that looks perfect on the sample board needs to look just as good after five summers." },
      { type: "heading", text: "Details that make the difference" },
      {
        type: "paragraph",
        text: "Good ventilation behind joinery, proper waterproofing in wet areas and sealed thresholds at terrace doors all extend the life of an interior. They are rarely visible, but they are where experienced teams earn their keep.",
      },
    ],
  },
  {
    slug: "lighting-a-home-in-layers",
    title: "Lighting a home in layers: a designer's guide",
    excerpt:
      "Ambient, task and accent light working together is what makes a room feel finished. Here is how to plan all three.",
    category: "Design",
    date: "2026-08-28",
    image: "/images/journal/lighting.jpg",
    body: [
      {
        type: "paragraph",
        text: "Lighting is the fastest way to change how a room feels, yet it is often the last thing considered. Designing it in layers gives every space the flexibility to move from bright and practical to calm and atmospheric.",
      },
      { type: "heading", text: "Ambient light" },
      {
        type: "paragraph",
        text: "Ambient light provides the overall glow of a room. In most homes this comes from recessed downlights or concealed ceiling coves. The aim is even, comfortable light without glare.",
      },
      { type: "heading", text: "Task light" },
      {
        type: "paragraph",
        text: "Task lighting is focused where you work: kitchen counters, reading chairs, vanity mirrors and desks. Under-cabinet strips and adjustable lamps make everyday jobs easier and reduce eye strain.",
      },
      { type: "heading", text: "Accent light" },
      {
        type: "paragraph",
        text: "Accent lighting draws attention to texture, art and architecture. Wall washers on stone, picture lights and lit joinery shelves add depth and make a space feel complete.",
      },
      { type: "quote", text: "A well-lit room is one where you notice the space, not the light fittings." },
      { type: "heading", text: "Warmth and control" },
      {
        type: "list",
        items: [
          "Choose a warm colour temperature, around 2700–3000K, for living spaces",
          "Put each layer on its own circuit or lighting scene",
          "Use dimmers throughout, not just in the living room",
          "Plan switch positions around how you move through the home",
        ],
      },
      {
        type: "paragraph",
        text: "Planned early, lighting is built cleanly into ceilings and joinery. Added late, it usually means compromises, so it belongs in the design from the very first layout.",
      },
    ],
  },
  {
    slug: "designing-restaurant-interiors-that-last",
    title: "Designing restaurant interiors that survive a busy service",
    excerpt:
      "Atmosphere brings guests in; durability keeps the room looking right. How to design a restaurant that does both.",
    category: "Hospitality",
    date: "2026-08-10",
    image: "/images/journal/restaurant.jpg",
    body: [
      {
        type: "paragraph",
        text: "A restaurant interior has to do two jobs at once: create an atmosphere guests remember, and survive hundreds of covers a day. The best hospitality spaces are designed for both from the start.",
      },
      { type: "heading", text: "Plan around the service, not just the seating" },
      {
        type: "paragraph",
        text: "Before choosing a single finish, map how staff move between kitchen, bar and tables. Clear service routes reduce collisions, speed up turnover and make the room feel calmer for guests.",
      },
      { type: "heading", text: "Choose finishes that can take it" },
      {
        type: "paragraph",
        text: "Tabletops, banquettes and floors take the hardest wear. Commercial-grade upholstery, sealed timber and durable stone keep their good looks far longer than residential equivalents.",
      },
      {
        type: "list",
        items: [
          "Specify commercial-rated fabrics with high rub counts",
          "Use removable covers on banquette seating",
          "Choose floors that are slip-resistant and easy to clean",
          "Protect corners and edges along service routes",
        ],
      },
      {
        type: "image",
        src: "/images/journal/restaurant-2.jpg",
        alt: "Restaurant banquette seating under warm pendant lighting",
        caption: "Banquettes add character and seat more guests per square metre.",
      },
      { type: "heading", text: "Design the acoustics" },
      {
        type: "paragraph",
        text: "Hard surfaces look sleek but quickly make a full room uncomfortably loud. Acoustic ceilings, upholstered seating and soft wall finishes keep conversation easy even at peak times.",
      },
      { type: "quote", text: "Guests remember how a restaurant felt long after they forget what they ordered." },
      { type: "heading", text: "Think about maintenance from day one" },
      {
        type: "paragraph",
        text: "Access panels for services, replaceable components and a clear finishes schedule make it easier to keep the space looking new. A little planning now saves closures and costly repairs later.",
      },
    ],
  },
];

/* ---------- derived data & helpers ---------- */

const WORDS_PER_MINUTE = 220;

function readingTime(body: ArticleBlock[]) {
  const text = body
    .map((b) => (b.type === "list" ? b.items.join(" ") : b.type === "image" ? (b.caption ?? "") : b.text))
    .join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / WORDS_PER_MINUTE));
}

export const posts: Post[] = rawPosts
  .map((post) => ({ ...post, readTime: readingTime(post.body) }))
  .sort((a, b) => b.date.localeCompare(a.date));

export const latestPosts = (count = 3) => posts.slice(0, count);

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export function relatedPosts(slug: string, count = 3) {
  const current = getPost(slug);
  const others = posts.filter((p) => p.slug !== slug);
  const sameCategory = others.filter((p) => p.category === current?.category);
  const rest = others.filter((p) => p.category !== current?.category);
  return [...sameCategory, ...rest].slice(0, count);
}

export const headingsOf = (post: Post) =>
  post.body
    .filter((b): b is Extract<ArticleBlock, { type: "heading" }> => b.type === "heading")
    .map((b) => ({ id: slugify(b.text), text: b.text }));