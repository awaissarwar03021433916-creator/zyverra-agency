// Client testimonials shown on the homepage. The text is verbatim as supplied
// by the clients: do not edit, shorten, correct or rephrase it. Paragraphs are
// separated by a blank line ("\n\n") and rendered as separate <p> elements.

export type Testimonial = {
  id: string;
  name: string;
  clinic: string;
  website: string;
  text: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "belgrave-cosmetics",
    name: "Jo",
    clinic: "Belgrave Cosmetics",
    website: "https://www.belgravecosmetics.co.uk",
    text: `"I couldn't be happier with the work carried out on our website, www.belgravecosmetics.co.uk.

From start to finish, the whole process was professional, efficient and stress-free. He really understood what we were trying to achieve with the redevelopment and has transformed the website into something much more modern, professional and user-friendly.

Communication was excellent throughout, and nothing was ever too much trouble. He was patient with changes, offered helpful suggestions and really went the extra mile to make sure everything was just right.

It's refreshing to work with someone who genuinely cares about delivering a great result rather than just getting the job finished.

I would highly recommend him to anyone looking to build or improve their website. Thank you for doing such a fantastic job!"`,
  },
  {
    id: "penelope-j-aesthetics",
    name: "Penelope",
    clinic: "Penelope J Facial Aesthetics",
    website: "https://www.penelopejaesthetics.com",
    text: `"I've had such a lovely experience working with Awais at Zyverra Labs. From the very beginning, he's been friendly, professional and incredibly patient with all my ideas and little changes! Nothing has ever been too much trouble, and he's really taken the time to understand what I wanted for my business.

I'm absolutely delighted with my new website. It's everything I hoped for and more! I wouldn't hesitate to recommend Awais to anyone looking for a professional website and a genuinely lovely person to work with.

Thank you so much for everything! 🤍"`,
  },
  {
    id: "serra-aesthetics",
    name: "Berna Akici",
    clinic: "Serra Aesthetics",
    website: "https://www.serraaesthetics.co.uk",
    text: `"About a week ago, I met Awais on Instagram, and honestly, he was completely different from everyone else! ❤️ I had spoken to so many people about social media management, but most were only interested in selling packages. Awais, on the other hand, genuinely wanted to help me.

He explained everything step by step, never pressured me, and made me feel safe and confident throughout the process. Without asking for any personal information, he helped me with everything from my website to Google Maps while respecting my privacy.

I was so confused and worried about scams before meeting him, but now I finally feel at ease. 🥹✨

Awais, thank you so much for your honesty, patience, and genuine support. People like you are truly rare, and I feel incredibly lucky to have found you. You went above and beyond my expectations, and I can't thank you enough! ❤️🙏"`,
  },
];

/** The testimonial text without its enclosing quotation marks (for reviewBody). */
export const reviewBody = (t: Testimonial) => t.text.replace(/^"|"$/g, "");
