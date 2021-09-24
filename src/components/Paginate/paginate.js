export default function paginate(
  totalItems,
  currentPage = 1,
  itemsPerPage = 10,
  pagesPerView = 10
) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  let startPageNumber, endPageNumber;

  if (totalPages <= pagesPerView) {
    startPageNumber = 1;
    endPageNumber = totalPages;
  } else {
    startPageNumber = currentPage - Math.floor(pagesPerView / 2);
    if (startPageNumber < 1) {
      startPageNumber = 1;
    }
    endPageNumber = startPageNumber + pagesPerView - 1;
    if (endPageNumber > totalPages) {
      endPageNumber = totalPages;
      startPageNumber = endPageNumber - pagesPerView + 1;
    }
  }

  const startItemIndex = (currentPage - 1) * itemsPerPage;
  const endItemIndex = Math.min(
    startItemIndex + itemsPerPage - 1,
    totalItems - 1
  );

  const pages = [];
  for (let i = startPageNumber; i <= endPageNumber; i++) {
    pages.push(i);
  }

  const items = [];
  for (let i = startItemIndex; i <= endItemIndex; i++) {
    items.push(i);
  }
  return {
    totalPages,
    startPageNumber,
    endPageNumber,
    startItemIndex,
    endItemIndex,
    currentPage,
    pages,
    items,
  };
}
