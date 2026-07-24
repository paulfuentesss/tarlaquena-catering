// Placeholder copy — TODO: replace with the real chef bio and company story.
export type AboutStory = {
  eyebrow?: string;
  greeting: string;
  paragraphs: string[];
};

export const chefBio: AboutStory = {
  eyebrow: "About the Chef",
  greeting: "Heya 👋",
  paragraphs: [
    "I'm the chef behind Tarlaquena Catering, and I like to think of every plate as a small act of hospitality. I'm someone who thrives on turning family recipes into dishes that feel both familiar and special, and I'm passionate about sharing the flavors I grew up with.",
    "What drives me is a fascination with how food brings people together — whether it's the excitement of a first bite at a wedding, the comfort of a home-style dish at a reunion, or the joy of watching guests go back for seconds. When I'm not in the kitchen, you'll probably find me testing new recipes, sourcing ingredients, or planning the next event's menu. I'm always curious, always cooking, and always looking to make the next gathering unforgettable.",
  ],
};

export const companyStory: AboutStory = {
  eyebrow: "About the Catering Company",
  greeting: "Our Story",
  paragraphs: [
    "Tarlaquena Catering started with a simple idea: bring restaurant-quality Filipino food to every kind of celebration, from intimate family gatherings to large fiestas. What began as a small operation has grown into a full-service catering team, but the mission hasn't changed.",
    "We believe great catering is about more than food — it's about showing up, taking care of the details, and making sure every guest feels welcomed. That's the standard we hold ourselves to on every event, big or small.",
  ],
};
