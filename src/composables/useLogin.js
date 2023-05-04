import { ref } from "vue";
import { auth } from "../firebase/config";

let error = ref(null);

let loginUser = async (email, password) => {
  try {
    let res = await auth.signInWithEmailAndPassword(email, password);
    return res;
  } catch (err) {
    error.value = err.message;
    setTimeout(() => {
      error.value = null;
    }, 3000);
  }
};

let useLogin = () => {
  return { error, loginUser };
};

export default useLogin;
