import { ref } from "vue";
import { db } from "../firebase/config";

const getBooks = () => {
  let books = ref([]);
  let error = ref("");
  let load = async () => {
    try {
      let res = await db
        .collection("books")
        .orderBy("created_at", "desc")
        .get();
      books.value = res.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
    } catch (err) {
      err.value = err.message;
    }
  };

  return { books, error, load };
};

export default getBooks;
