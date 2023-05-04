<template>
  <div>
    <div class="container mt-3" v-if="user">
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
                    </div>
                  </div>
                </div>
              </div>

              <button class="btn btn-danger" @click="logout">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import getUser from "@/composables/getUser";
import { auth } from "@/firebase/config";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

export default {
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
    let error = ref(null);
    let updateNoti = ref(null);

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

    return { logout, name, email, user, error, updateProfile, updateNoti };
  },
};
</script>
<style></style>
