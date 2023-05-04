<template>
  <div>
    <div class="container mt-3" v-if="user">
      <div class="row">
        <div class="col-md mx-auto">
          <div class="card text-start">
            <div class="card-header fs-3">Profile Detail</div>
            <div class="card-body">
              <div class="card-body">
                <div class="col-lg-8 mx-auto">
                  <div class="card mb-4">
                    <div class="card-body">
                      <div class="row">
                        <div class="col-sm-3">
                          <p class="mb-0">Full Name</p>
                        </div>
                        <div class="col-sm-9">
                          <p class="text-muted mb-0">{{ user.displayName }}</p>
                        </div>
                      </div>
                      <hr />
                      <div class="row">
                        <div class="col-sm-3">
                          <p class="mb-0">Email</p>
                        </div>
                        <div class="col-sm-9">
                          <p class="text-muted mb-0">{{ user.email }}</p>
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
import { useRouter } from "vue-router";

export default {
  setup() {
    let router = useRouter();
    let { user } = getUser();

    let logout = () => {
      auth.signOut();
      router.push({ name: "home" });
    };

    return { logout, user };
  },
};
</script>
<style></style>
