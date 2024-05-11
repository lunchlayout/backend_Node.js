import { number, object, string } from "yup";

const QueryCafeSchema = object({
	query: string().default(""),
	page: number().min(1, "Page number greater than one").default(1),
});

export { QueryCafeSchema };
