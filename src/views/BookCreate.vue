<template>
  <div class="container">
    <div class="row">
      <div class="col-md mx-auto">
        <div class="card text-start">
          <div class="card-header">
            <div class="fs-4">Create New Book</div>
          </div>
          <div class="card-body">
            <form>
              <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input type="text" class="form-control" id="title" required />
              </div>

              <div class="mb-3">
                <label for="author" class="form-label">Author</label>
                <input type="text" class="form-control" id="author" required />
              </div>

              <div class="mb-3">
                <label for="tag" class="form-label">
                  Tag
                  <small class="text-muted">(Press "Enter" add a Tag)</small>
                </label>
                <input type="text" class="form-control" id="tag" />
                <div class="tagsContainer mt-1">
                  <div class="text-danger">
                    <small>Double Click to Remove Tag</small>
                  </div>
                  <span class="badge bg-primary me-1 tagItem">html</span>
                  <span class="badge bg-primary me-1 tagItem">css</span>
                </div>
              </div>

              <div class="mb-3">
                <label for="price" class="form-label">Price</label>
                <input type="text" class="form-control" id="price" required />
              </div>

              <div class="mb-3">
                <label for="detail" class="form-label">Detail</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="detail"
                  rows="5"
                  required
                ></textarea>
              </div>

              <div class="d-flex justify-content-end">
                <button type="submit" class="btn btn-primary">
                  Upload Book
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
export default {};
</script>
<style>
.tagItem {
  user-select: none;
  cursor: pointer;
}
</style>
