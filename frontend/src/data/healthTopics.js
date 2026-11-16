export const healthTopics = [
  {
    slug: "common-cold",
    name: "Common Cold",
    description: "Learn about the common cold, everyday comfort measures, and when to seek care.",
    keywords: ["cold", "runny nose", "sneezing", "congestion"],
    sourceUrl: "https://medlineplus.gov/commoncold.html",
    article: {
      sourcesChecked: "2026-11-15",
      sections: [
        {
          id: "overview",
          title: "Overview",
          paragraphs: [
            "A cold is an infection caused by viruses that affects the nose and throat. Most people recover within one to two weeks, although some symptoms can last 10 to 14 days.",
          ],
          sourceIds: ["medlineplus"],
        },
        {
          id: "symptoms",
          title: "Common symptoms",
          paragraphs: ["Common cold symptoms include:"],
          items: [
            "A blocked or runny nose and sneezing",
            "A sore throat or cough",
            "A headache",
          ],
          sourceIds: ["medlineplus"],
        },
        {
          id: "self-care",
          title: "General self-care information",
          paragraphs: [
            "There is no cure for a cold. These measures may help with comfort while it improves:",
          ],
          items: [
            "Allow time to rest and drink fluids.",
            "Consider saline nose drops or spray, or a clean cool-mist humidifier.",
            "Ask a pharmacist or healthcare professional before using cold medicines, especially for children or if you take other medicines.",
            "Antibiotics do not treat the viruses that cause a routine cold.",
          ],
          sourceIds: ["medlineplus", "cdc"],
        },
        {
          id: "medical-attention",
          title: "When to seek professional medical attention",
          paragraphs: [
            "People with asthma, other respiratory conditions, or weakened immune systems may be more likely to develop complications. If you are at higher risk of severe flu or COVID-19, seek advice promptly even with mild cold-like symptoms; early treatment for those illnesses may be time-sensitive.",
            "Contact a healthcare professional for any severe or concerning symptom, including:",
          ],
          items: [
            "Unusually fast breathing or difficulty breathing; see the emergency signs below.",
            "Dehydration, a fever lasting more than four days, or a chronic condition getting worse.",
            "No improvement after ten days, or a fever or cough that improves and then returns or worsens.",
          ],
          sourceIds: ["medlineplus", "cdc"],
        },
        {
          id: "emergency-signs",
          title: "Emergency warning signs",
          paragraphs: [
            "Do not assume these signs are just a cold. Call 911 in Canada for severe symptoms such as trouble breathing, new or severe chest pain, sudden confusion, or bluish lips or face. Manitoba's respiratory-infection guidance identifies these as reasons to call 911.",
          ],
          sourceIds: ["manitoba"],
        },
      ],
      sources: [
        {
          id: "medlineplus",
          publisher: "MedlinePlus, U.S. National Library of Medicine",
          title: "Common Cold",
          url: "https://medlineplus.gov/commoncold.html",
        },
        {
          id: "cdc",
          publisher: "Centers for Disease Control and Prevention",
          title: "Manage Common Cold",
          url: "https://www.cdc.gov/common-cold/treatment/index.html",
        },
        {
          id: "manitoba",
          publisher: "Manitoba Health",
          title: "Public Health Guidance for When You Have Symptoms of a Respiratory Infection",
          url: "https://gov.mb.ca/health/publichealth/respiratory-infection-symptom-guidance.html",
        },
      ],
    },
  },
  {
    slug: "headaches",
    name: "Headaches",
    description: "Explore general headache information and warning signs that need professional attention.",
    keywords: ["headache", "head pain", "migraine"],
    sourceUrl: "https://medlineplus.gov/headache.html",
  },
  {
    slug: "sore-throat",
    name: "Sore Throat",
    description: "Read about sore throats, general comfort measures, and reasons to seek an assessment.",
    keywords: ["throat", "swallowing", "pharyngitis"],
    sourceUrl: "https://medlineplus.gov/sorethroat.html",
  },
  {
    slug: "seasonal-allergies",
    name: "Seasonal Allergies",
    description: "Explore seasonal allergy information, common symptoms, and ways to reduce exposure.",
    keywords: ["allergy", "hay fever", "pollen", "itchy eyes"],
    sourceUrl: "https://www.nhs.uk/conditions/hay-fever/",
  },
  {
    slug: "dehydration",
    name: "Dehydration",
    description: "Learn about hydration, prevention, and signs that may require medical attention.",
    keywords: ["hydration", "fluids", "water", "thirst"],
    sourceUrl: "https://medlineplus.gov/dehydration.html",
  },
  {
    slug: "constipation",
    name: "Constipation",
    description: "Explore bowel-health information, general lifestyle measures, and when to seek help.",
    keywords: ["bowel", "stool", "digestion", "fibre", "fiber"],
    sourceUrl: "https://medlineplus.gov/constipation.html",
  },
];
