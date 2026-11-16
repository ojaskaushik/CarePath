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
    article: {
      sourcesChecked: "2026-11-15",
      sections: [
        {
          id: "overview",
          title: "Overview",
          paragraphs: [
            "Headaches are common and have many possible causes. Tension headaches and migraines are different types; reading about symptoms cannot establish which type you have. Some headaches need urgent assessment.",
          ],
          sourceIds: ["medlineplus"],
        },
        {
          id: "symptoms",
          title: "Common symptoms or relevant information",
          paragraphs: [
            "Pain may feel like pressure or throbbing. Some headaches occur with nausea or sensitivity to light or sound. New vision changes or other unusual symptoms need medical assessment rather than self-diagnosis.",
          ],
          sourceIds: ["encyclopedia"],
        },
        {
          id: "self-care",
          title: "General self-care information",
          paragraphs: ["For a mild headache without warning signs:"],
          items: [
            "Drink water, eat regularly, take breaks from screens, and allow time to relax.",
            "Keep a record of when headaches occur and discuss recurring patterns with a healthcare professional.",
            "Frequent use of headache medicines can itself lead to recurring headaches. Discuss regular use with a healthcare professional.",
          ],
          sourceIds: ["nhs", "encyclopedia"],
        },
        {
          id: "medical-attention",
          title: "When to seek professional medical attention",
          paragraphs: [
            "Arrange an assessment for recurring headaches or pain that is not improving. Seek urgent advice for a headache with vomiting, eye problems, or pain brought on by coughing or exercise.",
          ],
          items: [
            "Get prompt assessment for a new headache after age 50, or with a history of cancer or a weakened immune system.",
            "A child whose headache worsens or wakes them from sleep needs urgent assessment.",
            "During pregnancy, a severe headache, vision changes, pain below the ribs, vomiting, or sudden swelling needs immediate maternity or medical advice. These can indicate pre-eclampsia.",
          ],
          sourceIds: ["nhs", "encyclopedia", "pregnancy"],
        },
        {
          id: "emergency-signs",
          title: "Emergency warning signs",
          paragraphs: [
            "Call 911 in Canada for a sudden, extremely painful headache, or headache with a seizure, weakness, difficulty speaking, confusion, or loss of vision. A headache with a very high fever and stiff neck, or following a head injury, also needs immediate emergency assessment.",
          ],
          sourceIds: ["nhs", "medlineplus"],
        },
      ],
      sources: [
        {
          id: "medlineplus",
          publisher: "MedlinePlus, U.S. National Library of Medicine",
          title: "Headache",
          url: "https://medlineplus.gov/headache.html",
        },
        {
          id: "encyclopedia",
          publisher: "MedlinePlus Medical Encyclopedia",
          title: "Headache",
          url: "https://medlineplus.gov/ency/article/003024.htm",
        },
        {
          id: "nhs",
          publisher: "NHS",
          title: "Headaches",
          url: "https://www.nhs.uk/symptoms/headaches/",
        },
        {
          id: "pregnancy",
          publisher: "NHS",
          title: "Headaches in pregnancy",
          url: "https://www.nhs.uk/pregnancy/common-symptoms/headaches/",
        },
      ],
    },
  },
  {
    slug: "sore-throat",
    name: "Sore Throat",
    description: "Read about sore throats, general comfort measures, and reasons to seek an assessment.",
    keywords: ["throat", "swallowing", "pharyngitis"],
    sourceUrl: "https://medlineplus.gov/sorethroat.html",
    article: {
      sourcesChecked: "2026-11-15",
      sections: [
        {
          id: "overview",
          title: "Overview",
          paragraphs: [
            "A sore throat can have several causes, including viral infections, allergies, or irritation from smoke. Some are bacterial. The cause determines whether treatment is needed; a sore throat alone does not establish a diagnosis.",
          ],
          sourceIds: ["medlineplus"],
        },
        {
          id: "symptoms",
          title: "Common symptoms or relevant information",
          paragraphs: [
            "The throat may feel dry, scratchy, or painful when swallowing. A mild cough or swollen glands in the neck may occur. Children may also have a fever and seem less active.",
          ],
          sourceIds: ["nhs"],
        },
        {
          id: "self-care",
          title: "General self-care information",
          paragraphs: [
            "Many sore throats improve within a week. Fluids, rest, soft or cool foods, and avoiding smoke may ease discomfort.",
          ],
          items: [
            "Adults can try a warm salt-water gargle, then spit it out. Children should not try this.",
            "Small hard sweets or lozenges can cause choking in young children.",
            "Ask a pharmacist about medicine safety, especially during pregnancy. Antibiotics are not routinely needed; they do not treat a viral infection.",
          ],
          sourceIds: ["nhs", "medlineplus"],
        },
        {
          id: "medical-attention",
          title: "When to seek professional medical attention",
          paragraphs: [
            "Seek advice if the sore throat persists beyond a week, recurs often, or a child under five needs help. Seek urgent assessment for very high fever, reduced urination suggesting dehydration, or a weakened immune system.",
          ],
          sourceIds: ["nhs"],
        },
        {
          id: "emergency-signs",
          title: "Emergency warning signs",
          paragraphs: [
            "Call 911 in Canada for trouble breathing, inability to swallow, drooling because swallowing is not possible, high-pitched breathing, or severe symptoms worsening rapidly. These are not routine sore-throat symptoms.",
          ],
          sourceIds: ["nhs"],
        },
      ],
      sources: [
        {
          id: "medlineplus",
          publisher: "MedlinePlus, U.S. National Library of Medicine",
          title: "Sore Throat",
          url: "https://medlineplus.gov/sorethroat.html",
        },
        {
          id: "nhs",
          publisher: "NHS",
          title: "Sore throat",
          url: "https://www.nhs.uk/symptoms/sore-throat/",
        },
      ],
    },
  },
  {
    slug: "seasonal-allergies",
    name: "Seasonal Allergies",
    description: "Explore seasonal allergy information, common symptoms, and ways to reduce exposure.",
    keywords: ["allergy", "hay fever", "pollen", "itchy eyes"],
    sourceUrl: "https://www.nhs.uk/conditions/hay-fever/",
    article: {
      sourcesChecked: "2026-11-15",
      sections: [
        {
          id: "overview",
          title: "Overview",
          paragraphs: [
            "Seasonal allergies, often called hay fever, are a reaction to pollen. Symptoms can continue for weeks or months while exposure continues.",
          ],
          sourceIds: ["nhs"],
        },
        {
          id: "symptoms",
          title: "Common symptoms or relevant information",
          paragraphs: ["Common symptoms include:"],
          items: [
            "Sneezing, coughing, or a blocked or runny nose",
            "Itchy or watery eyes, or itching around the nose and throat",
            "Tiredness or headache",
          ],
          sourceIds: ["nhs"],
        },
        {
          id: "self-care",
          title: "General self-care information",
          paragraphs: ["Reducing pollen exposure may ease symptoms:"],
          items: [
            "After time outdoors, shower and change clothes to remove pollen.",
            "Wear wraparound sunglasses, keep windows closed when pollen is high, and avoid drying laundry outdoors.",
            "Ask a pharmacist before choosing antihistamines for children, older adults, pregnancy or breastfeeding, or if you have other conditions or take medicines. Some cause drowsiness; do not drive if affected.",
          ],
          sourceIds: ["nhs", "antihistamines"],
        },
        {
          id: "medical-attention",
          title: "When to seek professional medical attention",
          paragraphs: [
            "A pharmacist can advise on symptom relief. See a healthcare professional if symptoms are getting worse or pharmacy treatments are not helping.",
          ],
          sourceIds: ["nhs"],
        },
        {
          id: "emergency-signs",
          title: "Emergency warning signs",
          paragraphs: [
            "A severe allergic reaction is different from ordinary hay fever. Call 911 in Canada for sudden swelling of the mouth, tongue, or throat, trouble breathing, or collapse. Do not dismiss these as seasonal symptoms. If an epinephrine auto-injector has been prescribed, use it as instructed and call for emergency help.",
          ],
          sourceIds: ["anaphylaxis"],
        },
      ],
      sources: [
        {
          id: "nhs",
          publisher: "NHS",
          title: "Hay fever",
          url: "https://www.nhs.uk/conditions/hay-fever/",
        },
        {
          id: "antihistamines",
          publisher: "NHS",
          title: "Antihistamines",
          url: "https://www.nhs.uk/medicines/antihistamines/",
        },
        {
          id: "anaphylaxis",
          publisher: "NHS",
          title: "Anaphylaxis",
          url: "https://www.nhs.uk/conditions/anaphylaxis/",
        },
      ],
    },
  },
  {
    slug: "dehydration",
    name: "Dehydration",
    description: "Learn about hydration, prevention, and signs that may require medical attention.",
    keywords: ["hydration", "fluids", "water", "thirst"],
    sourceUrl: "https://medlineplus.gov/dehydration.html",
    article: {
      sourcesChecked: "2026-11-15",
      sections: [
        {
          id: "overview",
          title: "Overview",
          paragraphs: [
            "Dehydration happens when fluid losses exceed intake. Vomiting, diarrhea, fever, sweating, or not drinking enough can contribute. Babies, older adults, and people with illnesses such as diabetes or kidney problems are more vulnerable.",
          ],
          sourceIds: ["medlineplus"],
        },
        {
          id: "symptoms",
          title: "Common symptoms or relevant information",
          paragraphs: [
            "Thirst, a dry mouth, fatigue, dizziness, darker urine, or urinating less can be signs. Babies may have fewer wet diapers, cry without tears, or become unusually sleepy or irritable. Do not wait for a baby to describe thirst.",
          ],
          sourceIds: ["medlineplus", "nhs"],
        },
        {
          id: "self-care",
          title: "General self-care information",
          paragraphs: ["For mild symptoms when the person can drink:"],
          items: [
            "Offer fluids regularly; small sips may be easier if nausea makes drinking difficult.",
            "Ask a pharmacist about an appropriate oral rehydration solution after fluid loss from vomiting or diarrhea, especially for a child.",
            "Continue breastfeeding or usual-strength formula; do not dilute formula.",
            "Fluid needs differ. Ask a healthcare professional what is appropriate for your health conditions rather than following a fixed daily target.",
          ],
          sourceIds: ["nhs", "medlineplus"],
        },
        {
          id: "medical-attention",
          title: "When to seek professional medical attention",
          paragraphs: [
            "Seek urgent care for persistent dizziness on standing, rapid heartbeat or breathing, unusual drowsiness, or markedly reduced urine. A baby with fewer wet diapers, no tears, or a sunken soft spot needs urgent assessment. No urination or fainting requires immediate medical help.",
          ],
          sourceIds: ["nhs", "medlineplus"],
        },
        {
          id: "emergency-signs",
          title: "Emergency warning signs",
          paragraphs: [
            "Call 911 in Canada for confusion, difficulty waking, or breathing difficulty with dehydration. Cold skin or blue, grey, pale, or blotchy skin can also indicate shock and require emergency care. Do not rely on home hydration alone for these signs.",
          ],
          sourceIds: ["nhs"],
        },
      ],
      sources: [
        {
          id: "medlineplus",
          publisher: "MedlinePlus, U.S. National Library of Medicine",
          title: "Dehydration",
          url: "https://medlineplus.gov/dehydration.html",
        },
        {
          id: "nhs",
          publisher: "NHS",
          title: "Dehydration",
          url: "https://www.nhs.uk/conditions/dehydration/",
        },
      ],
    },
  },
  {
    slug: "constipation",
    name: "Constipation",
    description: "Explore bowel-health information, general lifestyle measures, and when to seek help.",
    keywords: ["bowel", "stool", "digestion", "fibre", "fiber"],
    sourceUrl: "https://medlineplus.gov/constipation.html",
    article: {
      sourcesChecked: "2026-11-15",
      sections: [
        {
          id: "overview",
          title: "Overview",
          paragraphs: [
            "Constipation involves difficult or less frequent bowel movements. A daily bowel movement is not necessary for everyone. Changes from your usual pattern matter. The self-care suggestions here focus on adults; children need age-appropriate advice.",
          ],
          sourceIds: ["medlineplus", "nhs"],
        },
        {
          id: "symptoms",
          title: "Common symptoms or relevant information",
          paragraphs: [
            "Stools may be hard, dry, or difficult to pass. Straining, feeling incompletely emptied, or having fewer than three bowel movements weekly can occur. Constipation is more common during pregnancy and after age 65.",
          ],
          sourceIds: ["medlineplus", "nhs"],
        },
        {
          id: "self-care",
          title: "General self-care information",
          paragraphs: ["For adults without warning signs:"],
          items: [
            "Gradually add fibre-rich foods, drink fluids, and stay physically active.",
            "Make time for the toilet and avoid postponing a bowel movement.",
            "Discuss laxatives with a healthcare professional rather than selecting a treatment plan here. Do not stop prescribed medicines on your own.",
            "These diet and lifestyle measures can also help during pregnancy. If you suspect constipation in a child, seek professional advice early; treatment depends on age.",
          ],
          sourceIds: ["medlineplus", "nhs", "children"],
        },
        {
          id: "medical-attention",
          title: "When to seek professional medical attention",
          paragraphs: [
            "Arrange assessment for recurring constipation or symptoms that persist despite self-care. Seek medical care right away for rectal bleeding, blood in stool, constant abdominal pain, fever, vomiting, inability to pass gas, or unexplained weight loss. A family history of colorectal cancer is another reason to discuss symptoms with a clinician.",
          ],
          sourceIds: ["niddk"],
        },
        {
          id: "emergency-signs",
          title: "Emergency warning signs",
          paragraphs: [
            "Severe abdominal pain with vomiting, a swollen abdomen, or inability to pass gas may signal an intestinal blockage rather than routine constipation. Seek emergency assessment immediately. A complete bowel blockage is a medical emergency.",
          ],
          sourceIds: ["obstruction"],
        },
      ],
      sources: [
        {
          id: "medlineplus",
          publisher: "MedlinePlus, U.S. National Library of Medicine",
          title: "Constipation",
          url: "https://medlineplus.gov/constipation.html",
        },
        {
          id: "nhs",
          publisher: "NHS",
          title: "Constipation",
          url: "https://www.nhs.uk/conditions/constipation/",
        },
        {
          id: "children",
          publisher: "NHS",
          title: "Constipation in children",
          url: "https://www.nhs.uk/baby/health/constipation-in-children/",
        },
        {
          id: "niddk",
          publisher: "National Institute of Diabetes and Digestive and Kidney Diseases",
          title: "Symptoms & Causes of Constipation",
          url: "https://www.niddk.nih.gov/health-information/digestive-diseases/constipation/symptoms-causes",
        },
        {
          id: "obstruction",
          publisher: "MedlinePlus, U.S. National Library of Medicine",
          title: "Intestinal Obstruction",
          url: "https://medlineplus.gov/intestinalobstruction.html",
        },
      ],
    },
  },
];
