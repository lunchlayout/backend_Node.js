class PaginationHelper {
	constructor(public itemCount: number, public itemsPerPage: number) {}
	pageCount() {
	    return Math.ceil(this.itemCount / this.itemsPerPage)
	}
	pageItemCount(pageIndex: number) {
        if (pageIndex < 0 || pageIndex >= this.pageCount()) return -1
		const completedItems = pageIndex * this.itemsPerPage + this.itemsPerPage
		return this.itemCount - completedItems >= 0 ? this.itemsPerPage : this.itemCount % this.itemsPerPage
	}
	pageIndex(itemIndex: number) {
        if (itemIndex < 0 || itemIndex >= this.itemCount) return -1
        const pageCount = Math.floor(itemIndex / this.itemsPerPage)
        return pageCount
	}
}

export { PaginationHelper }