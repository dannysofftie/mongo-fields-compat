type AllowedReplacementCharacters = '.' | '$' | '&' | '/' | '\\' | '*' | '(' | ')';

interface ICompatArguments {
  obj: any[] | { [key: string]: any };
  /**
   * Characters to replace
   *
   * Defaults `['.', '$', '&', '/', '\\', '*', '(', ')']`
   */
  characters?: AllowedReplacementCharacters[];
  /**
   * Substitution characters
   */
  substitute?: string;
}

const defaultCharacters: AllowedReplacementCharacters[] = ['.', '$', '&', '/', '\\', '*', '(', ')'];

/**
 * Serialize object to make it MongoDB compatible, by serializing field names to remove defined characters.
 */
const serializeObjectForMongoCompat = (params: ICompatArguments) => {
  if (!params?.obj)
    // throw an error if no object is passed
    throw new Error('An array or object is required!');

  const characters = Array.from((params?.characters || [])?.length ? params.characters : defaultCharacters)?.filter(Boolean);

  const regex = new RegExp(characters.map((a) => `\\${a}`).join('|'), 'g');

  if (!['object'].includes(typeof params.obj) && !Array.isArray(params.obj)) return params.obj;
  /**
   * Serialize object keys to MongoDB compatible keys
   */
  const serializeObject = (bObj: object) => {
    return Object.fromEntries(
      Object.entries(bObj)
        .filter(([key, value]) => key && value)
        .reduce((prev, curr, currIndex) => {
          prev[currIndex] =
            [
              curr[0]?.replace(regex, params.substitute || '_'),
              // serialize array
              Array.isArray(curr[1])
                ? serializeArray(curr[1])
                : // serialize object
                !Array.isArray(curr[1]) && typeof curr[1] === 'object'
                ? serializeObject(curr[1])
                : curr[1],
            ] || [];
          return prev;
        }, []),
    );
  };

  /**
   * Serialize array of any values
   * @returns
   */
  const serializeArray = (aarObj: any[]) => {
    const serializedArrayObjects = [];
    for (const entry of aarObj) {
      if (typeof entry === 'string') serializedArrayObjects.push(entry);
      if (typeof entry === 'object' && !Array.isArray(entry)) serializedArrayObjects.push(serializeObject(entry));
      if (Array.isArray(entry)) serializedArrayObjects.push(serializeArray(entry));
    }
    return serializedArrayObjects;
  };

  if (Array.isArray(params.obj)) {
    return serializeArray(params.obj);
  } else {
    return serializeObject(params.obj);
  }
};

export default serializeObjectForMongoCompat;
