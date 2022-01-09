import mongodbFieldNamesCompat from '.';

const compatObj = [
  {
    name: 'John Doe',
    age: 29,
    'address.zipCode': '90011',
    'address.countryCode': 'CA',
    visitedCountries: [
      {
        name: 'Russia',
        'coordinate.lat': '55.751244',
        'coordinate.lng': '37.618423',
        $currency: 'Ruble',
      },
      {
        name: 'China',
        'coordinate.lat': '39.916668',
        'coordinate.lng': '116.383331',
        $currency: 'Yuan',
      },
    ],
  },
];

describe('Serialize field names for MongoDB field names compatibility', () => {
  // only replace $ character
  it('Should not contain $ in field names', () => {
    const afterCompat = mongodbFieldNamesCompat({ obj: compatObj, characters: ['$'] });

    // define pass criteria
  });

  // replace all default characters
  it("Should not contain '.', '$', '&', '/', '\\', '*', '(', ')' in field names", () => {
    const afterCompat = mongodbFieldNamesCompat({ obj: compatObj });

    // define pass criteria
  });
});
