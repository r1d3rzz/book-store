import { db } from "../firebase/config";
import { ref } from "vue";

let getBook = (id) => {
  let book = ref();
  let error = ref("");
  let load = async () => {
    try {
      let doc = await db.collection("books").doc(id).get();
      book.value = { id: doc.id, ...doc.data() };
    } catch (err) {
      error.value = err.message;
    }
  };

  return { book, error, load };
};

export default getBook;
