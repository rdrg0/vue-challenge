export default function getData(url) {
  return fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      console.log(response.message);
    }
  });
}