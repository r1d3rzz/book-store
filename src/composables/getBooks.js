import { ref } from "vue";

const getBooks = () => {
  let books = ref([]);
  let error = ref("");
  let load = async () => {
    try {
      let res = await fetch("http://localhost:3000/books");
      if (res.status === 404) {
        throw new Error("url not found");
      }
      let data = await res.json();
      books.value = data;
    } catch (err) {
      err.value = err.message;
    }
  };

  return { books, error, load };
};

export default getBooks;
