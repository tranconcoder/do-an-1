export type ObjectAnyKeys<T = any> = Object & {
	[key: string]: T;
};
