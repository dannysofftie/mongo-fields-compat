declare type AllowedReplacementCharacters = '.' | '$' | '&' | '/' | '\\' | '*' | '(' | ')';
interface ICompatArguments {
    obj: any[] | {
        [key: string]: any;
    };
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
/**
 * Serialize object to make it MongoDB compatible, by serializing field names to remove defined characters.
 */
declare const serializeObjectForMongoCompat: (params: ICompatArguments) => {
    [key: string]: any;
};
export default serializeObjectForMongoCompat;
