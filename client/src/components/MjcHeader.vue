<template>
  <div class="header">
    <v-layout align-center>
      <div class="logo" @click="moveMain">MJC 게시판</div>
      <v-spacer></v-spacer>
      <v-btn v-if="$store.state.user" @click="logout">{{ loginState }}</v-btn>
      <div v-if="$store.state.user">
        {{ $store.state.user.name }}
      </div>
      <v-btn v-if="!$store.state.user" @click="$router.push('/')">로그인</v-btn>
    </v-layout>
  </div>
</template>

<script>
export default {
  data: () => ({
    loginState: null,
  }),
  methods: {
    moveMain() {
      this.$router.push("/board");
    },
    logout() {
      this.axios.post("/api/users/logout").then((result) => {
        if (result.data.result == "ok") {
          this.$store.commit("logout");
        }
      });
    },
  },

  mounted() {
    // 새로고침 시에도 남아있도록.
    this.axios.post("/api/users/info").then((result) => {
      if (result.data.result == "ok") {
        this.$store.commit("setUser", result.data.user);
        this.loginState = "로그아웃";
        this.$router.redire;
      }
    });
  },
};
</script>
<style scoped>
.header {
  padding: 10px 20px;
  box-shadow: 0 6px 6px #eee;
}
.header .logo {
  cursor: pointer;
}
</style>
