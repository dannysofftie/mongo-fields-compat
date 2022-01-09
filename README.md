# MongoDB fields compatibility

Make JSON objects field names compatible with MongoDB field names restrictions, with a dependency-free package.

As documented [here](https://docs.mongodb.com/manual/core/dot-dollar-considerations/#general-restrictions), `$` and `.` characters in field names might lead to data loss. This package will serialize field names in arrays and objects to remove those characters and replace them with a more safe character.

By default, `$`, `&`, `\`, `/` and `.` will be replaced with `_` character.

## Installation

With yarn

```bash
yarn add mongo-fields-compat
```

Or with npm

```bash
npm install mongo-fields-compat
```

## Example

Given below JSON object

```json
[
  {
    "name": "John Doe",
    "age": 29,
    "address.zipCode": "90011",
    "address.countryCode": "CA",
    "visitedCountries": [
      {
        "name": "Russia",
        "coordinate.lat": "55.751244",
        "coordinate.lng": "37.618423",
        "$currency": "Ruble"
      },
      {
        "name": "China",
        "coordinate.lat": "39.916668",
        "coordinate.lng": "116.383331",
        "$currency": "Yuan"
      }
    ]
  }
]
```

This will be the output

```json
[
  {
    "name": "John Doe",
    "age": 29,
    "address_zipCode": "90011",
    "address_countryCode": "CA",
    "visitedCountries": [
      {
        "name": "Russia",
        "coordinate_lat": "55.751244",
        "coordinate_lng": "37.618423",
        "_currency": "Ruble"
      },
      {
        "name": "China",
        "coordinate_lat": "39.916668",
        "coordinate_lng": "116.383331",
        "_currency": "Yuan"
      }
    ]
  }
]
```

## License

[MIT License](https://opensource.org/licenses/MIT)

Copyright (c) 2022 [Danny Sofftie](https://github.com/dannysofftie)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
