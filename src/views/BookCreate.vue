<template>
  <div class="container">
    <div class="row">
      <div class="col-md mx-auto">
        <div class="card text-start">
          <div class="card-header">
            <div class="fs-4">Create New Book</div>
          </div>
          <div class="card-body">
            <form @submit.prevent="upload">
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
                  class="btn btn-primary"
                  v-if="!isUploading"
                >
                  Upload Book
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
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
                    <div>Uploading...</div>
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
import { db, timestamp } from "../../firebase/config";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    let router = useRouter();
    let isUploading = ref(false);

    let title = ref("");
    let author = ref("");
    let detail = ref("");
    let price = ref("");
    let tag = ref("");
    let tags = ref([]);

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

    let upload = async () => {
      let newBookData = {
        title: title.value,
        author: author.value,
        detail: detail.value,
        price: price.value,
        tags: tags.value,
        created_at: timestamp(),
      };

      isUploading.value = true;

      await db
        .collection("books")
        .add(newBookData)
        .then((_) => {
          isUploading.value = false;
          router.push({ name: "home" });
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
      addTags,
      removeTag,
      upload,
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
