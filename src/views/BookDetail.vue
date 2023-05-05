<template>
  <div class="container-fluid">
    <div v-if="error">
      <div class="alert alert-warning fs-3">{{ error }}</div>
    </div>
    <div class="row" v-if="book">
      <div v-if="isShow">
        <ConfirmVIew @close="closeModel">
          <div class="fs-4">Are You Sure to Delete it?</div>
          <div class="mt-3">
            <button
              class="btn btn-danger mx-1"
              @click="deleteBook(book.id)"
              v-if="!isDelete"
            >
              Yes
            </button>
            <button class="btn btn-danger mx-1" disabled v-if="isDelete">
              <div class="d-flex align-items-center">
                <div class="spinner-border spinner-border-sm" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <div class="ms-1">Deleteting...</div>
              </div>
            </button>
            <button
              class="btn btn-primary mx-1"
              @click="isShow = false"
              :disabled="isDelete"
            >
              Cancel
            </button>
          </div>
        </ConfirmVIew>
      </div>
      <div class="col-md-9 mx-auto mt-5 text-start">
        <div class="card">
          <div
            class="card-header d-flex justify-content-between align-items-center"
          >
            <div>
              <div class="fw-bold">{{ book.owner.name }}</div>
              <div class="text-muted">
                {{ changeTimeFormat(book.created_at.toDate()) }}
              </div>
            </div>
            <div v-if="user">
              <div v-if="user.email === book.owner.email">
                <button
                  class="btn btn-sm btn-danger me-1"
                  @click="isShow = true"
                >
                  delete
                </button>
                <router-link
                  :to="{ name: 'editView', params: { id: book.id } }"
                >
                  <button class="btn btn-sm btn-warning" @click="isShow = true">
                    edit
                  </button>
                </router-link>
              </div>
            </div>
          </div>
          <div class="card-body">
            <h3 class="text-center">{{ book.title }}</h3>
            <h5>Author - {{ book.author }}</h5>
            <div>
              Tags -
              <span
                v-for="tag in book.tags"
                :key="tag"
                class="badge bg-danger me-1 mb-1"
              >
                <router-link
                  :to="{ name: 'tagView', params: { tag } }"
                  class="text-white text-decoration-none"
                  >{{ tag }}</router-link
                >
              </span>
            </div>
            <p class="mb-2 badge bg-primary">Price - {{ book.price }} MMK</p>
            <p>{{ book.detail }}</p>
          </div>
          <div class="card-footer">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                Contact <i class="fas fa-envelope"></i> :
                <span class="text-muted">{{ book.owner.email }}</span>
              </div>
              <button @click="goBack" class="btn btn-dark">Back</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <LoadingLogos />
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import ConfirmVIew from "../components/ConfirmVIew";
import LoadingLogos from "../components/LoadingLogos";
import getBook from "@/composables/getBook";
import { useRouter } from "vue-router";
import { db } from "../firebase/config";
import { formatDistanceToNow } from "date-fns";
import getUser from "@/composables/getUser";

export default {
  components: {
    ConfirmVIew,
    LoadingLogos,
  },
  props: ["id"],
  setup(props) {
    let router = useRouter();
    let isShow = ref(false);
    let isDelete = ref(false);
    let { book, error, load } = getBook(props.id);
    let { user } = getUser();
    load();
    let goBack = () => router.push({ name: "home" });

    let closeModel = () => {
      if (isDelete.value == false) {
        isShow.value = false;
      }
    };

    let deleteBook = async (id) => {
      isDelete.value = true;
      await db
        .collection("books")
        .doc(id)
        .delete()
        .then(() => {
          isShow.value = false;
          isDelete.value = false;
          router.push({ name: "home" });
        });
    };

    let changeTimeFormat = (dateFormat) => {
      return formatDistanceToNow(dateFormat);
    };

    return {
      book,
      error,
      isShow,
      isDelete,
      user,
      goBack,
      deleteBook,
      closeModel,
      changeTimeFormat,
    };
  },
};
</script>
<style></style>
