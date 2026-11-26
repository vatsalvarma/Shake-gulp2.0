export interface DrinkIngredient {
  image: string;
  labels: string[];
}

export interface DrinkParagraph {
  text: string;
  isBold?: boolean;
  isNote?: boolean;
}

export interface DrinkInfoBlock {
  title: string;
  introParagraphs: string[];
  listItems: string[];
  bodyParagraphs: DrinkParagraph[];
}

export interface DrinkSuggestion {
  slug: string;
  image: string;
  label: string;
}

export interface DrinkData {
  slug: string;
  category: 'traditional' | 'wellness';
  name: string;
  bottleImage: string;
  bottleAlt: string;
  tagline: string;
  ingredients: DrinkIngredient[];
  specialTitle: string;
  specialParagraphs: string[];
  infoBlocks: DrinkInfoBlock[];
  suggestions: DrinkSuggestion[];
  prevSlug: string;
  nextSlug: string;
}

export const DRINK_PAGE_BG = '/assets/images/buttermilkbackground.png';
export const FSSAI_LOGO = '/fssai.png';

export function drinkNameToSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

export const DRINKS_DATA: DrinkData[] = [
  {
    "slug": "jeera-buttermilk",
    "category": "traditional",
    "name": "Jeera Buttermilk",
    "bottleImage": "/assets/images/Jeera-butermilk-shots-544x652.png",
    "bottleAlt": "Jeera Buttermilk Drink Bottle",
    "tagline": "The cooling comfort your gut has been waiting for.",
    "ingredients": [
      {
        "image": "/drinks/images/water.jpeg",
        "labels": [
          "Water"
        ]
      },
      {
        "image": "/drinks/images/curd.jpeg",
        "labels": [
          "Curd"
        ]
      },
      {
        "image": "/drinks/images/rosted jeera.jpeg",
        "labels": [
          "Roasted Jeera"
        ]
      },
      {
        "image": "/drinks/images/salt2.jpeg",
        "labels": [
          "Salt"
        ]
      }
    ],
    "specialTitle": "What’s Special About This Drink?",
    "specialParagraphs": [
      "Jeera Buttermilk is a staple for a reason. We’ve stayed true to the classic ritual of blending house-made curd with hand-roasted cumin seeds. It is that familiar and earthy taste that helps settle your stomach and provides a sense of clarity after a large meal. We focus on using authentic ingredients and avoid artificial powders or additives to keep the tradition honest.",
      "At Shake & Gulp, we keep things simple by using real ingredients and preparing every bottle fresh."
    ],
    "infoBlocks": [
      {
        "title": "Health Benefits",
        "introParagraphs": [],
        "listItems": [
          "Roasted Jeera (Cumin) acts as a natural aid for smooth digestion",
          "Actively cools the body from the inside out, perfect for warm days",
          "Light and refreshing hydration that doesn’t feel heavy",
          "Helps settle that 'too full' feeling after a spicy or rich meal",
          "Provides natural probiotics to support your daily gut wellness"
        ],
        "bodyParagraphs": [
          {
            "text": "A traditional digestive remedy that actually tastes like home.",
            "isBold": false,
            "isNote": true
          }
        ]
      },
      {
        "title": "Who Should Drink This?",
        "introParagraphs": [],
        "listItems": [
          "That post-lunch heaviness when you need to get back to work",
          "After a spicy or heavy dinner to help your system balance",
          "Long summer afternoons when water isn't enough to stay cool",
          "If you're looking for a low-calorie, savory break in your day",
          "Anyone seeking a traditional digestive that actually works"
        ],
        "bodyParagraphs": [
          {
            "text": "A simple, soothing way to settle the stomach.",
            "isBold": false,
            "isNote": false
          }
        ]
      },
      {
        "title": "Roots Of The Ritual",
        "introParagraphs": [],
        "listItems": [],
        "bodyParagraphs": [
          {
            "text": "Jeera (Cumin) has been the 'Digestive Guardian' of the spice box for thousands of years. The ritual of roasting cumin seeds and stirring them into cool buttermilk is a sensory memory shared by millions. It was the cooling finale to every traditional meal, designed to settle the system and refresh the palate. Our Jeera Buttermilk honors this simple yet profound practice, delivering the earthy, aromatic legacy of one of nature’s finest digestive aids in every bottle.",
            "isBold": false,
            "isNote": false
          }
        ]
      },
      {
        "title": "How To Enjoy",
        "introParagraphs": [],
        "listItems": [
          "Shake the bottle well as the roasted cumin tends to settle at the bottom",
          "Best served chilled, particularly after a heavy or spicy meal",
          "Sip it slowly to fully enjoy the cooling effect on your system",
          "It is a great choice for warm afternoons or as a post-meal digestive"
        ],
        "bodyParagraphs": [
          {
            "text": "Shake well and enjoy fresh.",
            "isBold": true,
            "isNote": false
          }
        ]
      }
    ],
    "suggestions": [
      {
        "slug": "masala-buttermilk",
        "image": "/assets/images/Masala-Buttermilk-544x652.png",
        "label": "Masala Buttermilk"
      },
      {
        "slug": "buttermilk",
        "image": "/assets/images/Buttermilk-544x652.png",
        "label": "Buttermilk"
      },
      {
        "slug": "date-buttermilk",
        "image": "/assets/images/Date-Buttermilk-544x652.png",
        "label": "Date Buttermilk"
      }
    ],
    "prevSlug": "barley-drink",
    "nextSlug": "masala-buttermilk"
  },
  {
    "slug": "masala-buttermilk",
    "category": "traditional",
    "name": "Masala Buttermilk",
    "bottleImage": "/assets/images/Masala-Buttermilk-544x652.png",
    "bottleAlt": "Masala Buttermilk Drink Bottle",
    "tagline": "The spicy, cooling punch for a tired afternoon.",
    "ingredients": [
      {
        "image": "/drinks/images/water.jpeg",
        "labels": [
          "Water"
        ]
      },
      {
        "image": "/drinks/images/curd.jpeg",
        "labels": [
          "Curd"
        ]
      },
      {
        "image": "/drinks/images/ginger2.jpeg",
        "labels": [
          "Ginger"
        ]
      },
      {
        "image": "/drinks/images/curryleaf.jpeg",
        "labels": [
          "Curry Leaves"
        ]
      },
      {
        "image": "/drinks/images/chillie.png",
        "labels": [
          "Coriander Chillies"
        ]
      },
      {
        "image": "/drinks/images/salt2.jpeg",
        "labels": [
          "Salt"
        ]
      }
    ],
    "specialTitle": "What’s Special About This Drink?",
    "specialParagraphs": [
      "Masala Buttermilk is often thought of as the original energy drink prepared in traditional kitchens. It is a bold and flavorful blend of cooling curd, ginger for warmth, and the sharp taste of fresh green chilies and curry leaves. It does more than just hydrate; it provides a refreshing kick that wakes up your system. We have kept the spice profile authentic and the texture honest, staying true to the recipe that was always waiting for you at home.",
      "At Shake & Gulp, we prioritize pure and real ingredients without using artificial additives, ensuring a timeless recipe is available for your modern routine."
    ],
    "infoBlocks": [
      {
        "title": "Health Benefits",
        "introParagraphs": [],
        "listItems": [
          "Supports digestion naturally after a heavy or rich meal",
          "Helps the body cool down and stay hydrated with a savory flavor profile",
          "Contains house-made curd which is rich in probiotics for gut wellness",
          "Includes ginger and chilies that provide a natural way to feel revitalized",
          "Useful for balancing your system after consuming spicy or oily foods"
        ],
        "bodyParagraphs": [
          {
            "text": "A savory and cooling tradition in every bottle.",
            "isBold": false,
            "isNote": true
          }
        ]
      },
      {
        "title": "Who Should Drink This?",
        "introParagraphs": [],
        "listItems": [
          "Afternoons when you’re feeling sluggish and need a savory wake-up",
          "When you're dealing with that heavy, bloated feeling after a party",
          "On sweltering days when you need something more than water",
          "If you love the traditional flavors of ginger, chilies, and curry leaves",
          "Anyone seeking a traditional, spicy alternative to sugary drinks"
        ],
        "bodyParagraphs": [
          {
            "text": "A natural way to revive your system.",
            "isBold": false,
            "isNote": false
          }
        ]
      },
      {
        "title": "Roots Of The Ritual",
        "introParagraphs": [],
        "listItems": [],
        "bodyParagraphs": [
          {
            "text": "Masala Buttermilk is the vibrant, spiced-up version of the classic 'Chaas', reflecting the rich diversity of traditional Indian flavors. With a blend of ginger, green chilies, and coriander, it was the drink of choice to revive the senses and aid digestion after a heavy feast. This ritual is a celebration of the spice-rich heritage of our ancestors, who knew exactly how to use the gifts of the earth to keep the body energized and the gut happy.",
            "isBold": false,
            "isNote": false
          }
        ]
      },
      {
        "title": "How To Enjoy",
        "introParagraphs": [],
        "listItems": [
          "Shake the bottle well so the spices and herbs are mixed evenly",
          "Best served chilled to enjoy the contrast between the spice and the cold curd",
          "Enjoy it after a meal or whenever you need a mid-afternoon refresh",
          "Sip it slowly to appreciate the blend of herbs and cooling buttermilk"
        ],
        "bodyParagraphs": [
          {
            "text": "Shake well and enjoy fresh.",
            "isBold": true,
            "isNote": false
          }
        ]
      }
    ],
    "suggestions": [
      {
        "slug": "jeera-buttermilk",
        "image": "/assets/images/Jeera-butermilk-shots-544x652.png",
        "label": "Jeera Buttermilk"
      },
      {
        "slug": "buttermilk",
        "image": "/assets/images/Buttermilk-544x652.png",
        "label": "Buttermilk"
      },
      {
        "slug": "date-buttermilk",
        "image": "/assets/images/Date-Buttermilk-544x652.png",
        "label": "Date Buttermilk"
      }
    ],
    "prevSlug": "jeera-buttermilk",
    "nextSlug": "date-buttermilk"
  },
  {
    "slug": "date-buttermilk",
    "category": "traditional",
    "name": "Date Buttermilk",
    "bottleImage": "/assets/images/Date-Buttermilk-544x652.png",
    "bottleAlt": "Date Buttermilk Drink Bottle",
    "tagline": "A rich, naturally sweet recharge for your long days.",
    "ingredients": [
      {
        "image": "/drinks/images/water.jpeg",
        "labels": [
          "Water"
        ]
      },
      {
        "image": "/drinks/images/curd.jpeg",
        "labels": [
          "Curd"
        ]
      },
      {
        "image": "/drinks/images/dates.jpeg",
        "labels": [
          "Dates"
        ]
      }
    ],
    "specialTitle": "What’s Special About This Drink?",
    "specialParagraphs": [
      "Date Buttermilk provides a natural way to recharge during the day. We have combined traditional buttermilk with the natural sweetness of real dates. It is designed to offer energy using authentic ingredients rather than refined sugars.",
      "The sweetness in this drink is entirely natural. Shake & Gulp Date Buttermilk offers a smooth taste while remaining light on the stomach. Since we use real ingredients, they may naturally settle, so please shake the bottle well before drinking."
    ],
    "infoBlocks": [
      {
        "title": "Health Benefits",
        "introParagraphs": [],
        "listItems": [
          "Provides a slow-release energy boost from real, whole dates",
          "Naturally rich in iron and essential minerals to keep you going",
          "Supports a healthy gut with the goodness of fresh buttermilk",
          "Satisfies your sweet tooth without a single drop of refined sugar",
          "Helps you feel full and focused between your main meals"
        ],
        "bodyParagraphs": [
          {
            "text": "A wholesome drink that refreshes and replenishes at the same time.",
            "isBold": false,
            "isNote": true
          }
        ]
      },
      {
        "title": "Who Should Drink This?",
        "introParagraphs": [
          "Date Buttermilk is a nourishing option for everyone. It’s made for those moments when you're facing:"
        ],
        "listItems": [
          "Mornings when you skipped breakfast and need to stay sharp",
          "The 4 PM hunger that usually leads to unhealthy snacking",
          "Physical drainage or low stamina during a long week",
          "A need for natural, light nourishment that actually tastes good",
          "If you want a sweet treat that actually nourishes you"
        ],
        "bodyParagraphs": []
      },
      {
        "title": "Roots Of The Ritual",
        "introParagraphs": [],
        "listItems": [],
        "bodyParagraphs": [
          {
            "text": "This unique blend marries the cooling comfort of traditional buttermilk with the natural, iron-rich sweetness of dates—the 'Bread of the Desert'. In nomadic cultures, dates were the ultimate source of instant energy, while buttermilk provided the necessary hydration in harsh climates. Together, they create a ritual of strength and refreshment. This drink is a modern tribute to those who found nourishment in the most challenging environments, bringing you a balanced, satisfying sip of history.",
            "isBold": false,
            "isNote": false
          }
        ]
      },
      {
        "title": "How To Enjoy",
        "introParagraphs": [],
        "listItems": [
          "Shake the bottle well to properly mix the dates with the buttermilk",
          "Best served chilled for a refreshing taste",
          "It is a good choice for mid-morning or during an afternoon break",
          "Sip it slowly to fully enjoy the natural flavor of the dates"
        ],
        "bodyParagraphs": [
          {
            "text": "Shake well and enjoy fresh.",
            "isBold": true,
            "isNote": false
          }
        ]
      }
    ],
    "suggestions": [
      {
        "slug": "jeera-buttermilk",
        "image": "/assets/images/Jeera-butermilk-shots-544x652.png",
        "label": "Jeera Buttermilk"
      },
      {
        "slug": "masala-buttermilk",
        "image": "/assets/images/Masala-Buttermilk-544x652.png",
        "label": "Masala Buttermilk"
      },
      {
        "slug": "buttermilk",
        "image": "/assets/images/Buttermilk-544x652.png",
        "label": "Buttermilk"
      }
    ],
    "prevSlug": "masala-buttermilk",
    "nextSlug": "ragi-buttermilk"
  },
  {
    "slug": "ragi-buttermilk",
    "category": "traditional",
    "name": "Ragi Buttermilk",
    "bottleImage": "/assets/images/Ragi-544x652.png",
    "bottleAlt": "Ragi Buttermilk Drink Bottle",
    "tagline": "The ancient strength of Ragi, made for the modern rhythm.",
    "ingredients": [
      {
        "image": "/drinks/images/water.jpeg",
        "labels": [
          "Water"
        ]
      },
      {
        "image": "/drinks/images/curd.jpeg",
        "labels": [
          "Curd"
        ]
      },
      {
        "image": "/drinks/images/ragi.jpeg",
        "labels": [
          "Ragi"
        ]
      },
      {
        "image": "/drinks/images/salt2.jpeg",
        "labels": [
          "Salt"
        ]
      }
    ],
    "specialTitle": "What’s Special About This Drink?",
    "specialParagraphs": [
      "Ragi has long been a source of strength in many homes, known for providing energy through long days of work. We have paired this traditional grain with cooling buttermilk to create a drink that offers nourishment in a simple and refreshing way.",
      "Ragi is a symbol of resilience and everyday health. Our Ragi Buttermilk is a tribute to that tradition, designed for those who need natural energy and grounding nutrition. Since real ragi and curd naturally settle, please remember to shake the bottle well before enjoying."
    ],
    "infoBlocks": [
      {
        "title": "Health Benefits",
        "introParagraphs": [],
        "listItems": [
          "A natural powerhouse of calcium for stronger bones and teeth",
          "Provides slow-burning energy that keeps you full for hours",
          "Rich in fiber, making it a friend to your digestive system",
          "Helps your body stay cool even when the work gets intense",
          "A wholesome, low-calorie way to bridge the gap between meals"
        ],
        "bodyParagraphs": [
          {
            "text": "A drink that strengthens without weighing you down.",
            "isBold": false,
            "isNote": true
          }
        ]
      },
      {
        "title": "Who Should Drink This?",
        "introParagraphs": [
          "Ragi Buttermilk is wholesome nutrition for everyone. It’s made for those moments when you're facing:"
        ],
        "listItems": [
          "The mid-morning 'stomach growl' when lunch feels too far away",
          "Physically demanding days that require long-term stamina",
          "A need for natural nutrition that fits a busy work schedule",
          "Feeling physically drained or weak during seasonal changes",
          "If you want a filling snack that is still easy to digest"
        ],
        "bodyParagraphs": []
      },
      {
        "title": "The Roots Of The Ritual",
        "introParagraphs": [],
        "listItems": [],
        "bodyParagraphs": [
          {
            "text": "Ragi, the 'Wonder Grain' of the Deccan plateau, has been the backbone of strength for farming communities for millennia. The ritual of mixing fermented Ragi with cool buttermilk created a nutritional powerhouse that could sustain a hard day’s labor under the sun. Our Ragi Buttermilk revives this ancient 'Farmer’s Fuel,' bringing you a calcium-rich, grounding drink that connects you to the deep agricultural roots and the resilient spirit of the land.",
            "isBold": false,
            "isNote": false
          }
        ]
      },
      {
        "title": "How To Enjoy",
        "introParagraphs": [],
        "listItems": [
          "Shake the bottle well before opening because ragi tends to settle at the bottom",
          "Best served chilled during your busy hours",
          "Enjoy the unique texture and earthy flavor of the grain",
          "It is a good choice for a light snack or as a natural source of energy"
        ],
        "bodyParagraphs": [
          {
            "text": "Shake well and enjoy fresh.",
            "isBold": true,
            "isNote": false
          }
        ]
      }
    ],
    "suggestions": [
      {
        "slug": "jeera-buttermilk",
        "image": "/assets/images/Jeera-butermilk-shots-544x652.png",
        "label": "Jeera Buttermilk"
      },
      {
        "slug": "buttermilk",
        "image": "/assets/images/Buttermilk-544x652.png",
        "label": "Buttermilk"
      },
      {
        "slug": "date-buttermilk",
        "image": "/assets/images/Date-Buttermilk-544x652.png",
        "label": "Date Buttermilk"
      }
    ],
    "prevSlug": "date-buttermilk",
    "nextSlug": "sabja-lassi"
  },
  {
    "slug": "sabja-lassi",
    "category": "traditional",
    "name": "Sabja Lassi",
    "bottleImage": "/assets/images/Sabja-Lassi-544x652.png",
    "bottleAlt": "Sabja Lassi Drink Bottle",
    "tagline": "A creamy, cooling escape from the heat.",
    "ingredients": [
      {
        "image": "/drinks/images/water.jpeg",
        "labels": [
          "Water"
        ]
      },
      {
        "image": "/drinks/images/curd.jpeg",
        "labels": [
          "Curd"
        ]
      },
      {
        "image": "/drinks/images/sabjaseed.jpeg",
        "labels": [
          "Sabja seeds"
        ]
      },
      {
        "image": "/drinks/images/naturalsweetener.jpeg",
        "labels": [
          "Natural Sweetner"
        ]
      }
    ],
    "specialTitle": "What’s Special About This Drink?",
    "specialParagraphs": [
      "Sabja Lassi is a thoughtful combination of tradition and taste. We have combined the velvety richness of classic Lassi with the natural cooling properties of soaked Sabja (Basil) seeds. It is a drink designed to satisfy and help your body maintain its balance from the inside out.",
      "This combination has been used in traditional diets to manage heat and provide nourishment. When soaked, the seeds develop a unique texture that complements the smoothness of the lassi. Since we use real ingredients, the seeds may naturally settle, so please shake the bottle well before enjoying."
    ],
    "infoBlocks": [
      {
        "title": "Health Benefits",
        "introParagraphs": [],
        "listItems": [
          "The Sabja seeds act as a natural internal coolant for your body",
          "Rich in probiotics from fresh curd to keep your gut happy",
          "Helps satisfy hunger and keeps you feeling full longer",
          "The jelly-like seeds provide a unique, satisfying texture",
          "Naturally hydrating and perfect for restoring lost minerals"
        ],
        "bodyParagraphs": [
          {
            "text": "A creamy drink that refreshes while keeping you light.",
            "isBold": false,
            "isNote": true
          }
        ]
      },
      {
        "title": "Who Should Drink This?",
        "introParagraphs": [
          "Sabja Lassi is a comforting drink for everyone. It’s made for those moments when you're facing:"
        ],
        "listItems": [
          "Persistent body heat or feeling drained by summer fatigue",
          "Dehydration during warm weather or after travel",
          "A craving for something sweet that actually nourishes you",
          "Mild digestive discomfort or a need for a lighter snack",
          "Tiredness from a long day where you need a little treat"
        ],
        "bodyParagraphs": [
          {
            "text": "A gentle way to cool down and feel satisfied.",
            "isBold": false,
            "isNote": false
          }
        ]
      },
      {
        "title": "The Roots Of The Ritual",
        "introParagraphs": [],
        "listItems": [],
        "bodyParagraphs": [
          {
            "text": "Lassi is the quintessential rich treat of the plains, and the addition of Sabja seeds elevates it into a sophisticated cooling ritual. Historically, Lassi was served in large clay tumblers, topped with a thick layer of cream. By adding Basil seeds, we bridge the gap between indulgent nourishment and functional cooling. This ritual is about slowing down and savoring a moment of velvety calm, honoring the centuries-old tradition of finding peace and satisfaction in a single, creamy glass.",
            "isBold": false,
            "isNote": false
          }
        ]
      },
      {
        "title": "How To Enjoy",
        "introParagraphs": [],
        "listItems": [
          "Shake the bottle well before opening so the seeds are properly mixed",
          "Best served chilled for a refreshing experience",
          "Enjoy it during a warm afternoon or as a light treat",
          "Take your time to appreciate the unique texture of the seeds"
        ],
        "bodyParagraphs": [
          {
            "text": "Shake well and enjoy fresh.",
            "isBold": true,
            "isNote": false
          }
        ]
      }
    ],
    "suggestions": [
      {
        "slug": "jeera-buttermilk",
        "image": "/assets/images/Jeera-butermilk-shots-544x652.png",
        "label": "Jeera Buttermilk"
      },
      {
        "slug": "masala-buttermilk",
        "image": "/assets/images/Masala-Buttermilk-544x652.png",
        "label": "Masala Buttermilk"
      },
      {
        "slug": "date-buttermilk",
        "image": "/assets/images/Date-Buttermilk-544x652.png",
        "label": "Date Buttermilk"
      }
    ],
    "prevSlug": "ragi-buttermilk",
    "nextSlug": "buttermilk"
  },
  {
    "slug": "buttermilk",
    "category": "traditional",
    "name": "Buttermilk",
    "bottleImage": "/assets/images/Buttermilk-544x652.png",
    "bottleAlt": "Buttermilk Bottle",
    "tagline": "The gentle joy of a timeless tradition.",
    "ingredients": [
      {
        "image": "/drinks/images/water.jpeg",
        "labels": [
          "Water"
        ]
      },
      {
        "image": "/drinks/images/curd.jpeg",
        "labels": [
          "Curd"
        ]
      },
      {
        "image": "/drinks/images/salt2.jpeg",
        "labels": [
          "Salt"
        ]
      }
    ],
    "specialTitle": "What’s Special About This Drink?",
    "specialParagraphs": [
      "Buttermilk is a fundamental part of the traditional diet. It is often the first choice for those looking to feel balanced and cooled down. We keep our buttermilk authentic by using house-made curd mixed with water and a pinch of salt. We avoid additives and artificial flavorings to stay true to the simple recipe that has been used in our homes for generations.",
      "Shake & Gulp Buttermilk is prepared with real ingredients and a time-tested process. Since we do not use artificial stabilizers, the natural ingredients may settle, so please shake the bottle well before drinking."
    ],
    "infoBlocks": [
      {
        "title": "Health Benefits",
        "introParagraphs": [],
        "listItems": [
          "Helps the body cool down and maintain its balance in warm weather",
          "Provides a natural source of probiotics to support gut wellness",
          "Offers light and gentle hydration that doesn't feel heavy on the stomach",
          "Acts as a natural digestive aid after rich or complex meals",
          "A nutrient-dense way to refresh yourself at any time of the day"
        ],
        "bodyParagraphs": [
          {
            "text": "Traditional wellness that has been trusted for generations.",
            "isBold": false,
            "isNote": true
          }
        ]
      },
      {
        "title": "Who Should Drink This?",
        "introParagraphs": [
          "Buttermilk is for everyone—a daily drink for balance and refreshment."
        ],
        "listItems": [
          "Daily after lunch to help your system process the meal",
          "When you feel that internal 'heat' or acidity after a long day",
          "If you're looking for a simple, savory refresh that feels like home",
          "On sweltering afternoons when your body needs honest hydration",
          "Anyone seeking a mild, comforting drink that’s kind to the stomach"
        ],
        "bodyParagraphs": [
          {
            "text": "A simple drink that your stomach will thank you for.",
            "isBold": false,
            "isNote": false
          }
        ]
      },
      {
        "title": "Roots Of The Ritual",
        "introParagraphs": [],
        "listItems": [],
        "bodyParagraphs": [
          {
            "text": "Buttermilk, or 'Chaas', is the soul of the Indian summer. Traditionally prepared by churning curd in a wooden pot (Madhani), it was more than just a drink—it was a gesture of hospitality and a symbol of abundance. In ancient texts, it is described as 'Amrita' (the nectar of life) for its ability to restore balance to the gut. Our Buttermilk stays true to this cooling heritage, offering a simple, honest ritual of hydration that has refreshed weary travelers and busy families for centuries.",
            "isBold": false,
            "isNote": false
          }
        ]
      },
      {
        "title": "How To Enjoy",
        "introParagraphs": [],
        "listItems": [
          "Shake the bottle well before opening",
          "Best served chilled for a refreshing experience",
          "Enjoy it after a meal or on a warm day",
          "It is a good choice whenever you need something light and soothing for your system"
        ],
        "bodyParagraphs": [
          {
            "text": "Shake well and enjoy fresh.",
            "isBold": true,
            "isNote": false
          }
        ]
      }
    ],
    "suggestions": [
      {
        "slug": "masala-buttermilk",
        "image": "/assets/images/Masala-Buttermilk-544x652.png",
        "label": "Masala Buttermilk"
      },
      {
        "slug": "jeera-buttermilk",
        "image": "/assets/images/Jeera-butermilk-shots-544x652.png",
        "label": "Jeera Buttermilk"
      },
      {
        "slug": "date-buttermilk",
        "image": "/assets/images/Date-Buttermilk-544x652.png",
        "label": "Date Buttermilk"
      }
    ],
    "prevSlug": "sabja-lassi",
    "nextSlug": "nimbu-sabja"
  },
  {
    "slug": "nimbu-sabja",
    "category": "traditional",
    "name": "Nimbu Sabja",
    "bottleImage": "/assets/images/Nimbu-Sabja-544x652.png",
    "bottleAlt": "Nimbu Sabja Drink Bottle",
    "tagline": "The ultimate cool-down for your busiest days.",
    "ingredients": [
      {
        "image": "/drinks/images/water.jpeg",
        "labels": [
          "Water"
        ]
      },
      {
        "image": "/drinks/images/lemon2.jpeg",
        "labels": [
          "Lemon"
        ]
      },
      {
        "image": "/drinks/images/sabjaseed.jpeg",
        "labels": [
          "Sabja seeds"
        ]
      },
      {
        "image": "/drinks/images/naturalsweetener.jpeg",
        "labels": [
          "Natural Sweetner"
        ]
      },
      {
        "image": "/drinks/images/salt2.jpeg",
        "labels": [
          "Salt"
        ]
      }
    ],
    "specialTitle": "What’s Special About This Drink?",
    "specialParagraphs": [
      "Nimbu Sabja is a natural way to help your body manage heat. We have combined the flavor of fresh lemons with the cooling properties of Sabja (sweet basil) seeds. These seeds have been used for generations to provide immediate refreshment and hydration. It is a simple and effective choice for when you need a cooling drink.",
      "When soaked, Sabja seeds develop a unique texture that makes the drink satisfying. Shake & Gulp Nimbu Sabja provides this classic combination in a ready-to-drink format. Since we use real ingredients, the seeds may naturally settle, so please shake the bottle well before drinking."
    ],
    "infoBlocks": [
      {
        "title": "Health Benefits",
        "introParagraphs": [],
        "listItems": [
          "Sabja seeds act as a natural internal coolant to bring down body heat",
          "The fresh lemon zing provides a natural boost of hydration and clarity",
          "Light on the stomach while helping you feel full and satisfied",
          "Provides natural fiber to support a happy, balanced gut",
          "A refreshing way to reset after being out in the heat or sun"
        ],
        "bodyParagraphs": [
          {
            "text": "A summer-friendly drink your body will love.",
            "isBold": false,
            "isNote": true
          }
        ]
      },
      {
        "title": "Who Should Drink This?",
        "introParagraphs": [
          "Nimbu Sabja is the ultimate cooler for a busy lifestyle. It’s especially helpful for:"
        ],
        "listItems": [
          "On those sweltering afternoons when your energy starts to dip",
          "After a workout or a long walk when you need to cool down fast",
          "If you're looking for a refreshing, low-sugar alternative to sodas",
          "When you feel that internal 'heat' or acidity during a busy shift",
          "Anyone who loves a bit of texture and zing in their daily hydration"
        ],
        "bodyParagraphs": [
          {
            "text": "A natural way to cool down and feel refreshed.",
            "isBold": false,
            "isNote": false
          }
        ]
      },
      {
        "title": "Roots Of The Ritual",
        "introParagraphs": [],
        "listItems": [],
        "bodyParagraphs": [
          {
            "text": "This drink highlights the fascinating Sabja (Basil) seeds, which have been used in traditional cooling drinks for their unique ability to absorb water and cool the body from within. Paired with the brightness of lemon, it creates a ritual of texture and refreshment. Sabja was often found in the royal kitchens of the East, prized for its soothing properties. This drink brings that touch of ancient luxury and cooling science to your daily routine, keeping you hydrated in the most elegant way.",
            "isBold": false,
            "isNote": false
          }
        ]
      },
      {
        "title": "How To Enjoy",
        "introParagraphs": [],
        "listItems": [
          "Shake the bottle well before opening so the Sabja seeds are properly mixed",
          "Best served ice-cold for the most refreshing taste",
          "It is an excellent choice for a midday break or when traveling in the heat",
          "Take your time to appreciate the unique texture of the hydrated seeds"
        ],
        "bodyParagraphs": [
          {
            "text": "Shake well and enjoy fresh.",
            "isBold": true,
            "isNote": false
          }
        ]
      }
    ],
    "suggestions": [
      {
        "slug": "jeera-buttermilk",
        "image": "/assets/images/Jeera-butermilk-shots-544x652.png",
        "label": "Jeera Buttermilk"
      },
      {
        "slug": "buttermilk",
        "image": "/assets/images/Buttermilk-544x652.png",
        "label": "Buttermilk"
      },
      {
        "slug": "nimbu-pudina",
        "image": "/assets/images/Nimbu-pudina-544x652.png",
        "label": "Nimbu Pudina"
      }
    ],
    "prevSlug": "buttermilk",
    "nextSlug": "nimbu-pudina"
  },
  {
    "slug": "nimbu-pudina",
    "category": "traditional",
    "name": "Nimbu Pudina",
    "bottleImage": "/assets/images/Nimbu-pudina-544x652.png",
    "bottleAlt": "Nimbu Pudina Drink Bottle",
    "tagline": "The aromatic reset your senses have been craving.",
    "ingredients": [
      {
        "image": "/drinks/images/water.jpeg",
        "labels": [
          "Water"
        ]
      },
      {
        "image": "/drinks/images/mint.jpeg",
        "labels": [
          "Fresh Mint"
        ]
      },
      {
        "image": "/drinks/images/sabjaseed.jpeg",
        "labels": [
          "Sabja seeds"
        ]
      },
      {
        "image": "/drinks/images/naturalsweetener.jpeg",
        "labels": [
          "Natural Sweetner"
        ]
      },
      {
        "image": "/drinks/images/salt2.jpeg",
        "labels": [
          "Salt"
        ]
      }
    ],
    "specialTitle": "What’s Special About This Drink?",
    "specialParagraphs": [
      "Nimbu Pudina is a traditional combination that provides a moment of clarity. We have stayed true to the classic recipe, using fresh lemons and garden-fresh mint. It is a light and crisp drink that offers a refreshing feeling with every sip. Since we use real ingredients, the mint and lemon may naturally settle, so please shake the bottle well before drinking.",
      "This drink is hydrating and is a good choice when you need something that refreshes without being heavy. Shake & Gulp Nimbu Pudina provides this classic combination in a convenient form for your daily routine."
    ],
    "infoBlocks": [
      {
        "title": "Health Benefits",
        "introParagraphs": [],
        "listItems": [
          "Mint leaf extract acts as a natural relaxant for the digestive system",
          "Fresh lemon provides a quick boost of Vitamin C and daily hydration",
          "Actively helps 'lighten' the system after a long day or a heavy meal",
          "The aromatic profile helps clear the senses and revitalize focus",
          "A clean, natural way to refresh your breath and your mood"
        ],
        "bodyParagraphs": [
          {
            "text": "A simple drink that refreshes from the inside out.",
            "isBold": false,
            "isNote": true
          }
        ]
      },
      {
        "title": "Who Should Drink This?",
        "introParagraphs": [
          "Nimbu Pudina is a refreshing choice for daily hydration. It’s especially helpful for:"
        ],
        "listItems": [
          "Mornings when you need a sharp, natural wake-up call",
          "After a long commute or sun exposure when you feel depleted",
          "When you’re looking for a light, refreshing break during a busy shift",
          "If you love the classic, clean flavors of lemon and fresh mint",
          "Anyone seeking a natural, low-sugar alternative to artificial sodas"
        ],
        "bodyParagraphs": [
          {
            "text": "A natural way to feel cool, light, and refreshed.",
            "isBold": false,
            "isNote": false
          }
        ]
      },
      {
        "title": "Roots Of The Ritual",
        "introParagraphs": [],
        "listItems": [],
        "bodyParagraphs": [
          {
            "text": "Nimbu (Lemon) and Pudina (Mint) have been the ultimate cooling duo since the dawn of summer. This ritual of squeezing fresh citrus and crushing aromatic mint leaves is a universal symbol of instant refreshment. It was the drink offered to guests to wash away the heat of the day. Our Nimbu Pudina captures this timeless essence, providing a zesty, cooling escape that honors the simple, effective wisdom of using fresh herbs and fruit to stay hydrated and alert.",
            "isBold": false,
            "isNote": false
          }
        ]
      },
      {
        "title": "How To Enjoy",
        "introParagraphs": [],
        "listItems": [
          "Shake the bottle well to properly mix the mint and lemon flavors",
          "Best served ice-cold for the most refreshing taste",
          "It is a great choice for a midday break or a refreshing evening reset",
          "Sip it slowly to fully enjoy the aromatic flavor of the mint"
        ],
        "bodyParagraphs": [
          {
            "text": "Shake well and enjoy fresh.",
            "isBold": true,
            "isNote": false
          }
        ]
      }
    ],
    "suggestions": [
      {
        "slug": "jeera-buttermilk",
        "image": "/assets/images/Jeera-butermilk-shots-544x652.png",
        "label": "Jeera Buttermilk"
      },
      {
        "slug": "buttermilk",
        "image": "/assets/images/Buttermilk-544x652.png",
        "label": "Buttermilk"
      },
      {
        "slug": "date-buttermilk",
        "image": "/assets/images/Date-Buttermilk-544x652.png",
        "label": "Date Buttermilk"
      }
    ],
    "prevSlug": "nimbu-sabja",
    "nextSlug": "ginger-shot"
  },
  {
    "slug": "ginger-shot",
    "category": "wellness",
    "name": "Ginger Shot",
    "bottleImage": "/assets/images/Gingger-shots-544x652.png",
    "bottleAlt": "Ginger Shot Drink Bottle",
    "tagline": "The sharp, revitalizing heat your system craves.",
    "ingredients": [
      {
        "image": "/drinks/images/gingerjuce.jpeg",
        "labels": [
          "Ginger Juice"
        ]
      },
      {
        "image": "/drinks/images/lemonjuce.jpeg",
        "labels": [
          "Lemon Juice"
        ]
      },
      {
        "image": "/drinks/images/honey.jpeg",
        "labels": [
          "Honey"
        ]
      },
      {
        "image": "/drinks/images/pepper.jpeg",
        "labels": [
          "Pepper Powder"
        ]
      }
    ],
    "specialTitle": "What’s Special About This Drink?",
    "specialParagraphs": [
      "The Ginger Shot is prepared using one of nature’s most respected roots. Ginger has been trusted for generations for its warming and revitalizing strength. We’ve combined it with lemon for a fresh zest, honey for a smooth balance, and a hint of pepper. It is sharp and provides a natural way to start your day.",
      "Shake & Gulp Ginger Shot is designed for modern lifestyles that need quick, natural support. Since we use real ingredients, they may naturally settle, so please shake the bottle well before drinking."
    ],
    "infoBlocks": [
      {
        "title": "Health Benefits",
        "introParagraphs": [],
        "listItems": [
          "Supports natural immunity and everyday wellness",
          "Helps soothe the throat and clear the senses",
          "Aids digestion and reduces that 'heavy' stomach feeling",
          "Provides a warming, energizing boost for the whole body",
          "A perfect natural revitalizer for sluggish afternoons"
        ],
        "bodyParagraphs": [
          {
            "text": "A small shot with a massive impact.",
            "isBold": false,
            "isNote": true
          }
        ]
      },
      {
        "title": "Who Should Drink This?",
        "introParagraphs": [
          "Ginger Shot is the ultimate addition to a proactive wellness routine. It’s perfect for:"
        ],
        "listItems": [
          "Mornings when you need a sharp, natural start without the jitters",
          "Frequent travelers or those moving between changing climates",
          "Anyone dealing with a sluggish or heavy stomach after meals",
          "When you feel a 'scratch' in your throat or seasonal discomfort",
          "Sluggish afternoons when you need a natural, caffeine-free reset"
        ],
        "bodyParagraphs": [
          {
            "text": "A quick natural boost when your body needs extra strength.",
            "isBold": false,
            "isNote": false
          }
        ]
      },
      {
        "title": "Roots Of The Ritual",
        "introParagraphs": [],
        "listItems": [],
        "bodyParagraphs": [
          {
            "text": "Ginger has been prized for millennia as the 'Universal Medicine' (Vishwabheshaja) in ancient traditions. From the spice routes of Asia to the kitchens of our grandmothers, its fiery essence has been used to ignite the 'Agni' (digestive fire) and clear the senses. This shot is a tribute to that sharp, cleansing power that was once brewed in clay pots to ward off sluggishness. We’ve captured that historical heat to give you a natural, grounded awakening that resonates with centuries of healing wisdom.",
            "isBold": false,
            "isNote": false
          }
        ]
      },
      {
        "title": "How To Enjoy",
        "introParagraphs": [],
        "listItems": [
          "Shake the bottle well before opening because real ginger juice tends to settle",
          "Best served chilled for the most refreshing taste",
          "Consume it quickly to fully appreciate the flavor",
          "You can follow it with a sip of water if you find the kick too strong"
        ],
        "bodyParagraphs": [
          {
            "text": "Shake well and enjoy fresh.",
            "isBold": true,
            "isNote": false
          }
        ]
      }
    ],
    "suggestions": [
      {
        "slug": "ginger-turmeric-shot",
        "image": "/assets/images/Gingger-Turmeric-shots-544x652.png",
        "label": "Ginger Turmeric Shot"
      },
      {
        "slug": "amla-shot",
        "image": "/assets/images/Amla-shadow-elements-544x652.png",
        "label": "Amla Shot"
      },
      {
        "slug": "moringa-shot",
        "image": "/assets/images/Moringa-544x652.png",
        "label": "Moringa Shot"
      }
    ],
    "prevSlug": "nimbu-pudina",
    "nextSlug": "ginger-turmeric-shot"
  },
  {
    "slug": "ginger-turmeric-shot",
    "category": "wellness",
    "name": "Ginger Turmeric Shot",
    "bottleImage": "/assets/images/Gingger-Turmeric-shots-544x652.png",
    "bottleAlt": "Ginger Turmeric Shot Drink Bottle",
    "tagline": "The golden shield for your daily resilience.",
    "ingredients": [
      {
        "image": "/drinks/images/gingerjuce.jpeg",
        "labels": [
          "Ginger Juice"
        ]
      },
      {
        "image": "/drinks/images/lemonjuce.jpeg",
        "labels": [
          "Lemon Juice"
        ]
      },
      {
        "image": "/drinks/images/honey.jpeg",
        "labels": [
          "Honey"
        ]
      },
      {
        "image": "/drinks/images/pepper.jpeg",
        "labels": [
          "Pepper Powder"
        ]
      }
    ],
    "specialTitle": "What’s Special About This Drink?",
    "specialParagraphs": [
      "This golden blend is based on traditional recipes that have been used for generations to help stay strong. We have combined the flavor of ginger with the warmth of turmeric, using a touch of pepper to help unlock its potential. It is a straightforward way to provide your body with natural support.",
      "Lemon provides a fresh taste and honey helps to balance the earthy notes. Shake & Gulp Ginger Turmeric Shot offers this classic combination in a convenient form. Since we use real ingredients, natural settling is expected, so please shake the bottle well before you enjoy it."
    ],
    "infoBlocks": [
      {
        "title": "Health Benefits",
        "introParagraphs": [],
        "listItems": [
          "Powerful anti-inflammatory support from pure, high-quality turmeric",
          "Boosts your body's natural defenses against seasonal bugs",
          "Warms the system and kickstarts slow digestion",
          "Helps clear that foggy 'morning feeling' and revitalizes your focus",
          "Supports joint comfort and overall physical lightness"
        ],
        "bodyParagraphs": [
          {
            "text": "A traditional blend made for today’s fast-paced life.",
            "isBold": false,
            "isNote": true
          }
        ]
      },
      {
        "title": "Who Should Drink This?",
        "introParagraphs": [
          "Ginger Turmeric Shot is a powerful addition to your daily wellness routine. It’s made for those moments when you're facing:"
        ],
        "listItems": [
          "When the weather starts to flip and you need to stay sharp",
          "Mornings when you feel sluggish or 'inflamed' after a heavy meal",
          "A need for natural support for your joints and daily recovery",
          "Busy lifestyles that don't have time for a week-long recovery",
          "Anyone seeking a deep, honest cleanse from within"
        ],
        "bodyParagraphs": [
          {
            "text": "A simple daily ritual to help you feel stronger and more balanced.",
            "isBold": false,
            "isNote": false
          }
        ]
      },
      {
        "title": "Roots Of The Ritual",
        "introParagraphs": [],
        "listItems": [],
        "bodyParagraphs": [
          {
            "text": "This blend brings together the two most powerful roots of the East—The 'Golden Goddess' Turmeric and the 'Digestive King' Ginger. For generations, this combination was the ultimate household shield, used to soothe inflammation and strengthen the spirit. The ritual of mixing these roots with a touch of honey is a practice passed down through lineages of traditional healers. By sipping this shot, you are partaking in a centuries-old protective ceremony designed to bring balance and warmth to your core.",
            "isBold": false,
            "isNote": false
          }
        ]
      },
      {
        "title": "How To Enjoy",
        "introParagraphs": [],
        "listItems": [
          "Shake the bottle well to properly mix the turmeric and pepper",
          "Take it as a single shot in the morning as part of your routine",
          "You can follow it with a sip of warm water if you find the flavor bold",
          "It is often best taken on an empty stomach to fully enjoy its effects"
        ],
        "bodyParagraphs": [
          {
            "text": "Shake well and enjoy fresh.",
            "isBold": true,
            "isNote": false
          }
        ]
      }
    ],
    "suggestions": [
      {
        "slug": "ginger-shot",
        "image": "/assets/images/Gingger-shots-544x652.png",
        "label": "Ginger Shot"
      },
      {
        "slug": "amla-shot",
        "image": "/assets/images/Amla-shadow-elements-544x652.png",
        "label": "Amla Shot"
      },
      {
        "slug": "moringa-shot",
        "image": "/assets/images/Moringa-544x652.png",
        "label": "Moringa Shot"
      }
    ],
    "prevSlug": "ginger-shot",
    "nextSlug": "amla-shot"
  },
  {
    "slug": "amla-shot",
    "category": "wellness",
    "name": "Amla Shot",
    "bottleImage": "/assets/images/Amla-shadow-elements-544x652.png",
    "bottleAlt": "Amla Shot Drink Bottle",
    "tagline": "The sharp, honest tang of morning wellness.",
    "ingredients": [
      {
        "image": "/drinks/images/amla.jpeg",
        "labels": [
          "Amla"
        ]
      },
      {
        "image": "/drinks/images/water.jpeg",
        "labels": [
          "Water"
        ]
      },
      {
        "image": "/drinks/images/honey.jpeg",
        "labels": [
          "Honey"
        ]
      },
      {
        "image": "/drinks/images/ginger2.jpeg",
        "labels": [
          "Ginger"
        ]
      },
      {
        "image": "/drinks/images/salt.jpeg",
        "labels": [
          "A pinch of Salt"
        ]
      }
    ],
    "specialTitle": "What’s Special About This Drink?",
    "specialParagraphs": [
      "Amla has a sharp and sour flavor that provides a natural wake-up call for your system. In many homes, Amla was always a source of strength that people trusted when they felt run down.",
      "We have maintained that authentic spirit by adding a small amount of ginger and honey to help balance the flavor while keeping the original, honest kick. Because we use real ingredients, natural settling is normal, so please give the bottle a good shake before you enjoy it."
    ],
    "infoBlocks": [
      {
        "title": "Health Benefits",
        "introParagraphs": [],
        "listItems": [
          "Provides a natural boost of Vitamin C that is easily recognized by the body",
          "Supports your natural immunity and overall defense systems",
          "Helps promote a healthy appearance for your skin and hair",
          "Offers a clean lift to your day without the need for caffeine",
          "A simple way to add a healthy habit to your daily routine"
        ],
        "bodyParagraphs": [
          {
            "text": "A small bottle that can make a noticeable difference in your day.",
            "isBold": false,
            "isNote": true
          }
        ]
      },
      {
        "title": "Who Should Drink This?",
        "introParagraphs": [
          "It’s made for those moments when you're facing:"
        ],
        "listItems": [
          "'Too much to do' days when you need to stay sharp",
          "Mornings where you wake up feeling like you never slept",
          "Seasonal changes that leave you feeling under the weather",
          "Skin that shows the stress of a long work week",
          "The search for something real, not another synthetic supplement"
        ],
        "bodyParagraphs": [
          {
            "text": "One quick shot to help you feel a little more human each day.",
            "isBold": false,
            "isNote": false
          }
        ]
      },
      {
        "title": "The Roots Of The Ritual",
        "introParagraphs": [],
        "listItems": [],
        "bodyParagraphs": [
          {
            "text": "Amla, or Indian Gooseberry, has been the cornerstone of Ayurvedic wellness for over 3,000 years. Revered as 'Dhatri' (the Earth Mother) in ancient texts, it was believed to be the first tree to manifest on earth. In every traditional Indian household, the morning ritual of consuming Amla was a non-negotiable practice for longevity and vitality. Our Amla Shot preserves this timeless ritual, bringing the raw potency of the forest to your modern desk. It’s not just a drink; it’s a connection to an age-old legacy of natural defense and inner radiance.",
            "isBold": false,
            "isNote": false
          }
        ]
      },
      {
        "title": "How To Enjoy",
        "introParagraphs": [],
        "listItems": [
          "Shake the bottle well as the natural ingredients settle at the bottom",
          "Best enjoyed first thing in the morning as part of your routine",
          "Consume it as a single shot to fully experience the flavor",
          "You can keep some water nearby if you find the tang too sharp"
        ],
        "bodyParagraphs": [
          {
            "text": "Shake well and enjoy fresh.",
            "isBold": true,
            "isNote": false
          }
        ]
      }
    ],
    "suggestions": [
      {
        "slug": "ginger-shot",
        "image": "/assets/images/Gingger-shots-544x652.png",
        "label": "Ginger Shot"
      },
      {
        "slug": "moringa-shot",
        "image": "/assets/images/Moringa-544x652.png",
        "label": "Moringa Shot"
      },
      {
        "slug": "ginger-turmeric-shot",
        "image": "/assets/images/Gingger-Turmeric-shots-544x652.png",
        "label": "Ginger Turmeric Shot"
      }
    ],
    "prevSlug": "ginger-turmeric-shot",
    "nextSlug": "neem-shot"
  },
  {
    "slug": "neem-shot",
    "category": "wellness",
    "name": "Neem Shot",
    "bottleImage": "/assets/images/Neem-544x652.png",
    "bottleAlt": "Neem Shot Drink Bottle",
    "tagline": "The bold reset for your system’s balance.",
    "ingredients": [
      {
        "image": "/drinks/images/neemleaf.jpeg",
        "labels": [
          "Neem Leaf Extract"
        ]
      },
      {
        "image": "/drinks/images/water.jpeg",
        "labels": [
          "Water"
        ]
      },
      {
        "image": "/drinks/images/honey.jpeg",
        "labels": [
          "Honey"
        ]
      },
      {
        "image": "/drinks/images/citric.jpeg",
        "labels": [
          "A touch of Citric Balance",
          "Lemon"
        ]
      }
    ],
    "specialTitle": "What’s Special About This Drink?",
    "specialParagraphs": [
      "Neem has a strong and bitter flavor which is why it has been valued in traditional homes for generations. It is a straightforward and earthy way to provide your system with a reset. We have stayed true to that strength, balancing it slightly with honey and lemon to make the ritual part of your modern morning.",
      "Shake & Gulp Neem Shot makes it easy to include this traditional ingredient in your daily routine. It delivers the essence of neem in a convenient, drinkable form. Since we use real ingredients, natural extracts may settle, so please shake the bottle well before drinking."
    ],
    "infoBlocks": [
      {
        "title": "Health Benefits",
        "introParagraphs": [],
        "listItems": [
          "Acts as a potent internal cleanser for your blood and skin",
          "Supports your body’s natural ability to manage energy and sugar levels",
          "Encourages a clear, healthy glow from the inside out",
          "Traditionally used to keep the gut flora balanced and happy",
          "A deep, uncompromising reset for your entire system"
        ],
        "bodyParagraphs": [
          {
            "text": "A small shot rooted in powerful tradition.",
            "isBold": false,
            "isNote": true
          }
        ]
      },
      {
        "title": "Who Should Drink This?",
        "introParagraphs": [
          "Neem Shot is a traditional way to help the body feel lighter. It’s made for those moments when you're facing:"
        ],
        "listItems": [
          "Mornings when you feel physically 'heavy' or sluggish",
          "Skin-related concerns or dullness that feels internal",
          "When you’ve been over-indulging and need a sharp, honest reset",
          "Anyone seeking a natural, plant-based cleansing habit",
          "If you want to include traditional bitters in your wellness ritual"
        ],
        "bodyParagraphs": [
          {
            "text": "A traditional way to help the body feel lighter and more refreshed.",
            "isBold": false,
            "isNote": false
          }
        ]
      },
      {
        "title": "Roots Of The Ritual",
        "introParagraphs": [],
        "listItems": [],
        "bodyParagraphs": [
          {
            "text": "Neem is affectionately known in rural India as the 'Village Pharmacy' due to its unparalleled purifying properties. Every part of the Neem tree has been used for over 4,000 years to cleanse the body and spirit. The ritual of consuming bitter Neem was a sign of discipline and a commitment to internal purity. This shot is an honest, unfiltered expression of that cleansing tradition, offering you a powerful way to hit the reset button and embrace a cleaner, more balanced version of yourself.",
            "isBold": false,
            "isNote": false
          }
        ]
      },
      {
        "title": "How To Enjoy",
        "introParagraphs": [],
        "listItems": [
          "Shake the bottle well because the extract is concentrated and tends to settle",
          "Take it as a quick shot in the morning",
          "You can follow it with a slice of lemon or a sip of warm water if you find the flavor deep",
          "Best taken on an empty stomach for a natural cleanse"
        ],
        "bodyParagraphs": [
          {
            "text": "Shake well and enjoy fresh.",
            "isBold": true,
            "isNote": false
          }
        ]
      }
    ],
    "suggestions": [
      {
        "slug": "ginger-shot",
        "image": "/assets/images/Gingger-shots-544x652.png",
        "label": "Ginger Shot"
      },
      {
        "slug": "moringa-shot",
        "image": "/assets/images/Moringa-544x652.png",
        "label": "Moringa Shot"
      },
      {
        "slug": "amla-shot",
        "image": "/assets/images/Amla-shadow-elements-544x652.png",
        "label": "Amla Shot"
      }
    ],
    "prevSlug": "amla-shot",
    "nextSlug": "moringa-shot"
  },
  {
    "slug": "moringa-shot",
    "category": "wellness",
    "name": "Moringa Shot",
    "bottleImage": "/assets/images/Moringa-544x652.png",
    "bottleAlt": "Moringa Shot Drink Bottle",
    "tagline": "The green life-force for your modern pace.",
    "ingredients": [
      {
        "image": "/drinks/images/water.jpeg",
        "labels": [
          "Moringa Leaf Extract"
        ]
      },
      {
        "image": "/drinks/images/water.jpeg",
        "labels": [
          "Water"
        ]
      },
      {
        "image": "/drinks/images/honey.jpeg",
        "labels": [
          "Honey"
        ]
      },
      {
        "image": "/drinks/images/ginger2.jpeg",
        "labels": [
          "Ginger"
        ]
      },
      {
        "image": "/drinks/images/salt2.jpeg",
        "labels": [
          "A pinch of Salt"
        ]
      }
    ],
    "specialTitle": "What’s Special About This Drink?",
    "specialParagraphs": [
      "Moringa is a nutrient-dense leaf that has been part of traditional diets for centuries. It is a quiet hero that has grown in backyards and nourished families for generations. We have concentrated that green energy and balanced it with ginger and honey to create a shot that is both refreshing and effective.",
      "Shake & Gulp Moringa Shot provides this traditional leaf in a convenient format. It offers nourishment in a small, refreshing portion. Since we use real ingredients, natural extracts may settle, so please shake the bottle well before drinking."
    ],
    "infoBlocks": [
      {
        "title": "Health Benefits",
        "introParagraphs": [],
        "listItems": [
          "A natural source of essential vitamins and minerals for daily vitality",
          "Helps bridge nutritional gaps caused by a busy, modern diet",
          "Supports sustained energy without the jitters of caffeine",
          "Encourages a natural internal cleanse and metabolic balance",
          "A super-concentrated way to get your daily 'green' fix"
        ],
        "bodyParagraphs": [
          {
            "text": "A green boost that supports you from within.",
            "isBold": false,
            "isNote": true
          }
        ]
      },
      {
        "title": "Who Should Drink This?",
        "introParagraphs": [
          "Moringa Shot is a powerhouse addition to your wellness routine. It’s made for those moments when you're facing:"
        ],
        "listItems": [
          "Mornings when you feel physically drained or 'empty'",
          "If your daily meals are missing the deep nourishment of fresh greens",
          "Busy lifestyles where nutrition usually takes a backseat to deadlines",
          "A need for plant-based nourishment that actually works",
          "During seasonal shifts when your body needs extra support"
        ],
        "bodyParagraphs": [
          {
            "text": "A natural way to feel energized and balanced.",
            "isBold": false,
            "isNote": false
          }
        ]
      },
      {
        "title": "Roots Of The Ritual",
        "introParagraphs": [],
        "listItems": [],
        "bodyParagraphs": [
          {
            "text": "Known as the 'Miracle Tree', Moringa has been a secret of vitality in tropical regions for centuries. Ancient warriors were said to have been fed Moringa leaf extracts to give them extra energy and strength on the battlefield. Our Moringa Shot honors this heritage of endurance. It is a concentrated essence of one of nature's most nutrient-dense plants, designed to reconnect you with the raw, green power that has sustained communities and supported natural health since antiquity.",
            "isBold": false,
            "isNote": false
          }
        ]
      },
      {
        "title": "How To Enjoy",
        "introParagraphs": [],
        "listItems": [
          "Shake the bottle well before opening as the green extract tends to settle",
          "Best enjoyed first thing in the morning to start your day",
          "Consume it as a single shot to fully appreciate the flavor",
          "It is a good choice before physical activity or a busy afternoon"
        ],
        "bodyParagraphs": [
          {
            "text": "Shake well and enjoy fresh.",
            "isBold": true,
            "isNote": false
          }
        ]
      }
    ],
    "suggestions": [
      {
        "slug": "ginger-shot",
        "image": "/assets/images/Gingger-shots-544x652.png",
        "label": "Ginger Shot"
      },
      {
        "slug": "amla-shot",
        "image": "/assets/images/Amla-shadow-elements-544x652.png",
        "label": "Amla Shot"
      },
      {
        "slug": "neem-shot",
        "image": "/assets/images/Neem-544x652.png",
        "label": "Neem Shot"
      }
    ],
    "prevSlug": "neem-shot",
    "nextSlug": "wheatgrass-shot"
  },
  {
    "slug": "wheatgrass-shot",
    "category": "wellness",
    "name": "Wheatgrass Shot",
    "bottleImage": "/assets/images/Wheat-Grass-544x652.png",
    "bottleAlt": "Wheatgrass Shot Drink Bottle",
    "tagline": "The concentrated energy of young greens.",
    "ingredients": [
      {
        "image": "/drinks/images/wheatgrass.jpeg",
        "labels": [
          "Fresh Wheatgrass Extract"
        ]
      },
      {
        "image": "/drinks/images/water.jpeg",
        "labels": [
          "Water"
        ]
      },
      {
        "image": "/drinks/images/lemon2.jpeg",
        "labels": [
          "A touch of Lemon"
        ]
      }
    ],
    "specialTitle": "What’s Special About This Drink?",
    "specialParagraphs": [
      "Wheatgrass is a natural way to provide your body with concentrated nourishment. Harvested when its nutritional value is high, it offers a fresh and earthy character. We have kept the recipe simple, using young wheatgrass and a touch of lemon, to provide a shot that feels like a clean start for your day.",
      "Shake & Gulp Wheatgrass Shot makes it easy to include this fresh green ritual in your routine. It is designed to be shaken well before drinking so you receive the full benefits of the real ingredients in every sip."
    ],
    "infoBlocks": [
      {
        "title": "Health Benefits",
        "introParagraphs": [],
        "listItems": [
          "Acts as a natural internal detox, helping your body clear away the clutter",
          "Rich in chlorophyll, which is like liquid sunshine for your blood",
          "Provides a quick, clean metabolic kickstart without the crash",
          "Supports overall physical vitality and that 'light' feeling",
          "A super-concentrated way to get your daily greens in seconds"
        ],
        "bodyParagraphs": [
          {
            "text": "A small shot that feels like a fresh start.",
            "isBold": false,
            "isNote": true
          }
        ]
      },
      {
        "title": "Who Should Drink This?",
        "introParagraphs": [
          "Wheatgrass Shot is a fresh reset for modern lifestyles. It’s made for those moments when you're facing:"
        ],
        "listItems": [
          "Mornings when you feel physically 'stale' or sluggish from a long week",
          "A desire to support your body's natural daily cleansing habit",
          "When your diet has been lacking in fresh, raw greens",
          "Busy professionals who need an energy boost that actually nourishes",
          "Anyone seeking a simple green ritual to sharpen their focus"
        ],
        "bodyParagraphs": [
          {
            "text": "A simple green reset for modern lifestyles.",
            "isBold": false,
            "isNote": false
          }
        ]
      },
      {
        "title": "Roots Of The Ritual",
        "introParagraphs": [],
        "listItems": [],
        "bodyParagraphs": [
          {
            "text": "Wheatgrass has long been celebrated as 'liquid sunshine,' a vibrant tribute to the life-giving energy of the earth. From the early experiments in natural living to its rise as a modern wellness icon, the practice of juicing young wheat stalks has always been about capturing the peak of nutritional potential. Our Wheatgrass Shot brings you this concentrated burst of chlorophyll and life, serving as a daily reminder of the rejuvenating power found in the simplest, most honest gifts of nature.",
            "isBold": false,
            "isNote": false
          }
        ]
      },
      {
        "title": "How To Enjoy",
        "introParagraphs": [],
        "listItems": [
          "Shake the bottle well before opening because the green extract tends to settle",
          "Best enjoyed first thing in the morning and served chilled",
          "Consume it quickly as a single shot for the most impact",
          "Follow it with a sip of fresh water to enjoy the clean taste"
        ],
        "bodyParagraphs": [
          {
            "text": "Shake well and enjoy fresh.",
            "isBold": true,
            "isNote": false
          }
        ]
      }
    ],
    "suggestions": [
      {
        "slug": "moringa-shot",
        "image": "/assets/images/Moringa-544x652.png",
        "label": "Moringa Shot"
      },
      {
        "slug": "amla-shot",
        "image": "/assets/images/Amla-shadow-elements-544x652.png",
        "label": "Amla Shot"
      },
      {
        "slug": "ginger-shot",
        "image": "/assets/images/Gingger-shots-544x652.png",
        "label": "Ginger Shot"
      }
    ],
    "prevSlug": "moringa-shot",
    "nextSlug": "barley-drink"
  },
  {
    "slug": "barley-drink",
    "category": "wellness",
    "name": "Barley Drink",
    "bottleImage": "/assets/images/Barley-544x652.png",
    "bottleAlt": "Barley Drink Bottle",
    "tagline": "The quiet, cooling comfort of old-world hydration.",
    "ingredients": [
      {
        "image": "/drinks/images/wheat.jpeg",
        "labels": [
          "Barley Extract"
        ]
      },
      {
        "image": "/drinks/images/lemonjuce.jpeg",
        "labels": [
          "Lemon Juice"
        ]
      },
      {
        "image": "/drinks/images/honey.jpeg",
        "labels": [
          "Honey"
        ]
      },
      {
        "image": "/drinks/images/water.jpeg",
        "labels": [
          "Water"
        ]
      },
      {
        "image": "/drinks/images/salt.jpeg",
        "labels": [
          "A pinch of Salt"
        ]
      }
    ],
    "specialTitle": "What’s Special About This Drink?",
    "specialParagraphs": [
      "Barley has long been used as a traditional way to stay cool. It is a simple household choice for managing heat, often prepared for anyone coming in from the sun. We have stayed true to that tradition, adding fresh lemon and a touch of honey to create a drink that provides a moment of relief for your body.",
      "Shake & Gulp Barley Drink combines this time-honored grain with a clean and refreshing taste. It is designed to be light and naturally hydrating. Since we use real ingredients, they may naturally settle, so please shake the bottle well before enjoying."
    ],
    "infoBlocks": [
      {
        "title": "Health Benefits",
        "introParagraphs": [],
        "listItems": [
          "Actively helps cool your body down when the heat picks up",
          "Provides gentle hydration that plain water sometimes misses",
          "Light and incredibly easy on the stomach, even on sensitive days",
          "Helps your system find its natural balance and feel refreshed",
          "A clean, natural way to stay light and hydrated"
        ],
        "bodyParagraphs": [
          {
            "text": "It’s a simple traditional drink that keeps you feeling cool and comfortable.",
            "isBold": false,
            "isNote": true
          }
        ]
      },
      {
        "title": "Who Should Drink This?",
        "introParagraphs": [
          "Barley Drink is a refreshing option for everyone. It’s made for those moments when you're facing:"
        ],
        "listItems": [
          "Long afternoons spent under the sun or in the heat",
          "The post-workout thirst that needs more than just water",
          "Tiredness due to heat exposure or humidity",
          "A need for light, cooling refreshment when you feel heavy",
          "If you want a wellness habit that feels gentle and pure"
        ],
        "bodyParagraphs": [
          {
            "text": "A natural way to stay cool and refreshed.",
            "isBold": false,
            "isNote": false
          }
        ]
      },
      {
        "title": "Roots Of The Ritual",
        "introParagraphs": [],
        "listItems": [],
        "bodyParagraphs": [
          {
            "text": "Barley is one of the oldest cultivated grains in human history, once the primary source of strength for ancient Greek athletes and Roman gladiators. In traditional wellness, 'Barley Water' was the go-to remedy for cooling the system and providing gentle, sustained energy. This drink revives that humble but powerful ritual. It’s a clean, light, and refreshing way to hydrate that honors the ancient grain’s legacy as a reliable companion for physical endurance and internal cooling.",
            "isBold": false,
            "isNote": false
          }
        ]
      },
      {
        "title": "How To Enjoy",
        "introParagraphs": [],
        "listItems": [
          "Shake the bottle well before opening because the barley extract naturally settles",
          "Best served chilled when you need a cooling drink",
          "Sip it slowly to fully enjoy the refreshing effect",
          "It is an excellent choice after being out in the sun or for general hydration"
        ],
        "bodyParagraphs": [
          {
            "text": "Shake well and enjoy fresh.",
            "isBold": true,
            "isNote": false
          }
        ]
      }
    ],
    "suggestions": [
      {
        "slug": "moringa-shot",
        "image": "/assets/images/Moringa-544x652.png",
        "label": "Moringa Shot"
      },
      {
        "slug": "amla-shot",
        "image": "/assets/images/Amla-shadow-elements-544x652.png",
        "label": "Amla Shot"
      },
      {
        "slug": "ginger-shot",
        "image": "/assets/images/Gingger-shots-544x652.png",
        "label": "Ginger Shot"
      }
    ],
    "prevSlug": "wheatgrass-shot",
    "nextSlug": "jeera-buttermilk"
  }
];

export function getDrinkBySlug(slug: string): DrinkData | undefined {
  return DRINKS_DATA.find((d) => d.slug === slug);
}
