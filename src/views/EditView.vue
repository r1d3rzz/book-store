<template>
  <div class="container" v-if="book">
    <div class="row">
      <div class="col-md mx-auto">
        <div class="card text-start">
          <div
            class="card-header d-flex justify-content-between align-items-center"
          >
            <div class="fs-4">Edit Book</div>
            <div>
              <button class="btn btn-sm btn-dark" @click="goBack">Back</button>
            </div>
          </div>
          <div class="card-body">
            <form @submit.prevent="update">
              <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="title"
                />
              </div>

              <div class="mb-3">
                <label for="author" class="form-label">Author</label>
                <input
                  type="text"
                  class="form-control"
                  id="author"
                  v-model="author"
                />
              </div>

              <div class="mb-3">
                <label for="tag" class="form-label">
                  Tag
                  <small class="text-muted">(Press "Enter" add a Tag)</small>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="tag"
                  v-model="tag"
                  @keydown.enter.prevent="addTags"
                />
                <div class="tagsContainer mt-1" v-if="tags.length">
                  <div class="text-danger">
                    <small>Double Click to Remove Tag</small>
                  </div>
                  <span
                    class="badge bg-primary me-1 tagItem"
                    v-for="tag in tags"
                    :key="tag"
                    @dblclick="removeTag(tag)"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>

              <div class="mb-3">
                <label for="price" class="form-label">Price</label>
                <input
                  type="text"
                  class="form-control"
                  id="price"
                  v-model="price"
                />
              </div>

              <div class="mb-3">
                <label for="detail" class="form-label">Detail</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="detail"
                  rows="5"
                  v-model="detail"
                ></textarea>
              </div>

              <div class="d-flex justify-content-end">
                <button
                  type="submit"
                  class="btn btn-warning"
                  v-if="!isUploading"
                >
                  Update Book
                </button>
                <button
                  type="submit"
                  class="btn btn-warning"
                  disabled
                  v-if="isUploading"
                >
                  <div class="d-flex justify-content-end align-items-center">
                    <div
                      class="spinner-border me-2 spinner-border-sm"
                      role="status"
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    <div>Updating...</div>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useRouter } from "vue-router";
import { db, timestamp } from "../firebase/config";
import { onMounted, ref } from "vue";

export default {
  props: ["id"],
  setup(props) {
    let router = useRouter();
    let isUploading = ref(false);
    let title = ref("");
    let author = ref("");
    let detail = ref("");
    let price = ref("");
    let tag = ref("");
    let tags = ref([]);

    let book = ref({});

    let load = async () => {
      let res = await db.collection("books").doc(props.id).get();
      book.value = { ...res.data(), id: res.id };

      title.value = book.value.title;
      author.value = book.value.author;
      price.value = book.value.price;
      detail.value = book.value.detail;
      tags.value = book.value.tags;
    };

    onMounted(() => {
      load();
    });

    let addTags = (e) => {
      if (!tags.value.includes(tag.value)) {
        if (e.key === "Enter" && tag.value != "") {
          tags.value.push(tag.value);
          tag.value = "";
        }
      } else {
        tag.value = "";
      }
    };

    let removeTag = (t) => {
      tags.value = tags.value.filter((tag) => {
        return tag != t;
      });
    };

    let goBack = () => router.go(-1);

    let update = async () => {
      isUploading.value = true;
      db.collection("books")
        .doc(props.id)
        .update({
          title: title.value,
          author: author.value,
          price: price.value,
          detail: detail.value,
          tags: tags.value,
          updated_at: timestamp(),
        })
        .then(() => {
          router.push({ name: "bookDetail", params: { id: props.id } });
          isUploading.value = false;
        });
    };

    return {
      title,
      author,
      detail,
      price,
      tag,
      tags,
      isUploading,
      book,
      update,
      goBack,
      addTags,
      removeTag,
    };
  },
};
</script>
<style>
.tagItem {
  user-select: none;
  cursor: pointer;
}
</style>
