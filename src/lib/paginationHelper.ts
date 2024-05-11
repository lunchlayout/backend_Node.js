/**
 * @classdesc Управление пагинацией элементов
 *
 * {@link https://github.com/liminfinity github by author}
 */
class PaginationHelper {
	/**
	 * @constructor
	 * @param {number} itemCount - Количество элементов
	 * @param {number} itemsPerPage - Максимальное количество элементов на странице
	 */
	constructor(
		public itemCount: number,
		public itemsPerPage: number,
	) {}
	/**
	 * Количество страниц
	 */
	pageCount() {
		return Math.ceil(this.itemCount / this.itemsPerPage);
	}
	/**
	 * Количество элементов на странице
	 * @param {number} pageIndex - Индекс страницы
	 */
	pageItemCount(pageIndex: number) {
		if (pageIndex < 0 || pageIndex >= this.pageCount()) return -1;
		const completedItems =
			pageIndex * this.itemsPerPage + this.itemsPerPage;
		return this.itemCount - completedItems >= 0
			? this.itemsPerPage
			: this.itemCount % this.itemsPerPage;
	}
	/**
	 * Страница элемента
	 * @param {number} itemIndex - Индекс элемента
	 */
	pageIndex(itemIndex: number) {
		if (itemIndex < 0 || itemIndex >= this.itemCount) return -1;
		const pageCount = Math.floor(itemIndex / this.itemsPerPage);
		return pageCount;
	}
}

export { PaginationHelper };
