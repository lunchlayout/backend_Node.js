function getQueryRegExp(query: string) {
	return new RegExp(`.*${query.replace(/'/g, "")}.*`, "i");
}

export { getQueryRegExp };
