export interface SectionData {
  id: string;
  title: string;
  content: string;
}

export const sections: SectionData[] = [
  {
    id: 'intro',
    title: 'The Food Waste Crisis',
    content: "Scroll to explore how we're planning to curb the impact of food waste at Dubai International Academy, Emirates Hills."
  },
  {
    id: 'problem',
    title: 'The Problem',
    content: 'Over a billion tonnes of food waste, including packaging, goes to waste every year.[1] In the time you\'ve spent on this website, around {number} of food waste have been produced in the UAE alone.[2] Our school has made efforts to curb food waste within its premises, but the problem of food and packaging waste persists. Even well-meaning students contribute to the problem, by doing what is known as \'wishcycling\'.[3]'
  },
  {
    id: 'impact',
    title: 'Environmental Impact',
    content: 'Food waste in landfills produces methane,[4] a greenhouse gas more than 28 times more potent than CO2,[5] while wasting valuable water and land resources.[6] This problem also occurs within schools– within the US, 530 thousand tonnes of school lunches are wasted annually.[7]'
  },
  {
    id: 'solution',
    title: 'Our Solution',
    content: "Our solution is BinBot, a comprehensive waste management system combining smart bins, data analytics, and student engagement. The following diagram and slides provide more information."
  },
  {
    id: 'implementation',
    title: 'Implementation Plan',
    content: 'Our phased approach includes promoting to and educating students, and monitoring the weight of recycled food waste on a biweekly basis to see how impactful our solution is. We plan to have both a hardware component (made using 3D printed parts) and a software component (using ReactJS).'
  },
  {
    id: 'impact-metrics',
    title: 'Anticipated Impact',
    content: 'Through these initiatives, we aim to increase the amount of recycled food waste at our school by 30%, while collecting at least 5kg of compost a month.'
  },
  {
    id: 'call-to-action',
    title: 'Conclusion',
    content: 'In the time you\'ve been reading this, {number} tonnes of food waste have been produced in the UAE. At this rate, in 10 years, over 32 trillion kilograms of food and packaging will go to waste in JUST the UAE, while millions of families go hungry.[2] It\'s time to come up with a reliable, scalable, and impactful solution to enact drastic change.'
  },

  {
    id: 'sources',
    title: 'References',
    content: `[1] United Nations Environment Programme (UNEP) Food Waste Index Report 2021
[2] Goumbook, "Eat It or Save It" Campaign Report on UAE Food Waste, 2023
[3] Trellis, "What is wishcycling? Two waste experts explain", 2022
[4] USDA, "Food Waste and its Links to Greenhouse Gases and Climate Change", 2022
[5] EPA, "Importance of Methane", Global Methane Initiative, 2024
[6] UNEP, "Food Waste Harms Climate, Water, Land and Biodiversity", 2013
[7] EarthShare, "How Addressing School Lunches Could Prevent 530,000 Tons of Waste", 2022
[8] WHO, "Hunger numbers stubbornly high for three consecutive years as global crises deepen", 2024
[9] UNICEF, "State of Food Security and Nutrition in the World", 2023
[10] FAO, "Food wastage footprint: Impacts on natural resources", 2013
[11] UNFCCC, "Food Loss and Waste Account for 8-10% of Annual Global Greenhouse Gas Emissions", 2024`
  }
];
