declare const testKeys: readonly ["minLength", "maxLength", "repeat", "lowercase", "uppercase", "number", "symbol"];
declare type TestKey = typeof testKeys[number];
declare type TestMessage = Record<TestKey, string>;
declare type TestResult = Record<TestKey, boolean>;
export declare const testPassword: (password: string) => {
    isStrong: boolean;
    isPhrase: boolean;
    results: TestResult;
    messages: TestMessage;
    compulsory: ("number" | "symbol" | "repeat" | "maxLength" | "minLength" | "lowercase" | "uppercase")[];
    optional: ("number" | "symbol" | "repeat" | "maxLength" | "minLength" | "lowercase" | "uppercase")[];
};
export {};
