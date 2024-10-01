<template>
  <div>
    <div class="" v-if="$isLoggedIn">
      <div v-if="$isUser">
        <VDropdown>
          <button
            type="button"
            class="flex items-center gap-2 btn-outline group btn border border-gray-400 group hover:bg-primary rounded-md hover:border-white group"
          >
            <img
              v-if="$isUser && userProfile?.data?.image"
              :src="userProfile?.data?.image"
              alt="image"
              class="max-w-[30px] rounded-full group-hover:border-2"
            />

            <Icon
              name="gg:profile"
              class="text-black w-5 h-5 group-hover:text-white"
              v-else-if="
                ($isUser && userProfile?.data?.image === '') ||
                userProfile?.data?.image === null
              "
            />
            {{
              userProfile?.data?.first_name + " " + userProfile?.data?.last_name
            }}
          </button>
          <template #popper="{ hide }">
            <div class="my-1 py-1 flex flex-col px-2">
              <NuxtLink
                @click.prevent="hide"
                to="/user/profile"
                class="hover:bg-primary px-3 lg:px-5 py-2 lg:py-3 rounded-lg hover:text-white"
              >
                <p>Profile</p>
              </NuxtLink>
              <NuxtLink
                to="/user"
                @click.prevent="hide"
                class="hover:bg-primary px-3 lg:px-5 py-2 lg:py-3 rounded-lg hover:text-white"
              >
                <p>Orders</p>
              </NuxtLink>
              <button
                @click.prevent="hide"
                @click="$logout"
                class="hover:border-red-500 hover:border-2 px-3 lg:px-5 py-2 lg:py-3 rounded-lg text-red-600"
              >
                Logout
              </button>
            </div>
          </template>
        </VDropdown>
      </div>
      <div class="" v-else>
        <NuxtLink
          to="/admin/orders"
          type="button"
          class="flex items-center gap-2 btn-outline rounded-none group btn border border-gray-400 group hover:bg-red-600"
        >
          Dashboard
        </NuxtLink>
      </div>
    </div>

    <div class="flex items-center gap-2" v-else>
      <NuxtLink class="btn btn-primary" to="/sign-up">{{
        $t("daftar")
      }}</NuxtLink>
      <NuxtLink class="btn btn-primary btn-outline" to="/sign-in">{{
        $t("masuk")
      }}</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const { requestOptions } = useRequestOptions();

const { $isLoggedIn, $isUser, $logout } = useAuth();

const {
  data: userProfile,
  error: errorUsers,
  refresh: refreshUsers,
} = await useAsyncData("userProfile", () =>
  $fetch(`/users/profile`, {
    headers: {
      Accept: "application/json",
    },
    method: "get",
    ...requestOptions,
  })
);
</script>

<style scoped></style>
