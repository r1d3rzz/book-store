import { db } from "@/firebase/config";
import { ref } from "vue";

let useCollection = (name) => {
  let error = ref(null);

  let addDocs = async (doc) => {
    try {
      await db.collection(name).add(doc);
    } catch (err) {
      console.log(err.message);
      error.value = "could not send your message!";
    }
  };

  return { error, addDocs };
};

export default useCollection;
