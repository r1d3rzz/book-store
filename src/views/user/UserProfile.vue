<template>
  <div>
    <div class="container mt-3" v-if="user">
      <ConfirmVIew @close="closeModel" v-if="isShow" class="text-start">
        <div class="p-2">
          <div class="fs-5 mb-2 text-danger">
            Do you want delete your Account?
          </div>
          <small
            >Your name is
            <span class="fw-bold user-select-none">{{
              user.displayName
            }}</span></small
          >
          <input
            type="text"
            placeholder="Enter Name"
            class="form-control"
            v-model="enter_name"
          />
          <p class="text-danger" v-if="deleteAccount">{{ deleteError }}</p>

          <div class="d-flex justify-content-end mt-2">
            <button
              class="btn btn-outline-danger me-2"
              @click="destroyAccount"
              v-if="!isDeleting"
            >
              Yes
            </button>
            <button
              type="submit"
              class="btn btn-danger me-2"
              disabled
              v-if="isDeleting"
            >
              <div class="d-flex justify-content-end align-items-center">
                <div
                  class="spinner-border me-2 spinner-border-sm"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
                <div>Destroying...</div>
              </div>
            </button>
            <button
              class="btn btn-primary"
              @click="isShow = false"
              :disabled="isDeleting"
            >
              Cancel
            </button>
          </div>
        </div>
      </ConfirmVIew>

      <div class="row">
        <div class="col-md mx-auto">
          <div class="card text-start">
            <div
              class="card-header d-flex justify-content-between align-items-center"
            >
              <div class="fs-3">Profile Detail</div>
              <div>
                <button class="btn btn-sm btn-primary" @click="updateProfile">
                  Update Profile
                </button>
              </div>
            </div>
            <div class="card-body">
              <div class="card-body">
                <div class="col-lg-8 mx-auto">
                  <div class="alert alert-warning" v-if="error">
                    {{ error }}
                  </div>
                  <div class="alert alert-warning" v-if="updateNoti">
                    {{ updateNoti }}
                  </div>
                  <div class="card mb-4">
                    <div class="card-body">
                      <div class="row d-flex align-items-center">
                        <div class="col-sm-3">
                          <p class="mb-0">Full Name</p>
                        </div>
                        <div class="col-sm-9">
                          <input
                            type="text"
                            v-model="name"
                            class="form-control"
                          />
                        </div>
                      </div>
                      <hr />
                      <div class="row">
                        <div class="col-sm-3">
                          <p class="mb-0">Email</p>
                        </div>
                        <div class="col-sm-9">
                          <p class="text-muted">{{ user.email }}</p>
                        </div>
                      </div>
                      <hr />
                      <div class="d-flex justify-content-center">
                        <button
                          class="btn btn-outline-danger"
                          @click="deleteAccount"
                        >
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button class="btn btn-danger" @click="logout">Logout</button>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-md mx-auto">
          <UserBooks :user="user" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UserBooks from "../../components/UserBooks";
import ConfirmVIew from "../../components/ConfirmVIew";
import getUser from "@/composables/getUser";
import { auth } from "@/firebase/config";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

export default {
  components: {
    UserBooks,
    ConfirmVIew,
  },
  setup() {
    let router = useRouter();
    let { user } = getUser();

    watch(user, () => {
      if (!user.value) {
        router.push({ name: "home" });
      }
    });

    let name = ref(user.value.displayName);
    let email = ref(user.value.email);
    let enter_name = ref("");
    let error = ref(null);
    let updateNoti = ref(null);
    let isShow = ref(false);
    let isDeleting = ref(false);
    let deleteError = ref(null);

    let logout = () => {
      auth.signOut();
    };

    let updateProfile = async () => {
      try {
        await user.value
          .updateProfile({
            displayName: name.value,
          })
          .then(() => {
            updateNoti.value = "Updated Successful";
            setTimeout(() => {
              updateNoti.value = null;
            }, 2000);
          });
      } catch (err) {
        error.value = err.message;
      }
    };

    let deleteAccount = () => {
      isShow.value = true;
    };

    let closeModel = () => {
      isShow.value = false;
    };

    let destroyAccount = async () => {
      if (!enter_name.value) {
        deleteError.value = "Please Enter Name";
      } else {
        isDeleting.value = true;
        if (enter_name.value === user.value.displayName) {
          deleteError.value = "";
          await user.value.delete();
        } else {
          isDeleting.value = false;
          deleteError.value = "Incorrect Name try again.";
        }
      }
    };

    return {
      logout,
      name,
      email,
      enter_name,
      user,
      error,
      deleteError,
      isShow,
      isDeleting,
      updateProfile,
      deleteAccount,
      destroyAccount,
      closeModel,
      updateNoti,
    };
  },
};
</script>
<style></style>
