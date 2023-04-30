import { ref } from "vue";

let getBook = (id) => {
  let book = ref(null);
  let error = ref("");
  let load = async () => {
    try {
      let res = await fetch("http://localhost:3000/books/" + id);
      if (res.status === 404) {
        throw new Error("url not found");
      }
      let data = await res.json();
      book.value = data;
    } catch (err) {
      error.value = err.message;
    }
  };

  return { book, error, load };
};

export default getBook;
