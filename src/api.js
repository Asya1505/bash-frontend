export const show = (pageId, sort) => 
  fetch(`http://localhost:8080/message?size=3&page=${pageId}&sort=${sort}`, {
    method: 'GET',
}).then(function (response) {
  return response.json();
})
.then(data => {
  data.sort = sort;
  return data;
});
