const speciesData = [
  {
    _id: '507f1f77bcf86cd799439011',
    name: 'Bengal Tiger',
    commonName: 'Bengal Tiger',
    habitat: 'Tropical and subtropical forests, mangroves, grasslands',
    conservationStatus: 'Endangered',
    region: 'Asia',
    description: 'The Bengal tiger is the most numerous tiger subspecies. It inhabits India, Bangladesh, Nepal, and Bhutan. Known for their striking orange coat with black stripes, Bengal tigers are apex predators that play a crucial role in maintaining healthy ecosystems.',
    image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=800&q=80',
    diet: 'Carnivore - deer, wild boar, buffalo',
    lifespan: '10-15 years in wild',
    weight: '140-300 kg',
    height: '90-110 cm at shoulder',
    funFacts: [
      'No two tigers have the same stripe pattern',
      'Bengal tigers are excellent swimmers',
      'They can leap up to 10 meters in a single bound',
      'A tiger\'s roar can be heard from 3 km away'
    ],
    threats: ['Habitat loss', 'Poaching', 'Human-wildlife conflict', 'Climate change']
  },
  {
    _id: '507f1f77bcf86cd799439012',
    name: 'African Elephant',
    commonName: 'African Bush Elephant',
    habitat: 'Savannas, forests, deserts, and marshes',
    conservationStatus: 'Vulnerable',
    region: 'Africa',
    description: 'The African elephant is the largest land animal on Earth. These magnificent creatures are highly intelligent, display complex social behaviors, and are essential ecosystem engineers that shape landscapes for countless other species.',
    image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&q=80',
    diet: 'Herbivore - grasses, fruits, bark, roots',
    lifespan: '60-70 years',
    weight: '4,000-6,000 kg',
    height: '3-4 m at shoulder',
    funFacts: [
      'Elephants can recognize themselves in mirrors',
      'They communicate through infrasound over long distances',
      'Elephants mourn their dead',
      'An elephant\'s brain weighs about 5 kg'
    ],
    threats: ['Ivory poaching', 'Habitat destruction', 'Human-elephant conflict', 'Drought']
  },
  {
    _id: '507f1f77bcf86cd799439013',
    name: 'Blue Whale',
    commonName: 'Blue Whale',
    habitat: 'Open oceans worldwide',
    conservationStatus: 'Endangered',
    region: 'Ocean',
    description: 'The blue whale is the largest animal ever known to have existed on Earth. These gentle giants can reach up to 30 meters in length and weigh as much as 200 metric tons. Despite their enormous size, they feed almost exclusively on tiny krill.',
    image: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=800&q=80',
    diet: 'Carnivore - krill (up to 4 tons per day)',
    lifespan: '80-90 years',
    weight: 'Up to 200,000 kg',
    height: 'Up to 30 m in length',
    funFacts: [
      'A blue whale\'s heart is the size of a small car',
      'Their calls can be heard over 1,600 km away',
      'Blue whale calves gain 90 kg per day',
      'They are the loudest animals on Earth'
    ],
    threats: ['Ship strikes', 'Ocean noise pollution', 'Climate change', 'Entanglement in fishing gear']
  },
  {
    _id: '507f1f77bcf86cd799439014',
    name: 'Snow Leopard',
    commonName: 'Snow Leopard',
    habitat: 'Alpine and subalpine zones of Central Asia',
    conservationStatus: 'Vulnerable',
    region: 'Asia',
    description: 'Known as the "ghost of the mountains," the snow leopard is one of the most elusive big cats in the world. Their thick fur, wide paws, and long tail adapted for balance make them perfectly suited for life in harsh mountain environments.',
    image: 'https://images.unsplash.com/photo-1519657943816-a28d9e9c25f4?w=800&q=80',
    diet: 'Carnivore - blue sheep, ibex, deer',
    lifespan: '10-12 years in wild',
    weight: '22-55 kg',
    height: '56-65 cm at shoulder',
    funFacts: [
      'Snow leopards cannot roar, only chuff',
      'Their tail is nearly as long as their body',
      'They can jump up to 15 meters horizontally',
      'Snow leopards wrap their tails around themselves to keep warm'
    ],
    threats: ['Poaching', 'Habitat loss', 'Climate change', 'Retaliatory killing by herders']
  },
  {
    _id: '507f1f77bcf86cd799439015',
    name: 'Giant Panda',
    commonName: 'Giant Panda',
    habitat: 'Temperate broadleaf and mixed forests',
    conservationStatus: 'Vulnerable',
    region: 'Asia',
    description: 'The giant panda is one of the most recognizable animals in the world and a global symbol of wildlife conservation. Despite decades of conservation efforts, they remain vulnerable due to habitat loss and their specialized diet of bamboo.',
    image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef3?w=800&q=80',
    diet: 'Herbivore - bamboo (99% of diet)',
    lifespan: '15-20 years in wild',
    weight: '70-125 kg',
    height: '60-90 cm at shoulder',
    funFacts: [
      'Giant pandas spend 10-16 hours a day eating bamboo',
      'They have a "pseudo-thumb" for gripping bamboo',
      'Panda cubs are 1/900th the size of their mother at birth',
      'Their black and white coloring may help with camouflage'
    ],
    threats: ['Habitat fragmentation', 'Low birth rate', 'Climate change affecting bamboo', 'Human encroachment']
  },
  {
    _id: '507f1f77bcf86cd799439016',
    name: 'African Lion',
    commonName: 'Lion',
    habitat: 'Savanna, grassland, scrub, and open woodland',
    conservationStatus: 'Vulnerable',
    region: 'Africa',
    description: 'The African lion is the second-largest big cat in the world and the only truly social big cat. Once roaming across most of Africa, Europe, and Asia, lions are now confined mainly to sub-Saharan Africa, with a small population in India.',
    image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&q=80',
    diet: 'Carnivore - wildebeest, zebra, buffalo',
    lifespan: '10-14 years in wild',
    weight: '120-250 kg',
    height: '90-120 cm at shoulder',
    funFacts: [
      'Lions are the only cats that live in groups (prides)',
      'Male lions sleep up to 20 hours a day',
      'A lion\'s roar can be heard 8 km away',
      'Lionesses do 85-90% of the hunting'
    ],
    threats: ['Habitat loss', 'Human-lion conflict', 'Prey depletion', 'Trophy hunting']
  },
  {
    _id: '507f1f77bcf86cd799439017',
    name: 'Amur Leopard',
    commonName: 'Amur Leopard',
    habitat: 'Temperate forests of Russian Far East',
    conservationStatus: 'Critically Endangered',
    region: 'Asia',
    description: 'The Amur leopard is the world\'s rarest big cat, with only around 100 individuals remaining in the wild. Adapted to the cold climate of the Russian Far East, it has thicker, longer fur than other leopard subspecies.',
    image: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=800&q=80',
    diet: 'Carnivore - roe deer, sika deer, hare',
    lifespan: '10-15 years in wild',
    weight: '25-75 kg',
    height: '60-70 cm at shoulder',
    funFacts: [
      'Amur leopards can run at speeds of 60 km/h',
      'They are solitary and largely nocturnal',
      'They can leap more than 6 m horizontally',
      'Only about 100 remain in the wild'
    ],
    threats: ['Poaching', 'Habitat loss', 'Inbreeding', 'Disease']
  },
  {
    _id: '507f1f77bcf86cd799439018',
    name: 'Sumatran Orangutan',
    commonName: 'Sumatran Orangutan',
    habitat: 'Tropical rainforests of Sumatra',
    conservationStatus: 'Critically Endangered',
    region: 'Asia',
    description: 'The Sumatran orangutan is one of our closest relatives, sharing 97% of our DNA. These highly intelligent great apes are found only in the rainforests of Sumatra, Indonesia, and are critically endangered due to rapid deforestation.',
    image: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=800&q=80',
    diet: 'Omnivore - fruit, insects, bark',
    lifespan: '40-50 years',
    weight: '30-90 kg',
    height: '1.2-1.5 m',
    funFacts: [
      'Orangutans share 97% of DNA with humans',
      'They build a new sleeping nest every night',
      'Mothers nurse their young for up to 8 years',
      'They are the largest arboreal animals'
    ],
    threats: ['Deforestation for palm oil', 'Illegal hunting', 'Habitat fragmentation', 'Pet trade']
  },
  {
    _id: '507f1f77bcf86cd799439019',
    name: 'Black Rhino',
    commonName: 'Black Rhinoceros',
    habitat: 'Savanna, forests, and grasslands of Africa',
    conservationStatus: 'Critically Endangered',
    region: 'Africa',
    description: 'The black rhinoceros is a critically endangered species of rhinoceros native to eastern and southern Africa. Despite intensive conservation efforts, black rhinos remain critically endangered due to poaching for their horns.',
    image: 'https://images.unsplash.com/photo-1584945916297-82e9f7bf0e03?w=800&q=80',
    diet: 'Herbivore - leaves, shoots, thorny bushes',
    lifespan: '35-50 years',
    weight: '800-1,400 kg',
    height: '1.4-1.8 m',
    funFacts: [
      'Black rhinos can run at 55 km/h despite their size',
      'Their horn is made of keratin, like human fingernails',
      'They have very poor eyesight but excellent hearing',
      'A group of rhinos is called a "crash"'
    ],
    threats: ['Poaching for horn', 'Habitat loss', 'Political instability', 'Disease']
  },
  {
    _id: '507f1f77bcf86cd799439020',
    name: 'Hawksbill Sea Turtle',
    commonName: 'Hawksbill Sea Turtle',
    habitat: 'Tropical coral reefs worldwide',
    conservationStatus: 'Critically Endangered',
    region: 'Ocean',
    description: 'Named for its narrow, pointed beak that resembles a hawk\'s bill, the hawksbill sea turtle is a critically endangered species that plays a vital role in maintaining healthy coral reef ecosystems by feeding on sea sponges.',
    image: 'https://images.unsplash.com/photo-1591025207163-942350e47db2?w=800&q=80',
    diet: 'Omnivore - sea sponges, jellyfish, mollusks',
    lifespan: '30-50 years',
    weight: '45-70 kg',
    height: '60-90 cm in length',
    funFacts: [
      'They navigate using Earth\'s magnetic field',
      'Hawksbills return to the same beach to nest',
      'Their shell pattern inspired "tortoiseshell" design',
      'They can eat fire corals without being harmed'
    ],
    threats: ['Shell trade', 'Bycatch', 'Habitat loss', 'Plastic pollution', 'Climate change']
  },
  {
    _id: '507f1f77bcf86cd799439021',
    name: 'Polar Bear',
    commonName: 'Polar Bear',
    habitat: 'Arctic sea ice',
    conservationStatus: 'Vulnerable',
    region: 'Arctic',
    description: 'The polar bear is the world\'s largest land predator and a symbol of the Arctic. Perfectly adapted for life on the sea ice, polar bears are increasingly threatened by climate change, which is rapidly melting their habitat.',
    image: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=800&q=80',
    diet: 'Carnivore - ringed seals, bearded seals',
    lifespan: '25-30 years in wild',
    weight: '350-700 kg',
    height: '1.2-1.6 m at shoulder',
    funFacts: [
      'Polar bear fur is actually transparent, not white',
      'They can smell seals through 3 feet of snow',
      'Polar bears are excellent swimmers',
      'Their paws act as snowshoes on thin ice'
    ],
    threats: ['Climate change', 'Sea ice loss', 'Pollution', 'Hunting', 'Oil development']
  },
  {
    _id: '507f1f77bcf86cd799439022',
    name: 'Cheetah',
    commonName: 'Cheetah',
    habitat: 'Open grasslands and savannas',
    conservationStatus: 'Vulnerable',
    region: 'Africa',
    description: 'The cheetah is the world\'s fastest land animal and the most specialized of all big cats. Unlike other big cats, cheetahs cannot roar but can purr. Their speed comes at a cost - they often lose kills to larger predators.',
    image: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800&q=80',
    diet: 'Carnivore - gazelle, impala, rabbits',
    lifespan: '10-12 years in wild',
    weight: '35-65 kg',
    height: '67-94 cm at shoulder',
    funFacts: [
      'Cheetahs can reach 112 km/h in just 3 seconds',
      'They have black "tear marks" to reduce sun glare',
      'Each cheetah has a unique spot pattern',
      'They cannot retract their claws fully'
    ],
    threats: ['Habitat loss', 'Human-wildlife conflict', 'Illegal wildlife trade', 'Genetic bottleneck']
  },
  {
    _id: '507f1f77bcf86cd799439023',
    name: 'Gorilla',
    commonName: 'Mountain Gorilla',
    habitat: 'Tropical and subtropical forests',
    conservationStatus: 'Critically Endangered',
    region: 'Africa',
    description: 'Gorillas are our closest living relatives after chimpanzees, sharing 98.3% of their DNA with humans. These magnificent primates are highly intelligent and social animals that live in family groups led by a dominant silverback male.',
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80',
    diet: 'Herbivore - leaves, shoots, stems, fruit',
    lifespan: '35-40 years in wild',
    weight: '68-227 kg',
    height: '1.4-1.8 m',
    funFacts: [
      'Gorillas share 98.3% of DNA with humans',
      'They build nests to sleep in each night',
      'Gorillas can learn sign language',
      'A silverback\'s chest beat can be heard 1.6 km away'
    ],
    threats: ['Habitat destruction', 'Poaching', 'Disease (including human diseases)', 'Political instability', 'Climate change']
  },
  {
    _id: '507f1f77bcf86cd799439024',
    name: 'Vaquita',
    commonName: 'Vaquita',
    habitat: 'Northern Gulf of California, Mexico',
    conservationStatus: 'Critically Endangered',
    region: 'Ocean',
    description: 'The vaquita is the world\'s smallest and most critically endangered cetacean. With fewer than 10 individuals remaining, this tiny porpoise faces imminent extinction primarily due to entanglement in illegal gillnets used to catch totoaba fish.',
    image: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80',
    diet: 'Carnivore - fish, squid, crustaceans',
    lifespan: '20 years',
    weight: '30-55 kg',
    height: '1.2-1.5 m in length',
    funFacts: [
      'Vaquitas were only discovered in 1958',
      'Fewer than 10 remain in the wild',
      'Their name means "little cow" in Spanish',
      'They are the world\'s rarest marine mammal'
    ],
    threats: ['Illegal gillnet fishing', 'Bycatch', 'Habitat degradation', 'Inbreeding']
  },
  {
    _id: '507f1f77bcf86cd799439025',
    name: 'Monarch Butterfly',
    commonName: 'Monarch Butterfly',
    habitat: 'Meadows, fields, prairies across North America',
    conservationStatus: 'Endangered',
    region: 'North America',
    description: 'The monarch butterfly is known for its incredible annual migration of up to 4,800 km from Canada and the United States to Mexico. This epic journey, spanning multiple generations, is one of nature\'s most remarkable phenomena.',
    image: 'https://images.unsplash.com/photo-1559181567-c3190ca9d222?w=800&q=80',
    diet: 'Herbivore - milkweed (larva), nectar (adult)',
    lifespan: '2-6 weeks (migratory: 8-9 months)',
    weight: '0.27-0.75 g',
    height: '9-10 cm wingspan',
    funFacts: [
      'They navigate using the sun as a compass',
      'No single butterfly completes the full migration',
      'Monarchs are toxic to predators due to milkweed',
      'They overwinter in dense clusters of millions'
    ],
    threats: ['Milkweed loss', 'Deforestation of wintering grounds', 'Pesticides', 'Climate change']
  },
  {
    _id: '507f1f77bcf86cd799439026',
    name: 'Bald Eagle',
    commonName: 'Bald Eagle',
    habitat: 'Near large open water with abundant food and old-growth trees',
    conservationStatus: 'Least Concern',
    region: 'North America',
    description: 'The bald eagle is the national bird of the United States and a conservation success story. Once on the brink of extinction due to hunting and DDT pesticide use, bald eagle populations have made a remarkable recovery thanks to conservation efforts.',
    image: 'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=800&q=80',
    diet: 'Carnivore - fish, waterfowl, small mammals',
    lifespan: '20-30 years in wild',
    weight: '3-6.3 kg',
    height: '70-102 cm',
    funFacts: [
      'Bald eagles can dive at 160 km/h',
      'They mate for life and return to the same nest',
      'Their nest can weigh up to 1 ton',
      'They get white head feathers only at age 4-5'
    ],
    threats: ['Lead poisoning from ammunition', 'Habitat loss', 'Electrocution', 'Wind turbines']
  },
  {
    _id: '507f1f77bcf86cd799439027',
    name: 'Golden Eagle',
    commonName: 'Golden Eagle',
    habitat: 'Mountains, hills, cliffs, and open landscapes',
    conservationStatus: 'Least Concern',
    region: 'Europe/Asia',
    description: 'The golden eagle is one of the most powerful and widespread raptors in the Northern Hemisphere. Revered throughout history and used in falconry for thousands of years, golden eagles are apex predators known for their extraordinary hunting ability.',
    image: 'https://images.unsplash.com/photo-1611519638465-8e99e027e13a?w=800&q=80',
    diet: 'Carnivore - rabbits, hares, ground squirrels',
    lifespan: '25-32 years in wild',
    weight: '3.6-6.7 kg',
    height: '66-102 cm',
    funFacts: [
      'Golden eagles can spot prey from 3.2 km away',
      'They can fly at over 240 km/h in a dive',
      'They are used in falconry across cultures',
      'Their wingspan can reach 2.3 m'
    ],
    threats: ['Habitat loss', 'Poisoning', 'Illegal shooting', 'Disturbance at nest sites']
  },
  {
    _id: '507f1f77bcf86cd799439028',
    name: 'California Condor',
    commonName: 'California Condor',
    habitat: 'Rocky shrubland, coniferous forests, and oak savannas',
    conservationStatus: 'Critically Endangered',
    region: 'North America',
    description: 'The California condor is North America\'s largest bird and a conservation icon. Hunted to the brink of extinction, with only 27 individuals remaining in 1987, an intensive captive breeding program has helped increase numbers to over 500 today.',
    image: 'https://images.unsplash.com/photo-1570623060613-2f76e2c01d7c?w=800&q=80',
    diet: 'Scavenger - carrion (large mammals)',
    lifespan: '60 years',
    weight: '7-14.1 kg',
    height: '109-140 cm',
    funFacts: [
      'California condors can soar for hours without flapping',
      'They have a wingspan of nearly 3 meters',
      'They don\'t reach sexual maturity until age 6',
      'They were extinct in the wild in 1987'
    ],
    threats: ['Lead poisoning', 'Power line collisions', 'Microtrash ingestion', 'Habitat loss']
  },
  {
    _id: '507f1f77bcf86cd799439029',
    name: 'Resplendent Quetzal',
    commonName: 'Resplendent Quetzal',
    habitat: 'Cloud forests of Central America',
    conservationStatus: 'Near Threatened',
    region: 'Central America',
    description: 'The resplendent quetzal is often considered the most beautiful bird in the Americas. Sacred to the Maya and Aztec civilizations, this brilliantly colored bird with its iridescent green tail feathers was considered a symbol of freedom and wealth.',
    image: 'https://images.unsplash.com/photo-1567213150997-6fdda9e38c37?w=800&q=80',
    diet: 'Omnivore - wild avocados, insects, small vertebrates',
    lifespan: '20-25 years',
    weight: '180-210 g',
    height: '36-40 cm (plus tail feathers up to 65 cm)',
    funFacts: [
      'The quetzal is Guatemala\'s national bird and currency',
      'Males have tail feathers up to 1 meter long',
      'They were sacred to Mayan and Aztec civilizations',
      'They cannot survive in captivity'
    ],
    threats: ['Deforestation', 'Climate change', 'Habitat fragmentation', 'Illegal capture']
  },
  {
    _id: '507f1f77bcf86cd799439030',
    name: 'Whooping Crane',
    commonName: 'Whooping Crane',
    habitat: 'Wetlands, prairies, and coastal areas',
    conservationStatus: 'Endangered',
    region: 'North America',
    description: 'The whooping crane is North America\'s tallest bird and one of its most endangered species. Named for their distinctive whooping call, these majestic birds were reduced to just 21 individuals in 1941 but have made a slow recovery through intensive conservation efforts.',
    image: 'https://images.unsplash.com/photo-1553089591-23da70c31f6a?w=800&q=80',
    diet: 'Omnivore - crabs, clams, frogs, small vertebrates',
    lifespan: '22-30 years in wild',
    weight: '4.9-7.3 kg',
    height: '150 cm',
    funFacts: [
      'They mate for life',
      'Only 800 whooping cranes exist today',
      'Their call can be heard 1.6 km away',
      'They migrate 4,000 km between Canada and Texas'
    ],
    threats: ['Habitat loss', 'Power line collisions', 'Hunting', 'Severe weather', 'Disease']
  }
];

const ecosystemData = [
  {
    _id: '507f1f77bcf86cd799439041',
    name: 'Amazon Rainforest',
    type: 'Forest',
    description: 'The Amazon rainforest is the world\'s largest tropical rainforest, covering over 5.5 million square kilometers across nine countries. Often called the "lungs of the Earth," it produces 20% of the world\'s oxygen and is home to an estimated 10% of all species on the planet.',
    keySpecies: ['Jaguar', 'Giant River Otter', 'Harpy Eagle', 'Pink River Dolphin', 'Poison Dart Frog', 'Green Anaconda'],
    threats: ['Deforestation', 'Agriculture expansion', 'Mining', 'Climate change', 'Wildfires'],
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80',
    climate: 'Tropical - hot and humid year-round with 2,300mm annual rainfall',
    area: '5.5 million km²',
    biodiversityIndex: 9.8
  },
  {
    _id: '507f1f77bcf86cd799439042',
    name: 'Great Barrier Reef',
    type: 'Ocean',
    description: 'The Great Barrier Reef is the world\'s largest coral reef system, stretching over 2,300 km along the northeast coast of Australia. It is the largest living structure on Earth, visible even from outer space, and is home to thousands of species of marine life.',
    keySpecies: ['Clownfish', 'Sea Turtle', 'Reef Shark', 'Giant Clam', 'Dugong', 'Hawksbill Turtle'],
    threats: ['Ocean warming', 'Coral bleaching', 'Ocean acidification', 'Crown-of-thorns starfish', 'Pollution'],
    image: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80',
    climate: 'Tropical - warm waters averaging 24-27°C',
    area: '344,400 km²',
    biodiversityIndex: 9.5
  },
  {
    _id: '507f1f77bcf86cd799439043',
    name: 'Sahara Desert',
    type: 'Desert',
    description: 'The Sahara is the world\'s largest hot desert, covering about 9 million square kilometers across North Africa. Despite its harsh conditions, the Sahara supports remarkable biodiversity adapted to extreme heat and aridity.',
    keySpecies: ['Fennec Fox', 'Dromedary Camel', 'Saharan Cheetah', 'Sand Viper', 'Addax Antelope', 'Jerboa'],
    threats: ['Climate change', 'Desertification', 'Overgrazing', 'Human encroachment', 'Oil exploration'],
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
    climate: 'Hyper-arid - extreme heat, less than 25mm annual rainfall',
    area: '9.2 million km²',
    biodiversityIndex: 4.2
  },
  {
    _id: '507f1f77bcf86cd799439044',
    name: 'Everglades',
    type: 'Wetlands',
    description: 'The Everglades is a unique subtropical wetland ecosystem in southern Florida, USA. Often called the "River of Grass," it is a complex system of interdependent ecosystems that supports extraordinary biodiversity and provides crucial water filtration for millions of people.',
    keySpecies: ['American Alligator', 'Florida Panther', 'Roseate Spoonbill', 'Manatee', 'Snail Kite', 'American Crocodile'],
    threats: ['Invasive species', 'Water management', 'Agricultural runoff', 'Climate change', 'Sea level rise'],
    image: 'https://images.unsplash.com/photo-1571930977688-86b3cbecccee?w=800&q=80',
    climate: 'Subtropical - hot humid summers, mild dry winters',
    area: '6,100 km²',
    biodiversityIndex: 8.1
  },
  {
    _id: '507f1f77bcf86cd799439045',
    name: 'African Savanna',
    type: 'Grassland',
    description: 'The African savanna is the world\'s largest tropical grassland, covering about 13.5 million square kilometers. Home to the "Big Five" and site of the Great Migration - one of nature\'s most spectacular events - it represents one of the most iconic ecosystems on Earth.',
    keySpecies: ['African Elephant', 'Lion', 'Giraffe', 'Zebra', 'Wildebeest', 'Cheetah'],
    threats: ['Agricultural expansion', 'Poaching', 'Climate change', 'Human population growth', 'Invasive plants'],
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
    climate: 'Tropical - distinct wet and dry seasons',
    area: '13.5 million km²',
    biodiversityIndex: 8.7
  },
  {
    _id: '507f1f77bcf86cd799439046',
    name: 'Arctic Tundra',
    type: 'Tundra',
    description: 'The Arctic tundra is a vast, treeless landscape characterized by extremely cold temperatures and minimal vegetation. This harsh environment is warming faster than any other region on Earth, with profound consequences for the species that depend on it and global climate systems.',
    keySpecies: ['Polar Bear', 'Arctic Fox', 'Caribou', 'Snowy Owl', 'Arctic Hare', 'Musk Ox'],
    threats: ['Climate change', 'Permafrost thaw', 'Oil and gas development', 'Pollution', 'Invasive species'],
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
    climate: 'Arctic - extreme cold, permafrost, low precipitation',
    area: '8 million km²',
    biodiversityIndex: 3.9
  }
];

module.exports = { speciesData, ecosystemData };
